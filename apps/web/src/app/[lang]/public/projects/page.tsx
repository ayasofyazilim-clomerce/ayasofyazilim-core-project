"use server";

import { LayoutIcon, ViewHorizontalIcon } from "@radix-ui/react-icons";
import ScrollArea from "@repo/ayasofyazilim-ui/molecules/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ayasofyazilim-ui/molecules/tabs";

import { Volo_Abp_Application_Dtos_PagedResultDto_13 } from "@ayasofyazilim/saas/ProjectService";
import Button from "@repo/ayasofyazilim-ui/molecules/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/ayasofyazilim-ui/molecules/pagination";
import Progress from "@repo/ayasofyazilim-ui/molecules/progress";
import DetailsCard from "@repo/ayasofyazilim-ui/organisms/details-card";
import { Link } from "next-view-transitions";
import { useLocale } from "src/providers/locale";
import { cardProps, images, tableProps, tableProps2Col } from "./demo-data";
import { useEffect, useState } from "react";
import { getBaseLink, getLocalizationResources } from "src/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { getProjectsServer } from "../../(main)/projects/action";
import { Filter } from "@repo/ui/filter";

export default async function Page({ params }: { params: { lang: string } }) {
  const projectData = await getProjectsServer();

  const resources = await getLocalizationResources(params.lang);
  const statusOptions = [
    {
      label: resources?.ProjectService?.texts?.inFunding ?? "",
      value: "inFunding",
    },
    {
      label: resources?.ProjectService?.texts?.soon ?? "",
      value: "soon",
    },
    {
      label: resources?.ProjectService?.texts?.funded ?? "",
      value: "funded",
    },
    {
      label: resources?.ProjectService?.texts?.couldNotBeFunded ?? "",
      value: "couldNotBeFunded",
    },
    {
      label: resources?.ProjectService?.texts?.inTermination ?? "",
      value: "inTermination",
    },
  ];
  const sectorOptions = [
    {
      label: resources?.ProjectService?.texts?.biotechnology ?? "",
      value: 1,
    },
    {
      label: resources?.ProjectService?.texts?.biomedical ?? "",
      value: 2,
    },
    {
      label: resources?.ProjectService?.texts?.marine ?? "",
      value: 3,
    },
    {
      label: resources?.ProjectService?.texts?.other ?? "",
      value: 4,
    },
  ];
  const categoryOptions = [
    {
      label: resources?.ProjectService?.texts?.tech ?? "",
      value: 1,
    },
    {
      label: resources?.ProjectService?.texts?.production ?? "",
      value: 2,
    },
  ];
  if (!resources) return;
  return (
    <div className="container h-full">
      {projectData && (
        <Tabs
          defaultValue="2"
          className="w-full flex grow flex-col overflow-hidden h-full"
        >
          <div className="flex items-center justify-between bg-white py-2 gap-2">
            <div className="flex items-center justify-center gap-2">
              <Filter
                title={resources?.ProjectService?.texts?.status ?? ""}
                options={statusOptions}
              />
              <Filter
                title={resources?.ProjectService?.texts?.sector ?? ""}
                options={sectorOptions}
              />
              <Filter
                title={resources?.ProjectService?.texts?.category ?? ""}
                options={categoryOptions}
              />
            </div>
            <TabsList className="grid grid-cols-2 bg-gray-50 px-2">
              <TabsTrigger value="1">
                <ViewHorizontalIcon />
              </TabsTrigger>
              <TabsTrigger value="2">
                <LayoutIcon />
              </TabsTrigger>
            </TabsList>
          </div>
          <ScrollArea className="p-2 pt-0 h-full grow">
            <TabsContent value="1">
              <div className="w-full flex flex-wrap gap-5 overflow-auto h-full">
                {projectData.items?.map((project) => (
                  <DetailsCard
                    key={project.id}
                    cardProps={{
                      IAboutCardProps: cardProps.IAboutCardProps,
                      image:
                        images?.[
                          (project.id ?? "default") as keyof typeof images
                        ],
                      tags: cardProps.tags,
                      link: "projects/" + (project.id ?? ""),
                      title: project.projectName ?? "",
                      description: project.projectDefinition ?? "",
                      tableProps: tableProps(project),
                      tableProps2Col: tableProps2Col(project),
                      cardTagTitle: "Devam Ediyor",
                      cardTagVariant: "primary",
                      BeforeCardContentComponent: (
                        <Progress
                          value={20}
                          containerClassName="h-3"
                          variant="primary"
                        />
                      ),
                      ActionComponent: (
                        <Button customVariant="primary">
                          <Link href={"projects/" + (project.id ?? "")}>
                            {resources?.ProjectService?.texts?.projectDetail ??
                              ""}
                          </Link>
                        </Button>
                      ),
                    }}
                    variant="compact-vertical"
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="2">
              <div className="flex flex-row w-full flex-wrap justify-center gap-5 col-span-10 overflow-auto h-full">
                {projectData.items?.map((project) => (
                  <DetailsCard
                    key={project.id}
                    cardProps={{
                      IAboutCardProps: cardProps.IAboutCardProps,
                      image:
                        images?.[
                          (project.id ?? "default") as keyof typeof images
                        ],
                      tags: cardProps.tags,
                      link: "projects/" + (project.id ?? ""),
                      title: project.projectName ?? "",
                      description: project.projectDefinition ?? "",
                      tableProps: tableProps(project),
                      tableProps2Col: tableProps2Col(project),
                      cardTagTitle: "Devam Ediyor",
                      cardTagVariant: "primary",
                      BeforeCardContentComponent: (
                        <Progress
                          value={20}
                          containerClassName="h-3"
                          variant="primary"
                        />
                      ),
                      ActionComponent: (
                        <Button customVariant="primary" asChild>
                          <Link href={"projects/" + (project.id ?? "")}>
                            {resources?.ProjectService?.texts?.projectDetail ??
                              ""}
                          </Link>
                        </Button>
                      ),
                    }}
                    variant="compact"
                  />
                ))}
              </div>
            </TabsContent>
          </ScrollArea>
          <div className="flex items-center justify-center bg-white py-2 gap-2 hidden">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </Tabs>
      )}
    </div>
  );
}
