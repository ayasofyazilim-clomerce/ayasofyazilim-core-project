import type {Volo_Abp_AuditLogging_AuditLogDto} from "@ayasofyazilim/core-saas/AdministrationService";
import {
  $System_Net_HttpStatusCode,
  $Volo_Abp_AuditLogging_AuditLogDto,
} from "@ayasofyazilim/core-saas/AdministrationService";
import type {TanstackTableCreationProps} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/types";
import {tanstackTableCreateColumnsByRowData} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import {InfoIcon} from "lucide-react";
import type {AdministrationServiceResource} from "src/language-data/core/AdministrationService";
import AuditDetail from "./audit-detail";

type AuditLogsTable = TanstackTableCreationProps<Volo_Abp_AuditLogging_AuditLogDto>;

const badgeClassNames = {
  200: "text-green-500 bg-green-100 border-green-500",
  204: "text-green-500 bg-green-100 border-green-500",
  302: "text-orange-500 bg-orange-100 border-orange-500",
  400: "text-red-500 bg-red-100 border-red-500",
  401: "text-red-500 bg-red-100 border-red-500",
  403: "text-red-500 bg-red-100 border-red-500",
  404: "text-red-500 bg-red-100 border-red-500",
  500: "text-red-500 bg-red-100 border-red-500",
  POST: "text-green-500 bg-green-100 border-green-500",
  GET: "text-blue-500 bg-blue-100 border-blue-500",
  PUT: "text-orange-500 bg-orange-100 border-orange-500",
  DELETE: "text-red-500 bg-red-100 border-red-500",
};
const auditLogsColumns = (locale: string, languageData: AdministrationServiceResource) => {
  const columns = tanstackTableCreateColumnsByRowData<Volo_Abp_AuditLogging_AuditLogDto>({
    rows: $Volo_Abp_AuditLogging_AuditLogDto.properties,
    languageData: {
      languageData,
      constantKey: "Form.Log.Audit",
    },
    config: {
      locale,
    },
    badges: {
      url: {
        values: Object.keys(badgeClassNames).map((key) => ({
          position: "before",
          label: key.toString(),
          badgeClassName: badgeClassNames[key as keyof typeof badgeClassNames],
          conditions: [
            {
              conditionAccessorKey: "httpMethod",
              when: (value) => value === key,
            },
            {
              conditionAccessorKey: "httpStatusCode",
              when: (value) => value.toString() === key,
            },
          ],
        })),
      },
    },
  });
  
  // Customize the URL column to have fixed width and text truncation
  const urlColumnIndex = columns.findIndex(col => col.id === "url");
  if (urlColumnIndex !== -1) {
    const originalCell = columns[urlColumnIndex].cell;
    columns[urlColumnIndex] = {
      ...columns[urlColumnIndex],
      size: 300,
      maxSize: 400,
      minSize: 200,
      cell: ({ row, ...props }) => (
        <div className="max-w-[300px] overflow-hidden">
          <div className="truncate" title={row.getValue("url")?.toString() || ""}>
            {typeof originalCell === 'function' ? originalCell({ row, ...props }) : row.getValue("url")}
          </div>
        </div>
      ),
    };
  }
  
  return columns;
};
function auditLogsTable(languageData: AdministrationServiceResource) {
  const table: AuditLogsTable = {
    fillerColumn: "applicationName",
    pinColumns: ["url"],
    filters: {
      textFilters: [
        "userName",
        "url",
        "applicationName",
        "clientIpAddress",
        "correlationId",
        "minExecutionDuration",
        "maxExecutionDuration",
      ],
      dateFilters: [
        {
          label: languageData.StartEndTime,
          startAccessorKey: "startTime",
          endAccessorKey: "endTime",
        },
      ],
      facetedFilters: {
        httpStatusCode: {
          title: languageData["Form.Log.Audit.httpStatusCode"],
          options: $System_Net_HttpStatusCode.enum.map((statusCode) => ({
            value: statusCode,
            label: statusCode,
          })),
        },
        httpMethod: {
          title: languageData["Form.Log.Audit.httpMethod"],
          options: [
            {value: "GET", label: "GET"},
            {value: "POST", label: "POST"},
            {value: "PUT", label: "PUT"},
            {value: "DELETE", label: "DELETE"},
            {value: "HEAD", label: "HEAD"},
            {value: "CONNECT", label: "CONNECT"},
            {value: "OPTIONS", label: "OPTIONS"},
            {value: "TRACE", label: "TRACE"},
          ],
        },
        hasException: {
          title: languageData["Form.Log.Audit.hasException"],
          options: [
            {value: "true", label: "True"},
            {value: "false", label: "False"},
          ],
        },
      },
    },
    columnVisibility: {
      type: "show",
      columns: ["url", "userName", "clientIpAddress", "executionTime", "executionDuration", "applicationName"],
    },
    columnOrder: [
      "url",
      "httpStatusCode",
      "httpMethod",
      "userName",
      "clientIpAddress",
      "executionTime",
      "executionDuration",
      "applicationName",
    ],
    rowActions: [
      {
        type: "custom-dialog",
        cta: languageData["Log.Audit.Detail"],
        title: languageData["Log.Audit.Details"],
        icon: InfoIcon,
        actionLocation: "row",
        content: (rowData) => <AuditDetail languageData={languageData} auditData={rowData} />,
      },
    ],
  };
  return table;
}

export const tableData = {
  auditLogs: {
    columns: auditLogsColumns,
    table: auditLogsTable,
  },
};
