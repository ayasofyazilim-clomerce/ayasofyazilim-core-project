"use server";
import type {
  DeleteApiContractServiceRefundTablesRefundFeeDetailsByIdData,
  DeleteApiContractServiceRefundTablesRefundFeeHeadersByIdData,
  DeleteApiContractServiceRefundTablesRefundTableDetailsByIdData,
  DeleteApiContractServiceRefundTablesRefundTableHeadersByIdData,
  GetApiContractServiceRefundTablesRefundFeeHeadersByIdData,
  GetApiContractServiceRefundTablesRefundFeeHeadersData,
  GetApiContractServiceRefundTablesRefundFeeHeadersDetailByIdData,
  GetApiContractServiceRefundTablesRefundTableDetailsByIdData,
  GetApiContractServiceRefundTablesRefundTableHeadersByIdData,
  GetApiContractServiceRefundTablesRefundTableHeadersData,
  PostApiContractServiceRefundTablesRefundFeeHeadersByIdRefundFeeDetailsData,
  PostApiContractServiceRefundTablesRefundFeeHeadersData,
  PostApiContractServiceRefundTablesRefundTableHeadersByIdRefundTableDetailsData,
  PostApiContractServiceRefundTablesRefundTableHeadersData,
  PutApiContractServiceRefundTablesRefundFeeDetailsByIdData,
  PutApiContractServiceRefundTablesRefundFeeHeadersByIdData,
  PutApiContractServiceRefundTablesRefundTableDetailsByIdData,
  PutApiContractServiceRefundTablesRefundTableHeadersByIdData,
  UniRefund_ContractService_Refunds_RefundFeeDetails_RefundFeeDetailDto,
  UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderDto,
  UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailDto,
  UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto,
  Volo_Abp_Application_Dtos_PagedResultDto_19,
} from "@ayasofyazilim/saas/ContractService";
import { revalidatePath } from "next/cache";
import type { ServerResponse } from "src/lib";
import { getContractServiceClient, structuredError } from "src/lib";

/*** RefundTable ***/
export async function getRefundTableHeaders(
  body: GetApiContractServiceRefundTablesRefundTableHeadersData,
): Promise<ServerResponse<Volo_Abp_Application_Dtos_PagedResultDto_19>> {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      (await client.refundTables.getApiContractServiceRefundTablesRefundTableHeaders(
        body,
      )) as Volo_Abp_Application_Dtos_PagedResultDto_19;
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
      message: "Refund Table Headers fetched successfully",
    };
  } catch (error) {
    return structuredError(error);
  }
}

export async function postRefundTableHeaders(
  body: PostApiContractServiceRefundTablesRefundTableHeadersData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.postApiContractServiceRefundTablesRefundTableHeaders(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto>;
  } catch (error) {
    return structuredError(error);
  }
}
export async function putRefundTableHeadersById(
  body: PutApiContractServiceRefundTablesRefundTableHeadersByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.putApiContractServiceRefundTablesRefundTableHeadersById(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto>;
  } catch (error) {
    return structuredError(error);
  }
}
export async function deleteRefundTableHeadersById(
  body: DeleteApiContractServiceRefundTablesRefundTableHeadersByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.deleteApiContractServiceRefundTablesRefundTableHeadersById(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto>;
  } catch (error) {
    return structuredError(error);
  }
}

export async function getRefundTableHeadersById(
  body: GetApiContractServiceRefundTablesRefundTableHeadersByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.getApiContractServiceRefundTablesRefundTableHeadersById(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto>;
  } catch (error) {
    return structuredError(error);
  }
}

export async function postRefundTableHeadersDetailById(
  body: PostApiContractServiceRefundTablesRefundTableHeadersByIdRefundTableDetailsData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.postApiContractServiceRefundTablesRefundTableHeadersByIdRefundTableDetails(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailDto>;
  } catch (error) {
    return structuredError(error);
  }
}
export async function getRefundTableRefundTableDetailsById(
  body: GetApiContractServiceRefundTablesRefundTableDetailsByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.getApiContractServiceRefundTablesRefundTableDetailsById(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailDto>;
  } catch (error) {
    return structuredError(error);
  }
}
export async function putRefundTableRefundTableDetailsById(
  body: PutApiContractServiceRefundTablesRefundTableDetailsByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.putApiContractServiceRefundTablesRefundTableDetailsById(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailDto>;
  } catch (error) {
    return structuredError(error);
  }
}
export async function deleteRefundTableHeadersDetailById(
  body: DeleteApiContractServiceRefundTablesRefundTableDetailsByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.deleteApiContractServiceRefundTablesRefundTableDetailsById(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailDto>;
  } catch (error) {
    return structuredError(error);
  }
}

/* RefundFees */
export async function getRefundTableFeeHeaders(
  body: GetApiContractServiceRefundTablesRefundFeeHeadersData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.getApiContractServiceRefundTablesRefundFeeHeaders(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<Volo_Abp_Application_Dtos_PagedResultDto_19>;
  } catch (error) {
    return structuredError(error);
  }
} //get header list
export async function getRefundTableFeeHeadersById(
  body: GetApiContractServiceRefundTablesRefundFeeHeadersByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.getApiContractServiceRefundTablesRefundFeeHeadersById(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderDto>;
  } catch (error) {
    return structuredError(error);
  }
} //get header by id
export async function postRefundTableFeeHeaders(
  body: PostApiContractServiceRefundTablesRefundFeeHeadersData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.postApiContractServiceRefundTablesRefundFeeHeaders(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderDto>;
  } catch (error) {
    return structuredError(error);
  }
} //create fee header
export async function putRefundTableFeeHeadersById(
  body: PutApiContractServiceRefundTablesRefundFeeHeadersByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.putApiContractServiceRefundTablesRefundFeeHeadersById(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderDto>;
  } catch (error) {
    return structuredError(error);
  }
} //update fee header
export async function deleteRefundTableFeeHeadersById(
  body: DeleteApiContractServiceRefundTablesRefundFeeHeadersByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.deleteApiContractServiceRefundTablesRefundFeeHeadersById(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderDto>;
  } catch (error) {
    return structuredError(error);
  }
} //delete fee header

export async function getRefundTableFeeHeadersDetailById(
  body: GetApiContractServiceRefundTablesRefundFeeHeadersDetailByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.getApiContractServiceRefundTablesRefundFeeHeadersDetailById(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderDto>;
  } catch (error) {
    return structuredError(error);
  }
} //get header details by id
export async function postRefundTableFeeHeaderDetailsByRefundTableHeaderId(
  body: PostApiContractServiceRefundTablesRefundFeeHeadersByIdRefundFeeDetailsData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.postApiContractServiceRefundTablesRefundFeeHeadersByIdRefundFeeDetails(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundFeeDetails_RefundFeeDetailDto>;
  } catch (error) {
    return structuredError(error);
  }
} //create fee details
export async function putRefundTableFeeHeaderDetailsById(
  body: PutApiContractServiceRefundTablesRefundFeeDetailsByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.putApiContractServiceRefundTablesRefundFeeDetailsById(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundFeeDetails_RefundFeeDetailDto>;
  } catch (error) {
    return structuredError(error);
  }
} //update fee details
export async function deleteRefundTableFeeHeaderDetailsById(
  body: DeleteApiContractServiceRefundTablesRefundFeeDetailsByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.deleteApiContractServiceRefundTablesRefundFeeDetailsById(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundFeeDetails_RefundFeeDetailDto>;
  } catch (error) {
    return structuredError(error);
  }
} //delete fee details

/* RefundFees */
/*** RefundTable ***/
