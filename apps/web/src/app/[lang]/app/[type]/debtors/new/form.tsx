/* eslint-disable @typescript-eslint/no-unsafe-member-access -- TODO: we need to fix this*/
"use client";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { UniRefund_LocationService_Cities_CityDto } from "@ayasofyazilim/saas/LocationService";
import type { TableData } from "@repo/ui/utils/table/table-utils";
import { getResourceDataClient } from "src/language-data/DebtorsService";
import { useLocale } from "src/providers/locale";
import { getBaseLink } from "src/utils";
import { isPhoneValid, splitPhone } from "src/utils-phone";
import { getCities } from "../../action";
import { dataDebtors } from "../data";

export interface CreateOrganizationDto {
  organization: Record<string, string>;
  telephone: {
    areaCode: string;
    localNumber: string;
    ituCountryCode: string;
    primaryFlag: boolean;
    typeCode: 0 | 1 | 2 | 3;
  };
  address: {
    addressLine: string;
    city: string;
    terriority: string;
    postalCode: string;
    country: string;
    fullAddress: string;
    primaryFlag: boolean;
    typeCode: 0 | 1;
  };
  email: {
    emailAddress: string;
    primaryFlag: boolean;
    typeCode: 0 | 1;
  };
}

export default function Form({
  params,
}: {
  params: {
    lang: string;
    id: string;
  };
}) {
  const router = useRouter();
  const [_formData] = useState<TableData>(dataDebtors.debtors.pages.debtors);
  const { resources } = useLocale();
  const languageData = getResourceDataClient(resources, params.lang);
  const [cities, setCities] =
    useState<UniRefund_LocationService_Cities_CityDto[]>();

  useEffect(() => {
    void getCities({ maxResultCount: 500, sorting: "name" }).then(
      (response) => {
        if (response.type === "success") {
          setCities(response.data.items || []);
        } else if (response.type === "api-error") {
          toast.error(response.message);
        } else {
          toast.error("Fatal error");
        }
      },
    );
  }, []);

  function formSchemaByData() {
    const config = dataDebtors.debtors.pages.debtors;
    if (config.createFormSchema) {
      config.createFormSchema.schema.properties.address.properties.country = {
        type: "integer",
        format: "int32",
        enum: ["Turkey"],
      };
      config.createFormSchema.schema.properties.address.properties.city = {
        type: "integer",
        format: "int32",
        enum: cities?.map((city) => city.name),
      };
    }
    return createZodObject(
      config.createFormSchema?.schema,
      config.createFormSchema?.formPositions,
      undefined,
      config.createFormSchema?.formSubPositions,
    );
  }

  const handleSave = async (formData: CreateOrganizationDto) => {
    const isValid = isPhoneValid(formData.telephone.localNumber);
    if (!isValid) {
      return;
    }
    const phoneData = splitPhone(formData.telephone.localNumber);
    formData.telephone = { ...formData.telephone, ...phoneData };
    const createformData = {
      taxOfficeId: "a3bf0c31-47ef-ba8c-9840-3a14ca207817",
      typeCode: 0,
      entityInformationTypes: [
        {
          organizations: [
            {
              ...formData.organization,
              contactInformations: [
                {
                  telephones: [{ ...formData.telephone, primaryFlag: true }],
                  emails: [{ ...formData.email, primaryFlag: true }],
                  addresses: [{ ...formData.address, primaryFlag: true }],
                },
              ],
            },
          ],
        },
      ],
    };
    try {
      const response = await fetch(getBaseLink(`api/crm/merchants`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createformData),
      });
      if (response.ok) {
        toast.success(`Debtor added successfully`);
        router.push(getBaseLink(`/app/admin/debtors`));
      } else {
        const errorData = (await response.json()) as {
          message: string;
        };
        toast.error(errorData.message || `Failed to add Debtor`);
      }
    } catch (error) {
      toast.error(`An error occurred while saving the Debtor`);
    }
  };

  return (
    <div className="flex h-full w-full flex-row">
      <Card className="m-0 w-full overflow-auto border-0 bg-transparent bg-white pt-5 shadow-none">
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
}
