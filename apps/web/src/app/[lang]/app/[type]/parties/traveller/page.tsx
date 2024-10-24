"use server";
import type { GetApiTravellerServiceTravellersData } from "@ayasofyazilim/saas/TravellerService";
import { $UniRefund_TravellerService_Travellers_TravellerListProfileDto } from "@ayasofyazilim/saas/TravellerService";
import type { ColumnFilter } from "@repo/ayasofyazilim-ui/molecules/tables";
import TableComponent from "@repo/ui/TableComponent";
import { getResourceData } from "src/language-data/TravellerService";
import { getTableData } from "../../../actions/api-requests";

export const travellerTableSchema = {
  excludeList: [
    "id",
    "userAccountId",
    "residenceCountryCode2",
    "nationalityCountryCode2",
  ],
  schema: $UniRefund_TravellerService_Travellers_TravellerListProfileDto,
};

export default async function Page({ params }: { params: { lang: string } }) {
  const { languageData } = await getResourceData(params.lang);
  type DetailedFilter = ColumnFilter & {
    name: keyof GetApiTravellerServiceTravellersData;
  };

  const filters: DetailedFilter[] = [
    {
      name: "showExpired",
      displayName: languageData["Travellers.ShowExpired"],
      type: "boolean",
      value: "",
    },
    {
      name: "fullName",
      displayName: languageData.FullName,
      type: "string",
      value: "",
    },
    {
      name: "fullName",
      displayName: languageData.FirstName,
      type: "string",
      value: "",
    },
    {
      name: "fullName",
      displayName: languageData.LastName,
      type: "string",
      value: "",
    },
    {
      name: "travelDocumentNumber",
      displayName: languageData["Travellers.TravelDocumentNumber"],
      type: "string",
      value: "",
    },
    {
      name: "username",
      displayName: languageData.UserName,
      type: "string",
      value: "",
    },
    {
      name: "phoneNumber",
      displayName: languageData.PhoneNumber,
      type: "string",
      value: "",
    },
  ];
  return (
    <TableComponent
      createOnNewPage
      createOnNewPageTitle={languageData[`Travellers.New`]}
      detailedFilter={filters}
      fetchRequest={async (page, filter) => {
        "use server";
        const response = await getTableData("travellers", page, 10, filter);
        if (response.type === "success") {
          const data = response.data;
          return {
            type: "success",
            data: { items: data.items || [], totalCount: data.totalCount || 0 },
          };
        }
        return {
          type: "success",
          data: { items: [], totalCount: 0 },
        };
      }}
      languageData={languageData}
      tableSchema={travellerTableSchema}
    />
  );
}
