"use client";
import Dashboard from "@repo/ayasofyazilim-ui/templates/dashboard";
import {
  $Volo_Abp_Identity_IdentityRoleDto,
  $Volo_Abp_Identity_IdentityRoleCreateDto,
} from "@ayasofyazilim/saas/IdentityService";
import { $Volo_Abp_Identity_IdentityUserCreateDto } from "@ayasofyazilim/saas/IdentityService";
import { useEffect, useState } from "react";
import { createZodObject, getBaseLink } from "src/utils";
import {
  tableAction,
  columnsType,
} from "@repo/ayasofyazilim-ui/molecules/tables";
import { toast } from "@/components/ui/sonner";
import { $Volo_Saas_Host_Dtos_EditionCreateDto } from "@ayasofyazilim/saas/SaasService";
import {
  $Volo_Saas_Host_Dtos_SaasTenantCreateDto,
  $Volo_Saas_Host_Dtos_SaasTenantDto,
} from "@ayasofyazilim/saas/SaasService";
import { z } from "zod";
import { DependencyType } from "node_modules/@repo/ayasofyazilim-ui/src/organisms/auto-form/types";

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
    toast.error("Something went wrong");
  }
}

const dataConfig: Record<string, any> = {
  role: {
    filterBy: "name",
    formSchema: $Volo_Abp_Identity_IdentityRoleCreateDto,
    tableSchema: $Volo_Abp_Identity_IdentityRoleDto,
    formPositions: ["name", "isDefault", "isPublic"],
    excludeList: ["id", "extraProperties", "concurrencyStamp"],
    cards: (items: any) => {
      return items?.slice(-4).map((item: any) => {
        return {
          title: item.name,
          content: item.userCount,
          description: "Users",
          footer: item.isPublic ? "Public" : "Not Public",
        };
      });
    },
  },
  user: {
    filterBy: "email",
    formSchema: $Volo_Abp_Identity_IdentityUserCreateDto,
    tableSchema: $Volo_Abp_Identity_IdentityUserCreateDto,
    formPositions: ["email", "password", "userName"],
    excludeList: ["password"],
    cards: (items: any) => {
      return items?.slice(-4).map((item: any) => {
        return {
          title: item.name,
          content: item.userCount,
          description: "Users",
          footer: item.isPublic ? "Public" : "Not Public",
        };
      });
    },
  },
  edition: {
    filterBy: "displayName",
    formSchema: $Volo_Saas_Host_Dtos_EditionCreateDto,
    tableSchema: $Volo_Saas_Host_Dtos_EditionCreateDto,
    formPositions: ["displayName"],
    excludeList: ["planId"],
    cards: (items: any) => {
      return items?.slice(-4).map((item: any) => {
        return {
          title: item.name,
          content: item.userCount,
          description: "Users",
          footer: item.isPublic ? "Public" : "Not Public",
        };
      });
    },
  },
  tenant: {
    filterBy: "name",
    formSchema: $Volo_Saas_Host_Dtos_SaasTenantCreateDto,
    tableSchema: $Volo_Saas_Host_Dtos_SaasTenantDto,
    excludeList: ["id", "editionId", "concurrencyStamp"],
    FormType: "zod",
    schema: {
      name: z.string().max(64).min(0),
      editionName: z.enum([""]).optional(),
      adminEmailAddress: z.string().email().max(256).min(0),
      adminPassword: z.string().max(128).min(0),
      activationState: z.enum([
        "Active",
        "Active with limited time",
        "Passive",
      ]),
      activationEndDate: z.date().optional(),
    },
    editformSchema: z.object({
      name: z.string().max(64).min(0),
      editionName: z.enum([""]).optional(),
      activationState: z.enum([
        "Active",
        "Active with limited time",
        "Passive",
      ]),

      activationEndDate: z.preprocess((arg) => {
        if (arg === "" || arg === null || arg === undefined) {
          return undefined;
        }
        if (typeof arg === "string" || arg instanceof Date) {
          return new Date(arg);
        }
        return arg;
      }, z.date().optional()),
    }),
    enumFields: {
      activationState: ["Active", "Active with limited time", "Passive"],
    },
    cards: (items: any) => {
      return items?.slice(-4).map((item: any) => {
        return {
          title: item.name,
          content: item.userCount,
          description: "Users",
          footer: item.isPublic ? "Public" : "Not Public",
        };
      });
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

function transformData(data: any, dataType: string, editions: any[]) {
  const { enumFields } = dataConfig[dataType] || {};
  if (enumFields) {
    Object.entries(enumFields).forEach(([field, enumArray]) => {
      data[field] = convertEnumField(data[field], enumArray as string[]);
    });
  }

  if (dataConfig[dataType].FormType === "zod") {
    const options = editions.find(
      (edition: { displayName: any }) =>
        edition.displayName === data.editionName
    );
    if (options) {
      data.editionId = options.id;
      data.editionName = options.displayName;
    }
  }

  return data;
}

export default function Page({
  params,
}: {
  params: { data: string };
}): JSX.Element {
  const [roles, setRoles] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editions, setEditions] = useState<any[]>([]);
  const [tenantSchema, setTenantSchema] = useState(dataConfig.tenant.schema);
  const [tenantEditFormSchema, setTenantEditFormSchema] = useState(
    dataConfig.tenant.editformSchema
  );
  const fetchLink = getBaseLink("/api/admin/" + params.data);
  const {
    formSchema: schema,
    formPositions,
    excludeList,
    cards,
    tableSchema: tableType,
    filterBy,
  } = dataConfig[params.data];

  const rolesCards = cards(roles?.items);

  function getRoles() {
    function onData(data: any) {
      let returnData = data;
      if (!data?.items) {
        returnData = {
          totalCount: data.length,
          items: data,
        };
      }
      const transformedData = returnData.items.map(
        (item: { activationState: number }) =>
          transformData(item, params.data, editions)
      );
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

  const formSchema =
    dataConfig[params.data].FormType === "zod"
      ? z.object(tenantSchema)
      : createZodObject(schema, dataConfig[params.data].formPositions);

  const autoFormArgs = {
    formSchema,
    dependencies: [
      {
        sourceField: "activationState",
        type: DependencyType.HIDES,
        targetField: "activationEndDate",
        when: (activationState: string) =>
          activationState !== "Active with limited time",
      },
    ],
  };

  const action: tableAction = {
    cta: "New " + params.data,
    description: "Create a new " + params.data,
    autoFormArgs,
    callback: async (e) => {
      const transformedData = transformData(e, params.data, editions);
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
    fetchEdition();
  }, []);

  async function fetchEdition() {
    try {
      const response = await fetch(getBaseLink("/api/admin/edition"), {
        method: "GET",
      });
      const data = await response.json();
      setEditions(data);

      const editionDisplayNames = data.map(
        (edition: any) => edition.displayName
      );

      const updatedTenantSchema = {
        ...dataConfig.tenant.schema,
        editionName: z.enum(editionDisplayNames).optional(),
      };

      const updatedTenantEditFormSchema = z.object({
        ...dataConfig.tenant.editformSchema.shape,
        editionName: z.preprocess((arg) => {
          if (arg === "" || arg === null || arg === undefined) {
            return undefined;
          }
          return arg;
        }, z.enum(editionDisplayNames).optional()),
      });

      setTenantSchema(updatedTenantSchema);
      setTenantEditFormSchema(updatedTenantEditFormSchema);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }

  const onEdit = (data: any, row: any) => {
    const transformedData = transformData(data, params.data, editions);
    controlledFetch(
      fetchLink,
      {
        method: "PUT",
        body: JSON.stringify({
          id: row.id,
          requestBody: JSON.stringify(transformedData),
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

  const getCustomFormArgs = () => {
    if (dataConfig[params.data].FormType === "zod") {
      return {
        formSchema: tenantEditFormSchema,
        dependencies: [
          {
            sourceField: "activationState",
            type: DependencyType.HIDES,
            targetField: "activationEndDate",
            when: (activationState: string) =>
              activationState !== "Active with limited time",
          },
        ],
      };
    }
    return { formSchema };
  };

  const columnsData: columnsType = {
    type: "Auto",
    data: {
      callback: getRoles,
      autoFormArgs: getCustomFormArgs(),
      tableType,
      excludeList,
      onEdit,
      onDelete,
    },
  };

  return (
    <Dashboard
      withCards={false}
      withTable={true}
      isLoading={isLoading}
      filterBy={filterBy}
      cards={rolesCards}
      data={roles?.items}
      columnsData={columnsData}
      action={action}
    />
  );
}
