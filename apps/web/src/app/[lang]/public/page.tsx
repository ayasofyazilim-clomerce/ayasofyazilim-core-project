import { Brands } from "@repo/ui/brands";
import { Hero } from "@repo/ui/hero";

export default function Page(): JSX.Element {
  return (
    <div className="w-full bg-red-200 p-0 h-[200vh]">
      <Hero />
      <Brands />
    </div>
  );
}
