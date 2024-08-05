"use server";

import LandingPageLayout from "@repo/ayasofyazilim-ui/templates/landing-page-layout";
import LanguageSelector from "@repo/ui/language-selector";
import Header from "@repo/ui/upwithcrowd/header";
import type { linksProp } from "@repo/ui/upwithcrowd/navbar";
import Navbar from "@repo/ui/upwithcrowd/navbar";
import { Projector, ShieldAlert, Worm } from "lucide-react";
import Link from "next/link";
import { auth } from "auth";
import { signOutServer } from "auth-action";
import { getBaseLink } from "src/utils";
import { getResourceData } from "src/language-data/AbpUiNavigation/navbar";
import { getConfig } from "../config";

interface LayoutProps {
  params: { lang: string; city: string };
  children: JSX.Element;
}

export default async function Layout({ children, params }: LayoutProps) {
  const { languageData, resources } = await getResourceData(params.lang);
  const appName = params.city;
  const config = getConfig(appName);

  const session = await auth();
  const user = session?.user;
  const links: linksProp = [
    {
      text: languageData.Investor,
      submenu: [
        {
          text: languageData.Invest,
          href: getBaseLink(`public/${appName}/projects`, true),
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
      href: getBaseLink(`public/${appName}/projects`, true),
    },
  ];
  const configSelected = getConfig(appName);

  const userNavigation = {
    className: "bg-transparent",
    loginURL: getBaseLink(`login`, true, params.lang),
    registerURL: getBaseLink(`register`, true, params.lang),
    user,
    imageURL: "https://github.com/shadcn.png",
    menuLinks: [
      {
        href: getBaseLink(`app/admin`, true, params.lang),
        title: languageData.AdminCenter,
        icon: <ShieldAlert className="mr-2 h-4 w-4" />,
      },
      {
        href: getBaseLink(`app/entrepreneur`, true, params.lang),
        title: languageData.EntrepreneurCenter,
        icon: <Projector className="mr-2 h-4 w-4" />,
      },
      {
        href: getBaseLink(`app/investor`, true, params.lang),
        title: languageData.InvestorCenter,
        icon: <Worm className="mr-2 h-4 w-4" />,
      },
    ],
    isLoggedIn: Boolean(user),
    signOutFunction: signOutServer,
    resources,
  };
  return (
    <LandingPageLayout
      HeaderComponent={
        <Navbar
          appName={appName}
          config={configSelected}
          languageData={languageData}
          languageSelector={
            <LanguageSelector
              baseLink={getBaseLink("", false)}
              cultureName={params.lang}
              resources={resources}
            />
          }
          links={links}
          topBar={
            <Header
              languageSelector={
                <LanguageSelector
                  baseLink={getBaseLink("", false)}
                  cultureName={params.lang}
                  resources={resources}
                />
              }
              resources={resources}
              signOutServer={signOutServer}
              user={user}
            />
          }
          user={user}
          userNavigation={userNavigation}
          variant="hirevision"
        />
      }
      mainClassName="p-0 md:p-0 w-full"
    >
      <>
        {children}
        <div className="pt-20 w-full text-white bg-slate-900  bg-dot-slate-300/[0.2] relative flex items-center justify-center flex flex-col gap-20 overflow-hidden flex-wrap">
          <img
            alt=""
            className="w-full absolute pointer-events-none z-0 opacity-20"
            src={config.images.footer}
          />
          <div
            className="w-full hidden h-full absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: `url(${config.images.second})`,
            }}
          />
          <div className="container flex flex-col h-full justify-center gap-20">
            <div className="mx-auto">
              <img alt="" className="mx-auto" src={config.logo} />
            </div>
            <div className="grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-5 gap-6 col-span-2">
              <div className="items-center text-center lg:text-left lg:items-start flex flex-col gap-2">
                <h3 className="text-md font-bold">Kurumsal</h3>
                <div className="grid text-sm">
                  <Link className="text-slate-200 hover:text-white" href="#">
                    Hakkımızda
                  </Link>
                  <Link className="text-slate-200 hover:text-white" href="#">
                    Platform Ortaklık Yapısı
                  </Link>
                  <Link className="text-slate-200 hover:text-white" href="#">
                    Blog
                  </Link>
                  <Link className="text-slate-200 hover:text-white" href="#">
                    S.S.S
                  </Link>
                  <Link className="text-slate-200 hover:text-white" href="#">
                    İletişim
                  </Link>
                </div>
              </div>
              <div className="items-center text-center lg:text-left lg:items-start flex flex-col gap-2">
                <h3 className="text-md font-bold">Paydaşlarımız</h3>
                <div className="grid text-sm">
                  <Link className="text-slate-200 hover:text-white" href="#">
                    Merkezi Kayıt İstanbul
                  </Link>
                  <Link className="text-slate-200 hover:text-white" href="#">
                    Takas İstanbul
                  </Link>
                  <Link className="text-slate-200 hover:text-white" href="#">
                    İstanbul Ticaret Odası
                  </Link>
                  <Link className="text-slate-200 hover:text-white" href="#">
                    E-Devlet
                  </Link>
                </div>
              </div>
              <div className="items-center text-center lg:text-left lg:items-start flex flex-col gap-2">
                <h3 className="text-md font-bold">Yatırımcı</h3>
                <div className="grid text-sm">
                  <Link className="text-slate-200 hover:text-white" href="#">
                    Nasıl Yatırım Yapılır?
                  </Link>
                  <Link className="text-slate-200 hover:text-white" href="#">
                    Aktif Projeler
                  </Link>
                  <Link className="text-slate-200 hover:text-white" href="#">
                    Tamamlanmış Projeler
                  </Link>
                  <Link className="text-slate-200 hover:text-white" href="#">
                    Gelecek Projeler
                  </Link>
                </div>
              </div>
              <div className="items-center text-center lg:text-left lg:items-start flex flex-col gap-2">
                <h3 className="text-md font-bold">Girişimci</h3>
                <div className="grid text-sm">
                  <Link className="text-slate-200 hover:text-white" href="#">
                    Nasıl Proje Oluşturulur?
                  </Link>
                  <Link className="text-slate-200 hover:text-white" href="#">
                    Proje Oluştur
                  </Link>
                  <Link className="text-slate-200 hover:text-white" href="#">
                    Gerekli Belgeler
                  </Link>
                </div>
              </div>
              <div className="items-center text-center lg:text-left lg:items-start flex flex-col gap-2">
                <h3 className="text-md font-bold">Dokümantasyon</h3>
                <div className="grid text-sm">
                  <Link className="text-slate-200 hover:text-white" href="#">
                    Değerlendirme Politikası
                  </Link>
                  <Link className="text-slate-200 hover:text-white" href="#">
                    Bilgi Güvenliği Politikası
                  </Link>
                  <Link className="text-slate-200 hover:text-white" href="#">
                    Çıkar Çatışması Politikası
                  </Link>
                  <Link className="text-slate-200 hover:text-white" href="#">
                    Kalite Politikası
                  </Link>
                  <Link className="text-slate-200 hover:text-white" href="#">
                    Rüşvet ve Yolsuzlukla Mücadele
                  </Link>
                  <Link className="text-slate-200 hover:text-white" href="#">
                    Kara Para ile Mücadele Politikası
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="md:h-10 py-4 bg-slate-800/50 text-sm w-full items-center flex z-5">
            <div className="container flex justify-between items-center flex-col gap-4 md:flex-row">
              <h1>{config.full} 2024 Tüm hakları saklıdır.</h1>
              <div className="flex items-center gap-4 flex-col md:flex-row">
                <Link className="text-slate-200 hover:text-white" href="#">
                  Genel Risk Bildirimi
                </Link>
                <Link className="text-slate-200 hover:text-white" href="#">
                  Üyelik Sözleşmesi
                </Link>
                <Link className="text-slate-200 hover:text-white" href="#">
                  KVKK Bildirimi
                </Link>
                <Link className="text-slate-200 hover:text-white" href="#">
                  Kampanya Sözleşmesi
                </Link>
                <Link className="text-slate-200 hover:text-white" href="#">
                  Faaliyet Raporu ve Finansal Tablolar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    </LandingPageLayout>
  );
}
