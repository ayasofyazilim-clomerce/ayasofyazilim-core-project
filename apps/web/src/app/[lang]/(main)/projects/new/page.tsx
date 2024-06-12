"use server";

import { getBaseLink, getLocalizationResources } from "src/utils";
import NewProjectForm from "./form";
import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout";

export default async function Page({ params }: { params: { lang: string } }) {
  const resources = await getLocalizationResources(params.lang);
  const navbarItems = [
    {
      id: "general",
      link: getBaseLink(`projects/new`, true),
      name: "Create Project",
    },
  ];
  return (
    <SectionLayout
      sections={navbarItems}
      defaultActiveSectionId={"general"}
      openOnNewPage={true}
      content={
        <div className="w-full mx-auto max-w-3xl">
          <div className="flex flex-col items-center justify-start mb-8 w-full">
            <div className="flex-row p-4 w-10/12 ">
              <NewProjectForm resources={resources} />
            </div>
          </div>
        </div>
      }
    />
  );
}
