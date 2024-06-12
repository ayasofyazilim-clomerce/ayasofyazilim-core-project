import { Button } from "@repo/ayasofyazilim-ui/atoms/button";
import Link from "next/link";
import LanguageSelector from "../language-selector";

export default function Header({
  user,
  resources,
  signOutServer,
  languageSelector,
}: {
  languageSelector: JSX.Element;
  user: any | undefined;
  resources: any;
  signOutServer: any;
}): JSX.Element {
  const resourcesMap = {
    home: resources?.AbpForDeploy?.texts?.["Menu:Home"] || "Home",
    login: resources?.AbpForDeploy?.texts?.["Menu:Login"] || "Login",
    logout: resources?.AbpForDeploy?.texts?.["Menu:Logout"] || "Logout",
    register: resources?.AbpForDeploy?.texts?.["Menu:Register"] || "Register",
  };
  return (
    <div className="bg-gray-100 p-1 w-full">
      <div className="container flex justify-end gap-4">
        {user ? (
          <>
            <Button variant={"link"} className="p-0" asChild>
              <Link href="/">{resourcesMap.home}</Link>
            </Button>
            <form action={signOutServer}>
              <Button variant={"link"} className="p-0">
                {resourcesMap.logout}
              </Button>
            </form>
          </>
        ) : (
          <>
            <Button variant={"link"} className="p-0" asChild>
              <Link href="/register">{resourcesMap.register}</Link>
            </Button>
            <Button variant={"link"} className="p-0" asChild>
              <Link href="/login">{resourcesMap.login}</Link>
            </Button>
          </>
        )}
        {languageSelector}
      </div>
    </div>
  );
}
