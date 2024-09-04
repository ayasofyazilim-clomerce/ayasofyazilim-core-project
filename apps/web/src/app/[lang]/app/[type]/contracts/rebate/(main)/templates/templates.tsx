"use client";
import { toast } from "@/components/ui/sonner";
import type {
  Volo_Abp_Application_Dtos_PagedResultDto_18 as PagedResultDto,
  UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderDto as RebateTableHeaderDto,
} from "@ayasofyazilim/saas/ContractService";
import { $UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderDto as listSchema } from "@ayasofyazilim/saas/ContractService";
import type {
  ColumnsType,
  TableAction,
} from "@repo/ayasofyazilim-ui/molecules/tables";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { ContractServiceResource } from "src/language-data/ContractService";
import { getBaseLink } from "src/utils";
import {
  deleteRebateTablesRebateTableHeadersById,
  getRebateTablesRebateTableHeadersTemplates,
} from "../../../actions/rebate-tables";

export default function Templates({
  languageData,
  // params,
}: {
  languageData: ContractServiceResource;
  // params: { lang: string; type: string };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState<PagedResultDto>();
  const getAndSetTemplates = () => {
    setLoading(true);
    void getRebateTablesRebateTableHeadersTemplates({})
      .then((response) => {
        if (response.type === "success") {
          setTemplates(response.data);
        } else if (response.type === "api-error") {
          toast.error(response.message || "Templates loading failed");
        } else {
          toast.error("Fatal error");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAndSetTemplates();
  }, []);

  const handleDelete = (row: RebateTableHeaderDto) => {
    setLoading(true);
    void deleteRebateTablesRebateTableHeadersById({ id: row.id || "" })
      .then((deleteResponse) => {
        if (deleteResponse.type === "success") {
          toast.success(
            deleteResponse.message || "Template deleted successfully",
          );
          getAndSetTemplates();
        } else if (deleteResponse.type === "api-error") {
          toast.error(deleteResponse.message || "Template delete failed");
        } else {
          toast.error("Fatal error");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const tableSetup: ColumnsType = {
    type: "Auto",
    data: {
      tableType: listSchema,
      excludeList: [],
      positions: ["name"],
      actionList: [
        {
          type: "Action",
          cta: languageData["RebateTables.Templates.Details"],
          callback: (row: RebateTableHeaderDto) => {
            router.push(
              getBaseLink(`app/admin/contracts/rebate/templates/${row.id}`),
            );
          },
        },
        {
          type: "Action",
          cta: languageData["RebateTables.Templates.Delete"],
          callback: handleDelete,
        },
      ],
    },
  };
  const tableAction: TableAction = {
    type: "NewPage",
    cta: languageData["RebateTables.Templates.Create"],
    href: getBaseLink(
      "app/admin/contracts/rebate/templates/new-rebate-template",
    ),
  };
  return (
    <DataTable
      action={tableAction}
      columnsData={tableSetup}
      data={templates?.items || []}
      isLoading={loading}
    />
  );
}
