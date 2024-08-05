"use server";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import { Building2Icon, User } from "lucide-react";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ayasofyazilim-ui/molecules/dropdown-menu";
import { getBackers, getBackersIndividuals } from "./actions";
import Form from "./form";

async function getBackerProfiles() {
  const _backerProfiles: {
    name: string | null | undefined;
    legalStatusCode: string | null | undefined;
    taxpayerId: string | null | undefined;
    backerId: string | null | undefined;
    icon: JSX.Element;
  }[] = [];
  const backersCompanies = await getBackers();
  const backersIndividual = await getBackersIndividuals();

  backersIndividual.forEach((backer) => {
    _backerProfiles.push({
      ...backer,
      icon: <User className="w-5 h-5" />,
    });
  });

  backersCompanies.forEach((backer) => {
    _backerProfiles.push({
      ...backer,
      icon: <Building2Icon className="w-5 h-5" />,
    });
  });
  return _backerProfiles;
}

export default async function Page() {
  noStore();
  const backerProfiles = await getBackerProfiles();
  return (
    <>
      <PageHeader
        description="Yatırımcı profillerinizi buradan oluşturabilir veya görüntüleyebilirsiniz."
        title="Yatırımcı Profillerim"
      />

      <div className="flex justify-end flex-row mb-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Yeni Profil</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Yeni Profil</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="profile/new-individual">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Bireysel Profil</span>
                </DropdownMenuItem>
              </Link>
              <Link href="profile/new-organization">
                <DropdownMenuItem>
                  <Building2Icon className="mr-2 h-4 w-4" />
                  <span>Kurumsal Profil</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Form backerProfiles={backerProfiles} />
    </>
  );
}
