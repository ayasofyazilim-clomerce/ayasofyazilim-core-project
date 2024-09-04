import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import Link from "next/link";
import { getResourceData } from "src/language-data/ContractService";
import { getBaseLink } from "src/utils";
import { getRefundTableFeeHeadersDetailById } from "../../../actions/refund-tables";
import Edit from "./edit";
import Preview from "./preview";

export default async function Page({
  params,
}: {
  params: { id: string; lang: string; type: string };
}) {
  const details = await getRefundTableFeeHeadersDetailById({ id: params.id });
  const { languageData } = await getResourceData(params.lang);
  if (details.type === "api-error") {
    return <>Api Error</>;
  }
  if (details.type === "error") {
    return <>Error</>;
  }
  return (
    <>
      <PageHeader
        LinkElement={Link}
        description={languageData["RefundFees.Page.Edit.Description"]}
        href={getBaseLink(
          `${params.lang}/app/${params.type}/contracts/refund/refund-fees`,
        )}
        title={languageData["RefundFees.Page.Edit.Title"].replace(
          "{0}",
          `'${details.data.name}'`,
        )}
      />
      <SectionLayout
        sections={[
          {
            id: "edit",
            name: languageData["RefundFees.Page.Edit.Edit"],
          },
          {
            id: "preview",
            name: languageData["RefundFees.Page.Edit.Preview"],
          },
        ]}
      >
        <SectionLayoutContent sectionId="edit">
          <Edit details={details.data} languageData={languageData} />
        </SectionLayoutContent>
        <SectionLayoutContent sectionId="preview">
          <Preview />
        </SectionLayoutContent>
      </SectionLayout>
    </>
  );
}
