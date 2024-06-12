import { Button } from "@/components/ui/button";
import { Mouse } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <div className="h-screen bg-green-200 relative bg-[url('https://kapilendo-public.imgix.net/files/content/header/406d031c-f316-4132-83ba-dc3d5553c5cb_hero-dna-fullscreen-2.jpg')] bg-cover bg-center relative">
      <div className="container h-full flex items-center justify-center bg-gradient-to-r from-transparent via-white to-transparent">
        <div className="flex flex-col items-center text-center justify-center max-w-xl mb-8 gap-4">
          <h1 className="text-5xl font-bold text-primary">
            Together we fund the future.
          </h1>
          <p className="text-2xl">
            Join us in investing for financial returns and a sustainable
            tomorrow.
          </p>
          <div className="space-x-2">
            <Button variant={"outline"}>How to Invest</Button>
            <Button variant="default" asChild>
              <Link href="/projects">Invest Now</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute left-0 bottom-40 w-full flex align-center justify-center">
        <Mouse className="animate-bounce bg-black/10 w-10 h-10 rounded-full p-2 flex text-white" />
      </div>
    </div>
  );
}
