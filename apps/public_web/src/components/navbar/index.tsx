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
} from "@/components/ui/menubar";
import Link from "next/link";
import { useConfig } from "src/providers/configuration";
import { useUser } from "src/providers/user";

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
  links = defaultLinks,
}: {
  links?: linksProp;
}): JSX.Element {
  return (
    <div className="bg-white p-4">
      <div className="container flex gap-4 justify-between flex-wrap">
        <span className="tracking-widest text-2xl font-bold">UPWITHCROWD</span>
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
  } else {
    return (
      <MenubarMenu>
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
  return <></>;
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
  } else {
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
}
