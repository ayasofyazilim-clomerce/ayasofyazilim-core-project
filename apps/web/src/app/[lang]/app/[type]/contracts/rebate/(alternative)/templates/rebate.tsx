/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument -- TODO: we need to fix this*/
"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  AyasofYazilim_Enum_Enums_EnumDto as EnumDto,
  UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderDto as RebateTableHeaderDto,
} from "@ayasofyazilim/saas/ContractService";
import { $UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderUpdateDto as RebateTableHeaderUpdateSchema } from "@ayasofyazilim/saas/ContractService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import Button from "@repo/ayasofyazilim-ui/molecules/button";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import AutoForm from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { EditIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import type { ContractServiceResource } from "src/language-data/ContractService";

function NameCell({ getValue, row: { index }, column: { id }, table }: any) {
  const name = getValue();
  const [value, setValue] = useState(name);

  const onBlur = (): void => {
    table.options.meta?.updateData(index, id, value);
  };

  useEffect(() => {
    setValue(name);
  }, [name]);

  return (
    <Input
      onBlur={onBlur}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      type="text"
      value={value as string}
    />
  );
}

function AmountCell({ getValue, row: { index }, column: { id }, table }: any) {
  const amount = getValue();
  const [value, setValue] = useState(amount);

  const onBlur = (): void => {
    table.options.meta?.updateData(index, id, value);
  };

  useEffect(() => {
    setValue(amount);
  }, [amount]);

  return (
    <Input
      min={0}
      onBlur={onBlur}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      type="number"
      value={value as number}
    />
  );
}

const feescolumns = ({
  languageData,
}: {
  languageData: ContractServiceResource;
}) => {
  return [
    {
      id: "select",
      header: ({ table }: any) => (
        <Checkbox
          aria-label="Select all"
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(Boolean(value));
          }}
        />
      ),
      cell: ({ row }: any) => (
        <Checkbox
          aria-label="Select row"
          checked={row.getIsSelected()}
          onCheckedChange={() => {
            row.toggleSelected();
          }}
        />
      ),
    },
    {
      accessorKey: "name",
      header: () => (
        <div className="text-center">
          {languageData["RebateTables.Templates.Column.Name"]}
        </div>
      ),
      cell: (props: any) => <NameCell {...props} />,
    },
    {
      accessorKey: "amount",
      header: () => (
        <div className="text-center">
          {languageData["RebateTables.Templates.Column.Amount"]}
        </div>
      ),
      cell: (props: any) => <AmountCell {...props} />,
    },
    {
      accessorKey: "actions",
      enableHiding: false,
      cell: ({ row, table }: any) => (
        <Button
          onClick={() => {
            table.options.meta?.removeRow(
              row.index,
              languageData["RebateTables.Templates.Column.Actions"],
              null,
            );
          }}
          variant="ghost"
        >
          <Trash2Icon className="h-4 w-4 text-red-500" />
        </Button>
      ),
    },
  ];
};

