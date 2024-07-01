"use server";

import ScrollArea from "@repo/ayasofyazilim-ui/molecules/scroll-area";

import ProjectCard from "@repo/ui/upwithcrowd/project/project-card";
import { ProjectStatusEnums } from "src/enums/project";
import { getResourceData } from "src/language-data/Projects/projects";
import { getBaseLink } from "src/utils";
import { getProjectsServer } from "../../app/[type]/projects/action";

export default async function Page({ params }: { params: { lang: string } }) {
  const projectData = await getProjectsServer();

  const { languageData, resources } = await getResourceData(params.lang);
  if (!resources) return;

  const projectURL = getBaseLink("projects", true, params.lang, true);

  const fundableProjects =
    projectData?.items?.filter(
      (i) => ProjectStatusEnums[i.status || 0] === "FUNDABLE"
    ) || [];
  const approvedProjects =
    projectData?.items?.filter(
      (i) => ProjectStatusEnums[i.status || 0] === "APPROVED"
    ) || [];

  return (
    <div className="container h-full mt-20">
      {projectData && (
        <ScrollArea className="p-2 pt-0 h-full grow">
          {fundableProjects?.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-8 mt-10 text-center">
                {languageData.InvestmentOpportunities}
              </h2>
              <div className="flex flex-row gap-3 justify-center">
                {fundableProjects?.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    languageData={languageData}
                    projectURL={`${projectURL}/${project.id}`}
                    actionText={languageData.InvestNow}
                  />
                ))}
              </div>
            </div>
          )}
          {approvedProjects?.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-8 mt-10 text-center">
                {languageData.ProjectsToOpenForInvestmentSoon}
              </h2>
              <div className="flex flex-row gap-3 justify-center">
                {approvedProjects?.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    languageData={languageData}
                    projectURL={`${projectURL}/${project.id}`}
                    actionText={languageData.InvestNow}
                  />
                ))}
              </div>
            </div>
          )}
        </ScrollArea>
      )}
    </div>
  );
}
