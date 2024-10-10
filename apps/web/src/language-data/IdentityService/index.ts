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
  "Form.isDefault": string;
  "Form.isPublic": string;

  User: string;
  Users: string;
  "User.New": string;
  "User.Edit": string;
  "User.Description": string;
  "Form.email": string;
  "Form.password": string;
  "Form.userName": string;

  ClaimType: string;
  ClaimTypes: string;
  "ClaimType.New": string;
  "ClaimType.Edit": string;
  "ClaimType.Description": string;
  "Form.required": string;
  "Form.Regex": string;
  "Form.regexDescription": string;
  "Form.valueType": string;

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
  "Form.applicationType": string;
  "Form.applicationType.web": string;
  "Form.applicationType.native": string;
  "Form.clientId": string;
  "Form.displayName": string;
  "Form.clientUri": string;
  "Form.logoUri": string;
  "Form.clientType": string;
  "Form.clientType.public": string;
  "Form.clientType.confidential": string;
  "Form.allowAuthorizationCodeFlow": string;
  "Form.allowImplicitFlow": string;
  "Form.allowHybridFlow": string;
  "Form.allowPasswordFlow": string;
  "Form.allowClientCredentialsFlow": string;
  "Form.allowRefreshTokenFlow": string;
  "Form.allowDeviceEndpoint": string;
  "Form.extensionGrantTypes": string;
  "Form.scopes": string;

  Scope: string;
  Scopes: string;
  "Scope.New": string;
  "Scope.Edit": string;
  "Scope.Description": string;
  "Form.name": string;
  "Form.description": string;

  Language: string;
  Languages: string;
  "Language.New": string;
  "Language.Edit": string;
  "Language.Description": string;
  "Form.cultureName": string;
  "Form.uiCultureName": string;
  "Form.isEnabled": string;

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
  "Form.editionId": string;
  "Form.adminEmailAddress": string;
  "Form.adminPassword": string;
  "Form.activationState": string;
  "Form.activationState.active": string;
  "Form.activationState.activeWithLimitedTime": string;
  "Form.activationState.passive": string;
  "Form.activationEndDate": string;

  AuditLog: string;
  AuditLogs: string;
  "AuditLog.Description": string;
  TextTemplate: string;
  TextTemplates: string;
  "TextTemplate.Description": string;
  Delete: string;
  "Delete.Confirm": string;
  Edit: string;
  Cancel: string;
  "Management.Save": string;
  "Management.Edit.Save": string;
}
function getLanguageData(
  resources: ResourceResult,
  lang: string,
): IdentityServiceResource {
  const resource = resources.IdentityService?.texts;
  return {
    Cancel: resource?.Cancel || data[lang]?.Cancel || data.en.Cancel,
    Edit: resource?.Edit || data[lang]?.Edit || data.en.Edit,
    Delete: resource?.Delete || data[lang]?.Delete || data.en.Delete,
    "Management.Save":
      resource?.["Management.Save"] ||
      data[lang]?.["Management.Save"] ||
      data.en["Management.Save"],
    "Management.Edit.Save":
      resource?.["Management.Edit.Save"] ||
      data[lang]?.["Management.Edit.Save"] ||
      data.en["Management.Edit.Save"],
    "Delete.Confirm":
      resource?.["Delete.Confirm"] ||
      data[lang]?.["Delete.Confirm"] ||
      data.en["Delete.Confirm"],
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
    "Form.isDefault":
      resource?.["Form.isDefault"] ||
      data[lang]?.["Form.isDefault"] ||
      data.en["Form.isDefault"],
    "Form.isPublic":
      resource?.["Form.isPublic"] ||
      data[lang]?.["Form.isPublic"] ||
      data.en["Form.isPublic"],
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
    "Form.email":
      resource?.["Form.email"] ||
      data[lang]?.["Form.email"] ||
      data.en["Form.email"],
    "Form.password":
      resource?.["Form.password"] ||
      data[lang]?.["Form.password"] ||
      data.en["Form.password"],
    "Form.userName":
      resource?.["Form.userName"] ||
      data[lang]?.["Form.userName"] ||
      data.en["Form.userName "],
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
    "Form.required":
      resource?.["Form.required"] ||
      data[lang]?.["Form.required"] ||
      data.en["Form.required"],
    "Form.Regex":
      resource?.["Form.Regex"] ||
      data[lang]?.["Form.Regex"] ||
      data.en["Form.Regex"],
    "Form.regexDescription":
      resource?.["Form.regexDescription"] ||
      data[lang]?.["Form.regexDescription"] ||
      data.en["Form.regexDescription"],
    "Form.valueType":
      resource?.["Form.valueType"] ||
      data[lang]?.["Form.valueType"] ||
      data.en["Form.valueType"],

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
    "Form.applicationType":
      resource?.["Form.applicationType"] ||
      data[lang]?.["Form.applicationType"] ||
      data.en["Form.applicationType"],
    "Form.applicationType.web":
      resource?.["Form.applicationType.web"] ||
      data[lang]?.["Form.applicationType.web"] ||
      data.en["Form.applicationType.web"],
    "Form.applicationType.native":
      resource?.["Form.applicationType.native"] ||
      data[lang]?.["Form.applicationType.native"] ||
      data.en["Form.applicationType.native"],
    "Form.clientId":
      resource?.["Form.clientId"] ||
      data[lang]?.["Form.clientId"] ||
      data.en["Form.clientId"],
    "Form.displayName":
      resource?.["Form.displayName"] ||
      data[lang]?.["Form.displayName"] ||
      data.en["Form.displayName"],
    "Form.clientUri":
      resource?.["Form.clientUri"] ||
      data[lang]?.["Form.clientUri"] ||
      data.en["Form.clientUri"],
    "Form.logoUri":
      resource?.["Form.logoUri"] ||
      data[lang]?.["Form.logoUri"] ||
      data.en["Form.logoUri"],
    "Form.clientType":
      resource?.["Form.clientType"] ||
      data[lang]?.["Form.clientType"] ||
      data.en["Form.clientType"],
    "Form.clientType.public":
      resource?.["Form.clientType.public"] ||
      data[lang]?.["Form.clientType.public"] ||
      data.en["Form.clientType.public"],
    "Form.clientType.confidential":
      resource?.["Form.clientType.confidential"] ||
      data[lang]?.["Form.clientType.confidential"] ||
      data.en["Form.clientType.confidential"],
    "Form.allowAuthorizationCodeFlow":
      resource?.["Form.allowAuthorizationCodeFlow"] ||
      data[lang]?.["Form.allowAuthorizationCodeFlow"] ||
      data.en["Form.allowAuthorizationCodeFlow"],
    "Form.allowImplicitFlow":
      resource?.["Form.allowImplicitFlow"] ||
      data[lang]?.["Form.allowImplicitFlow"] ||
      data.en["Form.allowImplicitFlow"],
    "Form.allowHybridFlow":
      resource?.["Form.allowHybridFlow"] ||
      data[lang]?.["Form.allowHybridFlow"] ||
      data.en["Form.allowHybridFlow"],
    "Form.allowPasswordFlow":
      resource?.["Form.allowPasswordFlow"] ||
      data[lang]?.["Form.allowPasswordFlow"] ||
      data.en["Form.allowPasswordFlow"],
    "Form.allowClientCredentialsFlow":
      resource?.["Form.allowClientCredentialsFlow"] ||
      data[lang]?.["Form.allowClientCredentialsFlow"] ||
      data.en["Form.allowClientCredentialsFlow"],
    "Form.allowRefreshTokenFlow":
      resource?.["Form.allowRefreshTokenFlow"] ||
      data[lang]?.["Form.allowRefreshTokenFlow"] ||
      data.en["Form.allowRefreshTokenFlow"],
    "Form.allowDeviceEndpoint":
      resource?.["Form.allowDeviceEndpoint"] ||
      data[lang]?.["Form.allowDeviceEndpoint"] ||
      data.en["Form.allowDeviceEndpoint"],
    "Form.extensionGrantTypes":
      resource?.["Form.extensionGrantTypes"] ||
      data[lang]?.["Form.extensionGrantTypes"] ||
      data.en["Form.extensionGrantTypes"],
    "Form.scopes":
      resource?.["Form.scopes"] ||
      data[lang]?.["Form.scopes"] ||
      data.en["Form.scopes"],

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
    "Form.name":
      resource?.["Form.name"] ||
      data[lang]?.["Form.name"] ||
      data.en["Form.name"],
    "Form.description":
      resource?.["Form.description"] ||
      data[lang]?.["Form.description"] ||
      data.en["Form.description"],

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
    "Form.cultureName":
      resource?.["Form.cultureName"] ||
      data[lang]?.["Form.cultureName"] ||
      data.en["Form.cultureName"],
    "Form.uiCultureName":
      resource?.["Form.uiCultureName"] ||
      data[lang]?.["Form.uiCultureName"] ||
      data.en["Form.uiCultureName"],
    "Form.isEnabled":
      resource?.["Form.isEnabled"] ||
      data[lang]?.["Form.isEnabled"] ||
      data.en["Form.isEnabled"],

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
    "Form.editionId":
      resource?.["Form.editionId"] ||
      data[lang]?.["Form.editionId"] ||
      data.en["Form.editionId"],
    "Form.adminEmailAddress":
      resource?.["Form.adminEmailAddress"] ||
      data[lang]?.["Form.adminEmailAddress"] ||
      data.en["Form.adminEmailAddress"],
    "Form.adminPassword":
      resource?.["Form.adminPassword"] ||
      data[lang]?.["Form.adminPassword"] ||
      data.en["Form.adminPassword"],
    "Form.activationState":
      resource?.["Form.activationState"] ||
      data[lang]?.["Form.activationState"] ||
      data.en["Form.activationState"],
    "Form.activationState.active":
      resource?.["Form.activationState.active"] ||
      data[lang]?.["Form.activationState.active"] ||
      data.en["Form.activationState.active"],
    "Form.activationState.activeWithLimitedTime":
      resource?.["Form.activationState.activeWithLimitedTime"] ||
      data[lang]?.["Form.activationState.activeWithLimitedTime"] ||
      data.en["Form.activationState.activeWithLimitedTime"],
    "Form.activationState.passive":
      resource?.["Form.activationState.passive"] ||
      data[lang]?.["Form.activationState.passive"] ||
      data.en["Form.activationState.passive"],
    "Form.activationEndDate":
      resource?.["Form.activationEndDate"] ||
      data[lang]?.["Form.activationEndDate"] ||
      data.en["Form.activationEndDate"],
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
