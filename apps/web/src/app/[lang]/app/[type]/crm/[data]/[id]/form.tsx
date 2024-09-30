"use client";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import type {
  UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto,
  UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto,
  UniRefund_CRMService_Merchants_MerchantDto,
  UniRefund_CRMService_Organizations_UpdateOrganizationDto,
  UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto,
  Volo_Abp_Application_Dtos_PagedResultDto_15,
  Volo_Abp_Application_Dtos_PagedResultDto_18,
} from "@ayasofyazilim/saas/CRMService";
import { $UniRefund_CRMService_Individuals_IndividualProfileDto } from "@ayasofyazilim/saas/CRMService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import jsonToCSV from "@repo/ayasofyazilim-ui/lib/json-to-csv";
import type { TableAction } from "@repo/ayasofyazilim-ui/molecules/tables";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getResourceDataClient } from "src/language-data/CRMService";
import { useLocale } from "src/providers/locale";
import { getBaseLink } from "src/utils";
import { isPhoneValid, splitPhone } from "src/utils-phone";
import {
  updateCRMDetailServer,
  updateMerchantCRMDetailServer,
} from "../../actions/action";
import {
  deleteSubMerchantByMerchantId,
  getAllIndividuals,
  getSubCompanyByMerchantId,
} from "../../actions/merchant";
import {
  address,
  dataConfigOfCrm,
  email,
  localNumber,
  organization,
  telephone,
} from "../../data";

