/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument -- TODO: we need to fix this*/
"use server";

import ProjectCard from "@repo/ui/upwithcrowd/project/project-card";
import { redirect } from "next/navigation";
import { ProjectStatusEnums } from "src/enums/project";
import { getResourceData } from "src/language-data/ProjectService";
import { getBaseLink } from "src/utils";
import { getPublicProjectByIdServer } from "../../action";
import ProjectForm from "./form";

export default async function Page({ params }: { params: any }) {
  const { projectId } = params;
  const { languageData } = await getResourceData(params.lang);

  const { project: projectData } = await getPublicProjectByIdServer(projectId);

  if (!projectData) {
    redirect(`/app/${params.type}/projects`);
  }

  const projectURL = getBaseLink(
    "projects",
    true,
    params.lang,
    true,
    params.type,
  );
  return (
    <div className="relative flex w-full flex-row gap-3">
      <div className="basis-full">
        <ProjectForm
          languageData={languageData}
          projectData={projectData}
          projectId={projectId}
        />
      </div>
      <div className="min-w-72 max-w-96 basis-2/5">
        <ProjectCard
          ProjectStatusEnums={ProjectStatusEnums}
          languageData={languageData}
          project={projectData}
          projectURL={`${projectURL}/${projectId}`}
        />
      </div>
    </div>
  );
}
