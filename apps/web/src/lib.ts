import { AccountServiceClient } from "@ayasofyazilim/saas/AccountService";
import { AdministrationServiceClient } from "@ayasofyazilim/saas/AdministrationService";
import { BackerServiceClient } from "@ayasofyazilim/saas/BackerService";
import { IdentityServiceClient } from "@ayasofyazilim/saas/IdentityService";
import { MerchantServiceClient } from "@ayasofyazilim/saas/MerchantService";
import { ProjectServiceClient } from "@ayasofyazilim/saas/ProjectService";
import { SaasServiceClient } from "@ayasofyazilim/saas/SaasService";
import { SettingServiceClient } from "@ayasofyazilim/saas/SettingService";
import { auth } from "auth";

const HEADERS = {
  "X-Requested-With": "XMLHttpRequest",
  "Content-Type": "application/json",
};
export async function getIdentityServiceClient() {
  const session = await auth();
  const token = session?.access_token;
  return new IdentityServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS,
  });
}

export async function getAccountServiceClient() {
  const session = await auth();
  const token = session?.access_token;
  return new AccountServiceClient({
    TOKEN: token,
    BASE: process.env.AUTH_URL,
    HEADERS,
  });
}

export function getProjectServiceClient(): ProjectServiceClient {
  return new ProjectServiceClient({
    BASE: process.env.PROJECT_SERVICE_URL ?? "",
    HEADERS,
  });
}

export function getProjectServiceDetailClient(): ProjectServiceClient {
  return new ProjectServiceClient({
    BASE: process.env.PROJECT_SERVICE_URL ?? "",
    HEADERS,
  });
}

export async function getSaasServiceClient() {
  const session = await auth();
  const token = session?.access_token;
  return new SaasServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS,
  });
}

export function getSettingServiceClient(): SettingServiceClient {
  return new SettingServiceClient({
    BASE: process.env.BASE_URL,
  });
}

export async function getAdministrationServiceClient() {
  const session = await auth();
  const token = session?.access_token;
  return new AdministrationServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS,
  });
}

export async function getBackerServiceClient(): Promise<BackerServiceClient> {
  const session = await auth();
  const token = session?.access_token;
  return new BackerServiceClient({
    TOKEN: token,
    BASE: "http://192.168.1.105:44326",
    HEADERS,
  });
}

export async function getMerchantServiceClient() {
  const session = await auth();
  const token = session?.access_token;
  return new MerchantServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS,
  });
}
