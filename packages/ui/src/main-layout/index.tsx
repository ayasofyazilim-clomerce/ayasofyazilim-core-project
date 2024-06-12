"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ayasofyazilim-ui/atoms/accordion";
import { Button } from "@repo/ayasofyazilim-ui/atoms/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ayasofyazilim-ui/atoms/tooltip";
import { Logo } from "@repo/ui/logo";
import {
  NavigationBadge,
  NavigationBadgeProps,
} from "@repo/ui/navigation-badge";
import { ProfileMenu, ProfileMenuProps } from "@repo/ui/profile-menu";
import { PanelLeftClose } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
export type MainLayoutProps = {
  appName: string;
  children: JSX.Element;
  navigationItems: NavigationItem[];
  userNavigation: ProfileMenuProps;
  topBarComponent?: JSX.Element;
};

export type NavigationItem = {
  key: string;
  isActive?: boolean;
  isEnabled?: boolean;
  title: string;
  href: string;
  icon?: JSX.Element;
  badge?: NavigationBadgeProps;
  submenu?: NavigationItem[];
};

export function MainLayout({
  appName,
  children,
  navigationItems,
  userNavigation,
  topBarComponent,
}: MainLayoutProps) {
  const [minNavbar, setMinNavbar] = React.useState(false);
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div
        className={`h-full flex flex-col border-r ${minNavbar ? "min-w-16 max-w-16" : "min-w-72 fixed z-[99] w-full max-w-[unset] sm:z-0 sm:max-w-72 sm:relative"} transition-all`}
      >
        <div className="min-h-16 max-h-16 bg-white px-4 flex items-center border-b">
          {appName !== "UNIREFUND" ? (
            <div className="font-bold text-xl text-primary">
              {appName.toLocaleUpperCase()}
            </div>
          ) : (
            <Logo
              variant={minNavbar ? "icon" : "text"}
              iconProps={{
                className: "w-10 h-10",
                taxFree: false,
                fill: "#DB0000",
              }}
              textProps={{
                className: "h-4",
                primaryColor: "#DB0000",
              }}
              appIconProps={{
                className: "w-10 h-10",
              }}
            />
          )}
          <Button
            className={`ml-auto p-0 w-6 h-6 ${minNavbar ? "fixed left-20 border bg-white" : ""}`}
            variant="link"
            onClick={() => setMinNavbar((prev) => !prev)}
          >
            <PanelLeftClose
              className={`w-4 text-slate-900 transition  ${minNavbar ? "rotate-180" : "rotate-0"}`}
            />
          </Button>
        </div>
        <div className="grow bg-white pt-4 overflow-y-auto flex flex-col">
          {Menu({ minNavbar, navigationItems })}
          <ProfileMenu
            className="mt-auto bg-white px-4 h-16 border-t z-[100]"
            minNavbar={minNavbar}
            {...userNavigation}
          />
        </div>
      </div>
      <div className="grow overflow-hidden flex flex-col">
        <div
          className={`min-h-16 max-h-16 bg-white w-full px-4 flex items-center justify-end border-b ${minNavbar ? "pl-14" : ""}`}
        >
          {topBarComponent}
        </div>
        <div className="grow bg-slate-50 p-0 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

export function Menu({
  minNavbar,
  navigationItems,
}: {
  minNavbar: boolean;
  navigationItems: NavigationItem[];
}) {
  return (
    <Accordion defaultValue="profile" type="single" collapsible>
      {navigationItems.map((item: NavigationItem) => {
        return MenuItem(item, false, minNavbar);
      })}
    </Accordion>
  );
}

export function MenuItem(
  item: NavigationItem,
  isFromSubMenu?: boolean,
  minNavbar?: boolean
) {
  return (
    <AccordionItem
      value={item.key}
      key={item.key}
      className="border-0 p-0"
      data-has-child={item.submenu ? true : false}
    >
      {MenuItemTrigger(item, isFromSubMenu, minNavbar)}
      {MenuItemContent(item)}
    </AccordionItem>
  );
}
export function MenuItemContent(item: NavigationItem) {
  let submenus = null;
  if (item.submenu) {
    submenus = item.submenu.map((submenuitem: NavigationItem) => {
      return MenuItem(submenuitem, true);
    });
  }
  return <AccordionContent className="p-0">{submenus}</AccordionContent>;
}
export function MenuItemTrigger(
  item: NavigationItem,
  isFromSubMenu?: boolean,
  minNavbar?: boolean
) {
  const pathname = usePathname().split("/")[2];
  const isActive = pathname ? "/" + pathname === item.href : item.href === "/";
  if (item.submenu) {
    return (
      <Tooltip>
        <AccordionTrigger
          key={item.key}
          data-has-child={item.submenu ? true : false}
          className={`${isActive ? " border-r-2 border-primary bg-red-50" : ""} flex justify-start items-center gap-2 h-10 hover:no-underline [&[data-has-child=false]>svg]:hidden py-0 px-4`}
        >
          <div
            className={`w-full min-w-4 max-w-4 flex items-center ${minNavbar ? "justify-center  max-w-full" : ""}`}
          >
            {minNavbar ? (
              <TooltipTrigger>{item.icon ?? item.icon}</TooltipTrigger>
            ) : (
              item.icon ?? item.icon
            )}
          </div>
          {minNavbar ? (
            <TooltipContent>{item.title}</TooltipContent>
          ) : (
            <div className="w-full font-medium text-xs text-left">
              {item.title}
            </div>
          )}
          {item.badge && !minNavbar ? (
            <NavigationBadge {...item.badge} />
          ) : (
            <></>
          )}
        </AccordionTrigger>
      </Tooltip>
    );
  }
  return (
    <Tooltip>
      <AccordionTrigger
        key={item.key}
        data-has-child={item.submenu ? true : false}
        className={`${isActive ? " border-r-2 border-primary bg-red-50" : ""} flex px-4 justify-start hover:no-underline  h-10 items-center gap-2 [&[data-has-child=false]>svg]:hidden p-0 ${isFromSubMenu ? "pl-6 pr-4" : `${minNavbar ? "pr-0" : "pr-4"}`} `}
      >
        <Link
          href={item.href}
          className={`flex gap-2 items-center justify-start w-full h-10 ${minNavbar ? "pl-0" : "pl-4"}`}
        >
          <div
            className={`w-full min-w-4 max-w-4 flex items-center ${minNavbar ? "justify-center  max-w-full" : ""}`}
          >
            {minNavbar ? (
              <TooltipTrigger>{item.icon ?? item.icon}</TooltipTrigger>
            ) : (
              item.icon ?? item.icon
            )}
          </div>
          {minNavbar ? (
            <TooltipContent>{item.title}</TooltipContent>
          ) : (
            <div className="w-full font-medium text-xs text-left">
              {item.title}
            </div>
          )}
          {item.badge && !minNavbar ? (
            <NavigationBadge {...item.badge} />
          ) : (
            <></>
          )}
        </Link>
      </AccordionTrigger>
    </Tooltip>
  );
}
