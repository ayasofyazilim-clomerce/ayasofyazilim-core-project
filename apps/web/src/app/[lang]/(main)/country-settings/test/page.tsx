"use server";

import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout";
import { getLocalizationResources } from "src/utils";
import { sectionItems } from "../sectionItems";

export default async function Page({ params }: { params: { lang: string } }) {
  const resources = await getLocalizationResources(params.lang);
  const navigationSections = sectionItems.map((item) => {
    return {
      ...item,
      name: resources?.AbpForDeploy?.texts?.[item.name] ?? item.defaultName,
    };
  });
  return (
    <SectionLayout
      sections={navigationSections}
      defaultActiveSectionId={"test"}
      openOnNewPage={true}
      content={<>Test</>}
      contentClassName="flex flex-col-reverse md:flex-row flex-wrap-reverse flex-1 lg:gap-16 md:gap-4 justify-center"
    />
  );
}
