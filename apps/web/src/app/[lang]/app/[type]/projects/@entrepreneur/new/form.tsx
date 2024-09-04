/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument -- TODO: we need to fix this*/
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { UpwithCrowd_ProjectService_ProjectsDto_CreateProjectDto } from "@ayasofyazilim/saas/ProjectService";
import { default as CustomButton } from "@repo/ayasofyazilim-ui/molecules/button";
import { NumericInput } from "@repo/ayasofyazilim-ui/molecules/numeric-input";
import SelectTabs, {
  SelectTabsContent,
} from "@repo/ayasofyazilim-ui/molecules/select-tabs";
import Stepper, {
  StepperContent,
} from "@repo/ayasofyazilim-ui/organisms/stepper";
import {
  Blocks,
  CircleCheckBigIcon,
  CircleXIcon,
  HandCoins,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { getBaseLink } from "src/utils";
import { createNewProjectServer } from "../../action";

export const numberFormatter = new Intl.NumberFormat("tr", {
  maximumFractionDigits: 0,
});

export interface NewProjectFormProps {
  languageData: any;
  fundraiserId: string;
}
export default function NewProjectForm({
  languageData,
  fundraiserId,
}: NewProjectFormProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [formValues, setFormValues] =
    useState<UpwithCrowd_ProjectService_ProjectsDto_CreateProjectDto>({
      additionalFundRate: "0",
      fundableAmount: 0,
      name: "",
      definition: "",
      cashValue: 0,
      fundNominalAmount: 0,
      overFunding: "",
      fundCollectionType: "",
      status: 0,
      type: 0,
      fundraiserId,
    });

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [projectId, setProjectId] = useState<string>();

  function createNewProject() {
    setLoading(true);
    void createNewProjectServer(formValues).then((response) => {
      if (response.status === 200 && response.projectData) {
        setProjectId(response.projectData.id);
      } else {
        setError(response.message);
      }
      setLoading(false);
    });
  }
  return (
    <Card className="px-6 py-4">
      <Stepper
        activeTabIndex={activeTabIndex}
        nextButtonText={languageData.Next}
        onIndexChange={setActiveTabIndex}
        previousButtonText={languageData.Previous}
      >
        <StepperContent
          canGoBack={false}
          isNextDisabled={
            !formValues.name ||
            formValues.name.length < 4 ||
            !formValues.definition ||
            formValues.definition.length < 4
          }
          title={languageData.CreateProject}
        >
          <div className="w-full">
            <h4 className="text-2xl font-bold text-black">
              {languageData.CreateProject}
            </h4>
            <div className="mt-2 grid w-full items-center gap-3">
              <Label htmlFor="projectName">{languageData.ProjectName}</Label>
              <Input
                id="projectName"
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    name: e.target.value,
                  });
                }}
                value={formValues.name || ""}
              />
              <p className="text-muted-foreground text-[0.8rem]">
                {languageData.ProjectNameInfo}
              </p>
            </div>
            <div className="mt-4 grid w-full items-center gap-3">
              <Label htmlFor="projectDefinition">
                {languageData.ProjectDescription}
              </Label>
              <Textarea
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    definition: e.target.value,
                  });
                }}
                value={formValues.definition || ""}
              />
              <p className="text-muted-foreground text-[0.8rem]">
                {languageData.ProjectDescriptionInfo}
              </p>
            </div>
          </div>
        </StepperContent>
        <StepperContent
          isNextDisabled={
            !formValues.fundableAmount ||
            formValues.fundableAmount === 0 ||
            !formValues.fundCollectionType
          }
          title={languageData.ProjectDetails}
        >
          <div className="flex flex-col gap-2" />
          <div className="w-full">
            <h4 className="text-2xl font-bold text-black">
              {languageData.ProjectDetails}
            </h4>

            <div className="mt-2 grid w-full items-center gap-3 ">
              <Label htmlFor="fundCollectionType">
                {languageData.FundCollectionType}
              </Label>
              <div className="relative">
                <SelectTabs
                  onValueChange={(value) => {
                    setFormValues({ ...formValues, fundCollectionType: value });
                  }}
                  value={formValues.fundCollectionType || ""}
                >
                  <SelectTabsContent value="SHRE">
                    <div className="flex flex-row items-center gap-1">
                      <Blocks />
                      {languageData.FundCollectionTypeSHRE}
                    </div>
                  </SelectTabsContent>
                  <SelectTabsContent value="DBIT">
                    <div className="flex flex-row items-center gap-1">
                      <HandCoins />
                      {languageData.FundCollectionTypeDBIT}
                    </div>
                  </SelectTabsContent>
                </SelectTabs>
              </div>
              <p className="text-muted-foreground text-[0.8rem]">
                {languageData.FundCollectionTypeInfo}
              </p>
            </div>
            <div className="mt-2 grid w-full items-center gap-3 ">
              <div className="relative">
                <NumericInput
                  direction="column"
                  id="fundableAmount"
                  inputLabel="₺"
                  label={languageData.FundableAmount}
                  max={1000000}
                  min={0}
                  onValueChange={(value) => {
                    setFormValues({ ...formValues, fundableAmount: value });
                  }}
                  slider
                  subLabel=""
                />
                <p className="text-muted-foreground mt-2 text-[0.8rem]">
                  {languageData.FundableAmountInfo}
                </p>
              </div>
            </div>
          </div>
        </StepperContent>
        <StepperContent
          isNextDisabled={
            !formValues.overFunding ||
            (formValues.overFunding === "Y" && !formValues.additionalFundRate)
          }
          title={languageData.AdditionalFunding}
        >
          <div className="flex flex-col gap-2" />
          <div className="w-full">
            <h4 className="text-2xl font-bold text-black">
              {languageData.AdditionalFunding}
            </h4>

            <div className="mt-2 grid w-full items-center gap-3 ">
              <Label htmlFor="overFunding">
                {languageData.AdditionalFunding}
              </Label>
              <div className="relative">
                <SelectTabs
                  onValueChange={(value: string) => {
                    setFormValues({ ...formValues, overFunding: value });
                  }}
                  value={formValues.overFunding || ""}
                >
                  <SelectTabsContent value="Y">
                    <div className="flex flex-row items-center gap-1">
                      <Blocks />
                      {languageData.AdditionalFundingYes}
                    </div>
                  </SelectTabsContent>
                  <SelectTabsContent value="N">
                    <div className="flex flex-row items-center gap-1">
                      <HandCoins />
                      {languageData.AdditionalFundingNo}
                    </div>
                  </SelectTabsContent>
                </SelectTabs>
              </div>
              <p className="text-muted-foreground text-[0.8rem]">
                {languageData.AdditionalFundingInfo}
              </p>
            </div>
            {formValues.overFunding === "Y" && (
              <Accordion
                className="w-full"
                collapsible
                defaultValue="item-1"
                type="single"
              >
                <AccordionItem value="item-1">
                  <AccordionContent>
                    <div className="mt-2 grid w-full items-center gap-3 ">
                      <div className="relative">
                        <NumericInput
                          direction="column"
                          id="additionalFundRate"
                          inputLabel="%"
                          label={languageData.AdditionalFundingRate}
                          max={20}
                          min={0}
                          onValueChange={(value) => {
                            setFormValues({
                              ...formValues,
                              additionalFundRate: value.toString(),
                            });
                          }}
                          slider
                          subLabel=""
                        />
                        <p className="text-muted-foreground mt-2 text-[0.8rem]">
                          {languageData.AdditionalFundingRateInfo}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>
        </StepperContent>
        <StepperContent
          canGoBack={false}
          canGoNext={false}
          title={languageData.Summary}
        >
          <div className="flex flex-col gap-2" />

          {projectId ? (
            <div className="flex flex-col items-center">
              <CircleCheckBigIcon color="#2dac5c" size={120} />
              <h3 className="mt-2">
                {languageData["Messages:ProjectCreated"]}
              </h3>
              <CustomButton className="mt-4">
                <Link
                  href={getBaseLink(
                    `app/entrepreneur/projects/${projectId}`,
                    true,
                  )}
                >
                  {languageData.ViewProject}
                </Link>
              </CustomButton>
            </div>
          ) : null}
          {error ? (
            <div className="flex flex-col items-center">
              <CircleXIcon color="#fe1265" size={120} />
              <h3 className="mt-2">
                {languageData["Messages:ProjectCreationError"]}
              </h3>
              <p className="text-muted-foreground text-sm">{error}</p>
            </div>
          ) : null}
          {!projectId && !error && (
            <>
              <div className="flex flex-col gap-4 bg-white p-4">
                <div className="flex w-full items-end items-center justify-between gap-4">
                  <h3 className="text-muted-foreground text-sm font-semibold">
                    {languageData.ProjectName}:
                  </h3>
                  <span className="text-md max-w-sm font-semibold">
                    {formValues.name}
                  </span>
                </div>
                <div className="flex w-full items-end items-center justify-between gap-4">
                  <h3 className="text-muted-foreground text-sm font-semibold">
                    {languageData.ProjectDescription}:
                  </h3>
                  <span className="text-md max-w-sm font-semibold">
                    {formValues.definition}
                  </span>
                </div>
                <div className="flex w-full items-end items-center justify-between gap-4">
                  <h3 className="text-muted-foreground text-sm font-semibold">
                    {languageData.FundCollectionType}:
                  </h3>
                  <span className="text-md max-w-sm font-semibold">
                    {formValues.fundCollectionType === "SHRE"
                      ? languageData.FundCollectionTypeSHRE
                      : languageData.FundCollectionTypeDBIT}
                  </span>
                </div>
                <div className="flex w-full items-end items-center justify-between gap-4">
                  <h3 className="text-muted-foreground text-sm font-semibold">
                    {languageData.FundableAmount}:
                  </h3>
                  <span className="text-md max-w-sm font-semibold">
                    {numberFormatter.format(formValues.fundableAmount || 0)}₺
                  </span>
                </div>
                <div className="flex w-full items-end items-center justify-between gap-4">
                  <h3 className="text-muted-foreground text-sm font-semibold">
                    {languageData.AdditionalFunding}:
                  </h3>
                  <span className="text-md max-w-sm font-semibold">
                    {formValues.overFunding === "Y"
                      ? languageData.AdditionalFundingYes
                      : languageData.AdditionalFundingNo}
                  </span>
                </div>
                <div className="flex w-full items-end items-center justify-between gap-4">
                  <h3 className="text-muted-foreground text-sm font-semibold">
                    {languageData.AdditionalFundingRate}:
                  </h3>
                  <span className="text-md max-w-sm font-semibold">
                    {formValues.additionalFundRate}%
                  </span>
                </div>
              </div>
              <CustomButton
                className="mt-4 w-full"
                isLoading={loading}
                onClick={createNewProject}
              >
                {languageData.CreateProject}
              </CustomButton>
            </>
          )}
        </StepperContent>
      </Stepper>
    </Card>
  );
}
