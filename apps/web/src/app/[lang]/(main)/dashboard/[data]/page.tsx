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

async function controlledFetch(
  url: string,
  options: RequestInit,
  onSuccess: (data?: any) => void,
  successMessage: string = "Successfull",
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
      setRoles(data);
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
  const formSchema = createZodObject(schema, formPositions);
  const autoFormArgs = {
    formSchema,
  };

  const action: tableAction = {
    cta: "New " + params.data,
    description: "Create a new " + params.data,
    autoFormArgs,
    callback: async (e) => {
      await controlledFetch(
        fetchLink,
        {
          method: "POST",
          body: JSON.stringify(e),
        },
        getRoles
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
    controlledFetch(
      fetchLink,
      {
        method: "PUT",
        body: JSON.stringify({
          id: row.id,
          requestBody: JSON.stringify(data),
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
    data: { getRoles, autoFormArgs, tableType, excludeList, onEdit, onDelete },
  };

  return (
    <Dashboard
      withCards={true}
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
