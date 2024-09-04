/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument -- TODO: we need to fix this*/
import type { NextRequest } from "next/server";
import { getSettingServiceClient } from "src/lib";
import type { Clients } from "../../util";
import { commonDELETE, commonGET, commonPOST, commonPUT } from "../../util";

const clients: Clients = {
  vats: async () => {
    const client = await getSettingServiceClient();
    const vats = client.vat;
    return {
      get: async (page: number, filter, _maxResultCount: any) => {
        const maxResultCount = Number(_maxResultCount) || 10;
        return vats.getApiSettingServiceVatDetail({
          maxResultCount: maxResultCount || 10,
          skipCount: page * 10,
        });
      },
      post: async (requestBody: any) =>
        vats.postApiSettingServiceVat({ requestBody }),
      put: async ({ id, requestBody }: { id: string; requestBody: any }) => {
        return vats.putApiSettingServiceVatById({
          id,
          requestBody,
        });
      },
      delete: async (id: string) => vats.deleteApiSettingServiceVatById({ id }),
    };
  },
  productGroups: async () => {
    const client = await getSettingServiceClient();
    const productGroups = client.productGroup;
    return {
      get: (page: number, _filter: string, args) => {
        const _args = (args as number) || 10;
        return productGroups.getApiSettingServiceProductGroup({
          maxResultCount: _args,
          skipCount: page * 10,
        });
      },
      post: async (requestBody: any) =>
        productGroups.postApiSettingServiceProductGroup({ requestBody }),
      put: async (data: any) => {
        data.requestBody.id = data.id;
        return productGroups.putApiSettingServiceProductGroupById(data);
      },
      delete: async (id: string) =>
        productGroups.deleteApiSettingServiceProductGroupById({ id }),
    };
  },

  productGroupsVats: async () => {
    const client = await getSettingServiceClient();
    const productGroupVats = client.productGroupVat;
    return {
      get: (page: number) =>
        productGroupVats.getApiSettingServiceProductGroupVatDetail({
          maxResultCount: 10,
          skipCount: page * 10,
        }),
      post: async (requestBody: any) =>
        productGroupVats.postApiSettingServiceProductGroupVat({ requestBody }),
      put: async (data: any) => {
        data.requestBody.id = data.id;
        return productGroupVats.putApiSettingServiceProductGroupVatById(data);
      },
      delete: async (id: string) =>
        productGroupVats.deleteApiSettingServiceProductGroupVatById({ id }),
    };
  },

  country: async () => {
    await getSettingServiceClient();
    return {
      get: () =>
        Promise.resolve([
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            name: "Turkey",
          },
        ]),
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
