"use client";
import { Button } from "@/components/ui/button";
import LanguageSelector from "components/language-selector";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { isServerSide } from "src/utils";

export default function Page(): JSX.Element {
  return (
    <div>
      <LanguageSelector />

      <Link href={"login"}>Login</Link>
      <Button onClick={async () => {
        console.log("Hello world");
        
        await signIn("credentials", { password: "123Aa!" , email: "admin", redirect:false} );
      }} >Hello world</Button>
    </div>
  );
}
