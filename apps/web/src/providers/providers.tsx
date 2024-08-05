"use server";

import Toaster from "@repo/ayasofyazilim-ui/molecules/toaster";
import { getLocalizationResources } from "src/utils";
import AuthSession from "./auth";
import { ConfigProvider } from "./configuration";
import { LocaleProvider } from "./locale";
import { PermissionProvider } from "./permissions";
import { ApplicationProvider } from "./application";
import Tooltip from "./tooltip";

interface ProvidersProps {
  children: JSX.Element;
  lang: string;
}
export default async function Providers({ children, lang }: ProvidersProps) {
  const resources = await getLocalizationResources(lang);

  const appName = process.env.APPLICATION_NAME || "UNIREFUND";
  return (
    <>
      <Toaster richColors />
      <ApplicationProvider appName={appName}>
        <AuthSession>
          <PermissionProvider>
            <ConfigProvider>
              <Tooltip>
                <LocaleProvider lang={lang} resources={resources}>
                  {children}
                </LocaleProvider>
              </Tooltip>
            </ConfigProvider>
          </PermissionProvider>
        </AuthSession>
      </ApplicationProvider>
    </>
  );
}
