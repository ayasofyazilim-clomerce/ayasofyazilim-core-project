import type { ApiError } from "@ayasofyazilim/saas/AccountService";
import { AccountServiceClient } from "@ayasofyazilim/saas/AccountService";
import { AdministrationServiceClient } from "@ayasofyazilim/saas/AdministrationService";
import { BackerServiceClient } from "@ayasofyazilim/saas/BackerService";
import { CRMServiceClient } from "@ayasofyazilim/saas/CRMService";
import { IdentityServiceClient } from "@ayasofyazilim/saas/IdentityService";
import { ProjectServiceClient } from "@ayasofyazilim/saas/ProjectService";
import { SaasServiceClient } from "@ayasofyazilim/saas/SaasService";
import { SettingServiceClient } from "@ayasofyazilim/saas/SettingService";
import { ContractServiceClient } from "@ayasofyazilim/saas/ContractService";
import { TravellerServiceClient } from "@ayasofyazilim/saas/TravellerService";
import { TagServiceClient } from "@ayasofyazilim/saas/TagService";
import { LocationServiceClient } from "@ayasofyazilim/saas/LocationService";
import { ExportValidationServiceClient } from "@ayasofyazilim/saas/ExportValidationService";
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

export async function getCRMServiceClient(): Promise<CRMServiceClient> {
  const session = await auth();
  const token = session?.access_token;
  return new CRMServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS,
  });
}

export async function getTravellersServiceClient() {
  const session = await auth();
  const token = session?.access_token;
  return new TravellerServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS,
  });
}

export async function getTagServiceClient() {
  const session = await auth();
  const token = session?.access_token;
  return new TagServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS,
  });
}

export async function getLocationServiceClient() {
  const session = await auth();
  const token = session?.access_token;
  return new LocationServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS,
  });
}

export async function getExportValidationServiceClient() {
  const session = await auth();
  const token = session?.access_token;
  return new ExportValidationServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS,
  });
}

export type ServerResponse<T = undefined> = BaseServerResponse &
  (ErrorTypes | SuccessServerResponse<T>);

export type ErrorTypes = BaseServerResponse &
  (ErrorServerResponse | ApiErrorServerResponse);

export interface BaseServerResponse {
  status: number;
  message: string;
}

export interface SuccessServerResponse<T> {
  type: "success";
  data: T;
}
export interface ApiErrorServerResponse {
  type: "api-error";
  data: ApiError["message"];
}
export interface ErrorServerResponse {
  type: "error";
  data: unknown;
}

export function structuredError(error: unknown): ErrorTypes {
  if (isApiError(error)) {
    const body = error.body as
      | {
          error: { message?: string; details?: string };
        }
      | undefined;
    const errorDetails = body?.error || {};
    return {
      type: "api-error",
      data: errorDetails.message || error.statusText || "Something went wrong",
      status: error.status,
      message:
        errorDetails.details ||
        errorDetails.message ||
        error.statusText ||
        "Something went wrong",
    };
  }
  return {
    type: "error",
    data: error,
    status: 500,
    message: "An error occurred",
  };
}

export interface PagedResult<T> {
  items?: T[] | null;
  totalCount: number;
}
