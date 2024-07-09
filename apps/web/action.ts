"use server";
import { Volo_Abp_Account_UpdateProfileDto } from "@ayasofyazilim/saas/AccountService";
import { getAccountServiceClient } from "src/lib";

export async function updateUserProfileServer(
  body: Volo_Abp_Account_UpdateProfileDto,
): Promise<{
  status: number;
  userData?: any;
  message?: string;
}> {
  "use server";
  try {
    const client = await getAccountServiceClient();
    const response = await client.profile.putApiAccountMyProfile({
      requestBody: body,
    });

    return {
      status: 200,
      userData: response,
    };
  } catch (error: any) {
    return {
      status: error.status,
      message: error?.body?.error?.details,
    };
  }
}

export async function getPermission() {
  const client = await getAccountServiceClient();
  const response =
    await client.abpApplicationConfiguration.getApiAbpApplicationConfiguration({
      includeLocalizationResources: false,
    });
  return response.auth?.grantedPolicies;
}
