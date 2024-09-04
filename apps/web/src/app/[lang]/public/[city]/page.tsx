"use server";

import { getResourceData } from "src/language-data/ProjectService";
import { getProjectServiceClient } from "src/lib";
import { getBaseLink } from "src/utils";
import { ProjectStatusEnums } from "src/enums/project";
import Landing from "../landing";
import { getConfig } from "../config";

async function getProjects() {
  if (process.env.APPLICATION_NAME === "UPWITHCROWD") {
    const client = await getProjectServiceClient();
    const fundableProjects = (
      await client.projectPublic.getApiProjectServicePublicProjects({
        status: ProjectStatusEnums.FUNDABLE,
        maxResultCount: 4,
      })
    ).items;
    const projectsWillStartSoon = (
      await client.projectPublic.getApiProjectServicePublicProjects({
        status: ProjectStatusEnums.APPROVED,
        maxResultCount: 4,
      })
    ).items;
    return { fundableProjects, projectsWillStartSoon };
  }
  return { projectsWillStartSoon: [], fundableProjects: [] };
}
export default async function Page({
  params,
}: {
  params: { city: string; lang: string };
}) {
  const appName = params.city;
  const config = getConfig(appName);

  const { fundableProjects, projectsWillStartSoon } = await getProjects();

  const { languageData } = await getResourceData(params.lang);
  const projectURL = getBaseLink(
    `${appName}/projects`,
    true,
    params.lang,
    true,
  );

  return (
    <Landing
      config={config}
      fundableProjects={fundableProjects}
      languageData={languageData}
      projectURL={projectURL}
      projectsWillStartSoon={projectsWillStartSoon}
    />
  );
}
