import Button from "@repo/ayasofyazilim-ui/molecules/button";
import Progress from "@repo/ayasofyazilim-ui/molecules/progress";
import Link from "next/link";
import { currencyFormatter, getFundCollectionType } from "../project-card";
import CustomButton from "@repo/ayasofyazilim-ui/molecules/button";
import { CardContent } from "@repo/ayasofyazilim-ui/atoms/card";
import { TiptapLayout } from "@repo/ayasofyazilim-ui/templates/tiptap-layout";
import Invest from "../../../invest";

interface IProjectCardProps {
  languageData: any;
  projectData: any;
  ProjectStatusEnums: any;
  sectionsData: any;
  user?: any;
  isPreview?: boolean;
}

export default function ProjectPage({
  languageData,
  projectData,
  ProjectStatusEnums,
  sectionsData,
  user,
  isPreview,
}: IProjectCardProps): JSX.Element {
  function getDateDifferanceInDays() {
    const date1Obj = new Date();
    const targetObj = new Date(projectData?.projectEndDate || 0);
    const diffTime = Math.abs(targetObj.getTime() - date1Obj.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  function getInvestmentDetails() {
    return [
      {
        name: "AdditionalFunding",
        value: projectData?.additionalFundRate || 0,
      },
      {
        name: "CollectedAmount",
        value: currencyFormatter.format(projectData?.fundNominalAmount || 0),
      },
      {
        name: "TargetAmount",
        value: currencyFormatter.format(projectData?.fundableAmount || 0),
      },
      {
        name: "QualifiedFundRate",
        value: projectData?.qualifiedFundRate || 0,
      },
      {
        name: "FundCollectionType",
        value: fundCollectionType || "",
      },
      {
        name: "RemainingTime",
        value: `${daysLeftToComplete} ${languageData.DaysLeft}`,
      },
    ];
  }
  function getCollectedFundPercentage() {
    return languageData.TargetReached.replace(
      "{target}",
      Math.round(
        ((projectData?.fundNominalAmount || 0) /
          (projectData?.fundableAmount || 1)) *
          100
      ).toString()
    );
  }

  const daysLeftToComplete = getDateDifferanceInDays();
  const collectedFundPercentage = getCollectedFundPercentage();
  const fundCollectionType = getFundCollectionType(
    languageData,
    projectData?.fundCollectionType || ""
  );
  const investmentDetails = getInvestmentDetails();

  if (user && !isPreview) {
    sectionsData.push({
      key: "invest",
      id: "invest",
      name: languageData.Invest,
      value: (
        <Invest
          user={user}
          languageData={languageData}
          name={projectData.projectName || ""}
          description={projectData.projectDefinition || ""}
          investmentDetails={investmentDetails}
        />
      ),
    });
  }

  return (
    <div className="w-full">
      <div className="absolute top-0 left-0 right-0 h-screen z-[-1] overflow-hidden">
        <img className="mt-[-150px]" src="https://placehold.co/1920x900" />
      </div>
      <div className="h-screen flex flex-col justify-end">
        <div className="flex items-end justify-between container">
          <div className="flex flex-col gap-2 mb-5">
            <div className="text-4xl font-bold">{projectData.projectName}</div>
            <div className="text-2xl ">{projectData.projectDefinition}</div>
          </div>
          <div className="flex flex-col gap-2 items-center mb-5">
            <img
              className="h-16 w-16 object-cover"
              src="https://placehold.co/40x40/FFF/000"
            />
            <div>OnePlanet</div>
          </div>
        </div>
        <div className="bg-white pb-16">
          <Progress
            value={
              ProjectStatusEnums[projectData.status || 0] === "APPROVED"
                ? 15
                : ProjectStatusEnums[projectData.status || 0] === "FUNDABLE"
                  ? daysLeftToComplete > 0
                    ? 50
                    : 85
                  : 100
            }
            containerClassName="h-4 overflow-visible m-0"
            className={`bg-[#05ce78] rounded-r-full flex items-center`}
          >
            <div className="ml-auto w-3 h-3 rounded-full bg-[#08995a] text-[#08995a] mr-1 flex items-center justify-center">
              <span className="mt-6">|</span>
            </div>
          </Progress>
          <div className="border pt-2 pb-2 bg-white">
            <div className="container flex justify-between ">
              <div className="basis-1/3">
                <div className="text-muted bg-muted bg-muted/50"></div>
                <div>
                  <b>
                    {projectData.projectStartDate !== "0001-01-01T00:00:00"
                      ? new Date(projectData.projectStartDate || 0)
                          .toLocaleString("tr", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                          .split(" ,")[0]
                      : languageData.StartingSoon}
                  </b>
                </div>
                <div className="text-muted-foreground text-xs">
                  {languageData.CampaignStartDate}
                </div>
              </div>
              <div className="basis-1/3 text-center">
                <div className="text-muted bg-muted bg-muted/50"></div>
                <div>
                  <b className="text-[#08985a]">
                    {projectData.projectStartDate !== "0001-01-01T00:00:00"
                      ? daysLeftToComplete > 0
                        ? `${daysLeftToComplete} ${languageData.DaysLeft}`
                        : languageData.CampaignEnded
                      : languageData.StartingSoon}
                  </b>
                </div>
                <div className="text-muted-foreground text-xs">
                  {collectedFundPercentage}
                </div>
              </div>
              <div className="basis-1/3 text-end">
                <div className="text-muted bg-muted bg-muted/50"></div>
                <div>
                  <b>
                    {projectData.projectStartDate !== "0001-01-01T00:00:00"
                      ? new Date(projectData.projectEndDate || 0)
                          .toLocaleString("tr", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                          .split(" ,")[0]
                      : languageData.StartingSoon}
                  </b>
                </div>
                <div className="text-muted-foreground text-xs">
                  {languageData.CampaignEndDate}
                </div>
              </div>
            </div>
          </div>
          <div className="container flex justify-between pt-4 gap-3 bg-white">
            <div className="basis-1/3">
              <div className="flex flex-col sticky top-20 gap-3">
                <div>
                  <div className="text-lg font-bold">
                    {currencyFormatter.format(
                      projectData.fundNominalAmount || 0
                    )}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {languageData.CollectedAmount}
                  </div>
                </div>

                <div>
                  <div className="text-lg font-bold">
                    {Math.round((projectData.fundNominalAmount || 0) / 486)}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {languageData.Investor}
                  </div>
                </div>

                <div>
                  <div className="text-lg font-bold">
                    {Math.round((projectData.fundNominalAmount || 0) / 8350)}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {languageData.QualifiedInvestor}
                  </div>
                </div>
                {}
                <CustomButton
                  // @ts-ignore
                  variant={"default"}
                  asChild
                >
                  <Link href="#invest">{languageData.Invest}</Link>
                </CustomButton>
              </div>
            </div>
            <div className="basis-2/3 gap-2 flex flex-col">
              <div className="m-auto flex gap-2 justify-around w-full">
                <CardContent className="w-full">
                  <div className="flex flex-row flex-wrap mt-5">
                    <div className="basis-1/2 mb-3">
                      <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {languageData["FundCollectionType"]}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {fundCollectionType}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-1/2 mb-3">
                      <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {languageData["FundableAmount"]}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {currencyFormatter.format(
                              projectData.fundableAmount || 0
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="basis-1/2">
                      <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {languageData.AdditionalFunding}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            %{projectData.additionalFundRate}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <TiptapLayout
          sections={sectionsData || []}
          defaultActiveSectionId={"general"}
        />
      </div>
    </div>
  );
}
