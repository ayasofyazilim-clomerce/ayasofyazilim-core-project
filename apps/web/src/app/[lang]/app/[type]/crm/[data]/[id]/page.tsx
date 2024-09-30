"use server";
import { getResourceData } from "src/language-data/CRMService";
import {
  getCRMDetailServer,
  getCRMMerchantDetailServer,
} from "../../actions/action";
import Form from "./form";

export async function getCrmDetailData(data: string, id: string) {
  if (data === "merchants") {
    try {
      const response = (await getCRMMerchantDetailServer({ id })).data;
      if ("merchant" in response) {
        return response.merchant;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  try {
    const response = (await getCRMDetailServer(data, { id })).data;
    return response;
  } catch (error) {
    return null;
  }
}
export default async function Page({
  params,
}: {
  params: {
    id: string;
    data: string;
    lang: string;
  };
}) {
  const { languageData } = await getResourceData(params.lang);
  const crmDetailData = await getCrmDetailData(params.data, params.id);
  function getAddSubName() {
    if (params.data === "merchants") {
      return languageData.Merchants;
    } else if (params.data === "refund-points") {
      return languageData.RefundPoints;
    } else if (params.data === "customs") {
      return languageData.Customs;
    } else if (params.data === "tax-free") {
      return languageData.TaxFree;
    } else if (params.data === "tax-offices") {
      return languageData.TaxOffices;
    }
    return "";
  }

  const addSubEName = getAddSubName();
  if (!crmDetailData) {
    return <>Not found</>;
  }

  return (
    <>
      <Form crmDetailData={crmDetailData} params={params} />
      <div className="hidden" id="page-title">
        {`${addSubEName} (${crmDetailData.entityInformations?.[0]?.organizations?.[0]?.name})`}
      </div>
    </>
  );
}
