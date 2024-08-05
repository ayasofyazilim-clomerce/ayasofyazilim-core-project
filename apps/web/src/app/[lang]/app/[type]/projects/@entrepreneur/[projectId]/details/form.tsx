"use client";
import TipTapEditor from "@repo/ayasofyazilim-ui/organisms/tiptap";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { useState } from "react";
import { createOrUpdateProjectSectionRelationServer } from "../../../action";

export interface ProjectFormProps {
  projectId: string;
  sectionData:
    | {
        sectionId?: string;
        sectionRelationId?: string;
        sectionName?: string | null;
        sectionRelationValue?: string | null;
        order?: number;
        [key: string]: any;
      }[]
    | null;
  canSectionsEditable: boolean;
}
export default function ProjectForm({
  sectionData,
  canSectionsEditable,
}: ProjectFormProps) {
  const [formValues, setFormValues] = useState<Record<string, number>>(() => {
    const data: Record<string, number> = {};
    sectionData?.forEach((section) => {
      if (section.sectionId) {
        data[section.sectionId] = section.sectionRelationValue?.length || 0;
      }
    });
    return data;
  });
  if (!sectionData) return <></>;

  async function onSaveClick(editorId: string, editorContent: string) {
    const section = sectionData?.find((i) => i.sectionId === editorId);
    if (!section) return "ERROR";

    try {
      await createOrUpdateProjectSectionRelationServer(section, editorContent);
      return "OK";
    } catch (error) {
      return "ERROR";
    }
  }
  function onWordCountChanged(id: string, count: number) {
    if (formValues[id] === count) return;

    setFormValues({ ...formValues, [id]: count });
  }

  const sections = sectionData.map((section, index) => {
    return {
      id: section.sectionId || `item${index}`,
      name: section.sectionName || `item${index}`,
    };
  });

  return (
    <SectionLayout
      defaultActiveSectionId={sectionData[0]?.sectionId}
      noCard
      sections={sections}
      vertical
    >
      {sectionData.map((section, index) => (
        <SectionLayoutContent
          className="p-0"
          key={section.sectionId || `item${index}`}
          sectionId={section.sectionId || `item${index}`}
        >
          <TipTapEditor
            canEditable={canSectionsEditable}
            editOnStart
            editorContent={
              section.sectionRelationValue
                ? JSON.parse(section.sectionRelationValue)
                : undefined
            }
            editorId={section.sectionId}
            onSaveFunction={onSaveClick}
            onWordCountChanged={(v) => {
              onWordCountChanged(section.sectionId || "", v);
            }}
          />
        </SectionLayoutContent>
      ))}
    </SectionLayout>
  );
}
