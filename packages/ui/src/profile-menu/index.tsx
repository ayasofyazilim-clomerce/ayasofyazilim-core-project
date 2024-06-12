import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ayasofyazilim-ui/atoms/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ayasofyazilim-ui/atoms/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { cn } from "../utils";

export type MenuLinkItem = {
  key?: string;
  title: string;
  href?: string;
};

export type ProfileMenuProps = {
  className?: string;
  isLoggedIn: boolean;
  loginURL?: string;
  username?: string;
  email?: string;
  imageURL?: string;
  initials?: string;
  menuLinks?: MenuLinkItem[];
  minNavbar?: boolean;
  signOutFunction?: any;
  resources?: { [key: string]: any } | null;
};

export function ProfileMenu({ ...props }: ProfileMenuProps) {
  return (
    <div
      className={cn(
        `relative flex items-center gap-2 w-full ${props.minNavbar ? "p-[0!important] justify-center" : ""}`,
        props.className
      )}
    >
      {props.isLoggedIn && props.username && props.email ? (
        <>
          {props.minNavbar ? (
            <></>
          ) : (
            <>
              <Avatar>
                <AvatarImage src={props.imageURL ?? ""} />
                <AvatarFallback>
                  {props.username?.substring(0, 2) ?? "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0 w-full">
                <h3 className="leading-none font-semibold text-sm">
                  {props.username}
                </h3>
                <h6 className="leading-none text-muted-foreground text-xs">
                  {props.email}
                </h6>
              </div>
            </>
          )}

          {props.menuLinks && (
            <ProfileMenuLinks
              menuLinks={props.menuLinks}
              signOutFunction={props.signOutFunction}
              minNavbar={props.minNavbar}
              imageURL={props.imageURL}
              username={props.username}
              resources={props.resources}
            />
          )}
        </>
      ) : (
        <Link href={props.loginURL ?? "/login"} className="w-full">
          Login
        </Link>
      )}
    </div>
  );
}

function ProfileMenuTrigger(
  minNavbar?: boolean,
  imageURL?: string,
  username?: string
) {
  return (
    <DropdownMenuTrigger>
      {minNavbar ? (
        <Avatar>
          <AvatarImage src={imageURL ?? ""} />
          <AvatarFallback>{username?.substring(0, 2) ?? "U"}</AvatarFallback>
        </Avatar>
      ) : (
        <EllipsisVertical className="w-4" />
      )}
    </DropdownMenuTrigger>
  );
}

function ProfileMenuLinks({
  menuLinks,
  signOutFunction,
  resources,
  minNavbar,
  imageURL,
  username,
}: {
  minNavbar?: boolean;
  imageURL?: string;
  username?: string;
  menuLinks: MenuLinkItem[];
  signOutFunction: any;
  resources?: { [key: string]: any } | null;
}) {
  return (
    <DropdownMenu>
      {ProfileMenuTrigger(minNavbar, imageURL, username)}
      <DropdownMenuContent className="z-[99]">
        {menuLinks.map((item: MenuLinkItem) => (
          <DropdownMenuItem
            key={item.key ? item.key : item.title}
            asChild={!item.href}
          >
            {item.href ? (
              <Link href={item.href}>{item.title}</Link>
            ) : (
              <>{item.title}</>
            )}
          </DropdownMenuItem>
        ))}
        {signOutFunction && (
          <DropdownMenuItem
            onClick={() => {
              signOutFunction();
            }}
          >
            {resources?.AbpUi?.texts?.Logout}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
