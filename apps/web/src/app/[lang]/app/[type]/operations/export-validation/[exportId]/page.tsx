"use server";

import { getResourceData } from "src/language-data/ExportValidationService";
import Form from "./form";

export default async function Page({
  params,
}: {
  params: { exportId: string; lang: string };
}) {
  const { languageData } = await getResourceData(params.lang);
  return <Form exportId={params.exportId} languageData={languageData} />;
}
