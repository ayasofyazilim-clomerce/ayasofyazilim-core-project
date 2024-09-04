/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call -- TODO: we need to fix this*/
"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionLayoutNavbar } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { Edit } from "lucide-react";
import Link from "next/link";

export default function Form({ backerProfiles }: any) {
  return (
    <Card className="m-auto">
      <SectionLayoutNavbar
        activeSectionId="default"
        sections={[{ id: "default", name: "Yatırımcı Profillerim" }]}
      />
      <div className="flex flex-col bg-white">
        {backerProfiles?.map((i: any) => (
          <div
            className="flex flex-row items-center border px-5 py-3"
            key={i.backerId}
          >
            <div className="rounded-md border bg-gray-100 p-2">{i.icon}</div>
            <div className="ml-4">
              <div>{i.name}</div>
              <div className="text-muted-foreground text-sm">
                {i.legalStatusCode}
              </div>
            </div>
            <div className="ml-auto">
              <Button asChild variant="link">
                <Link href={`profile/${i.backerId}`} title={i.name}>
                  <Edit className="text-muted-foreground h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
