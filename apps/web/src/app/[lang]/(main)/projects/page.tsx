"use server";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Volo_Abp_Application_Dtos_PagedResultDto_13 } from "@ayasofyazilim/saas/ProjectService";
import CustomButton from "@repo/ayasofyazilim-ui/molecules/button";
import Link from "next/link";
import { getProjectServiceClient } from "src/lib";
import { getBaseLink, getLocalizationResources } from "src/utils";

export default async function Page({ params }: { params: { lang: string } }) {
  const projectData =
    (await getProjectServiceClient().project.getApiProjectServiceProjects()) as Volo_Abp_Application_Dtos_PagedResultDto_13;
  if (!projectData) return null;
  const resources = await getLocalizationResources(params.lang);
  const projectResource = resources?.["ProjectService"]?.texts;
  const uiResource = resources?.["AbpUi"]?.texts;
  if (!projectResource || !uiResource) return;
  const languageData = {
    Next: uiResource["PagerNext"] || "Next",
    Previous: uiResource["PagerPrevious"] || "Previous",
    "Tab:CreateProject":
      projectResource["Tab:CreateProject"] || "Create Project",
    "Tab:ProjectDetails":
      projectResource["Tab:ProjectDetails"] || "Project Details",
    "Tab:AdditionalFunding":
      projectResource["Tab:AdditionalFunding"] || "Additional Funding",
    "Tab:Summary": uiResource["Summary"] || "Summary",
    "Tab:ViewProject": projectResource["Tab:ViewProject"] || "View Project",
    "Messages:ProjectCreated":
      projectResource["Messages:ProjectCreated"] ||
      "The project has been created successfully.",
    "Messages:ProjectCreationError":
      projectResource["Messages:ProjectCreationError"] ||
      "An error occurred while creating the project.",
    ProjectName: projectResource["ProjectName"] || "Project name",
    ProjectNameInfo:
      projectResource["ProjectNameInfo"] ||
      "A headline that describes your project in a way that attracts investors' attention.",
    ProjectDescription:
      projectResource["ProjectDescription"] || "Project description",
    ProjectDescriptionInfo:
      projectResource["ProjectDescriptionInfo"] ||
      "Briefly describe your project in a way that attracts investors' attention.",
    FundCollectionType: projectResource["FundCollectionType"] || "Project type",
    FundCollectionTypeInfo:
      projectResource["FundCollectionTypeInfo"] || "Type of your project.",
    FundCollectionTypeSHRE:
      projectResource["FundCollectionTypeSHRE"] || "Share based",
    FundCollectionTypeDBIT:
      projectResource["FundCollectionTypeDBIT"] || "Dept based",
    FundableAmount: projectResource["FundableAmount"] || "Fundable amount",
    FundableAmountInfo:
      projectResource["FundableAmountInfo"] ||
      "The amount of investment you want to make in your project.",
    AdditionalFunding:
      projectResource["AdditionalFunding"] || "Additional funding",
    AdditionalFundingInfo:
      projectResource["AdditionalFundingInfo"] ||
      "When your project reaches the fundable amount, should extra funds continue to be collected up to the amount you specify?",
    AdditionalFundingYes: projectResource["AdditionalFundingYes"] || "Yes",
    AdditionalFundingNo: projectResource["AdditionalFundingNo"] || "No",
    AdditionalFundingRate:
      projectResource["AdditionalFundingRate"] || "Rate of additional funding",
    AdditionalFundingRateInfo:
      projectResource["AdditionalFundingRateInfo"] ||
      "The rate of additional funding that will be collected in case your project is overfunded.",
  };
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-start">
        <div className="flex-row p-4 w-10/12"></div>
      </div>
      <div className=" flex flex-row flex-wrap justify-between gap-5 mb-8">
        <div></div>
        <div className="">
          <CustomButton variant="destructive">New Project</CustomButton>
        </div>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Definition</TableHead>
            <TableHead className="text-right">Fund Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projectData?.items?.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">
                <Link href={getBaseLink("projects/" + project.id, true)}>
                  {project.projectName}
                </Link>
              </TableCell>
              <TableCell>{project.projectDefinition}</TableCell>
              <TableCell className="text-right">
                {project.fundCollectionType === "SHRE"
                  ? languageData["FundCollectionTypeSHRE"]
                  : languageData["FundCollectionTypeDBIT"]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
