"use client";

import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import type {
  UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderCreateDto as CreateType,
  UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderDto as ListItemType,
  Volo_Abp_Application_Dtos_PagedResultDto_19 as PagedResultType,
} from "@ayasofyazilim/saas/ContractService";
import {
  $UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderCreateDto as createSchema,
  $UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderDto as listSchema,
} from "@ayasofyazilim/saas/ContractService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
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
  getRefundTableFeeHeaders,
  postRefundTableFeeHeaders,
} from "../../actions/refund-tables";

export default function RefundFees({
  languageData,
}: {
  languageData: ContractServiceResource;
}) {
  const router = useRouter();
  const [initData, setInitData] = useState<PagedResultType>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    void getRefundTableFeeHeaders({})
      .then((res) => {
        if (res.type === "success") {
          setInitData(res.data);
        }
        if (res.type === "error") {
          toast.error(res.message);
        }
        if (res.type === "api-error") {
          toast.error(res.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (!initData) return null;

  // const [tableData, setTableData] = useState<ListItemType[]>();
  // const filter: ColumnFilter[] = [
  //   {
  //     name: "name",
  //     displayName: "Name",
  //     type: "string",
  //     value: "",
  //   },
  // ];
  const includeList = [
    "name",
    "isActive",
    "validFrom",
    "validTo",
    // "companiesCount", backend will implement this
  ];
  // const action: TableAction = {
  //   type: "NewPage",
  //   cta: languageData["RefundFees.Page.List.Create"],
  //   href: getBaseLink("app/admin/contracts/refund/refund-fees/new"),
  // };
  const action: TableAction = {
    type: "Sheet",
    cta: languageData["RefundFees.Page.List.Create"],
    autoFormArgs: {
      formSchema: createZodObject(createSchema),
      submit: {
        cta: languageData["RefundFees.Page.List.Create.Save"],
        className: "w-full",
      },
      fieldConfig: {
        isActive: {
          containerClassName: "mt-4",
          fieldType: "switch",
        },
      },
      values: {
        validFrom: new Date(),
        validTo: new Date(),
        isActive: true,
      },
    },
    componentType: "Autoform",
    callback(formData: CreateType) {
      void postRefundTableFeeHeaders({
        requestBody: formData,
      }).then((postResponse) => {
        if (postResponse.type === "success") {
          toast.success("Refund fee created successfully");
          router.push(
            getBaseLink(
              `app/admin/contracts/refund/refund-fees/${postResponse.data.id}`,
            ),
          );
        } else if (postResponse.type === "api-error") {
          toast.error(postResponse.message || "Refund fee creation failed");
        } else {
          toast.error("Fatal error");
        }
      });
    },
    description: languageData["RefundFees.Page.List.Create"],
  };
  const actionList: TableAction[] = [
    // {
    //   type: "Action",
    //   cta: (row: ListItemType) => {
    //     if (row.isActive) {
    //       return languageData["RefundFees.Page.List.Deactivate"];
    //     }
    //     return languageData["RefundFees.Page.List.Activate"];
    //   },
    //   callback: () => {
    //     // row: ListItemType;
    //     toast.warning("Not implemented");
    //   },
    // },
    {
      type: "Action",
      cta: languageData["RefundFees.Page.List.Details"],
      callback: (row: ListItemType) => {
        router.push(
          getBaseLink(`app/admin/contracts/refund/refund-fees/${row.id}`),
        );
      },
    },
  ];
  const columnsData: ColumnsType = {
    type: "Auto",
    data: {
      tableType: listSchema,
      excludeList: [],
      positions: includeList, //.concat("lastModifierId", "lastModificationTime"),
      actionList,
    },
  };

  const handleFilter = (filter: string) => {
    return filter;
    // const parsedFilter: Record<string, string> = JSON.parse(filter) as Record<
    //   string,
    //   string
    // >;
    // if (Object.keys(parsedFilter).length === 0) {
    //   // setTableData(initData.items || []);
    // } else {
    //   Object.keys(parsedFilter).forEach((filterKey: string) => {
    //     const filteredTable = initData.items?.filter(
    //       (tableItem: ListItemType): null | ListItemType => {
    //         if (
    //           tableItem[filterKey as keyof ListItemType] &&
    //           tableItem[filterKey as keyof ListItemType]
    //             ?.toString()
    //             .toLowerCase()
    //             .includes(parsedFilter[filterKey].toLowerCase())
    //         ) {
    //           return tableItem;
    //         }
    //         return null;
    //       },
    //     );
    //     // setTableData(filteredTable || []);
    //   });
    // }
  };
  const handleFetch = (page: number, filter: string) => {
    setLoading(true);
    void getRefundTableFeeHeaders({ maxResultCount: 10, skipCount: page * 10 })
      .then((res) => {
        if (res.type === "success") {
          setInitData(res.data);
        }
        if (res.type === "error") {
          toast.error(res.message);
        }
        if (res.type === "api-error") {
          toast.error(res.message);
        }
      })
      .finally(() => {
        setLoading(false);
        handleFilter(filter);
      });
  };
  return (
    <Card className="px-4">
      <DataTable
        action={action}
        columnsData={columnsData}
        isLoading={loading}
        rowCount={initData.totalCount}
        data={initData.items || []}
        // detailedFilter={filter}
        fetchRequest={handleFetch}
      />
    </Card>
  );
}
