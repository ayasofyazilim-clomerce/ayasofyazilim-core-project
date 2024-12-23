"use server";

import type { GetApiAccountSecurityLogsData } from "@ayasofyazilim/saas/AccountService";
import { getSecurityLogsApi } from "src/actions/core/AccountService/actions";
import { getResourceData } from "src/language-data/core/AccountService";
import { isErrorOnRequest } from "src/utils/page-policy/utils";
import SecurityLogsTable from "./table";

export default async function Page(props: {
  params: { lang: string };
  searchParams: GetApiAccountSecurityLogsData;
}) {
  const searchParams = props.searchParams;
  const response = await getSecurityLogsApi(searchParams);
  const { languageData } = await getResourceData(props.params.lang);
  if (isErrorOnRequest(response, props.params.lang)) return;

  return (
    <SecurityLogsTable
      languageData={languageData}
      locale={props.params.lang}
      response={response.data}
    />
  );
}
