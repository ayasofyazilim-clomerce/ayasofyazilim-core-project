"use client";
import TipTapEditor from "@repo/ayasofyazilim-ui/organisms/tiptap";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";

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
export default function ProjectForm({ sectionData }: ProjectFormProps) {
  if (!sectionData) return <></>;
  const sections = sectionData
    .filter((section) => (section.sectionRelationValue?.length || 0) > 10)
    .map((section, index) => {
      return {
        id: section.sectionId || `item-${index}`,
        name: section.sectionName || `item-${index}`,
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
            canEditable={false}
            editOnStart={false}
            editorContent={
              section.sectionRelationValue
                ? JSON.parse(section.sectionRelationValue)
                : undefined
            }
            editorId={section.sectionId}
            key={
              section.sectionId
                ? `${section.sectionId}-editor`
                : `item-${index}-editor`
            }
          />
        </SectionLayoutContent>
      ))}
    </SectionLayout>
  );
}
