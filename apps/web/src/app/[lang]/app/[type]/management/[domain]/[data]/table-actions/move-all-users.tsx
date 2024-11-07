"use client";
import { toast } from "@/components/ui/sonner";
import type { Volo_Abp_Identity_IdentityRoleDto } from "@ayasofyazilim/saas/IdentityService";
import AutoForm, {
  AutoFormSubmit,
  CustomCombobox,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { z } from "zod";
import {
  getAllRolesApi,
  moveAllUsersApi,
} from "src/app/[lang]/app/actions/IdentityService/actions";
import { getResourceDataClient } from "src/language-data/IdentityService";

export default async function MoveAllUsers({
  rowId,
  lang,
}: {
  rowId: string;
  lang: string;
}) {
  const languageData = getResourceDataClient(lang);

  const roles = await getAllRolesApi();
  const roleList: Volo_Abp_Identity_IdentityRoleDto[] =
    roles.type === "success"
      ? [
          { id: "", name: languageData["Role.Unassigned"] },
          ...(roles.data.items?.filter((role) => role.id !== rowId) || []),
        ]
      : [];

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
          renderer: (props) => (
            <CustomCombobox<Volo_Abp_Identity_IdentityRoleDto>
              childrenProps={props}
              emptyValue={languageData["Role.Select"]}
              list={roleList}
              searchPlaceholder={languageData["Select.Placeholder"]}
              searchResultLabel={languageData["Select.ResultLabel"]}
              selectIdentifier="id"
              selectLabel="name"
            />
          ),
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
