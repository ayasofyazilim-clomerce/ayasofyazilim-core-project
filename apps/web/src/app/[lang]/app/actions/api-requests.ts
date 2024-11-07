"use server";

import type {
  GetApiContractServiceMerchantsByIdContractsContractHeadersData,
  PostApiContractServiceMerchantsByIdContractsContractHeadersData,
} from "@ayasofyazilim/saas/ContractService";
import type {
  GetApiCrmServiceCustomsData,
  GetApiCrmServiceIndividualsData,
  GetApiCrmServiceMerchantsData,
  GetApiCrmServiceTaxOfficesData,
  PostApiCrmServiceCustomsByIdAffiliationsData,
  PostApiCrmServiceMerchantsByIdAffiliationsData,
  PostApiCrmServiceRefundPointsByIdAffiliationsData,
  PostApiCrmServiceTaxFreesByIdAffiliationsData,
  PostApiCrmServiceTaxOfficesByIdAffiliationsData,
  PutApiCrmServiceCustomsByIdEmailsByEmailIdData,
  PutApiCrmServiceCustomsByIdOrganizationsByOrganizationIdData,
  PutApiCrmServiceCustomsByIdTelephonesByTelephoneIdData,
  PutApiCrmServiceMerchantsByIdAddressesByAddressIdData,
  PutApiCrmServiceMerchantsByIdData,
  PutApiCrmServiceMerchantsByIdEmailsByEmailIdData,
  PutApiCrmServiceMerchantsByIdIndividualByIndividualIdNameByNameIdData,
  PutApiCrmServiceMerchantsByIdIndividualByIndividualIdPersonalSummaryByPersonalSummaryIdData,
  PutApiCrmServiceMerchantsByIdOrganizationsByOrganizationIdData,
  PutApiCrmServiceMerchantsByIdTelephonesByTelephoneIdData,
  PutApiCrmServiceRefundPointsByIdEmailsByEmailIdData,
  PutApiCrmServiceRefundPointsByIdOrganizationsByOrganizationIdData,
  PutApiCrmServiceRefundPointsByIdTelephonesByTelephoneIdData,
  PutApiCrmServiceTaxFreesByIdEmailsByEmailIdData,
  PutApiCrmServiceTaxFreesByIdOrganizationsByOrganizationIdData,
  PutApiCrmServiceTaxFreesByIdTelephonesByTelephoneIdData,
  PutApiCrmServiceTaxOfficesByIdEmailsByEmailIdData,
  PutApiCrmServiceTaxOfficesByIdOrganizationsByOrganizationIdData,
} from "@ayasofyazilim/saas/CRMService";
import type {
  GetApiExportValidationServiceExportValidationData,
  PostApiExportValidationServiceExportValidationData,
  PutApiExportValidationServiceExportValidationByIdData,
} from "@ayasofyazilim/saas/ExportValidationService";
import type {
  GetApiIdentityClaimTypesData,
  GetApiIdentityRolesByIdClaimsData,
  GetApiIdentityRolesData,
  GetApiIdentityUsersByIdClaimsData,
  GetApiIdentityUsersData,
  PutApiIdentityRolesByIdClaimsData,
  PutApiIdentityRolesByIdMoveAllUsersData,
  PutApiIdentityUsersByIdClaimsData,
} from "@ayasofyazilim/saas/IdentityService";
import type {
  GetApiLocationServiceCitiesData,
  GetApiLocationServiceCitiesGetListByRegionByRegionIdData,
  GetApiLocationServiceCountriesData,
  GetApiLocationServiceRegionsGetDefaultRegionIdByCountryIdData,
  GetApiLocationServiceRegionsGetListByCountryByCountryIdData,
} from "@ayasofyazilim/saas/LocationService";
import type { GetApiTagServiceTagData } from "@ayasofyazilim/saas/TagService";
import type {
  GetApiTravellerServiceTravellersData,
  PostApiTravellerServiceTravellersData,
} from "@ayasofyazilim/saas/TravellerService";
import type { FilterColumnResult } from "@repo/ayasofyazilim-ui/molecules/tables/types";
import {
  getContractServiceClient,
  getCRMServiceClient,
  getExportValidationServiceClient,
  getIdentityServiceClient,
  getLocationServiceClient,
  getTagServiceClient,
  getTravellersServiceClient,
  structuredError,
} from "src/lib";

export type ApiRequestTypes = keyof Awaited<ReturnType<typeof getApiRequests>>;
export type GetTableDataTypes = Exclude<ApiRequestTypes, "locations">;
export type DeleteTableDataTypes = Exclude<
  ApiRequestTypes,
  "travellers" | "claims" | "roles" | "locations" | "users" | "tags"
