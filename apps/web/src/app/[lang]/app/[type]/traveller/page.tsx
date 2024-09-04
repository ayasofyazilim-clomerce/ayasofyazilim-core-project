"use server";
import React from "react";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import { getResourceData } from "src/language-data/TravellerService";
import Table from "./table";

export default async function Page({ params }: { params: { lang: string } }) {
  const { languageData } = await getResourceData(params.lang);
  return (
    <>
      <PageHeader
        description={languageData.TravellerDescription}
        title={languageData.Traveller}
      />
      <Card className="h-full p-5">
        <Table languageData={languageData} />
      </Card>
    </>
  );
}
