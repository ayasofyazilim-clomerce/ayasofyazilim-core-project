"use server";

import { getResourceData } from "src/language-data/CRMService";
import { getCities } from "../../../action";
import type { PartyNameType } from "../../types";
import { getPartyTableData } from "../action";
import Form from "./form";

export default async function Page({
  params,
}: {
  params: {
    partyName: Exclude<PartyNameType, "individuals">;
    lang: string;
  };
}) {
  const { languageData } = await getResourceData(params.lang);
  const taxOffices = await getPartyTableData("tax-offices", 0, 100);
  const cities = await getCities({ maxResultCount: 500, sorting: "name" });

  const citiesEnum =
    cities.type === "success"
      ? cities.data.items?.map((item) => ({
          name: item.name || "",
          id: item.id || "",
        })) || []
      : [];

  const taxOfficesEnum =
    taxOffices.type === "success"
      ? taxOffices.data.items?.map((item) => ({
          name: item.name || "",
          id: item.id || "",
        })) || []
      : [];

  return (
    <Form
      citiesEnum={citiesEnum}
      languageData={languageData}
      partyName={params.partyName}
      taxOfficesEnum={taxOfficesEnum}
    />
  );
}
