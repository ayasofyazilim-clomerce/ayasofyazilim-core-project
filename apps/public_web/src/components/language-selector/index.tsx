"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ayasofyazilim-ui/atoms/tooltip";
import { CountrySelector } from "@repo/ayasofyazilim-ui/organisms/country-selector";
import { useParams } from "next/navigation";
import { useContext } from "react";
import { LocaleContext } from "src/providers/locale";
import countries from "./data";

export default function LanguageSelector({
  menuAlign,
}: {
  menuAlign?: "start" | "center" | "end";
}): JSX.Element {
  const params = useParams();
  const lang = params?.lang?.toString();
  const { resources, changeLocale } = useContext(LocaleContext);

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
            defaultValue={lang}
            countries={countries}
            onValueChange={(value: string) => {
              changeLocale(value);
            }}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>{resources?.AbpUi?.texts?.Language}</TooltipContent>
    </Tooltip>
  );
}
