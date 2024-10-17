"use client";

import { toast } from "@/components/ui/sonner";
import type { PagedResultDto_ContractHeaderDetailForMerchantDto } from "@ayasofyazilim/saas/ContractService";
import { $UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderForMerchantDto as ContractsForMerchantDto } from "@ayasofyazilim/saas/ContractService";
import type { TableAction } from "@repo/ayasofyazilim-ui/molecules/tables";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import { SectionLayoutContent } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { CRMServiceServiceResource } from "src/language-data/CRMService";
import { getBaseLink } from "src/utils";
import { getContractHeadersByMerchantId } from "./action";

export default function Contracts({
  languageData,
  partyName,
  partyId,
}: {
  languageData: CRMServiceServiceResource;
  partyName: "merchants";
  partyId: string;
}) {
  const router = useRouter();
  const [contractsData, setContractsData] =
    useState<PagedResultDto_ContractHeaderDetailForMerchantDto>();
  const [loading, setLoading] = useState(true);
  async function getContractsOfMerchant() {
    setLoading(true);
    try {
      const response = await getContractHeadersByMerchantId({
        id: partyId,
      });
      if (response.type === "error" || response.type === "api-error") {
        toast.error(response.message || response.status);
        return;
      }
      setContractsData(response.data);
    } catch (error) {
      toast.error("An error occurred while fetching contracts.");
    } finally {
      setLoading(false);
    }
  }
  const actionContracts: TableAction[] = [
    {
      cta: languageData[
        `${"Contracts".replaceAll(" ", "")}.New` as keyof typeof languageData
      ],
      type: "NewPage",
      href: `/app/admin/parties/${partyName}/${partyId}/contracts/new/`,
    },
    {
      cta: `Export CSV`,
      callback: () => {
        //  jsonToCSV(contractsData, params.data);
      },
      type: "Action",
    },
  ];
  return (
    <SectionLayoutContent sectionId="contracts">
      <DataTable
        action={actionContracts}
        columnsData={{
          type: "Auto",
          data: {
            tableType: ContractsForMerchantDto,
            excludeList: [
              "creationTime",
              // "creatorId",
              // "lastModificationTime",
              // "deleted",
              // "deleterId",
              // "deletionTime",
            ],
            positions: ["name", "contractType"],
            actionList: [
              {
                cta: languageData.Delete,
                type: "Dialog",
                componentType: "ConfirmationDialog",
                description: languageData["Delete.Assurance"],
                cancelCTA: languageData.Cancel,
                variant: "destructive",
              },
              {
                cta: languageData.Edit,
                type: "Action",
                callback: (row: { id: string }) => {
                  router.push(
                    getBaseLink(
                      `app/admin/parties/${partyName}/${partyId}/contracts/${row.id}`,
                    ),
                  );
                },
              },
            ],
          },
        }}
        data={contractsData?.items || []}
        fetchRequest={getContractsOfMerchant}
        isLoading={loading}
        rowCount={contractsData?.totalCount}
      />
    </SectionLayoutContent>
  );
}
