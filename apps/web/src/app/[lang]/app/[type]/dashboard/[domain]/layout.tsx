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
import { getResourceDataClient } from "src/language-data/IdentityService";
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

  const languageData = getResourceDataClient(resources, params.lang);
  const pathname = usePathname();
  const path = pathname.split("dashboard/")[1];
  const activePage = path.split("/")[1];

  useEffect(() => {
    const tempNavbarItems = Object.entries(dataConfig[params.domain])
      .filter(([e]) => e !== "displayName" && e !== "default")
      .map(([key]: [string, unknown]) => {
        return {
          id: `${params.domain}/${key}`,
          name:
            languageData[
              (key[0].toUpperCase() + key.slice(1)) as keyof typeof languageData
            ] || key,
          link: getBaseLink(
            `dashboard/${params.domain}/${key}`,
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
      <PageHeader
        description={
          languageData[
            `${
              activePage[0].toUpperCase() +
              activePage.slice(1).substring(0, activePage.slice(1).length - 1)
            }.Description` as keyof typeof languageData
          ] ||
          languageData[
            `${
              activePage[0].toUpperCase() + activePage.slice(1)
            }.Description` as keyof typeof languageData
          ]
        }
        title={
          languageData[
            (activePage[0].toUpperCase() +
              activePage.slice(1)) as keyof typeof languageData
          ]
        }
      />
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
