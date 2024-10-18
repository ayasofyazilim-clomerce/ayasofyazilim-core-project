"use server";
import type {
  GetApiCrmServiceMerchantsData,
  GetApiCrmServiceTaxOfficesData,
} from "@ayasofyazilim/saas/CRMService";
import { structuredError } from "src/lib";
import { getApiRequests } from "../api-requests";

export async function getMerchantsApi(
  data: GetApiCrmServiceMerchantsData = {},
) {
  try {
    const requests = getApiRequests();
    return {
      type: "success",
      data: await (await requests).merchants.get(data),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
export async function getTaxOfficesApi(
  data: GetApiCrmServiceTaxOfficesData = {},
) {
  try {
    const requests = getApiRequests();
    return {
      type: "success",
      data: await (await requests)["tax-offices"].get(data),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
