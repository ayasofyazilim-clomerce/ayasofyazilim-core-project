"use client";
import { toast } from "@/components/ui/sonner";
import type { UniRefund_ExportValidationService_ExportValidations_CreateExportValidationDto } from "@ayasofyazilim/saas/ExportValidationService";
import { $UniRefund_ExportValidationService_ExportValidations_CreateExportValidationDto } from "@ayasofyazilim/saas/ExportValidationService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { useRouter } from "next/navigation";
import { postExportValidationApi } from "src/app/[lang]/app/actions/ExportValidationService/actions";
import type { ExportValidationServiceResource } from "src/language-data/ExportValidationService";
import { getBaseLink } from "src/utils";

export default function Page({
  languageData,
}: {
  languageData: ExportValidationServiceResource;
}) {
  const router = useRouter();
  async function createExportValidation(
    data: UniRefund_ExportValidationService_ExportValidations_CreateExportValidationDto,
  ) {
    try {
      const response = await postExportValidationApi({ requestBody: data });
      if (response.type === "error" || response.type === "api-error") {
        toast.error(
          response.message || languageData["ExportValidation.New.Error"],
        );
      } else {
        toast.success([languageData["ExportValidation.New.Succes"]]);
        router.push(getBaseLink(`/app/admin/operations/export-validation`));
      }
    } catch (error) {
      toast.error(languageData["ExportValidation.Fail"]);
    }
  }
  return (
    <AutoForm
      formSchema={createZodObject(
        $UniRefund_ExportValidationService_ExportValidations_CreateExportValidationDto,
        [
          "endpointId",
          "referanceId",
          "date",
          "status",
          "stampType",
          "description",
        ],
      )}
      onSubmit={(val) => {
        void createExportValidation(val);
      }}
      stickyChildren
    >
      <AutoFormSubmit className="float-right py-4">
        {languageData.Save}
      </AutoFormSubmit>
    </AutoForm>
  );
}
