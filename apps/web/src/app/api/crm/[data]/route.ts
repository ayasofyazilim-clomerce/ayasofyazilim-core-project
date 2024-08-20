/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument -- TODO: we need to fix this*/
import type { Volo_Abp_Http_RemoteServiceErrorResponse } from "@ayasofyazilim/saas/AccountService";
import type { NextRequest } from "next/server";
import { getCRMServiceClient } from "src/lib";
import type { Clients } from "../../util";
import { errorResponse, isApiError } from "../../util";

const clients: Clients = {
  merchants: async () => {
    const client = await getCRMServiceClient();
    const merchant = client.merchant;
    return {
      get: (page: number, maxResultCount: number) =>
        merchant.getApiCrmServiceMerchants({
          maxResultCount: maxResultCount || 10,
          skipCount: page * 10,
        }),
      post: async (requestBody: any) =>
        merchant.postApiCrmServiceMerchantsWithComponents({ requestBody }),
      delete: async (id: string) =>
        merchant.deleteApiCrmServiceMerchantsWithComponentsById({ id }),
    };
  },
  refundPoints: async () => {
    const client = await getCRMServiceClient();
    const refundPoint = client.refundPoint;
    return {
      get: (page: number, maxResultCount: number) =>
        refundPoint.getApiCrmServiceRefundPoints({
          maxResultCount: maxResultCount || 10,
          skipCount: page * 10,
        }),
      post: async (requestBody: any) =>
        refundPoint.postApiCrmServiceRefundPointsWithComponents({
          requestBody,
        }),
      delete: async (id: string) =>
        refundPoint.deleteApiCrmServiceRefundPointsWithComponentsById({ id }),
    };
  },
  customs: async () => {
    const client = await getCRMServiceClient();
    const customs = client.customs;
    return {
      get: (page: number, maxResultCount: number) =>
        customs.getApiCrmServiceCustoms({
          maxResultCount: maxResultCount || 10,
          skipCount: page * 10,
        }),
      post: async (requestBody: any) =>
        customs.postApiCrmServiceCustomsWithComponents({ requestBody }),
      delete: async (id: string) =>
        customs.deleteApiCrmServiceCustomsWithComponentsById({ id }),
    };
  },
  taxFree: async () => {
    const client = await getCRMServiceClient();
    const taxFree = client.taxFree;
    return {
      get: (page: number, maxResultCount: number) =>
        taxFree.getApiCrmServiceTaxFrees({
          maxResultCount: maxResultCount || 10,
          skipCount: page * 10,
        }),
      post: async (requestBody: any) =>
        taxFree.postApiCrmServiceTaxFreesWithComponents({ requestBody }),
      delete: async (id: string) =>
        taxFree.deleteApiCrmServiceTaxFreesWithComponentsById({ id }),
    };
  },
  taxOffices: async () => {
    const client = await getCRMServiceClient();
    const taxOffice = client.taxOffice;
    return {
      get: (page: number, maxResultCount: number) =>
        taxOffice.getApiCrmServiceTaxOffices({
          maxResultCount: maxResultCount || 10,
          skipCount: page * 10,
        }),
      post: async (requestBody: any) =>
        taxOffice.postApiCrmServiceTaxOfficesWithComponents({ requestBody }),
      delete: async (id: string) =>
        taxOffice.deleteApiCrmServiceTaxOfficesWithComponentsById({ id }),
    };
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { data: string } },
) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");
  const maxResultCount = searchParams.get("maxResultCount");
  if (!clients[params.data]) {
    // return status 404
    return errorResponse("Invalid data type");
  }
  const client = await clients[params.data]();
  try {
    const data = await client.get(page, maxResultCount);
    return new Response(JSON.stringify(data));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const body = error.body as Volo_Abp_Http_RemoteServiceErrorResponse;
      const message = body.error?.message || error.statusText;
      return errorResponse(message, error.status);
    }
    const errorText = `${(error as any)?.statusText} ${(error as any)?.status}`;
    return errorResponse(errorText, (error as any)?.status);
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { data: string } },
) {
  if (!clients[params.data]) {
    return errorResponse("Invalid data type");
  }
  const client = await clients[params.data](request);
  const requestBody = await request.json();
  try {
    const roles = await client.post(requestBody);
    return new Response(JSON.stringify(roles));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const body = error.body as Volo_Abp_Http_RemoteServiceErrorResponse;
      return errorResponse(
        body.error?.message || "Something went wrong",
        error.status,
      );
    }
    return errorResponse("Something went wrong");
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { data: string } },
) {
  if (!clients[params.data]) {
    return errorResponse("Invalid data type");
  }
  let retVal = "something went wrong";
  const client = await clients[params.data](request);
  const id = await request.json();
  const deleteById = await client.delete(id);
  if (deleteById === undefined) retVal = "successfull";
  return new Response(JSON.stringify(retVal));
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { data: string } },
) {
  if (!clients[params.data]) {
    return errorResponse("Invalid data type");
  }
  const client = await clients[params.data](request);
  const requestBody = await request.json();
  try {
    const roles = await client.put({
      id: requestBody.id,
      requestBody: JSON.parse(requestBody.requestBody),
    });
    return new Response(JSON.stringify(roles));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const body = error.body as Volo_Abp_Http_RemoteServiceErrorResponse;
      return errorResponse(
        body.error?.message || "Something went wrong",
        error.status,
      );
    }
    return errorResponse("Something went wrong");
  }
}
