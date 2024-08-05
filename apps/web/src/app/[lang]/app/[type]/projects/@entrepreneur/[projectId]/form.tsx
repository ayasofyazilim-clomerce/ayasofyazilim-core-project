"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type {
  GetApiProjectServiceProjectsByIdResponse,
  PutApiProjectServiceProjectsByIdData,
} from "@ayasofyazilim/saas/ProjectService";
import CustomButton from "@repo/ayasofyazilim-ui/molecules/button";
import { NumericInput } from "@repo/ayasofyazilim-ui/molecules/numeric-input";
import SelectTabs, {
  SelectTabsContent,
} from "@repo/ayasofyazilim-ui/molecules/select-tabs";
import { AccordionStepperHeader } from "@repo/ayasofyazilim-ui/organisms/accordion-stepper-header";
import { Blocks, CalendarIcon, HandCoins } from "lucide-react";
import { useEffect, useState } from "react";
import { ProjectStatusEnums } from "src/enums/project";
import { deleteProjectServer, updateProjectServer } from "../../action";

export const numberFormatter = new Intl.NumberFormat("tr", {
  maximumFractionDigits: 0,
});

export interface ProjectFormProps {
  languageData: any;
  projectData: GetApiProjectServiceProjectsByIdResponse;
  projectId: string;
  profileType: string;
}
export default function ProjectForm({
  projectId,
  languageData,
  projectData,
}: ProjectFormProps) {
  // const router = useRouter();
  const [formValues, setFormValues] =
    useState<GetApiProjectServiceProjectsByIdResponse>(projectData);

  const [accordionTab, setAccordionTab] = useState("basic-information");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const isInputEditDisabled =
    isLoading ||
    (projectData.status !== ProjectStatusEnums.IN_DRAFT_STAGE &&
      projectData.status !== ProjectStatusEnums.NOT_APPROVED);

  const isChecked = {
    generalInformation:
      formValues.name.length >= 4 && formValues.definition.length >= 4,
    budget:
      formValues.fundableAmount > 0 && formValues.fundCollectionType.length > 0,
    additionalFunding:
      formValues.overFunding === "N" ||
      (formValues.overFunding === "Y" && formValues.additionalFundRate !== "0"),
    date: Boolean(formValues.startDate),
  };
  const isAccordionTabDisabled = {
    budget: !isChecked.generalInformation,
    additionalFunding: !isChecked.budget || !isChecked.generalInformation,
    date:
      !isChecked.additionalFunding ||
      !isChecked.budget ||
      !isChecked.generalInformation,
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (
        JSON.stringify(formValues) === JSON.stringify(projectData) ||
        isAccordionTabDisabled.date ||
        !isChecked.date
      ) {
        setIsSubmitDisabled(true);
        return;
      }
      setIsSubmitDisabled(false);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [formValues]);

  function onSaveClick() {
    setIsLoading(true);
    try {
      formValues.status = ProjectStatusEnums.IN_DRAFT_STAGE;

      void updateProjectServer(
        projectId,
        formValues as PutApiProjectServiceProjectsByIdData["requestBody"],
      ).then((response) => {
        if (response.status === 200) {
          setIsSubmitDisabled(true);
          toast.success("Basarıyla kaydedildi.");
        } else {
          toast.error(response.message);
        }
        setIsLoading(false);
      });
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    }
  }
  function onDeleteClick() {
    setIsLoading(true);
    try {
      void deleteProjectServer({ id: projectId }).then((response) => {
        if (response.status === 200) {
          toast.success("Başarılı.");
          return;
        }
        toast.error(response.message);
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
        <AccordionItem
          className={
            isChecked.generalInformation ? "border" : "border border-red-300"
          }
          value="basic-information"
        >
          <AccordionStepperHeader checked={isChecked.generalInformation}>
            Temel Bilgiler
          </AccordionStepperHeader>

          <AccordionContent className="px-6">
            <div className="grid w-full items-center gap-3 mt-4">
              <Label htmlFor="projectName">{languageData.ProjectName}</Label>
              <Input
                disabled={isInputEditDisabled}
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
                disabled={isInputEditDisabled}
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
            <div className="mt-8 flex flex-row flex-wrap justify-end gap-4">
              <CustomButton
                className="w-[120px]"
                disabled={!isChecked.generalInformation}
                onClick={() => {
                  setAccordionTab("budget");
                }}
                variant="secondary"
              >
                İlerle
              </CustomButton>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          className={
            isChecked.budget ? "border my-2" : "my-2 border border-red-300"
          }
          disabled={isAccordionTabDisabled.budget}
          value="budget"
        >
          <AccordionStepperHeader checked={isChecked.budget}>
            Bütçe
          </AccordionStepperHeader>
          <AccordionContent className="px-6">
            <div className="grid w-full items-center gap-3 mt-4 ">
              <Label htmlFor="fundCollectionType">
                {languageData.FundCollectionType}
              </Label>
              <div className="relative">
                <SelectTabs
                  disabled={isInputEditDisabled}
                  onValueChange={(value) => {
                    setFormValues({
                      ...formValues,
                      fundCollectionType: value,
                    });
                  }}
                  value={formValues.fundCollectionType || ""}
                >
                  <SelectTabsContent value="SHRE">
                    <div className="flex flex-row gap-1 items-center">
                      <Blocks />
                      {languageData.FundCollectionTypeSHRE}
                    </div>
                  </SelectTabsContent>
                  <SelectTabsContent value="DBIT">
                    <div className="flex flex-row gap-1 items-center">
                      <HandCoins />
                      {languageData.FundCollectionTypeDBIT}
                    </div>
                  </SelectTabsContent>
                </SelectTabs>
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
            <div className="mt-8 flex flex-row flex-wrap justify-end gap-4">
              <CustomButton
                className="w-[120px]"
                disabled={!isChecked.budget}
                onClick={() => {
                  setAccordionTab("additional-funding");
                }}
                variant="secondary"
              >
                İlerle
              </CustomButton>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          className={
            isChecked.additionalFunding
              ? "border my-2"
              : "my-2 border border-red-300"
          }
          disabled={isAccordionTabDisabled.additionalFunding}
          value="additional-funding"
        >
          <AccordionStepperHeader checked={isChecked.additionalFunding}>
            Ek Fonlama
          </AccordionStepperHeader>
          <AccordionContent className="px-6">
            <div className="grid w-full items-center gap-3 mt-4 ">
              <Label htmlFor="overFunding">
                {languageData.AdditionalFunding}
              </Label>
              <div className="relative">
                <SelectTabs
                  disabled={isInputEditDisabled}
                  onValueChange={(value) => {
                    setFormValues({ ...formValues, overFunding: value });
                  }}
                  value={formValues.overFunding || ""}
                >
                  <SelectTabsContent value="Y">
                    <div className="flex flex-row gap-1 items-center">
                      <Blocks />
                      {languageData.AdditionalFundingYes}
                    </div>
                  </SelectTabsContent>
                  <SelectTabsContent value="N">
                    <div className="flex flex-row gap-1 items-center">
                      <HandCoins />
                      {languageData.AdditionalFundingNo}
                    </div>
                  </SelectTabsContent>
                </SelectTabs>
              </div>
              <p className="text-[0.8rem] text-muted-foreground">
                {languageData.AdditionalFundingInfo}
              </p>
            </div>
            {formValues.overFunding === "Y" && (
              <div className="grid w-full items-center gap-3 mt-4 ">
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
                  value={parseInt(formValues.additionalFundRate || "0")}
                />
                <p className="text-[0.8rem] text-muted-foreground mt-2">
                  {languageData.AdditionalFundingRateInfo}
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-row flex-wrap justify-end gap-4">
              <CustomButton
                className="w-[120px]"
                disabled={!isChecked.additionalFunding}
                onClick={() => {
                  setAccordionTab("date");
                }}
                variant="secondary"
              >
                İlerle
              </CustomButton>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          className={
            isChecked.date ? "border my-2" : "my-2 border border-red-300"
          }
          disabled={isAccordionTabDisabled.date}
          value="date"
        >
          <AccordionStepperHeader checked={isChecked.date}>
            Başlangıç Tarihi
          </AccordionStepperHeader>
          <AccordionContent className="px-6">
            <div className="grid w-full items-center gap-3 mt-4 ">
              <div className="relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !formValues.startDate &&
                          "text-muted-foreground border-red-500",
                      )}
                      variant="outline"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formValues.startDate ? (
                        new Date(formValues.startDate).toLocaleDateString()
                      ) : (
                        <span
                          className={
                            !formValues.startDate ? "text-red-500" : ""
                          }
                        >
                          Tarih Seçin
                        </span>
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

            <div className="mt-8 flex flex-row flex-wrap justify-end gap-4">
              <CustomButton
                className="w-[120px]"
                disabled={!isChecked.date}
                onClick={() => {
                  setAccordionTab("");
                }}
                variant="secondary"
              >
                İlerle
              </CustomButton>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="mt-8 flex flex-row flex-wrap justify-end gap-5">
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
              <DialogClose asChild>
                <form action={onDeleteClick}>
                  <CustomButton
                    disabled={isLoading}
                    isLoading={isLoading}
                    type="submit"
                  >
                    Projeyi Sil
                  </CustomButton>
                </form>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <form action={onSaveClick}>
          <CustomButton
            className="w-[120px]"
            disabled={
              isSubmitDisabled ||
              !isChecked.generalInformation ||
              !isChecked.date ||
              !isChecked.additionalFunding ||
              !isChecked.budget
            }
            isLoading={isLoading}
            variant="default"
          >
            Projeyi Kaydet
          </CustomButton>
        </form>
      </div>
    </>
  );
}
