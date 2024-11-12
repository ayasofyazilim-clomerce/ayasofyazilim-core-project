"use client";
import { toast } from "@/components/ui/sonner";
import type {
  UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderForMerchantCreateDto as ContractHeaderForMerchantCreateDto,
  UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderForMerchantUpdateDto as ContractHeaderForMerchantUpdateDto,
  UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto as RefundTableHeaderDto,
} from "@ayasofyazilim/saas/ContractService";
import {
  $UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderForMerchantCreateDto as $ContractHeaderForMerchantCreateDto,
  $UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderForMerchantUpdateDto as $ContractHeaderForMerchantUpdateDto,
} from "@ayasofyazilim/saas/ContractService";
import type { UniRefund_LocationService_AddressCommonDatas_AddressCommonDataDto as AddressTypeDto } from "@ayasofyazilim/saas/LocationService";
import { useCallback, useEffect, useState } from "react";
import { SchemaForm } from "@repo/ayasofyazilim-ui/organisms/schema-form";
import { createUiSchemaWithResource } from "@repo/ayasofyazilim-ui/organisms/schema-form/utils";
import { CustomCombobox } from "@repo/ayasofyazilim-ui/organisms/schema-form/widgets";
import type { WidgetProps } from "@repo/ayasofyazilim-ui/organisms/schema-form/types";
import { useRouter } from "next/navigation";
import { toastOnSubmit } from "@repo/ui/toast-on-submit";
import type { ContractServiceResource } from "src/language-data/ContractService";
import { postMerchantContractHeadersByMerchantIdApi } from "src/app/[lang]/app/actions/ContractService/action";
import { getRefundTableHeaders } from "src/app/[lang]/app/[type]/settings/templates/refund/action";
import { getBaseLink } from "src/utils";

type BaseContractHeaderFormProps = {
  partyName: "merchants";
  partyId: string;
  languageData: ContractServiceResource;
  addresses: AddressTypeDto[];
  //   basicInformation: MerchantBasicInformationDto;
} & (UpdateContractHeaderFormProps | CreateContractHeaderFormProps);

interface UpdateContractHeaderFormProps {
  formType: "Update";
  formData: ContractHeaderForMerchantUpdateDto;
}
interface CreateContractHeaderFormProps {
  formType: "Create";
}

type DataType =
  | ContractHeaderForMerchantCreateDto
  | ContractHeaderForMerchantUpdateDto;
export default function ContractHeaderForm(
  props: BaseContractHeaderFormProps,
): JSX.Element {
  const { formType, languageData, partyName, partyId, addresses } = props;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [addressList] = useState<AddressTypeDto[]>(addresses);
  const [refundTableHeaders, setRefundTableHeaders] =
    useState<RefundTableHeaderDto[]>();

  async function handleContractHeaderSubmit(data: DataType) {
    try {
      if (formType === "Create") {
        const postResponse = await postMerchantContractHeadersByMerchantIdApi({
          id: partyId,
          requestBody: data as ContractHeaderForMerchantCreateDto,
        });

        setLoading(true);
        if (postResponse.type === "success") {
          toast.success(languageData["Contracts.Create.Success"]);
          router.push(
            getBaseLink(
              `/app/admin/parties/${partyName}/${partyId}/contracts/${postResponse.data.id}`,
            ),
          );
        } else {
          toast.error(
            postResponse.message || languageData["Contracts.Create.Fail"],
          );
        }
      } else {
        toastOnSubmit(data);
      }
    } catch (error) {
      toast.error(languageData[`Contracts.${formType}.Fail`]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchRefundTableHeaders() {
      setLoading(true);
      try {
        const response = await getRefundTableHeaders({ maxResultCount: 100 });
        if (response.type === "error" || response.type === "api-error") {
          toast.error(response.message || response.status);
        } else {
          setRefundTableHeaders(response.data.items || []);
        }
      } catch (error) {
        toast.error("An error occurred while fetching refund table headers.");
      } finally {
        setLoading(false);
      }
    }
    void fetchRefundTableHeaders();
  }, []);

  const $schema =
    formType === "Create"
      ? $ContractHeaderForMerchantCreateDto
      : $ContractHeaderForMerchantUpdateDto;
  const uiSchema = createUiSchemaWithResource({
    name: "Contracts.Form",
    resources: languageData,
    schema: $schema,
    extend: {
      "ui:options": {
        expandable: false,
      },
      webSite: {
        "ui:className": "md:col-span-2",
        "ui:options": {
          inputType: "url",
        },
      },
      "ui:className": "md:grid md:gap-2 md:grid-cols-2",
      addressCommonDataId: {
        "ui:className": "row-start-2",
        "ui:widget": "address",
      },
      status: {
        "ui:className": "md:col-span-2",
      },
      refundTableHeaders: {
        "ui:className": "md:col-span-2",
        items: {
          displayLabel: false,
          "ui:className": "md:grid md:gap-2 md:grid-cols-2",
          refundTableHeaderId: {
            "ui:className": "md:col-span-2",
            "ui:widget": "refundTable",
          },
          isDefault: {
            "ui:widget": "switch",
          },
        },
      },
    },
  });

  const AddressWidget = useCallback(
    (comboboxProps: WidgetProps) => {
      return (
        <CustomCombobox<AddressTypeDto>
          {...comboboxProps}
          disabled={loading}
          emptyValue={
            languageData["Contracts.Form.addressCommonDataId.emptyValue"]
          }
          list={addressList}
          searchPlaceholder={
            languageData["Contracts.Form.addressCommonDataId.searchPlaceholder"]
          }
          searchResultLabel={
            languageData["Contracts.Form.addressCommonDataId.searchResultLabel"]
          }
          selectIdentifier="id"
          selectLabel="addressLine"
        />
      );
    },
    [addressList, loading, languageData],
  );

  const RefundTableWidget = useCallback(
    (comboboxProps: WidgetProps) => {
      return (
        <CustomCombobox<RefundTableHeaderDto>
          {...comboboxProps}
          disabled={loading}
          emptyValue={
            languageData[
              "Contracts.Form.refundTableHeaders.refundTableHeaderId.emptyValue"
            ]
          }
          list={refundTableHeaders}
          searchPlaceholder={
            languageData[
              "Contracts.Form.refundTableHeaders.refundTableHeaderId.searchPlaceholder"
            ]
          }
          searchResultLabel={
            languageData[
              "Contracts.Form.refundTableHeaders.refundTableHeaderId.searchResultLabel"
            ]
          }
          selectIdentifier="id"
          selectLabel="name"
        />
      );
    },
    [refundTableHeaders, loading, languageData],
  );

  return (
    <SchemaForm
      disabled={loading}
      filter={{
        type: "exclude",
        keys: ["extraProperties", "refundTableHeaders.extraProperties"],
      }}
      formData={formType === "Update" ? props.formData : undefined}
      onSubmit={(data) => {
        if (!data.formData) return;
        void handleContractHeaderSubmit(data.formData as DataType);
      }}
      schema={$schema}
      submitText={languageData["Contracts.Create.Submit"]}
      uiSchema={uiSchema}
      widgets={{
        address: AddressWidget,
        refundTable: RefundTableWidget,
      }}
      withScrollArea
    />
  );
}
