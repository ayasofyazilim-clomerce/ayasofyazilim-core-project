"use server";

import MainLayout from "@repo/ayasofyazilim-ui/templates/main-layout";

import LanguageSelector from "@repo/ui/language-selector";
import Header from "@repo/ui/upwithcrowd/header";
import Navbar, { linksProp } from "@repo/ui/upwithcrowd/navbar";
import { auth } from "auth";
import { signOutServer } from "auth-action";
import { Projector, ShieldAlert, Worm } from "lucide-react";
import { getBaseLink, getLocalizationResources } from "src/utils";
import bursa from "/public/bursa.svg";
import istanbul from "/public/istanbul.svg";
import konya from "/public/konya.svg";
import sakarya from "/public/sakarya.svg";
import { getResourceData } from "src/language-data/AbpUiNavigation/navbar";

export async function getConfig(appName: string = "konya") {
  let configs = {
    bursa: {
      key: "bursa",
      link: getBaseLink("/", true),
      with: "Bursa ile",
      its: "Bursa'nın",
      full: "Bursa Sanayi Odası",
      logo: "https://www.btso.org.tr/image/logo.png",
      texts: {
        hero: "Ortak aklın gücüyle geleceğin kentine",
      },
      colors: {
        primary: "",
        secondary: "",
      },
      images: {
        hero: "",
        second: bursa.src,
        footer: "https://i.hizliresim.com/97pq8fz.png",
      },
    },
    konya: {
      key: "konya",
      link: getBaseLink("/", true),
      with: "Konya ile",
      its: "Konya'nın",
      full: "Konya Sanayi Odası",
      logo: "https://i.hizliresim.com/861rfcz.png",
      texts: {
        hero: "Konya sanayisi ile dünya arasındaki köprü",
      },
      colors: {
        primary: "",
        secondary: "",
      },
      images: {
        hero: "",
        second: konya.src,
        footer: "https://i.hizliresim.com/2avyu3e.png",
      },
    },
    istanbul: {
      key: "istanbul",
      link: getBaseLink("/", true),
      with: "İstanbul ile",
      its: "İstanbul'un",
      full: "İstanbul Sanayi Odası",
      logo: "https://i.hizliresim.com/kbfuovo.png",
      texts: {
        hero: "İstanbul büyürse Türkiye büyür",
      },
      colors: {
        primary: "",
        secondary: "",
      },
      images: {
        hero: "",
        second: istanbul.src,
        footer: "https://i.hizliresim.com/gnbeshr.png",
      },
    },
    sakarya: {
      key: "sakarya",
      link: getBaseLink("/", true),
      with: "Sakarya ile",
      its: "Sakarya'nın",
      full: "Sakarya Sanayi Odası",
      logo: "https://www.satso.org.tr/assets/img/satso-logo.png",
      texts: {
        hero: "Sakarya büyürse Türkiye büyür",
      },
      colors: {
        primary: "",
        secondary: "",
      },
      images: {
        hero: "",
        second: sakarya.src,
        footer: "https://i.hizliresim.com/1hfd5se.jpg",
      },
    },
  };

  return configs[appName as keyof typeof configs] || configs.konya;
}

type LayoutProps = {
  params: { lang: string };
  children: JSX.Element;
};

export default async function Layout({ children, params }: LayoutProps) {
  const { languageData, resources } = await getResourceData(params.lang);

  const session = await auth();
  const user = session?.user;
  const links: linksProp = [
    {
      text: languageData.Investor,
      submenu: [
        {
          text: languageData.Invest,
          href: getBaseLink("public/projects", true),
        },
        {
          text: languageData.SupportCenter,
          href: "#",
        },
      ],
    },
    {
      text: languageData.Entrepreneur,
      submenu: [
        {
          text: languageData.SubmitYourProject,
          href: "#",
        },
        {
          text: languageData.SupportCenter,
          href: "#",
        },
        {
          text: languageData.HowDoIFindTheNecessaryFunds,
          href: "#",
        },
      ],
    },
    {
      text: languageData.Institutional,
      submenu: [
        {
          text: languageData.AboutUs,
          href: "#",
        },
        {
          text: languageData.OurTeam,
          href: "#",
        },
        {
          text: languageData.Contact,
          href: "#",
        },
        {
          text: languageData.BoardOfDirectors,
          href: "#",
        },
        {
          text: languageData.InvestingCommittee,
          href: "#",
        },
      ],
    },
    {
      text: languageData.Campaigns,
      href: getBaseLink("public/projects", true),
    },
  ];
  let configSelected = await getConfig(process.env.APPLICATION_NAME);

  const userNavigation = {
    loginURL: getBaseLink(`login`, true, params.lang),
    registerURL: getBaseLink(`register`, true, params.lang),
    user: user,
    imageURL: "https://github.com/shadcn.png",
    menuLinks: [
      {
        href: getBaseLink(`app/admin`, true, params.lang),
        title: languageData.AdminCenter,
        icon: <ShieldAlert className="mr-2 h-4 w-4" />,
      },
      {
        href: getBaseLink(`app/entreperneur`, true, params.lang),
        title: languageData.EntrepreneurCenter,
        icon: <Projector className="mr-2 h-4 w-4" />,
      },
      {
        href: getBaseLink(`app/investor`, true, params.lang),
        title: languageData.InvestorCenter,
        icon: <Worm className="mr-2 h-4 w-4" />,
      },
    ],
    isLoggedIn: !!user,
    signOutFunction: signOutServer,
    resources: resources,
  };
  return (
    <MainLayout
      mainClassName="p-0 md:p-0 w-full"
      childScrollArea={false}
      HeaderComponent={
        <Navbar
          topBar={
            <Header
              languageSelector={
                <LanguageSelector
                  resources={resources}
                  cultureName={params.lang}
                  baseLink={getBaseLink("", false)}
                />
              }
              user={user}
              resources={resources}
              signOutServer={signOutServer}
            />
          }
          resources={resources}
          variant="hirevision"
          links={links}
          user={user}
          userNavigation={userNavigation}
          config={configSelected}
          appName={process.env.APPLICATION_NAME || "konya"}
          languageSelector={
            <LanguageSelector
              resources={resources}
              cultureName={params.lang}
              baseLink={getBaseLink("", false)}
            />
          }
        />
      }
    >
      {children}
    </MainLayout>
  );
}
