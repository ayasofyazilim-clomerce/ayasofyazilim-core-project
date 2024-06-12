"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@repo/ayasofyazilim-ui/atoms/carousel";
import AutoScroll from "embla-carousel-auto-scroll";

export function Brands() {
  return (
    <div className="w-full flex justify-center bg-white">
      <Carousel
        className="w-full"
        plugins={[AutoScroll({ speed: 1 })]}
        opts={{
          align: "start",
          loop: true,
          dragFree: false,
          watchDrag: false,
        }}
      >
        <CarouselContent className="w-full flex mx-auto">
          {Array.from({ length: 20 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/12">
              <div className="p-1 flex aspect-square items-center justify-center p-6">
                <span className="text-3xl font-semibold">{index + 1}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
