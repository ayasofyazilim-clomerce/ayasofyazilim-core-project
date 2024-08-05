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

export interface FormModifier {
  formPositions?: string[];
  excludeList?: string[];
  schema: any;
  convertors?: Record<string, any>;
  dependencies?: {
    sourceField: string;
    type: DependencyType;
    targetField: string;
    when: (_value: any) => boolean;
  }[];
}

export interface TableData {
  createFormSchema?: FormModifier;
  editFormSchema?: FormModifier;
  tableSchema: FormModifier;
  filterBy: string;
}

export const dataConfig: Record<string, any> = {
  openiddict: {
    displayName: "open id",
    default: "applications",
    applications: {
      filterBy: "displayName",
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
      createFormSchema: {
        formPositions: ["name", "displayName", "description"],
        schema: $Volo_Abp_OpenIddict_Scopes_Dtos_CreateScopeInput,
      },
      tableSchema: {
        excludeList: ["id", "buildIn"],
        schema: $Volo_Abp_OpenIddict_Scopes_Dtos_ScopeDto,
      },
      editFormSchema: {
        formPositions: ["name", "displayName", "description"],
        schema: $Volo_Abp_OpenIddict_Scopes_Dtos_UpdateScopeInput,
      },
      filterBy: "name",
    },
  },
  admin: {
    displayName: "Admin Management",
    default: "languages",
    languages: {
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
          "isDefaultLanguage",
        ],
        schema: $Volo_Abp_LanguageManagement_Dto_LanguageDto,
      },
      editFormSchema: {
        formPositions: ["displayName", "isEnabled"],
        schema: $Volo_Abp_LanguageManagement_Dto_UpdateLanguageDto,
      },
      filterBy: "displayName",
    },
    languageTexts: {
      tableSchema: {
        excludeList: ["cultureName", "baseCultureName"],
        schema: $Volo_Abp_LanguageManagement_Dto_LanguageTextDto,
      },
      filterBy: "userName",
    },
  },
  saas: {
    displayName: "Saas Management",
    default: "edition",
    edition: {
      filterBy: "displayName",
      createFormSchema: {
        formPositions: ["displayName"],
        schema: $Volo_Saas_Host_Dtos_EditionCreateDto,
      },
      editFormSchema: {
        formPositions: ["displayName"],
        schema: $Volo_Saas_Host_Dtos_EditionUpdateDto,
      },
      tableSchema: {
        excludeList: ["planId", "id", "planId", "concurrencyStamp"],
        schema: $Volo_Saas_Host_Dtos_EditionDto,
      },
    },
    tenant: {
      filterBy: "name",
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
              return fetch(getBaseLink("api/admin/edition")).then((data) =>
                data.json(),
              );
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
            data: async () => {
              return fetch(getBaseLink("api/admin/edition")).then((data) =>
                data.json(),
              );
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
            data: async () => {
              return fetch(getBaseLink("api/admin/edition")).then((data) =>
                data.json(),
              );
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
      },
      filterBy: "name",
    },
    user: {
      createFormSchema: {
        formPositions: ["email", "password", "userName"],
        schema: $Volo_Abp_Identity_IdentityUserCreateDto,
      },
      editFormSchema: {
        formPositions: ["email", "userName"],
        schema: $Volo_Abp_Identity_IdentityUserUpdateDto,
      },
      tableSchema: {
        excludeList: ["id", "extraProperties", "concurrencyStamp"],
        schema: $Volo_Abp_Identity_IdentityUserDto,
      },
      filterBy: "email",
    },

    claimType: {
      filterBy: "displayName",
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
    securityLogs: {
      filterBy: "applicationName",
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
    organization: {},
  },
  auditLogs: {
    displayName: "Audit Logs",
    default: "auditLogs",
    auditLogs: {
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
      filterBy: "userName",
    },
  },
  textTemplates: {
    displayName: "TextTemplates",
    default: "textTemplates",
    textTemplates: {
      tableSchema: {
        excludeList: ["name", "additionalProperties"],
        schema:
          $Volo_Abp_TextTemplateManagement_TextTemplates_TemplateDefinitionDto,
      },
      filterBy: "displayName",
    },
  },
};
