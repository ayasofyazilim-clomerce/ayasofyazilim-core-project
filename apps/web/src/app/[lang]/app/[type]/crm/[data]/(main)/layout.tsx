"use client";

import type { ISection } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import { getResourceDataClient } from "src/language-data/CRMService";
import { useLocale } from "src/providers/locale";
import { getBaseLink } from "src/utils";
import { dataConfigOfCrm } from "../../data";

interface LayoutProps {
  children: JSX.Element;
  params: {
    lang: string;
    type: string;
  };
}

type SectionNavbarItems = ISection[];

export default function Layout({ children, params }: LayoutProps) {
  const [navbarItems, setNavbarItems] = useState<SectionNavbarItems>([]);
  const { resources } = useLocale();
  const languageData = getResourceDataClient(resources, params.lang);
  const pathname = usePathname();
  const path = pathname.split("crm/")[1];
  const activePage = path.split("/")[1];

  //TODO make this page serverside
  useEffect(() => {
    const tempNavbarItems = Object.entries(dataConfigOfCrm.companies.pages)
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
          id: key,
          name: name || key,
          link: getBaseLink(`crm/${key}`, true, params.lang, true, params.type),
        };
      });
    setNavbarItems(tempNavbarItems);
  }, []);

  function pageHeaderData() {
    if (activePage === "merchants") {
      return {
        title: languageData.Merchants,
        description: languageData["Merchants.Description"],
      };
    }
    if (activePage === "refund-points") {
      return {
        title: languageData.RefundPoints,
        description: languageData["RefundPoints.Description"],
      };
    }
    if (activePage === "tax-free") {
      return {
        title: languageData.TaxFree,
        description: languageData["TaxFree.Description"],
      };
    }
    if (activePage === "tax-offices") {
      return {
        title: languageData.TaxOffices,
        description: languageData["TaxOffices.Description"],
      };
    }
    return {
      title: languageData.Customs,
      description: languageData["Customs.Description"],
    };
  }
  const { title, description } = pageHeaderData();

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
