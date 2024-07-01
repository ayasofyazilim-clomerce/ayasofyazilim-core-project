import Button from "@repo/ayasofyazilim-ui/molecules/button";
import Progress from "@repo/ayasofyazilim-ui/molecules/progress";
import Link from "next/link";

export const currencyFormatter = new Intl.NumberFormat("tr", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 0,
});
export const numberFormatter = new Intl.NumberFormat("tr", {
  maximumFractionDigits: 0,
});
export function getFundCollectionType(languageData: any, fundType?: string) {
  return fundType === "SHRE"
    ? languageData["FundCollectionTypeSHRE"]
    : languageData["FundCollectionTypeDBIT"];
}
interface IProjectCardProps {
  languageData: any;
  project: any;
  projectURL: string;
  horizontal?: boolean;
  actionText: string;
}

export default function ProjectCard({
  languageData,
  project,
  projectURL,
  horizontal = false,
  actionText,
}: IProjectCardProps): JSX.Element {
  return (
    <div
      key={project.id}
      className={`bg-white border rounded-md flex ${horizontal ? "flex-row" : "flex-col basis-1/3"}`}
    >
      <div className={horizontal ? "basis-2/4" : ""}>
        <img
          src="https://placehold.co/1920x600"
          className={`h-full object-cover min-h-[200px] ${horizontal ? "" : "rounded-t-md"}`}
        />
      </div>
      <div className={horizontal ? "basis-2/4" : ""}>
        <Progress
          value={Math.max(
            5,
            ((project.fundNominalAmount || 0) / (project.fundableAmount || 1)) *
              100
          )}
          containerClassName="h-4 overflow-hidden m-0"
          className={`bg-[#05ce78] rounded-r-full flex items-center`}
        >
          <div className="ml-auto w-3 h-3 rounded-full bg-[#08995a] text-[#08995a] mr-1 flex items-center justify-center"></div>
        </Progress>
        <div className="py-4 px-6 flex flex-col gap-2 border-b">
          <h3 className="font-semibold leading-none tracking-tight hover:underline">
            <Link href={projectURL}>{project.projectName}</Link>
          </h3>
          <p className="text-sm text-muted-foreground">
            {project.projectDefinition}
          </p>
        </div>

        <div className="py-4 px-6 flex flex-col gap-2">
          <div className="items-center py-1 flex justify-between  text-center flex-row">
            <div className="text-xs flex gap-0 font-semibold">
              {languageData.FundCollectionType}
            </div>
            <div className="text-xs flex gap-0">
              {project.fundCollectionType === "SHRE"
                ? languageData["FundCollectionTypeSHRE"]
                : languageData["FundCollectionTypeDBIT"]}
            </div>
          </div>
          <div className="items-center py-1 flex justify-between  text-center flex-row">
            <div className="text-xs flex gap-0 font-semibold">
              {languageData.AdditionalFunding}
            </div>
            <div className="text-xs flex gap-0">
              %{project.additionalFundRate || 0}
            </div>
          </div>
          <div className="items-center py-1 flex justify-between  text-center flex-row">
            <div className="text-xs flex gap-0 font-semibold">
              {languageData.CampaignStartDate}
            </div>
            <div className="text-xs flex gap-0">
              {project.projectStartDate !== "0001-01-01T00:00:00"
                ? new Date(project.projectStartDate ?? 0)
                    .toLocaleString("tr", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    .split(" ,")[0]
                : languageData.StartingSoon}
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-row justify-between items-center bg-gray-100">
            <div className="p-6 flex justify-between py-2 text-center flex-col items-start">
              <div className="flex gap-0 font-semibold text-md m-auto">
                {currencyFormatter.format(project.fundNominalAmount ?? 0)}
              </div>
              <div className="text-xs flex gap-0">
                {languageData.CollectedAmount}
              </div>
            </div>
            <div className="p-6 flex justify-between py-2 text-center flex-col items-end">
              <div className="flex gap-0 font-semibold text-md m-auto">
                {currencyFormatter.format(project.fundableAmount ?? 0)}
              </div>
              <div className="text-xs flex gap-0">
                {languageData.TargetAmount}
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3">
          <Button
            asChild
            customVariant="primary"
            className="rounded-full w-full"
          >
            <Link href={projectURL}>{actionText}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
