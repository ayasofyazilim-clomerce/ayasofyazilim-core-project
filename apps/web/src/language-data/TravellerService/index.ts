import type { LanguageDataType, ResourceResult } from "src/utils";
import { getLocalizationResources } from "src/utils";
import en from "./resources/en.json";
import tr from "./resources/tr.json";

const data: LanguageDataType = {
  tr,
  en,
};

export interface TravellerServiceResource {
  Traveller: string;
  TravellerDetail: string;
  TravellerDescription: string;
  Save: string;
  PersonalInformation: string;
  EmailInformation: string;
  AddressInformation: string;
  TelephoneInformation: string;
  NewTraveller: string;
  NewTravellerDescription: string;
  Edit: string;
}
function getLanguageData(
  resources: ResourceResult,
  lang: string,
): TravellerServiceResource {
  const resource = resources.TravellerService?.texts;
  const uiResource = resources.AbpUi?.texts;
  return {
    Traveller:
      resource?.Traveller || data[lang]?.Traveller || data.en.Traveller,
    TravellerDetail:
      resource?.TravellerDetail ||
      data[lang]?.TravellerDetail ||
      data.en.TravellerDetail,
    NewTraveller:
      resource?.NewTraveller ||
      data[lang]?.NewTraveller ||
      data.en.NewTraveller,
    TravellerDescription:
      resource?.TravellerDescription ||
      data[lang]?.TravellerDescription ||
      data.en.TravellerDescription,
    NewTravellerDescription:
      resource?.NewTravellerDescription ||
      data[lang]?.NewTravellerDescription ||
      data.en.NewTravellerDescription,
    PersonalInformation:
      resource?.PersonalInformation ||
      data[lang]?.PersonalInformation ||
      data.en.PersonalInformation,
    EmailInformation:
      resource?.EmailInformation ||
      data[lang]?.EmailInformation ||
      data.en.EmailInformation,
    AddressInformation:
      resource?.AddressInformation ||
      data[lang]?.AddressInformation ||
      data.en.AddressInformation,
    TelephoneInformation:
      resource?.TelephoneInformation ||
      data[lang]?.TelephoneInformation ||
      data.en.TelephoneInformation,
    Save: uiResource?.Save || data[lang]?.Save || data.en.Save,
    Edit: uiResource?.Edit || data[lang]?.Edit || data.en.Edit,
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
