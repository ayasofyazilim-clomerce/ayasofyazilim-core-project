"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import type {
  UniRefund_ContractService_Refunds_RefundFeeDetails_RefundFeeDetailCreateDto as RefundFeeDetailCreateDto,
  UniRefund_ContractService_Refunds_RefundFeeDetails_RefundFeeDetailDto as RefundFeeDetailDto,
  UniRefund_ContractService_Refunds_RefundFeeDetails_RefundFeeDetailUpdateDto as RefundFeeDetailUpdateDto,
  UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderDto as RefundFeeHeaderDto,
  UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderUpdateDto as RefundFeeHeaderUpdateDto,
} from "@ayasofyazilim/saas/ContractService";
import {
  $UniRefund_ContractService_Refunds_RefundFeeDetails_RefundFeeDetailCreateDto as detailCreateSchema,
  $UniRefund_ContractService_Refunds_RefundFeeDetails_RefundFeeDetailDto as detailSchema,
  $UniRefund_ContractService_Refunds_RefundFeeDetails_RefundFeeDetailUpdateDto as detailUpdateSchema,
  $UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderUpdateDto as headerUpdateSchema,
} from "@ayasofyazilim/saas/ContractService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import type { TableAction } from "@repo/ayasofyazilim-ui/molecules/dialog";
import type { ColumnsType } from "@repo/ayasofyazilim-ui/molecules/tables";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ContractServiceResource } from "src/language-data/ContractService";
import { getBaseLink } from "src/utils";
import {
  deleteRefundTableFeeHeaderDetailsById,
  deleteRefundTableFeeHeadersById,
  postRefundTableFeeHeaderDetailsByRefundTableHeaderId,
  putRefundTableFeeHeaderDetailsById,
  putRefundTableFeeHeadersById,
} from "../../../actions/refund-tables";

export default function Edit({
  details,
  languageData,
}: {
  details: RefundFeeHeaderDto;
  languageData: ContractServiceResource;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (data: RefundFeeHeaderUpdateDto) => {
    setLoading(true);
    void putRefundTableFeeHeadersById({
      id: details.id || "",
      requestBody: data,
    })
      .then((response) => {
        if (response.type === "success") {
          toast.success(
            response.message || "Refund fee header updated successfully",
          );
        } else if (response.type === "api-error") {
          toast.error(response.message || "Refund fee header update failed");
        } else {
          toast.error("Fatal error");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleDelete = () => {
    setLoading(true);
    void deleteRefundTableFeeHeadersById({ id: details.id || "" })
      .then((response) => {
        if (response.type === "success") {
          toast.success(
            response.message || "Refund fee header deleted successfully",
          );
          router.push(getBaseLink("app/admin/contracts/refund/refund-fees"));
        } else if (response.type === "api-error") {
          toast.error(response.message || "Refund fee header delete failed");
        } else {
          toast.error("Fatal error");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSetupDelete = (row: RefundFeeDetailDto) => {
    setLoading(true);
    void deleteRefundTableFeeHeaderDetailsById({ id: row.id || "" })
      .then((response) => {
        if (response.type === "success") {
          toast.success(
            response.message || "Refund fee setup deleted successfully",
          );
          router.refresh();
        } else if (response.type === "api-error") {
          toast.error(
            response.message || "Refund fee setup header delete failed",
          );
        } else {
          toast.error("Fatal error");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleSetupUpdate = (
    row: RefundFeeDetailUpdateDto,
    originalRow: RefundFeeDetailDto,
  ) => {
    setLoading(true);
    void putRefundTableFeeHeaderDetailsById({
      id: originalRow.id || "",
      requestBody: row,
    })
      .then((response) => {
        if (response.type === "success") {
          toast.success(
            response.message || "Refund fee setup updated successfully",
          );
          router.refresh();
        } else if (response.type === "api-error") {
          toast.error(
            response.message || "Refund fee setup header update failed",
          );
        } else {
          toast.error("Fatal error");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleSetupCreate = (row: RefundFeeDetailCreateDto) => {
    setLoading(true);
    void postRefundTableFeeHeaderDetailsByRefundTableHeaderId({
      refundFeeHeaderId: details.id || "",
      requestBody: row,
    })
      .then((response) => {
        if (response.type === "success") {
          toast.success(
            response.message || "Refund fee setup created successfully",
          );
          router.refresh();
        } else if (response.type === "api-error") {
          toast.error(
            response.message || "Refund fee setup header create failed",
          );
        } else {
          toast.error("Fatal error");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const columnsData: ColumnsType = {
    type: "Auto",
    data: {
      tableType: detailSchema,
      excludeList: [],
      positions: [
        "amountFrom",
        "amountTo",
        "fixedFeeValue",
        "percentFeeValue",
        "minFee",
        "maxFee",
      ],
      actionList: [
        {
          type: "Sheet",
          cta: languageData["RefundFees.Page.Edit.Fee.Edit"],
          description:
            languageData["RefundFees.Page.Edit.Fee.Edit.Description"],
          autoFormArgs: {
            formSchema: createZodObject(detailUpdateSchema, undefined),
            submit: {
              cta: languageData["RefundFees.Page.Edit.Fee.Edit.Save"],
            },
          },
          callback: (row: unknown, originalRow: unknown) => {
            handleSetupUpdate(
              row as RefundFeeDetailUpdateDto,
              originalRow as RefundFeeDetailDto,
            );
          },
          componentType: "Autoform",
        },
        {
          type: "Action",
          cta: languageData["RefundFees.Page.Edit.Fee.Delete"],
          callback: handleSetupDelete,
        },
      ],
    },
  };
  const setupRefund: TableAction = {
    type: "Sheet",
    cta: languageData["RefundFees.Page.Edit.Fee.Create"],
    description: languageData["RefundFees.Page.Edit.Fee.Create.Description"],
    autoFormArgs: {
      formSchema: createZodObject(detailCreateSchema),
      fieldConfig: {
        refundFeeHeaderId: {
          containerClassName: "hidden",
        },
      },
      submit: {
        cta: languageData["RefundFees.Page.Edit.Fee.Create.Save"],
      },
    },
    componentType: "Autoform",
    callback: handleSetupCreate,
  };

  return (
    <div className="h-[500px] overflow-auto">
      <AutoForm
        className="grid w-full items-end gap-4 md:grid-cols-2"
        fieldConfig={{
          name: {
            containerClassName: "md:col-span-2",
          },
          isActive: {
            fieldType: "switch",
          },
        }}
        formClassName="space-y-0 flex flex-col items-end"
        formSchema={createZodObject(headerUpdateSchema, [
          "name",
          "validFrom",
          "validTo",
          "isActive",
        ])}
        onSubmit={(values: unknown) => {
          handleSubmit(values as RefundFeeHeaderUpdateDto);
        }}
        values={details}
      >
        <div className="space-x-2">
          <Button onClick={handleDelete} type="button" variant="outline">
            {languageData["RefundFees.Page.Edit.Delete"]}
          </Button>
          <AutoFormSubmit className="mt-0">
            {languageData["RefundFees.Page.Edit.Save"]}
          </AutoFormSubmit>
        </div>
      </AutoForm>
      <DataTable
        action={setupRefund}
        columnsData={columnsData}
        data={details.refundFeeDetails || []}
        isLoading={loading}
      />
    </div>
  );
}
