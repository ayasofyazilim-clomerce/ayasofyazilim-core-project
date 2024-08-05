"use server";

import type {
  BackerServiceClient,
  PostApiBackerServiceBackersWithComponentsData,
  PutApiBackerServiceBackersData,
} from "@ayasofyazilim/saas/BackerService";
import { revalidatePath } from "next/cache";
import { getBackerServiceClient } from "src/lib";
function populateCustomFormDataPost(formdata: any) {
  const customFormData: PostApiBackerServiceBackersWithComponentsData["requestBody"] =
    {
      entityInformations: [
        {
          partyType: 1,
          organizations: [
            {
              name: formdata.name,
              taxpayerId: formdata.taxpayerId,
              legalStatusCode: formdata.legalStatusCode,
              customerNumber: formdata.customerNumber,
              contactInformation: {
                startDate: "2024-07-04T08:12:58.923Z", //kaldırılacak
                endDate: "2028-07-04T08:12:58.923Z", //kaldırılacak
                telephones: formdata.telephone,
                addresses: [{ ...formdata.address }],
                emails: [
                  {
                    emailAddress: formdata.emailAddress,
                    primaryFlag: true,
                    typeCode: 1,
                  },
                ],
              },
            },
          ],
        },
      ],
      affiliations: [
        {
          name: "string",
          description: "string",
          affiliationTypeCode: 0,
        },
      ],
    };
  return customFormData;
}
function populateCustomFormDataPut(formdata: any) {
  const customFormData: PutApiBackerServiceBackersData["requestBody"] = {
    entityInformations: [
      {
        partyType: 1,
        organizations: [
          {
            name: formdata.name,
            taxpayerId: formdata.taxpayerId,
            legalStatusCode: formdata.legalStatusCode,
            customerNumber: formdata.customerNumber,
            contactInformation: {
              startDate: "2024-07-04T08:12:58.923Z", //kaldırılacak
              endDate: "2028-07-04T08:12:58.923Z", //kaldırılacak
              telephones: formdata.telephone,
              addresses: [{ ...formdata.address }],
              emails: [
                {
                  emailAddress: formdata.emailAddress,
                  primaryFlag: true,
                  typeCode: 1,
                },
              ],
            },
          },
        ],
      },
    ],
    affiliations: [
      {
        id: "string",
        backerId: "string",
        name: "string",
        description: "string",
        affiliationTypeCode: 0,
        partyId: "0",
      },
    ],
  };
  return customFormData;
}
function populateIndividualPost(formdata: any) {
  const customFormData: PostApiBackerServiceBackersWithComponentsData["requestBody"] =
    {
      entityInformations: [
        {
          partyType: 0,
          individuals: [
            {
              name: {
                salutation: formdata.name,
                name: formdata.name,
                suffix: formdata.name,
                mailingName: formdata.name,
                officialName: formdata.name,
              },
              contactInformation: {
                startDate: "2024-07-04T08:12:58.923Z", //kaldırılacak
                endDate: "2028-07-04T08:12:58.923Z", //kaldırılacak
                telephones: formdata.telephone,
                addresses: [{ ...formdata.address }],
                emails: [
                  {
                    emailAddress: formdata.emailAddress,
                    primaryFlag: true,
                    typeCode: 1,
                  },
                ],
              },
              personalSummaries: [
                {
                  date: "2024-07-04T08:12:58.923Z",
                  birthDate: "2024-07-04T08:12:58.923Z",
                  ethnicity: "string",
                  maritalStatusCode: "string",
                  religiousAffiliationName: "string",
                },
              ],
            },
          ],
        },
      ],
      affiliations: [
        {
          name: "string",
          description: "string",
          affiliationTypeCode: 0,
        },
      ],
    };
  return customFormData;
}

export async function postBacker(formdata: any) {
  const client = await getBackerServiceClient();
  let result;
  try {
    result = await client.backer.postApiBackerServiceBackersWithComponents({
      requestBody: populateCustomFormDataPost(formdata),
    });
    revalidatePath("/");
  } catch (e) {
    result = { error: e };
  }

  return result;
}

