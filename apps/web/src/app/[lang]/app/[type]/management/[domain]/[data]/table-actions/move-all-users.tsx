"use client";

import { toast } from "@/components/ui/sonner";
import type { Volo_Abp_Identity_IdentityRoleDto } from "@ayasofyazilim/saas/IdentityService";
import AutoForm, {
  AutoFormSubmit,
  CustomCombobox,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import {
  getAllRolesApi,
  moveAllUsersApi,
} from "src/app/[lang]/app/actions/IdentityService/actions";
import { getResourceDataClient } from "src/language-data/IdentityService";

export default function MoveAllUsers({
  rowId,
  lang,
}: {
  rowId: string;
  lang: string;
}): JSX.Element {
  const languageData = getResourceDataClient(lang);

  const moveAllUsers = async (selectedRoleId: string) => {
    const response = await moveAllUsersApi({
      id: rowId,
      roleId: selectedRoleId,
    });
    if (response.type === "success") {
      toast.success(languageData["Role.MoveAllUsers.Update.Success"]);
      window.location.reload();
    } else {
      toast.error(response.message);
    }
  };

  const formSchema = z.object({
    roleId: z.string(),
  });

  return (
    <AutoForm
      fieldConfig={{
        roleId: {
          renderer: function RoleComboboxRenderer(props) {
            const [roleList, setRolesList] = useState<
              Volo_Abp_Identity_IdentityRoleDto[]
            >([]);

            useEffect(() => {
              const fetchRoles = async () => {
                const roles = await getAllRolesApi();
                const updatedRoleList: Volo_Abp_Identity_IdentityRoleDto[] =
                  roles.type === "success"
                    ? [
                        { id: "", name: languageData["Role.Unassigned"] },
                        ...(roles.data.items?.filter(
                          (role) => role.id !== rowId,
                        ) || []),
                      ]
                    : [];
                setRolesList(updatedRoleList);
              };
              void fetchRoles();
            }, [rowId]);

            return (
              <CustomCombobox<Volo_Abp_Identity_IdentityRoleDto>
                childrenProps={props}
                emptyValue={languageData["Role.Select"]}
                list={roleList}
                searchPlaceholder={languageData["Select.Placeholder"]}
                searchResultLabel={languageData["Select.ResultLabel"]}
                selectIdentifier="id"
                selectLabel="name"
              />
            );
          },
        },
      }}
      formSchema={formSchema}
      onSubmit={(data) => {
        void moveAllUsers(data.roleId as string);
      }}
    >
      <AutoFormSubmit className="float-right px-8 py-4">
        {languageData.Save}
      </AutoFormSubmit>
    </AutoForm>
  );
}
