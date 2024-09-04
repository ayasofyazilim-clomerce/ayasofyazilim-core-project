"use client";
import { Card } from "@/components/ui/card";
import type { UniRefund_SettingService_CountrySettings_CountrySettingDto } from "@ayasofyazilim/saas/SettingService";
import { SettingsView } from "@repo/ui/settings-view";
import type { ResourceResult } from "src/utils";

export default function TenantSettingsPage({
  list,
  resources,
  path,
}: {
  path: string;
  list: UniRefund_SettingService_CountrySettings_CountrySettingDto;
  resources?: ResourceResult;
}) {
  function onSettingPageChange(oldPath: string, newPath: string) {
    window.history.pushState(
      null,
      "",
      window.location.href.replace(oldPath || "", newPath),
    );
  }
  return (
    <Card className="h-full overflow-hidden">
      <SettingsView
        list={list}
        onSettingPageChange={onSettingPageChange}
        path={path}
        resources={resources}
      />
    </Card>
  );
}
