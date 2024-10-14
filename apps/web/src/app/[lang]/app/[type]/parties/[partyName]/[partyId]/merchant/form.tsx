"use client";

import type { UniRefund_CRMService_Merchants_UpdateMerchantDto } from "@ayasofyazilim/saas/CRMService";
import { $UniRefund_CRMService_Merchants_MerchantBaseDto } from "@ayasofyazilim/saas/CRMService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { SectionLayoutContent } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { getEnumId, getEnumName } from "@repo/ui/utils/table/table-utils";
import { useRouter } from "next/navigation";
import type { CRMServiceServiceResource } from "src/language-data/CRMService";
import type { PutMerchantBase } from "../types";
import { handleUpdateSubmit } from "../utils";

function MerchantForm({
  languageData,
  partyName,
  partyId,
  taxOfficesEnum,
  merchantData: individualData,
}: {
  languageData: CRMServiceServiceResource;
  partyName: "merchants";
  partyId: string;
  taxOfficesEnum: { name: string; id: string }[];
  merchantData: UniRefund_CRMService_Merchants_UpdateMerchantDto | undefined;
}) {
  const router = useRouter();

  const schema = createZodObject(
    $UniRefund_CRMService_Merchants_MerchantBaseDto,
    ["typeCode", "taxOfficeId"],
    {
      taxOfficeId: {
        type: "enum",
        data: taxOfficesEnum.map((i) => i.name),
      },
    },
  );
  return (
    <SectionLayoutContent sectionId="merchant-base">
      <AutoForm
        formClassName="pb-40"
        formSchema={schema}
        onSubmit={(values: PutMerchantBase["data"]["requestBody"]) => {
          void handleUpdateSubmit(
            partyName,
            {
              action: "merchant-base",
              data: {
                requestBody: {
                  ...values,
                  taxOfficeId: getEnumId(
                    taxOfficesEnum,
                    values?.taxOfficeId || "",
                  ),
                },
                id: partyId,
              },
            },
            router,
          );
        }}
        values={{
          ...individualData,
          taxOfficeId: getEnumName(
            taxOfficesEnum,
            individualData?.taxOfficeId || "",
          ),
        }}
      >
        <AutoFormSubmit className="float-right">
          {languageData.Save}
        </AutoFormSubmit>
      </AutoForm>
    </SectionLayoutContent>
  );
}

export default MerchantForm;
