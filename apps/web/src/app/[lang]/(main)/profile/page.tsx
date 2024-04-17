"use client";
import { getAccountServiceClient } from "src/lib";
import { useUser } from "src/providers/user";

export default function Page() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="grid gap-6">
      general
      {Object.keys(user).map((key) => {
        if (key === "extraProperties") return;
        return (
          <div>
            {key}:{(user as any)[key]}
          </div>
        );
      })}
    </div>
  );
}
