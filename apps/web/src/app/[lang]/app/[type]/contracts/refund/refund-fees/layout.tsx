"use client";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import { usePathname } from "next/navigation";
import type { ContractServiceResource } from "src/language-data/ContractService";
import { getResourceDataClient } from "src/language-data/ContractService";
import { useLocale } from "src/providers/locale";

export default function Layout({
  children,
  params,
}: {
  children: JSX.Element;
  params: { lang: string };
}) {
  const { resources } = useLocale();
  const languageData = getResourceDataClient(resources, params.lang);
  const pathname = usePathname();

  const activePath = pathname.split("/").at(-1) || "";

  return (
    <section>
      <HeaderByPath activePath={activePath} languageData={languageData} />
      <div className="h-full overflow-auto">{children}</div>
    </section>
  );
}
function HeaderByPath({
  activePath,
  languageData,
}: {
  activePath: string;
  languageData: ContractServiceResource;
}) {
  switch (activePath) {
    case "refund-fees":
      return (
        <PageHeader
          description={languageData["RefundFees.Page.List.Title"]}
          title={languageData["RefundFees.Page.List.Description"]}
        />
      );

    default:
      return null;
  }
}
