import type { LanguageDataType, ResourceResult } from "src/utils";
import { getLocalizationResources } from "src/utils";
import en from "./resources/en.json";
import tr from "./resources/tr.json";

const data: LanguageDataType = {
  tr,
  en,
};

export interface CRMServiceServiceResource {
  new: string;
  Edit: string;
  Delete: string;
  Vat: string;
  "Vat.New": string;
  "Vat.Description": string;
  ProductGroup: string;
  "ProductGroup.New": string;
  "ProductGroup.Description": string;
  ProductGroupVAT: string;
  "ProductGroupVAT.New": string;
  "ProductGroupVAT.Description": string;
  TenantSettings: string;
  "TenantSettings.Description": string;
}
function getLanguageData(
  resources: ResourceResult,
  lang: string,
): CRMServiceServiceResource {
  const resource = resources.CrmService?.texts;
  const uiResource = resources.AbpUi?.texts;
  return {
    new: resource?.new || data[lang]?.new || data.en.new,
    Edit: uiResource?.Edit || data[lang]?.Edit || data.en.Edit,
    Delete: uiResource?.Delete || data[lang]?.Delete || data.en.Delete,
    Vat: resource?.Vat || data[lang]?.Vat || data.en.Vat,
    "Vat.New":
      resource?.["Vat.New"] || data[lang]?.["Vat.New"] || data.en["Vat.New"],
    "Vat.Description":
      resource?.["Vat.Description"] ||
      data[lang]?.["Vat.Description"] ||
      data.en["Vat.Description"],
    ProductGroup:
      resource?.ProductGroup ||
      data[lang]?.ProductGroup ||
      data.en.ProductGroup,
    "ProductGroup.New":
      resource?.["ProductGroup.New"] ||
      data[lang]?.["ProductGroup.New"] ||
      data.en["ProductGroup.New"],
    "ProductGroup.Description":
      resource?.["ProductGroup.Description"] ||
      data[lang]?.["ProductGroup.Description"] ||
      data.en["ProductGroup.Description"],
    ProductGroupVAT:
      resource?.ProductGroupVAT ||
      data[lang]?.ProductGroupVAT ||
      data.en.ProductGroupVAT,
    "ProductGroupVAT.New":
      resource?.["ProductGroupVAT.New"] ||
      data[lang]?.["ProductGroupVAT.New"] ||
      data.en["ProductGroupVAT.New"],
    "ProductGroupVAT.Description":
      resource?.["ProductGroupVAT.Description"] ||
      data[lang]?.["ProductGroupVAT.Description"] ||
      data.en["ProductGroupVAT.Description"],
    TenantSettings:
      resource?.TenantSettings ||
      data[lang]?.TenantSettings ||
      data.en.TenantSettings,
    "TenantSettings.Description":
      resource?.["TenantSettings.Description"] ||
      data[lang]?.["TenantSettings.Description"] ||
      data.en["TenantSettings.Description"],
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
