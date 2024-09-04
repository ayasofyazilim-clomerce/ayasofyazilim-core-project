"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ayasofyazilim-ui/atoms/accordion";
import { Badge } from "@repo/ayasofyazilim-ui/atoms/badge";
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
  wip?: boolean;
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
        className={`flex h-full flex-col border-r ${minNavbar ? "min-w-16 max-w-16" : "fixed z-[99] w-full min-w-72 max-w-[unset] sm:relative sm:z-0 sm:max-w-72"} transition-all`}
      >
        <div className="flex max-h-16 min-h-16 items-center border-b bg-white px-4">
          {appName !== "UNIREFUND" ? (
            <div className="text-primary text-xl font-bold">
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
            className={`ml-auto h-6 w-6 p-0 ${minNavbar ? "fixed left-20 border bg-white" : ""}`}
            variant="link"
            onClick={() => setMinNavbar((prev) => !prev)}
          >
            <PanelLeftClose
              className={`w-4 text-slate-900 transition  ${minNavbar ? "rotate-180" : "rotate-0"}`}
            />
          </Button>
        </div>
        <ScrollArea className="flex h-full grow flex-col overflow-auto bg-white pt-4 [&>div>div]:flex [&>div>div]:h-full">
          <Menu minNavbar={minNavbar} navigationItems={navigationItems} />
        </ScrollArea>
      </div>
      <div className="flex flex-1 flex-col overflow-auto">
        <div
          className={`flex max-h-16 min-h-16 w-full items-center justify-end border-b bg-white pl-4 ${minNavbar ? "pl-14" : ""}`}
        >
          {topBarComponent}
        </div>
        <div className="flex-1 overflow-hidden bg-slate-50 p-0 pb-3">
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
      className={`${minNavbar ? "w-16" : "w-full"} inline-table h-full max-h-[calc(100%-4rem)] pt-4`}
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
      className={`border-0 p-0 ${minNavbar ? "w-16" : "w-full"} ${item.wip ? "opacity-50" : ""}`}
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
  const pathname = usePathname();
  const itemParentLink = item.href.substring(0, item.href.lastIndexOf("/"));
  const lastPartOfParentLink = itemParentLink.substring(
    itemParentLink.lastIndexOf("/") + 1,
  );

  const isActive =
    pathname === item.href ||
    (isFromSubMenu &&
      (itemParentLink === pathname ||
        (lastPartOfParentLink !== "refund" &&
          itemParentLink ===
            pathname.substring(0, pathname.lastIndexOf("/")))));

  if (item.submenu) {
    return (
      <Tooltip>
        <AccordionTrigger
          key={item.key}
          data-has-child={item.submenu ? true : false}
          className={`${isActive ? " border-primary border-r-2 bg-red-50" : ""} flex h-10 items-center justify-start gap-2 px-4 py-0 hover:no-underline [&[data-has-child=false]>svg]:hidden`}
        >
          <div
            className={`flex w-full min-w-4 max-w-4 items-center ${minNavbar ? "max-w-full  justify-center" : ""}`}
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
            <div className="w-full text-left text-xs font-medium">
              {item.title}
            </div>
          )}
          {item.badge && !minNavbar && <NavigationBadge {...item.badge} />}
          {item.wip && (
            <Badge
              variant={"outline"}
              className=" border-0 bg-orange-200 text-orange-600"
            >
              WIP
            </Badge>
          )}
        </AccordionTrigger>
      </Tooltip>
    );
  }
  return (
    <Tooltip>
      <div
        key={item.key}
        data-has-child={item.submenu ? true : false}
        className={`${isActive ? " border-primary border-r-2 bg-red-50" : ""} flex h-10 items-center  justify-start gap-2 p-0 hover:no-underline [&[data-has-child=false]>svg]:hidden ${isFromSubMenu ? "pl-6 pr-4" : `${minNavbar ? "pr-0" : "pr-4"}`} `}
      >
        <Link
          href={item.href}
          className={`flex h-10 w-full items-center justify-start gap-2 ${minNavbar ? "pl-0" : "pl-4"} ${item.wip ? "pointer-events-none" : ""}`}
          aria-disabled={item.wip}
          tabIndex={item.wip ? -1 : undefined}
        >
          <div
            className={`flex w-full min-w-4 max-w-4 items-center ${minNavbar ? "max-w-full  justify-center" : ""}`}
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
            <div className="w-full text-left text-xs font-medium">
              {item.title}
            </div>
          )}
          {item.badge && !minNavbar && <NavigationBadge {...item.badge} />}
          {item.wip && (
            <Badge
              variant={"outline"}
              className="mr-6 border-0 bg-orange-200 text-orange-600"
            >
              WIP
            </Badge>
          )}
        </Link>
      </div>
    </Tooltip>
  );
}
