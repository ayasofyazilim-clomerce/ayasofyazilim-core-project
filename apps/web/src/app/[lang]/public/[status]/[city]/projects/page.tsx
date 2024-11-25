"use server";

import ProjectCard from "@repo/ui/upwithcrowd/project/project-card";
import { PackageSearch } from "lucide-react";
import { ProjectStatusEnums } from "src/enums/project";
import { getResourceData } from "src/language-data/Projects/projects";
import { getProjectServiceClient } from "src/lib";
import { getBaseLink } from "src/utils";

async function getProjects(maxResultCount?: number | undefined) {
  if (process.env.APPLICATION_NAME === "UPWITHCROWD") {
    const client = await getProjectServiceClient();
    const fundableProjects = (
      await client.projectPublic.getApiProjectServicePublicProjects({
        status: ProjectStatusEnums.FUNDABLE,
        maxResultCount,
      })
    ).items;
    const projectsWillStartSoon = (
      await client.projectPublic.getApiProjectServicePublicProjects({
        status: ProjectStatusEnums.APPROVED,
        maxResultCount,
      })
    ).items;
    return { fundableProjects, projectsWillStartSoon };
  }
  return { projectsWillStartSoon: [], fundableProjects: [] };
}
export default async function Page({
  params,
}: {
  params: { lang: string; city: string };
}) {
  const { fundableProjects, projectsWillStartSoon } = await getProjects();
  const appName = params.city;
  const { languageData } = await getResourceData(params.lang);

  const projectURL = getBaseLink(
    `${appName}/projects`,
    true,
    params.lang,
    true,
  );

  return (
    <div className="mt-20">
      {fundableProjects ? (
        <div>
          <h2 className="text-2xl font-bold mb-8 mt-10 text-center">
            {languageData.InvestmentOpportunities}
          </h2>
          <div className="flex flex-wrap flex-row flex-wrap gap-3 justify-center">
            {fundableProjects.map((project) => (
              <ProjectCard
                ProjectStatusEnums={ProjectStatusEnums}
                actionText={languageData.InvestNow}
                key={project.id}
                languageData={languageData}
                project={project}
                projectURL={`${projectURL}/${project.id}`}
                showProgress
              />
            ))}
          </div>
        </div>
      ) : null}

      {projectsWillStartSoon ? (
        <div>
          <h2 className="text-2xl font-bold mb-8 mt-10 text-center">
            {languageData.ProjectsToOpenForInvestmentSoon}
          </h2>
          <div className="flex flex-wrap flex-row flex-wrap gap-3 justify-center mb-5">
            {projectsWillStartSoon.map((project) => (
              <ProjectCard
                ProjectStatusEnums={ProjectStatusEnums}
                actionText={languageData.InvestNow}
                key={project.id}
                languageData={languageData}
                project={project}
                projectURL={`${projectURL}/${project.id}`}
                showProgress={false}
              />
            ))}
          </div>
        </div>
      ) : null}

      {!projectsWillStartSoon && !fundableProjects && (
        <div className="flex h-full">
          <div className="flex flex-col items-center m-auto">
            <PackageSearch color="#222" size={120} />
            <h3 className="mt-2">Yayında bir proje yok!</h3>
          </div>
        </div>
      )}
    </div>
  );
}
