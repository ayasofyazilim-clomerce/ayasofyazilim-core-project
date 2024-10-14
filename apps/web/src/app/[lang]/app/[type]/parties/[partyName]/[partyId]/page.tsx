"use server";

import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { getResourceData } from "src/language-data/CRMService";
import { getCities } from "../../../action";
import { dataConfigOfParties } from "../../table-data";
import type { PartyNameType } from "../../types";
import { getPartyDetail, getPartyTableData } from "../action";
import Address from "./address/form";
import Email from "./email/form";
import Individual from "./individuals-table/form";
import MerchantForm from "./merchant/form";
import NameForm from "./name/form";
import OrganizationForm from "./organization/form";
import PersonalSummariesForm from "./personal-summaries/form";
import SubCompany from "./subcompanies-table/form";
import Telephone from "./telephone/form";

export default async function Page({
  params,
}: {
  params: {
    partyId: string;
    partyName: PartyNameType;
    lang: string;
  };
}) {
  const { languageData } = await getResourceData(params.lang);
  const formData = dataConfigOfParties[params.partyName];
  const taxOffices = await getPartyTableData("tax-offices", 0, 100);

  if (params.partyName === "individuals") {
    return <></>;
  }

  const partyDetail = await getPartyDetail(params.partyName, params.partyId);
  const cities = await getCities({ maxResultCount: 500, sorting: "name" });

  if (
    partyDetail.type !== "success" ||
    !partyDetail.data ||
    cities.type !== "success" ||
    !("entityInformations" in partyDetail.data) ||
    taxOffices.type !== "success"
  ) {
    return <>Not found</>;
  }

  const partyDetailData = partyDetail.data;

  const organizationData =
    partyDetailData.entityInformations?.[0]?.organizations?.[0];

  const individualData =
    partyDetailData.entityInformations?.[0]?.individuals?.[0];

  if (!organizationData && !individualData) {
    return <>Not found org</>;
  }

  const sections = [
    { name: languageData.Telephone, id: "telephone" },
    { name: languageData.Address, id: "address" },
    { name: languageData.Email, id: "email" },
    { name: languageData[formData.subEntityName], id: "SubCompany" },
    { name: languageData.Individuals, id: "individuals" },
  ];

  if (organizationData) {
    sections.unshift({
      name: languageData["Parties.Organization"],
      id: "organization",
    });
  } else {
    sections.unshift({
      name: languageData.PersonalSummaries,
      id: "personal-summaries",
    });
    sections.unshift({ name: languageData.Name, id: "name" });
  }
  if (params.partyName === "merchants") {
    sections.unshift({
      name: languageData.Merchants,
      id: "merchant-base",
    });
  }

  const citiesEnum =
    cities.data.items?.map((item) => ({
      name: item.name || "",
      id: item.id || "",
    })) || [];
  const taxOfficesEnum =
    taxOffices.data.items?.map((item) => ({
      name: item.name || "",
      id: item.id || "",
    })) || [];

  return (
    <>
      <div className="h-full overflow-hidden">
        <SectionLayout sections={sections} vertical>
          {params.partyName === "merchants" &&
            "taxOfficeId" in partyDetailData && (
              <MerchantForm
                languageData={languageData}
                merchantData={partyDetailData}
                partyId={params.partyId}
                partyName={params.partyName}
                taxOfficesEnum={taxOfficesEnum}
              />
            )}

          {organizationData ? (
            <OrganizationForm
              languageData={languageData}
              organizationData={organizationData}
              organizationId={organizationData.id || ""}
              partyId={params.partyId}
              partyName={params.partyName}
            />
          ) : null}

          {params.partyName === "merchants" && individualData ? (
            <>
              <NameForm
                individualData={individualData.name}
                languageData={languageData}
                partyId={params.partyId}
                partyName={params.partyName}
              />
              <PersonalSummariesForm
                individualData={individualData.personalSummaries?.[0]}
                languageData={languageData}
                partyId={params.partyId}
                partyName={params.partyName}
              />
            </>
          ) : null}

          <Telephone
            languageData={languageData}
            organizationData={organizationData || individualData}
            partyId={params.partyId}
            partyName={params.partyName}
          />

          <Address
            citiesEnum={citiesEnum}
            languageData={languageData}
            organizationData={organizationData || individualData}
            partyId={params.partyId}
            partyName={params.partyName}
          />

          <Email
            languageData={languageData}
            organizationData={organizationData || individualData}
            partyId={params.partyId}
            partyName={params.partyName}
          />
          <SubCompany
            languageData={languageData}
            partyId={params.partyId}
            partyName={params.partyName}
          />
          <Individual
            languageData={languageData}
            partyId={params.partyId}
            partyName={params.partyName}
          />
        </SectionLayout>
      </div>
      <div className="hidden" id="page-title">
        {`${languageData[formData.translationKey]} (${partyDetailData.entityInformations?.[0]?.organizations?.[0]?.name || individualData?.name?.name})`}
      </div>
    </>
  );
}
