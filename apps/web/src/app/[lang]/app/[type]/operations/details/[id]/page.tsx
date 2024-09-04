"use client";
import Issueform from "@repo/ayasofyazilim-ui/molecules/issue-form";
import React from "react";
import { getIndexOfTagByFacturaId, tags } from "../data";

export default function Page({
  params,
}: {
  params: { id: string };
}): JSX.Element {
  const index = getIndexOfTagByFacturaId(params.id);
  return index > -1 ? <Issueform tag={tags[index]} /> : <div>Not Found</div>;
}
