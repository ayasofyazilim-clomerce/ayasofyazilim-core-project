"use server";
import { Input } from "@/components/ui/input";
import { MainLayout, NavigationItem } from "@repo/ui/main-layout";
import { ProfileMenuProps } from "@repo/ui/profile-menu";
import { auth } from "auth";
import { signOutServer } from "auth-action";
import LanguageSelector from "components/language-selector";
import { getLocalizationResources } from "src/utils";
import { useLocale } from "src/providers/locale";
import { FileBadge, Presentation, SlidersHorizontal } from "lucide-react";

type LayoutProps = {
  params: { lang: string };
  children: JSX.Element;
};

export default async function Layout({ children, params }: LayoutProps) {
  // const permission = await getPermission();
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
  //     href: getBaseLink("profile", true),
  //     permission: true,
  //   },
  //   {
  //     label: "Identity",
  //     name: "Role",
  //     icon: <SquareStack size={15} className="mr-2" />,
  //     href: getBaseLink("dashboard/role", true),
  //     permission: "AbpIdentity.Roles",
  //   },
  //   {
  //     label: "Identity",
  //     name: "Users",
  //     icon: <Users size={15} className="mr-2" />,
  //     href: getBaseLink("dashboard/user", true),
  //     permission: "AbpIdentity.Users",
  //   },
  //   {
  //     label: "Pages",
  //     name: "Projects",
  //     icon: <Presentation size={15} className="mr-2" />,
  //     href: getBaseLink("projects", true),
  //     permission: true,
  //   },
  //   {
  //     label: "Settings",
  //     name: "Settings",
  //     icon: <Presentation size={15} className="mr-2" />,
  //     href: getBaseLink("settings/profile", true),
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
  const userNavigation: ProfileMenuProps = {
    username: user?.userName ?? undefined,
    initials: user?.name?.substring(0, 2).toUpperCase(),
    email: user?.email ?? undefined,
    imageURL: "https://github.com/shadcn.png",
    menuLinks: [
      {
        href: "settings",
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

  const navigationItems: NavigationItem[] = [
    {
      key: "dashboard",
      title: "Dashboard",
      href: "/dashboard",
      icon: <Presentation className="text-slate-500 w-4" />,
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
  ];

  return (
    <MainLayout
      navigationItems={navigationItems}
      userNavigation={userNavigation}
      topBarComponent={
        <div className="w-min flex gap-4">
          <Input
            className="w-90"
            placeholder={`${resources?.AbpUi?.texts?.Search}...`}
          />
          <LanguageSelector menuAlign="end" />
        </div>
      }
    >
      {children}
    </MainLayout>
  );
}
