"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Trash2Icon, TrashIcon } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

type RebateRecord = Record<string, string | number | Date | undefined>;

interface ColumnMeta {
  inputType?: string;
}

interface RebateTableProps {
  initialData: RebateRecord[];
  columns: ColumnDef<RebateRecord, any>[];
  selectOptions?: Record<string, string[]>;
  onTableDataChange: (_data: RebateRecord[]) => void;
}

interface ActionsCellProps {
  rowIndex: number;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onRemove: () => void;
  onCancel: () => void;
}

interface FooterCellProps {
  tableInstance: any;
  removeSelectedRows: () => void;
  addRow: () => void;
}

const ActionsCell = ({
  isEditing,
  onEdit,
  onSave,
  onRemove,
  onCancel,
}: ActionsCellProps) => (
  <div className="flex items-center justify-center">
    {isEditing ? (
      <>
        <Button
          onClick={onCancel}
          variant={"ghost"}
          className="rounded-none w-full h-14 border-r border-r-slate-200 text-red-500"
        >
          ⚊
        </Button>
        <Button
          onClick={onSave}
          variant={"ghost"}
          className="w-full h-14 rounded-none text-green-500"
        >
          ✔
        </Button>
      </>
    ) : (
      <>
        <Button
          className="rounded-none w-full h-10 border-r border-r-slate-200 text-green-500"
          onClick={onEdit}
          variant={"ghost"}
        >
          ✐
        </Button>
        <Button
          onClick={onRemove}
          variant={"ghost"}
          className="w-full h-10 rounded-none text-red-500"
        >
          <TrashIcon className="w-4 h-4" />
        </Button>
      </>
    )}
  </div>
);

const FooterCell = ({
  tableInstance,
  removeSelectedRows,
  addRow,
}: FooterCellProps) => {
  const selectedRows = tableInstance.getSelectedRowModel().rows;

  return (
    <div className="footer-buttons flex justify-end gap-5 py-3 px-3">
      {selectedRows.length > 0 && (
        <Button
          className="remove-button w-44 h-10 flex items-center justify-center"
          onClick={removeSelectedRows}
          variant={"outline"}
        >
          <>
            Remove Selected
            <Trash2Icon className="ml-2 h-4 w-4" />
          </>
        </Button>
      )}
      <Button
        className="add-button w-44 h-10 flex items-center justify-center"
        onClick={addRow}
        variant={"outline"}
      >
        Add New +
      </Button>
    </div>
  );
};

function createTableColumns(
  columns: ColumnDef<RebateRecord, any>[],
  editedRows: Record<number, boolean>,
  setEditedRows: React.Dispatch<React.SetStateAction<Record<number, boolean>>>,
  saveEdit: (_rowIndex: number) => void,
  removeRow: (_rowIndex: number) => void,
  startEdit: (_rowIndex: number) => void,
  cancelEdit: (_rowIndex: number) => void
): ColumnDef<RebateRecord, any>[] {
  return [
    ...columns,
    {
      header: "Actions",
      cell: ({ row }) => (
        <ActionsCell
          rowIndex={row.index}
          isEditing={editedRows[row.index]}
          onEdit={() => {
            startEdit(row.index);
          }}
          onSave={() => {
            saveEdit(row.index);
          }}
          onRemove={() => {
            removeRow(row.index);
          }}
          onCancel={() => {
            cancelEdit(row.index);
          }}
        />
      ),
    },
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
  ];
}

