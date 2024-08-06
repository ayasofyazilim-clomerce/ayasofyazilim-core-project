"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ayasofyazilim-ui/atoms/avatar";
import { Button } from "@repo/ayasofyazilim-ui/atoms/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@repo/ayasofyazilim-ui/atoms/dropdown-menu";
import { ChevronDown, LogOut, PlusCircle, User, UserPlus } from "lucide-react";
import Link from "next/link";
import { cn } from "../../utils";

export type MenuLinkItem = {
  key?: string;
  title: string;
  href: string;
  icon?: JSX.Element;
};

export type ProfileMenuProps = {
  className?: string;
  user: any;
  imageURL?: string;
  menuLinks?: MenuLinkItem[];
  signOutFunction?: any;
  languageData?: any;
  minNavbar?: boolean;
};
export function ProfileMenu({
  menuLinks,
  user,
  signOutFunction,
  className,
  imageURL,
  languageData,
}: ProfileMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex items-center gap-3 w-full focus-visible:ring-0  hover:drop-shadow-sm  px-3 py-1 transition-shadow duration-500 rounded-md h-auto",
            className
          )}
        >
          <Avatar>
            <AvatarImage src={imageURL ?? ""} />
            <AvatarFallback>
              {user.userName?.substring(0, 2) ?? "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1 w-full">
            <h3 className="leading-none font-semibold text-sm">{user.name}</h3>
            <h6 className="leading-none text-muted-foreground text-xs">
              {user.email}
            </h6>
          </div>
          <ChevronDown className="w-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{languageData.MyAccount}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <UserPlus className="mr-2 h-4 w-4" />
            <span>{languageData.ChangeProfile}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>{user.name}</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>{languageData.Add}...</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {menuLinks?.map((link) => (
            <Link key={link.title} href={link.href}>
              <DropdownMenuItem className="cursor-pointer">
                {link.icon}
                <span>{link.title}</span>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>

        {menuLinks && menuLinks.length > 0 && <DropdownMenuSeparator />}

        {signOutFunction && (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              signOutFunction();
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>{languageData.LogOut}</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
