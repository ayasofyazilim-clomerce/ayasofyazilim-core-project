"use client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@repo/ayasofyazilim-ui/atoms/button";
import { BentoGrid, BentoGridItem } from "@repo/ui/upwithcrowd/bento-grid";
import { Brands } from "@repo/ui/upwithcrowd/brands";
import { FlipWords, Hero } from "@repo/ui/upwithcrowd/hero";
import ProjectCard from "@repo/ui/upwithcrowd/project/project-card";
import { ProjectStatusEnums } from "src/enums/project";

const BrandList = [
  {
    title: "beets&roots",
    href: "https://valu.com.tr/uploads/stakeholders/stakeholder-logo-66b60cd7cb414.webp",
  },
  {
    title: "cargaroo",
    href: "https://valu.com.tr/uploads/stakeholders/stakeholder-logo-66b60cc17dafb.webp",
  },
  // {
  //   title: "heeros",
  //   href: "https://valu.com.tr/uploads/stakeholders/stakeholder-logo-6630ff2e18167.webp",
  // },
  {
    title: "tr-gov",
    href: "	https://cdn.e-devlet.gov.tr/downloads/kurumsal-kimlik/logo/e-devlet-logo.png",
  },
  {
    title: "beets&roots",
    href: "https://valu.com.tr/uploads/stakeholders/stakeholder-logo-66b60cd7cb414.webp",
  },
  {
    title: "cargaroo",
    href: "https://valu.com.tr/uploads/stakeholders/stakeholder-logo-66b60cc17dafb.webp",
  },
  // {
  //   title: "heeros",
  //   href: "https://valu.com.tr/uploads/stakeholders/stakeholder-logo-6630ff2e18167.webp",
  // },
  {
    title: "tr-gov",
    href: "	https://cdn.e-devlet.gov.tr/downloads/kurumsal-kimlik/logo/e-devlet-logo.png",
  },
];

const items = [
  {
    title: "Az Parayla Yatırım Yapmak (2024)",
    description: (
      <span className="text-sm w-full">
        2024 yılında artık çalışan çalışmayan, alt, orta veya üst gelir
        gruplarına mensup her sınıftan insanlar ek gelir kaynakları yaratmanın
        yollarını aramaktadır.
      </span>
    ),
    header: (
      <div className="w-full h-full flex rounded-md overflow-hidden">
        <img
          alt=""
          className="h-full w-auto"
          src="https://valu.com.tr/uploads/thumbcache/homepage_blog/uploads/blogs/blog-6662d10e87010.webp"
        />
      </div>
    ),
    className: "md:col-span-1",
    icon: (
      <div className="flex gap-2">
        <Badge variant="secondary">Yatırım</Badge>
      </div>
    ),
  },
  {
    title: "Finans terimleri sözlüğü",
    description: (
      <span className="text-sm w-full">
        Finans dünyası, özellikle yeni başlayanlar için karmaşık gelebilecek
        terimler ve bazı yabancı kelimeler içermektedir.
      </span>
    ),
    header: (
      <div className="w-full h-full flex rounded-md overflow-hidden">
        <img
          alt=""
          className="h-full w-auto"
          src="https://valu.com.tr/uploads/blogs/blog-6662cf2c5b936.webp"
        />
      </div>
    ),
    className: "md:col-span-1",
    icon: (
      <div className="flex gap-2">
        <Badge variant="secondary">Yatırım</Badge>
      </div>
    ),
  },
  {
    title: "Küçük Yatırımcı Neye Yatırım Yapmalı?",
    description: (
      <span className="text-sm w-full">
        Küçük yatırımcı, sınırlı yatırım sermayesine sahip olan bireyleri
        tanımlamak amacıyla kullanılan bir terimdir.
      </span>
    ),
    header: (
      <div className="w-full h-full flex rounded-md overflow-hidden">
        <img
          alt=""
          className="h-full w-auto"
          src="https://valu.com.tr/uploads/blogs/blog-6662cbc4f1975.webp"
        />
      </div>
    ),
    className: "md:col-span-1",
    icon: (
      <div className="flex gap-2">
        <Badge variant="secondary">Yatırım</Badge>
      </div>
    ),
  },
  {
    title: "Temettü Nedir? Temettü Nasıl Hesaplanır?",
    description: (
      <span className="text-sm w-full">
        Yatırım dünyasına yeni adım atan herkesin sıklıkla karşılaştığı
        terimlerden biri olan temettü, yatırım kararlarınızı verirken dikkate
        almanız gereken oldukça önemli bir kavramdır.
      </span>
    ),
    header: (
      <div className="w-full h-full flex rounded-md overflow-hidden">
        <img
          alt=""
          className="h-full w-auto"
          src="https://valu.com.tr/uploads/blogs/blog-665d874515335.webp"
        />
      </div>
    ),
    className: "md:col-span-1",
    icon: (
      <div className="flex gap-2">
        <Badge variant="secondary">Yatırım</Badge>
      </div>
    ),
  },
  {
    title: "Pasif Gelir Nedir? Nasıl Elde Edilir?",
    description: (
      <span className="text-sm w-full">
        Pasif gelir ne demek? Pasif gelir, zamanınızı daha özgür bir şekilde
        yönetmenizi ve finansal bağımsızlığınızı artırmanızı sağlayan, sürekli
        bir çaba gerektirmeyen gelir türüdür.
      </span>
    ),
    header: (
      <div className="w-full h-full flex rounded-md overflow-hidden">
        <img
          alt=""
          className="h-full w-auto"
          src="https://valu.com.tr/uploads/blogs/blog-6630fd88724bf.webp"
        />
      </div>
    ),
    className: "md:col-span-1",
    icon: (
      <div className="flex gap-2">
        <Badge variant="secondary">Yatırım</Badge>
      </div>
    ),
  },
  {
    title: "Kitle Fonlaması Nedir?",
    description: (
      <span className="text-sm w-full">
        Günümüzde, yenilikçi fikirlerin ve projelerin hayata geçirilmesi için
        gereken finansal desteğe ulaşmak her zaman kolay olmayabiliyor.
        Geleneksel finansman yöntemleri bazen yeterli esnekliği ve erişimi
        sunamazken, kitle fonlama, bu boşluğu dolduran modern ve dinamik bir
        alternatif olarak öne çıkıyor.
      </span>
    ),
    header: (
      <div className="w-full h-full flex rounded-md overflow-hidden">
        <img
          alt=""
          className="h-full w-auto"
          src="https://valu.com.tr/uploads/blogs/blog-6630fd6b43c03.webp"
        />
      </div>
    ),
    className: "md:col-span-1",
    icon: (
      <div className="flex gap-2">
        <Badge variant="secondary">Yatırım</Badge>
      </div>
    ),
  },
];

