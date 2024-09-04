"use server";

import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { getResourceData } from "src/language-data/ProjectService";
import { getBaseLink } from "src/utils";
import { getAdminProjectsServer } from "../action";
import { Project } from "../project";

export default async function Page({
  params,
}: {
  params: { lang: string; type: string };
}) {
  const {
    pendingProjects,
    fundedProjects: fundableProjects,
    fundedProjects,
  } = await getAdminProjectsServer();
  const { languageData } = await getResourceData(params.lang);

  const projectURL = getBaseLink(
    "projects",
    true,
    params.lang,
    true,
    params.type,
  );

  return (
    <div className="flex h-full flex-col gap-2">
      <PageHeader
        description="Buradan projeleri görüntüleyebilirsiniz."
        title="Projeler"
      />
      <SectionLayout
        defaultActiveSectionId="fundable"
        sections={[
          { id: "fundable", name: "Yayında olan projeler" },
          { id: "sent-for-approval", name: "Onay bekleyen projeler" },
          { id: "completed", name: "Sona ermiş projeler" },
        ]}
        vertical
      >
        <SectionLayoutContent sectionId="fundable">
          <Project
            languageData={languageData}
            placeHolderText="Henüz yayında olan bir projeniz yok."
            projectList={fundableProjects}
            projectURL={projectURL}
          />
        </SectionLayoutContent>

        <SectionLayoutContent sectionId="sent-for-approval">
          <Project
            languageData={languageData}
            placeHolderText="Henüz onay bekleyen bir projeniz yok."
            projectList={pendingProjects}
            projectURL={projectURL}
          />
        </SectionLayoutContent>
        <SectionLayoutContent sectionId="completed">
          <Project
            languageData={languageData}
            placeHolderText="Henüz sona ermiş bir projeniz yok."
            projectList={fundedProjects}
            projectURL={projectURL}
          />
        </SectionLayoutContent>
      </SectionLayout>
    </div>
  );
}
