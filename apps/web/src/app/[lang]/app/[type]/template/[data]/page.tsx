"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AutoForm from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { z } from "zod";
import Button from "@repo/ayasofyazilim-ui/molecules/button";
import type { ColumnDef } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { TrashIcon, Trash2Icon, EditIcon } from "lucide-react";

const formSchema = z.object({
  Name: z.string(),
  CalculateNetCommissionInsteadOfRebate: z.boolean().optional(),
});

const initialFeesData: any[] = [];
const initialSetupData: any[] = [];

const NameCell: React.FC<any> = ({
  getValue,
  row: { index },
  column: { id },
  table,
}) => {
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
};

const AmountCell: React.FC<any> = ({
  getValue,
  row: { index },
  column: { id },
  table,
}) => {
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
      onBlur={onBlur}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      type="number"
      value={value as number}
    />
  );
};

const SetupCell: React.FC<any> = ({
  getValue,
  row: { index },
  column: { id },
  table,
}) => {
  const initialValue = getValue() as string | undefined;
  const [value, setValue] = useState<string | undefined>(initialValue);

  const onChange = (newValue: string): void => {
    setValue(newValue);
    table.options.meta?.updateData(index, id, newValue);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-full text-center">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">All</SelectItem>
        <SelectItem value="Cash">Cash</SelectItem>
        <SelectItem value="Credit or Debit Card">
          Credit or Debit Card
        </SelectItem>
        <SelectItem value="Alipay">Alipay</SelectItem>
        <SelectItem value="WeChat">WeChat</SelectItem>
        <SelectItem value="Cash via partner">Cash via partner</SelectItem>
        <SelectItem value="Refund later">Refund later</SelectItem>
      </SelectContent>
    </Select>
  );
};

const PercentCell: React.FC<any> = ({
  getValue,
  row: { index },
  column: { id },
  table,
}) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const onBlur = (): void => {
    table.options.meta?.updateData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Input
      onBlur={onBlur}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      type="number"
      value={value as string}
    />
  );
};

const feescolumns: ColumnDef<Record<string, any>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(Boolean(value));
        }}
      />
    ),
    cell: ({ row }) => (
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
    header: () => <div className="text-center">Name</div>,
    cell: (props) => <NameCell {...props} />,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-center">Amount</div>,
    cell: (props) => <AmountCell {...props} />,
  },
  {
    accessorKey: "actions",
    enableHiding: false,
    cell: () => (
      <Button variant="ghost">
        <TrashIcon className="w-4 h-4 text-red-500" />
      </Button>
    ),
  },
];

const setupcolumns: ColumnDef<Record<string, any>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(Boolean(value));
        }}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onCheckedChange={row.getToggleSelectedHandler()}
      />
    ),
  },
  {
    accessorKey: "refundmethod",
    header: () => <div className="text-center">Refund method</div>,
    cell: (props) => <SetupCell {...props} />,
  },
  {
    accessorKey: "fixedfee",
    header: () => <div className="text-center">Fixed fee</div>,
    cell: (props) => <AmountCell {...props} />,
  },
  {
    accessorKey: "variablefee",
    header: () => <div className="text-center">Variable fee</div>,
    cell: (props) => <SetupCell {...props} />,
  },
  {
    accessorKey: "percent",
    header: () => <div className="text-center">% Percent</div>,
    cell: (props) => <PercentCell {...props} />,
  },
  {
    accessorKey: "actions",
    enableHiding: false,
    cell: () => (
      <Button variant="ghost">
        <Trash2Icon className="w-4 h-4 text-red-500" />
      </Button>
    ),
  },
];

function App(): JSX.Element {
  const [autoFormData, setAutoFormData] = useState<Record<string, any>>({});
  const [feesData] = useState(initialFeesData);
  const [setupData] = useState(initialSetupData);

  const handleFormChange = (newFormData: any): void => {
    setAutoFormData(newFormData);
  };

  const handleSubmit = (): void => {
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

  const isRowEmpty = (row: any): boolean => {
    return Object.values(row).every((value) => value === "" || value === null);
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
              <DataTable
                columnsData={{
                  type: "Custom",
                  data: feescolumns,
                }}
                data={feesData}
                editable
                showView={false}
              />
            </div>
          </div>

          <div className="p-4 mt-4">
            <div className="relative flex items-center">
              <span className="text-lg font-medium">Rebate set up</span>
              <div className="flex-grow border-t border-gray-300 ml-4" />
            </div>
            <div className="overflow-auto">
              <DataTable
                columnsData={{
                  type: "Custom",
                  data: setupcolumns,
                }}
                data={setupData}
                editable
                showView={false}
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
