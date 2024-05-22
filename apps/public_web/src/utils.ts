import { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationDto } from "@ayasofyazilim/saas/AccountService";

export function isServerSide() {
  return typeof window === "undefined";
}
type LocalizationDto =
  Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationDto;
export type ResourcesDto = LocalizationDto["resources"];

export async function getLocalizationResources(languageCode: string) {
  const response = await fetch(
    getBaseLink(`/api/?lang=${languageCode}`, false)
  );
  return ((await response.json()) as LocalizationDto).resources;
}

function getLocale(locale?: string) {
  if (isServerSide()) {
    const cookieStore = require("next/headers").cookies();
    locale = cookieStore.get("locale")?.value ?? "en";
  } else {
    const pathname = window.location.pathname;
    const pathnameParts = pathname.split("/");
    locale = pathnameParts?.[1] ?? "en";
  }
  return locale;
}

export function getBaseLink(
  location: string,
  withLocale?: boolean,
  locale?: string
) {
  const origin = isServerSide()
    ? `${process.env.HOSTNAME}:${process.env.PORT}`
    : window.location.origin;
  const localePath = withLocale ? getLocale(locale) + "/" : "";
  return `${origin}/${localePath}${location}`;
}