function SetupCell({
  getValue,
  row: { index },
  column: { id },
  table,
  languageData,
}: any) {
  const setupValue = getValue() as EnumDto | undefined;
  const [value, setValue] = useState<string | undefined>(setupValue?.key || "");

  const onChange = (newValue: string): void => {
    setValue(newValue);
    table.options.meta?.updateData(index, id, newValue);
  };

  useEffect(() => {
    setValue(setupValue?.key || "");
  }, [setupValue]);

  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-full text-center">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ALL">
          {languageData["RebateTables.Templates.RefundMethod.Option.All"]}
        </SelectItem>
        <SelectItem value="CASH">
          {languageData["RebateTables.Templates.RefundMethod.Option.Cash"]}
        </SelectItem>
        <SelectItem value="CREDITORDEBITCARD">
          {
            languageData[
              "RebateTables.Templates.RefundMethod.Option.CreditOrDebitCard"
            ]
          }
        </SelectItem>
        <SelectItem value="ALIPAY">
          {languageData["RebateTables.Templates.RefundMethod.Option.Alipay"]}
        </SelectItem>
        <SelectItem value="WECHAT">
          {languageData["RebateTables.Templates.RefundMethod.Option.WeChat"]}
        </SelectItem>
        <SelectItem value="CASHVIAPARTNER">
          {
            languageData[
              "RebateTables.Templates.RefundMethod.Option.CashViaPartner"
            ]
          }
        </SelectItem>
        <SelectItem value="REFUNDLATER">
          {
            languageData[
              "RebateTables.Templates.RefundMethod.Option.RefundLater"
            ]
          }
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

function Fixedfee({ getValue, row: { index }, column: { id }, table }: any) {
  const fixedFeeValue = getValue();
  const [value, setValue] = useState(fixedFeeValue);
  const onBlur = (): void => {
    table.options.meta?.updateData(index, id, value);
  };

  useEffect(() => {
    setValue(fixedFeeValue);
  }, [fixedFeeValue]);

  return (
    <Input
      min={0}
      onBlur={onBlur}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      type="number"
      value={value as string}
    />
  );
}

function Variablefee({ getValue, row: { index }, column: { id }, table }: any) {
  const variableFeeValue = getValue() as EnumDto | undefined;
  const [value, setValue] = useState<string | undefined>(
    variableFeeValue?.key || "",
  );
  const onChange = (newValue: string): void => {
    setValue(newValue);
    table.options.meta?.updateData(index, id, newValue);
  };

  useEffect(() => {
    setValue(variableFeeValue?.key || "");
  }, [variableFeeValue]);
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-full text-center">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="PERCENTOFGC">% of GC</SelectItem>
        <SelectItem value="PERCENTOFGCWITHOUTVAT">
          % of GC without VAT
        </SelectItem>
        <SelectItem value="PERCENTOVAT">% of VAT</SelectItem>
        <SelectItem value="PERCENTOSIS">% of SIS</SelectItem>
      </SelectContent>
    </Select>
  );
}

function PercentCell({ getValue, row: { index }, column: { id }, table }: any) {
  const percentValue = getValue();
  const [value, setValue] = useState(percentValue);

  const onBlur = (): void => {
    table.options.meta?.updateData(index, id, value);
  };

  useEffect(() => {
    setValue(percentValue);
  }, [percentValue]);

  return (
    <Input
      min={0}
      onBlur={onBlur}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      type="number"
      value={value as string}
    />
  );
}

const setupcolumns = ({
  languageData,
}: {
  languageData: ContractServiceResource;
}) => {
  return [
    {
      id: "select",
      header: ({ table }: any) => (
        <Checkbox
          aria-label="Select all"
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(Boolean(value));
          }}
        />
      ),
      cell: ({ row }: any) => (
        <Checkbox
          aria-label="Select row"
          checked={row.getIsSelected()}
          onCheckedChange={row.getToggleSelectedHandler()}
        />
      ),
    },
    {
      accessorKey: "refundMethod",
      header: () => (
        <div className="text-center">
          {languageData["RebateTables.Templates.Column.RefundMethod"]}
        </div>
      ),
      cell: (props: any) => (
        <SetupCell {...props} languageData={languageData} />
      ),
    },
    {
      accessorKey: "fixedFeeValue",
      header: () => (
        <div className="text-center">
          {languageData["RebateTables.Templates.Column.FixedFee"]}
        </div>
      ),
      cell: (props: any) => <Fixedfee {...props} />,
    },
    {
      accessorKey: "variableFee",
      header: () => (
        <div className="text-center">
          {languageData["RebateTables.Templates.Column.VariableFee"]}
        </div>
      ),
      cell: (props: any) => <Variablefee {...props} />,
    },
    {
      accessorKey: "percentFeeValue",
      header: () => (
        <div className="text-center">
          %{languageData["RebateTables.Templates.Column.Percent"]}
        </div>
      ),
      cell: (props: any) => <PercentCell {...props} />,
    },
    {
      accessorKey: "actions",
      enableHiding: false,
      cell: ({ row, table }: any) => (
        <Button
          onClick={() => {
            table.options.meta?.removeRow(
              row.index,
              languageData["RebateTables.Templates.Column.Actions"],
              null,
            );
          }}
          variant="ghost"
        >
          <Trash2Icon className="h-4 w-4 text-red-500" />
        </Button>
      ),
    },
  ];
};

