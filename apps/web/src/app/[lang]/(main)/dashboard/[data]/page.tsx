"use client";
import Dashboard from "@repo/ayasofyazilim-ui/templates/dashboard";
import {
  $Volo_Abp_Identity_IdentityRoleDto,
  $Volo_Abp_Identity_IdentityRoleCreateDto,
} from "@ayasofyazilim/saas/IdentityService";
import { $Volo_Abp_Identity_IdentityUserCreateDto } from "@ayasofyazilim/saas/IdentityService";
import { useEffect, useState } from "react";
import { createZodObject, getBaseLink } from "src/utils";
import { tableAction } from "@repo/ayasofyazilim-ui/molecules/tables";
import { $Volo_Abp_Identity_IdentityUserDto } from "@ayasofyazilim/saas/AccountService";
import { toast } from "@/components/ui/sonner";
import { $Volo_Saas_Host_Dtos_SaasTenantCreateDto, $Volo_Saas_Host_Dtos_SaasTenantDto } from "@ayasofyazilim/saas/SaasService";
import { z } from "zod";

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
    toast.error("Something went wrong");
  }
}

const dataConfig: Record<string, any> = {
  role: {
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

  tenant: {
    formSchema: $Volo_Saas_Host_Dtos_SaasTenantCreateDto,
    tableSchema: $Volo_Saas_Host_Dtos_SaasTenantDto,
    formPositions: "",
    excludeList: ["id", "concurrencyStamp"],
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

export default function Page({
  params,
}: {
  params: { data: string };
}): JSX.Element {
  const [roles, setRoles] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchLink = getBaseLink("/api/admin/" + params.data);
  const {
    formSchema: schema,
    formPositions,
    excludeList,
    cards,
    tableSchema: tableType,
  } = dataConfig[params.data];

  const rolesCards = cards(roles?.items);




  function getRoles() {
    function onData(data: any) {
      const transformedData = data.items.map((item: { activationState: number }) => ({
       ...item,
        activationState: activationStateReverseMap[item.activationState as keyof typeof activationStateReverseMap],
      }));
      setRoles({...data, items: transformedData });
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


  const activationStateMap = {
    "Active": 0,
    "Active with limited time": 1,
    "Passive": 2,
  };

  const activationStateReverseMap = {
    0: "Active",
    1: "Active with limited time",
    2: "Passive",
  };




  const formSchema = params.data === 'tenant'
  ? z.object({
      name: z.string().max(64).min(0),
      editionId: z.string().uuid().nullable().optional(),
      adminEmailAddress: z.string().email().max(256).min(0),
      adminPassword: z.string().max(128).min(0),
      activationState: z.enum(['Active', 'Active with limited time', 'Passive']),
    })
  : createZodObject(schema, formPositions);


  const editformSchema = z.object({
    name: z.string().max(64).min(0),
    editionId: z.string().uuid().nullable().optional(),
    activationState: z.enum(['Active', 'Active with limited time', 'Passive']),
});



  const autoFormArgs = { formSchema };



  const action: tableAction = {
    cta: "New " + params.data,
    description: "Create a new " + params.data,
    autoFormArgs,
    callback: async (e) => {
      const transformedData = {
       ...e,
       activationState: activationStateMap[e.activationState as keyof typeof activationStateMap],
      };
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

  const onEdit = (data: any, row: any) => {
    const transformedData = {
      ...data,
      activationState: activationStateMap[data.activationState as keyof typeof activationStateMap],
    };
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

  const columnsData = {
    type: "Auto",
    data: { getRoles, autoFormArgs: params.data === 'tenant' ? { formSchema: editformSchema } : { formSchema }, tableType, excludeList, onEdit, onDelete },
  };
  
  

  return (
    <Dashboard
      withCards={false}
      withTable={true}
      isLoading={isLoading}
      filterBy="name"
      cards={rolesCards}
      data={roles?.items}
      // @ts-ignore
      columnsData={columnsData}
      action={action}
    />
  );
}
