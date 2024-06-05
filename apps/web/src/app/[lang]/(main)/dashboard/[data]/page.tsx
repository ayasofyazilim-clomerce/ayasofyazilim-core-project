"use client";
import Dashboard from "@repo/ayasofyazilim-ui/templates/dashboard";
import {
  $Volo_Abp_Identity_IdentityRoleDto,
  $Volo_Abp_Identity_IdentityRoleCreateDto,
  $Volo_Abp_Identity_IdentityRoleUpdateDto,
  $Volo_Abp_Identity_IdentityUserUpdateDto,
} from "@ayasofyazilim/saas/IdentityService";
import { $Volo_Abp_Identity_IdentityUserCreateDto } from "@ayasofyazilim/saas/IdentityService";
import { useEffect, useState } from "react";
import { createZodObject, getBaseLink } from "src/utils";
import {
  tableAction,
  columnsType,
} from "@repo/ayasofyazilim-ui/molecules/tables";
import { toast } from "@/components/ui/sonner";
import { $Volo_Saas_Host_Dtos_EditionCreateDto, $Volo_Saas_Host_Dtos_EditionDto, $Volo_Saas_Host_Dtos_EditionUpdateDto, $Volo_Saas_Host_Dtos_SaasTenantUpdateDto } from "@ayasofyazilim/saas/SaasService";
import {
  $Volo_Saas_Host_Dtos_SaasTenantCreateDto,
  $Volo_Saas_Host_Dtos_SaasTenantDto,
} from "@ayasofyazilim/saas/SaasService";
import { z } from "zod";
import { $Volo_Abp_Identity_IdentityUserDto } from "@ayasofyazilim/saas/AccountService";

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

type formModifier = {
  formPositions?: string[];
  excludeList?: string[];
  schema: any;
  convertors?: Record<string, any>;
}

type tableData = {
  createFormSchema: formModifier,
  editFormSchema: formModifier,
  tableSchema: formModifier,
  filterBy: string,
}

const dataConfig: Record<string, tableData> = {
  role: {
    createFormSchema: {
      formPositions: ["name", "isDefault", "isPublic"],
      schema: $Volo_Abp_Identity_IdentityRoleCreateDto,
    },
    editFormSchema: {
      formPositions: ["name", "isDefault", "isPublic"],
      schema: $Volo_Abp_Identity_IdentityRoleUpdateDto,
    },
    tableSchema: {
      excludeList: ["id", "extraProperties", "concurrencyStamp"],
      schema: $Volo_Abp_Identity_IdentityRoleDto,
    },
    filterBy: "name",
  },
  user: {
    createFormSchema: {
      formPositions: ["email", "password", "userName"],
      schema: $Volo_Abp_Identity_IdentityUserCreateDto,
    },
    editFormSchema: {
      formPositions: ["email", "userName"],
      schema: $Volo_Abp_Identity_IdentityUserUpdateDto,
    },
    tableSchema: {
      excludeList: ["id", "extraProperties", "concurrencyStamp"],
      schema: $Volo_Abp_Identity_IdentityUserDto,
    },
    filterBy: "email",
  },
  edition: {
    filterBy: "displayName",
    createFormSchema: {
      formPositions: ["displayName"],
      schema: $Volo_Saas_Host_Dtos_EditionCreateDto,
    },
    editFormSchema: {
      formPositions: ["displayName"],
      schema: $Volo_Saas_Host_Dtos_EditionUpdateDto,
    },
    tableSchema: {
      excludeList: ["planId", "id", "planId", "concurrencyStamp"],
      schema: $Volo_Saas_Host_Dtos_EditionDto,
    },
  },
  tenant: {
    filterBy: "name",
    createFormSchema: {
      formPositions: ["name", "editionId", "adminEmailAddress", "adminPassword", "activationState", "activationEndDate"],
      schema: $Volo_Saas_Host_Dtos_SaasTenantCreateDto,
      convertors: {
        activationState: ["Active", "Active with limited time", "Passive"],
      },
    },
    tableSchema: {
      schema: $Volo_Saas_Host_Dtos_SaasTenantDto,
      excludeList: ["id", "concurrencyStamp", "editionId"],
      convertors: {
        activationState: ["Active", "Active with limited time", "Passive"],
      },
    },
    editFormSchema: {
      formPositions: ["name", "editionId", "activationState"],
      schema: $Volo_Saas_Host_Dtos_SaasTenantUpdateDto,
      convertors: {
        activationState: ["Active", "Active with limited time", "Passive"],
      },
    },
  },
};

function convertEnumField(
  value: string | number,
  enumArray: string[]
): string | number {
  if (typeof value === "number") {
    return enumArray[value];
  } else {
    return enumArray.indexOf(value);
  }
}

export default function Page({
  params,
}: {
  params: { data: string };
}): JSX.Element {
  const [roles, setRoles] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchLink = getBaseLink("/api/admin/" + params.data);

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
      if(dataConvertors){
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
      false
    );
  }
  const createFormSchema = dataConfig[params.data].createFormSchema;
  const action: tableAction = {
    cta: "New " + params.data,
    description: "Create a new " + params.data,
    autoFormArgs: {
      formSchema: createZodObject(createFormSchema.schema, createFormSchema.formPositions || [], createFormSchema.convertors || {}),
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
    setIsLoading(true);
    getRoles();
  }, []);


  function parseFormValues(schema: formModifier,data: any) {
    const newSchema = createZodObject(schema.schema, schema.formPositions || [], schema.convertors || {})  
    if (!schema.convertors) return newSchema
    const transformedSchema = newSchema.transform((val) => {
      const returnObject = { ...val };
      if (!schema.convertors) return returnObject;
      Object.entries(schema.convertors).forEach(([key, value]) => {
        returnObject[key] = convertEnumField(returnObject[key], value);
      });

      return returnObject;
    })
    const parsed = transformedSchema.parse(data)
    return parsed
  };

  const onEdit = (data: any, row: any, editFormSchema: any) => {
    const parsedData = parseFormValues(editFormSchema,data);
    console.log(parsedData)
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

  function convertZod (schema: formModifier) {
    const newSchema = createZodObject(schema.schema, schema.formPositions || [], schema.convertors || {})
    return newSchema
  }
  const editFormSchema =dataConfig[params.data].editFormSchema
  const editFormSchemaZod = convertZod(editFormSchema)

  const columnsData: columnsType = {
    type: "Auto",
    data: {
      callback: getRoles,
      autoFormArgs: {
        formSchema: editFormSchemaZod,
      },
      tableType: dataConfig[params.data].tableSchema.schema,
      excludeList: dataConfig[params.data].tableSchema.excludeList || [],
      onEdit: (data,row) => onEdit(data,row, editFormSchema),
      onDelete,
    },
  };

  return (
    <Dashboard
      withCards={false}
      withTable={true}
      isLoading={isLoading}
      filterBy={dataConfig[params.data].filterBy}
      cards={[]}
      data={roles?.items}
      columnsData={columnsData}
      action={action}
    />
  );
}
