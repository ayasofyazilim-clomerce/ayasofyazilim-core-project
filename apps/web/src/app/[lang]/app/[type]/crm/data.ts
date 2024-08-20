/* eslint-disable @typescript-eslint/no-explicit-any -- TODO: we need to fix this*/
import {
  $UniRefund_CRMService_Merchants_MerchantProfileDto,
  $UniRefund_CRMService_Merchants_CreateMerchantDto,
  $UniRefund_CRMService_RefundPoints_CreateRefundPointDto,
  $UniRefund_CRMService_RefundPoints_RefundPointDto,
  $UniRefund_CRMService_Customss_CreateCustomsDto,
  $UniRefund_CRMService_Customss_CustomsProfileDto,
  $UniRefund_CRMService_TaxFrees_CreateTaxFreeDto,
  $UniRefund_CRMService_TaxFrees_TaxFreeProfileDto,
  $UniRefund_CRMService_TaxOffices_CreateTaxOfficeDto,
  $UniRefund_CRMService_TaxOffices_TaxOfficeProfileDto,
} from "@ayasofyazilim/saas/CRMService";

export const dataConfigOfCrm: Record<string, any> = {
  companies: {
    displayName: "Companies",
    default: "merchants",
    merchants: {
      title: "Merchants",
      createFormSchema: {
        formPositions: Object.keys(
          $UniRefund_CRMService_Merchants_CreateMerchantDto.properties
            .entityInformationTypes.items.properties.organizations.items
            .properties,
        ),
        schema:
          $UniRefund_CRMService_Merchants_CreateMerchantDto.properties
            .entityInformationTypes.items.properties.organizations.items,
      },
      // editFormSchema: {
      //   formPositions: ["percent", "minimumTotalAmount", "countryId", "active"],
      //   schema: $UniRefund_SettingService_Vats_UpdateVatDto,
      //   convertors: {
      //     countryId: {
      //       data: () => {
      //         return fetch(getBaseLink("api/management/country")).then((data) =>
      //           data.json(),
      //         );
      //       },
      //       get: "name",
      //       post: "id",
      //       type: "async",
      //     },
      //   },
      // },
      tableSchema: {
        excludeList: ["id"],
        schema: $UniRefund_CRMService_Merchants_MerchantProfileDto,
      },
    },
    refundPoints: {
      title: "Refund Points",
      createFormSchema: {
        formPositions: [
          "name",
          "articleCode",
          "unitCode",
          "companyType",
          "nonFood",
          "active",
          "food",
        ],
        schema: $UniRefund_CRMService_RefundPoints_CreateRefundPointDto,
      },
      // editFormSchema: {
      //   formPositions: [
      //     "name",
      //     "articleCode",
      //     "unitCode",
      //     "companyType",
      //     "nonFood",
      //     "active",
      //     "food",
      //   ],
      //   schema: $UniRefund_SettingService_ProductGroups_UpdateProductGroupDto,
      // },
      tableSchema: {
        excludeList: ["id"],
        schema: $UniRefund_CRMService_RefundPoints_RefundPointDto,
      },
    },
    customs: {
      title: "Customs",
      filterBy: "",
      createFormSchema: {
        formPositions: ["productGroupId", "countryId", "vatId", "active"],
        schema: $UniRefund_CRMService_Customss_CreateCustomsDto,
      },
      // editFormSchema: {
      //   formPositions: ["productGroupId", "countryId", "vatId", "active"],
      //   schema:
      //     $UniRefund_SettingService_ProductGroupVats_UpdateProductGroupVatDto,
      // },
      tableSchema: {
        excludeList: ["id"],
        schema: $UniRefund_CRMService_Customss_CustomsProfileDto,
      },
    },
    taxFree: {
      title: "Tax Free",
      filterBy: "",
      createFormSchema: {
        formPositions: ["productGroupId", "countryId", "vatId", "active"],
        schema: $UniRefund_CRMService_TaxFrees_CreateTaxFreeDto,
      },
      // editFormSchema: {
      //   formPositions: ["productGroupId", "countryId", "vatId", "active"],
      //   schema:
      //     $UniRefund_SettingService_ProductGroupVats_UpdateProductGroupVatDto,
      // },
      tableSchema: {
        excludeList: ["id"],
        schema: $UniRefund_CRMService_TaxFrees_TaxFreeProfileDto,
      },
    },
    taxOffices: {
      title: "Tax Offices",
      filterBy: "",
      createFormSchema: {
        formPositions: ["productGroupId", "countryId", "vatId", "active"],
        schema: $UniRefund_CRMService_TaxOffices_CreateTaxOfficeDto,
      },
      // editFormSchema: {
      //   formPositions: ["productGroupId", "countryId", "vatId", "active"],
      //   schema:
      //     $UniRefund_SettingService_ProductGroupVats_UpdateProductGroupVatDto,
      // },
      tableSchema: {
        excludeList: ["id"],
        schema: $UniRefund_CRMService_TaxOffices_TaxOfficeProfileDto,
      },
    },
  },
};
