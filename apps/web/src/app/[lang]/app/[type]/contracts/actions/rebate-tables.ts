"use server";
import type {
  DeleteApiContractServiceRebateTablesRebateTableHeadersByIdData,
  GetApiContractServiceRebateTablesRebateTableHeadersDetailByIdData,
  GetApiContractServiceRebateTablesRebateTableHeadersTemplatesData,
  UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderDto,
  Volo_Abp_Application_Dtos_PagedResultDto_18,
} from "@ayasofyazilim/saas/ContractService";
import { revalidatePath } from "next/cache";
import type { ServerResponse } from "src/lib";
import { getContractServiceClient, structuredError } from "src/lib";

/*** RebateTable ***/
export async function getRebateTablesRebateTableHeadersTemplates(
  body: GetApiContractServiceRebateTablesRebateTableHeadersTemplatesData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.rebateTables.getApiContractServiceRebateTablesRebateTableHeadersTemplates(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<Volo_Abp_Application_Dtos_PagedResultDto_18>;
  } catch (error) {
    return structuredError(error);
  }
} //get rebate tables templates
export async function getRebateTablesRebateTableHeadersDetailsById(
  body: GetApiContractServiceRebateTablesRebateTableHeadersDetailByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.rebateTables.getApiContractServiceRebateTablesRebateTableHeadersDetailById(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderDto>;
  } catch (error) {
    // console.log(error);
    return structuredError(error);
  }
} //get rebate tables details
export async function deleteRebateTablesRebateTableHeadersById(
  body: DeleteApiContractServiceRebateTablesRebateTableHeadersByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.rebateTables.deleteApiContractServiceRebateTablesRebateTableHeadersById(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderDto>;
  } catch (error) {
    return structuredError(error);
  }
} //delete fee details
/** RebateTable **/
