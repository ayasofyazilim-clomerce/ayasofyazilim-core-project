"use client";

import { BreadcrumbItemType, NavbarItemsFromDB } from "@repo/ui/theme/types";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "../../providers/theme";
import Navbar from "./components/navbar";

// const PageHeader = dynamic(() => import("../../../../ayasofyazilim-ui/src/molecules/page-header"), {
//   ssr: false,
//   loading: () => (
//     <div className="mb-4 flex items-center gap-4 px-2">
//       <Skeleton className="h-12 w-12 " />
//       <div>
//         <Skeleton className="h-6 w-80 " />
//         <Skeleton className="w-120 mt-1  h-6" />
//       </div>
//     </div>
//   ),
// });

function findActiveNavbarItem(navbarItems: NavbarItemsFromDB[], pathName: string) {
  let item = navbarItems?.find((i) => "/" + i.key === pathName);
  if (item) {
    return item;
  }
  let path = pathName;
  while (path.length > 1) {
    path = path.substring(0, path.lastIndexOf("/"));
    item = navbarItems?.find((i) => "/" + i.key === path);
    if (item) {
      return item;
    }
  }
  return undefined;
}

function findBreadcrumbItems(
  navbarItems: NavbarItemsFromDB[],
  activeItem: NavbarItemsFromDB | undefined,
  data: NavbarItemsFromDB[],
) {
  if (!activeItem) {
    return;
  }

  data.push(activeItem);
  const active = navbarItems.find((i) => i.key === activeItem?.parentNavbarItemKey);
  if (active && active?.parentNavbarItemKey !== "/") {
    return findBreadcrumbItems(navbarItems, active, data);
  }
  return data;
}

export function HeaderSection() {
  const { navbarItems, prefix, lang, tenantData, notification } = useTheme();
  const pathName = usePathname();

  const { activeNavItem, pageBackEnabled, breadcrumbItems } = useMemo(() => {
    const homeBreadcrumb: BreadcrumbItemType = {
      ...navbarItems[0],
      subNavbarItems: navbarItems?.filter((i) => i.parentNavbarItemKey === lang),
    };
    const data: NavbarItemsFromDB[] = [];
    const item = findActiveNavbarItem(navbarItems, pathName);
    const pageBackEnabled = "/" + item?.key !== pathName;

    const breadcrumbItems: BreadcrumbItemType[] = [];
    const navItems = findBreadcrumbItems(navbarItems, item, data);
    navItems?.forEach((n) => {
      const subItem = {
        ...n,
        subNavbarItems: navbarItems?.filter((i) => i.parentNavbarItemKey === n.parentNavbarItemKey),
      };
      breadcrumbItems.push(subItem);
    });
    breadcrumbItems.pop();
    breadcrumbItems.push(homeBreadcrumb);
    breadcrumbItems.reverse();
    return {
      activeNavItem: item,
      pageBackEnabled,
      breadcrumbItems,
    };
  }, [pathName, navbarItems]);

  if (!activeNavItem) return null;

  const [pageHeaderProps, setPageHeaderProps] = useState({
    title: activeNavItem.displayName,
    description: activeNavItem.description,
    href: "/" + activeNavItem.href,
  });

  useEffect(() => {
    const newTitle = document.getElementById("page-title")?.textContent || activeNavItem.displayName;
    const newDescription = document.getElementById("page-description")?.textContent || activeNavItem.description;
    const newHref = document.getElementById("page-back-link")?.textContent || "/" + activeNavItem.href;

    setPageHeaderProps({
      title: newTitle,
      description: newDescription,
      href: newHref,
    });
  }, [pathName]);

  return (
    <div className="flex flex-col gap-2 sm:gap-3 px-2 sm:px-4 md:px-8 lg:px-16">
      <Navbar
        navbarItems={navbarItems}
        navigation={breadcrumbItems}
        prefix={prefix}
        lang={lang}
        tenantData={tenantData}
        notification={notification}
      />
      {/* {pathName.split(lang + "/")[1] !== "unauthorized" && (
        <PageHeader
          title={pageHeaderProps.title}
          description={pageHeaderProps.description}
          LinkElement={pageBackEnabled ? Link : undefined}
          href={pageHeaderProps.href}
        />
      )} */}
    </div>
  );
}

export default HeaderSection;
