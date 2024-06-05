import { Button } from "@/components/ui/button";
import { Volo_Abp_Account_ProfileDto } from "@ayasofyazilim/saas/AccountService";
import { signOutServer } from "auth-action";
import LanguageSelector from "components/language-selector";
import Link from "next/link";
import { ResourcesDto } from "src/utils";

export default function Header({
  menuAlign,
  user,
  resources,
}: {
  menuAlign?: "start" | "center" | "end";
  user: Volo_Abp_Account_ProfileDto | undefined;
  resources: ResourcesDto;
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
        <LanguageSelector menuAlign={menuAlign} />
      </div>
    </div>
  );
}
