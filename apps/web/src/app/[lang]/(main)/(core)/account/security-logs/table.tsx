"use client";

import type { PagedResultDto_IdentitySecurityLogDto } from "@ayasofyazilim/saas/AccountService";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import type { AccountServiceResource } from "src/language-data/core/AccountService";
import { tableData } from "./security-logs-table-data";

function SecurityLogsTable({
  locale,
  response,
  languageData,
}: {
  locale: string;
  response: PagedResultDto_IdentitySecurityLogDto;
  languageData: AccountServiceResource;
}) {
  const columns = tableData.securityLogs.columns(locale, languageData);
  const table = tableData.securityLogs.table(languageData);

  return (
    <TanstackTable
      {...table}
      columns={columns}
      data={response.items || []}
      rowCount={response.totalCount}
    />
  );
}
export default SecurityLogsTable;
