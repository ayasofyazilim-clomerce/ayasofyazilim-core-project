import Button from "@repo/ayasofyazilim-ui/molecules/button";
import { ICardTableProps } from "@repo/ayasofyazilim-ui/molecules/card-table";
import Progress from "@repo/ayasofyazilim-ui/molecules/progress";
import { IDetailsCardProps } from "@repo/ayasofyazilim-ui/organisms/details-card";
import { ContentListProps } from "components/content";
import { InvestProps } from "components/invest";
import { Star } from "lucide-react";
import { Link } from "next-view-transitions";
import { useLocale } from "src/providers/locale";

export const currencyFormatter = new Intl.NumberFormat("tr", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 0,
});
export const numberFormatter = new Intl.NumberFormat("tr", {
  maximumFractionDigits: 0,
});

export function tableProps(data: any) {
  return [
    {
      title: "Proje Tipi",
      value:
        data.fundCollectionType === "SHRE" ? "Paya Dayalı" : "Borca Dayalı",
    },
    { title: "Pay Arz Oranı", value: "%8" },
    {
      title: "Başlangıç Tarihi",
      value: new Date(data.projectStartDate).toLocaleDateString(),
    },
    {
      title: "Bitiş Tarihi",
      value: new Date(data.projectEndDate).toLocaleDateString(),
    },
  ];
}
export function tableProps2Col(data: any) {
  return [
    [
      {
        title: currencyFormatter
          .format(data.fundNominalAmount)
          .replace(/\s/g, " "),
        value: "Gerçekleşen Yatırım",
      },
      {
        title: currencyFormatter
          .format(data.fundableAmount)
          .replace(/\s/g, " "),
        value: "Hedeflenen Yatırım",
      },
    ],
  ] as [ICardTableProps, ICardTableProps][];
}
export const images = {
  "806816b3-122c-2f67-95d1-3a125f4bee0f":
    "https://kapilendo-public.imgix.net/files/projects/bamboologic/8e0aa153-e311-47f9-9563-1aa44c05a3fe_01_Project-Header-1920x1080px.png?auto=compress&auto=format&maxdpr=3&w=750&fit=crop&dpr=1.5",
  "9c169fdc-f218-ad06-e277-3a125f8b51f7":
    "https://kapilendo-public.imgix.net/files/projects/riverrecycle-oy/aa36f9b8-c668-4ab3-959a-79cbf2933be4_RR-Project-Header-1920x1080px-2.png?auto=compress&auto=format&maxdpr=3&w=750&fit=crop&dpr=1.5",
  default: "https://templates.tiptap.dev/placeholder-image.jpg",
};
export const defaultDetailsCardProps: IDetailsCardProps = {
  IAboutCardProps: {
    link: "#",
    avatar:
      "https://kapilendo-public.imgix.net/files/projects/bamboologic/dc20bb52-80e4-4df8-9c2f-b9b18fad6d4c_bambulogiceuropebv_logo.jfif?auto=compress&auto=format&maxdpr=3&w=276&fit=crop&dpr=1.5",
    title: "Clevetura Devices LLC",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  link: "projects/1",
  title: "CLVX 1 - Keyboard Gives More",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  tags: ["Teknoloji", "Yazılım"],
  image:
    "https://kapilendo-public.imgix.net/files/projects/bamboologic/dc20bb52-80e4-4df8-9c2f-b9b18fad6d4c_bambulogiceuropebv_logo.jfif?auto=compress&auto=format&maxdpr=3&w=276&fit=crop&dpr=1.5",
  locale: "tr",
  tableProps: [
    {
      title: "Gerçekleşen Yatırım",
      value: currencyFormatter.format(10000000).replace(/\s/g, " "),
    },
    {
      title: "Hedeflenen Yatırım",
      value: currencyFormatter.format(10000000).replace(/\s/g, " "),
    },
    {
      title: "Proje Tipi",
      value: "Paya Dayalı",
    },
    {
      title: "Pay Arz Oranı",
      value: "%8",
    },
    {
      title: "Başlangıç Tarihi",
      value: new Date("01.02.2024").toLocaleDateString(),
    },
    {
      title: "Bitiş Tarihi",
      value: new Date("01.03.2024").toLocaleDateString(),
    },
  ],
  tableProps2Col: [
    [
      {
        title: currencyFormatter.format(10000000).replace(/\s/g, " "),
        value: "Gerçekleşen Yatırım",
      },
      {
        title: currencyFormatter.format(10000000).replace(/\s/g, " "),
        value: "Hedeflenen Yatırım",
      },
    ],
  ],
  cardTagTitle: "Başarılı",
  cardTagVariant: "primary",
  BeforeCardContentComponent: (
    <Progress value={20} containerClassName="h-3" variant="primary" />
  ),
  ActionComponent: (
    <Button customVariant="primary">
      <Link className="sticky top-0" href="#invest">
        Yatırım yap
      </Link>
    </Button>
  ),
};
export const defaultDataForSectionLayout = [
  {
    id: "about-the-project-0",
    name: "About The Project",
    value: (
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel
        ultrices sapien. Maecenas lobortis elementum sapien, sed volutpat lacus.
        Vivamus vitae erat mi. Suspendisse vestibulum turpis libero. Donec
        facilisis quam in magna tempus, quis bibendum diam blandit. Nulla eget
        sem gravida, hendrerit tortor sed, laoreet tortor. Donec vitae nibh
        erat. Proin faucibus vulputate nunc, id feugiat justo volutpat quis.
        Aliquam erat volutpat.Aliquam faucibus, turpis in rhoncus tincidunt,
        quam nisi rutrum metus, ac gravida erat nulla suscipit elit. Donec
        vehicula dolor ut metus semper, et cursus dui eleifend. Duis vitae sem
        condimentum, placerat turpis eget, mollis quam. Morbi convallis sodales
        leo, a porta leo sagittis in. Curabitur dignissim vehicula faucibus. Nam
        fringilla velit a lectus accumsan laoreet. Donec sit amet porttitor
        nibh.Donec pretium placerat ipsum, eget tempor tellus. In pulvinar id
        lacus sit amet molestie. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Suspendisse bibendum orci et erat volutpat facilisis.
        Cras fringilla elementum ipsum sed tristique. Donec elementum libero a
        purus laoreet, viverra rutrum dolor pellentesque. Duis varius et neque
        sit amet feugiat. Vivamus ac ante ligula. Phasellus suscipit mollis elit
        et aliquet. Curabitur elit velit, gravida non odio eu, elementum
        facilisis purus. Vestibulum accumsan risus eget neque blandit sodales.
        Praesent velit urna, faucibus id lacus non, gravida finibus sapien.
        Curabitur pretium orci vitae commodo convallis. Sed non lacus bibendum,
        gravida neque sit amet, scelerisque ante. Cras velit massa, venenatis eu
        tortor et, lacinia consequat elit.Praesent sit amet quam et dolor
        dapibus rhoncus. Ut vel purus nec velit gravida dapibus. Vestibulum ante
        ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
        Donec viverra velit odio, vel efficitur lorem pharetra vel. Mauris
        lacinia libero risus, posuere vehicula dui venenatis eget. Quisque ut
        pulvinar ligula, id dignissim ipsum. Vivamus arcu erat, consectetur id
        laoreet sit amet, pharetra eget ligula. Morbi fringilla orci et ante
        molestie, quis fermentum turpis posuere. Nam hendrerit eleifend dolor ut
        tempor. Integer dictum faucibus elementum. Praesent tristique lorem a
        massa dignissim, vitae rutrum nunc porta. Integer elementum lacus ac
        porttitor posuere. Donec auctor in massa et gravida. Phasellus vitae
        vehicula nibh. Ut elit mauris, volutpat hendrerit ex at, maximus feugiat
        velit.Phasellus ultrices, lorem et malesuada lobortis, lacus erat
        iaculis nunc, eu ultricies eros urna vitae lorem. Pellentesque tristique
        malesuada lobortis. Nam eget consequat risus, sed viverra quam.
        Curabitur rutrum nibh nec magna eleifend, ut pellentesque tellus luctus.
        Donec porta eget felis ac faucibus. Fusce vel laoreet mi. Integer
        lacinia vehicula lorem. Sed nec efficitur dui. Quisque vehicula
        tincidunt tempus. Praesent elementum enim euismod ex gravida feugiat.
        Proin ullamcorper eu neque eu vulputate. Praesent hendrerit posuere
        eros, vitae porta est dictum condimentum.
      </>
    ),
  },
  {
    id: "documents-1",
    name: "Documents",
    value: (
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel
        ultrices sapien. Maecenas lobortis elementum sapien, sed volutpat lacus.
        Vivamus vitae erat mi. Suspendisse vestibulum turpis libero. Donec
        facilisis quam in magna tempus, quis bibendum diam blandit. Nulla eget
        sem gravida, hendrerit tortor sed, laoreet tortor. Donec vitae nibh
        erat. Proin faucibus vulputate nunc, id feugiat justo volutpat quis.
        Aliquam erat volutpat.Aliquam faucibus, turpis in rhoncus tincidunt,
        quam nisi rutrum metus, ac gravida erat nulla suscipit elit. Donec
        vehicula dolor ut metus semper, et cursus dui eleifend. Duis vitae sem
        condimentum, placerat turpis eget, mollis quam. Morbi convallis sodales
        leo, a porta leo sagittis in. Curabitur dignissim vehicula faucibus. Nam
        fringilla velit a lectus accumsan laoreet. Donec sit amet porttitor
        nibh.Donec pretium placerat ipsum, eget tempor tellus. In pulvinar id
        lacus sit amet molestie. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Suspendisse bibendum orci et erat volutpat facilisis.
        Cras fringilla elementum ipsum sed tristique. Donec elementum libero a
        purus laoreet, viverra rutrum dolor pellentesque. Duis varius et neque
        sit amet feugiat. Vivamus ac ante ligula. Phasellus suscipit mollis elit
        et aliquet. Curabitur elit velit, gravida non odio eu, elementum
        facilisis purus. Vestibulum accumsan risus eget neque blandit sodales.
        Praesent velit urna, faucibus id lacus non, gravida finibus sapien.
        Curabitur pretium orci vitae commodo convallis. Sed non lacus bibendum,
        gravida neque sit amet, scelerisque ante. Cras velit massa, venenatis eu
        tortor et, lacinia consequat elit.Praesent sit amet quam et dolor
        dapibus rhoncus. Ut vel purus nec velit gravida dapibus. Vestibulum ante
        ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
        Donec viverra velit odio, vel efficitur lorem pharetra vel. Mauris
        lacinia libero risus, posuere vehicula dui venenatis eget. Quisque ut
        pulvinar ligula, id dignissim ipsum. Vivamus arcu erat, consectetur id
        laoreet sit amet, pharetra eget ligula. Morbi fringilla orci et ante
        molestie, quis fermentum turpis posuere. Nam hendrerit eleifend dolor ut
        tempor. Integer dictum faucibus elementum. Praesent tristique lorem a
        massa dignissim, vitae rutrum nunc porta. Integer elementum lacus ac
        porttitor posuere. Donec auctor in massa et gravida. Phasellus vitae
        vehicula nibh. Ut elit mauris, volutpat hendrerit ex at, maximus feugiat
        velit.Phasellus ultrices, lorem et malesuada lobortis, lacus erat
        iaculis nunc, eu ultricies eros urna vitae lorem. Pellentesque tristique
        malesuada lobortis. Nam eget consequat risus, sed viverra quam.
        Curabitur rutrum nibh nec magna eleifend, ut pellentesque tellus luctus.
        Donec porta eget felis ac faucibus. Fusce vel laoreet mi. Integer
        lacinia vehicula lorem. Sed nec efficitur dui. Quisque vehicula
        tincidunt tempus. Praesent elementum enim euismod ex gravida feugiat.
        Proin ullamcorper eu neque eu vulputate. Praesent hendrerit posuere
        eros, vitae porta est dictum condimentum.
      </>
    ),
  },
  {
    id: "team-2",
    name: "Team",
    value: (
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel
        ultrices sapien. Maecenas lobortis elementum sapien, sed volutpat lacus.
        Vivamus vitae erat mi. Suspendisse vestibulum turpis libero. Donec
        facilisis quam in magna tempus, quis bibendum diam blandit. Nulla eget
        sem gravida, hendrerit tortor sed, laoreet tortor. Donec vitae nibh
        erat. Proin faucibus vulputate nunc, id feugiat justo volutpat quis.
        Aliquam erat volutpat.Aliquam faucibus, turpis in rhoncus tincidunt,
        quam nisi rutrum metus, ac gravida erat nulla suscipit elit. Donec
        vehicula dolor ut metus semper, et cursus dui eleifend. Duis vitae sem
        condimentum, placerat turpis eget, mollis quam. Morbi convallis sodales
        leo, a porta leo sagittis in. Curabitur dignissim vehicula faucibus. Nam
        fringilla velit a lectus accumsan laoreet. Donec sit amet porttitor
        nibh.Donec pretium placerat ipsum, eget tempor tellus. In pulvinar id
        lacus sit amet molestie. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Suspendisse bibendum orci et erat volutpat facilisis.
        Cras fringilla elementum ipsum sed tristique. Donec elementum libero a
        purus laoreet, viverra rutrum dolor pellentesque. Duis varius et neque
        sit amet feugiat. Vivamus ac ante ligula. Phasellus suscipit mollis elit
        et aliquet. Curabitur elit velit, gravida non odio eu, elementum
        facilisis purus. Vestibulum accumsan risus eget neque blandit sodales.
        Praesent velit urna, faucibus id lacus non, gravida finibus sapien.
        Curabitur pretium orci vitae commodo convallis. Sed non lacus bibendum,
        gravida neque sit amet, scelerisque ante. Cras velit massa, venenatis eu
        tortor et, lacinia consequat elit.Praesent sit amet quam et dolor
        dapibus rhoncus. Ut vel purus nec velit gravida dapibus. Vestibulum ante
        ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
        Donec viverra velit odio, vel efficitur lorem pharetra vel. Mauris
        lacinia libero risus, posuere vehicula dui venenatis eget. Quisque ut
        pulvinar ligula, id dignissim ipsum. Vivamus arcu erat, consectetur id
        laoreet sit amet, pharetra eget ligula. Morbi fringilla orci et ante
        molestie, quis fermentum turpis posuere. Nam hendrerit eleifend dolor ut
        tempor. Integer dictum faucibus elementum. Praesent tristique lorem a
        massa dignissim, vitae rutrum nunc porta. Integer elementum lacus ac
        porttitor posuere. Donec auctor in massa et gravida. Phasellus vitae
        vehicula nibh. Ut elit mauris, volutpat hendrerit ex at, maximus feugiat
        velit.Phasellus ultrices, lorem et malesuada lobortis, lacus erat
        iaculis nunc, eu ultricies eros urna vitae lorem. Pellentesque tristique
        malesuada lobortis. Nam eget consequat risus, sed viverra quam.
        Curabitur rutrum nibh nec magna eleifend, ut pellentesque tellus luctus.
        Donec porta eget felis ac faucibus. Fusce vel laoreet mi. Integer
        lacinia vehicula lorem. Sed nec efficitur dui. Quisque vehicula
        tincidunt tempus. Praesent elementum enim euismod ex gravida feugiat.
        Proin ullamcorper eu neque eu vulputate. Praesent hendrerit posuere
        eros, vitae porta est dictum condimentum.
      </>
    ),
  },
];

export const cardProps: IDetailsCardProps = {
  IAboutCardProps: {
    link: "#",
    avatar:
      "https://i.kickstarter.com/assets/043/950/483/f7c5bac8005024eea6c3ce6eaf65bb15_original.jpg?anim=false&fit=crop&height=80&origin=ugc&q=92&width=80&sig=IUCq8Z9OX16OY%2BmX17njzYURwPLYdY1ZcjVOuL%2FJfwc%3D",
    title: "Clevetura Devices LLC",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  link: "projects/1",
  title: "CLVX 1 - Keyboard Gives More",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  tags: ["Teknoloji", "Yazılım"],
  image:
    "https://i.kickstarter.com/assets/044/243/111/620ee2c08af65e9646d6cfd9dbe55868_original.png?anim=false&fit=crop&gravity=faces&height=315&origin=ugc&q=92&width=560&sig=EXsDXlcpA3rTqgOLDiduLcetM6QIEzSCQh19YMy8nl4%3D",
  locale: "tr",
  tableProps: [
    { title: "Proje Tipi", value: "Paya Dayalı" },
    { title: "Pay Arz Oranı", value: "%8" },
    {
      title: "Başlangıç Tarihi",
      value: new Date("01.02.2024").toLocaleDateString(),
    },
    {
      title: "Bitiş Tarihi",
      value: new Date("01.03.2024").toLocaleDateString(),
    },
  ],
  tableProps2Col: [
    [
      {
        title: currencyFormatter.format(10000000).replace(/\s/g, " "),
        value: "Gerçekleşen Yatırım",
      },
      {
        title: currencyFormatter.format(10000000).replace(/\s/g, " "),
        value: "Hedeflenen Yatırım",
      },
    ],
  ],
  cardTagTitle: "Başarılı",
  cardTagVariant: "success",
  BeforeCardContentComponent: (
    <Progress value={20} containerClassName="h-3" className={`bg-green-300`} />
  ),
};

export const defaultContentProps: ContentListProps = {
  title: "Why to invest",
  list: [
    {
      icon: (
        <Star className="text-green-500 w-full h-full border border-green-500 p-2 rounded-full" />
      ),
      paragraph:
        "A “fast-growing” commodity: On a global level, Europe is the largest importer of bamboo and the second largest processor of bamboo after China. Bamboo is present in almost every household and used in nearly every sector. The demand for EU grown bamboo is rising fast. Current demand for our product exceeds supply 300 to 500 times. But we lack locally and sustainably grown bamboo in Europe.",
    },
    {
      icon: (
        <Star className="text-green-500 w-full h-full border border-green-500 p-2 rounded-full" />
      ),
      paragraph: `
Invest in strong assets & growth: Invest in the scale-up of a leading company in the European bamboo sector with a strong asset-base and growth forecasts. Sales have increased by 300% since 2021. An EBITDA-growth of 50% p.a. is expected the next years. Ride along on our growth story with a good risk/reward ratio: 8% annual return, backed by 100% collateral.`,
    },
    {
      icon: (
        <Star className="text-green-500 w-full h-full border border-green-500 p-2 rounded-full" />
      ),
      paragraph: `

Experienced team with world renown bamboo experts: The management team was involved in over 25,000 hectares of bamboo fields worldwide since the 1980s and laid the foundation for bamboo farming in Europe in 1996 with the Bamboo for Europe programme subsidised by the E.U.`,
    },
  ],
};

export const defaultFullpageDetailsCardProps: IDetailsCardProps = {
  IAboutCardProps: {
    link: "#",
    avatar:
      "https://kapilendo-public.imgix.net/files/projects/bamboologic/dc20bb52-80e4-4df8-9c2f-b9b18fad6d4c_bambulogiceuropebv_logo.jfif?auto=compress&auto=format&maxdpr=3&w=276&fit=crop&dpr=1.5",
    title: "Clevetura Devices LLC",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  link: "projects/1",
  title: "CLVX 1 - Keyboard Gives More",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  tags: ["Teknoloji", "Yazılım"],
  image:
    "https://kapilendo-public.imgix.net/files/projects/bamboologic/dc20bb52-80e4-4df8-9c2f-b9b18fad6d4c_bambulogiceuropebv_logo.jfif?auto=compress&auto=format&maxdpr=3&w=276&fit=crop&dpr=1.5",
  locale: "tr",
  tableProps: [
    {
      title: "Hedeflenen Yatırım",
      value: currencyFormatter.format(10000000).replace(/\s/g, " "),
      containerClassName: "px-1",
    },
    {
      title: "Proje Tipi",
      value: "Paya Dayalı",
      containerClassName: "px-1",
    },
    {
      title: "Pay Arz Oranı",
      value: "%8",
      containerClassName: "px-1",
    },
    {
      title: "Başlangıç Tarihi",
      value: new Date("01.02.2024").toLocaleDateString(),
      containerClassName: "px-1",
    },
    {
      title: "Bitiş Tarihi",
      value: new Date("01.03.2024").toLocaleDateString(),
      containerClassName: "px-1",
    },
  ],
  cardTagTitle: "Başarılı",
  cardTagVariant: "primary",
  BeforeCardContentComponent: (
    <div className="flex flex-col gap-1 mb-3">
      <div className="text-sm flex gap-0 text-muted-foreground">
        Gerçekleşen Yatırım
      </div>
      <div className="text-2xl font-semibold flex gap-0 text-cyan-500">
        $10.000.000
      </div>
      <Progress
        value={20}
        containerClassName="h-2 bg-gray-100"
        variant="primary"
      />
    </div>
  ),
  ActionComponent: (
    <Button customVariant="primary" asChild>
      <Link className="sticky top-0" href="#invest">
        Yatırım yap
      </Link>
    </Button>
  ),
};
