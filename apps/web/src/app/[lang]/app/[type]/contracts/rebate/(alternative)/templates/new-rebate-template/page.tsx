import { getResourceData } from "src/language-data/ContractService";
import NewRebate from "./new-rebate";

export default async function Page({ params }: { params: { lang: string } }) {
  const { languageData } = await getResourceData(params.lang);
  return <NewRebate languageData={languageData} />;
}
