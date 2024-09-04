import { toast } from "@/components/ui/sonner";
import type {
  UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailCreateDto as RefundTableDetailCreateDto,
  UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailDto as RefundTableDetailDto,
  UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailUpdateDto as RefundTableDetailUpdateDto,
} from "@ayasofyazilim/saas/ContractService";
import {
  $UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailCreateDto as postRulesSchema,
  $UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailDto as rulesSchema,
  $UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailUpdateDto as updateRulesSchema,
} from "@ayasofyazilim/saas/ContractService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import type {
  ColumnsType,
  TableAction,
} from "@repo/ayasofyazilim-ui/molecules/tables";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ContractServiceResource } from "src/language-data/ContractService";
import { getBaseLink } from "src/utils";
import {
  deleteRefundTableHeadersDetailById,
  postRefundTableHeadersDetailById,
} from "../../../actions/refund-tables";

export function RefundRules({
  languageData,
  data,
  params,
}: {
  languageData: ContractServiceResource;
  data: RefundTableDetailDto[];
  params: {
    id: string;
    lang: string;
  };
}): JSX.Element {
  const includeList = [
    "vatRate",
    "minValue",
    "maxValue",
    "refundAmount",
    "refundPercent",
  ];
  const [tableData, setTableData] = useState<RefundTableDetailDto[] | []>(data);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const createRule: TableAction = {
    type: "Sheet",
    autoFormArgs: {
      formSchema: createZodObject(postRulesSchema),
      fieldConfig: {
        refundTableHeaderId: {
          containerClassName: "sr-only",
        },
      },
      values: {
        refundTableHeaderId: params.id,
      },
      submit: { cta: languageData["RefundTables.Details.Create.Submit"] },
    },
    cta: languageData["RefundTables.Details.Create.Title"],
    callback: (formData: RefundTableDetailCreateDto) => {
      void postRefundTableHeadersDetailById({
        refundTableHeaderId: params.id,
        requestBody: formData,
      })
        .then((response) => {
          if (response.type === "success") {
            toast.success("Refund table rule created successfully");
          } else if (response.type === "api-error") {
            toast.error(
              response.message || "Refund table rule creation failed",
            );
          } else {
            toast.error("Fatal error");
          }
        })
        .finally(() => {
          router.refresh();
          router.push(
            getBaseLink(
              `app/admin/contracts/refund/refund-tables/${params.id}`,
            ),
          );
        });
    },
    componentType: "Autoform",
    description: languageData["RefundTables.Details.Create.Description"],
  };

  const handleRefundTableHeadersDelete = (row: RefundTableDetailDto) => {
    setLoading(true);
    void deleteRefundTableHeadersDetailById({
      id: params.id,
    }).then((response) => {
      if (response.type === "success") {
        toast.success("Rule deleted successfully");
      } else if (response.type === "api-error") {
        toast.error("Rule deletion failed");
      } else {
        toast.error("Fatal error");
        toast.warning(`row ${row.id}`);
      }
    });
    router.refresh();
    setLoading(false);
  };
  const columnsData: ColumnsType = {
    type: "Auto",
    data: {
      tableType: rulesSchema,
      excludeList: [],
      positions: includeList,
      actionList: [
        {
          type: "Sheet",
          cta: "Edit",
          autoFormArgs: {
            formSchema: createZodObject(updateRulesSchema),
            fieldConfig: {
              id: { containerClassName: "hidden" },
              refundTableHeaderId: { containerClassName: "hidden" },
              isLoyalty: {
                inputProps: { required: false },
              },
            },
            values: { refundTableHeaderId: params.id },
            submit: {
              cta: languageData["RefundTables.Details.Edit.Title"],
            },
          },
          callback: (formData: RefundTableDetailUpdateDto) => {
            toast.warning(
              `Not implemented yet ${params.id} ${formData.maxValue}`,
            );

            // void putRefundTableRefundTableDetails({
            //   id: formData.id,
            //   requestBody: formData,
            // }).then((response) => {
            //   if (response.type === "success") {
            //     toast.success("Refund table rule updated successfully");
            //   } else if (response.type === "api-error") {
            //     toast.error(
            //       response.message || "Refund table rule update failed",
            //     );
            //   } else {
            //     toast.error("Fatal error");
            //   }
            // });
          },
          componentType: "Autoform",
          description: languageData["RefundTables.Details.Edit.Description"],
        },
        {
          type: "Action",
          cta: languageData["RefundTables.Details.Delete"],
          callback: handleRefundTableHeadersDelete,
        },
      ],
    },
  };
  return (
    <DataTable
      action={createRule}
      columnsData={columnsData}
      data={tableData}
      detailedFilter={[
        {
          name: "vatRate",
          displayName: "Vat Rate",
          placeholder: "Filter by vat rate",
          type: "select",
          value: "",
          options: [
            {
              label: "%1",
              value: "1",
            },
            {
              label: "%8",
              value: "8",
            },
            {
              label: "%18",
              value: "18",
            },
          ],
        },
      ]}
      fetchRequest={(page: number, filter: string) => {
        const parsedFilter: Record<string, string> = JSON.parse(
          filter,
        ) as Record<string, string>;
        if (Object.keys(parsedFilter).length === 0) {
          setTableData(data);
        } else {
          Object.keys(parsedFilter).forEach((filterKey: string) => {
            const filteredTable = data.filter(
              (
                tableItem: RefundTableDetailDto,
              ): null | RefundTableDetailDto => {
                if (
                  tableItem[
                    filterKey as keyof RefundTableDetailDto
                  ]?.toString() === parsedFilter[filterKey]
                ) {
                  return tableItem;
                }
                return null;
              },
            );
            setTableData(filteredTable);
          });
        }
      }}
      isLoading={loading}
    />
  );
}
