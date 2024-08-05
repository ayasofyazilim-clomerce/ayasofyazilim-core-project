import { CardContent } from "@repo/ayasofyazilim-ui/atoms/card";
import CustomButton from "@repo/ayasofyazilim-ui/molecules/button";
import Progress from "@repo/ayasofyazilim-ui/molecules/progress";
import { TiptapLayout } from "@repo/ayasofyazilim-ui/templates/tiptap-layout";
import Link from "next/link";
import Invest from "../../../invest";
import { currencyFormatter, getFundCollectionType } from "../project-card";

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
    const targetObj = new Date(projectData?.endDate || 0);
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

  const defaultImages = {
    "172c8633-7ef7-8fcc-bfd3-3a13d3b9ec5c":
      "https://kapilendo-public.imgix.net/files/projects/wimao-oy/b4e25953-bea3-4509-9996-5dc9f0e5ebb6_Wimao-Oy-Project-Header-1920x1080px-2.png",
    "57192532-b844-3345-c26f-3a13d26c24b7":
      "https://kapilendo-public.imgix.net/files/projects/resonandina/44bf7d13-1951-4cb4-bd99-f57c2d027d7b_Resonandina_Project-Header-1920x1080px.png",
    "d8c7b654-8b14-6909-fd6b-3a13d3914912":
      "https://kapilendo-public.imgix.net/files/projects/b86b24b0-ffa8-4da7-bb0d-ddcdedf0202d_WellO2-Oy-Project-Header-1920x1080px-3.png",
  };

  const daysLeftToComplete = getDateDifferanceInDays();
  const collectedFundPercentage = getCollectedFundPercentage();
  const fundCollectionType = getFundCollectionType(
    languageData,
    projectData?.fundCollectionType || ""
  );
  const investmentDetails = getInvestmentDetails();

  // if (user && !isPreview) {
  //   sectionsData.push({
  //     key: "invest",
  //     id: "invest",
  //     name: languageData.Invest,
  //     value: (
  //       <Invest
  //         user={user}
  //         languageData={languageData}
  //         name={projectData.name || ""}
  //         description={projectData.definition || ""}
  //         investmentDetails={investmentDetails}
  //       />
  //     ),
  //   });
  // }
  return (
    <div className="w-full">
      <div className="flex flex-col">
        <div
          className={"md:h-[600px]  bg-cover bg-no-repeat bg-center relative"}
          style={{
            backgroundImage: `url(${defaultImages?.[projectData.id as keyof typeof defaultImages] || "https://placehold.co/1920x600"})`,
          }}
        >
          <img
            src={
              defaultImages?.[projectData.id as keyof typeof defaultImages] ||
              "https://placehold.co/1920x600"
            }
            alt="image"
            className="w-full mt-20 mb-10 md:hidden"
          />
          <div className="flex flex-col gap-2 items-center mb-4 absolute bottom-0 right-3 text-xs md:hidden">
            <img
              className="h-10 w-10 object-cover"
              src="https://placehold.co/40x40/EEE/000"
            />
            <div>OnePlanet</div>
          </div>
          <div className="container items-end justify-between h-full hidden md:flex">
            <div className="flex flex-col gap-2 mb-5 p-4 rounded-md bg-white/80">
              <div className="text-4xl font-bold">{projectData.name}</div>
              <div className="text-2xl ">{projectData.definition}</div>
            </div>
            <div className="flex flex-col gap-2 items-center mb-5">
              <img
                className="h-16 w-16 object-cover"
                src="https://placehold.co/40x40/FFF/000"
              />
              <div>OnePlanet</div>
            </div>
          </div>
        </div>
        <div className="container items-end justify-between h-full  md:hidden py-5 md:py-8">
          <div className="flex flex-col gap-2 rounded-md bg-white/80">
            <div className="text:lg md:text-2xl font-bold">
              {projectData.name}
            </div>
            <div className="text-md md:text-xl ">{projectData.definition}</div>
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
            <div className="container flex justify-between flex-col md:flex-row gap-3">
              <div className="basis-1/3">
                <div className="text-muted bg-muted bg-muted/50"></div>
                <div>
                  <b className="text-sm md:text-md">
                    {projectData.startDate
                      ? new Date(projectData.startDate || 0)
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
                    {projectData.startDate !== "0001-01-01T00:00:00"
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
                  <b className="text-sm md:text-md">
                    {projectData.startDate !== "0001-01-01T00:00:00"
                      ? new Date(projectData.endDate || 0)
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
              <div className="mt-1.5 flex gap-2 justify-end md:justify-around w-full">
                <CardContent className="md:w-full p-0 md:px-6">
                  <div className="flex md:flex-row flex-col flex-wrap md:mt-5">
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

      <TiptapLayout
        sections={sectionsData || []}
        defaultActiveSectionId={"general"}
      />
    </div>
  );
}
