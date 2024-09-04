/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call -- TODO: we need to fix this*/
import ProjectCard from "@repo/ui/upwithcrowd/project/project-card";
import { PackageSearch } from "lucide-react";
import { ProjectStatusEnums } from "src/enums/project";

export function Project({
  projectList,
  projectURL,
  languageData,
  placeHolderText,
}: {
  projectList: any;
  projectURL: string;
  languageData: any;
  placeHolderText: string;
}) {
  return (
    <>
      {projectList.map((project: any) => (
        <ProjectCard
          ProjectStatusEnums={ProjectStatusEnums}
          actionText={languageData.ViewProject}
          horizontal
          key={project.id}
          languageData={languageData}
          project={project}
          projectURL={`${projectURL}/${project.id}`}
        />
      ))}
      {!projectList.length && (
        <div className="flex h-full">
          <div className="m-auto flex flex-col items-center">
            <PackageSearch color="#222" size={120} />
            <h3 className="mt-2">{placeHolderText}</h3>
          </div>
        </div>
      )}
    </>
  );
}
