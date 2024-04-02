"use server";

import { getAppClient } from "src/lib";

export default async function Page() {
  const client = getAppClient();
  const userData = await client.profile.getApiAccountMyProfile();

  if (!userData) {
    return <div>No data</div>;
  }

  return (
    <div className="bg-zinc-800 flex flex-auto flex-col justify-center items-start h-screen text-white text-xl">
      <h1 className="text-2xl">Selamun aleyküm!</h1>
      <br />
      {Object.keys(userData).map((key) => {
        if (key === "extraProperties") return;
        return (
          <div>
            {key}:{userData[key]}
          </div>
        );
      })}
    </div>
  );
}
