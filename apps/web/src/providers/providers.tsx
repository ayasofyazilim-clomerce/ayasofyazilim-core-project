"use server";

import { getLocalizationResources } from "src/utils";
import AuthSession from "./auth";
import { ConfigProvider } from "./configuration";
import { LocaleProvider } from "./locale";
import { PermissionProvider } from "./permissions";
import Toaster from "@repo/ayasofyazilim-ui/molecules/toaster";
import { TooltipProvider } from "@repo/ayasofyazilim-ui/molecules/tooltip";
import { ApplicationProvider } from "./application";

interface IProviders {
  children: JSX.Element;
  lang: string;
}
export default async function Providers({ children, lang }: IProviders) {
  const resources = await getLocalizationResources(lang);
  if (!resources) return <></>;

  const appName = process.env?.APPLICATION_NAME || "UNIREFUND";
  return (
    <div>
      <Toaster richColors />
      <ApplicationProvider appName={appName}>
        <AuthSession>
          <PermissionProvider>
            <ConfigProvider>
              <TooltipProvider>
                <LocaleProvider resources={resources} lang={lang}>
                  {children}
                </LocaleProvider>
              </TooltipProvider>
            </ConfigProvider>
          </PermissionProvider>
        </AuthSession>
      </ApplicationProvider>
    </div>
  );
}
