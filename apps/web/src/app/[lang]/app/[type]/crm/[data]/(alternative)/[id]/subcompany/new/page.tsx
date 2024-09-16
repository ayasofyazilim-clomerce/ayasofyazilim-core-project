"use client";
import { toast } from "@/components/ui/sonner";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { TableData } from "src/utils";
import { getBaseLink } from "src/utils";
import { isPhoneValid, splitPhone } from "src/utils-phone";
import { getResourceDataClient } from "src/language-data/CRMService";
import { useLocale } from "src/providers/locale";
import { dataConfigOfCrm } from "../../../../../data";
import type { CreateOrganizationDto } from "../../../new/page";

interface FormSchema {
  schema: {
    properties: {
      telephone: {
        properties: {
          typeCode: {
            enum: string[];
          };
        };
      };
      address: {
        properties: {
          typeCode: {
            enum: string[];
          };
        };
      };
      email: {
        properties: {
          typeCode: {
            enum: string[];
          };
        };
      };
    };
  };
}
const formSubPositions = {
  organization: [
    "name",
    "taxpayerId",
    "legalStatusCode",
    "customerNumber",
    "branchId",
  ],
  telephone: ["localNumber", "typeCode"],
  address: [
    "country",
    "terriority",
    "city",
    "postalCode",
    "addressLine",
    "fullAddress",
    "typeCode",
  ],
  email: ["emailAddress", "typeCode"],
};
export default function Page({
  params,
}: {
  params: {
    data: string;
    lang: string;
    id: string;
  };
}) {
  const router = useRouter();
  const [_formData] = useState<TableData>(
    dataConfigOfCrm.companies.pages[params.data],
  );
  const { resources } = useLocale();
  const languageData = getResourceDataClient(resources, params.lang);
  const handleSave = async (formData: CreateOrganizationDto) => {
    const isValid = isPhoneValid(formData.telephone.localNumber);
    if (!isValid) {
      return;
    }
    const phoneData = splitPhone(formData.telephone.localNumber);
    formData.telephone = { ...formData.telephone, ...phoneData };
    const createformData = {
      entityInformationTypes: [
        {
          organizations: [
            {
              ...formData.organization,
              parentCompanyId: params.id,
              contactInformations: [
                {
                  telephones: [formData.telephone],
                  emails: [formData.email],
                  addresses: [formData.address],
                },
              ],
            },
          ],
        },
      ],
    };
    try {
      const response = await fetch(getBaseLink(`api/crm/${params.data}`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createformData),
      });
      if (response.ok) {
        toast.success(`Sub Company added successfully`);
        router.push(getBaseLink(`/app/admin/crm/${params.data}/${params.id}`));
      } else {
        const errorData = (await response.json()) as {
          message: string;
        };
        toast.error(errorData.message || `Failed to add Sub Company`);
      }
    } catch (error) {
      toast.error(`An error occurred while saving the Sub Company`);
    }
  };

  return (
    <AutoForm
      className="grid-col-1 grid grid-rows-1 gap-2 space-y-0 lg:grid-cols-3 lg:grid-rows-2"
      fieldConfig={{
        address: {
          className: "row-span-2",
        },
        organization: {
          className: "row-span-2",
        },
        email: {
          emailAddress: {
            inputProps: {
              type: "email",
            },
          },
        },
        telephone: {
          localNumber: {
            fieldType: "phone",
            displayName: "Telephone Number",
            inputProps: {
              showLabel: true,
            },
          },
        },
      }}
      formClassName="pb-40 "
      formSchema={formSchemaByData()}
      onSubmit={(val) => {
        void handleSave(val as CreateOrganizationDto);
      }}
    >
      <AutoFormSubmit className="float-right">
        {languageData.Save}
      </AutoFormSubmit>
    </AutoForm>
  );
}

function formSchemaByData() {
  const config = dataConfigOfCrm.companies.pages.merchants;
  if (config.createFormSchema) {
    const schema = config.createFormSchema as FormSchema;
    schema.schema.properties.telephone.properties.typeCode.enum = [
      "Home",
      "Office",
      "Mobile",
      "Fax",
    ];
    schema.schema.properties.address.properties.typeCode.enum = [
      "Home",
      "Office",
    ];
    schema.schema.properties.email.properties.typeCode.enum = [
      "Work",
      "Personal",
    ];
  }
  return createZodObject(
    config.createFormSchema?.schema,
    config.createFormSchema?.formPositions,
    undefined,
    formSubPositions,
  );
}
