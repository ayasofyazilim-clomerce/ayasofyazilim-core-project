"use client";

import { Button } from "@/components/ui/button";
import { Volo_Abp_Account_ProfileDto } from "@ayasofyazilim/saas/AccountService";
import { signOutServer } from "auth-action";
import LanguageSelector from "components/language-selector";
import Link from "next/link";

export default function Header({
  menuAlign,
  user,
}: {
  menuAlign?: "start" | "center" | "end";
  user: Volo_Abp_Account_ProfileDto | undefined;
}): JSX.Element {
  return (
    <div className="bg-gray-100 p-1 w-full">
      <div className="container flex justify-end gap-4">
        {user ? (
          <>
            <Button variant={"link"} className="p-0" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button
              variant={"link"}
              className="p-0"
              onClick={() => {
                signOutServer();
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button variant={"link"} className="p-0" asChild>
              <Link href="/register">Register</Link>
            </Button>
            <Button variant={"link"} className="p-0" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </>
        )}
        <LanguageSelector menuAlign={menuAlign} />
      </div>
    </div>
  );
}
