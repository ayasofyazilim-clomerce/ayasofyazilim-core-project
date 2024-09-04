"use client";
import { toast } from "@/components/ui/sonner";
import type {
  UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto,
  UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto,
  UniRefund_CRMService_Merchants_MerchantDto,
  UniRefund_CRMService_Organizations_UpdateOrganizationDto,
  UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto,
} from "@ayasofyazilim/saas/CRMService";
import {
  $UniRefund_CRMService_Organizations_UpdateOrganizationDto,
  // $UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto,
  // $UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto,
  // $UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto,
} from "@ayasofyazilim/saas/CRMService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import Link from "next/link";
import { useState } from "react";
import { getResourceDataClient } from "src/language-data/CRMService";
import { useLocale } from "src/providers/locale";
import type { TableData } from "src/utils";
import { getBaseLink } from "src/utils";
import { isPhoneValid, splitPhone } from "src/utils-phone";
import { dataConfigOfCrm } from "../../../../../data";
import { updateCRMDetailServer, updateMerchantCRMDetailServer } from "./action";

const organization = $UniRefund_CRMService_Organizations_UpdateOrganizationDto;
const telephone = {
  required: ["areaCode", "ituCountryCode", "localNumber", "typeCode"],
  type: "object",
  properties: {
    extraProperties: {
      type: "object",
      additionalProperties: {},
      nullable: true,
      readOnly: true,
    },
    areaCode: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    localNumber: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    ituCountryCode: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    primaryFlag: {
      type: "boolean",
    },
    typeCode: {
      enum: ["Home", "Office", "Mobile", "Fax"],
      type: "integer",
      format: "int32",
    },
  },
  additionalProperties: false,
};
const address = {
  required: [
    "addressLine",
    "city",
    "country",
    "fullAddress",
    "postalCode",
    "terriority",
    "typeCode",
  ],
  type: "object",
  properties: {
    extraProperties: {
      type: "object",
      additionalProperties: {},
      nullable: true,
      readOnly: true,
    },
    addressLine: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    city: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    terriority: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    postalCode: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    country: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    fullAddress: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    primaryFlag: {
      type: "boolean",
    },
    typeCode: {
      enum: ["Home", "Office"],
      type: "integer",
      format: "int32",
    },
  },
  additionalProperties: false,
};
const email = {
  required: ["emailAddress", "typeCode"],
  type: "object",
  properties: {
    extraProperties: {
      type: "object",
      additionalProperties: {},
      nullable: true,
      readOnly: true,
    },
    emailAddress: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    primaryFlag: {
      type: "boolean",
    },
    typeCode: {
      enum: ["Work", "Personal"],
      type: "integer",
      format: "int32",
    },
  },
  additionalProperties: false,
};
export default function Form({
  crmDetailData,
  params,
}: {
  crmDetailData: UniRefund_CRMService_Merchants_MerchantDto;
  params: {
    id: string;
    data: string;
    domain: string;
    lang: string;
  };
}) {
  const [formData] = useState<TableData>(
    dataConfigOfCrm[params.domain].pages[params.data],
  );
  const { resources } = useLocale();
  const languageData = getResourceDataClient(resources, params.lang);
  const organizationInfo =
    crmDetailData.entityInformations?.[0]?.organizations?.[0];
  const organizationId = organizationInfo?.id || "";

  const emailInfo = organizationInfo?.contactInformations?.[0]?.emails?.[0];
  const telephoneInfo =
    organizationInfo?.contactInformations?.[0]?.telephones?.[0];
  const addressInfo =
    organizationInfo?.contactInformations?.[0]?.addresses?.[0];

  const organizationSchema = createZodObject(organization, ["name"]);
  const emailSchema = createZodObject(email, ["emailAddress", "typeCode"]);
  const telephoneSchema = createZodObject(telephone, [
    "localNumber",
    "typeCode",
  ]);

  const phoneNumber =
    (telephoneInfo?.ituCountryCode || "+90") +
    (telephoneInfo?.areaCode || "") +
    (telephoneInfo?.localNumber || "");
  const addressSchema = createZodObject(address, [
    "country",
    "terriority",
    "city",
    "postalCode",
    "addressLine",
    "fullAddress",
    "typeCode",
  ]);
  async function handleSubmit(values: unknown, sectionName: string) {
    if (typeof values !== "object") return;

    let response = "fail";
    if (sectionName === "organization") {
      await updateMerchantCRMDetailServer(
        params.id,
        organizationId,
        "merchant",
        values as UniRefund_CRMService_Organizations_UpdateOrganizationDto,
      );
      response = "success";
    }
    if (sectionName === "email") {
      await updateCRMDetailServer(emailInfo?.id || "", {
        ...values,
        primaryFlag: true,
      } as UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto);
      response = "success";
    }
    if (sectionName === "telephone") {
      const parsedValues = {
        ...values,
        primaryFlag: true,
      } as UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto;
      const isValid = isPhoneValid(parsedValues.localNumber);
      if (!isValid) {
        return;
      }
      const phoneData = splitPhone(parsedValues.localNumber);
      await updateCRMDetailServer(telephoneInfo?.id || "", {
        ...values,
        primaryFlag: true,
        ...phoneData,
      } as UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto);
      response = "success";
    }
    if (sectionName === "address") {
      await updateCRMDetailServer(addressInfo?.id || "", {
        ...values,
        primaryFlag: true,
      } as UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto);
      response = "success";
    }
    if (response) {
      toast.success("Updated successfully!");
    }
  }

  return (
    <div className="h-full overflow-hidden">
      <PageHeader
        LinkElement={Link}
        description={
          languageData[
            `${formData.title?.replaceAll(" ", "")}.Edit` as keyof typeof languageData
          ]
        }
        href={getBaseLink(`/app/admin/crm/${params.domain}/${params.data}`)}
        title={
          languageData[
            `${formData.title?.replaceAll(" ", "")}.Edit` as keyof typeof languageData
          ]
        }
      />
      <SectionLayout
        sections={[
          { name: languageData.Organization, id: "organization" },
          { name: languageData.Telephone, id: "telephone" },
          { name: languageData.Address, id: "address" },
          { name: languageData.Email, id: "email" },
        ]}
        vertical
      >
        <SectionLayoutContent sectionId="organization">
          <AutoForm
            formClassName="pb-40 "
            formSchema={organizationSchema}
            onSubmit={(values) => {
              void handleSubmit(values, "organization");
            }}
            values={{
              name: organizationInfo?.name,
            }}
          >
            <AutoFormSubmit className="float-right">
              {languageData.Save}
            </AutoFormSubmit>
          </AutoForm>
        </SectionLayoutContent>
        <SectionLayoutContent sectionId="telephone">
          <AutoForm
            fieldConfig={{
              localNumber: {
                fieldType: "phone",
                displayName: "Telephone Number",
                inputProps: {
                  showLabel: true,
                },
              },
            }}
            formClassName="pb-40 "
            formSchema={telephoneSchema}
            onSubmit={(values) => {
              void handleSubmit(values, "telephone");
            }}
            values={{
              localNumber: phoneNumber,
              primaryFlag: telephoneInfo?.primaryFlag,
              typeCode:
                telephone.properties.typeCode.enum[
                  telephoneInfo?.typeCode || 0
                ],
            }}
          >
            <AutoFormSubmit className="float-right">
              {languageData.Save}
            </AutoFormSubmit>
          </AutoForm>
        </SectionLayoutContent>
        <SectionLayoutContent sectionId="address">
          <AutoForm
            formClassName="pb-40 "
            formSchema={addressSchema}
            onSubmit={(values) => {
              void handleSubmit(values, "address");
            }}
            values={{
              addressLine: addressInfo?.addressLine,
              city: addressInfo?.city,
              country: addressInfo?.country,
              fullAddress: addressInfo?.fullAddress,
              postalCode: addressInfo?.postalCode,
              terriority: addressInfo?.terriority,
              typeCode:
                address.properties.typeCode.enum[addressInfo?.typeCode || 0],

              primaryFlag: addressInfo?.primaryFlag,
            }}
          >
            <AutoFormSubmit className="float-right">
              {languageData.Save}
            </AutoFormSubmit>
          </AutoForm>
        </SectionLayoutContent>
        <SectionLayoutContent sectionId="email">
          <AutoForm
            formClassName="pb-40 "
            formSchema={emailSchema}
            onSubmit={(values) => {
              void handleSubmit(values, "email");
            }}
            values={{
              emailAddress: emailInfo?.emailAddress,
              typeCode:
                email.properties.typeCode.enum[emailInfo?.typeCode || 0],
              primaryFlag: emailInfo?.primaryFlag,
            }}
          >
            <AutoFormSubmit className="float-right">
              {languageData.Save}
            </AutoFormSubmit>
          </AutoForm>
        </SectionLayoutContent>
      </SectionLayout>
    </div>
  );
}
