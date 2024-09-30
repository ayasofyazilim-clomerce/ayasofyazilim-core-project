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
  "Delete.Assurance": string;
  Merchants: string;
  "Merchants.New": string;
  "Merchants.Description": string;
  RefundPoints: string;
  "RefundPoints.New": string;
  "RefundPoints.Description": string;
  Customs: string;
  "Customs.New": string;
  "Customs.Description": string;
  TaxFree: string;
  "TaxFree.New": string;
  "TaxFree.Description": string;
  TaxOffices: string;
  "TaxOffices.New": string;
  "TaxOffices.Description": string;
  "Merchants.Edit": string;
  "RefundPoints.Edit": string;
  "Customs.Edit": string;
  "TaxFree.Edit": string;
  "TaxOffices.Edit": string;
  Organization: string;
  Email: string;
  Telephone: string;
  Address: string;
  Save: string;
  Individuals: string;
  "Individuals.New": string;
  "Individuals.Description": string;
  Cancel: string;
  "Sub.Merchant": string;
  SubMerchant: string;
  "SubMerchant.New": string;
  "SubMerchant.Description": string;
  SubRefundPoint: string;
  "Sub.RefundPoint": string;
  "SubRefundPoint.New": string;
  "SubRefundPoint.Description": string;
  "Sub.Custom": string;
  SubCustom: string;
  "SubCustom.New": string;
  "SubCustom.Description": string;
  "Sub.TaxFree": string;
  SubTaxFree: string;
  "SubTaxFree.New": string;
  "SubTaxFree.Description": string;
  "Sub.TaxOffice": string;
  SubTaxOffice: string;
  "SubTaxOffice.New": string;
  "SubTaxOffice.Description": string;
}
function getLanguageData(
  resources: ResourceResult,
  lang: string,
): CRMServiceServiceResource {
  const resource = resources.CrmService?.texts;
  const uiResource = resources.AbpUi?.texts;
  return {
    "Sub.Merchant":
      resource?.["Sub.Merchant"] ||
      data[lang]?.["Sub.Merchant"] ||
      data.en["Sub.Merchant"],
    SubMerchant:
      resource?.SubMerchant || data[lang]?.SubMerchant || data.en.SubMerchant,
    "SubMerchant.New":
      resource?.["SubMerchant.New"] ||
      data[lang]?.["SubMerchant.New"] ||
      data.en["SubMerchant.New"],
    "SubMerchant.Description":
      resource?.["SubMerchant.Description"] ||
      data[lang]?.["SubMerchant.Description"] ||
      data.en["SubMerchant.Description"],

    "Sub.RefundPoint":
      resource?.["Sub.RefundPoint"] ||
      data[lang]?.["Sub.RefundPoint"] ||
      data.en["Sub.RefundPoint"],
    SubRefundPoint:
      resource?.SubRefundPoint ||
      data[lang]?.SubRefundPoint ||
      data.en.SubRefundPoint,
    "SubRefundPoint.New":
      resource?.["SubRefundPoint.New"] ||
      data[lang]?.["SubRefundPoint.New"] ||
      data.en["SubRefundPoint.New"],
    "SubRefundPoint.Description":
      resource?.["SubRefundPoint.Description"] ||
      data[lang]?.["SubRefundPoint.Description"] ||
      data.en["SubRefundPoint.Description"],

    "Sub.Custom":
      resource?.["Sub.Custom"] ||
      data[lang]?.["Sub.Custom"] ||
      data.en["Sub.Custom"],
    SubCustom:
      resource?.SubCustom || data[lang]?.SubCustom || data.en.SubCustom,
    "SubCustom.New":
      resource?.["SubCustom.New"] ||
      data[lang]?.["SubCustom.New"] ||
      data.en["SubCustom.New"],
    "SubCustom.Description":
      resource?.["SubCustom.Description"] ||
      data[lang]?.["SubCustom.Description"] ||
      data.en["SubCustom.Description"],

    "Sub.TaxFree":
      resource?.["Sub.TaxFree"] ||
      data[lang]?.["Sub.TaxFree"] ||
      data.en["Sub.TaxFree"],
    SubTaxFree:
      resource?.SubTaxFree || data[lang]?.SubTaxFree || data.en.SubTaxFree,
    "SubTaxFree.New":
      resource?.["SubTaxFree.New"] ||
      data[lang]?.["SubTaxFree.New"] ||
      data.en["SubTaxFree.New"],
    "SubTaxFree.Description":
      resource?.["SubTaxFree.Description"] ||
      data[lang]?.["SubTaxFree.Description"] ||
      data.en["SubTaxFree.Description"],

    "Sub.TaxOffice":
      resource?.["Sub.TaxOffice"] ||
      data[lang]?.["Sub.TaxOffice"] ||
      data.en["Sub.TaxOffice"],
    SubTaxOffice:
      resource?.SubTaxOffice ||
      data[lang]?.SubTaxOffice ||
      data.en.SubTaxOffice,
    "SubTaxOffice.New":
      resource?.["SubTaxOffice.New"] ||
      data[lang]?.["SubTaxOffice.New"] ||
      data.en["SubTaxOffice.New"],
    "SubTaxOffice.Description":
      resource?.["SubTaxOffice.Description"] ||
      data[lang]?.["SubTaxOffice.Description"] ||
      data.en["SubTaxOffice.Description"],

    new: resource?.new || data[lang]?.new || data.en.new,
    Edit: uiResource?.Edit || data[lang]?.Edit || data.en.Edit,
    Delete: uiResource?.Delete || data[lang]?.Delete || data.en.Delete,
    "Delete.Assurance":
      uiResource?.["Delete.Assurance"] ||
      data[lang]?.["Delete.Assurance"] ||
      data.en["Delete.Assurance"],
    Cancel: uiResource?.Cancel || data[lang]?.Cancel || data.en.Cancel,
    Organization:
      resource?.Organization ||
      data[lang]?.Organization ||
      data.en.Organization,
    Email: resource?.Email || data[lang]?.Email || data.en.Email,
    Telephone:
      resource?.Telephone || data[lang]?.Telephone || data.en.Telephone,
    Address: resource?.Address || data[lang]?.Address || data.en.Address,
    Save: resource?.Save || data[lang]?.Save || data.en.Save,

    Individuals:
      resource?.Individuals || data[lang]?.Individuals || data.en.Individuals,
    "Individuals.New":
      resource?.["Individuals.New"] ||
      data[lang]?.["Individuals.New"] ||
      data.en["Individuals.New"],
    "Individuals.Description":
      resource?.["Individuals.Description"] ||
      data[lang]?.["Individuals.Description"] ||
      data.en["Individuals.Description"],

    Merchants:
      resource?.Merchants || data[lang]?.Merchants || data.en.Merchants,
    "Merchants.New":
      resource?.["Merchants.New"] ||
      data[lang]?.["Merchants.New"] ||
      data.en["Merchants.New"],
    "Merchants.Edit":
      resource?.["Merchants.Edit"] ||
      data[lang]?.["Merchants.Edit"] ||
      data.en["Merchants.Edit"],
    "Merchants.Description":
      resource?.["Merchants.Description"] ||
      data[lang]?.["Merchants.Description"] ||
      data.en["Merchants.Description"],

    RefundPoints:
      resource?.RefundPoints ||
      data[lang]?.RefundPoints ||
      data.en.RefundPoints,
    "RefundPoints.New":
      resource?.["RefundPoints.New"] ||
      data[lang]?.["RefundPoints.New"] ||
      data.en["RefundPoints.New"],
    "RefundPoints.Edit":
      resource?.["RefundPoints.Edit"] ||
      data[lang]?.["RefundPoints.Edit"] ||
      data.en["RefundPoints.Edit"],
    "RefundPoints.Description":
      resource?.["RefundPoints.Description"] ||
      data[lang]?.["RefundPoints.Description"] ||
      data.en["RefundPoints.Description"],

    Customs: resource?.Customs || data[lang]?.Customs || data.en.Customs,
    "Customs.New":
      resource?.["Customs.New"] ||
      data[lang]?.["Customs.New"] ||
      data.en["Customs.New"],
    "Customs.Edit":
      resource?.["Customs.Edit"] ||
      data[lang]?.["Customs.Edit"] ||
      data.en["Customs.Edit"],
    "Customs.Description":
      resource?.["Customs.Description"] ||
      data[lang]?.["Customs.Description"] ||
      data.en["Customs.Description"],

    TaxFree: resource?.TaxFree || data[lang]?.TaxFree || data.en.TaxFree,
    "TaxFree.New":
      resource?.["TaxFree.New"] ||
      data[lang]?.["TaxFree.New"] ||
      data.en["TaxFree.New"],
    "TaxFree.Edit":
      resource?.["TaxFree.Edit"] ||
      data[lang]?.["TaxFree.Edit"] ||
      data.en["TaxFree.Edit"],
    "TaxFree.Description":
      resource?.["TaxFree.Description"] ||
      data[lang]?.["TaxFree.Description"] ||
      data.en["TaxFree.Description"],

    TaxOffices:
      resource?.TaxOffices || data[lang]?.TaxOffices || data.en.TaxOffices,
    "TaxOffices.New":
      resource?.["TaxOffices.New"] ||
      data[lang]?.["TaxOffices.New"] ||
      data.en["TaxOffices.New"],
    "TaxOffices.Edit":
      resource?.["TaxOffices.Edit"] ||
      data[lang]?.["TaxOffices.Edit"] ||
      data.en["TaxOffices.Edit"],
    "TaxOffices.Description":
      resource?.["TaxOffices.Description"] ||
      data[lang]?.["TaxOffices.Description"] ||
      data.en["TaxOffices.Description"],
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
