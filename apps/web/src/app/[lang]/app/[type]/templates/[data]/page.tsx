"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { EditIcon, CalculatorIcon } from "lucide-react";
import { z } from "zod";

const formSchema = z.object({
  Name: z.string(),
  CalculateNetCommissionInsteadOfRebate: z.boolean().optional(),
  fees: z.array(
    z
      .object({
        Name: z.string(),
        Amount: z.number(),
      })
      .describe("Processing fees"),
  ),
  setup: z.array(
    z.object({
      RefundMethod: z.enum([
        "All",
        "Cash",
        "Credit or Debit card",
        "Alipay",
        "weChat",
        "Cash via partner",
        "Refund later",
      ]),
      FixedFee: z.coerce.number(),
      VariableFee: z.enum([
        "% of GC",
        "% of GC without VAT",
        "% of VAT",
        "% of SIS",
      ]),
      "%": z.coerce.number(),
    }),
  ),
});

const methods = [
  {
    refund_method: "Cash",
    vat_percent: "20 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "Cash",
    vat_percent: "18 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "Cash",
    vat_percent: "10 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "Cash",
    vat_percent: "8 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "Cash",
    vat_percent: "1 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "Credit or Debit card",
    vat_percent: "20 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "Credit or Debit card",
    vat_percent: "18 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "Credit or Debit card",
    vat_percent: "10 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "Credit or Debit card",
    vat_percent: "8 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "Credit or Debit card",
    vat_percent: "1 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "Alipay",
    vat_percent: "20 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "Alipay",
    vat_percent: "18 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "Alipay",
    vat_percent: "10 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "Alipay",
    vat_percent: "8 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "Alipay",
    vat_percent: "1 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "WeChat",
    vat_percent: "20 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "WeChat",
    vat_percent: "18 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "WeChat",
    vat_percent: "10 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "WeChat",
    vat_percent: "8 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "WeChat",
    vat_percent: "1 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "Cash via partner",
    vat_percent: "20 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "Cash via partner",
    vat_percent: "18 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "Cash via partner",
    vat_percent: "10 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "Cash via partner",
    vat_percent: "8 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "Cash via partner",
    vat_percent: "1 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "Refund later",
    vat_percent: "20 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "Refund later",
    vat_percent: "18 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "Refund later",
    vat_percent: "10 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "Refund later",
    vat_percent: "8 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
  {
    refund_method: "Refund later",
    vat_percent: "1 %",
    vat: "0",
    refund: "0",
    gc: "0",
    rebate: "0",
    nc: "0",
    rebate_ofgc: "0 %",
  },
];

function App() {
  return (
    <div className="flex flex-row w-full h-full overflow-hidden">
      <Card className="m-1 shadow-lg pb-4 w-1/2">
        <CardHeader className="text-2xl font-bold flex flex-row gap-2 items-center">
          <EditIcon className="text-slate-600 w-6" /> Edit Template Information
        </CardHeader>
        <CardContent>
          <AutoForm
            fieldConfig={{
              withoutBorder: true,
              name: { withoutBorder: true },
              fees: { withoutBorder: true },
              setup: { withoutBorder: true },
              CalculateNetCommissionInsteadOfRebate: {
                withoutBorder: true,
              },
            }}
            formSchema={formSchema}
          >
            <div className=" flex gap-3">
              <AutoFormSubmit className="w-1/6">Cancel</AutoFormSubmit>
              <AutoFormSubmit className="w-1/6" type="submit">
                Save
              </AutoFormSubmit>
            </div>
          </AutoForm>
        </CardContent>
      </Card>

      <Card className="m-1 shadow-lg pb-4 w-1/2">
        <CardHeader className="text-2xl font-bold flex flex-row gap-2 items-center">
          <CalculatorIcon className="text-slate-600 w-6" />
          Preview Your Template
        </CardHeader>
        <CardContent>
          <DataTable
            columnsData={{
              type: "Custom",
              data: [
                {
                  id: "select",
                  enableSorting: false,
                  enableHiding: false,
                },
                {
                  accessorKey: "refund_method",
                  header: "REFUND METHOD",
                },
                {
                  accessorKey: "vat_percent",
                  header: "VAT %",
                },
                {
                  accessorKey: "vat",
                  header: "VAT",
                },
                {
                  accessorKey: "refund",
                  header: "REFUND",
                },
                {
                  accessorKey: "gc",
                  header: "GC",
                },
                {
                  accessorKey: "rebate",
                  header: "REBATE",
                },
                {
                  accessorKey: "nc",
                  header: "NC",
                },
                {
                  accessorKey: "rebate_ofgc",
                  header: "REBATE % OF GC",
                },
              ],
            }}
            data={methods}
            filterBy="result"
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
