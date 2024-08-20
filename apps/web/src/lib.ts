import { AccountServiceClient } from "@ayasofyazilim/saas/AccountService";
import { AdministrationServiceClient } from "@ayasofyazilim/saas/AdministrationService";
import { BackerServiceClient } from "@ayasofyazilim/saas/BackerService";
import { IdentityServiceClient } from "@ayasofyazilim/saas/IdentityService";
import { ProjectServiceClient } from "@ayasofyazilim/saas/ProjectService";
import { SaasServiceClient } from "@ayasofyazilim/saas/SaasService";
import { SettingServiceClient } from "@ayasofyazilim/saas/SettingService";
import { CRMServiceClient } from "@ayasofyazilim/saas/CRMService";
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
    BASE: process.env.BASE_URL,
    HEADERS,
  });
}

export async function getProjectServiceClient() {
  const session = await auth();
  const token = session?.access_token;
  return new ProjectServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL ?? "",
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

export async function getSettingServiceClient(): Promise<SettingServiceClient> {
  const session = await auth();
  const token = session?.access_token;
  return new SettingServiceClient({
    BASE: process.env.BASE_URL,
    TOKEN: token,
    HEADERS,
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
    BASE: process.env.BASE_URL,
    HEADERS,
  });
}

export async function getCRMServiceClient() {
  const session = await auth();
  const token = session?.access_token;
  return new CRMServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS,
  });
}
