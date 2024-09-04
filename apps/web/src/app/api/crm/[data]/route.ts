import type { NextRequest } from "next/server";
import type { PostApiCrmServiceMerchantsWithComponentsData } from "@ayasofyazilim/saas/CRMService";
import type { CreateMerchants } from "src/app/[lang]/app/[type]/crm/[domain]/[data]/(alternative)/new/page";
import { getCRMServiceClient } from "src/lib";
import type { Clients } from "../../util";
import { commonDELETE, commonGET, commonPOST, commonPUT } from "../../util";

function createRequestBody(
  formData: CreateMerchants,
): PostApiCrmServiceMerchantsWithComponentsData {
  return {
    requestBody: {
      entityInformationTypes: [
        {
          organizations: [
            {
              name: formData.organization.name,
              taxpayerId: formData.organization.taxpayerId,
              legalStatusCode: formData.organization.legalStatusCode,
              customerNumber: formData.organization.customerNumber,
              contactInformations: [
                {
                  telephones: [
                    {
                      areaCode: formData.telephone.areaCode,
                      localNumber: formData.telephone.localNumber,
                      ituCountryCode: formData.telephone.ituCountryCode,
                      primaryFlag: true,
                      typeCode: formData.telephone.typeCode,
                    },
                  ],
                  addresses: [
                    {
                      addressLine: formData.address.addressLine,
                      city: formData.address.city,
                      terriority: formData.address.terriority,
                      postalCode: formData.address.postalCode,
                      country: formData.address.country,
                      fullAddress: formData.address.fullAddress,
                      primaryFlag: true,
                      typeCode: formData.address.typeCode,
                    },
                  ],
                  emails: [
                    {
                      emailAddress: formData.email.emailAddress,
                      primaryFlag: true,
                      typeCode: formData.email.typeCode,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  };
}

const clients: Clients = {
  merchants: async () => {
    const client = await getCRMServiceClient();
    const merchant = client.merchant;
    return {
      get: async (page: number, filter, _maxResultCount: unknown) => {
        const maxResultCount = Number(_maxResultCount) || 10;
        return merchant.getApiCrmServiceMerchants({
          maxResultCount: maxResultCount || 10,
          skipCount: page * 10,
        });
      },
      post: async (formData: unknown) => {
        await merchant.postApiCrmServiceMerchantsWithComponents(
          createRequestBody(formData as CreateMerchants),
        );
      },

      delete: async (id: string) =>
        merchant.deleteApiCrmServiceMerchantsWithComponentsById({ id }),
    };
  },
  refundPoints: async () => {
    const client = await getCRMServiceClient();
    const refundPoint = client.refundPoint;
    return {
      get: async (page: number, filter, _maxResultCount: unknown) => {
        const maxResultCount = Number(_maxResultCount) || 10;
        return refundPoint.getApiCrmServiceRefundPoints({
          maxResultCount: maxResultCount || 10,
          skipCount: page * 10,
        });
      },
      post: async (formData: unknown) => {
        await refundPoint.postApiCrmServiceRefundPointsWithComponents(
          createRequestBody(formData as CreateMerchants),
        );
      },
      delete: async (id: string) =>
        refundPoint.deleteApiCrmServiceRefundPointsWithComponentsById({ id }),
    };
  },
  customs: async () => {
    const client = await getCRMServiceClient();
    const customs = client.customs;
    return {
      get: async (page: number, filter, _maxResultCount: unknown) => {
        const maxResultCount = Number(_maxResultCount) || 10;
        return customs.getApiCrmServiceCustoms({
          maxResultCount: maxResultCount || 10,
          skipCount: page * 10,
        });
      },
      post: async (formData: unknown) => {
        await customs.postApiCrmServiceCustomsWithComponents(
          createRequestBody(formData as CreateMerchants),
        );
      },
      delete: async (id: string) =>
        customs.deleteApiCrmServiceCustomsWithComponentsById({ id }),
    };
  },
  taxFree: async () => {
    const client = await getCRMServiceClient();
    const taxFree = client.taxFree;
    return {
      get: async (page: number, filter, _maxResultCount: unknown) => {
        const maxResultCount = Number(_maxResultCount) || 10;
        return taxFree.getApiCrmServiceTaxFrees({
          maxResultCount: maxResultCount || 10,
          skipCount: page * 10,
        });
      },
      post: async (formData: unknown) => {
        await taxFree.postApiCrmServiceTaxFreesWithComponents(
          createRequestBody(formData as CreateMerchants),
        );
      },
      delete: async (id: string) =>
        taxFree.deleteApiCrmServiceTaxFreesWithComponentsById({ id }),
    };
  },
  taxOffices: async () => {
    const client = await getCRMServiceClient();
    const taxOffices = client.taxOffice;
    return {
      get: async (page: number, filter, _maxResultCount: unknown) => {
        const maxResultCount = Number(_maxResultCount) || 10;
        return taxOffices.getApiCrmServiceTaxOffices({
          maxResultCount: maxResultCount || 10,
          skipCount: page * 10,
        });
      },
      post: async (formData: unknown) => {
        await taxOffices.postApiCrmServiceTaxOfficesWithComponents(
          createRequestBody(formData as CreateMerchants),
        );
      },
      delete: async (id: string) =>
        taxOffices.deleteApiCrmServiceTaxOfficesWithComponentsById({ id }),
    };
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { data: string } },
) {
  return commonGET(request, { params }, clients);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { data: string } },
) {
  return commonPOST(request, { params }, clients);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { data: string } },
) {
  return commonDELETE(request, { params }, clients);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { data: string } },
) {
  return commonPUT(request, { params }, clients);
}
