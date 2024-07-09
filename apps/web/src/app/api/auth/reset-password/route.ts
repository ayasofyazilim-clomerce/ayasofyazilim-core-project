"use server";
import type { NextRequest } from "next/server";

export async function POST(reqest: NextRequest) {
  const { password, resetToken, userId } = (await reqest.json()) as {
    password: string;
    resetToken: string;
    userId: string;
  };
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-Requested-With", "XMLHttpRequest");

  const raw = JSON.stringify({
    userId,
    resetToken,
    password,
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };
  return fetch(
    `${process.env.BASE_URL}/api/account/reset-password`,
    requestOptions,
  );
}
