"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
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
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { addNewTranslationServer } from "./action";

interface IDataTableDemo {
  lang: string;
  resources: Record<
    string,
    {
      texts?: Record<string, string> | null | undefined;
      baseResources?: string[] | null | undefined;
    }
  >;
  defaultResources: Record<
    string,
    {
      texts?: Record<string, string> | null | undefined;
      baseResources?: string[] | null | undefined;
    }
  >;
}

export interface Language {
  key: string;
  baseValue: string;
  value: string;
  lang: string;
  resources: string;
}

export const columns: ColumnDef<Language>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(Boolean(value));
        }}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(Boolean(value));
        }}
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
    header: () => {
      return <div className="capitalize">Key</div>;
    },
    cell: ({ row }) => <div>{row.getValue("key")}</div>,
  },
  {
    accessorKey: "baseValue",
    header: () => {
      return <div className="capitalize">Base Value</div>;
    },
    cell: ({ row }) => <div>{row.getValue("baseValue")}</div>,
  },
  {
    accessorKey: "value",
    header: () => <div className="capitalize">Value</div>,
    cell: ({ row }) => {
      return <div className=" font-medium">{row.getValue("value")}</div>;
    },
  },
];

export function DataTableDemo({
  lang,
  resources,
  defaultResources,
}: IDataTableDemo) {
  const router = useRouter();
  const [activeResource, setActiveResource] = useState(
    Object.keys(resources)[0],
  );
  const data = useMemo<Language[]>(() => {
    const _data: Language[] = [];
    Object.keys(resources[activeResource].texts || {}).map((i) => {
      const _temp = {
        key: i,
        value: resources[activeResource].texts?.[i] || "",
        baseValue: defaultResources[activeResource].texts?.[i] || "",
        lang,
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
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  async function addNewTranslationJSON() {
    setIsLoading(true);
    const _data = JSON.parse(newTranslation.value);
    const baseData = JSON.parse(newTranslation.baseValue);
    const keys = Object.keys(_data);
    for (let i = 0; i < keys.length; i++) {
      if (newTranslation.unirefund) {
        await addNewTranslationServer(
          activeResource,
          "en",
          keys[i],
          baseData[keys[i]],
          "unirefund",
        );
        await addNewTranslationServer(
          activeResource,
          lang,
          keys[i],
          _data[keys[i]],
          "unirefund",
        );
      }
      if (newTranslation.upwithcrowd) {
        await addNewTranslationServer(
          activeResource,
          "en",
          keys[i],
          baseData[keys[i]],
          "upwithcrowd",
        );
        await addNewTranslationServer(
          activeResource,
          lang,
          keys[i],
          _data[keys[i]],
          "upwithcrowd",
        );
      }
    }
    setIsLoading(false);
    router.refresh();
  }
  async function addNewTranslation() {
    setIsLoading(true);

    if (newTranslation.unirefund) {
      await addNewTranslationServer(
        activeResource,
        "en",
        newTranslation.key,
        newTranslation.baseValue,
        "unirefund",
      );
      await addNewTranslationServer(
        activeResource,
        lang,
        newTranslation.key,
        newTranslation.value,
        "unirefund",
      );
    }
    if (newTranslation.upwithcrowd) {
      await addNewTranslationServer(
        activeResource,
        "en",
        newTranslation.key,
        newTranslation.baseValue,
        "upwithcrowd",
      );
      await addNewTranslationServer(
        activeResource,
        lang,
        newTranslation.key,
        newTranslation.value,
        "upwithcrowd",
      );
      router.refresh();
      setNewTranslation({
        key: "",
        value: "",
        baseValue: "",
        upwithcrowd: false,
        unirefund: false,
      });
      setIsLoading(false);
    }
  }
  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-2">
        <Select onValueChange={setActiveResource} value={activeResource}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(resources)
              .sort((a, b) => a.localeCompare(b))
              .map((i) => (
                <SelectItem key={i} value={i}>
                  {i}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <Input
          className="max-w-sm"
          onChange={(event) =>
            table.getColumn("key")?.setFilterValue(event.target.value)
          }
          placeholder="Filter key..."
          value={table.getColumn("key")?.getFilterValue() as string}
        />
        <div />

        <Dialog>
          <DialogTrigger asChild>
            <CustomButton className="ml-auto" variant="outline">
              Yeni Çeviri
            </CustomButton>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Yeni Çeviri</DialogTitle>
              <DialogDescription>
                Çevirisini eklemek istediğiniz çeviriyi girin.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div>
                <Label className="text-right" htmlFor="translation-key">
                  Resource
                </Label>
                <Input
                  className="col-span-3"
                  disabled
                  id="translation-key"
                  readOnly
                  value={activeResource}
                />
              </div>
              <div>
                <Label className="text-right" htmlFor="translation-key">
                  Key
                </Label>
                <Input
                  className="col-span-3"
                  id="translation-key"
                  onChange={(e) => {
                    setNewTranslation({
                      ...newTranslation,
                      key: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <Label className="text-right" htmlFor="translation-en">
                  English Translation
                </Label>
                <Input
                  className="col-span-3"
                  id="translation-en"
                  onChange={(e) => {
                    setNewTranslation({
                      ...newTranslation,
                      baseValue: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <Label className="text-right" htmlFor="translation-target">
                  Target Translation
                </Label>
                <Input
                  className="col-span-3"
                  id="translation-target"
                  onChange={(e) => {
                    setNewTranslation({
                      ...newTranslation,
                      value: e.target.value,
                    });
                  }}
                />
              </div>
              <Separator className="my-1" />
              <div className="flex items-center space-x-2">
                <Switch
                  checked={newTranslation.unirefund}
                  id="unirefund"
                  onCheckedChange={(e) => {
                    setNewTranslation({
                      ...newTranslation,
                      unirefund: e,
                    });
                  }}
                />
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="unirefund"
                >
                  Add to Unirefund
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={newTranslation.upwithcrowd}
                  id="upwithcrowd"
                  onCheckedChange={(e) => {
                    setNewTranslation({
                      ...newTranslation,
                      upwithcrowd: e,
                    });
                  }}
                />
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="upwithcrowd"
                >
                  Add to Upwithcrowd
                </label>
              </div>
            </div>
            <DialogFooter>
              <form action={async () => {}}>
                <DialogClose asChild>
                  <CustomButton
                    disabled={
                      !newTranslation.key ||
                      !newTranslation.baseValue ||
                      !newTranslation.value
                    }
                    isLoading={isLoading}
                    onClick={addNewTranslation}
                    type="submit"
                  >
                    Kaydet
                  </CustomButton>
                </DialogClose>
              </form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <CustomButton variant="outline">JSON'dan Çeviri Ekle</CustomButton>
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
                <Label className="text-right" htmlFor="translation-key">
                  Resource
                </Label>
                <Input
                  className="col-span-3"
                  disabled
                  id="translation-key"
                  readOnly
                  value={activeResource}
                />
              </div>
              <div>
                <Label className="text-right" htmlFor="translation-key">
                  Key
                </Label>
                <Input
                  className="col-span-3"
                  id="translation-key"
                  onChange={(e) => {
                    setNewTranslation({
                      ...newTranslation,
                      key: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <Label className="text-right" htmlFor="translation-en">
                  English Translation
                </Label>
                <Input
                  className="col-span-3"
                  id="translation-en"
                  onChange={(e) => {
                    setNewTranslation({
                      ...newTranslation,
                      baseValue: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <Label className="text-right" htmlFor="translation-target">
                  Target Translation
                </Label>
                <Input
                  className="col-span-3"
                  id="translation-target"
                  onChange={(e) => {
                    setNewTranslation({
                      ...newTranslation,
                      value: e.target.value,
                    });
                  }}
                />
              </div>
              <Separator className="my-1" />
              <div className="flex items-center space-x-2">
                <Switch
                  checked={newTranslation.unirefund}
                  id="unirefund"
                  onCheckedChange={(e) => {
                    setNewTranslation({
                      ...newTranslation,
                      unirefund: e,
                    });
                  }}
                />
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="unirefund"
                >
                  Add to Unirefund
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={newTranslation.upwithcrowd}
                  id="upwithcrowd"
                  onCheckedChange={(e) => {
                    setNewTranslation({
                      ...newTranslation,
                      upwithcrowd: e,
                    });
                  }}
                />
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="upwithcrowd"
                >
                  Add to Upwithcrowd
                </label>
              </div>
            </div>
            <DialogFooter>
              <form action={async () => {}}>
                <DialogClose asChild>
                  <CustomButton
                    disabled={
                      !newTranslation.key ||
                      !newTranslation.baseValue ||
                      !newTranslation.value
                    }
                    isLoading={isLoading}
                    onClick={addNewTranslationJSON}
                    type="submit"
                  >
                    Kaydet
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
                              header.getContext(),
                            )}
                      </>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  data-state={row.getIsSelected() && "selected"}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
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
            disabled={!table.getCanPreviousPage()}
            onClick={() => {
              table.previousPage();
            }}
            size="sm"
            variant="outline"
          >
            Previous
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            onClick={() => {
              table.nextPage();
            }}
            size="sm"
            variant="outline"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
