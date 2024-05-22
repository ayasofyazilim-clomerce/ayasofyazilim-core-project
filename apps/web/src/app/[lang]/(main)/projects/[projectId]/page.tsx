"use server";

import TipTapEditor from "@repo/ayasofyazilim-ui/organisms/tiptap";
import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout";
import { getProjectServiceClient } from "src/lib";

export async function saveProjectSectionRelation(
  id: string,
  value: string
): Promise<string> {
  return new Promise(async (resolve) => {
    try {
      const client = getProjectServiceClient();
      const data =
        await client.projectSectionRelation.getApiProjectSectionRelationServiceProjectSectionRelationById(
          {
            id: id,
          }
        );
      data.value = value;

      await client.projectSectionRelation.putApiProjectSectionRelationServiceProjectSectionRelationById(
        {
          id: id,
          requestBody: data,
        }
      );
      resolve("OK");
    } catch (error: any) {
      resolve(error?.body?.error?.message);
    }
  });
}

export default async function Page({ params }: any) {
  const { projectId } = params;

  async function getData() {
    "use server";
    const client =
      await getProjectServiceClient().project.getApiProjectServiceProjectsById({
        id: projectId,
      });

    return client;
  }
  const projectData = await getData();

  if (!projectData) {
    return null;
  }

  // @ts-ignore ->demo sonrası: saas güncellenecek
  const sectionsData = projectData.projectSectionRelationDetails?.map(
    (section: any) => ({
      key: section.name ?? "",
      id: section.name ?? "",
      name: section.name ?? "",
      value: (
        <TipTapEditor
          editorContent={JSON.parse(section.value ?? "{}")}
          canEditable={true}
          onSaveFunction={saveProjectSectionRelation}
          editorId={section.id ?? ""}
        />
      ),
    })
  );

  return (
    <div className="flex flex-col w-full">
      <SectionLayout
        sections={sectionsData ?? []}
        defaultActiveSectionId={sectionsData?.[0]?.id ?? ""}
        openOnNewPage={false}
      />
    </div>
  );
}
