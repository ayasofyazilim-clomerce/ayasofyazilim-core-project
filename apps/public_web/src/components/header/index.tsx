"use client";

import { Button } from "@/components/ui/button";
import LanguageSelector from "components/language-selector";
import Link from "next/link";
import { logoutAction } from "src/app/actions";
import { useConfig } from "src/providers/configuration";
import { useUser } from "src/providers/user";

export default function Header({
  menuAlign,
}: {
  menuAlign?: "start" | "center" | "end";
}): JSX.Element {
  const { user, getUser } = useUser();
  const { config, setConfig } = useConfig();
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
                logoutAction();
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
