import { getAccountServiceClient } from "src/lib";

export async function GET(request: Request) {
  const client = await getAccountServiceClient();
  const user = await client.profile.getApiAccountMyProfile();

  return new Response(JSON.stringify(user));
}
