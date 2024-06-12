"use server";

import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout";
import { getBaseLink, getLocalizationResources } from "src/utils";
import { DataTableDemo } from "./form";

export default async function Page({ params }: { params: { lang: string } }) {
  const resources = await getLocalizationResources(params.lang);
  const defaultResources = await getLocalizationResources("en");

  const navbarItems = [
    {
      id: "general",
      link: getBaseLink(`projects`, true),
      name: "Dil",
    },
  ];

  return (
    <SectionLayout
      sections={navbarItems}
      defaultActiveSectionId={"general"}
      openOnNewPage={true}
      content={
        <div className="relative w-full container mt-4">
          <div className="flex flex-col gap-2">
            <DataTableDemo
              lang={params.lang}
              resources={resources}
              defaultResources={defaultResources}
            />
          </div>
        </div>
      }
    />
  );
}
