"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ayasofyazilim-ui/atoms/accordion";
import { Button } from "@repo/ayasofyazilim-ui/atoms/button";
import { ScrollArea } from "@repo/ayasofyazilim-ui/atoms/scroll-area";
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
import { PanelLeftClose } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export type MainLayoutProps = {
  appName: string;
  children: JSX.Element;
  navigationItems: NavigationItem[];
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
  topBarComponent,
}: MainLayoutProps) {
  const [minNavbar, setMinNavbar] = useState(false);
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
        <ScrollArea className="grow bg-white pt-4 overflow-auto flex flex-col h-full [&>div>div]:h-full [&>div>div]:flex">
          <Menu minNavbar={minNavbar} navigationItems={navigationItems} />
        </ScrollArea>
      </div>
      <div className="flex flex-col flex-1 overflow-auto">
        <div
          className={`min-h-16 max-h-16 bg-white w-full px-4 flex items-center justify-end border-b ${minNavbar ? "pl-14" : ""}`}
        >
          {topBarComponent}
        </div>
        <div className="bg-slate-50 p-0 overflow-hidden flex-1 pb-3">
          {children}
        </div>
      </div>
    </div>
  );
}
interface IMenuProps {
  minNavbar: boolean;
  navigationItems: NavigationItem[];
}

export function Menu({ minNavbar, navigationItems }: IMenuProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className={`${minNavbar ? "w-16" : "w-full"} h-full max-h-[calc(100%-4rem)] pt-4 inline-table`}
    >
      {navigationItems.map((item: NavigationItem) => (
        <MenuItem
          key={item.key}
          item={item}
          isFromSubMenu={false}
          minNavbar={minNavbar}
        />
      ))}
    </Accordion>
  );
}
interface IMenuItemProps {
  item: NavigationItem;
  isFromSubMenu?: boolean;
  minNavbar?: boolean;
}
export function MenuItem({ item, isFromSubMenu, minNavbar }: IMenuItemProps) {
  return (
    <AccordionItem
      value={item.key}
      key={item.key}
      className={`border-0 p-0 ${minNavbar ? "w-16" : "w-full"}`}
      data-has-child={item.submenu ? true : false}
    >
      <MenuItemTrigger
        item={item}
        isFromSubMenu={isFromSubMenu}
        minNavbar={minNavbar}
      />
      <MenuItemContent item={item} />
    </AccordionItem>
  );
}
export function MenuItemContent({ item }: { item: NavigationItem }) {
  let submenus = null;
  if (item.submenu) {
    submenus = item.submenu.map((subMenuItem: NavigationItem) => (
      <MenuItem key={subMenuItem.key} item={subMenuItem} isFromSubMenu={true} />
    ));
  }
  return <AccordionContent className="p-0">{submenus}</AccordionContent>;
}
interface IMenuItemTriggerProps {
  item: NavigationItem;
  isFromSubMenu?: boolean;
  minNavbar?: boolean;
}
export function MenuItemTrigger({
  item,
  isFromSubMenu,
  minNavbar,
}: IMenuItemTriggerProps) {
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
          {item.badge && !minNavbar && <NavigationBadge {...item.badge} />}
        </AccordionTrigger>
      </Tooltip>
    );
  }
  return (
    <Tooltip>
      <div
        key={item.key}
        data-has-child={item.submenu ? true : false}
        className={`${isActive ? " border-r-2 border-primary bg-red-50" : ""} flex justify-start hover:no-underline  h-10 items-center gap-2 [&[data-has-child=false]>svg]:hidden p-0 ${isFromSubMenu ? "pl-6 pr-4" : `${minNavbar ? "pr-0" : "pr-4"}`} `}
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
          {item.badge && !minNavbar && <NavigationBadge {...item.badge} />}
        </Link>
      </div>
    </Tooltip>
  );
}
