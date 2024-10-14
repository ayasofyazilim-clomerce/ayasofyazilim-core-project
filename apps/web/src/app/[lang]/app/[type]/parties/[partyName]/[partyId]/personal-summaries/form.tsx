"use client";

import type { UniRefund_CRMService_PersonalSummaries_PersonalSummaryDto } from "@ayasofyazilim/saas/CRMService";
import { $UniRefund_CRMService_PersonalSummaries_UpdatePersonalSummaryDto } from "@ayasofyazilim/saas/CRMService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { SectionLayoutContent } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { useRouter } from "next/navigation";
import type { CRMServiceServiceResource } from "src/language-data/CRMService";
import type { PutPersonalSummaries } from "../types";
import { handleUpdateSubmit } from "../utils";

function PersonalSummariesForm({
  languageData,
  partyName,
  partyId,
  individualData,
}: {
  languageData: CRMServiceServiceResource;
  partyName: "merchants";
  partyId: string;
  individualData:
    | UniRefund_CRMService_PersonalSummaries_PersonalSummaryDto
    | undefined;
}) {
  const router = useRouter();

  const schema = createZodObject(
    $UniRefund_CRMService_PersonalSummaries_UpdatePersonalSummaryDto,
  );
  return (
    <SectionLayoutContent sectionId="personal-summaries">
      <AutoForm
        formClassName="pb-40"
        formSchema={schema}
        onSubmit={(values) => {
          void handleUpdateSubmit(
            partyName,
            {
              action: "personal-summaries",
              data: {
                requestBody:
                  values as PutPersonalSummaries["data"]["requestBody"],
                id: partyId,
                personalSummaryId: individualData?.id || "",
                individualId: individualData?.individualId || "",
              },
            },
            router,
          );
        }}
        values={individualData}
      >
        <AutoFormSubmit className="float-right">
          {languageData.Save}
        </AutoFormSubmit>
      </AutoForm>
    </SectionLayoutContent>
  );
}

export default PersonalSummariesForm;
