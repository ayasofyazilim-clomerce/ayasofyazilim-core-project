"use server";

import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import { getBaseLink, getLocalizationResources } from "src/utils";
import { DataTableDemo } from "./form";

export default async function Page({ params }: { params: { lang: string } }) {
  const resources = await getLocalizationResources(params.lang);
  const defaultResources = await getLocalizationResources("en");

  const navbarItems = [
    {
      id: "general",
      link: getBaseLink(`projects`, true),
      name: "Dil Yönetimi",
    },
  ];

  return (
    <div className="flex h-full flex-col gap-2">
      <PageHeader
        description="Buradan dil ekleyebilir ya da güncelleyebilirsiniz."
        title="Dil Yönetimi"
      />
      <SectionLayout defaultActiveSectionId="general" sections={navbarItems}>
        <SectionLayoutContent sectionId="general">
          <DataTableDemo
            defaultResources={defaultResources}
            lang={params.lang}
            resources={resources}
          />
        </SectionLayoutContent>
      </SectionLayout>
    </div>
  );
}
