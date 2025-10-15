"use server";

import {
  getTaxOfficeAddressesByIdApi,
  getTaxOfficeByIdApi,
  getTaxOfficeEmailsByIdApi,
  getTaxOfficeTelephonesByIdApi,
} from "@repo/actions/unirefund/CrmService/actions";
import ErrorComponent from "@repo/ui/components/error-component";
import {FormReadyComponent} from "@repo/ui/form-ready";
import {structuredError} from "@repo/utils/api";
import {auth} from "@repo/utils/auth/next-auth";
import {OctagonAlert} from "lucide-react";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getResourceData} from "src/language-data/unirefund/CRMService";
import {AddressForm} from "../../../_components/contact/address-form";
import {EmailForm} from "../../../_components/contact/email-form";
import {PhoneForm} from "../../../_components/contact/phone-form";
import {TaxOfficeForm} from "./_components/info-form";

async function getApiRequests({partyId}: {partyId: string}) {
  try {
    const session = await auth();
    const requiredRequests = await Promise.all([getTaxOfficeByIdApi(partyId, session)]);
    const optionalRequests = await Promise.allSettled([
      getTaxOfficeTelephonesByIdApi(partyId, session),
      getTaxOfficeEmailsByIdApi(partyId, session),
      getTaxOfficeAddressesByIdApi(partyId, session),
    ]);
    return {requiredRequests, optionalRequests};
  } catch (error) {
    if (!isRedirectError(error)) {
      return structuredError(error);
    }
    throw error;
  }
}

export default async function Page({
  params,
}: {
  params: {
    partyId: string;
    lang: string;
  };
}) {
  const {partyId, lang} = params;
  const {languageData} = await getResourceData(lang);

  const apiRequests = await getApiRequests({partyId});

  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }
  const [taxOfficeDetailResponse] = apiRequests.requiredRequests;
  const [phoneResponse, emailResponse, addressResponse] = apiRequests.optionalRequests;

  return (
    <div className="h-full gap-4 overflow-auto md:grid-cols-2 lg:grid">
      <TaxOfficeForm languageData={languageData} taxOfficeDetails={taxOfficeDetailResponse.data} />
      <div className="flex flex-col gap-4 self-start">
        <FormReadyComponent
          active={phoneResponse.status !== "fulfilled"}
          content={{
            icon: <OctagonAlert className="size-10 text-gray-400" />,
            title: languageData["CRM.Messages.PhonesError.Title"],
            message: languageData["CRM.Messages.PhonesError.Message"],
          }}
          variant="compact">
          <PhoneForm
            languageData={languageData}
            partyType="tax-offices"
            phones={phoneResponse.status === "fulfilled" ? phoneResponse.value.data : []}
          />
        </FormReadyComponent>
        <FormReadyComponent
          active={emailResponse.status !== "fulfilled"}
          content={{
            icon: <OctagonAlert className="size-10 text-gray-400" />,
            title: languageData["CRM.Messages.EmailsError.Title"],
            message: languageData["CRM.Messages.EmailsError.Message"],
          }}
          variant="compact">
          <EmailForm
            emails={emailResponse.status === "fulfilled" ? emailResponse.value.data : []}
            languageData={languageData}
            partyType="tax-offices"
          />
        </FormReadyComponent>
        <FormReadyComponent
          active={addressResponse.status !== "fulfilled"}
          content={{
            icon: <OctagonAlert className="size-10 text-gray-400" />,
            title: languageData["CRM.Messages.AddressesError.Title"],
            message: languageData["CRM.Messages.AddressesError.Message"],
          }}
          variant="compact">
          <AddressForm
            addresses={addressResponse.status === "fulfilled" ? addressResponse.value.data : []}
            languageData={languageData}
            partyType="tax-offices"
          />
        </FormReadyComponent>
      </div>
    </div>
  );
}
