"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

const PermissionContext = createContext<{
  permission?: Record<number, Record<string, string>> | undefined;
  setPermission?: Dispatch<
    SetStateAction<Record<number, Record<string, string>> | undefined>
  >;
}>({});

export const usePermission = () => {
  return useContext(PermissionContext);
};

export function PermissionProvider({ children }: { children: ReactNode }) {
  const [permission, setPermission] =
    useState<Record<number, Record<string, string>>>();
  return (
    <PermissionContext.Provider value={{ permission, setPermission }}>
      {children}
    </PermissionContext.Provider>
  );
}