>;
export type GetDetailTableDataTypes = Exclude<
  ApiRequestTypes,
  "travellers" | "claims" | "roles" | "locations" | "users" | "tags"
>;

export async function getApiRequests() {
  const crmClient = await getCRMServiceClient();
  const travellerClient = await getTravellersServiceClient();
  const contractsClient = await getContractServiceClient();
  const locationClient = await getLocationServiceClient();
  const identityClient = await getIdentityServiceClient();
  const exportValidationClient = await getExportValidationServiceClient();
  const tagClient = await getTagServiceClient();
  const tableRequests = {
    merchants: {
      getDetail: async (id: string) =>
        (await crmClient.merchant.getApiCrmServiceMerchantsByIdDetail({ id }))
          .merchant,
      get: async (data: GetApiCrmServiceMerchantsData) =>
        await crmClient.merchant.getApiCrmServiceMerchants(data),
      getSubCompanies: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) =>
        await crmClient.merchant.getApiCrmServiceMerchantsByIdSubMerchants(
          data,
        ),
      getIndivuals: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) =>
        await crmClient.merchant.getApiCrmServiceMerchantsByIdAffiliations(
          data,
        ),
      deleteRow: async (id: string) =>
        await crmClient.merchant.deleteApiCrmServiceMerchantsByIdWithComponents(
          {
            id,
          },
        ),
      getBasicInformation: async (data: { id: string }) =>
        await crmClient.merchant.getApiCrmServiceMerchantsByIdBasicInformation(
          data,
        ),
      getAdresses: async (data: { id: string }) =>
        await crmClient.merchant.getApiCrmServiceMerchantsByIdAddresses(data),
      getContractHeadersByMerchantId: async (
        data: GetApiContractServiceMerchantsByIdContractsContractHeadersData,
      ) =>
        await contractsClient.contractsMerchant.getApiContractServiceMerchantsByIdContractsContractHeaders(
          data,
        ),
      postContractHeadersById: async (
        data: PostApiContractServiceMerchantsByIdContractsContractHeadersData,
      ) =>
        await contractsClient.contractsMerchant.postApiContractServiceMerchantsByIdContractsContractHeaders(
          data,
        ),
      getContractHeaderMissingStepsById: async (id: string) =>
        await contractsClient.contractsMerchant.getApiContractServiceMerchantsContractsContractHeadersByIdGetMissingSteps(
          { id },
        ),
      getContractHeaderById: async (id: string) =>
        await contractsClient.contractsMerchant.getApiContractServiceMerchantsContractsContractHeadersById(
          { id },
        ),
      putMerchantBase: async (form: PutApiCrmServiceMerchantsByIdData) => {
        return await crmClient.merchant.putApiCrmServiceMerchantsById({
          requestBody: form.requestBody,
          id: form.id,
        });
      },
      putAddress: async (
        form: PutApiCrmServiceMerchantsByIdAddressesByAddressIdData,
      ) => {
        return await crmClient.merchant.putApiCrmServiceMerchantsByIdAddressesByAddressId(
          form,
        );
      },

      putEmailAddress: async (
        form: PutApiCrmServiceMerchantsByIdEmailsByEmailIdData,
      ) => {
        return await crmClient.merchant.putApiCrmServiceMerchantsByIdEmailsByEmailId(
          form,
        );
      },
      putTelephone: async (
        form: PutApiCrmServiceMerchantsByIdTelephonesByTelephoneIdData,
      ) => {
        return await crmClient.merchant.putApiCrmServiceMerchantsByIdTelephonesByTelephoneId(
          form,
        );
      },
      putOrganization: async (
        form: PutApiCrmServiceMerchantsByIdOrganizationsByOrganizationIdData,
      ) => {
        return await crmClient.merchant.putApiCrmServiceMerchantsByIdOrganizationsByOrganizationId(
          form,
        );
      },
      putIndividualName: async (
        form: PutApiCrmServiceMerchantsByIdIndividualByIndividualIdNameByNameIdData,
      ) => {
        return await crmClient.merchant.putApiCrmServiceMerchantsByIdIndividualByIndividualIdNameByNameId(
          form,
        );
      },
      putIndividualPersonalSummary: async (
        form: PutApiCrmServiceMerchantsByIdIndividualByIndividualIdPersonalSummaryByPersonalSummaryIdData,
      ) => {
        return await crmClient.merchant.putApiCrmServiceMerchantsByIdIndividualByIndividualIdPersonalSummaryByPersonalSummaryId(
          form,
        );
      },
      postAffiliations: async (
        form: PostApiCrmServiceMerchantsByIdAffiliationsData,
      ) => {
        return await crmClient.merchant.postApiCrmServiceMerchantsByIdAffiliations(
          form,
        );
      },
    },
    "refund-points": {
      getDetail: async (id: string) =>
        await crmClient.refundPoint.getApiCrmServiceRefundPointsByIdDetail({
          id,
        }),
      get: async (data: { maxResultCount: number; skipCount: number }) =>
        await crmClient.refundPoint.getApiCrmServiceRefundPoints(data),
      getSubCompanies: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) =>
        await crmClient.refundPoint.getApiCrmServiceRefundPointsByIdSubRefundPoints(
          data,
        ),
      getIndivuals: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) =>
        await crmClient.refundPoint.getApiCrmServiceRefundPointsByIdAffiliations(
          data,
        ),
      deleteRow: async (id: string) =>
        await crmClient.refundPoint.deleteApiCrmServiceRefundPointsByIdWithComponents(
          {
            id,
          },
        ),
      putAddress: async (
        form: PutApiCrmServiceMerchantsByIdAddressesByAddressIdData,
      ) => {
        return await crmClient.refundPoint.putApiCrmServiceRefundPointsByIdAddressesByAddressId(
          form,
        );
      },
      putEmailAddress: async (
        form: PutApiCrmServiceRefundPointsByIdEmailsByEmailIdData,
      ) => {
        return await crmClient.refundPoint.putApiCrmServiceRefundPointsByIdEmailsByEmailId(
          form,
        );
      },
      putTelephone: async (
        form: PutApiCrmServiceRefundPointsByIdTelephonesByTelephoneIdData,
      ) => {
        return await crmClient.refundPoint.putApiCrmServiceRefundPointsByIdTelephonesByTelephoneId(
          form,
        );
      },
      putOrganization: async (
        form: PutApiCrmServiceRefundPointsByIdOrganizationsByOrganizationIdData,
      ) => {
        return await crmClient.refundPoint.putApiCrmServiceRefundPointsByIdOrganizationsByOrganizationId(
          form,
        );
      },
      postAffiliations: async (
        form: PostApiCrmServiceRefundPointsByIdAffiliationsData,
      ) => {
        return await crmClient.refundPoint.postApiCrmServiceRefundPointsByIdAffiliations(
          form,
        );
      },
    },
    customs: {
      getDetail: async (id: string) =>
        await crmClient.customs.getApiCrmServiceCustomsByIdDetail({ id }),
      get: async (data: GetApiCrmServiceCustomsData) =>
        await crmClient.customs.getApiCrmServiceCustoms(data),
      getSubCompanies: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) => await crmClient.customs.getApiCrmServiceCustomsByIdSubCustoms(data),
      getIndivuals: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) =>
        await crmClient.customs.getApiCrmServiceCustomsByIdAffiliations(data),
      deleteRow: async (id: string) =>
        await crmClient.customs.deleteApiCrmServiceCustomsByIdWithComponents({
          id,
        }),
      putAddress: async (
        form: PutApiCrmServiceMerchantsByIdAddressesByAddressIdData,
      ) => {
        return await crmClient.customs.putApiCrmServiceCustomsByIdAddressesByAddressId(
          form,
        );
      },
      putEmailAddress: async (
        form: PutApiCrmServiceCustomsByIdEmailsByEmailIdData,
      ) => {
        return await crmClient.customs.putApiCrmServiceCustomsByIdEmailsByEmailId(
          form,
        );
      },
      putTelephone: async (
        form: PutApiCrmServiceCustomsByIdTelephonesByTelephoneIdData,
      ) => {
        return await crmClient.customs.putApiCrmServiceCustomsByIdTelephonesByTelephoneId(
          form,
        );
      },
      putOrganization: async (
        form: PutApiCrmServiceCustomsByIdOrganizationsByOrganizationIdData,
      ) => {
        return await crmClient.customs.putApiCrmServiceCustomsByIdOrganizationsByOrganizationId(
          form,
        );
      },
      postAffiliations: async (
        form: PostApiCrmServiceCustomsByIdAffiliationsData,
      ) => {
        return await crmClient.customs.postApiCrmServiceCustomsByIdAffiliations(
          form,
        );
      },
    },
    "tax-free": {
      getDetail: async (id: string) =>
        await crmClient.taxFree.getApiCrmServiceTaxFreesByIdDetail({ id }),
      get: async (data: { maxResultCount: number; skipCount: number }) =>
        await crmClient.taxFree.getApiCrmServiceTaxFrees(data),
      getSubCompanies: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) =>
        await crmClient.taxFree.getApiCrmServiceTaxFreesByIdSubTaxFree(data),
      getIndivuals: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) =>
        await crmClient.taxFree.getApiCrmServiceTaxFreesByIdAffiliations(data),

      deleteRow: async (id: string) =>
        await crmClient.taxFree.deleteApiCrmServiceTaxFreesByIdWithComponents({
          id,
        }),
      putAddress: async (
        form: PutApiCrmServiceMerchantsByIdAddressesByAddressIdData,
      ) => {
        return await crmClient.taxFree.putApiCrmServiceTaxFreesByIdAddressesByAddressId(
          form,
        );
      },
      putEmailAddress: async (
        form: PutApiCrmServiceTaxFreesByIdEmailsByEmailIdData,
      ) => {
        return await crmClient.taxFree.putApiCrmServiceTaxFreesByIdEmailsByEmailId(
          form,
        );
      },
      putTelephone: async (
        form: PutApiCrmServiceTaxFreesByIdTelephonesByTelephoneIdData,
      ) => {
        return await crmClient.taxFree.putApiCrmServiceTaxFreesByIdTelephonesByTelephoneId(
          form,
        );
      },
      putOrganization: async (
        form: PutApiCrmServiceTaxFreesByIdOrganizationsByOrganizationIdData,
      ) => {
        return await crmClient.taxFree.putApiCrmServiceTaxFreesByIdOrganizationsByOrganizationId(
          form,
        );
      },
      postAffiliations: async (
        form: PostApiCrmServiceTaxFreesByIdAffiliationsData,
      ) => {
        return await crmClient.taxFree.postApiCrmServiceTaxFreesByIdAffiliations(
          form,
        );
      },
    },
    "tax-offices": {
      getDetail: async (id: string) =>
        await crmClient.taxOffice.getApiCrmServiceTaxOfficesByIdDetail({ id }),
      get: async (data: GetApiCrmServiceTaxOfficesData = {}) =>
        await crmClient.taxOffice.getApiCrmServiceTaxOffices(data),
      getSubCompanies: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) =>
        await crmClient.taxOffice.getApiCrmServiceTaxOfficesByIdSubTaxOffices(
          data,
        ),
      getIndivuals: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) =>
        await crmClient.taxOffice.getApiCrmServiceTaxOfficesByIdAffiliations(
          data,
        ),
      deleteRow: async (id: string) =>
        await crmClient.taxOffice.deleteApiCrmServiceTaxOfficesByIdWithComponents(
          {
            id,
          },
        ),
      putAddress: async (
        form: PutApiCrmServiceMerchantsByIdAddressesByAddressIdData,
      ) => {
        return await crmClient.taxOffice.putApiCrmServiceTaxOfficesByIdAddressesByAddressId(
          form,
        );
      },
      putEmailAddress: async (
        form: PutApiCrmServiceTaxOfficesByIdEmailsByEmailIdData,
      ) => {
        return await crmClient.taxOffice.putApiCrmServiceTaxOfficesByIdEmailsByEmailId(
          form,
        );
      },
      putTelephone: async (
        form: PutApiCrmServiceTaxFreesByIdTelephonesByTelephoneIdData,
      ) => {
        return await crmClient.taxOffice.putApiCrmServiceTaxOfficesByIdTelephonesByTelephoneId(
          form,
        );
      },
      putOrganization: async (
        form: PutApiCrmServiceTaxOfficesByIdOrganizationsByOrganizationIdData,
      ) => {
        return await crmClient.taxOffice.putApiCrmServiceTaxOfficesByIdOrganizationsByOrganizationId(
          form,
        );
      },
      postAffiliations: async (
        form: PostApiCrmServiceTaxOfficesByIdAffiliationsData,
      ) => {
        return await crmClient.taxOffice.postApiCrmServiceTaxOfficesByIdAffiliations(
          form,
        );
      },
    },
    individuals: {
      getDetail: async (id: string) =>
        await crmClient.individual.getApiCrmServiceIndividualsById({ id }),
      get: async (data: GetApiCrmServiceIndividualsData) =>
        await crmClient.individual.getApiCrmServiceIndividuals(data),
      deleteRow: async (id: string) =>
        await crmClient.taxOffice.deleteApiCrmServiceTaxOfficesByIdWithComponents(
          {
            id,
          },
        ),
      getAffiliationCode: async () =>
        await crmClient.affiliationCode.getApiCrmServiceAffiliationCodes(),
    },
    locations: {
      getCountries: async (data: GetApiLocationServiceCountriesData) =>
        await locationClient.country.getApiLocationServiceCountries(data),
      getRegionsByCountryId: async (
        data: GetApiLocationServiceRegionsGetListByCountryByCountryIdData,
      ) =>
        await locationClient.region.getApiLocationServiceRegionsGetListByCountryByCountryId(
          data,
        ),
      getDefaultRegionsByCountryId: async (
        data: GetApiLocationServiceRegionsGetDefaultRegionIdByCountryIdData,
      ) =>
        await locationClient.region.getApiLocationServiceRegionsGetDefaultRegionIdByCountryId(
          data,
        ),
      getCitiesByRegionId: async (
        data: GetApiLocationServiceCitiesGetListByRegionByRegionIdData,
      ) =>
        await locationClient.city.getApiLocationServiceCitiesGetListByRegionByRegionId(
          data,
        ),

      getCities: async (
        data: GetApiLocationServiceCitiesData, //this should be removed when the forms updated
      ) => await locationClient.city.getApiLocationServiceCities(data),
    },

    travellers: {
      get: async (data: GetApiTravellerServiceTravellersData) =>
        await travellerClient.traveller.getApiTravellerServiceTravellers(data),
      post: async (data: PostApiTravellerServiceTravellersData) =>
        await travellerClient.traveller.postApiTravellerServiceTravellers(data),
    },
    claims: {
      get: async (data: GetApiIdentityClaimTypesData) =>
        await identityClient.claimType.getApiIdentityClaimTypes(data),
    },
    roles: {
      get: async (data: GetApiIdentityRolesData) =>
        await identityClient.role.getApiIdentityRoles(data),
      getRoleClaims: async (data: GetApiIdentityRolesByIdClaimsData) =>
        await identityClient.role.getApiIdentityRolesByIdClaims(data),
      putRoleClaims: async (data: PutApiIdentityRolesByIdClaimsData) =>
        await identityClient.role.putApiIdentityRolesByIdClaims(data),
      getAllRoles: async () =>
        await identityClient.role.getApiIdentityRolesAll(),
      MoveAllUsers: async (data: PutApiIdentityRolesByIdMoveAllUsersData) =>
        await identityClient.role.putApiIdentityRolesByIdMoveAllUsers(data),
    },
    users: {
      get: async (data: GetApiIdentityUsersData) =>
        await identityClient.user.getApiIdentityUsers(data),
      getUserClaims: async (data: GetApiIdentityUsersByIdClaimsData) =>
        await identityClient.user.getApiIdentityUsersByIdClaims(data),
      putUserClaims: async (data: PutApiIdentityUsersByIdClaimsData) =>
        await identityClient.user.putApiIdentityUsersByIdClaims(data),
    },
    "export-validation": {
      get: async (data: GetApiExportValidationServiceExportValidationData) =>
        await exportValidationClient.exportValidation.getApiExportValidationServiceExportValidation(
          data,
        ),
      getDetail: async (id: string) =>
        await exportValidationClient.exportValidation.getApiExportValidationServiceExportValidationById(
          {
            id,
          },
        ),
      post: async (data: PostApiExportValidationServiceExportValidationData) =>
        await exportValidationClient.exportValidation.postApiExportValidationServiceExportValidation(
          data,
        ),
      put: async (
        data: PutApiExportValidationServiceExportValidationByIdData,
      ) =>
        await exportValidationClient.exportValidation.putApiExportValidationServiceExportValidationById(
          data,
        ),
      deleteRow: async (id: string) =>
        await exportValidationClient.exportValidation.deleteApiExportValidationServiceExportValidationById(
          {
            id,
          },
        ),
    },
    tags: {
      get: async (data: GetApiTagServiceTagData) =>
        await tagClient.tag.getApiTagServiceTag(data),
    },
  };
  return tableRequests;
}
export async function getTableData(
  type: GetTableDataTypes,
  page = 0,
  maxResultCount = 10,
  filter?: FilterColumnResult,
) {
  try {
    const requests = await getApiRequests();
    const data = await requests[type].get({
      maxResultCount,
      skipCount: page * 10,
      ...filter,
    });
    return {
      type: "success",
      data,
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
export async function deleteTableRow(type: DeleteTableDataTypes, id: string) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: await requests[type].deleteRow(id),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
export async function getTableDataDetail(
  type: GetDetailTableDataTypes,
  id: string,
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: await requests[type].getDetail(id),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
