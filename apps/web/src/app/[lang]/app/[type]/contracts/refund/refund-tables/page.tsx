"use client";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import type {
  UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderCreateDto,
  UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto,
  Volo_Abp_Application_Dtos_PagedResultDto_19,
} from "@ayasofyazilim/saas/ContractService";
import {
  $UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto as listSchema,
  $UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderCreateDto as postSchema,
} from "@ayasofyazilim/saas/ContractService";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import type {
  ColumnsType,
  TableAction,
} from "@repo/ayasofyazilim-ui/molecules/tables";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getResourceDataClient } from "src/language-data/ContractService";
import { useLocale } from "src/providers/locale";
import { createZodObject, getBaseLink } from "src/utils";
import type { PagedResult } from "src/lib";
import {
  getRefundTableHeaders,
  postRefundTableHeaders,
} from "../../actions/refund-tables";

export default function Page({ params }: { params: { lang: string } }) {
  const router = useRouter();
  const [list, setList] =
    useState<Volo_Abp_Application_Dtos_PagedResultDto_19>();
  const { resources } = useLocale();
  const languageData = getResourceDataClient(resources, params.lang);
  const includeList = [
    "name",
    "validFrom",
    "validTo",
    "isDefault",
    "isBundling",
  ];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    void getRefundTableHeaders({}).then((response) => {
      if (response.type === "success") {
        setList(response.data);
        toast.success(response.message);
        return;
      }
      toast.error(response.message);

      setLoading(false);
    });
  }, []);
  const action: TableAction = {
    cta: languageData["RefundTables.Create.Title"],
    type: "Dialog",
    autoFormArgs: {
      formSchema: createZodObject(postSchema, includeList),
      submit: {
        cta: languageData["RefundTables.Create.Title"],
      },
    },
    componentType: "Autoform",
    description: languageData["RefundTables.Create.Description"],

    callback: (
      data: UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderCreateDto,
    ) => {
      void postRefundTableHeaders({
        requestBody: data,
      })
        .then((response) => {
          setLoading(true);
          if (response.type === "success") {
            toast.success(
              response.message || "Refund table created successfully",
            );
            router.push(
              getBaseLink(
                `app/admin/contracts/refund/refund-tables/${response.data.id}`,
              ),
            );
          } else {
            toast.error(response.message || "Refund table creation failed");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
  };
  const tableActions: TableAction[] = [
    {
      type: "Action",
      cta: languageData["RefundTables.Details"],
      callback: (
        row: UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto,
      ) => {
        router.push(
          getBaseLink(`app/admin/contracts/refund/refund-tables/${row.id}`),
        );
      },
    },
  ];
  const columnsData: ColumnsType = {
    type: "Auto",
    data: {
      tableType: listSchema,
      excludeList: [],
      positions: includeList.concat("lastModifierId", "lastModificationTime"),
      actionList: tableActions,
    },
  };
  return (
    <div className="">
      <PageHeader
        description={languageData["RefundTables.Description"]}
        isLoading={loading}
        title={languageData["RefundTables.Title"]}
      />
      <Card className="h-full px-4">
        <DataTable
          action={action}
          columnsData={columnsData}
          data={loading ? [] : list?.items || []}
          isLoading={loading}
          tableClassName="h-auto"
        />
      </Card>
    </div>
  );
}
