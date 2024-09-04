"use client";
import Dashboard from "@repo/ayasofyazilim-ui/templates/dashboard";
import type { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import type { TravellerServiceResource } from "src/language-data/TravellerService";
import { getBaseLink } from "src/utils";

const data = [
  {
    id: "bf9793cf-b402-5113-9858-3a148c836c34",
    name: "string",
    parentCompanyId: null,
    entityInformationTypeCode: 0,
    entityInformationTypeCodeName: "Individual",
    organizationId: null,
    individualId: "018258ed-6cf6-88f4-483d-3a148c836c34",
    countryId: 0,
    nationalityCountryName: "Turkey",
    residenceCountryName: "Turkey",
    travelDocumentNumber: "000291166",
  },
];
export interface Payment {
  id: string;
  name: string;
  parentCompanyId: string | null;
  entityInformationTypeCode: number;
  entityInformationTypeCodeName: string;
  organizationId: string | null;
  individualId: string;
  countryId: number;
  nationalityCountryName: string;
  residenceCountryName: string;
  travelDocumentNumber: string;
}
export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },

  {
    accessorKey: "travelDocumentNumber",
    header: () => <div>Travel Document Number</div>,
    cell: ({ row }) => <div>{row.getValue("travelDocumentNumber")}</div>,
  },
  {
    accessorKey: "nationalityCountryName",
    header: () => <div>Nationality Country Name</div>,
    cell: ({ row }) => <div>{row.getValue("nationalityCountryName")}</div>,
  },
  {
    accessorKey: "residenceCountryName",
    header: () => <div>Residence Country Name</div>,
    cell: ({ row }) => <div>{row.getValue("residenceCountryName")}</div>,
  },
];
export default function Table({
  languageData,
}: {
  languageData: TravellerServiceResource;
}) {
  const router = useRouter();
  return (
    <Dashboard
      action={[
        {
          cta: languageData.NewTraveller,
          type: "NewPage",
          href: getBaseLink("app/admin/traveller/new"),
        },
      ]}
      cards={[]}
      columnsData={{
        type: "Custom",
        data: {
          columns,
          actionList: [
            {
              cta: languageData.Edit,
              type: "Action",
              callback: (originalRow: { id: string }) => {
                router.push(
                  getBaseLink(`app/admin/traveller/${originalRow.id}`),
                );
              },
            },
          ],
        },
      }}
      rowCount={1}
      withCards={false}
      withTable
      data={data}
      //  fetchRequest={getRoles}

      isLoading={false}
    />
  );
}
