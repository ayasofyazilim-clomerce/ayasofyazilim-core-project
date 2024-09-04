import { getResourceData } from "src/language-data/ContractService";
import RefundHeader from "./refund-header";

export default async function Page({
  params,
}: {
  params: { lang: string; id: string; type: string };
}): Promise<JSX.Element> {
  const { languageData } = await getResourceData(params.lang);
  return <RefundHeader languageData={languageData} params={params} />;
}
