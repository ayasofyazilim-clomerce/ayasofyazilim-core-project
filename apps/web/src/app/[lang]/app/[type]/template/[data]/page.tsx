"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AutoForm from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { EditIcon } from "lucide-react";
import { z } from "zod";
import Button from "@repo/ayasofyazilim-ui/molecules/button";
import type { ColumnDef } from "@tanstack/react-table";
import RebateTable from "./table";

const formSchema = z.object({
  Name: z.string(),
  CalculateNetCommissionInsteadOfRebate: z.boolean().optional(),
});

const initialFeesData: any[] = [];
const initialSetupData: any[] = [];

const feescolumns: ColumnDef<Record<string, any>>[] = [
  { header: "Name", accessorKey: "name", meta: { inputType: "text" } },
  {
    header: "Amount",
    accessorKey: "amount",
    meta: { inputType: "number" },
  },
];

const setupcolumns: ColumnDef<Record<string, any>>[] = [
  {
    header: "Refund method",
    accessorKey: "refundmethod",
    meta: { inputType: "select" },
  },
  {
    header: "Fixed fee",
    accessorKey: "fixedfee",
    meta: { inputType: "number" },
  },
  {
    header: "Variable fee",
    accessorKey: "variablefee",
    meta: { inputType: "select" },
  },
  {
    header: "% percent",
    accessorKey: "percent",
    meta: { inputType: "number" },
  },
];

const selectOptions = {
  refundmethod: [
    "All",
    "Cash",
    "Credit or debit card",
    "Alipay",
    "Wechat",
    "Cash via partner",
    "refund later",
  ],
  variablefee: ["% of GC", "% of GC without VAT", "% of VAT", "% of SIS"],
};

function App() {
  const [autoFormData, setAutoFormData] = useState({});
  const [feesData, setFeesData] = useState(initialFeesData);
  const [setupData, setSetupData] = useState(initialSetupData);

  const handleFormChange = (newFormData: any) => {
    setAutoFormData(newFormData);
  };

  const handleFeesTableDataChange = (newTableData: any) => {
    setFeesData(newTableData);
  };

  const handleSetupTableDataChange = (newTableData: any) => {
    setSetupData(newTableData);
  };

  const isRowEmpty = (row: any) => {
    return Object.values(row).every((value) => value === "" || value === null);
  };

  const handleSubmit = () => {
    const filteredFeesData = feesData.filter((row) => !isRowEmpty(row));
    const filteredSetupData = setupData.filter((row) => !isRowEmpty(row));

    const payload: any = {
      autoFormData,
    };

    if (filteredFeesData.length > 0) {
      payload.feesData = filteredFeesData;
    }

    if (filteredSetupData.length > 0) {
      payload.setupData = filteredSetupData;
    }
  };

  return (
    <div className="flex flex-row w-full h-full ">
      <Card className="bg-transparent border-0 shadow-none w-full overflow-auto pb-16 m-0">
        <CardHeader className="text-2xl font-bold flex flex-row gap-2 items-center">
          <EditIcon className="text-slate-600 w-6" /> Edit Template Information
        </CardHeader>
        <CardContent>
          <div className="px-9 [&>div>form>div]:space-y-4">
            <AutoForm
              fieldConfig={{
                withoutBorder: { fieldType: "switch" },
                CalculateNetCommissionInsteadOfRebate: {
                  fieldType: "switch",
                },
              }}
              formSchema={formSchema}
              onParsedValuesChange={handleFormChange}
            />
          </div>

          <div className="p-4 mt-4">
            <div className="relative flex items-center">
              <span className="text-lg font-medium">Processing fees</span>
              <div className="flex-grow border-t border-gray-300 ml-4" />
            </div>
            <div className="overflow-auto">
              <RebateTable
                columns={feescolumns}
                initialData={feesData}
                onTableDataChange={handleFeesTableDataChange}
              />
            </div>
          </div>

          <div className="p-4 mt-4">
            <div className="relative flex items-center">
              <span className="text-lg font-medium">Rebate set up</span>
              <div className="flex-grow border-t border-gray-300 ml-4" />
            </div>
            <div className="overflow-auto">
              <RebateTable
                columns={setupcolumns}
                initialData={setupData}
                onTableDataChange={handleSetupTableDataChange}
                selectOptions={selectOptions}
              />
            </div>
          </div>
          <div className="px-9 mt-4 flex gap-5 justify-end">
            <Button className=" w-40 ">Cancel</Button>
            <Button className=" w-40 " onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
