import type { Volo_Abp_Http_RemoteServiceErrorResponse } from "@ayasofyazilim/saas/AccountService";
import { ApiError } from "@ayasofyazilim/saas/IdentityService";
import type { NextRequest } from "next/server";
import { getIdentityServiceClient } from "src/lib";

const errorResponse = (message: string, status = 400) =>
  new Response(JSON.stringify({ message }), { status });

function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

const clients: Record<string, any> = {
  organizationUser: async () => {
    const client = await getIdentityServiceClient();
    const organization = client.organizationUnit;
    return {
      get: async ({
        id,
        maxResultCount = 1000,
      }: {
        id: string;
        maxResultCount: number;
      }) =>
        organization.getApiIdentityOrganizationUnitsByIdMembers({
          id,
          maxResultCount,
        }),
      put: async ({
        id,
        requestBody,
      }: {
        id: string;
        requestBody: { userIds: string[] };
      }) =>
        organization.putApiIdentityOrganizationUnitsByIdMembers({
          id,
          requestBody,
        }),
      delete: async ({ id, memberId }: { id: string; memberId: string }) =>
        organization.deleteApiIdentityOrganizationUnitsByIdMembersByMemberId({
          id,
          memberId,
        }),
    };
  },

  organizationRole: async () => {
    const client = await getIdentityServiceClient();
    const organization = client.organizationUnit;
    return {
      get: async ({
        id,
        maxResultCount = 1000,
      }: {
        id: string;
        maxResultCount: number;
      }) =>
        organization.getApiIdentityOrganizationUnitsByIdRoles({
          id,
          maxResultCount,
        }),
      put: async ({
        id,
        requestBody,
      }: {
        id: string;
        requestBody: { roleIds: string[] };
      }) =>
        organization.putApiIdentityOrganizationUnitsByIdRoles({
          id,
          requestBody,
        }),
      delete: async ({ id, roleId }: { id: string; roleId: string }) =>
        organization.deleteApiIdentityOrganizationUnitsByIdRolesByRoleId({
          id,
          roleId,
        }),
    };
  },

  MoveAllUsers: async () => {
    const client = await getIdentityServiceClient();
    const organization = client.organizationUnit;
    return {
      put: async ({
        id,
        organizationId,
      }: {
        id: string;
        organizationId: string;
      }) =>
        organization.putApiIdentityOrganizationUnitsByIdMoveAllUsers({
          id,
          organizationId,
        }),
    };
  },

  organizationEdit: async () => {
    const client = await getIdentityServiceClient();
    const organization = client.organizationUnit;
    return {
      put: async ({ id, requestBody }: { id: string; requestBody: any }) =>
        organization.putApiIdentityOrganizationUnitsById({ id, requestBody }),
    };
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { data: string } },
) {
  if (!clients[params.data]) {
    // return status 404
    return errorResponse("Invalid data type");
  }
  const client = await clients[params.data](request);
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  try {
    const data = await client.get({ id });
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
    return errorResponse("Invalid data type", 404);
  }
  const client = await clients[params.data](request);
  const requestBody = await request.json();
  try {
    const result = await client.put({
      id: requestBody.id,
      requestBody: requestBody.requestBody,
      organizationId: requestBody.organizationId,
    });
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error: unknown) {
    if (isApiError(error)) {
      const body = error.body as Volo_Abp_Http_RemoteServiceErrorResponse;
      return errorResponse(
        body.error?.message || "Something went wrong",
        error.status,
      );
    }
    return errorResponse("Something went wrong", 500);
  }
}
