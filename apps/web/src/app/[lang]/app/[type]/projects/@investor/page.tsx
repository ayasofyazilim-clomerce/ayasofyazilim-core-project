//"use server";

import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
// import ProjectCard from "@repo/ui/upwithcrowd/project/project-card";
import { PackageSearch } from "lucide-react";
// import { ProjectStatusEnums } from "src/enums/project";
// import { getResourceData } from "src/language-data/Projects/projects";
// import { getBaseLink } from "src/utils";
// import { getAdminProjectsServer, getUsersProjectsServer } from "../action";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";

export default function Page() {
  // export default async function Page({
  //   params,
  // }: {
  //   params: { lang: string; type: string };
  // }) {
  const fundedProjects = [];
  // const { languageData } = await getResourceData(params.lang);

  // const projectURL = getBaseLink(
  //   "projects",
  //   true,
  //   params.lang,
  //   true,
  //   params.type
  // );

  return (
    <div className="flex flex-col gap-2 h-full">
      <PageHeader
        description="Buradan yatırım yaptığınız projeleri görüntüleyebilirsiniz."
        title="Projeler"
      />
      <SectionLayout
        defaultActiveSectionId="fundable"
        sections={[{ id: "fundable", name: "Yatırımlarım" }]}
        vertical
      >
        <SectionLayoutContent sectionId="fundable">
          {!fundedProjects.length && (
            <div className="flex h-full">
              <div className="flex flex-col items-center m-auto">
                <PackageSearch color="#222" size={120} />
                <h3 className="mt-2">
                  Henüz yatırım yaptığınız bir proje yok.
                </h3>
              </div>
            </div>
          )}
        </SectionLayoutContent>
      </SectionLayout>
    </div>
  );
}
