import { AccountServiceClient } from "@ayasofyazilim/saas/AccountService";
import { ProjectServiceClient } from "@ayasofyazilim/saas/ProjectService";
import { IdentityServiceClient } from "@ayasofyazilim/saas/IdentityService"
import { auth } from "auth";
import { NextRequest } from "next/server";
import { getToken } from "@auth/core/jwt";

export async function getIdentityServiceClient(request:NextRequest): IdentityServiceClient {
   const JWT_Token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET ?? "",
  });
  const token = JWT_Token?.access_token || "";
  return new IdentityServiceClient({
    TOKEN: token as string,
    BASE: process.env.BASE_URL,
    HEADERS: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
    },
  });
}

export async function getAccountServiceClient(request:NextRequest): AccountServiceClient {
  const JWT_Token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET ?? "",
  });
  const token = JWT_Token?.access_token || "";
  return new AccountServiceClient({
    TOKEN: token as string,
    BASE: process.env.AUTH_URL,
    HEADERS: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
    },
  });
}
export function getProjectServiceClient(): ProjectServiceClient {
  return new ProjectServiceClient({
    BASE: process.env.PROJECT_SERVICE_URL ?? "",
    HEADERS: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
    },
  });
}
export function getProjectServiceDetailClient(): ProjectServiceClient {
  return new ProjectServiceClient({
    BASE: process.env.PROJECT_SERVICE_URL ?? "",
    HEADERS: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
    },
  });
}