export default function Rebate({
  type = "Create",
  languageData,
  initialFeesData = [],
  initialSetupData = [],
  details,
  onSubmit,
}: {
  type?: "Create" | "Edit";
  languageData: ContractServiceResource;
  initialFeesData: any[];
  initialSetupData: any[];
  details?: RebateTableHeaderDto;
  onSubmit: (data: unknown) => void;
}) {
  const formSchema = createZodObject(RebateTableHeaderUpdateSchema, [
    "name",
    "calculateNetCommissionInsteadOfRefund",
  ]);
  const [autoFormData, setAutoFormData] = useState<Record<string, any>>({});
  const [feesData, setFeesData] = useState<any[]>(initialFeesData);
  const [setupData, setSetupData] = useState<any[]>(initialSetupData);
  const handleFormChange = (newFormData: any): void => {
    setAutoFormData(newFormData);
  };

  const handleSubmit = () => {
    const filteredFeesData = feesData.filter((row) => !isRowEmpty(row));
    const filteredSetupData = setupData.filter((row) => !isRowEmpty(row));

    const payload: Record<string, any | any[]> = {
      autoFormData,
      feesData: filteredFeesData,
      setupData: filteredSetupData,
    };
    onSubmit(payload);
  };

  const isRowEmpty = (row: any): boolean => {
    return Object.values(row).every((value) => value === "" || value === null);
  };

  const feesHeaders = { name: "", amount: "" };

  const setupHeaders = {
    refundmethod: "",
    fixedfee: "",
    variablefee: "",
    percent: "",
  };

  return (
    <div className="flex h-full w-full flex-row ">
      <Card className="m-0 w-full overflow-auto border-0 bg-transparent pb-16 shadow-none">
        <CardHeader className="flex flex-row items-center gap-2 text-2xl font-bold">
          <EditIcon className="w-6 text-slate-600" />
          {type === "Edit"
            ? languageData["RebateTables.Templates.Edit.TemplateInformation"]
            : languageData["RebateTables.Templates.Create.TemplateInformation"]}
        </CardHeader>
        <CardContent>
          <div className="px-9 [&>div>form>div]:space-y-4">
            <AutoForm
              fieldConfig={{
                withoutBorder: { fieldType: "switch" },
                calculateNetCommissionInsteadOfRefund: {
                  fieldType: "switch",
                },
              }}
              formSchema={formSchema}
              onParsedValuesChange={handleFormChange}
              values={details}
            />
          </div>

          <div className="mt-4 p-4">
            <div className="relative flex items-center">
              <span className="text-lg font-medium">
                {type === "Edit"
                  ? languageData["RebateTables.Templates.Edit.ProcessingFees"]
                  : languageData[
                      "RebateTables.Templates.Create.ProcessingFees"
                    ]}
              </span>
              <div className="ml-4 flex-grow border-t border-gray-300" />
            </div>
            <div className="overflow-auto">
              <DataTable
                Headertable={feesHeaders}
                columnsData={{
                  type: "Custom",
                  data: { columns: feescolumns({ languageData }) },
                }}
                data={feesData}
                editable
                onDataUpdate={(data) => {
                  setFeesData(data);
                }}
                showView={false}
              />
            </div>
          </div>

          <div className="mt-4 p-4">
            <div className="relative flex items-center">
              <span className="text-lg font-medium">
                {type === "Edit"
                  ? languageData["RebateTables.Templates.Edit.RebateSetup"]
                  : languageData["RebateTables.Templates.Create.RebateSetup"]}
              </span>
              <div className="ml-4 flex-grow border-t border-gray-300" />
            </div>
            <div className="overflow-auto">
              <DataTable
                Headertable={setupHeaders}
                columnsData={{
                  type: "Custom",
                  data: {
                    columns: setupcolumns({ languageData }),
                  },
                }}
                data={setupData}
                editable
                onDataUpdate={(data) => {
                  setSetupData(data);
                }}
                showView={false}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-5 px-9">
            {/* <Button className=" w-40 ">              {type === "Edit"
                ? languageData["RebateTables.Templates.Edit.Cancel"]
                : languageData["RebateTables.Templates.Create.Cancel"]}</Button> */}
            <Button className=" w-40 " onClick={handleSubmit}>
              {type === "Edit"
                ? languageData["RebateTables.Templates.Edit.Save"]
                : languageData["RebateTables.Templates.Create.Save"]}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
