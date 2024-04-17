import { Volo_Abp_Account_UpdateProfileDto } from "ayasofyazilim-saas/AccountService";
import { getAccountServiceClient } from "src/lib";

export async function PUT(request: Request) {
  const body = (await request.json()) as Volo_Abp_Account_UpdateProfileDto;
  const client = getAccountServiceClient();
  const response = await client.profile.putApiAccountMyProfile(body);
  return new Response(JSON.stringify(response));
}
