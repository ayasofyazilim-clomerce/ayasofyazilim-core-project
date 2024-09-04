"use client";

import {
  $UniRefund_TravellerService_AddressTypes_UpdateAddressTypeDto,
  $UniRefund_TravellerService_EmailCommonDatas_UpdateEmailCommonDataDto,
  $UniRefund_TravellerService_NameCommonDatas_CreateNameCommonDataDto,
  $UniRefund_TravellerService_TelephoneTypes_UpdateTelephoneTypeDto,
} from "@ayasofyazilim/saas/TravellerService";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import Link from "next/link";
import type { TravellerServiceResource } from "src/language-data/TravellerService";
import { createZodObject, getBaseLink } from "src/utils";

const generalInformationSchema = createZodObject(
  $UniRefund_TravellerService_NameCommonDatas_CreateNameCommonDataDto,
  ["mailingName", "name", "officialName", "salutation", "suffix"],
);
const emailSchema = createZodObject(
  $UniRefund_TravellerService_EmailCommonDatas_UpdateEmailCommonDataDto,
  ["emailAddress", "id", "primaryFlag", "typeCode"],
);
const telephoneSchema = createZodObject(
  $UniRefund_TravellerService_TelephoneTypes_UpdateTelephoneTypeDto,
  [
    "areaCode",
    "id",
    "ituCountryCode",
    "localNumber",
    "primaryFlag",
    "typeCode",
  ],
);
const addressSchema = createZodObject(
  $UniRefund_TravellerService_AddressTypes_UpdateAddressTypeDto,
  [
    "addressLine",
    "city",
    "country",
    "fullAddress",
    "id",
    "postalCode",
    "primaryFlag",
    "terriority",
    "typeCode",
  ],
);

const generalInformationData = {
  mailingName: "test",
  name: "test",
  officialName: "test",
  salutation: "test",
  suffix: "test",
};
const emailData = {
  emailAddress: "test@asd.com",
  id: "test",
  primaryFlag: true,
  typeCode: "0",
};
const telephoneData = {
  areaCode: "test",
  id: "test",
  ituCountryCode: "TR",
  localNumber: "5555555555",
  primaryFlag: true,
  typeCode: "0",
};
const addressData = {
  addressLine: "test",
  city: "test",
  country: "test",
  fullAddress: "test",
  id: "test",
  postalCode: "test",
  primaryFlag: true,
  terriority: "test",
  typeCode: "0",
};
export default function Form({
  travellerId,
  languageData,
}: {
  travellerId: string;
  languageData: TravellerServiceResource;
}) {
  return (
    <>
      <PageHeader
        LinkElement={Link}
        description={languageData.TravellerDescription}
        href={getBaseLink("app/admin/traveller")}
        title={`${languageData.TravellerDetail} - ${travellerId}`}
      />

      <SectionLayout
        defaultActiveSectionId="general"
        sections={[
          { name: languageData.PersonalInformation, id: "general" },
          { name: languageData.EmailInformation, id: "email" },
          { name: languageData.TelephoneInformation, id: "telephone" },
          { name: languageData.AddressInformation, id: "address" },
        ]}
        vertical
      >
        <SectionLayoutContent sectionId="general">
          <AutoForm
            formClassName="border-0"
            formSchema={generalInformationSchema}
            onSubmit={() => {
              //void submitFormData(formData);
            }}
            values={generalInformationData}
          >
            <AutoFormSubmit>
              <>{languageData.Save}</>
            </AutoFormSubmit>
          </AutoForm>
        </SectionLayoutContent>
        <SectionLayoutContent sectionId="email">
          <AutoForm
            formClassName="border-0"
            formSchema={emailSchema}
            onSubmit={() => {
              //void submitFormData(formData);
            }}
            values={emailData}
          >
            <AutoFormSubmit>
              <>{languageData.Save}</>
            </AutoFormSubmit>
          </AutoForm>
        </SectionLayoutContent>
        <SectionLayoutContent sectionId="telephone">
          <AutoForm
            formClassName="border-0"
            formSchema={telephoneSchema}
            onSubmit={() => {
              //void submitFormData(formData);
            }}
            values={telephoneData}
          >
            <AutoFormSubmit>
              <>{languageData.Save}</>
            </AutoFormSubmit>
          </AutoForm>
        </SectionLayoutContent>
        <SectionLayoutContent sectionId="address">
          <AutoForm
            formClassName="border-0"
            formSchema={addressSchema}
            onSubmit={() => {
              //void submitFormData(formData);
            }}
            values={addressData}
          >
            <AutoFormSubmit>
              <>{languageData.Save}</>
            </AutoFormSubmit>
          </AutoForm>
        </SectionLayoutContent>
      </SectionLayout>
    </>
  );
}
