"use server";
import type { ForgotPasswordFormDataType } from "@repo/ayasofyazilim-ui/molecules/forms/forgot-password-form";
import type { NextRequest } from "next/server";

export async function POST(reqest: NextRequest) {
  const { email } = (await reqest.json()) as ForgotPasswordFormDataType;

  // get request body
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-Requested-With", "XMLHttpRequest");

  const raw = JSON.stringify({
    email,
    appName: process.env.APP_NAME,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  return fetch(
    `${process.env.BASE_URL}/api/account/send-password-reset-code`,
    requestOptions,
  );
}
