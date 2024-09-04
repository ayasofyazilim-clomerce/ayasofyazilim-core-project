"use server";

import { getResourceData } from "src/language-data/TravellerService";
import Form from "./form";

export default async function Page({
  params,
}: {
  params: { travellerId: string; lang: string };
}) {
  const { languageData } = await getResourceData(params.lang);
  return <Form languageData={languageData} />;
}
