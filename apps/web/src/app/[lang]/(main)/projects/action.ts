"use server";
import {
  AbpForDeploy_ProjectService_ProjectSections_CreateUpdateProjectSectionDto,
  AbpForDeploy_ProjectService_ProjectsDto_CreateUpdateProjectDto,
  DeleteApiProjectServiceProjectsByIdData,
  Volo_Abp_Application_Dtos_PagedResultDto_1,
  Volo_Abp_Application_Dtos_PagedResultDto_13,
} from "@ayasofyazilim/saas/ProjectService";
import { revalidatePath } from "next/cache";
import { getProjectServiceClient } from "src/lib";

export async function getProjectByIdServer(projectId: string) {
  "use server";
  try {
    return await getProjectServiceClient().project.getApiProjectServiceProjectsById(
      {
        id: projectId,
      }
    );
  } catch (error) {
    console.error("Offline Data");
    return {
      projectName: "Deneme bir proje",
      projectDefinition: "Projenin kısa açıklaması",
      cashValue: 0,
      fundCollectionType: "SHRE",
      additionalFundRate: "0",
      qualifiedFundRate: null,
      fundNominalAmount: 0,
      fundableAmount: 306452,
      overFunding: "N",
      privilege: null,
      projectStartDate: "0001-01-01T00:00:00",
      projectEndDate: "0001-01-01T00:00:00",
      organizationId: "00000000-0000-0000-0000-000000000000",
      projectSectionRelationDetails: [
        {
          sectionId: "6b09d5de-953a-3ede-ba6a-3a12ff919a22",
          name: "Proje Hakkında",
          value:
            '{"type":"doc","content":[{"type":"heading","attrs":{"id":"404cc807-dfaa-4618-8ad0-4e0c6573e322","data-toc-id":"404cc807-dfaa-4618-8ad0-4e0c6573e322","textAlign":"left","level":1},"content":[{"type":"text","text":"Deneme"}]},{"type":"paragraph","attrs":{"class":null,"textAlign":"left"},"content":[{"type":"text","text":"Donec venenatis augue ut eros molestie tempor. Pellentesque vel metus nibh. Vivamus eget augue ut ex mattis ultricies non at dui. Mauris congue varius lacinia. Proin eu magna at eros vulputate lobortis. Proin eget purus ac erat semper sollicitudin. Etiam orci lorem, varius in eleifend dignissim, malesuada et mi. Quisque finibus nulla commodo nunc porttitor maximus. Nam lobortis odio elementum arcu aliquam tincidunt. Fusce at commodo ante. Proin eget nunc sit amet nisl sodales commodo. Phasellus massa odio, varius vel diam nec, venenatis elementum quam. Nullam placerat egestas nunc vel scelerisque. In ligula leo, venenatis eu ipsum et, accumsan dictum justo. Aenean posuere mollis ligula ut facilisis."}]},{"type":"paragraph","attrs":{"class":null,"textAlign":"left"}}]}',
          id: "2a96f115-d056-99a1-310a-3a12ff923db7",
        },
        {
          sectionId: "314ce63a-29e4-bdf9-9e64-3a12ff92a72b",
          name: "Ürün ve Hizmetler",
          value:
            '{"type":"doc","content":[{"type":"paragraph","attrs":{"class":null,"textAlign":"left"},"content":[{"type":"text","text":"Fusce hendrerit massa neque, nec dignissim dolor aliquam vel. Aenean pulvinar lorem purus, vel rhoncus sapien feugiat ut. Vivamus non nulla magna. Nam id est lobortis, gravida neque a, porttitor turpis. Praesent porta ante sit amet leo molestie, at condimentum orci lacinia. In vitae tincidunt odio. Praesent a massa facilisis, rutrum enim ut, euismod orci. Aenean id nunc a risus laoreet lobortis id at elit. Maecenas feugiat vehicula lacus, vitae fermentum sapien porta sed. Fusce feugiat neque eget lacus molestie tincidunt. Praesent a dui enim. Aliquam vitae imperdiet lectus. Nulla varius gravida turpis sit amet malesuada. Integer at mi accumsan, fringilla enim vel, feugiat mauris. Nunc posuere feugiat mi et ullamcorper. Maecenas fringilla tincidunt posuere."}]}]}',
          id: "23a91021-0e0a-52b4-97a6-3a12ff92fae2",
        },
      ],
      isDeleted: false,
      deleterId: null,
      deletionTime: null,
      lastModificationTime: null,
      lastModifierId: null,
      creationTime: "2024-06-06T11:50:48.683827",
      creatorId: null,
      id: "f458d5fb-f222-7fc2-7f76-3a12ff8ffc6a",
    };
  }
}
export async function getProjectsServer() {
  "use server";
  try {
    return (await getProjectServiceClient().project.getApiProjectServiceProjects()) as Volo_Abp_Application_Dtos_PagedResultDto_13;
  } catch (error) {
    console.error("Offline Data");
    return {
      totalCount: 1,
      items: [
        {
          projectName: "Deneme bir proje",
          projectDefinition: "Projenin kısa açıklaması",
          cashValue: 0,
          fundCollectionType: "SHRE",
          additionalFundRate: "0",
          qualifiedFundRate: null,
          fundNominalAmount: 0,
          fundableAmount: 306452,
          overFunding: "N",
          privilege: null,
          projectStartDate: "0001-01-01T00:00:00",
          projectEndDate: "0001-01-01T00:00:00",
          organizationId: "00000000-0000-0000-0000-000000000000",
          projectSectionRelationDetails: null,
          isDeleted: false,
          deleterId: null,
          deletionTime: null,
          lastModificationTime: null,
          lastModifierId: null,
          creationTime: "2024-06-06T11:50:48.683827",
          creatorId: null,
          id: "f458d5fb-f222-7fc2-7f76-3a12ff8ffc6a",
        },
      ],
    } as Volo_Abp_Application_Dtos_PagedResultDto_13;
  }
}
export async function createNewProjectServer(
  body: AbpForDeploy_ProjectService_ProjectsDto_CreateUpdateProjectDto
) {
  "use server";
  try {
    const client = await getProjectServiceClient();
    const response = await client.project.postApiProjectServiceProjects({
      requestBody: body,
    });
    revalidatePath("/[lang]/(main)/projects", "page");
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
  body: AbpForDeploy_ProjectService_ProjectsDto_CreateUpdateProjectDto
) {
  "use server";
  try {
    const client = await getProjectServiceClient();
    const response = await client.project.putApiProjectServiceProjectsById({
      id: id,
      requestBody: body,
    });
    revalidatePath("/[lang]/(main)/projects", "page");
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
    revalidatePath("/[lang]/(main)/projects", "page");
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
export async function getDefaultProjectSectionsServer() {
  "use server";
  try {
    const client =
      await getProjectServiceClient().projectSection.getApiProjectSectionServiceProjectSection();
    return client;
  } catch (error) {
    console.error("Offline Data");
    return {
      totalCount: 2,
      items: [
        {
          name: "Ürün ve Hizmetler",
          isDefault: true,
          isOptional: false,
          isDeleted: false,
          deleterId: null,
          deletionTime: null,
          lastModificationTime: null,
          lastModifierId: null,
          creationTime: "2024-06-06T11:53:43.4693925",
          creatorId: null,
          id: "314ce63a-29e4-bdf9-9e64-3a12ff92a72b",
        },
        {
          name: "Proje Hakkında",
          isDefault: true,
          isOptional: false,
          isDeleted: false,
          deleterId: null,
          deletionTime: null,
          lastModificationTime: null,
          lastModifierId: null,
          creationTime: "2024-06-06T11:52:34.5966891",
          creatorId: null,
          id: "6b09d5de-953a-3ede-ba6a-3a12ff919a22",
        },
      ],
    };
  }
}
export async function getProjectSectionsServer(projectId: string) {
  "use server";
  try {
    const client =
      await getProjectServiceClient().projectSectionRelation.getApiProjectSectionRelationServiceProjectSectionRelation();

    return client.items?.filter(
      (i) => i.projectId === projectId
    ) as Volo_Abp_Application_Dtos_PagedResultDto_1["items"];
  } catch (error) {}
  return [] as Array<AbpForDeploy_ProjectService_ProjectSections_CreateUpdateProjectSectionDto>;
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