function RebateTable({
  initialData,
  columns,
  selectOptions = {},
  onTableDataChange,
}: RebateTableProps) {
  const [data, setData] = useState<RebateRecord[]>(initialData);
  const [editedRows, setEditedRows] = useState<Record<number, boolean>>({});
  const [originalData, setOriginalData] = useState<
    Record<number, RebateRecord>
  >({});

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    onTableDataChange(data);
  }, [data, onTableDataChange]);

  const addRow = useCallback(() => {
    const newRow = columns.reduce<RebateRecord>((acc, col) => {
      acc[(col as any).accessorKey as string] = "";
      return acc;
    }, {});

    setData((old) => [...old, newRow]);
    setEditedRows((prev) => ({ ...prev, [data.length]: true }));
  }, [columns, data.length]);

  const removeRow = useCallback((rowIndex: number) => {
    setData((old) => old.filter((_row, index) => index !== rowIndex));
    setEditedRows((prev) => {
      const { [rowIndex]: _, ...newEditedRows } = prev;
      return newEditedRows;
    });
    table.resetRowSelection();
  }, []);

  const removeSelectedRows = useCallback(() => {
    const selectedRows = table
      .getSelectedRowModel()
      .rows.map((row: any) => row.index);
    setData((old) =>
      old.filter((_row, index) => !selectedRows.includes(index))
    );
    setEditedRows((prev) => {
      const newEditedRows = selectedRows.reduce((acc, rowIndex) => {
        const { [rowIndex]: _, ...rest } = acc;
        return rest;
      }, prev);
      return newEditedRows;
    });
    table.resetRowSelection();
  }, [data]);

  const saveEdit = useCallback((rowIndex: number) => {
    setEditedRows((prev) => ({ ...prev, [rowIndex]: false }));
    setOriginalData((prev) => {
      const { [rowIndex]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const startEdit = useCallback(
    (rowIndex: number) => {
      setOriginalData((prev) => ({
        ...prev,
        [rowIndex]: { ...data[rowIndex] },
      }));
      setEditedRows((prev) => ({ ...prev, [rowIndex]: true }));
    },
    [data]
  );

  const cancelEdit = useCallback(
    (rowIndex: number) => {
      setData((prevData) => {
        const newData = [...prevData];
        newData[rowIndex] = originalData[rowIndex];
        return newData;
      });
      setEditedRows((prev) => ({ ...prev, [rowIndex]: false }));
      setOriginalData((prev) => {
        const { [rowIndex]: _, ...rest } = prev;
        return rest;
      });
    },
    [originalData]
  );

  const renderCellContent = useCallback(
    (rowIndex: number, accessorKey: string, inputType?: string) => {
      const value = data[rowIndex][accessorKey] || "";

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setData((prevData) => {
          const newData = [...prevData];
          newData[rowIndex] = { ...newData[rowIndex], [accessorKey]: newValue };
          return newData;
        });
      };

      switch (inputType) {
        case "select":
          return (
            <Select
              value={value as string}
              onValueChange={(newValue) => {
                setData((prevData) => {
                  const newData = [...prevData];
                  newData[rowIndex] = {
                    ...newData[rowIndex],
                    [accessorKey]: newValue,
                  };
                  return newData;
                });
              }}
            >
              <SelectTrigger>{value as string}</SelectTrigger>
              <SelectContent>
                {selectOptions[accessorKey].map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        case "date":
          return (
            <DatePicker
              setDate={(date) => {
                setData((prevData) => {
                  const newData = [...prevData];
                  newData[rowIndex] = {
                    ...newData[rowIndex],
                    [accessorKey]: date,
                  };
                  return newData;
                });
              }}
              date={value as Date}
            />
          );
        default:
          return (
            <Input
              type={inputType}
              name={accessorKey}
              value={value as string}
              onChange={handleInputChange}
              className="border border-gray-300 rounded p-1"
              style={{ width: "100%" }}
            />
          );
      }
    },
    [data, selectOptions]
  );

  const tableColumns = useMemo(
    () =>
      createTableColumns(
        columns,
        editedRows,
        setEditedRows,
        saveEdit,
        removeRow,
        startEdit,
        cancelEdit
      ),
    [columns, editedRows, saveEdit, removeRow, startEdit, cancelEdit]
  );

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
  });

  return (
    <article className="table-container p-4">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`border border-gray-300 py-2 text-sm bg-gray-100 text-center ${
                    header.id === "select" ? "w-12" : ""
                  }`}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                const isEditing = editedRows[row.index];
                const accessorKey = (cell.column.columnDef as any).accessorKey;
                const column = columns.find(
                  (col) => (col as any).accessorKey === accessorKey
                );

                const inputType = column
                  ? (column.meta as ColumnMeta).inputType
                  : undefined;

                return (
                  <td
                    key={cell.id}
                    className={`text-center border border-gray-200 ${
                      cell.id.includes("Actions") ? "w-24 p-0" : "p-2"
                    }`}
                    style={{
                      maxWidth: "150px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {isEditing && accessorKey
                      ? renderCellContent(row.index, accessorKey, inputType)
                      : flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th
              colSpan={tableColumns.length}
              align="right"
              className="border border-gray-200 p-3 text-right"
            >
              <FooterCell
                tableInstance={table}
                removeSelectedRows={removeSelectedRows}
                addRow={addRow}
              />
            </th>
          </tr>
        </tfoot>
      </table>
    </article>
  );
}

export default RebateTable;
