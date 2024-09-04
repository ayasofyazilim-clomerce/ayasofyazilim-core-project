import { getResourceData } from "src/language-data/ContractService";
import RefundFees from "./refund-fees";

export default async function Page({
  params,
}: {
  params: { lang: string; type: string };
}) {
  const { languageData } = await getResourceData(params.lang);
  return <RefundFees languageData={languageData} />;
}
