import {
  // $UniRefund_CRMService_Customss_CreateCustomsDto,
  // $UniRefund_CRMService_Merchants_CreateMerchantDto,
  // $UniRefund_CRMService_RefundPoints_CreateRefundPointDto,
  // $UniRefund_CRMService_TaxOffices_CreateTaxOfficeDto,
  // $UniRefund_CRMService_TaxFrees_CreateTaxFreeDto,
  $UniRefund_CRMService_Merchants_MerchantProfileDto,
  $UniRefund_CRMService_Customss_CustomsProfileDto,
  $UniRefund_CRMService_TaxFrees_TaxFreeProfileDto,
  $UniRefund_CRMService_TaxOffices_TaxOfficeProfileDto,
  $UniRefund_CRMService_Merchants_RefundPointProfileDto,
  $UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto,
  $UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto,
  // $UniRefund_CRMService_Organizations_CreateOrganizationDto,
  $UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto,
} from "@ayasofyazilim/saas/CRMService";
import type { TableData } from "src/utils";

interface DataConfig {
  displayName: string;
  default: string;
  pages: Record<string, TableData>;
}

const organizationScheme = {
  required: ["legalStatusCode", "name", "taxpayerId"],
  type: "object",
  properties: {
    extraProperties: {
      type: "object",
      additionalProperties: {},
      nullable: true,
      readOnly: true,
    },
    name: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    taxpayerId: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    legalStatusCode: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    customerNumber: {
      type: "string",
      nullable: true,
    },
  },
} as const;

const formSubPositions = {
  telephone: ["localNumber", "typeCode"],
  address: [
    "country",
    "terriority",
    "city",
    "postalCode",
    "addressLine",
    "fullAddress",
    "typeCode",
  ],
  email: ["emailAddress", "typeCode"],
};

const organization = organizationScheme;
const telephone = $UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto;
const address = $UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto;
const email = $UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto;

const createScheme = {
  type: "object",
  properties: {
    organization,
    telephone,
    address,
    email,
  },
};

export const dataConfigOfCrm: Record<string, DataConfig> = {
  companies: {
    displayName: "Companies",
    default: "merchants",
    pages: {
      merchants: {
        title: "Merchants",
        createFormSchema: {
          schema: createScheme,
          formPositions: ["organization", "telephone", "address", "email"],
          formSubPositions,
        },
        tableSchema: {
          excludeList: [
            "id",
            "organizationId",
            "individualId",
            "parentCompanyId",
          ],
          schema: $UniRefund_CRMService_Merchants_MerchantProfileDto,
        },
      },
      refundPoints: {
        title: "Refund Points",
        createFormSchema: {
          schema: createScheme,
          formPositions: ["organization", "telephone", "address", "email"],
          formSubPositions,
        },

        tableSchema: {
          excludeList: ["id", "organizationId", "individualId"],
          schema: $UniRefund_CRMService_Merchants_RefundPointProfileDto,
        },
      },
      customs: {
        title: "Customs",
        filterBy: "",
        createFormSchema: {
          schema: createScheme,
          formPositions: ["organization", "telephone", "address", "email"],
          formSubPositions,
        },

        tableSchema: {
          excludeList: ["id", "organizationId"],
          schema: $UniRefund_CRMService_Customss_CustomsProfileDto,
        },
      },
      taxFree: {
        title: "Tax Free",
        filterBy: "",
        createFormSchema: {
          schema: createScheme,
          formPositions: ["organization", "telephone", "address", "email"],
          formSubPositions,
        },

        tableSchema: {
          excludeList: ["id", "organizationId"],
          schema: $UniRefund_CRMService_TaxFrees_TaxFreeProfileDto,
        },
      },
      taxOffices: {
        title: "Tax Offices",
        filterBy: "",
        createFormSchema: {
          schema: createScheme,
          formPositions: ["organization", "telephone", "address", "email"],
          formSubPositions,
        },

        tableSchema: {
          excludeList: ["id", "organizationId"],
          schema: $UniRefund_CRMService_TaxOffices_TaxOfficeProfileDto,
        },
      },
    },
  },
};
