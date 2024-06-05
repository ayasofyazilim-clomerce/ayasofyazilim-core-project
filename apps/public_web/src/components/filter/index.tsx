// @ts-nocheck
"use client";

import { cn } from "@/lib/utils";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Badge } from "@repo/ayasofyazilim-ui/atoms/badge";
import { Button } from "@repo/ayasofyazilim-ui/atoms/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@repo/ayasofyazilim-ui/atoms/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ayasofyazilim-ui/atoms/popover";
import { ScrollArea } from "@repo/ayasofyazilim-ui/atoms/scroll-area";
import { Separator } from "@repo/ayasofyazilim-ui/atoms/separator";
import * as React from "react";
interface FilterProps {
  title: string;
  searchText?: string;
  searchEmptyText?: string;
  clearFilterText?: string;
  triggerIcon?: React.ComponentType<{ className?: string }>;
  options: {
    label: string;
    value: string | number;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function Filter({
  title,
  searchText,
  searchEmptyText,
  clearFilterText,
  options,
}: FilterProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<
    Set<string | number>
  >(new Set());
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button variant="outline" size="sm" className="h-8 border" asChild>
          <div className="flex items-center">
            <PlusCircledIcon className="mr-2 h-4 w-4" />
            {title}
            {selectedValues?.size > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal lg:hidden"
                >
                  {selectedValues.size}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  {selectedValues.size > 2 ? (
                    <Badge
                      variant="secondary"
                      className="rounded-sm px-1 font-normal"
                    >
                      {selectedValues.size} selected
                    </Badge>
                  ) : (
                    options
                      .filter((option) => selectedValues.has(option.value))
                      .map((option) => (
                        <Badge
                          variant="secondary"
                          key={option.value}
                          className="rounded-sm px-1 font-normal"
                        >
                          {option.label}
                        </Badge>
                      ))
                  )}
                </div>
              </>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="end">
        <Command>
          <ScrollArea>
            <CommandList>
              <CommandInput placeholder={searchText} />
              <CommandEmpty>{searchEmptyText}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValues.has(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => {
                        if (selectedValues.has(option.value)) {
                          selectedValues.delete(option.value);
                        } else {
                          selectedValues.add(option.value);
                        }
                        setSelectedValues(new Set(selectedValues));
                      }}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon className={cn("h-4 w-4")} />
                      </div>
                      {option.icon && (
                        <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="text-xs">{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {selectedValues.size > 0 && clearFilterText && (
                <>
                  <CommandSeparator />
                  {/* @ts-ignore */}
                  <CommandGroup>
                    {/* @ts-ignore */}
                    <CommandItem
                      onSelect={() => {}}
                      className="justify-center text-center"
                    >
                      {clearFilterText}
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
