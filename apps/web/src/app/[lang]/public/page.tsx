import CardList from "@repo/ayasofyazilim-ui/organisms/card-list";
import { getBaseLink } from "src/utils";
import { cityConfigs } from "./config";

export default function Page() {
  const cities = Object.keys(cityConfigs).map((city) => {
    return {
      title: "",
      description: "",
      content: cityConfigs[city].name,
      footer: "",
      cta: {
        text: "İlerleyin",
        href: getBaseLink(`public/${city}`, true),
      },
    };
  });
  const cards = cities;
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <CardList cards={cards} />
    </div>
  );
}
