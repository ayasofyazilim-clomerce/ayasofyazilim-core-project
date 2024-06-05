"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { getBaseLink } from "src/utils";

export default function Page() {
  const session = useSession();

  useEffect(() => {
    async function getSession() {
      if (session.status !== "authenticated") return;
      let fetchConfig = await fetch(getBaseLink("api/config"));
      let config = await fetchConfig.json();
    }
    if (!!session.data) getSession();
  }, [session.data]);

  return <div className="flex-1">profil</div>;
}
