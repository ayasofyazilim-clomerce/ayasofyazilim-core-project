"use client";

import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getResourceDataClient } from "src/language-data/ContractService";
import { useLocale } from "src/providers/locale";
import { getBaseLink } from "src/utils";

interface LayoutProps {
  children: JSX.Element;
  params: { lang: string; type: string };
}

export default function Layout({ children, params }: LayoutProps) {
  const pathname = usePathname();
  const { resources } = useLocale();
  const languageData = getResourceDataClient(resources, params.lang);

  const path = pathname.split("templates/")[1];

  const navbarItems = [
    {
      name: languageData["RebateTables.Templates.Create.Title"],
      id: "new-rebate-template",
      link: getBaseLink(
        "contracts/rebate/templates/new-rebate-template",
        true,
        params.lang,
        true,
        "admin",
      ),
    },
    {
      name: languageData["RebateTables.Templates.Preview"],
      id: "new-rebate-template/preview",
      link: getBaseLink(
        "contracts/rebate/templates/new-rebate-template/preview",
        true,
        params.lang,
        true,
        "admin",
      ),
    },
  ];
  return (
    <>
      <PageHeader
        LinkElement={Link}
        description={languageData["RebateTables.Templates.Create.Description"]}
        href={getBaseLink("app/admin/contracts/rebate/templates")}
        title={languageData["RebateTables.Templates.Create.Title"]}
      />
      <SectionLayout
        defaultActiveSectionId={path}
        linkElement={Link}
        sections={navbarItems}
        vertical={false}
      >
        <SectionLayoutContent sectionId={path}>{children}</SectionLayoutContent>
      </SectionLayout>
    </>
  );
}
