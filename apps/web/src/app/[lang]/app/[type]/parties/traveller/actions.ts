"use server";

import type {
  PostApiTravellerServiceTravellersWithComponentsData,
  UniRefund_TravellerService_Travellers_CreateTravellerResponseDto,
} from "@ayasofyazilim/saas/TravellerService";
import type { ErrorTypes, ServerResponse } from "src/lib";
import { getTravellersServiceClient, structuredError } from "src/lib";

export async function createTravellerWithComponents(
  body: PostApiTravellerServiceTravellersWithComponentsData,
): Promise<
  | ServerResponse<UniRefund_TravellerService_Travellers_CreateTravellerResponseDto>
  | ErrorTypes
> {
  try {
    const client = await getTravellersServiceClient();
    const response =
      await client.traveller.postApiTravellerServiceTravellersWithComponents(
        body,
      );
    return {
      type: "success",
      data: response,
      status: 200,
      message: "Traveller created successfully",
    };
  } catch (error) {
    return structuredError(error);
  }
}
