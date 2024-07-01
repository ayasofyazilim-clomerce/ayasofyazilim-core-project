"use server";

import CustomButton from "@repo/ayasofyazilim-ui/molecules/button";
import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout";
import ProjectCard from "@repo/ui/upwithcrowd/project/project-card";
import Link from "next/link";
import { getResourceData } from "src/language-data/Projects/projects";
import { getBaseLink } from "src/utils";
import { getProjectsServer } from "./action";

export default async function Page({
  params,
}: {
  params: { lang: string; type: string };
}) {
  const projectData = await getProjectsServer();

  const { languageData, resources } = await getResourceData(params.lang);

  const navbarItems = [
    {
      id: "general",
      link: getBaseLink(`projects`, true, params.lang, true, params.type),
      name: languageData["Projects"],
    },
  ];

  const projectURL = getBaseLink(
    "projects",
    true,
    params.lang,
    true,
    params.type
  );
  return (
    <SectionLayout
      sections={navbarItems}
      defaultActiveSectionId={"general"}
      openOnNewPage={true}
      content={
        <div className="relative w-full container mt-4">
          <div className="flex flex-col gap-2">
            {params.type === "entreperneur" && (
              <div className=" flex flex-row flex-wrap justify-end items-center">
                <Link href={getBaseLink("app/entreperneur/projects/new", true)}>
                  <CustomButton variant="outline">New Project</CustomButton>
                </Link>
              </div>
            )}
            {projectData.items?.map((project) => (
              <ProjectCard
                key={project.id}
                horizontal
                project={project}
                languageData={languageData}
                projectURL={`${projectURL}/${project.id}`}
                actionText={languageData.ViewProject}
              />
            ))}
          </div>
        </div>
      }
    />
  );
}
