"use server";
import MainAdminLayout from "@repo/ui/theme/main-admin-layout";
import {getGrantedPoliciesApi, structuredError} from "@repo/utils/api";
import {signOutServer} from "@repo/utils/auth";
import {auth} from "@repo/utils/auth/next-auth";
import type {Policy} from "@repo/utils/policies";
import {LogOut} from "lucide-react";
import {isRedirectError} from "next/dist/client/components/redirect";
import ErrorComponent from "@repo/ui/components/error-component";
import {myProfileApi} from "@repo/actions/core/AccountService/actions";
import {getAllLanguagesApi} from "@repo/actions/core/AdministrationService/actions";
import unirefund from "public/unirefund.png";
import {getResourceData} from "src/language-data/core/AbpUiNavigation";
import Providers from "src/providers/providers";
import {getBaseLink} from "src/utils";
import {getNavbarFromDB} from "../../../utils/navbar/navbar-data";
import {getProfileMenuFromDB} from "../../../utils/navbar/navbar-profile-data";

interface LayoutProps {
  params: {lang: string};
  children: JSX.Element;
}
const appName = process.env.APPLICATION_NAME || "UNIREFUND";

async function getApiRequests() {
  try {
    const session = await auth();
    const requiredRequests = await Promise.all([getGrantedPoliciesApi(), getAllLanguagesApi(session), myProfileApi()]);
    const optionalRequests = await Promise.allSettled([]);
    return {requiredRequests, optionalRequests};
  } catch (error) {
    if (!isRedirectError(error)) {
      return structuredError(error);
    }
    throw error;
  }
}

export default async function Layout({children, params}: LayoutProps) {
  const {lang} = params;
  const {languageData} = await getResourceData(lang);
  const session = await auth();
  const apiRequests = await getApiRequests();

  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} signOutServer={signOutServer} />;
  }

  const baseURL = getBaseLink("", lang);
  // requiredRequests contains [grantedPolicies, profileResponse, languagesResponse]
  const [grantedPolicies, languagesResponse] = apiRequests.requiredRequests;

  const navbarFromDB = await getNavbarFromDB(lang, languageData, grantedPolicies as Record<Policy, boolean>);
  const profileMenuProps = getProfileMenuFromDB(languageData);
  profileMenuProps.info.name = session?.user?.name ?? profileMenuProps.info.name;
  profileMenuProps.info.email = session?.user?.email ?? profileMenuProps.info.email;
  profileMenuProps.info.image = "https://flowbite.com/docs/images/people/profile-picture-5.jpg";

  profileMenuProps.menu.secondary = [
    {
      href: undefined,
      onClick: signOutServer,
      name: languageData.LogOut,
      icon: <LogOut className="mr-2 h-4 w-4" />,
    },
  ];
  const logo = appName === "UNIREFUND" ? unirefund : undefined;
  return (
    <Providers lang={lang}>
      <main className="m-0 grid h-dvh grid-rows-[max-content_1fr] overflow-hidden bg-white transition-all">
        <MainAdminLayout
          appName={appName}
          baseURL={baseURL}
          lang={lang}
          languagesList={languagesResponse.data.items || []}
          logo={logo}
          navbarItems={navbarFromDB}
          notification={{
            langugageData: languageData,
            appUrl: process.env.NOVU_APP_URL || "",
            appId: process.env.NOVU_APP_IDENTIFIER || "",
            subscriberId: session?.user?.sub || "67b8674f58411ad400a054e9",
          }}
          prefix=""
          profileMenu={profileMenuProps}
          tenantData={undefined}
        />
        <div className="flex w-full max-w-full flex-col overflow-auto px-2 py-2 sm:px-4 md:px-8 lg:px-16">
          {children}
        </div>
      </main>
    </Providers>
  );
}
