import { AppClient } from "ayasofyazilim-saas";
import { cookies } from "next/headers";

export function getAppClient(): AppClient {
  const cookieStore = cookies();
  return new AppClient({
    BASE: "http://192.168.1.37:44399",
    HEADERS: {
      "X-Requested-With": "XMLHttpRequest",
      Cookie: cookieStore.toString(),
    },
  });
}
