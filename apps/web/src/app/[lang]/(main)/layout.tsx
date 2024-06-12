"use server";
import { Input } from "@/components/ui/input";
import { MainLayout, NavigationItem } from "@repo/ui/main-layout";
import { getPermission } from "action";
import { auth } from "auth";
import { signOutServer } from "auth-action";
import LanguageSelector from "@repo/ui/language-selector";
import {
  FileBadge,
  LanguagesIcon,
  Presentation,
  SlidersHorizontal,
  SquareStack,
  User,
  Users,
} from "lucide-react";
import { getBaseLink, getLocalizationResources } from "src/utils";
import { dataConfig } from "./dashboard/data";

type LayoutProps = {
  params: { lang: string };
  children: JSX.Element;
};
const appName = process.env?.APPLICATION_NAME || "UNIREFUND";

export default async function Layout({ children, params }: LayoutProps) {
  const permission = await getPermission();
  const resources = await getLocalizationResources(params.lang);
  const session = await auth();
  const user = session?.user;
  const resourcesMap = {
    profile: resources?.AbpUi?.texts?.PersonalInfo || "Profile",
    dashboard:
      resources?.AbpForDeploy?.texts?.["Menu:Dashboard"] || "Dashboard",
    settings: resources?.AbpSettingManagement?.texts?.Settings || "Settings",
    Companies: resources?.AbpSettingManagement?.texts?.Settings || "Companies",
  };

  // const navigationLinks = [
  //   {
  //     href: "/profile",
  //     text: resourcesMap.profile,
  //   },
  //   {
  //     href: "/dashboard",
  //     text: resourcesMap.dashboard,
  //   },
  //   {
  //     title: "Pages",
  //     submenu: [
  //       {
  //         title: resourcesMap.dashboard,
  //         href: "/dashboard",
  //         description: "Show the user dashboard.",
  //       },
  //       {
  //         title: resourcesMap.profile,
  //         href: "/profile",
  //         description: "Show the user profile",
  //       },
  //     ],
  //   },
  // ];
  // const exampleMenusFull: MenuProps[] = [
  //   {
  //     label: "Pages",
  //     name: resourcesMap.profile,
  //     icon: <User size={15} className="mr-2" />,
  //     href: getBaseLink("profile", true, params.lang),
  //     permission: true,
  //   },
  //   {
  //     label: "Identity",
  //     name: "Role",
  //     icon: <SquareStack size={15} className="mr-2" />,
  //     href: getBaseLink("dashboard/role", true, params.lang),
  //     permission: "AbpIdentity.Roles",
  //   },
  //   {
  //     label: "Identity",
  //     name: "Users",
  //     icon: <Users size={15} className="mr-2" />,
  //     href: getBaseLink("dashboard/user", true, params.lang),
  //     permission: "AbpIdentity.Users",
  //   },
  //   {
  //     label: "Projects",
  //     name: "Projects",
  //     icon: <Presentation size={15} className="mr-2" />,
  //     href: getBaseLink("projects", true, params.lang),
  //     permission: true,
  //   },
  //   {
  //     label: "Projects",
  //     name: "New Project",
  //     icon: <Presentation size={15} className="mr-2" />,
  //     href: getBaseLink("projects/new", true, params.lang),
  //     permission: true,
  //   },
  //   {
  //     label: "Projects",
  //     name: "Sample Project",
  //     icon: <Presentation size={15} className="mr-2" />,
  //     href: getBaseLink(
  //       "projects/cb682186-91fb-623c-e9d6-3a12e0a6dd9a",
  //       true,
  //       params.lang
  //     ),
  //     permission: true,
  //   },
  //   {
  //     label: "Settings",
  //     name: "Settings",
  //     icon: <Presentation size={15} className="mr-2" />,
  //     href: getBaseLink("settings/profile", true, params.lang),
  //     permission: true,
  //   },
  // ];
  // const exampleMenus = exampleMenusFull.filter((menu) => {
  //   if (menu.permission) {
  //     if (typeof menu.permission === "boolean") {
  //       return menu.permission;
  //     }
  //     if (permission) return permission[menu.permission] || false;
  //   }
  //   return false;
  // });
  const userNavigation = {
    username: user?.userName ?? undefined,
    initials: user?.name?.substring(0, 2).toUpperCase(),
    email: user?.email ?? undefined,
    imageURL: "https://github.com/shadcn.png",
    menuLinks: [
      {
        href: "settings/test",
        title: resourcesMap.settings,
      },
      {
        href: "dashboardd",
        title: resourcesMap.Companies,
      },
    ],
    isLoggedIn: !!user,
    signOutFunction: signOutServer,
    resources: resources,
  };
  const dashboards = Object.entries(dataConfig).map(([key, value]) => ({
    key,
    title: value.displayName,
    href: getBaseLink(`dashboard/${key}/${value.default}`, true, params.lang),
    icon: <Presentation className="text-slate-500 w-4" />,
  }));

  const navigationItems: NavigationItem[] = [
    {
      key: "dashboard",
      title: "Dashboard",
      href: "/dashboard",
      icon: <Presentation className="text-slate-500 w-4" />,
      submenu: dashboards,
    },
    {
      key: "profile",
      title: "Profile",
      href: "/profile",
      icon: <FileBadge className="text-slate-500 w-4" />,
    },
    {
      key: "Details",
      title: "Details",
      href: "/details",
      icon: <FileBadge className="text-slate-500 w-4" />,
    },
    {
      key: "company",
      title: "Companies",
      href: "/company",
      icon: <FileBadge className="text-slate-500 w-4" />,
    },
    {
      key: "countrySettings",
      title: "Country Settings",
      href: "/country-settings",
      icon: <SlidersHorizontal className="text-slate-500 w-4" />,
    },
    {
      key: "settings",
      title: "Settings",
      href: "/settings",
      icon: <SlidersHorizontal className="text-slate-500 w-4" />,
    },
    {
      key: "projects",
      title: "Projects",
      icon: <Presentation className="text-slate-500 w-4" />,
      href: getBaseLink("projects", true, params.lang),
    },
    {
      key: "languageManagement",
      title: "Language Management",
      icon: <LanguagesIcon className="text-slate-500 w-4" />,
      href: getBaseLink("language-management", true, params.lang),
    },
  ];

  return (
    <MainLayout
      appName={appName}
      navigationItems={navigationItems}
      userNavigation={userNavigation}
      topBarComponent={
        <div className="w-min flex gap-4">
          <Input
            className="w-90"
            placeholder={`${resources?.AbpUi?.texts?.Search}...`}
          />
          <LanguageSelector
            menuAlign="end"
            cultureName={params.lang}
            resources={resources}
            baseLink={getBaseLink("", false)}
          />
        </div>
      }
    >
      {children}
    </MainLayout>
  );
}
