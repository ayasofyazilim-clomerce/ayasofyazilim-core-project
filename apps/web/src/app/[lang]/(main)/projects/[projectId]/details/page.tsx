"use server";

import { Card } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { getLocalizationResources } from "src/utils";
import {
  getDefaultProjectSectionsServer,
  getProjectByIdServer,
  getProjectSectionsServer,
} from "../../action";
import ProjectForm from "./form";

export default async function Page({ params }: any) {
  const { projectId } = params;
  const resources = await getLocalizationResources(params.lang);

  const projectData = await getProjectByIdServer(projectId);
  const usedSectionsInProject =
    (await getProjectSectionsServer(projectId)) || [];
  const mandatorySections = (await getDefaultProjectSectionsServer()) || [];

  mandatorySections?.items?.toReversed()?.forEach((section: any) => {
    const index = usedSectionsInProject.findIndex(
      /* @ts-ignore */
      (s) => s.projectSectionId === section.id
    );
    if (index > -1 && usedSectionsInProject?.[index]) {
      /* @ts-ignore */
      usedSectionsInProject[index].name = section.name;
    } else {
      usedSectionsInProject.push(section);
    }
  });
  if (!projectData) {
    redirect("/projects");
  }

  return (
    <div className="relative w-full container mt-8">
      <Card className="p-6 w-full">
        <ProjectForm
          resources={resources}
          sectionData={usedSectionsInProject}
          projectId={projectId}
        />
      </Card>
    </div>
  );
}
