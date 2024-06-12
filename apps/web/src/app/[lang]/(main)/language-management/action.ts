"use server";
import { AdministrationServiceClient } from "@ayasofyazilim/saas/AdministrationService";
import { auth } from "auth";
import { revalidatePath } from "next/cache";

async function dangerouslyGetToken(project: string) {
  "use server";
  const baseURL =
    project === "upwithcrowd"
      ? "http://192.168.1.105:44325"
      : "http://192.168.1.105:44335";
  const TOKEN_URL = baseURL + "/connect/token";
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("X-Requested-With", "XMLHttpRequest");
  const urlencoded = new URLSearchParams();
  const urlEncodedContent: Record<string, string> = {
    grant_type: "password",
    client_id: "Angular",
    username: "admin",
    password: project === "upwithcrowd" ? "1q2w3E*" : "123Aa!",
    scope:
      "AccountService IdentityService SaasService AdministrationService phone roles profile address email offline_access",
  };
  Object.keys(urlEncodedContent).forEach((key) =>
    urlencoded.append(key, urlEncodedContent[key])
  );
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };
  const response = await fetch(TOKEN_URL, requestOptions);
  return await response.json();
}

async function getAdministrationServiceClient(project: string) {
  const baseURL =
    project === "upwithcrowd"
      ? "http://192.168.1.105:44325"
      : "http://192.168.1.105:44335";
  const response = await dangerouslyGetToken(project);

  return new AdministrationServiceClient({
    BASE: baseURL,
    TOKEN: response?.access_token,
    HEADERS: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
    },
  });
}
export async function addNewTranslationServer(
  resourceName: string,
  cultureName: string,
  name: string,
  value: string,
  project: string
) {
  "use server";
  try {
    const client = await getAdministrationServiceClient(project);
    const response =
      await client.languageTexts.putApiLanguageManagementLanguageTextsByResourceNameByCultureNameByName(
        {
          resourceName,
          cultureName,
          name,
          value,
        }
      );
    console.log(response);
    revalidatePath("/[lang]/(main)/language-management", "page");
    return {
      status: 200,
      projectData: response,
    };
  } catch (error: any) {
    console.log(error.statusText, "er");
    return {
      status: error.status,
      message: error?.statusText,
    };
  }
}
