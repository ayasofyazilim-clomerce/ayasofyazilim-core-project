"use client";

import { toast } from "@/components/ui/sonner";
import { $UniRefund_CRMService_Merchants_CreateMerchantDto as CreateMerchantSchema } from "@ayasofyazilim/saas/CRMService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { addressSchemaByData } from "@repo/ui/utils/table/form-schemas";
import { getEnumId } from "@repo/ui/utils/table/table-utils";
import { useRouter, useSearchParams } from "next/navigation";
import type { CRMServiceServiceResource } from "src/language-data/CRMService";
import { getBaseLink } from "src/utils";
import { isPhoneValid, splitPhone } from "src/utils-phone";
import type { CreatePartiesDto } from "../../../../table-data";
import { dataConfigOfParties, localNumber } from "../../../../table-data";
import type { CreateMerchantDTO } from "../../../../types";
import { createPartyRow } from "../../../action";

function createScheme(schema: typeof CreateMerchantSchema) {
  return {
    type: "object",
    properties: {
      taxOfficeId: {
        type: "string",
      },
      name: schema.properties.entityInformationTypes.items.properties
        .individuals.items.properties.name,
      personalSummaries:
        schema.properties.entityInformationTypes.items.properties.individuals
          .items.properties.personalSummaries.items,
      telephone: {
        ...schema.properties.entityInformationTypes.items.properties.individuals
          .items.properties.contactInformations.items.properties.telephones
          .items,
        properties: {
          ...schema.properties.entityInformationTypes.items.properties
            .individuals.items.properties.contactInformations.items.properties
            .telephones.items.properties,
          localNumber,
        },
      },
      address:
        schema.properties.entityInformationTypes.items.properties.individuals
          .items.properties.contactInformations.items.properties.addresses
          .items,
      email:
        schema.properties.entityInformationTypes.items.properties.individuals
          .items.properties.contactInformations.items.properties.emails.items,
    },
  };
}

export default function CrmIndividual({
  partyName,
  taxOfficesEnum,
  citiesEnum,
  languageData,
}: {
  partyName: "merchants";
  taxOfficesEnum: { name: string; id: string }[];
  citiesEnum: { name: string; id: string }[];
  languageData: CRMServiceServiceResource;
}) {
  const searchParams = useSearchParams();
  const parentId = searchParams.get("parentId");
  const router = useRouter();

  function formSchemaByData() {
    const config = dataConfigOfParties[partyName];
    const schema = createScheme(CreateMerchantSchema);
    const address = addressSchemaByData([], citiesEnum, [
      "country",
      "terriority",
    ]);

    const convertors = {
      taxOfficeId: {
        type: "enum",
        data: taxOfficesEnum.map((i) => i.name),
      },
      address: {
        ...address.convertors,
      },
    };
    const formSubPositions = {
      ...config.createFormSchema.formSubPositions,
      address: address.subPositions,
    };
    return createZodObject(
      schema,
      [
        "name",
        "personalSummaries",
        "address",
        "taxOfficeId",
        "telephone",
        "email",
      ],
      convertors,
      formSubPositions,
    );
  }

  const schema = formSchemaByData();

  const handleSave = async (formData: CreatePartiesDto) => {
    const isValid = isPhoneValid(formData.telephone.localNumber);
    if (!isValid) {
      return;
    }
    const phoneData = splitPhone(formData.telephone.localNumber);
    formData.telephone = { ...formData.telephone, ...phoneData };
    const createformData: CreateMerchantDTO = {
      taxOfficeId: getEnumId(taxOfficesEnum, formData.taxOfficeId),
      typeCode: parentId
        ? dataConfigOfParties[partyName].subEntityType
        : "HEADQUARTER",
      parentId,
      entityInformationTypes: [
        {
          individuals: [
            {
              name: formData.name,
              personalSummaries: [formData.personalSummaries],
              contactInformations: [
                {
                  telephones: [{ ...formData.telephone, primaryFlag: true }],
                  emails: [{ ...formData.email, primaryFlag: true }],
                  addresses: [
                    {
                      ...formData.address,
                      country: formData.address.country || "NULL",
                      terriority: formData.address.terriority || "NULL",
                      city: getEnumId(citiesEnum, formData.address.city),
                      primaryFlag: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    try {
      const response = await createPartyRow(partyName, createformData);
      if (response.status === 200) {
        toast.success(`${partyName} added successfully`);
        router.push(getBaseLink(`/app/admin/parties/${partyName}`));
      } else {
        toast.error(response.message || `Failed to add ${partyName}`);
      }
    } catch (error) {
      toast.error(`An error occurred while saving the ${partyName}`);
    }
  };

  return (
    <AutoForm
      className="grid gap-2 space-y-0 md:grid-cols-2 lg:grid-cols-3"
      fieldConfig={{
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
            displayName: languageData.Telephone,
            inputProps: {
              showLabel: true,
            },
          },
        },
      }}
      formClassName="pb-4"
      formSchema={schema}
      onSubmit={(val) => {
        void handleSave(val as CreatePartiesDto);
      }}
    >
      <AutoFormSubmit className="float-right">
        {languageData.Save}
      </AutoFormSubmit>
    </AutoForm>
  );
}
