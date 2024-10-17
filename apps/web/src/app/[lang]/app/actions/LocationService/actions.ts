"use server";

import type {
  GetApiLocationServiceCitiesData,
  GetApiLocationServiceCountriesData,
  Volo_Abp_Application_Dtos_PagedResultDto_12,
  Volo_Abp_Application_Dtos_PagedResultDto_13,
} from "@ayasofyazilim/saas/LocationService";
import { revalidatePath } from "next/cache";
import type { ServerResponse } from "src/lib";
import { getLocationServiceClient, structuredError } from "src/lib";

export async function getCountries(
  body: GetApiLocationServiceCountriesData,
): Promise<ServerResponse<Volo_Abp_Application_Dtos_PagedResultDto_13>> {
  "use server";
  try {
    const client = await getLocationServiceClient();
    const response = (await client.country.getApiLocationServiceCountries(
      body,
    )) as Volo_Abp_Application_Dtos_PagedResultDto_13;
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
      message: "Countries fetched successfully",
    };
  } catch (error) {
    return structuredError(error);
  }
}

export async function getCities(
  body: GetApiLocationServiceCitiesData,
): Promise<ServerResponse<Volo_Abp_Application_Dtos_PagedResultDto_12>> {
  "use server";
  try {
    const client = await getLocationServiceClient();
    const response = (await client.city.getApiLocationServiceCities(
      body,
    )) as Volo_Abp_Application_Dtos_PagedResultDto_12;
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
      message: "Cities fetched successfully",
    };
  } catch (error) {
    return structuredError(error);
  }
}
