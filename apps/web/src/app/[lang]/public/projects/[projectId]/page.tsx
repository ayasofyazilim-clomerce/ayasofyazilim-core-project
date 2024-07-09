"use server";

import TipTapEditor from "@repo/ayasofyazilim-ui/organisms/tiptap";
import ProjectPage from "@repo/ui/upwithcrowd/project/project-page";
import { getProjectServiceClient } from "src/lib";
import { auth } from "auth";
import { ProjectStatusEnums } from "src/enums/project";
import { getResourceData } from "src/language-data/Projects/projects";

export default async function Page({
  params,
}: {
  params: { projectId: string; lang: string };
}) {
  const { projectId, lang } = params;
  const { languageData } = await getResourceData(lang);

  const { project: projectData, projectSectionRelations: projectSectionData } =
    await getProjectServiceClient().project.getApiProjectServiceProjectsDetailById(
      { id: projectId },
    );

  if (!projectData) return null;

  const session = await auth();
  const user = session?.user;
  const sectionsData =
    projectSectionData?.map((section: any, index) => ({
      key: section.sectionName || `${index}`,
      id: section.sectionName.replaceAll(" ", ""),
      name: section.sectionName,
      value: (
        <TipTapEditor
          canEditable={false}
          editorContent={JSON.parse(section.sectionRelationValue || "{}")}
        />
      ),
    })) || [];

  return (
    <ProjectPage
      ProjectStatusEnums={ProjectStatusEnums}
      languageData={languageData}
      projectData={projectData}
      sectionsData={sectionsData}
      user={user}
    />
  );
}
