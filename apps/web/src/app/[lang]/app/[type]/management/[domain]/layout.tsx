/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument -- TODO: we need to fix this*/
"use client";

import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import { getResourceDataClient } from "src/language-data/SettingService";
import { useLocale } from "src/providers/locale";
import { getBaseLink } from "src/utils";
import { dataConfigOfManagement } from "../data";

interface LayoutProps {
  children: JSX.Element;
  params?: any;
}

export default function Layout({ children, params }: LayoutProps) {
  const [navbarItems, setNavbarItems] = useState<any>([]);
  const { resources } = useLocale();

  const languageData = getResourceDataClient(resources, params.lang);
  const pathname = usePathname();
  const path = pathname.split("management/")[1];
  const activePage = path.split("/")[1];

  function pageHeaderData() {
    if (activePage === "vats") {
      return {
        title: languageData.Vat,
        description: languageData["Vat.Description"],
      };
    }
    if (activePage === "productGroups") {
      return {
        title: languageData.ProductGroup,
        description: languageData["ProductGroup.Description"],
      };
    }
    return {
      title: languageData.ProductGroupVAT,
      description: languageData["ProductGroupVAT.Description"],
    };
  }

  const { title, description } = pageHeaderData();
  useEffect(() => {
    const tempNavbarItems = Object.entries(
      dataConfigOfManagement[params.domain],
    )
      .filter(([e]) => e !== "displayName" && e !== "default")
      .map(([key, value]: [string, unknown]) => {
        let name = "";
        if (
          value &&
          typeof value === "object" &&
          "title" in value &&
          typeof value.title === "string"
        ) {
          name =
            languageData[
              value.title.replaceAll(" ", "") as keyof typeof languageData
            ];
        }
        return {
          id: `${params.domain}/${key}`,
          name: name || key,
          link: getBaseLink(
            `management/${params.domain}/${key}`,
            true,
            params.lang,
            true,
            params.type,
          ),
        };
      });
    setNavbarItems(tempNavbarItems);
  }, []);

  return (
    <>
      <PageHeader description={description} title={title} />
      {navbarItems.length > 0 && (
        <SectionLayout
          defaultActiveSectionId={path}
          linkElement={Link}
          sections={navbarItems}
        >
          <SectionLayoutContent sectionId={path}>
            {children}
          </SectionLayoutContent>
        </SectionLayout>
      )}
    </>
  );
}
