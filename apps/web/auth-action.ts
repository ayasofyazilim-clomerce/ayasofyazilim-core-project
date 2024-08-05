"use server";
import { AccountServiceClient } from "@ayasofyazilim/saas/AccountService";
import { signIn, signOut } from "auth";
import { redirect } from "next/navigation";
import { getAccountServiceClient } from "src/lib";
import { getBaseLink } from "src/utils";
const TOKEN_URL = process.env.BASE_URL + "/connect/token";
const AUTH_URL = process.env.BASE_URL + "/api/account/login";
const OPENID_URL = process.env.BASE_URL + "/.well-known/openid-configuration";

export async function signOutServer() {
  try {
    await signOut({ redirect: false });
  } catch (error) {
    return { error: "Unknown error" };
  }
  redirect(getBaseLink("login", true));
}
export async function signInServer({
  userIdentifier,
  password,
}: {
  userIdentifier: string;
  password: string;
}) {
  try {
    const result = await canItBeAuthorized({
      username: userIdentifier,
      password,
    });
    if (result?.description !== "Success") {
      return {
        status: 500,
        description: result.error.message,
      };
    }

    await signIn("credentials", {
      username: userIdentifier,
      password,
      redirect: false,
    });
    return {
      status: 200,
    };
  } catch (error: any) {
    return {
      status: 400,
      description: error.message,
    };
  }
}
export async function signUpServer({
  userName,
  email,
  password,
}: {
  userName: string;
  email: string;
  password: string;
}) {
  try {
    const client = await getAccountServiceClient();
    await client.account.postApiAccountRegister({
      requestBody: {
        userName: userName,
        emailAddress: email,
        password: password,
        appName: process.env.APP_NAME || "",
      },
    });
    return {
      status: 200,
    };
  } catch (error: any) {
    return {
      status: error.status,
      description: error?.body?.error?.code,
    };
  }
}
export async function sendPasswordResetCodeServer({
  email,
}: {
  email: string;
}) {
  try {
    const client = await getAccountServiceClient();
    await client.account.postApiAccountSendPasswordResetCode({
      requestBody: {
        email: email,
        appName: process.env.APP_NAME || "",
      },
    });
    return {
      status: 200,
    };
  } catch (error: any) {
    return {
      status: error.status,
      message: error?.body?.error?.message,
    };
  }
}
export async function getMyProfile(token: any) {
  const client = new AccountServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return await client.profile.getApiAccountMyProfile();
}
export async function canItBeAuthorized(credentials: any) {
  "use server";
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-Requested-With", "XMLHttpRequest");

  const body = {
    userNameOrEmailAddress: credentials.username as string,
    password: credentials.password as string,
  };

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(body),
  };
  const response = await fetch(AUTH_URL, requestOptions);
  return await response.json();
}
export async function signInWithCredentials(credentials: any) {
  "use server";
  const scopes = await fetch(OPENID_URL)
    .then((response) => response.json())
    .then((json) => json?.scopes_supported?.join(" "));
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("X-Requested-With", "XMLHttpRequest");
  const urlencoded = new URLSearchParams();
  const urlEncodedContent: Record<string, string> = {
    grant_type: "password",
    client_id: "Angular",
    username: credentials.username as string,
    password: credentials.password as string,
    scope: scopes,
  };
  Object.keys(urlEncodedContent).forEach((key) =>
    urlencoded.append(key, urlEncodedContent[key]),
  );
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };
  const response = await fetch(TOKEN_URL, requestOptions);
  return await response.json();
}
export async function obtainAccessTokenByRefreshToken(refreshToken: string) {
  "use server";
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("X-Requested-With", "XMLHttpRequest");
  const urlencoded = new URLSearchParams();
  const urlEncodedContent: Record<string, string> = {
    client_id: "Angular",
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  };
  Object.keys(urlEncodedContent).forEach((key) =>
    urlencoded.append(key, urlEncodedContent[key]),
  );
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };
  const response = await fetch(TOKEN_URL, requestOptions);
  return await response.json();
}
