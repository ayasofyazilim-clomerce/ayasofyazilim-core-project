"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import type {
  PutApiProjectServiceProjectsByIdData,
  UpwithCrowd_ProjectService_ProjectsDto_UpdateProjectDto,
  UpwithCrowd_ProjectService_Projects_ProjectDto,
} from "@ayasofyazilim/saas/ProjectService";
import CustomButton from "@repo/ayasofyazilim-ui/molecules/button";
import { NumericInput } from "@repo/ayasofyazilim-ui/molecules/numeric-input";
import { AccordionStepperHeader } from "@repo/ayasofyazilim-ui/organisms/accordion-stepper-header";
import { CircleX } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { ProjectStatusEnums } from "src/enums/project";
import {
  deleteProjectServer,
  updateProjectServer,
  updateProjectStatusServer,
} from "../action";

export const numberFormatter = new Intl.NumberFormat("tr", {
  maximumFractionDigits: 0,
});

const defaultFormValuesValidation = {
  projectName: undefined,
  projectDefinition: undefined,
  additionalFundRate: undefined,
  fundableAmount: undefined,
  overFunding: undefined,
  fundCollectionType: undefined,
};
export interface IProjectFormProps {
  languageData: any;
  projectData: UpwithCrowd_ProjectService_Projects_ProjectDto;
  projectId: string;
  profileType: string;
}
export default function ProjectForm({
  projectId,
  languageData,
  projectData,
  profileType,
}: IProjectFormProps) {
  const [formValues, setFormValues] =
    useState<UpwithCrowd_ProjectService_ProjectsDto_UpdateProjectDto>(
      projectData,
    );
  const [formValuesValidation, setFormValuesValidation] = useState<
    Record<string, boolean | undefined>
  >(defaultFormValuesValidation);
  const [formValuesValidationChanged, setFormValuesValidationChanged] =
    useState(false);

  const isAdmin = profileType === "admin";
  const [accordionTab, setAccordionTab] = useState("item-1");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const isInputEditDisabled =
    isAdmin ||
    isLoading ||
    (projectData.status !== ProjectStatusEnums.IN_DRAFT_STAGE &&
      projectData.status !== ProjectStatusEnums.NOT_APPROVED);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (JSON.stringify(formValues) === JSON.stringify(projectData)) {
        setIsSubmitDisabled(true);
        return;
      }
      setIsSubmitDisabled(false);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [formValues]);

  async function onEvaluateClick() {
    setIsLoading(true);
    try {
      const isApproved =
        Object.values(formValuesValidation).filter((i) => i === false)
          .length === 0;
      const result = await updateProjectStatusServer(
        projectId,
        isApproved
          ? ProjectStatusEnums.APPROVED
          : ProjectStatusEnums.NOT_APPROVED,
      );
      setFormValuesValidationChanged(false);
      if (result.status === 200) {
        setIsSubmitDisabled(true);
        toast.success("Başarılı.");
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function onSaveClick() {
    setIsLoading(true);
    try {
      formValues.status = ProjectStatusEnums.IN_DRAFT_STAGE;
      const result = await updateProjectServer(
        projectId,
        formValues as PutApiProjectServiceProjectsByIdData,
      );
      if (result.status === 200) {
        setIsSubmitDisabled(true);
        toast.success("Başarılı.");
      } else {
        toast.error(result.message);
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
        className="w-full"
        collapsible
        onValueChange={setAccordionTab}
        type="single"
        value={accordionTab}
      >
        <AccordionItem className="my-2 border" value="item-1">
          <AccordionStepperHeader
            checked={
              !(
                !formValues.projectName ||
                formValues.projectName.length < 4 ||
                !formValues.projectDefinition ||
                formValues.projectDefinition.length < 4
              ) &&
              formValuesValidation.projectName !== false &&
              formValuesValidation.projectDefinition !== false
            }
            children="Temel Bilgiler"
            customCheckedIconColor={
              formValuesValidation.projectName &&
              formValuesValidation.projectDefinition
                ? "text-emerald-600"
                : "text-muted-foreground"
            }
            customUncheckedIcon={
              formValuesValidation.projectName === false &&
              formValuesValidation.projectDefinition === false
                ? CircleX
                : undefined
            }
            customUncheckedIconColor={
              formValuesValidation.projectName === false &&
              formValuesValidation.projectDefinition === false
                ? "text-red-500"
                : "text-muted-foreground"
            }
          />

          <AccordionContent className="px-6">
            <div className="w-full">
              <div className="grid w-full items-center gap-3 mt-4">
                <Label htmlFor="projectName">{languageData.ProjectName}</Label>
                <Input
                  disabled={isInputEditDisabled}
                  id="projectName"
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      projectName: e.target.value,
                    });
                  }}
                  value={formValues.projectName || ""}
                />
                <p className="text-[0.8rem] text-muted-foreground">
                  {languageData.ProjectNameInfo}
                </p>
              </div>
              <div className="grid w-full items-center gap-3 mt-4">
                <Label htmlFor="projectDefinition">
                  {languageData.ProjectDescription}
                </Label>
                <Textarea
                  disabled={isInputEditDisabled}
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      projectDefinition: e.target.value,
                    });
                  }}
                  value={formValues.projectDefinition || ""}
                />
                <p className="text-[0.8rem] text-muted-foreground">
                  {languageData.ProjectDescriptionInfo}
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-row flex-wrap justify-end gap-4">
              {projectData.status === ProjectStatusEnums.SENT_FOR_APPROVAL &&
                profileType === "admin" && (
                  <>
                    <CustomButton
                      className="w-[120px]"
                      onClick={() => {
                        setFormValuesValidation({
                          ...formValuesValidation,
                          projectName: false,
                          projectDefinition: false,
                        });
                        setFormValuesValidationChanged(true);
                        setAccordionTab("item-2");
                      }}
                      variant="destructive"
                    >
                      Reddet
                    </CustomButton>

                    <CustomButton
                      className="w-[120px]"
                      customVariant="success"
                      onClick={() => {
                        setFormValuesValidation({
                          ...formValuesValidation,
                          projectName: true,
                          projectDefinition: true,
                        });
                        setFormValuesValidationChanged(true);
                        setAccordionTab("item-2");
                      }}
                    >
                      Onayla
                    </CustomButton>
                  </>
                )}
              {profileType === "entrepreneur" && (
                <CustomButton
                  className="w-[120px]"
                  onClick={() => {
                    setAccordionTab("item-2");
                  }}
                  variant="secondary"
                >
                  İlerle
                </CustomButton>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="my-2 border" value="item-2">
          <AccordionStepperHeader
            checked={
              !(
                !formValues.fundableAmount ||
                formValues.fundableAmount === 0 ||
                !formValues.fundCollectionType
              ) &&
              formValuesValidation.fundableAmount !== false &&
              formValuesValidation.fundCollectionType !== false
            }
            children="Bütçe"
            customCheckedIconColor={
              formValuesValidation.fundCollectionType &&
              formValuesValidation.fundableAmount
                ? "text-emerald-600"
                : "text-muted-foreground"
            }
            customUncheckedIcon={
              formValuesValidation.fundCollectionType === false &&
              formValuesValidation.fundableAmount === false
                ? CircleX
                : undefined
            }
            customUncheckedIconColor={
              formValuesValidation.fundCollectionType === false &&
              formValuesValidation.fundableAmount === false
                ? "text-red-500"
                : "text-muted-foreground"
            }
          />
          <AccordionContent className="px-6">
            <div className="w-full">
              <div className="grid w-full items-center gap-3 mt-4 ">
                <Label htmlFor="fundCollectionType">
                  {languageData.FundCollectionType}
                </Label>
                <div className="relative">
                  <Select
                    disabled={isInputEditDisabled}
                    onValueChange={(value) => {
                      setFormValues({
                        ...formValues,
                        fundCollectionType: value,
                      });
                    }}
                    value={formValues.fundCollectionType || ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="SHRE">
                          {languageData.FundCollectionTypeSHRE}
                        </SelectItem>
                        <SelectItem value="DBIT">
                          {languageData.FundCollectionTypeDBIT}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-[0.8rem] text-muted-foreground">
                  {languageData.FundCollectionTypeInfo}
                </p>
              </div>
              <div className="grid w-full items-center gap-3 mt-4 ">
                <div className="relative">
                  <NumericInput
                    direction="column"
                    disabled={isInputEditDisabled}
                    id="fundableAmount"
                    inputLabel="₺"
                    label={languageData.FundableAmount}
                    max={1000000}
                    min={0}
                    onValueChange={(value) => {
                      setFormValues({ ...formValues, fundableAmount: value });
                    }}
                    slider={!isInputEditDisabled}
                    subLabel=""
                    value={formValues.fundableAmount || 0}
                  />
                  <p className="text-[0.8rem] text-muted-foreground mt-2">
                    {languageData.FundableAmountInfo}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-row flex-wrap justify-end gap-4">
              {profileType === "admin" && (
                <>
                  <CustomButton
                    className="w-[120px]"
                    onClick={() => {
                      setFormValuesValidation({
                        ...formValuesValidation,
                        fundCollectionType: false,
                        fundableAmount: false,
                      });
                      setFormValuesValidationChanged(true);
                      setAccordionTab("item-3");
                    }}
                    variant="destructive"
                  >
                    Reddet
                  </CustomButton>

                  <CustomButton
                    className="w-[120px]"
                    customVariant="success"
                    onClick={() => {
                      setFormValuesValidation({
                        ...formValuesValidation,
                        fundCollectionType: true,
                        fundableAmount: true,
                      });
                      setFormValuesValidationChanged(true);
                      setAccordionTab("item-3");
                    }}
                  >
                    Onayla
                  </CustomButton>
                </>
              )}
              {profileType === "entrepreneur" && (
                <CustomButton
                  className="w-[120px]"
                  onClick={() => {
                    setAccordionTab("item-3");
                  }}
                  variant="secondary"
                >
                  İlerle
                </CustomButton>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="my-2 border" value="item-3">
          <AccordionStepperHeader
            checked={
              !(
                !formValues.overFunding ||
                (formValues.overFunding === "Y" &&
                  !formValues.additionalFundRate)
              ) &&
              formValuesValidation.overFunding !== false &&
              formValuesValidation.additionalFundRate !== false
            }
            children="Ek Fonlama"
            customCheckedIconColor={
              formValuesValidation.overFunding &&
              formValuesValidation.additionalFundRate
                ? "text-emerald-600"
                : "text-muted-foreground"
            }
            customUncheckedIcon={
              formValuesValidation.overFunding === false &&
              formValuesValidation.additionalFundRate === false
                ? CircleX
                : undefined
            }
            customUncheckedIconColor={
              formValuesValidation.overFunding === false &&
              formValuesValidation.additionalFundRate === false
                ? "text-red-500"
                : "text-muted-foreground"
            }
          />
          <AccordionContent className="px-6">
            <div className="w-full">
              <div className="grid w-full items-center gap-3 mt-4 ">
                <Label htmlFor="overFunding">
                  {languageData.AdditionalFunding}
                </Label>
                <div className="relative">
                  <Select
                    disabled={isInputEditDisabled}
                    onValueChange={(value) => {
                      setFormValues({ ...formValues, overFunding: value });
                    }}
                    value={formValues.overFunding || ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Y">
                          {languageData.AdditionalFundingYes}
                        </SelectItem>
                        <SelectItem value="N">
                          {languageData.AdditionalFundingNo}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-[0.8rem] text-muted-foreground">
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
                      <div className="grid w-full items-center gap-3 mt-4 ">
                        <div className="relative">
                          <NumericInput
                            direction="column"
                            disabled={isInputEditDisabled}
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
                            slider={!isInputEditDisabled}
                            subLabel=""
                            value={parseInt(
                              formValues.additionalFundRate || "0",
                            )}
                          />
                          <p className="text-[0.8rem] text-muted-foreground mt-2">
                            {languageData.AdditionalFundingRateInfo}
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </div>

            <div className="mt-8 flex flex-row flex-wrap justify-end gap-4">
              {projectData.status === ProjectStatusEnums.SENT_FOR_APPROVAL &&
                profileType === "admin" && (
                  <>
                    <CustomButton
                      className="w-[120px]"
                      onClick={() => {
                        setFormValuesValidation({
                          ...formValuesValidation,
                          overFunding: false,
                          additionalFundRate: false,
                        });
                        setFormValuesValidationChanged(true);
                        setAccordionTab("");
                      }}
                      variant="destructive"
                    >
                      Reddet
                    </CustomButton>
                    <CustomButton
                      className="w-[120px]"
                      customVariant="success"
                      onClick={() => {
                        setFormValuesValidation({
                          ...formValuesValidation,
                          overFunding: true,
                          additionalFundRate: true,
                        });
                        setFormValuesValidationChanged(true);
                        setAccordionTab("");
                      }}
                    >
                      Onayla
                    </CustomButton>
                  </>
                )}
              {profileType === "entrepreneur" && (
                <CustomButton
                  className="w-[120px]"
                  onClick={() => {
                    setAccordionTab("");
                  }}
                  variant="secondary"
                >
                  İlerle
                </CustomButton>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="mt-8 flex flex-row flex-wrap justify-end gap-5">
        {projectData.status === ProjectStatusEnums.SENT_FOR_APPROVAL &&
          profileType === "admin" && (
            <form action={onEvaluateClick}>
              <CustomButton
                className="w-[200px]"
                disabled={
                  isLoading ||
                  !formValuesValidationChanged ||
                  Object.values(formValuesValidation).filter(
                    (i) => i === undefined,
                  ).length !== 0
                }
                isLoading={isLoading}
                variant="secondary"
              >
                Değerlendirmeyi Tamamla
              </CustomButton>
            </form>
          )}
        {profileType === "entrepreneur" && (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-[120px]" variant="secondary">
                  Projeyi Sil
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Projeyi Sil</DialogTitle>
                  <DialogDescription>
                    Projeyi silmek istediğinize emin misiniz? Bu işlem geri
                    alınamaz.
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <form action={onDeleteClick}>
                    <CustomButton
                      disabled={isLoading}
                      isLoading={isLoading}
                      type="submit"
                    >
                      Projeyi Sil
                    </CustomButton>
                  </form>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <form action={onSaveClick}>
              <CustomButton
                className="w-[120px]"
                disabled={isSubmitDisabled}
                isLoading={isLoading}
                variant="default"
              >
                Save Project
              </CustomButton>
            </form>
          </>
        )}
      </div>
    </>
  );
}
