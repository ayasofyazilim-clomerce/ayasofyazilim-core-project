"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AbpForDeploy_ProjectService_ProjectsDto_CreateUpdateProjectDto,
  Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationResourceDto,
} from "@ayasofyazilim/saas/ProjectService";
import { default as CustomButton } from "@repo/ayasofyazilim-ui/molecules/button";
import { NumericInput } from "@repo/ayasofyazilim-ui/molecules/numeric-input";
import Stepper, {
  StepperContent,
} from "@repo/ayasofyazilim-ui/organisms/stepper";
import { CircleCheckBigIcon, CircleXIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { getBaseLink } from "src/utils";
import { createNewProjectServer } from "../action";
import { Card } from "@/components/ui/card";

export const numberFormatter = new Intl.NumberFormat("tr", {
  maximumFractionDigits: 0,
});

export interface INewProjectFormProps {
  resources: {
    [
      key: string
    ]: Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationResourceDto;
  };
}
export default function NewProjectForm({ resources }: INewProjectFormProps) {
  const projectResource = resources?.["ProjectService"]?.texts;
  const uiResource = resources?.["AbpUi"]?.texts;

  const languageData = {
    Next: uiResource?.["PagerNext"] || "Next",
    Previous: uiResource?.["PagerPrevious"] || "Previous",
    "Tab:CreateProject":
      projectResource?.["Tab:CreateProject"] || "Create Project",
    "Tab:ProjectDetails":
      projectResource?.["Tab:ProjectDetails"] || "Project Details",
    "Tab:AdditionalFunding":
      projectResource?.["Tab:AdditionalFunding"] || "Additional Funding",
    "Tab:Summary": uiResource?.["Summary"] || "Summary",
    "Tab:ViewProject": projectResource?.["Tab:ViewProject"] || "View Project",
    "Messages:ProjectCreated":
      projectResource?.["Messages:ProjectCreated"] ||
      "The project has been created successfully.",
    "Messages:ProjectCreationError":
      projectResource?.["Messages:ProjectCreationError"] ||
      "An error occurred while creating the project.",
    ProjectName: projectResource?.["ProjectName"] || "Project name",
    ProjectNameInfo:
      projectResource?.["ProjectNameInfo"] ||
      "A headline that describes your project in a way that attracts investors' attention.",
    ProjectDescription:
      projectResource?.["ProjectDescription"] || "Project description",
    ProjectDescriptionInfo:
      projectResource?.["ProjectDescriptionInfo"] ||
      "Briefly describe your project in a way that attracts investors' attention.",
    FundCollectionType:
      projectResource?.["FundCollectionType"] || "Project type",
    FundCollectionTypeInfo:
      projectResource?.["FundCollectionTypeInfo"] || "Type of your project.",
    FundCollectionTypeSHRE:
      projectResource?.["FundCollectionTypeSHRE"] || "Share based",
    FundCollectionTypeDBIT:
      projectResource?.["FundCollectionTypeDBIT"] || "Dept based",
    FundableAmount: projectResource?.["FundableAmount"] || "Fundable amount",
    FundableAmountInfo:
      projectResource?.["FundableAmountInfo"] ||
      "The amount of investment you want to make in your project.",
    AdditionalFunding:
      projectResource?.["AdditionalFunding"] || "Additional funding",
    AdditionalFundingInfo:
      projectResource?.["AdditionalFundingInfo"] ||
      "When your project reaches the fundable amount, should extra funds continue to be collected up to the amount you specify?",
    AdditionalFundingYes: projectResource?.["AdditionalFundingYes"] || "Yes",
    AdditionalFundingNo: projectResource?.["AdditionalFundingNo"] || "No",
    AdditionalFundingRate:
      projectResource?.["AdditionalFundingRate"] ||
      "Rate of additional funding",
    AdditionalFundingRateInfo:
      projectResource?.["AdditionalFundingRateInfo"] ||
      "The rate of additional funding that will be collected in case your project is overfunded.",
  };

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [formValues, setFormValues] =
    useState<AbpForDeploy_ProjectService_ProjectsDto_CreateUpdateProjectDto>({
      additionalFundRate: "0",
      fundableAmount: 0,
    });

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [projectId, setProjectId] = useState<string>();

  async function createNewProject() {
    setLoading(true);
    const response = await createNewProjectServer(formValues);
    if (response && response.status === 200 && response?.projectData) {
      setProjectId(response?.projectData?.id);
    } else {
      setError(response?.message);
    }
    setLoading(false);
  }
  return (
    <Card className="p-6">
      <Stepper
        activeTabIndex={activeTabIndex}
        nextButtonText={languageData["Next"]}
        previousButtonText={languageData["Previous"]}
        onIndexChange={setActiveTabIndex}
      >
        <StepperContent
          title={languageData["Tab:CreateProject"]}
          canGoBack={false}
          isNextDisabled={
            !formValues?.projectName ||
            formValues?.projectName?.length < 4 ||
            !formValues?.projectDefinition ||
            formValues?.projectDefinition?.length < 4
          }
        >
          <div className="w-full">
            <h4 className="text-2xl font-bold text-black">
              {languageData["Tab:CreateProject"]}
            </h4>
            <div className="grid w-full items-center gap-3 mt-4">
              <Label htmlFor="projectName">{languageData["ProjectName"]}</Label>
              <Input
                id="projectName"
                value={formValues?.projectName || ""}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    projectName: e.target.value,
                  })
                }
              />
              <p className="text-[0.8rem] text-muted-foreground">
                {languageData["ProjectNameInfo"]}
              </p>
            </div>
            <div className="grid w-full items-center gap-3 mt-4">
              <Label htmlFor="projectDefinition">
                {languageData["ProjectDescription"]}
              </Label>
              <Textarea
                value={formValues?.projectDefinition || ""}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    projectDefinition: e.target.value,
                  })
                }
              />
              <p className="text-[0.8rem] text-muted-foreground">
                {languageData["ProjectDescriptionInfo"]}
              </p>
            </div>
          </div>
        </StepperContent>
        <StepperContent
          title={languageData["Tab:ProjectDetails"]}
          isNextDisabled={
            !formValues?.fundableAmount ||
            formValues?.fundableAmount === 0 ||
            !formValues?.fundCollectionType
          }
        >
          <div className="flex flex-col gap-2"></div>
          <div className="w-full">
            <h4 className="text-2xl font-bold text-black">
              {languageData["Tab:ProjectDetails"]}
            </h4>

            <div className="grid w-full items-center gap-3 mt-4 ">
              <Label htmlFor="fundCollectionType">
                {languageData["FundCollectionType"]}
              </Label>
              <div className="relative">
                <Select
                  value={formValues?.fundCollectionType || ""}
                  onValueChange={(value) =>
                    setFormValues({
                      ...formValues,
                      fundCollectionType: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="SHRE">
                        {languageData["FundCollectionTypeSHRE"]}
                      </SelectItem>
                      <SelectItem value="DBIT">
                        {languageData["FundCollectionTypeDBIT"]}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-[0.8rem] text-muted-foreground">
                {languageData["FundCollectionTypeInfo"]}
              </p>
            </div>
            <div className="grid w-full items-center gap-3 mt-4 ">
              <div className="relative">
                <NumericInput
                  id="fundableAmount"
                  label={languageData["FundableAmount"]}
                  max={1000000}
                  min={0}
                  subLabel={""}
                  inputLabel="₺"
                  slider
                  direction="column"
                  onValueChange={(value) => {
                    setFormValues({ ...formValues, fundableAmount: value });
                  }}
                />
                <p className="text-[0.8rem] text-muted-foreground mt-2">
                  {languageData["FundableAmountInfo"]}
                </p>
              </div>
            </div>
          </div>
        </StepperContent>
        <StepperContent
          title={languageData["Tab:AdditionalFunding"]}
          isNextDisabled={
            !formValues?.overFunding ||
            (formValues?.overFunding === "Y" && !formValues?.additionalFundRate)
          }
        >
          <div className="flex flex-col gap-2"></div>
          <div className="w-full">
            <h4 className="text-2xl font-bold text-black">
              {languageData["Tab:AdditionalFunding"]}
            </h4>

            <div className="grid w-full items-center gap-3 mt-4 ">
              <Label htmlFor="overFunding">
                {languageData["AdditionalFunding"]}
              </Label>
              <div className="relative">
                <Select
                  value={formValues?.overFunding || ""}
                  onValueChange={(value) =>
                    setFormValues({ ...formValues, overFunding: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Y">
                        {languageData["AdditionalFundingYes"]}
                      </SelectItem>
                      <SelectItem value="N">
                        {languageData["AdditionalFundingNo"]}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-[0.8rem] text-muted-foreground">
                {languageData["AdditionalFundingInfo"]}
              </p>
            </div>
            {formValues?.overFunding === "Y" && (
              <Accordion
                type="single"
                defaultValue="item-1"
                collapsible
                className="w-full"
              >
                <AccordionItem value="item-1">
                  <AccordionContent>
                    <div className="grid w-full items-center gap-3 mt-4 ">
                      <div className="relative">
                        <NumericInput
                          id="additionalFundRate"
                          label={languageData["AdditionalFundingRate"]}
                          max={20}
                          min={0}
                          subLabel={""}
                          inputLabel="%"
                          slider
                          direction="column"
                          onValueChange={(value) => {
                            setFormValues({
                              ...formValues,
                              additionalFundRate: value.toString(),
                            });
                          }}
                        />
                        <p className="text-[0.8rem] text-muted-foreground mt-2">
                          {languageData["AdditionalFundingRateInfo"]}
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
          title={languageData["Tab:Summary"]}
          canGoBack={false}
          canGoNext={false}
        >
          <div className="flex flex-col gap-2"></div>

          {projectId && (
            <div className="flex flex-col items-center">
              <CircleCheckBigIcon size={120} color="#2dac5c" />
              <h3 className="mt-2">
                {languageData["Messages:ProjectCreated"]}
              </h3>
              <CustomButton className="mt-4">
                <Link href={getBaseLink("projects/" + projectId, true)}>
                  {languageData["Tab:ViewProject"]}
                </Link>
              </CustomButton>
            </div>
          )}
          {error && (
            <div className="flex flex-col items-center">
              <CircleXIcon size={120} color="#fe1265" />
              <h3 className="mt-2">
                {languageData["Messages:ProjectCreationError"]}
              </h3>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          )}
          {!projectId && !error && (
            <>
              <div className="flex flex-col gap-4 bg-white p-4">
                <div className="flex items-end justify-between gap-4 w-full items-center">
                  <h3 className="text-sm font-semibold text-muted-foreground">
                    {languageData["ProjectName"]}:
                  </h3>
                  <span className="text-md font-semibold max-w-sm">
                    {formValues["projectName"]}
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4 w-full items-center">
                  <h3 className="text-sm font-semibold text-muted-foreground">
                    {languageData["ProjectDescription"]}:
                  </h3>
                  <span className="text-md font-semibold max-w-sm">
                    {formValues["projectDefinition"]}
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4 w-full items-center">
                  <h3 className="text-sm font-semibold text-muted-foreground">
                    {languageData["FundCollectionType"]}:
                  </h3>
                  <span className="text-md font-semibold max-w-sm">
                    {formValues["fundCollectionType"] === "SHRE"
                      ? languageData["FundCollectionTypeSHRE"]
                      : languageData["FundCollectionTypeDBIT"]}
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4 w-full items-center">
                  <h3 className="text-sm font-semibold text-muted-foreground">
                    {languageData["FundableAmount"]}:
                  </h3>
                  <span className="text-md font-semibold max-w-sm">
                    {numberFormatter.format(formValues["fundableAmount"] || 0)}₺
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4 w-full items-center">
                  <h3 className="text-sm font-semibold text-muted-foreground">
                    {languageData["AdditionalFunding"]}:
                  </h3>
                  <span className="text-md font-semibold max-w-sm">
                    {formValues["overFunding"] === "Y"
                      ? languageData["AdditionalFundingYes"]
                      : languageData["AdditionalFundingNo"]}
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4 w-full items-center">
                  <h3 className="text-sm font-semibold text-muted-foreground">
                    {languageData["AdditionalFundingRate"]}:
                  </h3>
                  <span className="text-md font-semibold max-w-sm">
                    {formValues["additionalFundRate"] ?? 0}%
                  </span>
                </div>
              </div>
              <CustomButton
                className="w-full mt-4"
                isLoading={loading}
                onClick={createNewProject}
              >
                {languageData["Tab:CreateProject"]}
              </CustomButton>
            </>
          )}
        </StepperContent>
      </Stepper>
    </Card>
  );
}
