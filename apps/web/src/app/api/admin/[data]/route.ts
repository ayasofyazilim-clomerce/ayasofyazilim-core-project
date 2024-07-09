import type { Volo_Abp_Http_RemoteServiceErrorResponse } from "@ayasofyazilim/saas/AccountService";
import type {
  Volo_Abp_Identity_IdentityRoleCreateDto,
  Volo_Abp_Identity_IdentityRoleUpdateDto,
} from "@ayasofyazilim/saas/IdentityService";
import { ApiError } from "@ayasofyazilim/saas/IdentityService";
import type { NextRequest } from "next/server";
import {
  getAdministrationServiceClient,
  getIdentityServiceClient,
  getSaasServiceClient,
} from "src/lib";

type Clients = Record<string, any>;

const errorResponse = (message: string, status = 400) =>
  new Response(JSON.stringify({ message }), { status });

function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

const clients: Clients = {
  role: async () => {
    const client = await getIdentityServiceClient();
    const role = client.role;
    return {
      get: async () => role.getApiIdentityRolesAll(),
      post: async (requestBody: Volo_Abp_Identity_IdentityRoleCreateDto) =>
        role.postApiIdentityRoles({ requestBody }),
      put: async ({
        id,
        requestBody,
      }: {
        id: string;
        requestBody: Volo_Abp_Identity_IdentityRoleUpdateDto;
      }) => role.putApiIdentityRolesById({ id, requestBody }),
      delete: async (id: string) => role.deleteApiIdentityRolesById({ id }),
    };
  },
  user: async () => {
    const client = await getIdentityServiceClient();
    const user = client.user;
    return {
      get: async () => user.getApiIdentityUsers(),
      post: async (requestBody: any) =>
        user.postApiIdentityUsers({ requestBody }),
      put: async ({ id, requestBody }: { id: string; requestBody: any }) =>
        user.putApiIdentityUsersById({ id, requestBody }),
      delete: async (id: string) => user.deleteApiIdentityUsersById({ id }),
    };
  },
  edition: async () => {
    const client = await getSaasServiceClient();
    const edition = client.edition;
    return {
      get: async () => edition.getApiSaasEditionsAll(),
      post: async (requestBody: any) =>
        edition.postApiSaasEditions({ requestBody }),
      put: async ({ id, requestBody }: { id: string; requestBody: any }) =>
        edition.putApiSaasEditionsById({ id, requestBody }),
      delete: async (id: string) => edition.deleteApiSaasEditionsById({ id }),
    };
  },
  tenant: async () => {
    const client = await getSaasServiceClient();
    const tenant = client.tenant;
    return {
      get: async () => tenant.getApiSaasTenants(),
      post: async (requestBody: any) =>
        tenant.postApiSaasTenants({ requestBody }),
      put: async ({ id, requestBody }: { id: string; requestBody: any }) =>
        tenant.putApiSaasTenantsById({ id, requestBody }),
      delete: async (id: string) => tenant.deleteApiSaasTenantsById({ id }),
    };
  },
  claimType: async () => {
    const client = await getIdentityServiceClient();
    const claimType = client.claimType;
    return {
      get: async () => claimType.getApiIdentityClaimTypes(),
      post: async (requestBody: any) =>
        claimType.postApiIdentityClaimTypes({ requestBody }),
      put: async ({ id, requestBody }: { id: string; requestBody: any }) =>
        claimType.putApiIdentityClaimTypesById({ id, requestBody }),
      delete: async (id: string) =>
        claimType.deleteApiIdentityClaimTypesById({ id }),
    };
  },
  applications: async () => {
    const client = await getIdentityServiceClient();
    const applications = client.applications;
    return {
      get: async () => applications.getApiOpeniddictApplications(),
      post: async (requestBody: any) =>
        applications.postApiOpeniddictApplications({ requestBody }),
      put: async ({ id, requestBody }: { id: string; requestBody: any }) =>
        applications.putApiOpeniddictApplicationsById({ id, requestBody }),
      delete: async (id: string) =>
        applications.deleteApiOpeniddictApplications({ id }),
    };
  },
  scopes: async () => {
    const client = await getIdentityServiceClient();
    const scopes = client.scopes;
    return {
      get: async () => scopes.getApiOpeniddictScopes(),
      post: async (requestBody: any) =>
        scopes.postApiOpeniddictScopes({ requestBody }),
      put: async ({ id, requestBody }: { id: string; requestBody: any }) =>
        scopes.putApiOpeniddictScopesById({ id, requestBody }),
      delete: async (id: string) => scopes.deleteApiOpeniddictScopes({ id }),
    };
  },
  languages: async () => {
    const client = await getAdministrationServiceClient();
    const languages = client.languages;
    return {
      get: async () => languages.getApiLanguageManagementLanguages(),
      post: async (requestBody: any) =>
        languages.postApiLanguageManagementLanguages({ requestBody }),
      put: async ({ id, requestBody }: { id: string; requestBody: any }) =>
        languages.putApiLanguageManagementLanguagesById({ id, requestBody }),
      delete: async (id: string) =>
        languages.deleteApiLanguageManagementLanguagesById({ id }),
    };
  },
  culture: async () => {
    const client = await getAdministrationServiceClient();
    const languages = client.languages;
    return {
      get: async () => languages.getApiLanguageManagementLanguagesCultureList(),
    };
  },

  securityLogs: async () => {
    const client = await getIdentityServiceClient();
    const securityLogs = client.securityLog;
    return {
      get: async () => securityLogs.getApiIdentitySecurityLogs(),
    };
  },

  auditLogs: async () => {
    const client = await getAdministrationServiceClient();
    const auditLogs = client.auditLogs;
    return {
      get: async () => auditLogs.getApiAuditLoggingAuditLogs(),
    };
  },

  textTemplates: async () => {
    const client = await getAdministrationServiceClient();
    const textTemplates = client.textTemplateDefinitions;
    return {
      get: async () =>
        textTemplates.getApiTextTemplateManagementTemplateDefinitions(),
    };
  },

  languageTexts: async () => {
    const client = await getAdministrationServiceClient();
    const languageTexts = client.languageTexts;
    return {
      get: async (baseCultureName = "en", targetCultureName = "tr") =>
        languageTexts.getApiLanguageManagementLanguageTexts({
          baseCultureName,
          targetCultureName,
        }),
    };
  },

  organization: async () => {
    const client = await getIdentityServiceClient();
    const organization = client.organizationUnit;
    return {
      get: async () => organization.getApiIdentityOrganizationUnitsAll(),
      post: async (requestBody: any) =>
        organization.postApiIdentityOrganizationUnits({ requestBody }),
      put: async ({ id, requestBody }: { id: string; requestBody: any }) =>
        organization.putApiIdentityOrganizationUnitsById({ id, requestBody }),
      delete: async (id: string) =>
        organization.deleteApiIdentityOrganizationUnits({ id }),
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
  try {
    const data = await client.get();
    return new Response(JSON.stringify(data));
  } catch (error: unknown) {
    if (isApiError(error)) {
      // console.log(error);
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
