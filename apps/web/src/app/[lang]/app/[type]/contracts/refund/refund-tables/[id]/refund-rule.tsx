import { toast } from "@/components/ui/sonner";
import type {
  UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailCreateDto,
  UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailDto,
  UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailUpdateDto,
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
import {
  deleteRefundTableHeadersDetail,
  postRefundTableHeadersDetail,
} from "../../../action";

export function RefundRules({
  languageData,
  data,
  params,
}: {
  languageData: Record<string, string>;
  data: UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailDto[];
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
  const [tableData, setTableData] = useState<
    | UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailDto[]
    | []
  >(data);
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
    callback: (
      formData: UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailCreateDto,
    ) => {
      void postRefundTableHeadersDetail({
        requestBody: formData,
      }).then((response) => {
        if (response.type === "success") {
          toast.success("Refund table rule created successfully");
        } else if (response.type === "api-error") {
          toast.error(response.message || "Refund table rule creation failed");
        } else {
          toast.error("Fatal error");
        }
      });
    },
    componentType: "Autoform",
    description: languageData["RefundTables.Details.Create.Description"],
  };

  function handleRefundTableHeadersDelete(
    row: UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailDto,
  ) {
    setLoading(true);
    void deleteRefundTableHeadersDetail({
      id: row.id,
    }).then((response) => {
      if (response.type === "success") {
        toast.success("Rule deleted successfully");
      } else if (response.type === "api-error") {
        toast.error("Rule deletion failed");
      } else {
        toast.error("Fatal error");
      }
    });
    router.refresh();
    setLoading(false);
  }
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
              cta: "Update rule",
            },
          },
          callback: (
            formData: UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailUpdateDto,
          ) => {
            toast.warning(`Not implemented yet ${formData.id}`);

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
          description: "Edit rule",
        },
        {
          type: "Action",
          cta: "Delete",
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
                tableItem: UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailDto,
              ): null | UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailDto => {
                if (
                  tableItem[
                    filterKey as keyof UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailDto
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
