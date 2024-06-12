"use server";

import CustomButton from "@repo/ayasofyazilim-ui/molecules/button";
import { ICardTableProps } from "@repo/ayasofyazilim-ui/molecules/card-table";
import Progress from "@repo/ayasofyazilim-ui/molecules/progress";
import DetailsCard, {
  IDetailsCardProps,
} from "@repo/ayasofyazilim-ui/organisms/details-card";
import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout";
import Link from "next/link";
import { getBaseLink, getLocalizationResources } from "src/utils";
import { getProjectsServer } from "./action";

function tableProps(data: any) {
  return [
    {
      title: "Proje Tipi",
      value:
        data.fundCollectionType === "SHRE" ? "Paya Dayalı" : "Borca Dayalı",
    },
    { title: "Ek Fonlama", value: data.additionalFundRate + "%" },
    {
      title: "Başlangıç Tarihi",
      value: new Date("06.15.2024").toLocaleDateString("tr"),
    },
    {
      title: "Bitiş Tarihi",
      value: new Date("09.15.2024").toLocaleDateString("tr"),
    },
  ];
}
function tableProps2Col(data: any) {
  return [
    [
      {
        title: currencyFormatter
          .format(data.fundNominalAmount)
          .replace(/\s/g, " "),
        value: "Gerçekleşen Yatırım",
      },
      {
        title: currencyFormatter
          .format(data.fundableAmount)
          .replace(/\s/g, " "),
        value: "Hedeflenen Yatırım",
      },
    ],
  ] as [ICardTableProps, ICardTableProps][];
}

const currencyFormatter = new Intl.NumberFormat("tr", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 0,
});

export default async function Page({ params }: { params: { lang: string } }) {
  const projectData = await getProjectsServer();

  const resources = await getLocalizationResources(params.lang);
  const projectResource = resources?.["ProjectService"]?.texts;
  const uiResource = resources?.["AbpUi"]?.texts;

  const languageData = {
    Next: uiResource?.["PagerNext"] || "Next",
    Previous: uiResource?.["PagerPrevious"] || "Previous",
    "Tab:Projects": projectResource?.["Tab:Projects"] || "Projects",
    "Tab:CreateProject":
      projectResource?.["Tab:CreateProject"] || "Create Project",
    "Tab:ProjectDetails":
      projectResource?.["Tab:ProjectDetails"] || "Project Details",
    "Tab:AdditionalFunding":
      projectResource?.["Tab:AdditionalFunding"] || "Additional Funding",
    "Tab:Summary": uiResource?.["Summary"] || "Summary",
    "Tab:ViewProject": projectResource?.["Tab:ViewProject"] || "View Project",
    "Messages:ProjectCreated":
      projectResource?.["Messages:ProjectCreated"] ||
      "The project has been created successfully.",
    "Messages:ProjectCreationError":
      projectResource?.["Messages:ProjectCreationError"] ||
      "An error occurred while creating the project.",
    ProjectName: projectResource?.["ProjectName"] || "Project name",
    ProjectNameInfo:
      projectResource?.["ProjectNameInfo"] ||
      "A headline that describes your project in a way that attracts investors' attention.",
    ProjectDescription:
      projectResource?.["ProjectDescription"] || "Project description",
    ProjectDescriptionInfo:
      projectResource?.["ProjectDescriptionInfo"] ||
      "Briefly describe your project in a way that attracts investors' attention.",
    FundCollectionType:
      projectResource?.["FundCollectionType"] || "Project type",
    FundCollectionTypeInfo:
      projectResource?.["FundCollectionTypeInfo"] || "Type of your project.",
    FundCollectionTypeSHRE:
      projectResource?.["FundCollectionTypeSHRE"] || "Share based",
    FundCollectionTypeDBIT:
      projectResource?.["FundCollectionTypeDBIT"] || "Dept based",
    FundableAmount: projectResource?.["FundableAmount"] || "Fundable amount",
    FundableAmountInfo:
      projectResource?.["FundableAmountInfo"] ||
      "The amount of investment you want to make in your project.",
    AdditionalFunding:
      projectResource?.["AdditionalFunding"] || "Additional funding",
    AdditionalFundingInfo:
      projectResource?.["AdditionalFundingInfo"] ||
      "When your project reaches the fundable amount, should extra funds continue to be collected up to the amount you specify?",
    AdditionalFundingYes: projectResource?.["AdditionalFundingYes"] || "Yes",
    AdditionalFundingNo: projectResource?.["AdditionalFundingNo"] || "No",
    AdditionalFundingRate:
      projectResource?.["AdditionalFundingRate"] ||
      "Rate of additional funding",
    AdditionalFundingRateInfo:
      projectResource?.["AdditionalFundingRateInfo"] ||
      "The rate of additional funding that will be collected in case your project is overfunded.",
  };
  const navbarItems = [
    {
      id: "general",
      link: getBaseLink(`projects`, true),
      name: languageData["Tab:Projects"],
    },
  ];

  return (
    <SectionLayout
      sections={navbarItems}
      defaultActiveSectionId={"general"}
      openOnNewPage={true}
      content={
        <div className="relative w-full container mt-4">
          <div className="flex flex-col gap-2">
            <div className=" flex flex-row flex-wrap justify-end items-center">
              <Link href={getBaseLink("projects/new", true)}>
                <CustomButton variant="outline">New Project</CustomButton>
              </Link>
            </div>
            {projectData?.items?.map((project) => (
              <DetailsCard
                key={project.id}
                cardProps={{
                  image:
                    "https://kapilendo-public.imgix.net/files/projects/bamboologic/8e0aa153-e311-47f9-9563-1aa44c05a3fe_01_Project-Header-1920x1080px.png?auto=compress&auto=format&maxdpr=3&w=750&fit=crop&dpr=1.5",
                  tags: [],
                  link: "projects/" + (project.id ?? ""),
                  title: project.projectName ?? "",
                  description: project.projectDefinition ?? "",
                  tableProps: tableProps(project),
                  tableProps2Col: tableProps2Col(project),
                  cardTagTitle: "Taslak",
                  cardTagVariant: "secondary",
                }}
                variant="compact-vertical"
              />
            ))}
          </div>
        </div>
      }
    />
  );
}