export default function Form({
  crmDetailData,
  params,
}: {
  crmDetailData: UniRefund_CRMService_Merchants_MerchantDto;
  params: {
    id: string;
    data: string;
    lang: string;
  };
}) {
  const router = useRouter();
  const [SubCompaniesData, setSubCompaniesData] =
    useState<Volo_Abp_Application_Dtos_PagedResultDto_18>();
  const [IndividualsData, setIndividualsData] =
    useState<Volo_Abp_Application_Dtos_PagedResultDto_15>();
  const [loading, setLoading] = useState(true);
  const { resources } = useLocale();
  const languageData = getResourceDataClient(resources, params.lang);

  const organizationInfo =
    crmDetailData.entityInformations?.[0]?.organizations?.[0];
  const organizationId = organizationInfo?.id || "";

  const emailInfo = organizationInfo?.contactInformations?.[0]?.emails?.[0];
  const telephoneInfo = {
    ...organizationInfo?.contactInformations?.[0]?.telephones?.[0],
    properties: {
      ...organizationInfo?.contactInformations?.[0]?.telephones?.[0],
      localNumber,
    },
  };
  const addressInfo =
    organizationInfo?.contactInformations?.[0]?.addresses?.[0];

  const organizationMerchantSchema = createZodObject(organization, [
    "name",
    "taxpayerId",
    "branchId",
    "customerNumber",
    "legalStatusCode",
  ]);

  const organizationCustomSchema = createZodObject(organization, [
    "name",
    "taxpayerId",
    "branchId",
  ]);
  const emailSchema = createZodObject(email, ["emailAddress", "typeCode"]);
  const telephoneSchema = createZodObject(telephone, [
    "localNumber",
    "typeCode",
  ]);
  const phoneNumber =
    (telephoneInfo.ituCountryCode || "+90") +
    (telephoneInfo.areaCode || "") +
    (telephoneInfo.localNumber || "");
  const addressSchema = createZodObject(address, [
    "country",
    "terriority",
    "city",
    "postalCode",
    "addressLine",
    "fullAddress",
    "typeCode",
  ]);

  function getOrganizationSchema() {
    if (
      params.data === "merchants" ||
      params.data === "tax-free" ||
      params.data === "tax-offices"
    ) {
      return organizationMerchantSchema;
    } else if (params.data === "customs" || params.data === "refund-points") {
      return organizationCustomSchema;
    }
    return organizationMerchantSchema;
  }

  function getSubEntityName() {
    if (params.data === "merchants") {
      return languageData["Sub.Merchant"];
    } else if (params.data === "refund-points") {
      return languageData["Sub.RefundPoint"];
    } else if (params.data === "customs") {
      return languageData["Sub.Custom"];
    } else if (params.data === "tax-free") {
      return languageData["Sub.TaxFree"];
    } else if (params.data === "tax-offices") {
      return languageData["Sub.TaxOffice"];
    }
    return "";
  }
  function getAddSubName() {
    if (params.data === "merchants") {
      return "SubMerchant";
    } else if (params.data === "refund-points") {
      return "SubRefundPoint";
    } else if (params.data === "customs") {
      return "SubCustom";
    } else if (params.data === "tax-free") {
      return "SubTaxFree";
    } else if (params.data === "tax-offices") {
      return "SubTaxOffice";
    }
    return "";
  }
  const subEntityName = getSubEntityName();
  const addSubEName = getAddSubName();
  async function handleSubmit(values: unknown, sectionName: string) {
    if (typeof values !== "object") return;

    let response = "fail";
    if (sectionName === "organization") {
      await updateMerchantCRMDetailServer(
        params.id,
        organizationId,
        "merchant",
        values as UniRefund_CRMService_Organizations_UpdateOrganizationDto,
      );
      response = "success";
    }
    if (sectionName === "email") {
      await updateCRMDetailServer(emailInfo?.id || "", {
        ...values,
        primaryFlag: true,
      } as UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto);
      response = "success";
    }
    if (sectionName === "telephone") {
      const parsedValues = {
        ...values,
        primaryFlag: true,
      } as UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto;
      const isValid = isPhoneValid(parsedValues.localNumber);
      if (!isValid) {
        return;
      }
      const phoneData = splitPhone(parsedValues.localNumber);
      await updateCRMDetailServer(telephoneInfo.id || "", {
        ...values,
        primaryFlag: true,
        ...phoneData,
      } as UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto);
      response = "success";
    }
    if (sectionName === "address") {
      await updateCRMDetailServer(addressInfo?.id || "", {
        ...values,
        primaryFlag: true,
      } as UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto);
      response = "success";
    }
    if (response) {
      toast.success("Updated successfully!");
    }
  }

  async function getSubCompaniesOfMerchant() {
    setLoading(true);
    try {
      const response = await getSubCompanyByMerchantId({
        id: params.id,
      });
      if (response.type === "error" || response.type === "api-error") {
        toast.error(response.status);
        return;
      }
      const SubCompaniesdata = response.data;
      setSubCompaniesData(SubCompaniesdata);
    } catch (error) {
      toast.error("An error occurred while fetching Sub Companies.");
    } finally {
      setLoading(false);
    }
  }

  async function getIndividuals(page: number) {
    setLoading(true);
    try {
      const response = await getAllIndividuals({
        maxResultCount: 10,
        skipCount: page * 10,
      });
      if (response.type === "error" || response.type === "api-error") {
        toast.error(response.status);
        return;
      }
      const Individualsdata = response.data;
      setIndividualsData(Individualsdata);
    } catch (error) {
      toast.error("An error occurred while fetching Individual.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteSubMerchant(id: string) {
    setLoading(true);
    try {
      const response = await deleteSubMerchantByMerchantId({ id });
      if (response.type === "error" || response.type === "api-error") {
        toast.error(response.status);
        return;
      }
      toast.success("Sub Company deleted successfully.");
    } catch (error) {
      toast.error("An error occurred while deleting Sub Company.");
    } finally {
      setLoading(false);
    }
  }

  const actionSubCompany: TableAction[] = [
    {
      cta: languageData[
        `${addSubEName.replaceAll(" ", "")}.New` as keyof typeof languageData
      ],
      type: "NewPage",
      href: `/app/admin/crm/${params.data}/${params.id}/subcompany/new/`,
    },
    {
      cta: `Export CSV`,
      callback: () => {
        jsonToCSV(SubCompaniesData, params.data);
      },
      type: "Action",
    },
  ];

  const actionIndividuals: TableAction[] = [
    {
      cta: languageData[
        `${"Individuals".replaceAll(" ", "")}.New` as keyof typeof languageData
      ],
      type: "NewPage",
      href: `/app/admin/crm/${params.data}/${params.id}/individual/new/`,
    },
    {
      cta: `Export CSV`,
      callback: () => {
        jsonToCSV(IndividualsData, params.data);
      },
      type: "Action",
    },
  ];

  return (
    <div className="h-full overflow-hidden">
      <SectionLayout
        sections={[
          { name: languageData.Organization, id: "organization" },
          { name: languageData.Telephone, id: "telephone" },
          { name: languageData.Address, id: "address" },
          { name: languageData.Email, id: "email" },
          { name: subEntityName, id: "SubCompany" },
          { name: languageData.Individuals, id: "individuals" },
        ]}
        vertical
      >
        <SectionLayoutContent sectionId="organization">
          <AutoForm
            formClassName="pb-40 "
            formSchema={getOrganizationSchema()}
            onSubmit={(values) => {
              void handleSubmit(values, "organization");
            }}
            values={{
              name: organizationInfo?.name,
              taxpayerId: organizationInfo?.taxpayerId,
              branchId: organizationInfo?.branchId,
              legalStatusCode: organizationInfo?.legalStatusCode,
              customerNumber: organizationInfo?.customerNumber,
            }}
          >
            <AutoFormSubmit className="float-right">
              {languageData.Save}
            </AutoFormSubmit>
          </AutoForm>
        </SectionLayoutContent>
        <SectionLayoutContent sectionId="telephone">
          <AutoForm
            fieldConfig={{
              localNumber: {
                fieldType: "phone",
                displayName: "Telephone Number",
                inputProps: {
                  showLabel: true,
                },
              },
            }}
            formClassName="pb-40 "
            formSchema={telephoneSchema}
            onSubmit={(values) => {
              void handleSubmit(values, "telephone");
            }}
            values={{
              localNumber: phoneNumber,
              primaryFlag: telephoneInfo.primaryFlag,
              typeCode: telephoneInfo.typeCode,
            }}
          >
            <AutoFormSubmit className="float-right">
              {languageData.Save}
            </AutoFormSubmit>
          </AutoForm>
        </SectionLayoutContent>
        <SectionLayoutContent sectionId="address">
          <AutoForm
            formClassName="pb-40 "
            formSchema={addressSchema}
            onSubmit={(values) => {
              void handleSubmit(values, "address");
            }}
            values={{
              addressLine: addressInfo?.addressLine,
              city: addressInfo?.city,
              country: addressInfo?.country,
              fullAddress: addressInfo?.fullAddress,
              postalCode: addressInfo?.postalCode,
              terriority: addressInfo?.terriority,
              typeCode: addressInfo?.typeCode,
              primaryFlag: addressInfo?.primaryFlag,
            }}
          >
            <AutoFormSubmit className="float-right">
              {languageData.Save}
            </AutoFormSubmit>
          </AutoForm>
        </SectionLayoutContent>
        <SectionLayoutContent sectionId="email">
          <AutoForm
            fieldConfig={{
              emailAddress: {
                inputProps: {
                  type: "email",
                },
              },
            }}
            formClassName="pb-40 "
            formSchema={emailSchema}
            onSubmit={(values) => {
              void handleSubmit(values, "email");
            }}
            values={{
              emailAddress: emailInfo?.emailAddress,
              typeCode: emailInfo?.typeCode,
              primaryFlag: emailInfo?.primaryFlag,
            }}
          >
            <AutoFormSubmit className="float-right">
              {languageData.Save}
            </AutoFormSubmit>
          </AutoForm>
        </SectionLayoutContent>
        <SectionLayoutContent sectionId="SubCompany">
          <Card className="px-4">
            <DataTable
              action={actionSubCompany}
              columnsData={{
                type: "Auto",
                data: {
                  tableType:
                    dataConfigOfCrm.companies.pages.merchants.tableSchema
                      .schema,
                  excludeList: [
                    "entityInformationTypeCodeName",
                    "organizationId",
                    "individualId",
                    "parentCompanyId",
                    "id",
                  ],
                  actionList: [
                    {
                      cta: languageData.Delete,
                      type: "Dialog",
                      componentType: "ConfimrationDialog",
                      title: `${languageData.Delete} ${params.data}`,
                      description: languageData["Delete.Assurance"],
                      cancelCTA: languageData.Cancel,
                      variant: "destructive",
                      callback: (row: { id: string }) => {
                        void deleteSubMerchant(row.id);
                      },
                    },
                    {
                      cta: languageData.Edit,
                      type: "Action",
                      callback: (row: { id: string }) => {
                        router.push(
                          getBaseLink(`app/admin/crm/${params.data}/${row.id}`),
                        );
                      },
                    },
                  ],
                },
              }}
              data={SubCompaniesData?.items || []}
              fetchRequest={getSubCompaniesOfMerchant}
              isLoading={loading}
              rowCount={SubCompaniesData?.totalCount}
            />
          </Card>
        </SectionLayoutContent>
        <SectionLayoutContent sectionId="individuals">
          <Card className="px-4">
            <DataTable
              action={actionIndividuals}
              columnsData={{
                type: "Auto",
                data: {
                  tableType:
                    $UniRefund_CRMService_Individuals_IndividualProfileDto,
                  excludeList: [
                    "id",
                    "affiliationId",
                    "affiliationTypeCodeValue",
                    "affiliationParentTypeCodeValue",
                  ],
                  actionList: [
                    {
                      cta: languageData.Edit,
                      type: "Action",
                      callback: () => {
                        ("");
                      },
                    },
                  ],
                },
              }}
              data={IndividualsData?.items || []}
              fetchRequest={getIndividuals}
              isLoading={loading}
              rowCount={IndividualsData?.totalCount}
            />
          </Card>
        </SectionLayoutContent>
      </SectionLayout>
    </div>
  );
}
