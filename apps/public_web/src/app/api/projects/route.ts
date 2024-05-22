import { Volo_Abp_Application_Dtos_PagedResultDto_13 } from "@ayasofyazilim/saas/ProjectService";
import { getProjectServiceClient } from "src/lib";

export async function GET(request: Request) {
  const client = await getProjectServiceClient();
  const projects =
    (await client.project.getApiProjectServiceProjects()) as Volo_Abp_Application_Dtos_PagedResultDto_13;

  return new Response(JSON.stringify(projects));
}
