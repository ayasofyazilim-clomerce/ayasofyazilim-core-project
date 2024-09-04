"use client";
import type { ColumnsType } from "@repo/ayasofyazilim-ui/molecules/tables";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import { useRouter } from "next/navigation";
import { getBaseLink } from "src/utils";
import type { TaxFreeTag } from "./data";
import { $schema_details, $schema_list } from "./data";

export default function Page(): JSX.Element {
  const router = useRouter();
  const columnsData: ColumnsType = {
    type: "Auto",
    data: {
      tableType: $schema_details,
      excludeList: [],
      actionList: [
        {
          cta: "Open in new page",
          type: "Action",
          callback: (originalRow: TaxFreeTag) => {
            router.push(
              getBaseLink(
                `app/admin/operations/details/${originalRow.taxFreeTagFacturaNumber}`,
              ),
            );
          },
        },
      ],
    },
  };

  return (
    <DataTable
      action={{
        type: "NewPage",
        cta: "Add Tag",
        href: getBaseLink("app/admin/operations/details/add"),
      }}
      columnsData={columnsData}
      data={$schema_list}
    />
  );
}
