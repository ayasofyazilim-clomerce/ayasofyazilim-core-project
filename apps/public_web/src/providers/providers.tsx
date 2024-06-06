"use server";

import { getLocalizationResources } from "src/utils";
import AuthSession from "./auth";
import { ConfigProvider } from "./configuration";
import { LocaleProvider } from "./locale";
import Toaster from "@repo/ayasofyazilim-ui/molecules/toaster";
import { TooltipProvider } from "@repo/ayasofyazilim-ui/molecules/tooltip";

interface IProviders {
  children: JSX.Element;
  lang: string;
}
export default async function Providers({ children, lang }: IProviders) {
  const resources = await getLocalizationResources(lang);
  if (!resources) return <></>;

  return (
    <div>
      <Toaster richColors />
      <AuthSession>
        <ConfigProvider>
          <TooltipProvider>
            <LocaleProvider resources={resources} lang={lang}>
              {children}
            </LocaleProvider>
          </TooltipProvider>
        </ConfigProvider>
      </AuthSession>
    </div>
  );
}
