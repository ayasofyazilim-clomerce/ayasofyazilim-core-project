import { auth } from "auth";
import { NextRequest, NextResponse } from "next/server";
import { getAccountServiceClient } from "src/lib";

export async function GET(request: NextRequest) {
  const client = await getAccountServiceClient(request);
  const user = await client.profile.getApiAccountMyProfile();

  return new Response(JSON.stringify(user));
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const session = await auth();
    const token = session?.access_token;

    const imageContent = formData.get("ImageContent") as File | null;
    const type = formData.get("type") as string;

    if (!imageContent || !type) {
      return new NextResponse(
        JSON.stringify({ error: "ImageContent and type are required" }),
        { status: 400 }
      );
    }

    const myHeaders = new Headers();
    myHeaders.append("X-Requested-With", "XMLHttpRequest");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const formdata = new FormData();
    formdata.append("ImageContent", imageContent);
    formdata.append("type", type);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };

    const response = await fetch(
      process.env.BASE_URL + "/api/account/profile-picture",
      requestOptions
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response from server:", errorText);
      return new NextResponse(
        JSON.stringify({
          error: "Failed to upload profile picture",
          details: errorText,
        }),
        { status: response.status }
      );
    }

    const responseData = await response.json();
    return new NextResponse(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    return new NextResponse(
      JSON.stringify({
        error: "An unexpected error occurred",
        details: (error as Error).message,
      }),
      { status: 500 }
    );
  }
}
