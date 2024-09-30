"use server";
import { Card, CardContent } from "@/components/ui/card";
import { getResourceData } from "src/language-data/CRMService";
import { getBaseLink } from "src/utils";
import { getCrmDetailData } from "../../page";

interface LayoutProps {
  children: JSX.Element;
  params: {
    lang: string;
    data: string;
    id: string;
  };
}

export default async function Layout({ children, params }: LayoutProps) {
  const { languageData } = await getResourceData(params.lang);

  function getAddSubName() {
    if (params.data === "merchants") {
      return languageData["SubMerchant.New"];
    } else if (params.data === "refund-points") {
      return languageData["SubRefundPoint.New"];
    } else if (params.data === "customs") {
      return languageData["SubCustom.New"];
    } else if (params.data === "tax-free") {
      return languageData["SubTaxFree.New"];
    } else if (params.data === "tax-offices") {
      return languageData["SubTaxOffice.New"];
    }
    return "";
  }

  const addSubEName = getAddSubName();
  const pageBack = getBaseLink(
    `/crm/${params.data}/${params.id}`,
    true,
    params.lang,
    true,
    "admin",
  );
  const crmDetailData = await getCrmDetailData(params.data, params.id);
  if (!crmDetailData) {
    return <>Not found</>;
  }

  return (
    <>
      <div className="flex h-full w-full flex-row">
        <Card className="m-0 w-full overflow-auto border-0 bg-transparent bg-white pt-5 shadow-none">
          <CardContent>{children}</CardContent>
        </Card>
      </div>
      <div className="hidden" id="page-title">
        {`${addSubEName} (${crmDetailData.entityInformations?.[0]?.organizations?.[0]?.name})`}
      </div>
      <div className="hidden" id="page-description">
        {addSubEName}
      </div>
      <div className="hidden" id="page-back-link">
        {pageBack}
      </div>
    </>
  );
}
