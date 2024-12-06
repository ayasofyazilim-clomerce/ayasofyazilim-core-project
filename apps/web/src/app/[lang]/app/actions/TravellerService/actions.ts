"use server";

import type { FilterColumnResult } from "@repo/ayasofyazilim-ui/molecules/tables/types";
import type { GetApiTravellerServiceTravellersData } from "@ayasofyazilim/saas/TravellerService";
import { structuredError, structuredResponse } from "src/lib";
import { getApiRequests, getTableData } from "../api-requests";

export async function getTravellers(page: number, filter?: FilterColumnResult) {
  const response = await getTableData("travellers", page, 10, filter);
  return response;
}

export async function getTravellersApi(
  data: GetApiTravellerServiceTravellersData,
) {
  try {
    const requests = await getApiRequests();
    const response = await requests.travellers.get(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}
export async function getTravellersDetailsApi(id: string) {
  try {
    const requests = await getApiRequests();
    const response = await requests.travellers.getDetail(id);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}

export async function deleteTravellerPersonalIdentificationApi(id: string) {
  try {
    const requests = await getApiRequests();
    const response =
      await requests.travellers.deleteTravellerPersonalIdentification(id);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}
