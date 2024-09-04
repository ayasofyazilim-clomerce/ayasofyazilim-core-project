/* eslint-disable @typescript-eslint/no-unsafe-member-access -- TODO: we need to fix this*/
"use client";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { TableData } from "src/utils";
import { getBaseLink } from "src/utils";
import { isPhoneValid, splitPhone } from "src/utils-phone";
import { getResourceDataClient } from "src/language-data/CRMService";
import { useLocale } from "src/providers/locale";
import { dataConfigOfCrm } from "../../../../data";

export interface CreateMerchants {
  organization: {
    name: string;
    taxpayerId: string;
    legalStatusCode: string;
    customerNumber: string;
  };
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

export default function Page({
  params,
}: {
  params: {
    data: string;
    domain: string;
    lang: string;
  };
}) {
  const router = useRouter();
  const [_formData] = useState<TableData>(
    dataConfigOfCrm[params.domain].pages[params.data],
  );
  const { resources } = useLocale();
  const languageData = getResourceDataClient(resources, params.lang);
  const handleSave = async (formData: CreateMerchants) => {
    const isValid = isPhoneValid(formData.telephone.localNumber);
    if (!isValid) {
      return;
    }
    const phoneData = splitPhone(formData.telephone.localNumber);
    formData.telephone = { ...formData.telephone, ...phoneData };
    try {
      const response = await fetch(getBaseLink(`api/crm/${params.data}`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success(`${params.data} added successfully`);
        router.push(
          getBaseLink(`/app/admin/crm/${params.domain}/${params.data}`),
        );
      } else {
        const errorData = (await response.json()) as {
          message: string;
        };
        toast.error(errorData.message || `Failed to add ${params.data}`);
      }
    } catch (error) {
      toast.error(`An error occurred while saving the ${params.data}`);
    }
  };

  return (
    <>
      <PageHeader
        LinkElement={Link}
        description={
          languageData[
            `${_formData.title?.replaceAll(" ", "")}.New` as keyof typeof languageData
          ]
        }
        href={getBaseLink(`/app/admin/crm/${params.domain}/${params.data}`)}
        title={
          languageData[
            `${_formData.title?.replaceAll(" ", "")}.New` as keyof typeof languageData
          ]
        }
      />
      <div className="flex h-full w-full flex-row">
        <Card className="m-0 w-full overflow-auto border-0 bg-transparent bg-white pt-5 shadow-none">
          <CardContent>
            <AutoForm
              fieldConfig={{
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
              formSchema={formSchemaByData(params.data)}
              onSubmit={(val) => {
                void handleSave(val as CreateMerchants);
              }}
            >
              <AutoFormSubmit className="float-right">
                {languageData.Save}
              </AutoFormSubmit>
            </AutoForm>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function formSchemaByData(data: string) {
  const config = dataConfigOfCrm.companies.pages[data];
  if (config.createFormSchema) {
    config.createFormSchema.schema.properties.telephone.properties.typeCode.enum =
      ["Home", "Office", "Mobile", "Fax"];
    config.createFormSchema.schema.properties.address.properties.typeCode.enum =
      ["Home", "Office"];
    config.createFormSchema.schema.properties.email.properties.typeCode.enum = [
      "Work",
      "Personal",
    ];
  }
  return createZodObject(
    config.createFormSchema?.schema,
    config.createFormSchema?.formPositions,
    config.createFormSchema?.formSubPositions,
  );
}
