"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ayasofyazilim-ui/atoms/tooltip";
import { CountrySelector } from "@repo/ayasofyazilim-ui/organisms/country-selector";
import countries from "./data";

export default function LanguageSelector({
  menuAlign,
  resources,
  cultureName,
  baseLink,
}: {
  menuAlign?: "start" | "center" | "end";
  resources: any;
  cultureName: string;
  baseLink: any;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex">
          <CountrySelector
            searchText={resources?.AbpUi.texts?.Search}
            searchEmptyValue={
              resources?.AbpExceptionHandling?.texts?.DefaultErrorMessage404
            }
            menuAlign={menuAlign}
            defaultValue={cultureName}
            countries={countries}
            onValueChange={(value: string) => {
              const newUrl =
                value + "/" + location.pathname.split("/").slice(2).join("/");
              location.href = `${baseLink}${newUrl}`;
            }}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>{resources?.AbpUi?.texts?.Language}</TooltipContent>
    </Tooltip>
  );
}
