"use server";
import type {
  DeleteApiCrmServiceMerchantsByIdWithComponentsData,
  GetApiCrmServiceMerchantsByIdDetailData,
  GetApiCrmServiceMerchantsByIdSubMerchantsData,
  GetApiCrmServiceMerchantsData,
  UniRefund_CRMService_Merchants_MerchantDetailDto,
  Volo_Abp_Application_Dtos_PagedResultDto_16,
} from "@ayasofyazilim/saas/CRMService";
import { revalidatePath } from "next/cache";
import type { ServerResponse } from "src/lib";
import { getCRMServiceClient, structuredError } from "src/lib";
import type { Individual } from "../[domain]/[data]/(alternative)/[id]/data";
import { individualData } from "../[domain]/[data]/(alternative)/[id]/data";

export async function getCrmServiceMerchants(
  body: GetApiCrmServiceMerchantsData,
) {
  "use server";
  try {
    const client = await getCRMServiceClient();
    const response = await client.merchant.getApiCrmServiceMerchants(body);
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<Volo_Abp_Application_Dtos_PagedResultDto_16>;
  } catch (error) {
    return structuredError(error);
  }
}

export async function getCrmServiceMerchantsDetailById(
  body: GetApiCrmServiceMerchantsByIdDetailData,
) {
  "use server";
  try {
    const client = await getCRMServiceClient();
    const response =
      await client.merchant.getApiCrmServiceMerchantsByIdDetail(body);
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_CRMService_Merchants_MerchantDetailDto>;
  } catch (error) {
    return structuredError(error);
  }
}

export async function getMerchantsByIdSubMerchants(
  body: GetApiCrmServiceMerchantsByIdSubMerchantsData,
) {
  "use server";
  try {
    const client = await getCRMServiceClient();
    const response =
      await client.merchant.getApiCrmServiceMerchantsByIdSubMerchants(body);
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<Volo_Abp_Application_Dtos_PagedResultDto_16>;
  } catch (error) {
    return structuredError(error);
  }
}

export async function getMerchantsByIdIndivituals(): Promise<
  ServerResponse<Individual[]>
> {
  // body: GetApiCrmServiceMerchantsByIdSubMerchantsData,
  "use server";
  return Promise.resolve({
    type: "success",
    data: individualData,
    status: 200,
    message: "Indivitual deleted successfully.",
  });
  // try {
  //   const response = individualData;
  //   // const client = await getCRMServiceClient();
  //   //   const response =
  //   //   await client.merchant.getApiCrmServiceMerchantsByIdSubMerchants(body);
  //   revalidatePath("/");
  //   return {
  //     type: "success",
  //     data: response,
  //     status: 200,
  //   };
  //   // as ServerResponse<Volo_Abp_Application_Dtos_PagedResultDto_16>;
  // } catch (error) {
  //   return structuredError(error);
  // }
}

export async function deleteSubMerchantsByIdWithComponents(
  body: DeleteApiCrmServiceMerchantsByIdWithComponentsData,
) {
  "use server";
  try {
    const client = await getCRMServiceClient();
    const response =
      await client.merchant.deleteApiCrmServiceMerchantsByIdWithComponents(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<Volo_Abp_Application_Dtos_PagedResultDto_16>;
  } catch (error) {
    return structuredError(error);
  }
}

export async function deleteIndivitualsMerchantsByIdWithComponents(): Promise<
  ServerResponse<Individual[]>
> {
  // body: DeleteApiCrmServiceMerchantsByIdWithComponentsData,
  "use server";
  return Promise.resolve({
    type: "success",
    data: individualData,
    status: 200,
    message: "Indivitual deleted successfully.",
  });
  // try {
  //   const response = individualData;
  //   // const client = await getCRMServiceClient();
  //   // const response =
  //   //   await client.merchant.deleteApiCrmServiceMerchantsByIdWithComponents(
  //   //     body,
  //   //   );
  //   revalidatePath("/");
  //   return {
  //     type: "success",
  //     data: response,
  //     status: 200,
  //     message: "Indivitual deleted successfully.",
  //   };
  // } catch (error) {
  //   return structuredError(error);
  // }
}
