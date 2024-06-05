"use server";

import { getLocalizationResources } from "src/utils";
import NewProjectForm from "./form";

export default async function Page({ params }: { params: { lang: string } }) {
  const resources = await getLocalizationResources(params.lang);
  if (!resources?.["ProjectService"].texts) return null;

  return (
    <div className="w-full mx-auto max-w-3xl">
      <div className="flex flex-col items-center justify-start mb-8 w-full">
        <div className="flex-row p-4 w-10/12 ">
          <NewProjectForm resources={resources} />
        </div>
      </div>
    </div>
  );
}