export async function postIndividual(formdata: any) {
  const client = await getBackerServiceClient();
  let result;
  try {
    result = await client.backer.postApiBackerServiceBackersWithComponents({
      requestBody: populateIndividualPost(formdata),
    });
    revalidatePath("/");
  } catch (e) {
    result = { error: e };
  }
  return result;
}

export interface BackersProps {
  name: string | null | undefined;
  legalStatusCode: string | null | undefined;
  taxpayerId: string | null | undefined;
  backerId: string | undefined;
  customerNumber?: string | null | undefined;
}
export async function getBackers() {
  const returnArray = [];
  try {
    const client = await getBackerServiceClient();
    const result = await client.backer.getApiBackerServiceBackers({
      maxResultCount: 1000,
    });
    const itemsIds = result.items?.map((item) => item.id) || [];
    for (const id of itemsIds) {
      const item = await client.backer.getApiBackerServiceBackersDetailById({
        id: id || "",
      });
      const organization = item.entityInformations?.[0]?.organizations?.[0];
      if (!organization) continue;
      returnArray.push({
        name: organization.name,
        legalStatusCode: organization.legalStatusCode,
        taxpayerId: organization.taxpayerId,
        backerId: id,
      });
    }
  } catch (e) {
    return [] as BackersProps[];
  }
  return returnArray as BackersProps[];
}

export async function deleteBacker(backerId: string) {
  const client = await getBackerServiceClient();
  const result = await client.backer.deleteApiBackerServiceBackers({
    id: backerId,
  });
  revalidatePath("");
  return result;
}

export async function putBacker(backerId: string, formdata: any) {
  const client: BackerServiceClient = await getBackerServiceClient();
  const result = await client.backer.putApiBackerServiceBackers({
    id: backerId,
    requestBody: populateCustomFormDataPut(formdata),
  });
  revalidatePath("/");
  return result;
}

export async function getBacker(profileId: string) {
  const client = await getBackerServiceClient();
  const result = await client.backer.getApiBackerServiceBackersDetailById({
    id: profileId,
  });
  const organizations = result.entityInformations?.[0]?.organizations?.length;
  if (organizations && organizations > 0) {
    const organization = result.entityInformations?.[0]?.organizations?.[0];
    return {
      companyName: organization?.name,
      legalStatusCode: organization?.legalStatusCode,
      taxpayerId: organization?.taxpayerId,
      customerNumber: "not available by backend API",
      emailAddress: organization?.contactInformation?.emails?.[0]?.emailAddress,
      telephone: organization?.contactInformation?.telephones?.[0],
      address: organization?.contactInformation?.addresses?.[0],
      type: "organization",
    };
  }
  const individuals = result.entityInformations?.[0]?.individuals?.length;
  if (individuals && individuals > 0) {
    const individual = result.entityInformations?.[0]?.individuals?.[0];
    return {
      name: individual?.name?.name,
      emailAddress: individual?.contactInformation?.emails?.[0]?.emailAddress,
      telephone: individual?.contactInformation?.telephones?.[0],
      address: individual?.contactInformation?.addresses?.[0],
      type: "individual",
    };
  }
}

export async function getBackersIndividuals() {
  const returnArray = [];
  try {
    const client = await getBackerServiceClient();
    const result = await client.backer.getApiBackerServiceBackers({
      maxResultCount: 1000,
    });
    const itemsIds = result.items?.map((item) => item.id) || [];
    for (const id of itemsIds) {
      const item = await client.backer.getApiBackerServiceBackersDetailById({
        id: id || "",
      });
      const individual = item.entityInformations?.[0]?.individuals?.[0];
      if (!individual) continue;
      returnArray.push({
        name: individual.name?.name,
        legalStatusCode: individual.name?.salutation,
        taxpayerId: individual.name?.id,
        backerId: id,
      });
    }
  } catch (e) {
    return [] as BackersProps[];
  }
  return returnArray;
}
