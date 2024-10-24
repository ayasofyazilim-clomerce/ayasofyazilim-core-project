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
import { getResourceData } from "src/language-data/AbpUiNavigation";
import { getConfig } from "../config";

interface LayoutProps {
  params: { lang: string; city: string };
  children: JSX.Element;
}

export default async function Layout({ children, params }: LayoutProps) {
  const { languageData, resources } = await getResourceData(params.lang);
  const appName = params.city;
  const config = getConfig(appName);

  const project = process.env.APPLICATION_NAME;

  const session = await auth();
  const user = session?.user;
  const links: linksProp = [
    {
      text: "Investor",
      submenu: [
        {
          text: "Invest",
          href: getBaseLink(`public/${appName}/projects`, true),
        },
        {
          text: "SupportCenter",
          href: "#",
        },
      ],
    },
    {
      text: "Entrepreneur",
      submenu: [
        {
          text: "SubmitYourProject",
          href: "#",
        },
        {
          text: "SupportCenter",
          href: "#",
        },
        {
          text: "HowDoIFindTheNecessaryFunds",
          href: "#",
        },
      ],
    },
    {
      text: "Institutional",
      submenu: [
        {
          text: "AboutUs",
          href: "#",
        },
        {
          text: "OurTeam",
          href: "#",
        },
        {
          text: "Contact",
          href: "#",
        },
        {
          text: "BoardOfDirectors",
          href: "#",
        },
        {
          text: "InvestingCommittee",
          href: "#",
        },
      ],
    },
    {
      text: "Campaigns",
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
    menuLinks:
      project === "UPWITHCROWD"
        ? [
            {
              href: getBaseLink(`app/admin`, true, params.lang),
              title: "AdminCenter",
              icon: <ShieldAlert className="mr-2 h-4 w-4" />,
            },
            {
              href: getBaseLink(`app/entrepreneur`, true, params.lang),
              title: "EntrepreneurCenter",
              icon: <Projector className="mr-2 h-4 w-4" />,
            },
            {
              href: getBaseLink(`app/investor`, true, params.lang),
              title: "InvestorCenter",
              icon: <Worm className="mr-2 h-4 w-4" />,
            },
          ]
        : [],
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
        <div className="bg-dot-slate-300/[0.2] relative flex flex  w-full flex-col flex-wrap items-center justify-center gap-20 overflow-hidden bg-slate-900 pt-20 text-white">
          <img
            alt=""
            className="pointer-events-none absolute z-0 w-full opacity-20"
            src={config.images.footer}
          />
          <div
            className="pointer-events-none absolute inset-0 hidden h-full w-full opacity-10"
            style={{
              backgroundImage: `url(${config.images.second})`,
            }}
          />
          <div className="container flex h-full flex-col justify-center gap-20">
            <div className="mx-auto">
              <img alt="" className="mx-auto" src={config.logo} />
            </div>
            <div className="col-span-2 grid grid-cols-1 justify-center gap-6 md:grid-cols-2 lg:grid-cols-5">
              <div className="flex flex-col items-center gap-2 text-center lg:items-start lg:text-left">
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
              <div className="flex flex-col items-center gap-2 text-center lg:items-start lg:text-left">
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
              <div className="flex flex-col items-center gap-2 text-center lg:items-start lg:text-left">
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
              <div className="flex flex-col items-center gap-2 text-center lg:items-start lg:text-left">
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
              <div className="flex flex-col items-center gap-2 text-center lg:items-start lg:text-left">
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
          <div className="z-5 flex w-full items-center bg-slate-800/50 py-4 text-sm md:h-10">
            <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
              <h1>{config.full} 2024 Tüm hakları saklıdır.</h1>
              <div className="flex flex-col items-center gap-4 md:flex-row">
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
