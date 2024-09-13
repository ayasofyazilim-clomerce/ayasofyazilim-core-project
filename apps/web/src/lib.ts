import { AccountServiceClient } from "@ayasofyazilim/saas/AccountService";
import { AdministrationServiceClient } from "@ayasofyazilim/saas/AdministrationService";
import { BackerServiceClient } from "@ayasofyazilim/saas/BackerService";
import { CRMServiceClient } from "@ayasofyazilim/saas/CRMService";
import { IdentityServiceClient } from "@ayasofyazilim/saas/IdentityService";
import { ProjectServiceClient } from "@ayasofyazilim/saas/ProjectService";
import { SaasServiceClient } from "@ayasofyazilim/saas/SaasService";
import { SettingServiceClient } from "@ayasofyazilim/saas/SettingService";
import { ContractServiceClient } from "@ayasofyazilim/saas/ContractService";
import { auth } from "auth";
import { isApiError } from "./app/api/util";

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

export async function getContractServiceClient(): Promise<ContractServiceClient> {
  const session = await auth();
  const token = session?.access_token;
  return new ContractServiceClient({
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

export type ServerResponse<T = undefined> = BaseServerResponse &
  (ErrorTypes | SuccessServerResponse<T>);

export type ErrorTypes = ErrorServerResponse | ApiErrorServerResponse;

export interface BaseServerResponse {
  status: number;
  message: string;
}

export interface SuccessServerResponse<T> {
  type: "success";
  status: number;
  data: T;
  message: string;
}
export interface ApiErrorServerResponse {
  type: "api-error";
  status: number;
  data: string;
  message: string;
}
export interface ErrorServerResponse {
  type: "error";
  status: number;
  data: unknown;
  message: string;
}

export function structuredError(error: unknown): ErrorTypes {
  if (isApiError(error)) {
    const body = error.body as Record<string, unknown>;
    return {
      type: "api-error",
      data: (body.error as Record<string, string>).details || error.message,
      status: error.status,
      message: error.message,
    };
  }
  return {
    type: "error",
    data: error,
    status: 500,
    message: "An error occurred",
  };
}
