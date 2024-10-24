"use server";
import { $UniRefund_ExportValidationService_ExportValidations_ExportValidationDto } from "@ayasofyazilim/saas/ExportValidationService";
import TableComponent from "@repo/ui/TableComponent";
import { getResourceData } from "src/language-data/ExportValidationService";
import { deleteTableRow, getTableData } from "../../../actions/api-requests";

export default async function Page({ params }: { params: { lang: string } }) {
  const { languageData } = await getResourceData(params.lang);

  return (
    <TableComponent
      createOnNewPage
      createOnNewPageTitle={languageData["ExportValidation.New"]}
      deleteRequest={async (id) => {
        "use server";
        const response = await deleteTableRow("export-validation", id);
        return response;
      }}
      deleteableRow
      editOnNewPage
      fetchRequest={async (page) => {
        "use server";
        const response = await getTableData("export-validation", page, 10);
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
      tableSchema={{
        excludeList: [
          "isDeleted",
          "deleterId",
          "deletionTime",
          "lastModificationTime",
          "lastModifierId",
          "creationTime",
          "creatorId",
          "id",
        ],
        schema:
          $UniRefund_ExportValidationService_ExportValidations_ExportValidationDto,
      }}
    />
  );
}
