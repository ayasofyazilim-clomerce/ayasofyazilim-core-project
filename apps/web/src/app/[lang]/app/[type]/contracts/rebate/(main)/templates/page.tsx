import { getResourceData } from "src/language-data/ContractService";
import Templates from "./templates";

export default async function Page({
  params,
}: {
  params: { lang: string; type: string };
}) {
  const { languageData } = await getResourceData(params.lang);
  return <Templates languageData={languageData} />;
}
