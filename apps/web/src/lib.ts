import { AccountServiceClient } from "@ayasofyazilim/saas/AccountService";
import { ProjectServiceClient } from "@ayasofyazilim/saas/ProjectService";
import { IdentityServiceClient } from "@ayasofyazilim/saas/IdentityService";
import { auth } from "auth";
import { NextRequest } from "next/server";
import { getToken } from "@auth/core/jwt";
import { SaasServiceClient } from "@ayasofyazilim/saas/SaasService";
import { SettingServiceClient } from "@ayasofyazilim/saas/SettingService";
import { AdministrationServiceClient } from "@ayasofyazilim/saas/AdministrationService";

export async function getIdentityServiceClient(
  request: NextRequest
): IdentityServiceClient {
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

export async function getAccountServiceClient() {
  const session = await auth();
  const token = session?.access_token;
  return new AccountServiceClient({
    TOKEN: token,
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

export async function getSaasServiceClient(
  request: NextRequest
): SaasServiceClient {
  const JWT_Token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET ?? "",
  });
  const token = JWT_Token?.access_token || "";
  return new SaasServiceClient({
    TOKEN: token as string,
    BASE: process.env.BASE_URL,
    HEADERS: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
    },
  });
}

export function getSettingServiceClient(): SettingServiceClient {
  return new SettingServiceClient({
    BASE: process.env.BASE_URL,
  });
}

export async function getAdministrationServiceClient(
  request: NextRequest
): AdministrationServiceClient {
  const JWT_Token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET ?? "",
  });
  const token = JWT_Token?.access_token || "";
  return new AdministrationServiceClient({
    TOKEN: token as string,
    BASE: process.env.BASE_URL,
    HEADERS: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
    },
  });
}
