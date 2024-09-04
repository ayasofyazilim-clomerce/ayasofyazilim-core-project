/* eslint-disable @typescript-eslint/no-explicit-any -- TODO: we need to fix this*/
import type {
  GetApiSettingServiceProductGroupResponse,
  GetApiSettingServiceVatDetailResponse,
} from "@ayasofyazilim/saas/SettingService";
import {
  $UniRefund_SettingService_ProductGroups_CreateProductGroupDto,
  $UniRefund_SettingService_ProductGroups_ProductGroupDto,
  $UniRefund_SettingService_ProductGroups_UpdateProductGroupDto,
  $UniRefund_SettingService_ProductGroupVats_CreateProductGroupVatDto,
  $UniRefund_SettingService_ProductGroupVats_ProductGroupVatDetailDto,
  $UniRefund_SettingService_ProductGroupVats_UpdateProductGroupVatDto,
  $UniRefund_SettingService_Vats_CreateVatDto,
  $UniRefund_SettingService_Vats_UpdateVatDto,
  $UniRefund_SettingService_Vats_VatDetailDto,
} from "@ayasofyazilim/saas/SettingService";
import { getBaseLink } from "src/utils";

const settingsCovnertor = {
  unitCode: {
    data: ["Qnt", "Bag", "Box"],
    type: "enum",
  },
  companyType: {
    data: [
      "Government",
      "Tax free",
      "Customs",
      "Refund point",
      "Merchant",
      "Exchange",
      "Tour guide",
    ],
    type: "enum",
  },
};

export const dataConfigOfManagement: Record<string, any> = {
  setting: {
    displayName: "VATSettings",
    default: "vats",
    vats: {
      title: "Vat",
      createFormSchema: {
        formPositions: ["percent", "minimumTotalAmount", "countryId", "active"],
        schema: $UniRefund_SettingService_Vats_CreateVatDto,
        convertors: {
          countryId: {
            data: () => {
              return fetch(getBaseLink("api/management/country")).then(
                (_data) => _data.json(),
              );
            },
            get: "name",
            post: "id",
            type: "async",
          },
        },
      },
      editFormSchema: {
        formPositions: ["percent", "minimumTotalAmount", "active"],
        schema: $UniRefund_SettingService_Vats_UpdateVatDto,
      },
      tableSchema: {
        excludeList: [
          "id",
          "creationTime",
          "creatorId",
          "lastModificationTime",
          "lastModifierId",
          "isDeleted",
          "deleterId",
          "deletionTime",
          "countryId",
        ],
        schema: $UniRefund_SettingService_Vats_VatDetailDto,
      },
    },
    productGroups: {
      title: "Product Group",
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
        schema: $UniRefund_SettingService_ProductGroups_CreateProductGroupDto,
        convertors: {
          ...settingsCovnertor,
        },
      },
      editFormSchema: {
        formPositions: [
          "name",
          "articleCode",
          "unitCode",
          "companyType",
          "nonFood",
          "active",
          "food",
        ],
        schema: $UniRefund_SettingService_ProductGroups_UpdateProductGroupDto,
        convertors: { ...settingsCovnertor },
      },
      tableSchema: {
        excludeList: [
          "id",
          "creationTime",
          "creatorId",
          "lastModificationTime",
          "lastModifierId",
          "isDeleted",
          "deleterId",
          "deletionTime",
          "language",
        ],
        schema: $UniRefund_SettingService_ProductGroups_ProductGroupDto,
        convertors: {
          ...settingsCovnertor,
        },
      },
    },
    productGroupsVats: {
      title: "Product Group VAT",
      filterBy: "",
      createFormSchema: {
        formPositions: ["productGroupId", "countryId", "vatId", "active"],
        schema:
          $UniRefund_SettingService_ProductGroupVats_CreateProductGroupVatDto,
        convertors: {
          productGroupId: {
            data: () => {
              return fetch(
                getBaseLink("api/management/productGroups?maxResultCount=1000"),
              )
                .then((data) => data.json())
                .then(
                  (jsonData: GetApiSettingServiceProductGroupResponse) =>
                    jsonData.items,
                );
            },
            get: "name",
            post: "id",
            type: "async",
          },
          vatId: {
            data: () => {
              return fetch(
                getBaseLink("api/management/vats?maxResultCount=1000"),
              )
                .then((data) => data.json())
                .then(
                  (jsonData: GetApiSettingServiceVatDetailResponse) =>
                    jsonData.items,
                );
            },
            get: "percent",
            post: "id",
            type: "async",
          },
          countryId: {
            data: () => {
              return fetch(getBaseLink("api/management/country")).then((data) =>
                data.json(),
              );
            },
            get: "name",
            post: "id",
            type: "async",
          },
        },
      },
      editFormSchema: {
        formPositions: ["active"],
        schema:
          $UniRefund_SettingService_ProductGroupVats_UpdateProductGroupVatDto,
      },
      tableSchema: {
        excludeList: [
          "id",
          "creationTime",
          "creatorId",
          "lastModificationTime",
          "lastModifierId",
          "isDeleted",
          "deleterId",
          "deletionTime",
          "productGroupId",
          "countryId",
          "vatId",
        ],
        schema:
          $UniRefund_SettingService_ProductGroupVats_ProductGroupVatDetailDto,
      },
    },
  },
};
