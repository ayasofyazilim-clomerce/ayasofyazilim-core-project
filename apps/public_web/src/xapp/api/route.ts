"use server";
import { AccountServiceClient } from "@ayasofyazilim/saas/AccountService";
import { cookies } from "next/headers";

const appClient = new AccountServiceClient({
  BASE: process.env.BASE_URL,
});

export async function GET(request: Request) {
  // get search params from request
  const url = new URL(request.url);
  const lang = url.searchParams.get("lang") || "en";
  // Use the client instance to make the API call
  const response =
    await appClient.abpApplicationLocalization.getApiAbpApplicationLocalization(
      { cultureName: lang }
    );

  // set cookie
  cookies().set("locale", lang);
  // return response as json
  return new Response(JSON.stringify(response));
}
