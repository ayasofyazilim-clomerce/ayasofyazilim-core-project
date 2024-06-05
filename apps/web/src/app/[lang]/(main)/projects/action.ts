"use server";
import {
  AbpForDeploy_ProjectService_ProjectsDto_CreateUpdateProjectDto,
  DeleteApiProjectServiceProjectsByIdData,
} from "@ayasofyazilim/saas/ProjectService";
import { getProjectServiceClient } from "src/lib";

export async function createUpdateProjectServer(
  body: AbpForDeploy_ProjectService_ProjectsDto_CreateUpdateProjectDto
) {
  "use server";
  try {
    const client = await getProjectServiceClient();
    const response = await client.project.postApiProjectServiceProjects({
      requestBody: body,
    });

    return {
      status: 200,
      projectData: response,
    };
  } catch (error: any) {
    return {
      status: error.status,
      message: error?.body?.error?.details,
    };
  }
}
export async function deleteProjectServer(
  body: DeleteApiProjectServiceProjectsByIdData
) {
  "use server";
  try {
    const client = await getProjectServiceClient();
    const response = await client.project.deleteApiProjectServiceProjectsById({
      id: body.id,
    });

    return {
      status: 200,
      projectData: response,
    };
  } catch (error: any) {
    console.log(error);
    return {
      status: error.status,
      message: error?.body?.error?.details,
    };
  }
}
export async function createProjectSectionRelationServer(
  projectId: string,
  projectSectionId: string,
  value: string
): Promise<string> {
  return new Promise(async (resolve) => {
    try {
      const client = getProjectServiceClient();
      await client.projectSectionRelation.postApiProjectSectionRelationServiceProjectSectionRelation(
        {
          requestBody: {
            projectId: projectId,
            value: value,
            projectSectionId: projectSectionId,
          },
        }
      );
      resolve("OK");
    } catch (error: any) {
      console.log(error);
      resolve(error?.body?.error?.message);
    }
  });
}
export async function updateProjectSectionRelationServer(
  id: string,
  value: string
): Promise<string> {
  return new Promise(async (resolve) => {
    try {
      const client = getProjectServiceClient();
      const data =
        await client.projectSectionRelation.getApiProjectSectionRelationServiceProjectSectionRelationById(
          {
            id: id,
          }
        );
      data.value = value;

      await client.projectSectionRelation.putApiProjectSectionRelationServiceProjectSectionRelationById(
        {
          id: id,
          requestBody: data,
        }
      );
      resolve("OK");
    } catch (error: any) {
      resolve(error?.body?.error?.message);
    }
  });
}
