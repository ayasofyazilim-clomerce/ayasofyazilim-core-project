import { AccountServiceClient } from "@ayasofyazilim/saas/AccountService";
import { ProjectServiceClient } from "@ayasofyazilim/saas/ProjectService";
import { auth } from "auth";

// @ts-ignore
export async function getAccountServiceClient(): AccountServiceClient {
  const session = await auth();
  // @ts-ignore
  const token = session?.accessToken || "";
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
