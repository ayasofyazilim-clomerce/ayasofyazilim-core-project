/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call -- TODO: we need to fix this*/
import { $Volo_Abp_Identity_IdentityUserDto } from "@ayasofyazilim/saas/AccountService";
import {
  $Volo_Abp_AuditLogging_AuditLogDto,
  $Volo_Abp_LanguageManagement_Dto_CreateLanguageDto,
  $Volo_Abp_LanguageManagement_Dto_LanguageDto,
  $Volo_Abp_LanguageManagement_Dto_LanguageTextDto,
  $Volo_Abp_LanguageManagement_Dto_UpdateLanguageDto,
  $Volo_Abp_TextTemplateManagement_TextTemplates_TemplateDefinitionDto,
} from "@ayasofyazilim/saas/AdministrationService";
import {
  $Volo_Abp_Identity_ClaimTypeDto,
  $Volo_Abp_Identity_CreateClaimTypeDto,
  $Volo_Abp_Identity_IdentityRoleCreateDto,
  $Volo_Abp_Identity_IdentityRoleDto,
  $Volo_Abp_Identity_IdentityRoleUpdateDto,
  $Volo_Abp_Identity_IdentitySecurityLogDto,
  $Volo_Abp_Identity_IdentityUserCreateDto,
  $Volo_Abp_Identity_IdentityUserUpdateDto,
  $Volo_Abp_Identity_UpdateClaimTypeDto,
  $Volo_Abp_OpenIddict_Applications_Dtos_ApplicationDto,
  $Volo_Abp_OpenIddict_Applications_Dtos_CreateApplicationInput,
  $Volo_Abp_OpenIddict_Applications_Dtos_UpdateApplicationInput,
  $Volo_Abp_OpenIddict_Scopes_Dtos_CreateScopeInput,
  $Volo_Abp_OpenIddict_Scopes_Dtos_ScopeDto,
  $Volo_Abp_OpenIddict_Scopes_Dtos_UpdateScopeInput,
} from "@ayasofyazilim/saas/IdentityService";
import type { GetApiSaasEditionsResponse } from "@ayasofyazilim/saas/SaasService";
import {
  $Volo_Saas_Host_Dtos_EditionCreateDto,
  $Volo_Saas_Host_Dtos_EditionDto,
  $Volo_Saas_Host_Dtos_EditionUpdateDto,
  $Volo_Saas_Host_Dtos_SaasTenantCreateDto,
  $Volo_Saas_Host_Dtos_SaasTenantDto,
  $Volo_Saas_Host_Dtos_SaasTenantUpdateDto,
} from "@ayasofyazilim/saas/SaasService";
import { DependencyType } from "node_modules/@repo/ayasofyazilim-ui/src/organisms/auto-form/types";
import { getBaseLink } from "src/utils";
import MoveAllUsers from "./[domain]/[data]/table-actions/move-all-users";

