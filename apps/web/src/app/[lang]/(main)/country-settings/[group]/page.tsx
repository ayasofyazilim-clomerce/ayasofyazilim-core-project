"use server";

import { UniRefund_SettingService_CountrySettings_CountrySettingDto } from "@ayasofyazilim/saas/SettingService";
import { SettingsView } from "@repo/ui/settings-view";
import { getSettingServiceClient } from "src/lib";
import { getLocalizationResources } from "src/utils";
import { mockSettingsResponse } from "./mockSettingsResponse";

export default async function Page({
  params,
}: {
  params: { group: string; lang: string };
}) {
  const group = params.group;
  const lang = params.lang;

  let countrySettings;
  try {
    countrySettings =
      await getSettingServiceClient().countrySetting.getApiSettingServiceCountrySettings();
  } catch (e) {
    countrySettings =
      mockSettingsResponse as UniRefund_SettingService_CountrySettings_CountrySettingDto;
  }
  const resources = await getLocalizationResources(lang);
  if (!resources) return <></>;
  return (
    <SettingsView list={countrySettings} resources={resources} path={group} />
  );
}
