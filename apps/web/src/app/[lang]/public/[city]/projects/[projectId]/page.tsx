"use server";

import TipTapEditor from "@repo/ayasofyazilim-ui/organisms/tiptap";
import ProjectPage from "@repo/ui/upwithcrowd/project/project-page";
import { PackageSearch } from "lucide-react";
import { auth } from "auth";
import { getPublicProjectByIdServer } from "src/app/[lang]/app/[type]/projects/action";
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
    await getPublicProjectByIdServer(projectId);

  if (!projectData)
    return (
      <div className="h-full">
        <div className="flex h-full">
          <div className="flex flex-col items-center m-auto">
            <PackageSearch color="#222" size={120} />
            <h3 className="mt-2">Proje bulunamadı.</h3>
          </div>
        </div>
      </div>
    );

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
