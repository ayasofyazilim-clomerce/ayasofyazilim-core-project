// import { getBaseLink } from "src/utils";
// import { cityConfigs } from "./config";
import NoData from "./no-data";

export default function Page() {
  // const cities = Object.keys(cityConfigs).map((city) => {
  //   return {
  //     title: "",
  //     description: "",
  //     content: cityConfigs[city].name,
  //     footer: "",
  //     cta: {
  //       text: "İlerleyin",
  //       href: getBaseLink(`public/${city}`, true),
  //     },
  //   };
  // });
  // const cards = cities;
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <NoData />
      {/* <CardList cards={cards} /> */}
    </div>
  );
}
