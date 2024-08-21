"use client";
import React from "react";
import AutoForm from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { $UniRefund_CRMService_Merchants_CreateMerchantDto } from "@ayasofyazilim/saas/CRMService";
import { createZodObject } from "src/utils";

export default function Page() {
  const schema =
    $UniRefund_CRMService_Merchants_CreateMerchantDto.properties
      .entityInformationTypes.items.properties.organizations.items;
  const positions = Object.keys(schema.properties);
  const formSchema = createZodObject(schema, positions);

  return (
    <div className="min-h-screen w-full bg-white">
      <AutoForm formSchema={formSchema} />
    </div>
  );
}
