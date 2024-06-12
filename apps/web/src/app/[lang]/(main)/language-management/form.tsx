"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomButton from "@repo/ayasofyazilim-ui/molecules/button";
import { useMemo, useState } from "react";
import { addNewTranslationServer } from "./action";
import { useRouter } from "next/navigation";

export type Language = {
  key: string;
  baseValue: string;
  value: string;
  lang: string;
  resources: string;
};

export const columns: ColumnDef<Language>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "resources",
    header: "Resources",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("resources")}</div>
    ),
  },
  {
    accessorKey: "key",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Key
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("key")}</div>,
  },
  {
    accessorKey: "baseValue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Base Value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("baseValue")}</div>
    ),
  },
  {
    accessorKey: "value",
    header: () => <div className="text-right">Value</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue("value")}</div>
      );
    },
  },
];

export function DataTableDemo({
  lang,
  resources,
  defaultResources,
}: {
  lang: string;
  resources: {
    [key: string]: {
      texts?:
        | {
            [key: string]: string;
          }
        | null
        | undefined;
      baseResources?: string[] | null | undefined;
    };
  };
  defaultResources: {
    [key: string]: {
      texts?:
        | {
            [key: string]: string;
          }
        | null
        | undefined;
      baseResources?: string[] | null | undefined;
    };
  };
}) {
  const router = useRouter();
  const [activeResource, setActiveResource] = useState("AbpLocalization");
  const data = useMemo<Language[]>(() => {
    const _data: Language[] = [];
    Object.keys(resources[activeResource].texts || {}).map((i) => {
      const _temp = {
        key: i,
        value: resources?.[activeResource]?.texts?.[i] || "",
        baseValue: defaultResources?.[activeResource]?.texts?.[i] || "",
        lang: lang,
        resources: activeResource,
      };
      _data.push(_temp);
    });
    return _data;
  }, [activeResource, resources, defaultResources, lang]);

  const [newTranslation, setNewTranslation] = useState({
    key: "",
    value: "",
    baseValue: "",
    upwithcrowd: false,
    unirefund: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  async function addNewTranslation() {
    setIsLoading(true);

    if (newTranslation.unirefund) {
      await addNewTranslationServer(
        activeResource,
        "en",
        newTranslation.key,
        newTranslation.baseValue,
        "unirefund"
      );
      await addNewTranslationServer(
        activeResource,
        lang,
        newTranslation.key,
        newTranslation.value,
        "unirefund"
      );
    }
    if (newTranslation.upwithcrowd) {
      await addNewTranslationServer(
        activeResource,
        "en",
        newTranslation.key,
        newTranslation.baseValue,
        "upwithcrowd"
      );
      await addNewTranslationServer(
        activeResource,
        lang,
        newTranslation.key,
        newTranslation.value,
        "upwithcrowd"
      );
      router.refresh();
    }
  }
  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-2">
        <Select value={activeResource} onValueChange={setActiveResource}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(resources).map((i) => (
              <SelectItem key={i} value={i}>
                {i}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="Filter key..."
          value={(table.getColumn("key")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("key")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div></div>

        <Dialog>
          <DialogTrigger asChild>
            <CustomButton variant="outline" className="ml-auto">
              New Translation
            </CustomButton>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New Translation</DialogTitle>
              <DialogDescription>
                Enter the translation you want to add.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="translation-key" className="text-right">
                  Resource
                </Label>
                <Input
                  id="translation-key"
                  className="col-span-3"
                  value={activeResource}
                  readOnly
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="translation-key" className="text-right">
                  Key
                </Label>
                <Input
                  id="translation-key"
                  className="col-span-3"
                  onChange={(e) =>
                    setNewTranslation({
                      ...newTranslation,
                      key: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="translation-en" className="text-right">
                  English Translation
                </Label>
                <Input
                  id="translation-en"
                  className="col-span-3"
                  onChange={(e) =>
                    setNewTranslation({
                      ...newTranslation,
                      baseValue: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="translation-target" className="text-right">
                  Target Translation
                </Label>
                <Input
                  id="translation-target"
                  className="col-span-3"
                  onChange={(e) =>
                    setNewTranslation({
                      ...newTranslation,
                      value: e.target.value,
                    })
                  }
                />
              </div>
              <Separator className="my-1" />
              <div className="flex items-center space-x-2">
                <Switch
                  id="unirefund"
                  checked={newTranslation.unirefund}
                  onCheckedChange={(e) =>
                    setNewTranslation({
                      ...newTranslation,
                      unirefund: e,
                    })
                  }
                />
                <label
                  htmlFor="unirefund"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Add to Unirefund
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="upwithcrowd"
                  checked={newTranslation.upwithcrowd}
                  onCheckedChange={(e) =>
                    setNewTranslation({
                      ...newTranslation,
                      upwithcrowd: e,
                    })
                  }
                />
                <label
                  htmlFor="upwithcrowd"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Add to Upwithcrowd
                </label>
              </div>
            </div>
            <DialogFooter>
              <form action={async () => {}}>
                <DialogClose asChild>
                  <CustomButton
                    type="submit"
                    onClick={addNewTranslation}
                    disabled={
                      !newTranslation.key ||
                      !newTranslation.baseValue ||
                      !newTranslation.value
                    }
                    isLoading={isLoading}
                  >
                    Save changes
                  </CustomButton>
                </DialogClose>
              </form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      <>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
