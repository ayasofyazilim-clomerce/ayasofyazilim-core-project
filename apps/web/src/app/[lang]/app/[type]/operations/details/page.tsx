"use client";
import type {
  ColumnFilter,
  ColumnsType,
} from "@repo/ayasofyazilim-ui/molecules/tables";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type {
  GetApiTagServiceTagData,
  GetApiTagServiceTagResponse,
} from "@ayasofyazilim/saas/TagService";
import {
  $UniRefund_TagService_Tags_RefundType,
  $UniRefund_TagService_Tags_TagListItemDto,
  $UniRefund_TagService_Tags_TagStatusType,
} from "@ayasofyazilim/saas/TagService";
import { toast } from "@/components/ui/sonner";
import { getBaseLink } from "src/utils";
import type { TaxFreeTag } from "./data";
import { getTags } from "./actions";

type FilterType = keyof GetApiTagServiceTagData;
type DetailedFilter = ColumnFilter & { name: FilterType };

export default function Page(): JSX.Element {
  const filters: DetailedFilter[] = [
    {
      name: "exportEndDate",
      displayName: "Export End Date",
      type: "date",
      value: "",
    },
    {
      name: "issuedEndDate",
      displayName: "Issued End Date",
      type: "date",
      value: "",
    },
    {
      name: "invoiceNumber",
      displayName: "Invoice Number",
      type: "string",
      value: "",
    },
    {
      name: "tagNumber",
      displayName: "Tag Number",
      type: "string",
      value: "",
    },
    {
      name: "sorting",
      displayName: "Sorting",
      type: "select",
      value: "",
      options: [
        { label: "Ascending", value: "asc" },
        { label: "Descending", value: "desc" },
      ],
      placeholder: "Select Sorting",
    },
    {
      name: "paidEndDate",
      displayName: "Paid End Date",
      type: "date",
      value: "",
    },
    {
      name: "exportStartDate",
      displayName: "Export Start Date",
      type: "date",
      value: "",
    },
    {
      name: "issuedStartDate",
      displayName: "Issued Start Date",
      type: "date",
      value: "",
    },
    {
      name: "merchantIds",
      displayName: "Merchant IDs",
      type: "string",
      value: "",
    },
    {
      name: "paidStartDate",
      displayName: "Paid Start Date",
      type: "date",
      value: "",
    },
    {
      name: "refundTypes",
      displayName: "Refund Types",
      type: "select",
      options: [
        ...$UniRefund_TagService_Tags_RefundType.enum.map((item) => ({
          label: item,
          value: item,
        })),
      ],
      placeholder: "Select Refund Type",
      value: "",
    },
    {
      name: "statuses",
      displayName: "Statuses",
      type: "select",
      value: "",
      options: [
        ...$UniRefund_TagService_Tags_TagStatusType.enum.map((item) => ({
          label: item,
          value: item,
        })),
      ],
      placeholder: "Select Status",
    },
    {
      name: "travellerDocumentNumber",
      displayName: "Traveller Document Number",
      type: "string",
      value: "",
    },
    {
      name: "travellerName",
      displayName: "Traveller Name",
      type: "string",
      value: "",
    },
  ];
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<GetApiTagServiceTagResponse>();
  const fetchTags = (page: number, filter: string) => {
    const filters_ = JSON.parse(filter) as GetApiTagServiceTagData;
    setLoading(true);
    void getTags({ maxResultCount: 10, skipCount: page * 10, ...filters_ })
      .then((res) => {
        if (res.type === "success") {
          setTags(res.data);
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
        // handleFilter(filter);
      });
  };

  useEffect(() => {
    async function getTagsFromAPI() {
      const tagsList = await getTags();
      if (tagsList.type === "success") {
        setTags(tagsList.data);
        toast.success(tagsList.message);
        setLoading(false);
        return;
      }
      toast.error(tagsList.message);
    }
    void getTagsFromAPI();
  }, []);
  const columnsData: ColumnsType = {
    type: "Auto",
    data: {
      tableType: $UniRefund_TagService_Tags_TagListItemDto,
      excludeList: ["id"],
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
      data={tags?.items || []}
      detailedFilter={filters}
      fetchRequest={fetchTags}
      isLoading={loading}
      rowCount={tags?.totalCount || 0}
    />
  );
}
