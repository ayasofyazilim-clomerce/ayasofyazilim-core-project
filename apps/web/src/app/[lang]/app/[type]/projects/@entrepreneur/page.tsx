"use server";

import CustomButton from "@repo/ayasofyazilim-ui/molecules/button";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import Link from "next/link";
import { getResourceData } from "src/language-data/Projects/projects";
import { getBaseLink } from "src/utils";
import { getUsersProjectsServer } from "../action";
import { Project } from "../project";

export default async function Page({
  params,
}: {
  params: { lang: string; type: string };
}) {
  const {
    pendingProjects,
    fundableProjects,
    approvedProjects,
    fundedProjects,
    draftProjects,
    rejectedProjects,
  } = await getUsersProjectsServer();
  const { languageData } = await getResourceData(params.lang);

  const projectURL = getBaseLink(
    "projects",
    true,
    params.lang,
    true,
    params.type,
  );

  return (
    <div className="flex flex-col gap-2 h-full">
      <PageHeader
        description="Buradan projelerinizi görüntüleyebilirsiniz."
        title="Projelerim"
      />

      <div className=" flex flex-row flex-wrap justify-end items-center">
        <Link href={getBaseLink("app/entrepreneur/projects/new", true)}>
          <CustomButton variant="outline">
            {languageData.CreateProject}
          </CustomButton>
        </Link>
      </div>

      <SectionLayout
        defaultActiveSectionId="fundable"
        sections={[
          { id: "fundable", name: "Yayında olan projeler" },
          { id: "approved", name: "Onaylanan projeler" },
          { id: "rejected", name: "Reddedilen projeler" },
          { id: "draft", name: "Taslak Projeler" },
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
        <SectionLayoutContent sectionId="approved">
          <Project
            languageData={languageData}
            placeHolderText="Henüz onaylanan bir projeniz yok."
            projectList={approvedProjects}
            projectURL={projectURL}
          />
        </SectionLayoutContent>
        <SectionLayoutContent sectionId="rejected">
          <Project
            languageData={languageData}
            placeHolderText="Reddedilen bir projeniz yok."
            projectList={rejectedProjects}
            projectURL={projectURL}
          />
        </SectionLayoutContent>
        <SectionLayoutContent sectionId="draft">
          <Project
            languageData={languageData}
            placeHolderText="Henüz taslak aşamasında bir projeniz yok."
            projectList={draftProjects}
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
