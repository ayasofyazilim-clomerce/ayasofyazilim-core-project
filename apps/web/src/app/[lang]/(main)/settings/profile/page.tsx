"use server";

import { auth } from "auth";
import ProfileForm from "./form";
import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout";
import { sectionItems } from "../sectionItems";
import { getLocalizationResources } from "src/utils";

export default async function Page({ params }: { params: { lang: string } }) {
  const resources = await getLocalizationResources(params.lang);
  const navigationSections = sectionItems.map((item) => {
    return {
      ...item,
      name: resources?.AbpForDeploy?.texts?.[item.name] ?? item.defaultName,
    };
  });

  const session = await auth();
  const user = session?.user;
  return (
    <SectionLayout
      sections={navigationSections}
      defaultActiveSectionId={"profile"}
      openOnNewPage={true}
      content={<ProfileForm user={user} />}
      contentClassName="flex flex-col-reverse md:flex-row flex-wrap-reverse flex-1 lg:gap-16 md:gap-4 justify-center"
    />
  );
}
