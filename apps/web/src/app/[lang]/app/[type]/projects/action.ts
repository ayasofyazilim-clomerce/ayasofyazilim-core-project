"use server";

import type {
  DeleteApiProjectServiceProjectsByIdData,
  GetApiProjectServiceProjectsByIdResponse,
  GetApiProjectServiceProjectsResponse,
  PostApiProjectServiceProjectsData,
  PutApiProjectServiceProjectsByIdData,
} from "@ayasofyazilim/saas/ProjectService";
import { revalidatePath } from "next/cache";
import { ProjectStatusEnums } from "src/enums/project";
import { getProjectServiceClient } from "src/lib";

export async function getProjectByIdServer(projectId: string) {
  try {
    const client = await getProjectServiceClient();
    return await client.project.getApiProjectServiceProjectsById({
      id: projectId,
    });
  } catch (error) {
    return {} as GetApiProjectServiceProjectsByIdResponse;
  }
}
export async function getPublicProjectByIdServer(projectId: string) {
  try {
    const client = await getProjectServiceClient();

    const { project, projectSectionRelations } =
      await client.projectPublic.getApiProjectServicePublicProjectsDetailById({
        id: projectId,
      });
    return { project, projectSectionRelations };
  } catch (error) {
    return { project: null, projectSectionRelations: null };
  }
}

export async function getProjectsServer(
  status?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | 7 | undefined,
) {
  try {
    const client = await getProjectServiceClient();
    return await client.project.getApiProjectServiceProjects({
      status,
    });
  } catch (error) {
    return {} as GetApiProjectServiceProjectsResponse;
  }
}
export async function getPublicProjectsServer(
  status?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | 7 | undefined,
  maxResultCount?: number | undefined,
) {
  try {
    const client = await getProjectServiceClient();
    return await client.projectPublic.getApiProjectServicePublicProjects({
      status,
      maxResultCount,
    });
  } catch (error) {
    return {} as GetApiProjectServiceProjectsResponse;
  }
}
export async function getUsersProjectsServer() {
  try {
    const client = await getProjectServiceClient();
    const projectData =
      await client.project.getApiProjectServiceProjectsMyProjects();

    const draftProjects = projectData.filter(
      (project) => project.status === ProjectStatusEnums.IN_DRAFT_STAGE,
    );
    const pendingProjects = projectData.filter(
      (project) => project.status === ProjectStatusEnums.SENT_FOR_APPROVAL,
    );
    const rejectedProjects = projectData.filter(
      (project) => project.status === ProjectStatusEnums.NOT_APPROVED,
    );
    const fundableProjects = projectData.filter(
      (project) => project.status === ProjectStatusEnums.FUNDABLE,
    );
    const fundedProjects = projectData.filter(
      (project) => (project.status || 0) > ProjectStatusEnums.FUNDABLE,
    );
    const approvedProjects = projectData.filter(
      (project) => project.status === ProjectStatusEnums.APPROVED,
    );

    return {
      pendingProjects,
      fundableProjects,
      fundedProjects,
      draftProjects,
      rejectedProjects,
      approvedProjects,
    };
  } catch (error) {
    return {
      pendingProjects: [],
      fundableProjects: [],
      approvedProjects: [],
      fundedProjects: [],
      draftProjects: [],
      rejectedProjects: [],
    };
  }
}
export async function getAdminProjectsServer() {
  try {
    const pendingProjects =
      (await getProjectsServer(ProjectStatusEnums.SENT_FOR_APPROVAL)).items ||
      [];
    const fundableProjects =
      (await getProjectsServer(ProjectStatusEnums.FUNDABLE)).items || [];
    const fundedProjects =
      (await getProjectsServer(ProjectStatusEnums.FUNDABLE)).items || [];

    return {
      pendingProjects,
      fundableProjects,
      fundedProjects,
    };
  } catch (error) {
    return {
      pendingProjects: [],
      fundableProjects: [],
      fundedProjects: [],
      draftProjects: [],
    };
  }
}
export async function createNewProjectServer(
  body: PostApiProjectServiceProjectsData["requestBody"],
) {
  "use server";
  try {
    const client = await getProjectServiceClient();
    const response = await client.project.postApiProjectServiceProjects({
      requestBody: body,
    });
    revalidatePath("/");
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
export async function updateProjectServer(
  id: string,
  body: PutApiProjectServiceProjectsByIdData["requestBody"],
) {
  "use server";
  try {
    const client = await getProjectServiceClient();
    const response = await client.project.putApiProjectServiceProjectsById({
      id,
      requestBody: body,
    });
    revalidatePath("/");
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
export async function updateProjectStatusServer(
  id: string,
  body: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | undefined,
) {
  "use server";
  try {
    const client = await getProjectServiceClient();
    const response =
      await client.project.putApiProjectServiceProjectsStatusByProjectId({
        projectId: id,
        status: body,
      });
    revalidatePath("/");
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
  body: DeleteApiProjectServiceProjectsByIdData,
) {
  "use server";
  try {
    const client = await getProjectServiceClient();
    const response = await client.project.deleteApiProjectServiceProjectsById({
      id: body.id,
    });
    revalidatePath("/");
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
export async function getProjectSectionsServer(projectId: string) {
  "use server";
  try {
    const client = await getProjectServiceClient();
    const response =
      await client.project.getApiProjectServiceProjectsSectionListByProjectId({
        projectId,
      });
    return response;
  } catch (error) {
    return [];
  }
}

export async function createOrUpdateProjectSectionRelationServer(
  section: {
    projectId?: string;
    sectionRelationValue?: string | null;
    sectionId?: string;
    sectionRelationId?: string;
    [key: string]: any;
  },
  editorContent: string,
) {
  try {
    const client = await getProjectServiceClient();
    let response = {};
    if (section.sectionRelationId) {
      response =
        await client.project.putApiProjectServiceProjectsSectionRelationById({
          id: section.sectionRelationId,
          requestBody: {
            value: editorContent,
            order: 0,
          },
        });
    } else {
      response =
        await client.project.postApiProjectServiceProjectsSectionRelation({
          requestBody: {
            projectId: section.projectId || "",
            value: editorContent,
            projectSectionId: section.sectionId || "",
            order: 0,
          },
        });
    }
    revalidatePath("/");
    return response;
  } catch (error) {
    return error;
  }
}
