"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ayasofyazilim-ui/atoms/tooltip";
import { CountrySelector } from "@repo/ayasofyazilim-ui/organisms/country-selector";
import { getBaseLink } from "src/utils";
import countries from "./data";
import { LocaleContext } from "src/providers/locale";
import { useContext } from "react";

export default function LanguageSelector({
  menuAlign,
}: {
  menuAlign?: "start" | "center" | "end";
}) {
  const { resources, cultureName } = useContext(LocaleContext);

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
              location.href = getBaseLink(newUrl, false);
            }}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>{resources?.AbpUi?.texts?.Language}</TooltipContent>
    </Tooltip>
  );
}
