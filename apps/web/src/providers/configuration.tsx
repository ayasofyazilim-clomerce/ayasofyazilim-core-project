"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

const configurationContext = createContext<any>({});

export const useConfig = () => {
  return useContext(configurationContext);
};

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<string | undefined>("test");

  return (
    <configurationContext.Provider value={{ config, setConfig }}>
      {children}
    </configurationContext.Provider>
  );
}