export default function Page({
  config,
  fundableProjects,
  projectsWillStartSoon,
  languageData,
  projectURL,
}: {
  config: any;
  fundableProjects: any;
  projectsWillStartSoon: any;
  languageData: any;
  projectURL: string;
}): JSX.Element {
  return (
    <div className="w-full bg-white p-0 ">
      <Hero config={config} variant="stripe" />
      <Brands brands={BrandList} />
      <div
        className="w-full h-[200px]"
        style={{
          backgroundImage: `url(${config.images.second})`,
        }}
      />
      <div className="container h-full my-20">
        <div className="text-3xl text-center font-bold mb-8">
          Yatırım Toplayan Projeler
        </div>
        <div className="flex flex-row flex-wrap gap-3 justify-center">
          {fundableProjects?.map((project: any) => (
            <ProjectCard
              ProjectStatusEnums={ProjectStatusEnums}
              actionText={languageData.InvestNow}
              key={project.id}
              languageData={languageData}
              project={project}
              projectURL={`${projectURL}/${project.id}`}
              showProgress
            />
          ))}
        </div>
      </div>
      <div className="container h-full my-20">
        <div className="text-3xl text-center font-bold mb-8">
          Yakında Yatırma Açılacak Projeler
        </div>
        <div className="flex flex-row flex-wrap gap-3 justify-center mb-5">
          {projectsWillStartSoon?.map((project: any) => (
            <ProjectCard
              ProjectStatusEnums={ProjectStatusEnums}
              actionText={languageData.InvestNow}
              key={project.id}
              languageData={languageData}
              project={project}
              projectURL={`${projectURL}/${project.id}`}
              showProgress
            />
          ))}
        </div>
      </div>
      <div className="bg-slate-50 w-full overflow-hidden">
        <div className="container grid md:grid-cols-2 justify-center gap-6">
          <div className="flex flex-col gap-6 justify-center h-full">
            <h1 className="text-2xl md:text-5xl text-center font-bold">
              <img alt="" className="m-auto" src={config.logo} />
              aracılığıyla girişim şirketlerinde hisse sahibi olabilirsiniz.
            </h1>
            <p className="text-l">
              Şirketlere yatırım yapmak hiç bu kadar kolay olmamıştı. Hemen
              başlayın, şirketlere destek olun, etki yaratın.
            </p>
            <div className="flex gap-2 justify-around">
              <Button variant="outline">Bilgi al</Button>
              <Button>Yatırım yap</Button>
            </div>
          </div>
          <div className="h-full">
            <img
              alt=""
              className="max-h-[500px]"
              src="https://kapilendo-public.imgix.net/files/undefined/40740ec4-1931-44c8-8b9b-e7bcc383f732_funded_projects_invesdor_EN.png?w=1028&auto=format,compress&fit=crop&crop=right&min-h=580"
            />
          </div>
        </div>
      </div>
      <h3 className="text-2xl md:text-5xl font-bold text-center w-full max-w-4xl mx-auto my-20 md:flex flex-col md:flex-row flex-wrap  items-center gap-0 hidden ">
        <img alt="" className="mr-4" src={config.logo} /> ile
        <FlipWords
          className="text-black min-w-[230px] text-center md:text-left"
          words={["yatırımcı", "girişimci"]}
        />{" "}
        olabilirsiniz.
      </h3>

      <div className="bg-slate-50 mt-20 grid justify-center relative pb-60">
        <h3 className="text-2xl md:text-5xl font-bold text-center mt-[-20px] uppercase absolute w-full z-10">
          {config.full} Blog
        </h3>
        <p className="w-full text-center mt-16 text-xl z-10">
          Gündeme ve fonlanan projelere dair bilgiler için Blog’u takip edin.
        </p>
        <BentoGrid className="container py-16 md:auto-rows-[20rem] px-0 z-10">
          {items.map((item, i) => (
            <BentoGridItem
              className={cn("[&>p:text-lg]", item.className)}
              description={item.description}
              header={item.header}
              icon={item.icon}
              key={i}
              title={item.title}
            />
          ))}
        </BentoGrid>
        <div className="flex absolute top-60 z-0 w-full opacity-10 grayscale hidden">
          <img alt="" className="w-full" src={config.images.footer} />
        </div>
      </div>
    </div>
  );
}
