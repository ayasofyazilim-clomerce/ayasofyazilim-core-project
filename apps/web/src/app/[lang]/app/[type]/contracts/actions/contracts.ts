"use server";

import type {
  PostApiContractServiceContractsContractHeadersData,
  UniRefund_ContractService_Contracts_ContractHeaders_ContractHeaderDto,
} from "@ayasofyazilim/saas/ContractService";
import { revalidatePath } from "next/cache";
import type { ServerResponse } from "src/lib";
import { getContractServiceClient, structuredError } from "src/lib";

export async function postContractsContractHeaders(
  body: PostApiContractServiceContractsContractHeadersData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.contracts.postApiContractServiceContractsContractHeaders(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      message: "Contract created successfully",
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Contracts_ContractHeaders_ContractHeaderDto>;
  } catch (error) {
    return structuredError(error);
  }
}
