import { AccountServiceClient } from "ayasofyazilim-saas/AccountService";
import { ProjectServiceClient } from "ayasofyazilim-saas/ProjectService";
import { cookies } from "next/headers";
import { auth } from "auth";


export async function getAccountServiceClient(): AccountServiceClient {
  const session = await auth();
  const token = session?.accessToken || "";

  return new AccountServiceClient({
    TOKEN: token,
    BASE: process.env.AUTH_URL,
    HEADERS: {
      "X-Requested-With": "XMLHttpRequest",
      "Cookie": cookies().toString(),
    },
  });
}
export function getProjectServiceClient(): ProjectServiceClient {
  const cookieStore = cookies();
  return new ProjectServiceClient({
    BASE: process.env.BASE_URL,
    HEADERS: {
      "X-Requested-With": "XMLHttpRequest",
      Cookie: cookieStore.toString(),
    },
  });
}
