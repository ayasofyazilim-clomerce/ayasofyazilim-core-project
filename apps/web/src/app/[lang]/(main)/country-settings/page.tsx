"use server";

import { RedirectType, permanentRedirect, redirect } from "next/navigation";
import { getBaseLink } from "src/utils";

export default async function Page() {
  permanentRedirect(getBaseLink("country-settings/home"), RedirectType.push);
}
