"use server";
import { AccountServiceClient } from "@ayasofyazilim/saas/AccountService";
import { signIn, signOut } from "auth";
import { redirect } from "next/navigation";
import { getBaseLink } from "src/utils";
const TOKEN_URL = process.env.BASE_URL + "/connect/token";

export async function signOutServer() {
  try {
    await signOut({ redirect: false });
  } catch (error) {
    return { error: "Unknown error" };
  }
  redirect(getBaseLink("login", true));
}
export async function signInServer(username: string, password: string) {
  try {
    await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
  } catch (error) {
    return { error: "Invalid username or password" };
  }
}
export async function getMyProfile(token: any) {
  const client = new AccountServiceClient({
    TOKEN: token,
    BASE: process.env.AUTH_URL,
    HEADERS: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return await client.profile.getApiAccountMyProfile();
}
export async function signInWithCredentials(credentials: any) {
  "use server";
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("X-Requested-With", "XMLHttpRequest");
  const urlencoded = new URLSearchParams();
  const urlEncodedContent: Record<string, string> = {
    grant_type: "password",
    client_id: "Angular",
    username: credentials.username as string,
    password: credentials.password as string,
    scope:
      "AccountService IdentityService phone roles profile address email offline_access",
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
