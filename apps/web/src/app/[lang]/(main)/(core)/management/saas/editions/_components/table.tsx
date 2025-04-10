"use client";

import type {PagedResultDto_EditionDto} from "@ayasofyazilim/core-saas/SaasService";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import {useParams, useRouter} from "next/navigation";
import {useGrantedPolicies} from "@repo/utils/policies";
import type {SaasServiceResource} from "src/language-data/core/SaasService";
import {tableData} from "./editions-table-data";

function EditionsTable({
  response,
  languageData,
}: {
  response: PagedResultDto_EditionDto;
  languageData: SaasServiceResource;
}) {
  const router = useRouter();
  const {lang} = useParams<{lang: string}>();
  const {grantedPolicies} = useGrantedPolicies();
  const columns = tableData.editions.columns(lang, languageData, grantedPolicies);
  const table = tableData.editions.table(languageData, router, grantedPolicies);

  return <TanstackTable {...table} columns={columns} data={response.items || []} rowCount={response.totalCount} />;
}
export default EditionsTable;
