"use server";

import Sidebar, { MenuProps } from "@repo/ayasofyazilim-ui/molecules/side-bar";
import DashboardHeader from "@repo/ayasofyazilim-ui/organisms/header";
import { userNavTypes } from "@repo/ayasofyazilim-ui/organisms/profile-menu";
import MainLayout from "@repo/ayasofyazilim-ui/templates/main-layout";
import { getPermission } from "action";
import { auth } from "auth";
import { signOutServer } from "auth-action";
import LanguageSelector from "components/language-selector";
import { Presentation, SquareStack, User, Users } from "lucide-react";
import { getBaseLink, getLocalizationResources } from "src/utils";

type LayoutProps = {
  params: { lang: string };
  children: JSX.Element;
};

export default async function Layout({ children, params }: LayoutProps) {
  const permission = await getPermission();
  const resources = await getLocalizationResources(params.lang);
  const session = await auth();
  const user = session?.user;
  const resourcesMap = {
    profile: resources?.AbpUi?.texts?.PersonalInfo || "Profile",
    dashboard:
      resources?.AbpForDeploy?.texts?.["Menu:Dashboard"] || "Dashboard",
  };

  const navigationLinks = [
    {
      href: "/profile",
      text: resourcesMap.profile,
    },
    {
      href: "/dashboard",
      text: resourcesMap.dashboard,
    },
    {
      title: "Pages",
      submenu: [
        {
          title: resourcesMap.dashboard,
          href: "/dashboard",
          description: "Show the user dashboard.",
        },
        {
          title: resourcesMap.profile,
          href: "/profile",
          description: "Show the user profile",
        },
      ],
    },
  ];
  const exampleMenusFull: MenuProps[] = [
    {
      label: "Pages",
      name: resourcesMap.profile,
      icon: <User size={15} className="mr-2" />,
      href: getBaseLink("profile", true, params.lang),
      permission: true,
    },
    {
      label: "Identity",
      name: "Role",
      icon: <SquareStack size={15} className="mr-2" />,
      href: getBaseLink("dashboard/role", true, params.lang),
      permission: "AbpIdentity.Roles",
    },
    {
      label: "Identity",
      name: "Users",
      icon: <Users size={15} className="mr-2" />,
      href: getBaseLink("dashboard/user", true, params.lang),
      permission: "AbpIdentity.Users",
    },
    {
      label: "Projects",
      name: "Projects",
      icon: <Presentation size={15} className="mr-2" />,
      href: getBaseLink("projects", true, params.lang),
      permission: true,
    },
    {
      label: "Projects",
      name: "New Project",
      icon: <Presentation size={15} className="mr-2" />,
      href: getBaseLink("projects/new", true, params.lang),
      permission: true,
    },
    {
      label: "Projects",
      name: "Sample Project",
      icon: <Presentation size={15} className="mr-2" />,
      href: getBaseLink(
        "projects/cb682186-91fb-623c-e9d6-3a12e0a6dd9a",
        true,
        params.lang
      ),
      permission: true,
    },
    {
      label: "Settings",
      name: "Settings",
      icon: <Presentation size={15} className="mr-2" />,
      href: getBaseLink("settings/profile", true, params.lang),
      permission: true,
    },
  ];
  const exampleMenus = exampleMenusFull.filter((menu) => {
    if (menu.permission) {
      if (typeof menu.permission === "boolean") {
        return menu.permission;
      }
      if (permission) return permission[menu.permission] || false;
    }
    return false;
  });
  const userNavigation: userNavTypes = {
    username: user?.userName ?? undefined,
    initials: user?.name?.substring(0, 2).toUpperCase(),
    email: user?.email ?? undefined,
    imageURL: "https://github.com/shadcn.png",
    menuLinks: [
      {
        href: "profile",
        text: resourcesMap.profile,
        shortcut: "⌘P",
      },
      {
        href: "dashboard",
        text: resourcesMap.dashboard,
        shortcut: "⌘D",
      },
    ],
    signOutFunction: signOutServer,
  };
  return (
    <MainLayout
      HeaderComponent={
        <DashboardHeader
          logo="https://github.com/ayasofyazilim-clomerce.png"
          title="ayasofya"
          userNav={userNavigation}
          navMenu={navigationLinks}
          extraMenu={<LanguageSelector />}
          navMenuLocation="left"
        />
      }
      SidebarComponent={
        <Sidebar className="hidden md:flex shadow-md" menus={exampleMenus} />
      }
    >
      {children}
    </MainLayout>
  );
}
