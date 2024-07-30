"use client";
import Dashboard from "@repo/ayasofyazilim-ui/templates/dashboard";
import { useEffect, useState } from "react";
import type {
  tableAction,
  columnsType,
} from "@repo/ayasofyazilim-ui/molecules/tables";
import { toast } from "@/components/ui/sonner";
import type { DependencyType } from "node_modules/@repo/ayasofyazilim-ui/src/organisms/auto-form/types";
import { createZodObject, getBaseLink } from "src/utils";
import {
  $createCustoms,
  $createMerchants,
  $createRefund_points,
  $createTax_free,
  $editCustoms,
  $editMerchants,
  $editRefund_points,
  $editTax_free,
  $showCustoms,
  $showMerchants,
  $showRefund_points,
  $showTax_free,
} from "./schemas.gen";

async function controlledFetch(
  url: string,
  options: RequestInit,
  onSuccess: (_data?: any) => void,
  successMessage = "Successful",
  showToast = true,
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
    toast.error("Something went wrong 3 ");
  }
}

interface formModifier {
  formPositions?: string[];
  excludeList?: string[];
  schema: any;
  convertors?: Record<string, any>;
  dependencies?: {
    sourceField: string;
    type: DependencyType;
    targetField: string;
    when: (_value: any) => boolean;
  }[];
}

interface tableData {
  createFormSchema: formModifier;
  editFormSchema: formModifier;
  tableSchema: formModifier;
  filterBy: string;
}

const dataConfig: Record<string, tableData> = {
  merchants: {
    filterBy: "name",
    createFormSchema: {
      formPositions: [
        "name",
        "taxpayerId",
        "legalStatusCode",
        "customerNumber",
        "areaCode",
        "localNumber",
        "ituCountryCode",
        "primaryFlag",
        "telephoneTypeCode",
        "addressLine",
        "city",
        "terriority",
        "postalCode",
        "country",
        "fullAddress",
        "addressPrimaryFlag",
        "addressTypeCode",
        "emailAddress",
        "emailPrimaryFlag",
        "emailTypeCode",
        "productName",
        "vatRate",
        "productCode",
        "isActive",
      ],

      schema: $createMerchants,
    },
    editFormSchema: {
      formPositions: [
        "name",
        "taxpayerId",
        "legalStatusCode",
        "customerNumber",
        "areaCode",
        "localNumber",
        "ituCountryCode",
        "primaryFlag",
        "telephoneTypeCode",
        "addressLine",
        "city",
        "terriority",
        "postalCode",
        "country",
        "fullAddress",
        "addressPrimaryFlag",
        "addressTypeCode",
        "emailAddress",
        "emailPrimaryFlag",
        "emailTypeCode",
        "productName",
        "vatRate",
        "productCode",
        "isActive",
      ],
      schema: $editMerchants,
    },
    tableSchema: {
      excludeList: [
        "id",
        "creationTime",
        "creatorId",
        "lastModificationTime",
        "lastModifierId",
        "isDeleted",
        "deleterId",
        "deletionTime",
        "parentCompanyId",
      ],
      formPositions: [
        "name",
        "taxpayerId",
        "legalStatusCode",
        "customerNumber",
        "areaCode",
        "localNumber",
        "ituCountryCode",
        "primaryFlag",
        "telephoneTypeCode",
        "addressLine",
        "city",
        "terriority",
        "postalCode",
        "country",
        "fullAddress",
        "addressPrimaryFlag",
        "addressTypeCode",
        "emailAddress",
        "emailPrimaryFlag",
        "emailTypeCode",
        "productName",
        "vatRate",
        "productCode",
        "isActive",
      ],
      schema: $showMerchants,
    },
  },

  refund_points: {
    createFormSchema: {
      formPositions: ["Company", "CustomerNumber", "ProductGroups", "Address"],
      schema: $createRefund_points,
    },
    editFormSchema: {
      formPositions: ["Company", "CustomerNumber", "ProductGroups", "Address"],
      schema: $editRefund_points,
    },
    tableSchema: {
      formPositions: ["Company", "CustomerNumber", "ProductGroups", "Address"],
      schema: $showRefund_points,
    },
    filterBy: "Company",
  },

  customs: {
    createFormSchema: {
      formPositions: ["Company", "CustomerNumber", "ProductGroups", "Address"],
      schema: $createCustoms,
    },
    editFormSchema: {
      formPositions: ["Company", "CustomerNumber", "ProductGroups", "Address"],
      schema: $editCustoms,
    },
    tableSchema: {
      formPositions: ["Company", "CustomerNumber", "ProductGroups", "Address"],
      schema: $showCustoms,
    },
    filterBy: "Company",
  },

  tax_free: {
    filterBy: "Company",
    createFormSchema: {
      formPositions: ["Company", "CustomerNumber", "ProductGroups", "Address"],
      schema: $createTax_free,
    },
    editFormSchema: {
      formPositions: ["Company", "CustomerNumber", "ProductGroups", "Address"],
      schema: $editTax_free,
    },
    tableSchema: {
      schema: $showTax_free,
      excludeList: ["Company", "CustomerNumber", "ProductGroups", "Address"],
    },
  },

  tax_offices: {
    filterBy: "Company",
    createFormSchema: {
      formPositions: ["Company", "CustomerNumber", "ProductGroups", "Address"],
      schema: $createTax_free,
    },
    editFormSchema: {
      formPositions: ["Company", "CustomerNumber", "ProductGroups", "Address"],
      schema: $editTax_free,
    },
    tableSchema: {
      schema: $showTax_free,
      excludeList: ["id", "concurrencyStamp", "editionId"],
    },
  },
};

