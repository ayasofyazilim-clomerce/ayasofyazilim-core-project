import type { NextRequest } from "next/server";
import type {
  UniRefund_CRMService_Customss_CreateCustomsDto,
  UniRefund_CRMService_Merchants_CreateMerchantDto,
  UniRefund_CRMService_RefundPoints_CreateRefundPointDto,
  UniRefund_CRMService_TaxFrees_CreateTaxFreeDto,
  UniRefund_CRMService_TaxOffices_CreateTaxOfficeDto,
} from "@ayasofyazilim/saas/CRMService";
import { getCRMServiceClient } from "src/lib";
import type { Clients } from "../../util";
import { commonDELETE, commonGET, commonPOST, commonPUT } from "../../util";

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
        await merchant.postApiCrmServiceMerchantsWithComponents({
          requestBody:
            formData as UniRefund_CRMService_Merchants_CreateMerchantDto,
        });
      },
      delete: async (id: string) =>
        merchant.deleteApiCrmServiceMerchantsByIdWithComponents({ id }),
    };
  },
  "refund-points": async () => {
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
        await refundPoint.postApiCrmServiceRefundPointsWithComponents({
          requestBody:
            formData as UniRefund_CRMService_RefundPoints_CreateRefundPointDto,
        });
      },
      delete: async (id: string) =>
        refundPoint.deleteApiCrmServiceRefundPointsByIdWithComponents({ id }),
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
        await customs.postApiCrmServiceCustomsWithComponents({
          requestBody:
            formData as UniRefund_CRMService_Customss_CreateCustomsDto,
        });
      },
      delete: async (id: string) =>
        customs.deleteApiCrmServiceCustomsByIdWithComponents({ id }),
    };
  },
  "tax-free": async () => {
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
        await taxFree.postApiCrmServiceTaxFreesWithComponents({
          requestBody:
            formData as UniRefund_CRMService_TaxFrees_CreateTaxFreeDto,
        });
      },
      delete: async (id: string) =>
        taxFree.deleteApiCrmServiceTaxFreesByIdWithComponents({ id }),
    };
  },
  "tax-offices": async () => {
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
        await taxOffices.postApiCrmServiceTaxOfficesWithComponents({
          requestBody:
            formData as UniRefund_CRMService_TaxOffices_CreateTaxOfficeDto,
        });
      },
      delete: async (id: string) =>
        taxOffices.deleteApiCrmServiceTaxOfficesByIdWithComponents({ id }),
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
