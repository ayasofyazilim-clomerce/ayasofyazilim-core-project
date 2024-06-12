"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useUser } from "src/providers/user";
import { getBaseLink } from "src/utils";

export default function Page() {
  const { user } = useUser();
  const session = useSession();

  useEffect(() => {
    //console.log("Effect ", session);
    async function getSession() {
      if (session.status !== "authenticated") return;
      //console.log("session from effect",session , " Token ", session.data?.accessToken)
      let fetchConfig = await fetch(getBaseLink("api/config"));
      let config = await fetchConfig.json();
      //console.log ("Config ", config.message);
    }
    //console.log(!!session.data)
    if (!!session.data) getSession();
  }, [session.data]);

  if (!user) return null;

  return (
    <div className="flex-1">
      general
      {Object.keys(user).map((key) => {
        if (key === "extraProperties") return;
        return (
          <div key={key}>
            {key}:{(user as any)[key]}
          </div>
        );
      })}
    </div>
  );
}
