"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import {
  AbpForDeploy_ProjectService_ProjectSections_ProjectSectionRelationDetailDto,
  Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationResourceDto,
} from "@ayasofyazilim/saas/ProjectService";
import { AccordionStepperHeader } from "@repo/ayasofyazilim-ui/organisms/accordion-stepper-header";
import TipTapEditor from "@repo/ayasofyazilim-ui/organisms/tiptap";

import { useState } from "react";
import {
  createProjectSectionRelationServer,
  updateProjectSectionRelationServer,
} from "../../action";

export interface INewProjectFormProps {
  resources: {
    [
      key: string
    ]: Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationResourceDto;
  };
  projectId: string;
  sectionData: Array<AbpForDeploy_ProjectService_ProjectSections_ProjectSectionRelationDetailDto> | null;
}
export default function ProjectForm({
  resources,
  projectId,
  sectionData,
}: INewProjectFormProps) {
  const [formValues, setFormValues] = useState<{ [id: string]: number }>(() => {
    const data: { [id: string]: number } = {};
    sectionData?.map((section) => {
      if (section?.id) {
        data[section.id] = section.value?.length || 0;
      }
    });
    return data;
  });

  if (!sectionData) return <></>;

  async function onSaveClick(editorId: string, editorContent: string) {
    const section = sectionData?.find((i) => i.id === editorId);
    if (section?.value && section.id) {
      return await updateProjectSectionRelationServer(
        section.id,
        editorContent
      );
    }

    return await createProjectSectionRelationServer(
      projectId,
      editorId,
      editorContent
    );
  }
  function onWordCountChanged(id: string, count: number) {
    if (formValues[id] === count) return;

    setFormValues({ ...formValues, [id]: count });
  }

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue={sectionData[0].id || "item"}
    >
      {sectionData?.map((section, index) => (
        <AccordionItem
          key={section.id}
          value={section.id || "item"}
          className="my-2 border"
        >
          <AccordionStepperHeader
            checked={formValues?.[section?.id || "item"] > 10}
            children={section.name}
          />
          <AccordionContent className="px-6">
            <div className="w-full">
              <div className="grid w-full items-center gap-3 mt-4">
                <TipTapEditor
                  canEditable={true}
                  onSaveFunction={onSaveClick}
                  onWordCountChanged={(v) => {
                    onWordCountChanged(section.id || "", v);
                  }}
                  editorId={section.id}
                  editorContent={
                    section.value ? JSON.parse(section.value) : undefined
                  }
                  editOnStart={section.value || index !== 0 ? false : true}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
