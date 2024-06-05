"use server";

import TipTapEditor from "@repo/ayasofyazilim-ui/organisms/tiptap";
import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout";
import { getProjectServiceClient } from "src/lib";

import ScrollArea from "@repo/ayasofyazilim-ui/molecules/scroll-area";
import DetailsCard from "@repo/ayasofyazilim-ui/organisms/details-card";
import ContentList from "components/content";
import Invest from "components/invest";
import {
  currencyFormatter,
  defaultContentProps,
  defaultDetailsCardProps,
  defaultFullpageDetailsCardProps,
  images,
  numberFormatter,
} from "../demo-data";

export default async function Page({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = params;
  const client =
    await getProjectServiceClient().project.getApiProjectServiceProjectsById({
      id: projectId,
    });
  const projectData = client;
  if (!projectData) {
    return null;
  }
  //demo sonrası: saas güncellenecek
  // @ts-ignore
  const sectionsData = projectData.projectSectionRelationDetails?.map(
    (section: any) => ({
      key: section.name ?? "",
      id: section.sectionId ?? "",
      name: section.name ?? "",
      value: (
        <TipTapEditor
          editorContent={JSON.parse(section.value ?? "{}")}
          canEditable={false}
        />
      ),
    })
  );

  return (
    <ScrollArea
      className="pr-3 w-full"
      style={{ scrollSnapType: "y mandatory" }}
    >
      <div className="flex flex-col gap-32 items-center">
        <div className="relative w-full py-16 container" id="details">
          <div className="bg-[#111] absolute inset-0 w-full h-full hidden"></div>
          <DetailsCard
            variant="full-page"
            cardProps={{
              ...defaultFullpageDetailsCardProps,
              image: images?.[(projectId ?? "default") as keyof typeof images],
              ContainerClassName: "container",
            }}
          />
        </div>
        <div className="grid grid-cols-12 gap-12 container" id="sections">
          <div className="grid gap-32 col-span-9 py-0">
            <ContentList {...defaultContentProps} />
            <SectionLayout
              sections={sectionsData ?? []}
              defaultActiveSectionId={sectionsData?.[0]?.id ?? ""}
              openOnNewPage={false}
            />
          </div>
          <DetailsCard
            variant="compact"
            cardProps={{
              ...defaultDetailsCardProps,
              image: images?.[(projectId ?? "default") as keyof typeof images],
              tableProps2Col: undefined,
              tags: [],
              ContainerClassName:
                "flex flex-col gap-0 col-span-3 sticky top-16 h-min shadow-none",
            }}
          />
        </div>
        <Invest
          name={projectData.projectName ?? ""}
          description={projectData.projectDefinition ?? ""}
          images={[images?.[(projectId ?? "default") as keyof typeof images]]}
          investmentDetails={[
            {
              name: "cashValue",
              value: currencyFormatter.format(projectData.cashValue ?? 0),
            },
            {
              name: "additionalFundRate",
              value: projectData.additionalFundRate ?? 0,
            },
            {
              name: "fundNominalAmount",
              value: numberFormatter.format(projectData.fundNominalAmount ?? 0),
            },
            {
              name: "fundableAmount",
              value: numberFormatter.format(projectData.fundableAmount ?? 0),
            },
            {
              name: "qualifiedFundRate",
              value: projectData.qualifiedFundRate ?? 0,
            },
            {
              name: "fundCollectionType",
              value: projectData.fundCollectionType ?? "",
            },
            {
              name: "projectRemaining",
              value:
                Math.round(
                  (new Date(projectData.projectStartDate ?? "").getTime() -
                    new Date(projectData.projectEndDate ?? "").getTime()) /
                    (1000 * 3600 * 24)
                ) + " Days",
            },
          ]}
        />
      </div>
    </ScrollArea>
  );
}
