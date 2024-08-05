"use server";

import { redirect } from "next/navigation";
import { ProjectStatusEnums } from "src/enums/project";
import { getProjectServiceClient } from "src/lib";
import { getProjectSectionsServer } from "../../../action";
import ProjectForm from "./form";

export default async function Page({ params }: any) {
  const { projectId, type } = params;

  const client = await getProjectServiceClient();
  const { project: projectData, projectSectionRelations: sectionData } =
    await client.projectPublic.getApiProjectServicePublicProjectsDetailById({
      id: projectId,
    });
  if (!projectData) {
    redirect(`/app/${type}/projects`);
  }
  const canSectionsEditable = [
    ProjectStatusEnums.IN_DRAFT_STAGE,
    ProjectStatusEnums.NOT_APPROVED,
  ].includes(projectData.status);

  const sectionsList = await getProjectSectionsServer(projectId);
  sectionsList.forEach((section) => {
    const index = sectionData?.findIndex((s) => s.sectionId === section.id);
    if (index === -1) {
      sectionData?.push({
        projectId,
        sectionId: section.id,
        sectionName: section.name,
        sectionRelationValue: JSON.stringify({}),
      });
    }
  });

  return (
    <ProjectForm
      canSectionsEditable={canSectionsEditable}
      projectId={projectId}
      sectionData={sectionData || []}
    />
  );
}
