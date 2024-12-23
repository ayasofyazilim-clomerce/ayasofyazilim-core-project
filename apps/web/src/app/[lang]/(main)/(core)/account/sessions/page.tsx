"use server";

import type { GetApiAccountSessionsData } from "@ayasofyazilim/saas/AccountService";
import { getSessionsApi } from "src/actions/core/AccountService/actions";
import { getResourceData } from "src/language-data/core/AccountService";
import { isErrorOnRequest } from "src/utils/page-policy/utils";
import SessionsTable from "./table";

export default async function Page(props: {
  params: { lang: string };
  searchParams: GetApiAccountSessionsData;
}) {
  const searchParams = props.searchParams;
  const response = await getSessionsApi({
    maxResultCount: searchParams.maxResultCount || 10,
    skipCount: searchParams.skipCount || 0,
  });
  const { languageData } = await getResourceData(props.params.lang);
  if (isErrorOnRequest(response, props.params.lang)) return;

  return (
    <SessionsTable
      languageData={languageData}
      locale={props.params.lang}
      response={response.data}
    />
  );
}
