"use client";

import { Button } from "@repo/ayasofyazilim-ui/atoms/button";
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
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AppLogo from "../app-logo";
import { ProfileMenu } from "../profile-menu";

export type link = {
  text: string;
  href?: string;
  submenu?: Array<link>;
};
export type linksProp = Array<link>;
export const defaultLinks = [
  {
    href: "/public/projects",
    text: "Projects",
  },
];
export default function Navbar({
  appName,
  links = defaultLinks,
  variant = "invesdor",
  user,
  languageSelector,
  topBar,
  config,
  userNavigation,
  languageData,
}: {
  appName: string;
  links?: linksProp;
  variant: "invesdor" | "hirevision";
  user?: any;
  languageSelector?: JSX.Element;
  topBar?: JSX.Element;
  config?: any;
  userNavigation?: any;
  languageData: any;
}): JSX.Element {
  if (variant === "invesdor")
    return (
      <div>
        {topBar}
        <div className="bg-white p-4">
          <div className="container flex gap-4 justify-between flex-wrap items-center">
            <AppLogo appName={appName} />
            <Menubar className="border-0 h-full shadow-none p-none">
              {links.map((link) => MenuCreator(link))}
            </Menubar>
          </div>
        </div>
      </div>
    );
  if (variant === "hirevision") {
    return (
      <HirevisionNavbar
        config={config}
        appName={appName}
        links={links}
        user={user}
        userNavigation={userNavigation}
        languageSelector={languageSelector}
        languageData={languageData}
      />
    );
  }
  return <></>;
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
        <MenubarTrigger className="hover:text-primary focus:text-primary data-[state=open]:text-primary cursor-pointer rounded-md">
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

function HirevisionNavbar({
  appName,
  links = defaultLinks,
  user,
  config,
  languageSelector,
  userNavigation,
  languageData,
}: {
  appName: string;
  links?: linksProp;
  user?: any;
  languageSelector?: JSX.Element;
  config?: any;
  userNavigation?: any;
  languageData: any;
}): JSX.Element {
  const scrollThreshold = 50;
  const [isFixed, setIsFixed] = useState(
    (window?.scrollY || 0) >= scrollThreshold
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setIsFixed((window?.scrollY || 0) >= scrollThreshold);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`transition-colors md:duration-500 w-full flex justify-between border-b items-center gap-4 px-4 md:px-12 h-16 top-0 left-0 z-50 ${isFixed ? "fixed bg-white  backdrop-blur-sm" : isMenuOpen ? "bg-white fixed backdrop-blur-sm" : "absolute bg-white/10 hover:bg-white/40 backdrop-blur-sm border-b-transparent"}`}
    >
      <Link href={config.link}>
        <img src={config.logo} className="h-8 lg:h-14" />
      </Link>

      <Button
        variant={"ghost"}
        className="p-0 md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Menu />
      </Button>
      {isMenuOpen && (
        <div className="absolute h-[100vh] top-16 left-0 right-0 w-full z-50 md:hidden">
          <Menubar className="flex-col p-1 h-full border-b bg-white">
            {links.map((link) => MenuCreator(link))}
            <hr className="w-full my-4" />
            <div className="gap-4 items-center flex flex-col">
              {user ? (
                <ProfileMenu
                  minNavbar={false}
                  {...userNavigation}
                  languageData={languageData}
                />
              ) : (
                <div className="grid-cols-2 items-center relative justify-center  grid">
                  <Link href={userNavigation.loginURL}>
                    <Button
                      variant={"outline"}
                      className="min-w-24 bg-transparent border-black text-black hover:text-white hover:bg-black hover:scale-110 transition-all border-r-0 rounded-r-none"
                    >
                      {languageData.LogIn}
                    </Button>
                  </Link>
                  <Link href={userNavigation.registerURL}>
                    <Button
                      variant={"outline"}
                      className="min-w-24 bg-transparent border-black text-black hover:text-white hover:bg-black hover:scale-110 transition-all rounded-l-none"
                    >
                      {languageData.Register}
                    </Button>
                  </Link>
                </div>
              )}
              {languageSelector ? languageSelector : <></>}
            </div>
          </Menubar>
        </div>
      )}
      <Menubar className="border-0 bg-transparent shadow-none p-none hidden md:flex">
        {links.map((link) => MenuCreator(link))}
      </Menubar>
      <div className="gap-4 items-center hidden md:flex">
        {user ? (
          <ProfileMenu
            minNavbar={false}
            {...userNavigation}
            languageData={languageData}
          />
        ) : (
          <div className="grid-cols-2 items-center relative justify-center hidden md:grid">
            <Link href={userNavigation.loginURL}>
              <Button
                variant={"outline"}
                className="min-w-24 bg-transparent border-black text-black hover:text-white hover:bg-black hover:scale-110 transition-all border-r-0 rounded-r-none"
              >
                {languageData.LogIn}
              </Button>
            </Link>
            <Link href={userNavigation.registerURL}>
              <Button
                variant={"outline"}
                className="min-w-24 bg-transparent border-black text-black hover:text-white hover:bg-black hover:scale-110 transition-all rounded-l-none"
              >
                {languageData.Register}
              </Button>
            </Link>
          </div>
        )}
        {languageSelector ? languageSelector : <></>}
      </div>
    </nav>
  );
}
