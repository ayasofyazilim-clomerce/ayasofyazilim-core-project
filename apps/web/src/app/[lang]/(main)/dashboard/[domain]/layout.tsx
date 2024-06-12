"use client";

import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { dataConfig } from "../data";
import { getBaseLink } from "src/utils";

function isPathValid(path: string, navbarItems: any[]) {
  const validPaths = navbarItems.map((item) => item.id);
  return validPaths.includes(path) || path === undefined;
}

type LayoutProps = {
  children: JSX.Element;
  params?: any;
};

export default function Layout({ children, params }: LayoutProps) {
  const [navbarItems, setnavbarItems] = useState<any>([]);
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("dashboard/")?.[1];

  useEffect(() => {
    if (!path || isPathValid(path, navbarItems) === false) {
      //   router.push("dashboardfsdfasdf/role");
    }
    const tempNavbarItems = Object.entries(dataConfig[params.domain])
      .filter(([e, value]) => e !== "displayName" && e !== "default")
      .map(([key, value]: [any, any]) => ({
        id: `${params.domain}/${key}`,
        name: key,
        link: getBaseLink(`dashboard/${params.domain}/${key}`, true),
      }));
    setnavbarItems(tempNavbarItems);
  }, []);
  console.log("path", path);
  return (
    <>
      {navbarItems.length > 0 && (
        <SectionLayout
          vertical={false}
          sections={navbarItems}
          defaultActiveSectionId={path}
          openOnNewPage={true}
          content={children}
          contentClassName=""
          className="w-full"
          isScrollArea={false}
        />
      )}
    </>
  );
}
