"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { cn } from "@/lib/utils";
import type { GetApiProjectServiceProjectsByIdResponse } from "@ayasofyazilim/saas/ProjectService";
import CustomButton from "@repo/ayasofyazilim-ui/molecules/button";
import { NumericInput } from "@repo/ayasofyazilim-ui/molecules/numeric-input";
import { AccordionStepperHeader } from "@repo/ayasofyazilim-ui/organisms/accordion-stepper-header";
import { CalendarIcon, CircleX } from "lucide-react";
import { useState } from "react";
import { ProjectStatusEnums } from "src/enums/project";
import { updateProjectStatusServer } from "../../action";

export const numberFormatter = new Intl.NumberFormat("tr", {
  maximumFractionDigits: 0,
});

const defaultFormValuesValidation = {
  name: undefined,
  definition: undefined,
  additionalFundRate: undefined,
  fundableAmount: undefined,
  overFunding: undefined,
  startDate: undefined,
  fundCollectionType: undefined,
};
export interface ProjectFormProps {
  languageData: any;
  projectData: GetApiProjectServiceProjectsByIdResponse;
  projectId: string;
}
export default function ProjectForm({
  projectId,
  languageData,
  projectData,
}: ProjectFormProps) {
  const [formValues, setFormValues] =
    useState<GetApiProjectServiceProjectsByIdResponse>(projectData);
  const [formValuesValidation, setFormValuesValidation] = useState<
    Record<string, boolean | undefined>
  >(defaultFormValuesValidation);
  const [formValuesValidationChanged, setFormValuesValidationChanged] =
    useState(false);

  const [accordionTab, setAccordionTab] = useState("item-1");
  const [isLoading, setIsLoading] = useState(false);

  function onEvaluateClick() {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const isApproved =
        Object.values(formValuesValidation).filter((i) => i === false)
          .length === 0;
      void updateProjectStatusServer(
        projectId,
        isApproved
          ? ProjectStatusEnums.APPROVED
          : ProjectStatusEnums.NOT_APPROVED,
      ).then((response) => {
        setFormValuesValidationChanged(false);
        if (response.status === 200) {
          toast.success("Başarılı.");
        } else {
          toast.error(response.message);
        }
        setIsLoading(false);
      });
    } catch (error: any) {
      toast.error(error.message);
    }
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
        <AccordionItem className="border" value="item-1">
          <AccordionStepperHeader
            checked={
              !(
                !formValues.name ||
                formValues.name.length < 4 ||
                !formValues.definition ||
                formValues.definition.length < 4
              ) &&
              formValuesValidation.name !== false &&
              formValuesValidation.definition !== false
            }
            customCheckedIconColor={
              formValuesValidation.name && formValuesValidation.definition
                ? "text-emerald-600"
                : "text-muted-foreground"
            }
            customUncheckedIcon={
              formValuesValidation.name === false &&
              formValuesValidation.definition === false
                ? CircleX
                : undefined
            }
            customUncheckedIconColor={
              formValuesValidation.name === false &&
              formValuesValidation.definition === false
                ? "text-red-500"
                : "text-muted-foreground"
            }
          >
            Temel Bilgiler
          </AccordionStepperHeader>

          <AccordionContent className="px-6">
            <div className="w-full">
              <div className="grid w-full items-center gap-3 mt-4">
                <Label htmlFor="projectName">{languageData.ProjectName}</Label>
                <Input
                  disabled
                  id="projectName"
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      name: e.target.value,
                    });
                  }}
                  value={formValues.name || ""}
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
                  disabled
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      definition: e.target.value,
                    });
                  }}
                  value={formValues.definition || ""}
                />
                <p className="text-[0.8rem] text-muted-foreground">
                  {languageData.ProjectDescriptionInfo}
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-row flex-wrap justify-end gap-4">
              {projectData.status === ProjectStatusEnums.SENT_FOR_APPROVAL && (
                <>
                  <CustomButton
                    className="w-[120px]"
                    onClick={() => {
                      setFormValuesValidation({
                        ...formValuesValidation,
                        name: false,
                        definition: false,
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
                        name: true,
                        definition: true,
                      });
                      setFormValuesValidationChanged(true);
                      setAccordionTab("item-2");
                    }}
                  >
                    Onayla
                  </CustomButton>
                </>
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
          >
            Bütçe
          </AccordionStepperHeader>
          <AccordionContent className="px-6">
            <div className="w-full">
              <div className="grid w-full items-center gap-3 mt-4 ">
                <Label htmlFor="fundCollectionType">
                  {languageData.FundCollectionType}
                </Label>
                <div className="relative">
                  <Select
                    disabled
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
                    disabled
                    id="fundableAmount"
                    inputLabel="₺"
                    label={languageData.FundableAmount}
                    max={1000000}
                    min={0}
                    onValueChange={(value) => {
                      setFormValues({ ...formValues, fundableAmount: value });
                    }}
                    slider={false}
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
          >
            Ek Fonlama
          </AccordionStepperHeader>
          <AccordionContent className="px-6">
            <div className="w-full">
              <div className="grid w-full items-center gap-3 mt-4 ">
                <Label htmlFor="overFunding">
                  {languageData.AdditionalFunding}
                </Label>
                <div className="relative">
                  <Select
                    disabled
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
                            disabled
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
                            slider={false}
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
              {projectData.status === ProjectStatusEnums.SENT_FOR_APPROVAL && (
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
                      setAccordionTab("item-4");
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
                      setAccordionTab("item-4");
                    }}
                  >
                    Onayla
                  </CustomButton>
                </>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="my-2 border" value="item-4">
          <AccordionStepperHeader
            checked={
              Boolean(formValues.startDate) &&
              formValuesValidation.startDate !== false
            }
            customCheckedIconColor={
              formValuesValidation.startDate
                ? "text-emerald-600"
                : "text-muted-foreground"
            }
            customUncheckedIcon={
              !formValuesValidation.startDate ? CircleX : undefined
            }
            customUncheckedIconColor={
              formValuesValidation.startDate === false
                ? "text-red-500"
                : "text-muted-foreground"
            }
          >
            Tarih
          </AccordionStepperHeader>
          <AccordionContent className="px-6">
            <div className="w-full">
              <div className="grid w-full items-center gap-3 mt-4 ">
                <div className="relative">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !formValues.startDate && "text-muted-foreground",
                        )}
                        variant="outline"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formValues.startDate ? (
                          new Date(formValues.startDate).toLocaleDateString()
                        ) : (
                          <span>Tarih Seçin</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        fromDate={new Date()}
                        initialFocus
                        mode="single"
                        onSelect={(value) => {
                          setFormValues({
                            ...formValues,
                            startDate: value?.toISOString() || "",
                          });
                        }}
                        selected={new Date(formValues.startDate || 0)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <p className="text-[0.8rem] text-muted-foreground">
                  {languageData.ProjectStartDateInfo}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-row flex-wrap justify-end gap-4">
              {projectData.status === ProjectStatusEnums.SENT_FOR_APPROVAL && (
                <>
                  <CustomButton
                    className="w-[120px]"
                    onClick={() => {
                      setFormValuesValidation({
                        ...formValuesValidation,
                        startDate: false,
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
                        startDate: true,
                      });
                      setFormValuesValidationChanged(true);
                      setAccordionTab("");
                    }}
                  >
                    Onayla
                  </CustomButton>
                </>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="mt-8 flex flex-row flex-wrap justify-end gap-5">
        {projectData.status === ProjectStatusEnums.SENT_FOR_APPROVAL && (
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
      </div>
    </>
  );
}
