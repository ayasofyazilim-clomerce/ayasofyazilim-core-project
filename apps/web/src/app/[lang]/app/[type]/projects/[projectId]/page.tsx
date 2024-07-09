"use server";

import { Card } from "@/components/ui/card";
import { redirect } from "next/navigation";
import ProjectCard from "@repo/ui/upwithcrowd/project/project-card";
import { ProjectStatusEnums } from "src/enums/project";
import { getResourceData } from "src/language-data/Projects/projects";
import { getBaseLink } from "src/utils";
import { getProjectByIdServer } from "../action";
import ProjectForm from "./form";
import StatusForm from "./status-form";

export default async function Page({ params }: any) {
  const { projectId, type } = params;
  const { languageData } = await getResourceData(params.lang);
  const projectData = (await getProjectByIdServer(projectId)).project;

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
    <div className="flex flex-row gap-3 relative w-full container mt-8">
      <Card className="p-6 basis-3/5">
        <ProjectForm
          languageData={languageData}
          profileType={type}
          projectData={projectData}
          projectId={projectId}
        />
      </Card>
      <div className="basis-2/5">
        <ProjectCard
          ProjectStatusEnums={ProjectStatusEnums}
          languageData={languageData}
          project={projectData}
          projectURL={`${projectURL}/${projectData.id}`}
        />
        {type === "entreperneur" &&
          projectData.status === ProjectStatusEnums.IN_DRAFT_STAGE && (
            <StatusForm
              actionText={languageData.SEND_FOR_APPROVAL}
              projectId={projectId}
            />
          )}
      </div>
    </div>
  );
}
