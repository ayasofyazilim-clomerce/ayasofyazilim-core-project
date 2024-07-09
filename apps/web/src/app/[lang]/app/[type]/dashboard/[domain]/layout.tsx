"use client";

import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getResourceDataClient } from "src/language-data/AbpUiNavigation/navbar";
import { useLocale } from "src/providers/locale";
import { getBaseLink } from "src/utils";
import { dataConfig } from "../data";

interface LayoutProps {
  children: JSX.Element;
  params?: any;
}

export default function Layout({ children, params }: LayoutProps) {
  const [navbarItems, setNavbarItems] = useState<any>([]);
  const { resources } = useLocale();

  const languageData = getResourceDataClient(resources);
  const pathname = usePathname();
  const path = pathname.split("dashboard/")[1];

  useEffect(() => {
    const tempNavbarItems = Object.entries(dataConfig[params.domain])
      .filter(([e]) => e !== "displayName" && e !== "default")
      .map(([key]: [any, any]) => ({
        id: `${params.domain}/${key}`,
        name:
          languageData[`Identity:${key}` as keyof typeof languageData] || key,
        link: getBaseLink(
          `dashboard/${params.domain}/${key}`,
          true,
          params.lang,
          true,
          params.type,
        ),
      }));
    setNavbarItems(tempNavbarItems);
  }, []);

  return (
    <>
      {navbarItems.length > 0 && (
        <SectionLayout
          className="w-full"
          content={children}
          contentClassName=""
          defaultActiveSectionId={path}
          isScrollArea
          openOnNewPage
          sections={navbarItems}
          vertical={false}
        />
      )}
    </>
  );
}
