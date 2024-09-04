import type { LanguageDataType, ResourceResult } from "src/utils";
import { getLocalizationResources } from "src/utils";
import en from "./resources/en.json";
import tr from "./resources/tr.json";

const data: LanguageDataType = {
  tr,
  en,
};

export interface IdentityServiceResource {
  Role: string;
  Roles: string;
  "Role.New": string;
  "Role.Edit": string;
  "Role.Description": string;
  User: string;
  Users: string;
  "User.New": string;
  "User.Edit": string;
  "User.Description": string;
  ClaimType: string;
  ClaimTypes: string;
  "ClaimType.New": string;
  "ClaimType.Edit": string;
  "ClaimType.Description": string;
  SecurityLog: string;
  SecurityLogs: string;
  "SecurityLog.New": string;
  "SecurityLog.Edit": string;
  "SecurityLog.Description": string;
  Organization: string;
  Organizations: string;
  "Organization.New": string;
  "Organization.Edit": string;
  "Organization.Description": string;
  Application: string;
  Applications: string;
  "Application.New": string;
  "Application.Edit": string;
  "Application.Description": string;
  Scope: string;
  Scopes: string;
  "Scope.New": string;
  "Scope.Edit": string;
  "Scope.Description": string;
  Language: string;
  Languages: string;
  "Language.New": string;
  "Language.Edit": string;
  "Language.Description": string;
  LanguageText: string;
  LanguageTexts: string;
  "LanguageText.New": string;
  "LanguageText.Edit": string;
  "LanguageText.Description": string;
  Edition: string;
  Editions: string;
  "Edition.New": string;
  "Edition.Edit": string;
  "Edition.Description": string;
  Tenant: string;
  Tenants: string;
  "Tenant.New": string;
  "Tenant.Edit": string;
  "Tenant.Description": string;
  AuditLog: string;
  AuditLogs: string;
  "AuditLog.Description": string;
  TextTemplate: string;
  TextTemplates: string;
  "TextTemplate.Description": string;
}
function getLanguageData(
  resources: ResourceResult,
  lang: string,
): IdentityServiceResource {
  const resource = resources.IdentityService?.texts;
  return {
    Role: resource?.Role || data[lang]?.Role || data.en.Role,
    Roles: resource?.Roles || data[lang]?.Roles || data.en.Roles,
    "Role.New":
      resource?.["Role.New"] || data[lang]?.["Role.New"] || data.en["Role.New"],
    "Role.Edit":
      resource?.["Role.Edit"] ||
      data[lang]?.["Role.Edit"] ||
      data.en["Role.Edit"],
    "Role.Description":
      resource?.["Role.Description"] ||
      data[lang]?.["Role.Description"] ||
      data.en["Role.Description"],
    User: resource?.User || data[lang]?.User || data.en.User,
    Users: resource?.Users || data[lang]?.Users || data.en.Users,
    "User.New":
      resource?.["User.New"] || data[lang]?.["User.New"] || data.en["User.New"],
    "User.Edit":
      resource?.["User.Edit"] ||
      data[lang]?.["User.Edit"] ||
      data.en["User.Edit"],
    "User.Description":
      resource?.["User.Description"] ||
      data[lang]?.["User.Description"] ||
      data.en["User.Description"],
    ClaimType:
      resource?.ClaimType || data[lang]?.ClaimType || data.en.ClaimType,
    ClaimTypes:
      resource?.ClaimTypes || data[lang]?.ClaimTypes || data.en.ClaimTypes,
    "ClaimType.New":
      resource?.["ClaimType.New"] ||
      data[lang]?.["ClaimType.New"] ||
      data.en["ClaimType.New"],
    "ClaimType.Edit":
      resource?.["ClaimType.Edit"] ||
      data[lang]?.["ClaimType.Edit"] ||
      data.en["ClaimType.Edit"],
    "ClaimType.Description":
      resource?.["ClaimType.Description"] ||
      data[lang]?.["ClaimType.Description"] ||
      data.en["ClaimType.Description"],
    SecurityLog:
      resource?.SecurityLog || data[lang]?.SecurityLog || data.en.SecurityLog,
    SecurityLogs:
      resource?.SecurityLogs ||
      data[lang]?.SecurityLogs ||
      data.en.SecurityLogs,
    "SecurityLog.New":
      resource?.["SecurityLog.New"] ||
      data[lang]?.["SecurityLog.New"] ||
      data.en["SecurityLog.New"],
    "SecurityLog.Edit":
      resource?.["SecurityLog.Edit"] ||
      data[lang]?.["SecurityLog.Edit"] ||
      data.en["SecurityLog.Edit"],
    "SecurityLog.Description":
      resource?.["SecurityLog.Description"] ||
      data[lang]?.["SecurityLog.Description"] ||
      data.en["SecurityLog.Description"],
    Organization:
      resource?.Organization ||
      data[lang]?.Organization ||
      data.en.Organization,
    Organizations:
      resource?.Organizations ||
      data[lang]?.Organizations ||
      data.en.Organizations,
    "Organization.New":
      resource?.["Organization.New"] ||
      data[lang]?.["Organization.New"] ||
      data.en["Organization.New"],
    "Organization.Edit":
      resource?.["Organization.Edit"] ||
      data[lang]?.["Organization.Edit"] ||
      data.en["Organization.Edit"],
    "Organization.Description":
      resource?.["Organization.Description"] ||
      data[lang]?.["Organization.Description"] ||
      data.en["Organization.Description"],
    Application:
      resource?.Application || data[lang]?.Application || data.en.Application,
    Applications:
      resource?.Applications ||
      data[lang]?.Applications ||
      data.en.Applications,
    "Application.New":
      resource?.["Application.New"] ||
      data[lang]?.["Application.New"] ||
      data.en["Application.New"],
    "Application.Edit":
      resource?.["Application.Edit"] ||
      data[lang]?.["Application.Edit"] ||
      data.en["Application.Edit"],
    "Application.Description":
      resource?.["Application.Description"] ||
      data[lang]?.["Application.Description"] ||
      data.en["Application.Description"],
    Scope: resource?.Scope || data[lang]?.Scope || data.en.Scope,
    Scopes: resource?.Scopes || data[lang]?.Scopes || data.en.Scopes,
    "Scope.New":
      resource?.["Scope.New"] ||
      data[lang]?.["Scope.New"] ||
      data.en["Scope.New"],
    "Scope.Edit":
      resource?.["Scope.Edit"] ||
      data[lang]?.["Scope.Edit"] ||
      data.en["Scope.Edit"],
    "Scope.Description":
      resource?.["Scope.Description"] ||
      data[lang]?.["Scope.Description"] ||
      data.en["Scope.Description"],
    Language: resource?.Language || data[lang]?.Language || data.en.Language,
    Languages:
      resource?.Languages || data[lang]?.Languages || data.en.Languages,
    "Language.New":
      resource?.["Language.New"] ||
      data[lang]?.["Language.New"] ||
      data.en["Language.New"],
    "Language.Edit":
      resource?.["Language.Edit"] ||
      data[lang]?.["Language.Edit"] ||
      data.en["Language.Edit"],
    "Language.Description":
      resource?.["Language.Description"] ||
      data[lang]?.["Language.Description"] ||
      data.en["Language.Description"],
    LanguageText:
      resource?.LanguageText ||
      data[lang]?.LanguageText ||
      data.en.LanguageText,
    LanguageTexts:
      resource?.LanguageTexts ||
      data[lang]?.LanguageTexts ||
      data.en.LanguageTexts,
    "LanguageText.New":
      resource?.["LanguageText.New"] ||
      data[lang]?.["LanguageText.New"] ||
      data.en["LanguageText.New"],
    "LanguageText.Edit":
      resource?.["LanguageText.Edit"] ||
      data[lang]?.["LanguageText.Edit"] ||
      data.en["LanguageText.Edit"],
    "LanguageText.Description":
      resource?.["LanguageText.Description"] ||
      data[lang]?.["LanguageText.Description"] ||
      data.en["LanguageText.Description"],
    Edition: resource?.Edition || data[lang]?.Edition || data.en.Edition,
    Editions: resource?.Editions || data[lang]?.Editions || data.en.Editions,
    "Edition.New":
      resource?.["Edition.New"] ||
      data[lang]?.["Edition.New"] ||
      data.en["Edition.New"],
    "Edition.Edit":
      resource?.["Edition.Edit"] ||
      data[lang]?.["Edition.Edit"] ||
      data.en["Edition.Edit"],
    "Edition.Description":
      resource?.["Edition.Description"] ||
      data[lang]?.["Edition.Description"] ||
      data.en["Edition.Description"],
    Tenant: resource?.Tenant || data[lang]?.Tenant || data.en.Tenant,
    Tenants: resource?.Tenants || data[lang]?.Tenants || data.en.Tenants,
    "Tenant.New":
      resource?.["Tenant.New"] ||
      data[lang]?.["Tenant.New"] ||
      data.en["Tenant.New"],
    "Tenant.Edit":
      resource?.["Tenant.Edit"] ||
      data[lang]?.["Tenant.Edit"] ||
      data.en["Tenant.Edit"],
    "Tenant.Description":
      resource?.["Tenant.Description"] ||
      data[lang]?.["Tenant.Description"] ||
      data.en["Tenant.Description"],
    AuditLog: resource?.AuditLog || data[lang]?.AuditLog || data.en.AuditLog,
    AuditLogs:
      resource?.AuditLogs || data[lang]?.AuditLogs || data.en.AuditLogs,
    "AuditLog.Description":
      resource?.["AuditLog.Description"] ||
      data[lang]?.["AuditLog.Description"] ||
      data.en["AuditLog.Description"],
    TextTemplate:
      resource?.TextTemplate ||
      data[lang]?.TextTemplate ||
      data.en.TextTemplate,
    TextTemplates:
      resource?.TextTemplates ||
      data[lang]?.TextTemplates ||
      data.en.TextTemplates,
    "TextTemplate.Description":
      resource?.["TextTemplate.Description"] ||
      data[lang]?.["TextTemplate.Description"] ||
      data.en["TextTemplate.Description"],
  };
}
export async function getResourceData(lang: string) {
  const resources = await getLocalizationResources(lang);
  const languageData = getLanguageData(resources, lang);
  return {
    languageData,
    resources,
  };
}
export function getResourceDataClient(resources: ResourceResult, lang: string) {
  const languageData = getLanguageData(resources, lang);
  return languageData;
}
