"use client";

import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { toast } from "@/components/ui/sonner";
import type {
  UniRefund_ExportValidationService_ExportValidations_ExportValidationDto,
  UniRefund_ExportValidationService_ExportValidations_UpdateExportValidationDto,
} from "@ayasofyazilim/saas/ExportValidationService";
import { $UniRefund_ExportValidationService_ExportValidations_UpdateExportValidationDto } from "@ayasofyazilim/saas/ExportValidationService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import { useEffect, useState } from "react";
import {
  getExportValidationDetailApi,
  putExportValidationApi,
} from "src/app/[lang]/app/actions/ExportValidationService/actions";
import type { ExportValidationServiceResource } from "src/language-data/ExportValidationService";

const ExportValidationSchema = createZodObject(
  $UniRefund_ExportValidationService_ExportValidations_UpdateExportValidationDto,
);

export default function Form({
  exportId,
  languageData,
}: {
  exportId: string;
  languageData: ExportValidationServiceResource;
}) {
  const [ExportValidationData, setExportValidationData] =
    useState<UniRefund_ExportValidationService_ExportValidations_ExportValidationDto>();

  async function getExportValidationDetails() {
    const response = await getExportValidationDetailApi(exportId);
    if (response.type === "success") {
      setExportValidationData(response.data);
    } else {
      toast.error(response.message);
    }
  }

  async function updateExportValidation(
    data: UniRefund_ExportValidationService_ExportValidations_UpdateExportValidationDto,
  ) {
    const response = await putExportValidationApi({
      id: exportId,
      requestBody: data,
    });
    if (response.type === "success") {
      toast.success(languageData["ExportValidation.Update.Succes"]);
    } else {
      toast.error(response.message);
    }
  }

  useEffect(() => {
    void getExportValidationDetails();
  }, [exportId]);

  return (
    <AutoForm
      formSchema={ExportValidationSchema}
      onSubmit={(formdata) => {
        void updateExportValidation(formdata);
      }}
      values={ExportValidationData}
    >
      <AutoFormSubmit className="float-right">
        <>{languageData.Save}</>
      </AutoFormSubmit>
    </AutoForm>
  );
}