function convertEnumField(
  value: string | number,
  enumArray: string[],
): string | number {
  if (typeof value === "number") {
    return enumArray[value];
  }
  return enumArray.indexOf(value);
}

export default function Page({
  params,
}: {
  params: { data: string };
}): JSX.Element {
  const [roles, setRoles] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchLink = getBaseLink(`/api/company/${params.data}`);

  function getRoles() {
    function onData(data: any) {
      let returnData = data;
      if (!data?.items) {
        returnData = {
          totalCount: data.length,
          items: data,
        };
      }
      const dataConvertors = dataConfig[params.data].tableSchema.convertors;
      let transformedData = returnData.items;
      if (dataConvertors) {
        transformedData = returnData.items.map((item: any) => {
          const returnObject = { ...item };
          Object.entries(dataConvertors).forEach(([key, value]) => {
            returnObject[key] = convertEnumField(returnObject[key], value);
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
      false,
    ).catch();
  }
  const createFormSchema = dataConfig[params.data].createFormSchema;
  const action: tableAction = {
    cta: `New ${params.data}`,
    description: `Create a new ${params.data}`,
    autoFormArgs: {
      formSchema: createZodObject(
        createFormSchema.schema,
        createFormSchema.formPositions || [],
        createFormSchema.convertors || {},
      ),
      dependencies: createFormSchema.dependencies,
      fieldConfig: { withoutBorder: true },
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
        "Added Successfully",
      );
    },
  };

  useEffect(() => {
    setIsLoading(true);
    getRoles();
  }, []);

  function parseFormValues(schema: formModifier, data: any) {
    const newSchema = createZodObject(
      schema.schema,
      schema.formPositions || [],
      schema.convertors || {},
    );
    if (!schema.convertors) return newSchema.parse(data);
    const transformedSchema = newSchema.transform((val) => {
      const returnObject = { ...val };
      if (!schema.convertors) return returnObject;
      Object.entries(schema.convertors).forEach(([key, value]) => {
        returnObject[key] = convertEnumField(returnObject[key], value);
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
      "Updated Successfully",
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
      "Deleted Successfully",
    );
  };

  function convertZod(schema: formModifier) {
    const newSchema = createZodObject(
      schema.schema,
      schema.formPositions || [],
      schema.convertors || {},
    );
    return newSchema;
  }
  const editFormSchema = dataConfig[params.data].editFormSchema;
  const editFormSchemaZod = convertZod(editFormSchema);

  const columnsData: columnsType = {
    type: "Auto",
    data: {
      callback: getRoles,
      autoFormArgs: {
        formSchema: editFormSchemaZod,
        dependencies: dataConfig[params.data].editFormSchema.dependencies,
        fieldConfig: { withoutBorder: true },
      },
      tableType: dataConfig[params.data].tableSchema.schema,
      excludeList: dataConfig[params.data].tableSchema.excludeList || [],
      onEdit: (data, row) => {
        onEdit(data, row, editFormSchema);
      },
      onDelete,
    },
  };

  return (
    <Dashboard
      action={action}
      cards={[]}
      columnsData={columnsData}
      data={roles?.items}
      filterBy={dataConfig[params.data].filterBy}
      isLoading={isLoading}
      withCards={false}
      withTable
    />
  );
}
