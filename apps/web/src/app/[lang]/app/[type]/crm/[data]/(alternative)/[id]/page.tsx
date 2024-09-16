"use server";
import { getCRMDetailServer, getCRMMerchantDetailServer } from "./action";
import Form from "./form";

async function getCrmDetailData(data: string, id: string) {
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
  const crmDetailData = await getCrmDetailData(params.data, params.id);
  if (!crmDetailData) {
    return <>Not found</>;
  }

  return <Form crmDetailData={crmDetailData} params={params} />;
}
