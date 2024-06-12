"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@repo/ayasofyazilim-ui/atoms/menubar";
import Link from "next/link";
import { Logo } from "../logo";

export type link = {
  text: string;
  href?: string;
  submenu?: Array<link>;
};
export type linksProp = Array<link>;
export const defaultLinks = [
  {
    href: "/projects",
    text: "Projects",
  },
];
export default function Navbar({
  appName,
  links = defaultLinks,
}: {
  appName: string;
  links?: linksProp;
}): JSX.Element {
  return (
    <div className="bg-white p-4">
      <div className="container flex gap-4 justify-between flex-wrap">
        {appName != "UNIREFUND" ? (
          <span className="tracking-widest text-2xl font-bold">
            {appName.toLocaleUpperCase()}
          </span>
        ) : (
          <Logo
            variant="text"
            iconProps={{
              className: "w-10 h-10",
              taxFree: false,
              fill: "#DB0000",
            }}
            textProps={{
              className: "h-4",
              primaryColor: "#DB0000",
            }}
            appIconProps={{
              className: "w-10 h-10",
            }}
          />
        )}
        <Menubar className="border-0 h-full shadow-none p-none">
          {links.map((link) => MenuCreator(link))}
        </Menubar>
      </div>
    </div>
  );
}

function MenuItemCreator(link: link): JSX.Element {
  return (
    <MenubarItem
      key={link.text}
      className="hover:text-primary focus:text-primary cursor-pointer"
      asChild
    >
      <Link href={link.href || ""}>{link.text}</Link>
    </MenubarItem>
  );
}
function MenuCreator(link: link): JSX.Element {
  if (link.submenu) {
    return (
      <MenubarMenu key={link.text}>
        <MenubarTrigger className="hover:text-primary focus:text-primary data-[state=open]:text-primary cursor-pointer">
          {link.text}
        </MenubarTrigger>
        <MenubarContent>
          {link.submenu.map((subLink) => {
            if (subLink.submenu) {
              return SubMenuCreator(subLink);
            } else {
              return MenuItemCreator(subLink);
            }
          })}
        </MenubarContent>
      </MenubarMenu>
    );
  }
  return (
    <MenubarMenu key={link.text}>
      <MenubarTrigger
        className="hover:text-primary focus:text-primary data-[state=open]:text-primary"
        asChild
      >
        <Link href={link.href || ""} className="cursor-pointer">
          {link.text}
        </Link>
      </MenubarTrigger>
    </MenubarMenu>
  );
}
function SubMenuCreator(link: link): JSX.Element {
  if (link.submenu) {
    return (
      <MenubarSub>
        <MenubarSubTrigger className="hover:text-primary focus:text-primary data-[state=open]:text-primary cursor-pointer">
          {link.text}
        </MenubarSubTrigger>
        <MenubarSubContent>
          {link.submenu.map((subLink) => {
            if (subLink.submenu) {
              return SubMenuCreator(subLink);
            } else {
              return MenuItemCreator(subLink);
            }
          })}
        </MenubarSubContent>
      </MenubarSub>
    );
  }
  return (
    <MenubarSub>
      <MenubarSubTrigger
        className="hover:text-primary focus:text-primary data-[state=open]:text-primary"
        asChild
      >
        <Link href={link.href || ""} className="cursor-pointer">
          {link.text}
        </Link>
      </MenubarSubTrigger>
    </MenubarSub>
  );
}
