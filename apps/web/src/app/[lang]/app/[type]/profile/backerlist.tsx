"use client";

import CardList from "@repo/ayasofyazilim-ui/organisms/card-list";
import { useState } from "react";
import {
  deleteBacker,
  getBackers,
  getBackersIndividuals,
  IBackersProps,
} from "./actions";

export function BackerList({
  backers,
  type,
}: {
  type: string;
  backers: IBackersProps[];
}) {
  const [backersState, setBackers] = useState<IBackersProps[]>(backers);
  const cards = backersState?.map((backer) => {
    return {
      title: backer.name || "",
      description: backer.taxpayerId || "",
      content: backer.legalStatusCode || "",
      footer: backer.customerNumber || "",
      onEdit: `profile/${backer.backerId}`,
      onDelete: async () => {
        await deleteBacker(backer.backerId || "");
        await updataBackers();
      },
    };
  });
  async function updataBackers() {
    let _backers: IBackersProps[] = [];
    if (type === "companies") {
      _backers = await getBackers();
    } else if (type === "individuals") {
      _backers = await getBackersIndividuals();
    }
    setBackers(_backers);
  }
  return (
    <div className="max-h-[350px]">
      <CardList
        cards={
          cards.length > 0
            ? cards
            : [
                {
                  title: "",
                  description: "",
                  content: "Create new backer",
                  footer: "",
                },
              ]
        }
      />
    </div>
  );
}
