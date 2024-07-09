"use server";

import ScrollArea from "@repo/ayasofyazilim-ui/molecules/scroll-area";
import TipTapEditor from "@repo/ayasofyazilim-ui/organisms/tiptap";
import ProjectPage from "@repo/ui/upwithcrowd/project/project-page";
import { ProjectStatusEnums } from "src/enums/project";
import { getResourceData } from "src/language-data/Projects/projects";
import { getProjectServiceClient } from "src/lib";

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
    <ScrollArea className="z-10">
      <ProjectPage
        ProjectStatusEnums={ProjectStatusEnums}
        isPreview
        languageData={languageData}
        projectData={projectData}
        sectionsData={sectionsData}
      />
    </ScrollArea>
  );
}
