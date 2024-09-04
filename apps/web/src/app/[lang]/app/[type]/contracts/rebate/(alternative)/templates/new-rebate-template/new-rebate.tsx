"use client";
import { toast } from "@/components/ui/sonner";
import type { ContractServiceResource } from "src/language-data/ContractService";
import Rebate from "../rebate";

export default function NewRebate({
  languageData,
}: {
  languageData: ContractServiceResource;
}) {
  return (
    <Rebate
      details={{}}
      initialFeesData={[]}
      initialSetupData={[]}
      languageData={languageData}
      onSubmit={() => {
        toast.success("Not implemented");
      }}
    />
  );
}
