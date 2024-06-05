"use client";

import { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationResourceDto } from "@ayasofyazilim/saas/AccountService";
import { createContext, useContext } from "react";
import { getBaseLink } from "src/utils";

// To prevent long lines
type ResourceDto =
  Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationResourceDto;

interface ILocaleProvider {
  resources: Record<string, ResourceDto>;
  children: JSX.Element;
  lang: string;
}
interface ILocaleContext {
  changeLocale: (cultureName: string) => void;
  resources: Record<string, ResourceDto>;
  cultureName: string | undefined;
}

export const LocaleContext = createContext<ILocaleContext>({
  cultureName: undefined,
  changeLocale: () => {},
  resources: {},
});

export const useLocale = () => {
  return useContext(LocaleContext);
};

export const LocaleProvider = ({
  children,
  lang,
  resources,
}: ILocaleProvider) => {
  const localeData = { resources: resources, cultureName: lang };

  async function changeLocale(cultureName: string) {
    if (!cultureName) return;
    const newUrl =
      cultureName + "/" + location.pathname.split("/").slice(2).join("/");
    location.href = getBaseLink(newUrl, false);
  }

  return (
    <LocaleContext.Provider value={{ ...localeData, changeLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};
