"use server";

import { getResourceData } from "src/language-data/ProjectService";
import NewProjectForm from "./form";

export default async function Page({ params }: { params: { lang: string } }) {
  const { languageData } = await getResourceData(params.lang);
  // const navbarItems = [
  //   {
  //     id: "general",
  //     link: getBaseLink(`projects/new`, true),
  //     name: "Create Project",
  //   },
  // ];
  const fundraiserId = "f9796807-de53-b21a-ac35-3a1327c610af";
  return (
    <div className="h-full overflow-hidden">
      <div className="mx-auto h-full w-10/12 max-w-3xl overflow-auto">
        <NewProjectForm
          fundraiserId={fundraiserId}
          languageData={languageData}
        />
      </div>
    </div>
  );
}
