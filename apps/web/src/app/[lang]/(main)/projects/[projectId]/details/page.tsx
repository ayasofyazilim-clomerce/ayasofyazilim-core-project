"use server";

import {
  AbpForDeploy_ProjectService_ProjectSections_CreateUpdateProjectSectionDto,
  Volo_Abp_Application_Dtos_PagedResultDto_1,
} from "@ayasofyazilim/saas/ProjectService";
import { redirect } from "next/navigation";
import { getProjectServiceClient } from "src/lib";
import { getLocalizationResources } from "src/utils";
import ProjectForm from "./form";

export default async function Page({ params }: any) {
  const { projectId } = params;
  const resources = await getLocalizationResources(params.lang);
  if (!resources?.["ProjectService"].texts) return null;
  async function getData() {
    "use server";
    try {
      const client =
        await getProjectServiceClient().project.getApiProjectServiceProjectsById(
          {
            id: projectId,
          }
        );
      return client;
    } catch (error) {}
    return null;
  }
  async function getSectionData() {
    "use server";
    try {
      const client =
        await getProjectServiceClient().projectSection.getApiProjectSectionServiceProjectSection();
      return client;
    } catch (error) {
      return [] as Volo_Abp_Application_Dtos_PagedResultDto_1;
    }
  }
  async function getProjectSectionData() {
    "use server";
    try {
      const client =
        await getProjectServiceClient().projectSectionRelation.getApiProjectSectionRelationServiceProjectSectionRelation();

      return client.items?.filter(
        (i) => i.projectId === projectId
      ) as Volo_Abp_Application_Dtos_PagedResultDto_1["items"];
    } catch (error) {}
    return [];
  }
  const projectData = await getData();
  const usedSectionsInProject = ((await getProjectSectionData()) ||
    []) as Array<AbpForDeploy_ProjectService_ProjectSections_CreateUpdateProjectSectionDto>;
  const mandatorySections = (await getSectionData()) || [];

  mandatorySections?.items?.toReversed()?.forEach((section: any) => {
    const index = usedSectionsInProject.findIndex(
      /* @ts-ignore */
      (s) => s.projectSectionId === section.id
    );
    if (index > -1 && usedSectionsInProject?.[index]) {
      usedSectionsInProject[index].name = section.name;
    } else {
      usedSectionsInProject.push(section);
    }
  });
  if (!projectData) {
    redirect("/projects");
  }

  const projectResource = resources["ProjectService"]?.texts;
  const uiResource = resources["AbpUi"]?.texts;
  if (!projectResource || !uiResource) return;

  return (
    <div className="relative w-full container" id="details">
      <div className="flex flex-row flex-wrap justify-between mb-8">
        <ProjectForm
          resources={resources}
          sectionData={usedSectionsInProject}
          projectId={projectId}
        />
      </div>
    </div>
  );
}
