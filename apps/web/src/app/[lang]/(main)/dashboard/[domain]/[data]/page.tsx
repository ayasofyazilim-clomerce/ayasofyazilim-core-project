"use client";
import Dashboard from "@repo/ayasofyazilim-ui/templates/dashboard";
import { useEffect, useState } from "react";
import { createZodObject, getBaseLink } from "src/utils";
import {
  tableAction,
  columnsType,
} from "@repo/ayasofyazilim-ui/molecules/tables";
import { toast } from "@/components/ui/sonner";
import { dataConfig, formModifier, tableData } from "../../data";

async function controlledFetch(
  url: string,
  options: RequestInit,
  onSuccess: (data?: any) => void,
  successMessage: string = "Successful",
  showToast: boolean = true
) {
  try {
    const getData = await fetch(url, options);
    if (!getData.ok) {
      const body = await getData.json();
      toast.error(body.message);
    } else {
      const data = await getData.json();
      onSuccess(data);
      showToast && toast.success(successMessage);
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong 3 ");
  }
}

function convertEnumField(
  value: string | number,
  enumArray: {
    data: string[];
    type: "enum";
  }
): string | number {
  const data = enumArray.data;
  if (typeof value === "number") {
    return data[value];
  } else {
    return data.indexOf(value);
  }
}

interface ConvertorValue {
  covertTo?: string;
  data: any;
  get: string;
  post: string;
  type: "enum" | "async";
}

function convertAsyncField(value: any, ConvertorValue: ConvertorValue) {
  if (typeof ConvertorValue.data === "function") {
    return;
  }
  const returnValue = ConvertorValue.data.find((item: any) => {
    return item[ConvertorValue.get] === value;
  });

  if (returnValue) {
    return returnValue[ConvertorValue.post];
  }
}

export default function Page({
  params,
}: {
  params: { data: string; domain: string };
}): JSX.Element {
  console.log("dashboard/[domain]/[data] params", params);
  const [roles, setRoles] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchLink = getBaseLink("/api/admin/" + params.data);
  const [formData, setFormData] = useState<tableData>(
    dataConfig[params.domain][params.data]
  );

  async function processConvertors() {
    let tempData = { ...formData };
    const schemas = ["createFormSchema", "editFormSchema"] as const;

    for (const schema of schemas) {
      const dataConvertors = tempData[schema].convertors;
      if (dataConvertors) {
        for (const [key, value] of Object.entries(dataConvertors)) {
          if (value.type === "async" && typeof value.data === "function") {
            try {
              let tempValue = await value.data();
              if (tempData[schema].convertors) {
                tempData[schema].convertors[key].data = tempValue;
                tempData[schema].convertors[key].type = "async";
              }
            } catch (error) {
              console.error(`Error fetching data for ${key}:`, error);
            }
          }
        }
      }
    }
    setFormData(tempData);
  }

  function getRoles() {
    function onData(data: any) {
      let returnData = data;
      if (!data?.items) {
        returnData = {
          totalCount: data.length,
          items: data,
        };
      }
      const dataConvertors = formData.tableSchema.convertors;
      let transformedData = returnData.items;
      if (dataConvertors) {
        transformedData = returnData.items.map((item: any) => {
          const returnObject = { ...item };
          Object.entries(dataConvertors).forEach(([key, value]) => {
            if (value.type === "enum") {
              returnObject[key] = convertEnumField(returnObject[key], value);
            }
            if (value.type === "async") {
              returnObject[key] = returnObject[value.covertTo];
            }
          });
          return returnObject;
        });
      }
      setRoles({ ...returnData, items: transformedData });
      setIsLoading(false);
    }
    controlledFetch(
      fetchLink,
      {
        method: "GET",
      } as RequestInit,
      onData,
      "",
      false
    );
  }

  const createFormSchema = formData.createFormSchema;
  const action: tableAction = {
    cta: "New " + params.data,
    description: "Create a new " + params.data,
    autoFormArgs: {
      formSchema: createZodObject(
        createFormSchema.schema,
        createFormSchema.formPositions || [],
        createFormSchema.convertors || {}
      ),
      dependencies: createFormSchema.dependencies,
    },
    callback: async (e) => {
      const transformedData = parseFormValues(createFormSchema, e);
      await controlledFetch(
        fetchLink,
        {
          method: "POST",
          body: JSON.stringify(transformedData),
        },
        getRoles,
        "Added Successfully"
      );
    },
  };

  const tableHeaders = [
    {
      name: "name",
      isSortable: true,
    },
    {
      name: "isDefault",
    },
    {
      name: "isPublic",
    },
    {
      name: "userCount",
    },
  ];

  useEffect(() => {
    processConvertors();
    setIsLoading(true);
    getRoles();
  }, []);

  function parseFormValues(schema: formModifier, data: any) {
    const newSchema = createZodObject(
      schema.schema,
      schema.formPositions || [],
      schema.convertors || {}
    );
    if (!schema.convertors) return newSchema.parse(data);
    const transformedSchema = newSchema.transform((val) => {
      const returnObject = { ...val };
      if (!schema.convertors) return returnObject;
      Object.entries(schema.convertors).forEach(([key, value]) => {
        if (value.type === "enum") {
          returnObject[key] = convertEnumField(returnObject[key], value);
        } else if (value.type === "async") {
          returnObject[key] = convertAsyncField(returnObject[key], value);
        }
      });
      return returnObject;
    });
    const parsed = transformedSchema.parse(data);
    return parsed;
  }

  const onEdit = (data: any, row: any, editFormSchema: any) => {
    const parsedData = parseFormValues(editFormSchema, data);
    controlledFetch(
      fetchLink,
      {
        method: "PUT",
        body: JSON.stringify({
          id: row.id,
          requestBody: JSON.stringify(parsedData),
        }),
      },
      getRoles,
      "Updated Successfully"
    );
  };

  const onDelete = (e: any, row: any) => {
    controlledFetch(
      fetchLink,
      {
        method: "DELETE",
        body: JSON.stringify(row.id),
      },
      getRoles,
      "Deleted Successfully"
    );
  };

  function convertZod(schema: formModifier) {
    const newSchema = createZodObject(
      schema.schema,
      schema.formPositions || [],
      schema.convertors || {}
    );
    return newSchema;
  }
  const editFormSchema = formData.editFormSchema;
  const editFormSchemaZod = convertZod(editFormSchema);

  const columnsData: columnsType = {
    type: "Auto",
    data: {
      callback: getRoles,
      autoFormArgs: {
        formSchema: editFormSchemaZod,
        dependencies: formData.editFormSchema.dependencies,
        convertor: formData.tableSchema.convertors,
      },
      tableType: formData.tableSchema.schema,
      excludeList: formData.tableSchema.excludeList || [],
      onEdit: (data, row) => onEdit(data, row, editFormSchema),
      onDelete,
    },
  };

  return (
    <Dashboard
      withCards={false}
      withTable={true}
      isLoading={isLoading}
      filterBy={formData.filterBy}
      cards={[]}
      data={roles?.items}
      columnsData={columnsData}
      action={action}
    />
  );
}
