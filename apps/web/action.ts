"use server";
import { Volo_Abp_Account_UpdateProfileDto } from "@ayasofyazilim/saas/AccountService";
import {
  AbpForDeploy_ProjectService_ProjectsDto_CreateUpdateProjectDto,
  DeleteApiProjectServiceProjectsByIdData,
} from "@ayasofyazilim/saas/ProjectService";
import { getAccountServiceClient, getProjectServiceClient } from "src/lib";

export async function updateUserProfileServer(
  body: Volo_Abp_Account_UpdateProfileDto
) {
  "use server";
  try {
    const client = await getAccountServiceClient();
    const response = await client.profile.putApiAccountMyProfile({
      requestBody: body,
    });

    return {
      status: 200,
      userData: response,
    };
  } catch (error: any) {
    return {
      status: error.status,
      message: error?.body?.error?.details,
    };
  }
}
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
export async function getPermission() {
  const client = await getAccountServiceClient();
  const response =
    await client.abpApplicationConfiguration.getApiAbpApplicationConfiguration({
      includeLocalizationResources: false,
    });
  return response.auth?.grantedPolicies;
}
