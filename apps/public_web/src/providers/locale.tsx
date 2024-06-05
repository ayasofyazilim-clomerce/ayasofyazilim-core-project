"use client";

import Spinner from "@repo/ayasofyazilim-ui/molecules/spinner";
import {
  Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationDto,
  Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationResourceDto,
} from "@ayasofyazilim/saas/AccountService";
import { usePathname, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

// To prevent long lines
type ResourceDto =
  Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationResourceDto;
type LocalizationDto =
  Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationDto;

interface ILocaleProvider {
  children: JSX.Element;
  lang: string;
}
interface ILocaleData {
  resources: Record<string, ResourceDto> | undefined | null;
  cultureName: string | undefined;
  version?: number;
}
interface ILocaleContext extends ILocaleData {
  changeLocale: (cultureName: string) => void;
}

export const LocaleContext = createContext<ILocaleContext>({
  cultureName: undefined,
  changeLocale: () => {},
  resources: undefined,
});

export const useLocale = () => {
  return useContext(LocaleContext);
};

export const LocaleProvider = ({ children, lang }: ILocaleProvider) => {
  // If its exist in localeStorage set it directly, no need to set state later.
  const [localeData, setLocaleData] = useState<ILocaleData>(() => {
    const localeFromLocalStorage =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("locale")
        : false;
    if (localeFromLocalStorage) {
      const locale = JSON.parse(localeFromLocalStorage);
      return locale;
    }
    return { resources: undefined, lang: lang };
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // LocalStorage is empty, get default lang
    if (!localeData?.resources) {
      changeLocale(lang);
    }
  }, [localeData]);

  async function getLocaleData(cultureName: string) {
    try {
      const response = await fetch(`/api/?lang=${cultureName}`);
      const data = (await response.json()) as LocalizationDto;
      if (!data?.resources) {
        throw new Error("Can't get the languge data");
      }
      const localeData = {
        cultureName,
        resources: data.resources,
        version: 0.1,
      };
      setLocaleData(localeData);
      localStorage.setItem("locale", JSON.stringify(localeData));
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  }

  async function changeLocale(cultureName: string) {
    if (!cultureName) return;

    setIsLoading(true);
    const isSuccess = await getLocaleData(cultureName);
    setIsLoading(false);
    if (!isSuccess) return;

    const newPath = pathname.split("/").slice(2).join("/");
    window.history.pushState(
      null,
      "",
      `/${cultureName}/${newPath}?${searchParams.toString()}`
    );
  }

  return (
    <LocaleContext.Provider value={{ changeLocale, ...localeData }}>
      {isLoading && <Spinner size="lg" />}
      {children}
    </LocaleContext.Provider>
  );
};
