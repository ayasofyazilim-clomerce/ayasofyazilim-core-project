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
            className="border flex flex-row px-5 py-3 items-center"
            key={i.backerId}
          >
            <div className="bg-gray-100 rounded-md border p-2">{i.icon}</div>
            <div className="ml-4">
              <div>{i.name}</div>
              <div className="text-sm text-muted-foreground">
                {i.legalStatusCode}
              </div>
            </div>
            <div className="ml-auto">
              <Button asChild variant="link">
                <Link href={`profile/${i.backerId}`} title={i.name}>
                  <Edit className="w-5 h-5 text-muted-foreground" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
