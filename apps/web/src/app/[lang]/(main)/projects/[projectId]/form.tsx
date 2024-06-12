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
import { toast } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  AbpForDeploy_ProjectService_ProjectsDto_CreateUpdateProjectDto,
  AbpForDeploy_ProjectService_Projects_ProjectDto,
  Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationResourceDto,
} from "@ayasofyazilim/saas/ProjectService";
import CustomButton from "@repo/ayasofyazilim-ui/molecules/button";
import { NumericInput } from "@repo/ayasofyazilim-ui/molecules/numeric-input";
import { AccordionStepperHeader } from "@repo/ayasofyazilim-ui/organisms/accordion-stepper-header";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteProjectServer, updateProjectServer } from "../action";

export const numberFormatter = new Intl.NumberFormat("tr", {
  maximumFractionDigits: 0,
});
export interface INewProjectFormProps {
  resources: {
    [
      key: string
    ]: Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationResourceDto;
  };
  projectData: AbpForDeploy_ProjectService_Projects_ProjectDto;
  projectId: string;
}
export default function ProjectForm({
  projectId,
  resources,
  projectData,
}: INewProjectFormProps) {
  const [formValues, setFormValues] =
    useState<AbpForDeploy_ProjectService_ProjectsDto_CreateUpdateProjectDto>(
      projectData
    );
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (JSON.stringify(formValues) === JSON.stringify(projectData)) {
        setIsSubmitDisabled(true);
        return;
      }
      setIsSubmitDisabled(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [formValues]);

  async function onSaveClick() {
    setIsLoading(true);
    try {
      const result = await updateProjectServer(projectId, formValues);
      if (result.status === 200) {
        setIsSubmitDisabled(true);
        toast.success("Başarılı.");
      } else {
        toast.error(result?.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  async function onDeleteClick() {
    setIsLoading(true);
    try {
      await deleteProjectServer({ id: projectId });
    } catch (error: any) {
      toast.error(error.message);
      return;
    }
    toast.success("Başarılı.");
    redirect("/projects");
  }

  return (
    <>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1" className="my-2 border">
          <AccordionStepperHeader
            checked={
              !(
                !formValues?.projectName ||
                formValues?.projectName?.length < 4 ||
                !formValues?.projectDefinition ||
                formValues?.projectDefinition?.length < 4
              )
            }
            children="Temel Bilgiler"
          />

          <AccordionContent className="px-6">
            <div className="w-full">
              <div className="grid w-full items-center gap-3 mt-4">
                <Label htmlFor="projectName">
                  {languageData["ProjectName"]}
                </Label>
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
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="my-2 border">
          <AccordionStepperHeader
            checked={
              !(
                !formValues?.fundableAmount ||
                formValues?.fundableAmount === 0 ||
                !formValues?.fundCollectionType
              )
            }
            children="Bütçe"
          />
          <AccordionContent className="px-6">
            <div className="w-full">
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
                    value={formValues?.fundableAmount || 0}
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
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="my-2 border">
          <AccordionStepperHeader
            checked={
              !(
                !formValues?.overFunding ||
                (formValues?.overFunding === "Y" &&
                  !formValues?.additionalFundRate)
              )
            }
            children="Ek Fonlama"
          />
          <AccordionContent className="px-6">
            <div className="w-full">
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
                            value={parseInt(
                              formValues?.additionalFundRate || "0"
                            )}
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="mt-8 flex flex-row flex-wrap justify-between">
        <form action={onDeleteClick}>
          <CustomButton
            variant="secondary"
            isLoading={isLoading}
            className="w-[120px]"
          >
            Delete Project
          </CustomButton>
        </form>
        <form action={onSaveClick}>
          <CustomButton
            variant="default"
            isLoading={isLoading}
            disabled={isSubmitDisabled}
            className="w-[120px]"
          >
            Save Project
          </CustomButton>
        </form>
      </div>
    </>
  );
}
