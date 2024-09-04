"use server";
import { GearIcon } from "@radix-ui/react-icons";
import { MainLayout } from "@repo/ui/main-layout";
import { ProfileMenu } from "@repo/ui/upwithcrowd/profile-menu";
import {
  BriefcaseBusiness,
  Building2,
  DollarSign,
  Home,
  LayoutDashboard,
  Plane,
  Presentation,
  Projector,
  ShieldAlert,
  SlidersHorizontal,
  UserCircle,
  Worm,
  WrenchIcon,
  Languages,
  Layers,
  ClipboardList,
} from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "auth";
import { signOutServer } from "auth-action";
import { getResourceData } from "src/language-data/AbpUiNavigation";
import { generateNavigationItems, getBaseLink } from "src/utils";
import { dataConfigOfCrm } from "./crm/data";
import { dataConfig } from "./dashboard/data";
import { dataConfigOfManagement } from "./management/data";
import type { NavigationItmes } from "./menu-data";
import { navigationItemsTemp } from "./menu-data";

interface LayoutProps {
  params: { lang: string; type: string };
  children: JSX.Element;
}
const appName = process.env.APPLICATION_NAME || "UNIREFUND";

export default async function Layout({
  children,
  params,
}: LayoutProps): Promise<JSX.Element> {
  const types = ["admin", "user", "entrepreneur", "investor"];
  const { type } = params;
  if (!types.includes(type)) {
    redirect("/404");
  }
  const navbarResources = { "Menu:Reports": "Reports" };
  const { languageData, resources } = await getResourceData(params.lang);

  const session = await auth();
  const user = session?.user;

  const arrayOf = [
    "openiddict",
    "admin",
    "saas",
    "identity",
    "auditLogs",
    "textTemplates",
  ];
  const arrayOfManagement = ["setting"];
  const arrayOfCrm = ["companies"];

  const userNavigation = {
    username: user?.userName ?? "undefined",
    initials: user?.name?.substring(0, 2).toUpperCase(),
    user,
    email: user?.email ?? undefined,
    imageURL: `https://placehold.co/100x100/DB0000/white?text=${user?.name?.substring(0, 2).toUpperCase()}`,
    menuLinks:
      appName === "UNIREFUND"
        ? [
            {
              href: getBaseLink(
                `app/${type}/settings/profile`,
                true,
                params.lang,
              ),
              title: languageData.UserSettings,
              icon: <GearIcon className="mr-2 h-4 w-4" />,
            },
          ]
        : [
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
    className: "bg-transparent",
    signOutFunction: signOutServer,
    languageData,
  };
  const dashboards = generateNavigationItems(
    dataConfig,
    arrayOf,
    languageData,
    type,
    "dashboard",
    params.lang,
    <Presentation className="w-4 text-slate-500" />,
  );

  const managements = generateNavigationItems(
    dataConfigOfManagement,
    arrayOfManagement,
    languageData,
    type,
    "management",
    params.lang,
    <SlidersHorizontal className="w-4 text-slate-500" />,
  );
  managements.push({
    key: "tenantSettings",
    title: languageData.TenantSettings,
    href: getBaseLink(
      `app/${type}/management/tenant-settings/home`,
      true,
      params.lang,
    ),
    icon: <WrenchIcon className="w-4 text-slate-500" />,
    type: "admin",
    appType: "unirefund",
  });

  const crms = generateNavigationItems(
    dataConfigOfCrm,
    arrayOfCrm,
    languageData,
    type,
    "crm",
    params.lang,
    <Building2 className="w-4 text-slate-500" />,
  );
  const navigationItemsFull: NavigationItmes[] = [
    {
      key: "reports",
      title: navbarResources["Menu:Reports"],
      href: getBaseLink(`app/${type}/`, true, params.lang),
      icon: <LayoutDashboard className="w-4 text-slate-500" />,
      type: ["admin", "user", "entrepreneur", "investor"],
      appType: "all",
    },
    {
      key: "dashboard",
      title: languageData.Dashboard,
      href: getBaseLink(`app/${type}/dashboard`, true, params.lang),
      icon: <Presentation className="w-4 text-slate-500" />,
      submenu: dashboards,
      type: "admin",
      appType: "unirefund",
    },
    {
      key: "management",
      title: languageData.Management,
      href: getBaseLink(`app/${type}/management`, true, params.lang),
      icon: <BriefcaseBusiness className="w-4 text-slate-500" />,
      submenu: managements,
      type: "admin",
      appType: "unirefund",
    },
    {
      key: "crm",
      title: languageData.Crm,
      href: getBaseLink(`app/${type}/crm`, true, params.lang),
      icon: <Layers className="w-4 text-slate-500" />,
      submenu: crms,
      type: "admin",
      appType: "unirefund",
    },
    ...crms,
    {
      key: "profile",
      title: languageData.Profile,
      href: getBaseLink(`app/${type}/profile`, true, params.lang),
      icon: <UserCircle className="w-4 text-slate-500" />,
      type: ["admin", "user", "entrepreneur", "investor"],
      appType: "upwithcrowd",
    },
    {
      key: "traveller",
      title: languageData.Traveller,
      href: getBaseLink(`app/${type}/traveller`, true, params.lang),
      icon: <Plane className="w-4 text-slate-500" />,
      type: "admin",
      appType: "unirefund",
    },
    {
      key: "projects",
      title: languageData.Campaigns,
      icon: <Presentation className="w-4 text-slate-500" />,
      href: getBaseLink(`app/${type}/projects`, true, params.lang),
      type: ["admin", "entrepreneur", "investor"],
      appType: "upwithcrowd",
    },
    {
      key: "languageManagement",
      title: languageData.LanguageManagement || "Language Management",
      icon: <Languages className="w-4 text-slate-500" />,
      href: getBaseLink(`app/${type}/language-management`, true, params.lang),
      type: "admin",
      appType: "upwithcrowd",
    },
    {
      key: "investments",
      title: "Investments",
      icon: <DollarSign className="w-4 text-slate-500" />,
      href: getBaseLink(`app/${type}/investments`, true, params.lang),
      type: "investor",
      appType: "admin",
    },
    {
      key: "contracts",
      appType: "unirefund",
      type: "admin",
      title: languageData.Contracts,
      href: getBaseLink(`app/${type}/contracts`, true, params.lang),
      icon: <ClipboardList className="w-4 text-slate-500" />,
      submenu: [
        {
          key: "contracts",
          title: languageData.Contracts,
          href: getBaseLink(
            `app/${type}/contracts/contracts`,
            true,
            params.lang,
          ),
        },
        {
          key: "rebateTables",
          title: languageData.RebateTables,
          href: getBaseLink(
            `app/${type}/contracts/rebate/company-settings`,
            true,
            params.lang,
          ),
        },
        {
          key: "refundTables",
          title: languageData.RefundTables,
          href: getBaseLink(
            `app/${type}/contracts/refund/refund-tables`,
            true,
            params.lang,
          ),
        },
        {
          key: "refundFees",
          title: languageData.RefundFees,
          href: getBaseLink(
            `app/${type}/contracts/refund/refund-fees`,
            true,
            params.lang,
          ),
        },
      ],
    },
  ];

  const presentation = [...navigationItemsFull, ...navigationItemsTemp];
  const filteredNavigationItems = presentation.filter((item) => {
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
        // <div className="mr-5 flex w-min gap-4">
        <ProfileMenu
          {...userNavigation}
          baseLink={getBaseLink("", false)}
          className="ml-auto h-full w-min rounded-none border-b-0 shadow-none "
          cultureName={params.lang}
          resources={resources}
        />
        // </div>
      }
    >
      <div className="mx-10 mt-5 h-[calc(100vh-164px)]">{children}</div>
    </MainLayout>
  );
}
