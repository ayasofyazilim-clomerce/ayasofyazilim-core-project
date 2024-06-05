"use client";
import { SessionProvider } from "next-auth/react";
import { getBaseLink } from "src/utils";

export default function AuthSession({ children }: { children: JSX.Element }) {
  return (
    <SessionProvider basePath={getBaseLink("api/auth", false)}>
      {children}
    </SessionProvider>
  );
}