export const dataConfig: Record<string, any> = {
  openiddict: {
    displayName: "Open Id",
    default: "applications",
    applications: {
      title: "Application",
      detailedFilters: [
        { name: "filter", displayName: "Client Id", type: "string", value: "" },
      ],
      createFormSchema: {
        formPositions: [
          "applicationType",
          "clientId",
          "displayName",
          "clientUri",
          "logoUri",
          "clientType",
          "clientSecret",
          "allowAuthorizationCodeFlow",
          "allowImplicitFlow",
          "allowHybridFlow",
          "allowPasswordFlow",
          "allowClientCredentialsFlow",
          "allowRefreshTokenFlow",
          "allowDeviceEndpoint",
          "extensionGrantTypes",
          "scopes",
        ],
        schema: $Volo_Abp_OpenIddict_Applications_Dtos_CreateApplicationInput,
        convertors: {
          clientType: {
            data: ["public", "confidential"],
            type: "static",
          },
          applicationType: {
            data: ["web", "native"],
            type: "static",
          },
        },

        dependencies: [
          {
            sourceField: "clientType",
            type: DependencyType.HIDES,
            targetField: "clientSecret",
            when: (activationState: string) =>
              activationState !== "confidential",
          },
          {
            sourceField: "clientType",
            type: DependencyType.HIDES,
            targetField: "allowClientCredentialsFlow",
            when: (activationState: string) => activationState === "public",
          },
          {
            sourceField: "clientType",
            type: DependencyType.HIDES,
            targetField: "allowDeviceEndpoint",
            when: (activationState: string) => activationState === "public",
          },
        ],
      },
      tableSchema: {
        excludeList: [
          "id",
          "concurrencyStamp",
          "regexDescription",
          "extraProperties",
          "valueTypeAsString",
          "clientUri",
          "logoUri",
          "allowAuthorizationCodeFlow",
          "allowImplicitFlow",
          "allowHybridFlow",
          "allowPasswordFlow",
          "allowClientCredentialsFlow",
          "allowRefreshTokenFlow",
          "allowDeviceEndpoint",
          "extensionGrantTypes",
          "allowLogoutEndpoint",
          "scopes",
          "clientSecret",
          "consentType",
        ],
        schema: $Volo_Abp_OpenIddict_Applications_Dtos_ApplicationDto,
      },
      editFormSchema: {
        formPositions: [
          "applicationType",
          "clientId",
          "displayName",
          "clientUri",
          "logoUri",
          "clientType",
          "clientSecret",
          "allowAuthorizationCodeFlow",
          "allowImplicitFlow",
          "allowHybridFlow",
          "allowPasswordFlow",
          "allowClientCredentialsFlow",
          "allowRefreshTokenFlow",
          "allowDeviceEndpoint",
          "extensionGrantTypes",
          "scopes",
        ],
        schema: $Volo_Abp_OpenIddict_Applications_Dtos_UpdateApplicationInput,
        convertors: {
          clientType: {
            data: ["public", "confidential"],
            type: "static",
          },
          applicationType: {
            data: ["web", "native"],
            type: "static",
          },
        },
        dependencies: [
          {
            sourceField: "clientType",
            type: DependencyType.HIDES,
            targetField: "clientSecret",
            when: (activationState: string) =>
              activationState !== "confidential",
          },
          {
            sourceField: "clientType",
            type: DependencyType.HIDES,
            targetField: "allowClientCredentialsFlow",
            when: (activationState: string) => activationState === "public",
          },
          {
            sourceField: "clientType",
            type: DependencyType.HIDES,
            targetField: "allowDeviceEndpoint",
            when: (activationState: string) => activationState === "public",
          },
        ],
      },
    },
    scopes: {
      title: "Scope",
      detailedFilters: [
        { name: "filter", displayName: "Search", type: "string", value: "" },
      ],
      createFormSchema: {
        formPositions: ["name", "displayName", "description"],
        schema: $Volo_Abp_OpenIddict_Scopes_Dtos_CreateScopeInput,
      },
      tableSchema: {
        excludeList: ["id", "buildIn"],
        schema: $Volo_Abp_OpenIddict_Scopes_Dtos_ScopeDto,
        actionList: () => [],
      },

      editFormSchema: {
        formPositions: ["name", "displayName", "description"],
        schema: $Volo_Abp_OpenIddict_Scopes_Dtos_UpdateScopeInput,
      },
    },
  },
  admin: {
    displayName: "Admin Management",
    default: "languages",
    languages: {
      title: "Language",
      detailedFilters: [
        { name: "filter", displayName: "Search", type: "string", value: "" },
      ],
      createFormSchema: {
        formPositions: [
          "cultureName",
          "uiCultureName",
          "displayName",
          "isEnabled",
        ],
        schema: $Volo_Abp_LanguageManagement_Dto_CreateLanguageDto,
        convertors: {
          cultureName: {
            data: async () => {
              return fetch(getBaseLink("api/admin/culture")).then((data) =>
                data.json(),
              );
            },
            covertTo: "displayName",
            get: "displayName",
            post: "name",
            type: "async",
          },
          uiCultureName: {
            data: async () => {
              return fetch(getBaseLink("api/admin/culture")).then((data) =>
                data.json(),
              );
            },
            covertTo: "displayName",
            get: "displayName",
            post: "name",
            type: "async",
          },
        },
      },
      tableSchema: {
        excludeList: [
          "id",
          "concurrencyStamp",
          "creationTime",
          "creatorId",
          "flagIcon",
        ],
        schema: $Volo_Abp_LanguageManagement_Dto_LanguageDto,
        actionList: (controlledFetch: any, getRoles: any) => [
          {
            cta: "Set As Default Language",
            callback: (e: any, row: any) => {
              void controlledFetch(
                getBaseLink(`/api/admin/language_set_default`),
                {
                  method: "PUT",
                  body: JSON.stringify({ id: row.id }),
                },
                getRoles,
                "Default Language Set Successfully",
              );
            },
          },
        ],
      },
      editFormSchema: {
        formPositions: ["displayName", "isEnabled"],
        schema: $Volo_Abp_LanguageManagement_Dto_UpdateLanguageDto,
      },
    },
    "language-texts": {
      title: "Language Text",
      detailedFilters: [
        { name: "filter", displayName: "Search", type: "string", value: "" },
      ],
      tableSchema: {
        excludeList: ["cultureName", "baseCultureName"],
        schema: $Volo_Abp_LanguageManagement_Dto_LanguageTextDto,
      },
    },
  },
  saas: {
    displayName: "Saas Management",
    default: "edition",
    edition: {
      title: "Edition",
      detailedFilters: [
        {
          name: "filter",
          displayName: "Display Name",
          type: "string",
          value: "",
        },
      ],
      createFormSchema: {
        formPositions: ["displayName"],
        schema: $Volo_Saas_Host_Dtos_EditionCreateDto,
      },
      editFormSchema: {
        formPositions: ["displayName"],
        schema: $Volo_Saas_Host_Dtos_EditionUpdateDto,
      },
      tableSchema: {
        excludeList: ["planId", "id", "planId", "planName", "concurrencyStamp"],
        schema: $Volo_Saas_Host_Dtos_EditionDto,
      },
    },
    tenant: {
      title: "Tenant",
      detailedFilters: [
        { name: "filter", displayName: "Name", type: "string", value: "" },
        {
          name: "ActivationState",
          displayName: "Tenant Activation State",
          type: "select",
          value: "",
          options: [
            { label: "Active", value: "0" },
            { label: "Active with limited time", value: "1" },
            { label: "Passive", value: "2" },
          ],
        },
        {
          name: "GetEditionNames",
          displayName: "Get Edition Name",
          type: "boolean",
          value: "",
        },
        {
          name: "ExpirationDateMin",
          displayName: "Expiration Date Min",
          type: "date",
          value: "",
        },
        {
          name: "ExpirationDateMax",
          displayName: "Expiration Date Max",
          type: "date",
          value: "",
        },
        {
          name: "ActivationEndDateMin",
          displayName: "Activation End Date Min",
          type: "string",
          value: "",
        },
        {
          name: "ActivationEndDateMax",
          displayName: "Activation End Date Max",
          type: "string",
          value: "",
        },
      ],
      createFormSchema: {
        formPositions: [
          "name",
          "editionId",
          "adminEmailAddress",
          "adminPassword",
          "activationState",
          "activationEndDate",
        ],
        schema: $Volo_Saas_Host_Dtos_SaasTenantCreateDto,
        convertors: {
          activationState: {
            data: ["Active", "Active with limited time", "Passive"],
            type: "enum",
          },
          editionId: {
            data: () => {
              return fetch(getBaseLink("api/admin/edition?maxResultCount=1000"))
                .then((data) => data.json())
                .then((jsonData: GetApiSaasEditionsResponse) => jsonData.items);
            },
            get: "displayName",
            post: "id",
            type: "async",
          },
        },
        dependencies: [
          {
            sourceField: "activationState",
            type: DependencyType.HIDES,
            targetField: "activationEndDate",
            when: (activationState: string) =>
              activationState !== "Active with limited time",
          },
        ],
      },
      tableSchema: {
        schema: $Volo_Saas_Host_Dtos_SaasTenantDto,
        excludeList: ["id", "concurrencyStamp", "editionId"],
        convertors: {
          activationState: {
            data: ["Active", "Active with limited time", "Passive"],
            type: "enum",
          },
          editionId: {
            data: () => {
              return fetch(getBaseLink("api/admin/edition?maxResultCount=1000"))
                .then((data) => data.json())
                .then((jsonData: GetApiSaasEditionsResponse) => jsonData.items);
            },
            covertTo: "editionName",
            get: "displayName",
            post: "id",
            type: "async",
          },
        },
      },
      editFormSchema: {
        formPositions: [
          "name",
          "editionId",
          "activationState",
          "activationEndDate",
        ],
        schema: $Volo_Saas_Host_Dtos_SaasTenantUpdateDto,
        convertors: {
          activationState: {
            data: ["Active", "Active with limited time", "Passive"],
            type: "enum",
          },
          editionId: {
            data: () => {
              return fetch(getBaseLink("api/admin/edition?maxResultCount=1000"))
                .then((data) => data.json())
                .then((jsonData: GetApiSaasEditionsResponse) => jsonData.items);
            },
            covertTo: "editionName",
            get: "displayName",
            post: "id",
            type: "async",
          },
        },

        dependencies: [
          {
            sourceField: "activationState",
            type: DependencyType.HIDES,
            targetField: "activationEndDate",
            when: (activationState: string) =>
              activationState !== "Active with limited time",
          },
        ],
      },
    },
  },
  identity: {
    displayName: "Identity Management",
    default: "role",
    role: {
      title: "Role",
      detailedFilters: [
        {
          name: "filter",
          displayName: "Name",
          type: "string",
          value: "",
        },
      ],
      createFormSchema: {
        formPositions: ["name", "isDefault", "isPublic"],
        schema: $Volo_Abp_Identity_IdentityRoleCreateDto,
      },
      editFormSchema: {
        formPositions: ["name", "isDefault", "isPublic"],
        schema: $Volo_Abp_Identity_IdentityRoleUpdateDto,
      },
      tableSchema: {
        excludeList: ["id", "extraProperties", "concurrencyStamp"],
        schema: $Volo_Abp_Identity_IdentityRoleDto,
        actionList: () => [
          {
            type: "Dialog",
            cta: "Move All Users",
            description: "Move All Users",
            componentType: "CustomComponent",
            callback: async (row: { id: string }) => {
              await Promise.resolve();
              return MoveAllUsers({
                rowId: row.id,
                lang: "en",
              });
            },
          },
        ],
      },
    },
    user: {
      title: "User",
      detailedFilters: [
        { name: "filter", displayName: "Search", type: "string", value: "" },
        {
          name: "UserName",
          displayName: "User Name",
          type: "string",
          value: "",
        },
        {
          name: "Name",
          displayName: "Name",
          type: "string",
          value: "",
        },
        {
          name: "Surname",
          displayName: "Surname",
          type: "string",
          value: "",
        },
        {
          name: "EmailAddress",
          displayName: "Email Address",
          type: "string",
          value: "",
        },
        {
          name: "PhoneNumber",
          displayName: "Phone Number",
          type: "string",
          value: "",
        },
        {
          name: "IsLockedOut",
          displayName: "Is Locked Out",
          type: "boolean",
          value: "",
        },
        {
          name: "NotActive",
          displayName: "Not Active",
          type: "boolean",
          value: "",
        },
        {
          name: "EmailConfirmed",
          displayName: "Email Confirmed",
          type: "boolean",
          value: "",
        },
        {
          name: "IsExternal",
          displayName: "Is External",
          type: "boolean",
          value: "",
        },
        {
          name: "MaxCreationTime",
          displayName: "Max Creation Time",
          type: "date",
          value: "",
        },
        {
          name: "MinCreationTime",
          displayName: "Min Creation Time",
          type: "date",
          value: "",
        },
        {
          name: "MaxModifitionTime",
          displayName: "Max Modifition Time",
          type: "date",
          value: "",
        },
        {
          name: "MinModifitionTime",
          displayName: "Min Modifition Time",
          type: "date",
          value: "",
        },
      ],
      createFormSchema: {
        formPositions: ["email", "password", "userName"],
        schema: $Volo_Abp_Identity_IdentityUserCreateDto,
      },
      editFormSchema: {
        formPositions: ["email", "userName"],
        schema: $Volo_Abp_Identity_IdentityUserUpdateDto,
      },
      tableSchema: {
        excludeList: [
          "id",
          "deleterId",
          "isDeleted",
          "deletionTime",
          "tenantId",
          "extraProperties",
          "concurrencyStamp",
          "creatorId",
          "shouldChangePasswordOnNextLogin",
          "isLockedOut",
          "phoneNumberConfirmed",
          "lastModificationTime",
          "lastModifierId",
          "lockoutEnabled",
          "lockoutEnd",
        ],
        schema: $Volo_Abp_Identity_IdentityUserDto,
      },
    },
    "claim-type": {
      title: "Claim Type",
      detailedFilters: [
        { name: "filter", displayName: "Search", type: "string", value: "" },
      ],
      createFormSchema: {
        formPositions: [
          "name",
          "required",
          "regex",
          "regexDescription",
          "description",
          "valueType",
        ],
        schema: $Volo_Abp_Identity_CreateClaimTypeDto,
        convertors: {
          valueType: {
            data: ["String", "Int", "Boolean", "DateTime"],
            type: "enum",
          },
        },
      },
      tableSchema: {
        excludeList: [
          "id",
          "concurrencyStamp",
          "regexDescription",
          "extraProperties",
          "valueTypeAsString",
        ],
        schema: $Volo_Abp_Identity_ClaimTypeDto,
        convertors: {
          valueType: {
            data: ["String", "Int", "Boolean", "DateTime"],
            type: "enum",
          },
        },
      },
      editFormSchema: {
        formPositions: [
          "name",
          "required",
          "regex",
          "regexDescription",
          "description",
          "valueType",
        ],
        schema: $Volo_Abp_Identity_UpdateClaimTypeDto,
        convertors: {
          valueType: {
            data: ["String", "Int", "Boolean", "DateTime"],
            type: "enum",
          },
        },
      },
    },
    "security-logs": {
      title: "Security Logs",
      detailedFilters: [
        {
          name: "startTime",
          displayName: "Start Time",
          type: "date",
          value: "",
        },
        { name: "endTime", displayName: "End Time", type: "date", value: "" },
        {
          name: "userName",
          displayName: "User Name",
          type: "string",
          value: "",
        },
        {
          name: "applicationName",
          displayName: "Application Name",
          type: "string",
          value: "",
        },
        {
          name: "clientId",
          displayName: "Client Id",
          type: "string",
          value: "",
        },
        {
          name: "identity",
          displayName: "Identity",
          type: "string",
          value: "",
        },
        {
          name: "correlationId",
          displayName: "Correlation Id",
          type: "string",
          value: "",
        },
        {
          name: "action",
          displayName: "Action",
          type: "string",
          value: "",
        },
      ],
      tableSchema: {
        excludeList: [
          "id",
          "concurrencyStamp",
          "regexDescription",
          "extraProperties",
          "valueTypeAsString",
        ],
        schema: $Volo_Abp_Identity_IdentitySecurityLogDto,
      },
    },
    organization: {
      title: "Organization",
    },
  },
  "audit-logs": {
    displayName: "Audit Logs",
    default: "audit-logs",
    "audit-logs": {
      title: "Audit Logs",
      detailedFilters: [
        {
          name: "startTime",
          displayName: "Start Time",
          type: "date",
          value: "",
        },
        { name: "endTime", displayName: "End Time", type: "date", value: "" },
        {
          name: "userName",
          displayName: "User Name",
          type: "string",
          value: "",
        },
        { name: "Url", displayName: "Url", type: "string", value: "" },
        {
          name: "applicationName",
          displayName: "Application Name",
          type: "string",
          value: "",
        },
        {
          name: "clientIpAddress",
          displayName: "Client Ip Address",
          type: "string",
          value: "",
        },
        {
          name: "httpMethod",
          displayName: "Http Method",
          type: "string",
          value: "",
        },
        {
          name: "minExecutionDuration",
          displayName: "Min Execution Duration",
          type: "number",
          value: "",
        },
        {
          name: "maxExecutionDuration",
          displayName: "Max Execution Duration",
          type: "number",
          value: "",
        },
        {
          name: "correlationId",
          displayName: "Correlation Id",
          type: "string",
          value: "",
        },
      ],
      tableSchema: {
        excludeList: [
          "id",
          "userId",
          "tenantId",
          "tenantName",
          "impersonatorUserId",
          "impersonatorUserName",
          "impersonatorTenantId",
          "impersonatorTenantName",
          "clientName",
          "browserInfo",
          "exceptions",
          "comments",
          "correlationId",
        ],
        schema: $Volo_Abp_AuditLogging_AuditLogDto,
      },
    },
  },
  "text-templates": {
    displayName: "Text Templates",
    default: "text-templates",
    "text-templates": {
      title: "Text Templates",
      detailedFilters: [
        {
          name: "FilterText",
          displayName: "Display Name",
          type: "string",
          value: "",
        },
      ],
      tableSchema: {
        excludeList: ["name", "additionalProperties"],
        schema:
          $Volo_Abp_TextTemplateManagement_TextTemplates_TemplateDefinitionDto,
      },
    },
  },
};
