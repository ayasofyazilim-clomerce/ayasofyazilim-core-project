import { Volo_Abp_Http_RemoteServiceErrorResponse } from "@ayasofyazilim/saas/AccountService";
import {
  ApiError,
  Volo_Abp_Identity_IdentityRoleCreateDto,
  Volo_Abp_Identity_IdentityRoleUpdateDto,
} from "@ayasofyazilim/saas/IdentityService";
import { NextRequest } from "next/server";
import { getIdentityServiceClient, getSaasServiceClient } from "src/lib";

type Clients = {
  [key: string]: any;
};

const errorResponse = (message: string, status: number = 400) =>
  new Response(JSON.stringify({ message }), { status: status });

function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

const clients: Clients = {
  Merchants: async (req: NextRequest) => {
    const client = await getIdentityServiceClient(req);
    const role = client.role;
    return {
      get: async () => [
        {
          Company:
            "ARTI BİLGİSAYAR SATIŞ VE EĞİTİM HİZ.İNŞ.MAK.SAN.A.Ş. - Troy Garanti_Galataport AVM.",
          CustomerNumber: "0850025741-60",
          ProductGroups:
            "Books & Magazine, newspaper and periodical publications (0.00%), Bread & Bakery (1.00%), Department stores (10.00%), Marine parts (20.00%)",
          Address:
            "Meclis-i Mebusan Cad., Kılıçalipaşa Mah., Beyoğlu, İstanbul, Turkey, TR15092",
        },
        {
          Company:
            "ARTI BİLGİSAYAR SATIŞ VE EĞİTİM HİZ.İNŞ.MAK.SAN.A.Ş. - Troy_Ankara Gordion AVM.",
          CustomerNumber: "0850025741-66",
          ProductGroups:
            "Books & Magazine, newspaper and periodical publications (0.00%), Bread & Bakery (1.00%), Department stores (10.00%), Marine parts (20.00%)",
          Address:
            "Gordion AVM, Bağlarbaşı Mah., Keçiören, Ankara, Turkey, TR15093",
        },
        {
          Company:
            "ARTI BİLGİSAYAR SATIŞ VE EĞİTİM HİZ.İNŞ.MAK.SAN.A.Ş. - Troy_Eskişehir Espark AVM.",
          CustomerNumber: "0850025741-69",
          ProductGroups:
            "Books & Magazine, newspaper and periodical publications (0.00%), Bread & Bakery (1.00%), Department stores (10.00%), Marine parts (20.00%)",
          Address:
            "Yılmaz Büyükerşen Bulvarı No.21, Z kat, Eskişehir, Turkey, TR15094",
        },
        {
          Company: "ÖZGÜR FOTO TEKNİK İTHALAT İHRACAT TİC.VE SAN.LTD.ŞTİ",
          CustomerNumber: "6930312999",
          ProductGroups:
            "Books & Magazine, newspaper and periodical publications (0.00%), Bread & Bakery (1.00%), Department stores (10.00%), Marine parts (20.00%)",
          Address:
            "1, 1, Kocamustafapaşa Mah., Fatih, İstanbul, Turkey, TR15110",
        },
        {
          Company:
            "ÖZGÜR FOTO TEKNİK İTHALAT İHRACAT TİC.VE SAN.LTD.ŞTİ - Özgur Foto Teknik_Sirkeci",
          CustomerNumber: "902122222222",
          ProductGroups:
            "Books & Magazine, newspaper and periodical publications (0.00%), Bread & Bakery (1.00%), Department stores (10.00%), Marine parts (20.00%)",
          Address:
            "1, 1, Kocamustafapaşa Mah., Fatih, İstanbul, Turkey, TR15111",
        },
        {
          Company: "NİHAN GİYİM SANAYİ VE TİCARET LTD.ŞTİ.",
          CustomerNumber: "8920178795",
          ProductGroups:
            "Books & Magazine, newspaper and periodical publications (0.00%), Bread & Bakery (1.00%), Department stores (10.00%), Marine parts (20.00%)",
          Address:
            "6.Cadde, No:25 B, Ehlibeyt Mah., Çankaya, Ankara, Turkey, TR15194",
        },
      ],

      post: async (requestBody: Volo_Abp_Identity_IdentityRoleCreateDto) =>
        role.postApiIdentityRoles({ requestBody }),
      put: async ({
        id,
        requestBody,
      }: {
        id: string;
        requestBody: Volo_Abp_Identity_IdentityRoleUpdateDto;
      }) => role.putApiIdentityRolesById({ id, requestBody }),
      delete: async (id: string) => role.deleteApiIdentityRolesById({ id }),
    };
  },
  Refund_points: async (req: NextRequest) => {
    const client = await getIdentityServiceClient(req);
    const user = client.user;
    return {
      get: async () => [
        {
          Company:
            "Travelex Döviz Ticaret Yetkili Müessese Anonim Şirketi (assigned to Mehmet Baykam)",
          CustomerNumber: "-",
          ProductGroups: "-",
          Address:
            "TR02822 - http://www.travelex.com.tr\nAntalya Airport Terminal 1, 1\nYenigöl\nMuratpaşa, Antalya\nTurkey",
        },
        {
          Company:
            "Travelex Döviz Ticaret Yetkili Müessese Anonim Şirketi - 5382-AYT-T1 ASD (assigned to Mehmet Baykam)",
          CustomerNumber: "-",
          ProductGroups: "-",
          Address:
            "TR02824 - http://www.travelex.com.tr\nAntalya Terminal 1, 1\nYenigöl\nMuratpaşa, Antalya\nTurkey",
        },
        {
          Company:
            "Travelex Ankara Döviz Ticareti Yetkili Müessese Anonim Şirketi (assigned to Mehmet Baykam)",
          CustomerNumber: "-",
          ProductGroups: "-",
          Address:
            "TR02827 - http://www.travelex.com.tr\nAnkara Airport, 325/3\nBalıkhisar Köyü\nAkyurt, Ankara\nTurkey",
        },
        {
          Company:
            "Travelex Döviz Ticaret Yetkili Müessese Anonim Şirketi - 5389-Kusadasi Egeport (assigned to Mehmet Baykam)",
          CustomerNumber: "-",
          ProductGroups: "-",
          Address:
            "TR02829 - http://www.travelex.com.tr\nKuşadası Egeport, 18\nCamikebir Mah.\nKuşadası, Aydın\nTurkey",
        },
        {
          Company:
            "Travelex Ankara Döviz Ticareti Yetkili Müessese Anonim Şirketi - 5371-IZM-LSD (assigned to Mehmet Baykam)",
          CustomerNumber: "-",
          ProductGroups: "-",
          Address:
            "TR02830 - http://www.travelex.com.tr\nİzmir Airport, 1\nDokuzeylül(9 Eylül) Mah.\nGaziemir, İzmir\nTurkey",
        },
        {
          Company:
            "Travelex Ankara Döviz Ticareti Yetkili Müessese Anonim Şirketi - 5362-ALA-LSA (assigned to Mehmet Baykam)",
          CustomerNumber: "-",
          ProductGroups: "-",
          Address:
            "TR02831 - http://www.travelex.com.tr\nGazipasa Airport, 1\nPaşaköy\nAlanya, Antalya\nTurkey",
        },

        {
          Company:
            "Global Exchange Döviz Ticaret Yetkili Müessese Anonim Şirketi",
          CustomerNumber: "-",
          ProductGroups: "-",
          Address:
            "TR02832 - http://www.globalexchange.com.tr/tr/istanbul\nYenigöl Mahallesi Serik Caddesi, 100/4\nYenigöl\nMuratpaşa, Antalya\nTurkey",
        },
      ],
      post: async (requestBody: any) =>
        user.postApiIdentityUsers({ requestBody }),
      put: async ({ id, requestBody }: { id: string; requestBody: any }) =>
        user.putApiIdentityUsersById({ id, requestBody }),
      delete: async (id: string) => user.deleteApiIdentityUsersById({ id }),
    };
  },
  Customs: async (req: NextRequest) => {
    const client = await getSaasServiceClient(req);
    const edition = client.edition;
    return {
      get: async () => [
        {
          Company: "340900",
          CustomerNumber: "-",
          ProductGroups: "-",
          Address: "TR02855\nTurkey",
        },
        {
          Company: "341454",
          CustomerNumber: "-",
          ProductGroups: "-",
          Address: "TR02961\nTurkey",
        },
        {
          Company: "343200",
          CustomerNumber: "-",
          ProductGroups: "-",
          Address: "TR02963\nTurkey",
        },
        {
          Company: "070200",
          CustomerNumber: "-",
          ProductGroups: "-",
          Address: "TR02983\nTurkey",
        },
        {
          Company: "060200",
          CustomerNumber: "-",
          ProductGroups: "-",
          Address: "TR02992\nTurkey",
        },
        {
          Company: "330900",
          CustomerNumber: "-",
          ProductGroups: "-",
          Address: "TR03191\nTurkey",
        },
        {
          Company: "070400",
          CustomerNumber: "-",
          ProductGroups: "-",
          Address: "TR03471\nTurkey",
        },
        {
          Company: "220200",
          CustomerNumber: "-",
          ProductGroups: "-",
          Address: "TR03494\nTurkey",
        },
        {
          Company: "221300",
          CustomerNumber: "-",
          ProductGroups: "-",
          Address: "TR03574\nTurkey",
        },
        {
          Company: "350700",
          CustomerNumber: "-",
          ProductGroups: "-",
          Address: "TR03610\nTurkey",
        },
      ],
      post: async (requestBody: any) =>
        edition.postApiSaasEditions({ requestBody }),
      put: async ({ id, requestBody }: { id: string; requestBody: any }) =>
        edition.putApiSaasEditionsById({ id, requestBody }),
      delete: async (id: string) => edition.deleteApiSaasEditionsById({ id }),
    };
  },
  Tax_free: async (req: NextRequest) => {
    const client = await getSaasServiceClient(req);
    const tenant = client.tenant;
    return {
      get: async () => [],
      post: async (requestBody: any) =>
        tenant.postApiSaasTenants({ requestBody }),
      put: async ({ id, requestBody }: { id: string; requestBody: any }) =>
        tenant.putApiSaasTenantsById({ id, requestBody }),
      delete: async (id: string) => tenant.deleteApiSaasTenantsById({ id }),
    };
  },
  Tax_offices: async (req: NextRequest) => {
    const client = await getSaasServiceClient(req);
    const tenant = client.tenant;
    return {
      get: async () => [
        {
          Company: "Düzce Vergi Dairesi Müdürlüğü",
          CustomerNumber: "81260",
          ProductGroups: "-",
          Address: "TR14341\nBond Street 233\nTurkey",
        },
        {
          Company: "Osmaniye Vergi Dairesi Müdürlüğü",
          CustomerNumber: "80201",
          ProductGroups: "-",
          Address: "TR14340\nBond Street 232\nTurkey",
        },
        {
          Company: "Kilis Vergi Dairesi Müdürlüğü",
          CustomerNumber: "79201",
          ProductGroups: "-",
          Address: "TR14339\nBond Street 231\nTurkey",
        },
        {
          Company: "Yenice Malmüdürlüğü",
          CustomerNumber: "78105",
          ProductGroups: "-",
          Address: "TR02093\nBond Street 230\nTurkey",
        },
        {
          Company: "Ovacık Malmüdürlüğü",
          CustomerNumber: "78103",
          ProductGroups: "-",
          Address: "TR02699\nBond Street 229\nTurkey",
        },
        {
          Company: "Karabük Vergi Dairesi Müdürlüğü",
          CustomerNumber: "78201",
          ProductGroups: "-",
          Address: "TR14338\nBond Street 228\nTurkey",
        },
        {
          Company: "Yalova Vergi Dairesi Müdürlüğü",
          CustomerNumber: "77201",
          ProductGroups: "-",
          Address: "TR14337\nBond Street 227\nTurkey",
        },
        {
          Company: "Iğdır Vergi Dairesi Müdürlüğü",
          CustomerNumber: "76201",
          ProductGroups: "-",
          Address: "TR14336\nBond Street 226\nTurkey",
        },
        {
          Company: "Ardahan Vergi Dairesi Müdürlüğü",
          CustomerNumber: "75201",
          ProductGroups: "-",
          Address: "TR14335\nBond Street 225\nTurkey",
        },
        {
          Company: "Bartın Vergi Dairesi Müdürlüğü",
          CustomerNumber: "74260",
          ProductGroups: "-",
          Address: "TR14334\nBond Street 224\nTurkey",
        },
      ],
      post: async (requestBody: any) =>
        tenant.postApiSaasTenants({ requestBody }),
      put: async ({ id, requestBody }: { id: string; requestBody: any }) =>
        tenant.putApiSaasTenantsById({ id, requestBody }),
      delete: async (id: string) => tenant.deleteApiSaasTenantsById({ id }),
    };
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { data: string } }
) {
  if (!clients[params.data]) {
    // return status 404
    return errorResponse("Invalid data type");
  }
  const client = await clients[params.data](request);
  try {
    const data = await client.get();
    return new Response(JSON.stringify(data));
  } catch (error: unknown) {
    if (isApiError(error)) {
      console.log(error);
      const body = error?.body as Volo_Abp_Http_RemoteServiceErrorResponse;
      const message = body?.error?.message || error.statusText;
      return errorResponse(message, error.status);
    }
    let errorText = (error as any)?.statusText + " " + (error as any)?.status;
    return errorResponse(errorText, (error as any)?.status);
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { data: string } }
) {
  if (!clients[params.data]) {
    return errorResponse("Invalid data type");
  }
  const client = await clients[params.data](request);
  const requestBody = await request.json();
  try {
    const roles = await client.post(requestBody);
    return new Response(JSON.stringify(roles));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const body = error.body as Volo_Abp_Http_RemoteServiceErrorResponse;
      return errorResponse(
        body.error?.message || "Something went wrong",
        error.status
      );
    }
    return errorResponse("Something went wrong");
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { data: string } }
) {
  if (!clients[params.data]) {
    return errorResponse("Invalid data type");
  }
  let retVal = "something went wrong";
  const client = await clients[params.data](request);
  const id = await request.json();
  const deleteById = await client.delete(id);
  if (deleteById === undefined) retVal = "successfull";
  return new Response(JSON.stringify(retVal));
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { data: string } }
) {
  if (!clients[params.data]) {
    return errorResponse("Invalid data type");
  }
  const client = await clients[params.data](request);
  const requestBody = await request.json();
  try {
    const roles = await client.put({
      id: requestBody.id,
      requestBody: JSON.parse(requestBody.requestBody),
    });
    return new Response(JSON.stringify(roles));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const body = error.body as Volo_Abp_Http_RemoteServiceErrorResponse;
      return errorResponse(
        body.error?.message || "Something went wrong",
        error.status
      );
    }
    return errorResponse("Something went wrong");
  }
}
