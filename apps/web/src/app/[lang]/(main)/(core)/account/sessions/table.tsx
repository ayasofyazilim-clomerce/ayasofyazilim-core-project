"use client";

import type { PagedResultDto_IdentitySessionDto } from "@ayasofyazilim/saas/AccountService";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import { useRouter } from "next/navigation";
import type { AccountServiceResource } from "src/language-data/core/AccountService";
import { tableData } from "./sessions-table-data";

function SessionsTable({
  locale,
  response,
  languageData,
}: {
  locale: string;
  response: PagedResultDto_IdentitySessionDto;
  languageData: AccountServiceResource;
}) {
  const router = useRouter();
  const columns = tableData.sessions.columns(locale, languageData);
  const table = tableData.sessions.table(languageData, router);

  return (
    <TanstackTable
      {...table}
      columns={columns}
      data={response.items || []}
      rowCount={response.totalCount}
    />
  );
}
export default SessionsTable;
