"use server";
import LanguageSelector from "@repo/ui/language-selector";
import type { NavigationItem } from "@repo/ui/main-layout";
import { MainLayout } from "@repo/ui/main-layout";
import { ProfileMenu } from "@repo/ui/upwithcrowd/profile-menu";
import { auth } from "auth";
import { signOutServer } from "auth-action";
import {
  Building2,
  DollarSign,
  FileBadge,
  Home,
  LanguagesIcon,
  LayoutDashboard,
  Presentation,
  Projector,
  ShieldAlert,
  SlidersHorizontal,
  UserCircle,
  Worm,
  WrenchIcon,
} from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "auth";
import { signOutServer } from "auth-action";
import { getResourceData } from "src/language-data/AbpUiNavigation/navbar";
import { getBaseLink } from "src/utils";
import { dataConfig } from "./dashboard/data";

type navigationItmes = NavigationItem & {
  type: string | string[];
  appType?: string;
};
interface LayoutProps {
  params: { lang: string; type: string };
  children: JSX.Element;
}
const appName = process.env.APPLICATION_NAME || "UNIREFUND";

export default async function Layout({ children, params }: LayoutProps) {
  const types = ["admin", "user", "entrepreneur", "investor"];
  const { type } = params;
  if (!types.includes(type)) {
    redirect("/404");
  }
  const navbarResources = { "Menu:Reports": "Reports" };
  const { languageData, resources } = await getResourceData(params.lang);

  const session = await auth();
  const user = session?.user;

  const arrayOf = ["identity"];
  const userNavigation = {
    username: user?.userName ?? "undefined",
    initials: user?.name?.substring(0, 2).toUpperCase(),
    user,
    email: user?.email ?? undefined,
    imageURL: "https://github.com/shadcn.png",
    menuLinks: [
      {
        href: getBaseLink(`public`, true, params.lang),
        title: languageData.HomePage,
        icon: <Home className="mr-2 h-4 w-4" />,
      },
      {
        href: getBaseLink(`app/admin`, true, params.lang),
        title: languageData.AdminCenter,
        icon: <ShieldAlert className="mr-2 h-4 w-4" />,
      },
      {
        href: getBaseLink(`app/entrepreneur`, true, params.lang),
        title: languageData.EntrepreneurCenter,
        icon: <Projector className="mr-2 h-4 w-4" />,
      },
      {
        href: getBaseLink(`app/investor`, true, params.lang),
        title: languageData.InvestorCenter,
        icon: <Worm className="mr-2 h-4 w-4" />,
      },
    ],
    isLoggedIn: Boolean(user),
    signOutFunction: signOutServer,
    languageData,
  };
  const dashboards = Object.entries(dataConfig)
    .filter((i) => arrayOf.includes(i[0]))
    .map(([key, value]) => ({
      key,
      title:
        languageData[
          value.displayName.replaceAll(" ", "") as keyof typeof languageData
        ] || value.displayName,
      href: getBaseLink(
        `app/${type}/dashboard/${key}/${value.default}`,
        true,
        params.lang,
      ),
      type: "admin",
      appType: "upwithcrowd",
      icon: <Presentation className="text-slate-500 w-4" />,
    }));

  const navigationItems: navigationItmes[] = [
    {
      key: "reports",
      title: navbarResources["Menu:Reports"],
      href: getBaseLink("app/" + type + "/", true, params.lang),
      icon: <LayoutDashboard className="text-slate-500 w-4" />,
      type: ["admin", "user", "entreperneur", "investor"],
      appType: "all",
    },
    {
      key: "dashboard",
      title: languageData.Dashboard,
      href: getBaseLink(`app/${type}/dashboard`, true, params.lang),
      icon: <Presentation className="text-slate-500 w-4" />,
      submenu: dashboards,
      type: "admin",
      appType: "admin",
    },
    ...dashboards,
    {
      key: "profile",
      title: languageData.Profile,
      href: getBaseLink(`app/${type}/profile`, true, params.lang),
      icon: <UserCircle className="text-slate-500 w-4" />,
      type: ["admin", "user", "entrepreneur", "investor"],
      appType: "upwithcrowd",
    },

    {
      key: "Details",
      title: languageData.Details,
      href: getBaseLink(`app/${type}/details`, true, params.lang),
      icon: <FileBadge className="text-slate-500 w-4" />,
      type: "admin",
      appType: "unirefund",
    },
    {
      key: "company",
      title: languageData.Companies,
      href: getBaseLink(`app/${type}/company`, true, params.lang),
      icon: <Building2 className="text-slate-500 w-4" />,
      type: "admin",
      appType: "unirefund",
    },
    {
      key: "countrySettings",
      title: languageData.CountrySettings,
      href: getBaseLink(`app/${type}/country-settings/home`, true, params.lang),
      icon: <WrenchIcon className="text-slate-500 w-4" />,
      type: "admin",
      appType: "unirefund",
    },
    {
      key: "settings",
      title: languageData.Settings,
      href: getBaseLink(`app/${type}/settings/profile`, true, params.lang),
      icon: <SlidersHorizontal className="text-slate-500 w-4" />,
      type: ["admin", "user", "entrepreneur", "investor"],
      appType: "unirefund",
    },
    {
      key: "projects",
      title: languageData.Campaigns,
      icon: <Presentation className="text-slate-500 w-4" />,
      href: getBaseLink(`app/${type}/projects`, true, params.lang),
      type: ["admin", "entrepreneur", "investor"],
      appType: "upwithcrowd",
    },
    {
      key: "languageManagement",
      title: languageData.LanguageManagement || "Language Management",
      icon: <LanguagesIcon className="text-slate-500 w-4" />,
      href: getBaseLink(`app/${type}/language-management`, true, params.lang),
      type: "admin",
      appType: "upwithcrowd",
    },
    {
      key: "investments",
      title: "investments",
      icon: <DollarSign className="text-slate-500 w-4" />,
      href: getBaseLink(`app/${type}/investments`, true, params.lang),
      type: "investor",
      appType: "admin",
    },
  ];

  const filteredNavigationItems = navigationItems.filter((item) => {
    return (
      item.appType === appName.toLowerCase() &&
      (item.type === type || item.type.includes(type))
    );
  });

  return (
    <MainLayout
      appName={appName}
      navigationItems={filteredNavigationItems}
      topBarComponent={
        <div className="w-min flex gap-4 mr-5">
          <ProfileMenu {...userNavigation} />
          <LanguageSelector
            baseLink={getBaseLink("", false)}
            cultureName={params.lang}
            menuAlign="end"
            resources={resources}
          />
        </div>
      }
    >
      {children}
    </MainLayout>
  );
}
