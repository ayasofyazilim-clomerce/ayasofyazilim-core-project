"use client";

import { ReactNode, createContext, useContext, useState } from "react";

const configurationContext = createContext<any>({});

export const useConfig = () => {
    return useContext(configurationContext);
};

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
    const [config, setConfig] = useState<string | undefined>("test");

    return (
        <configurationContext.Provider value={{ config, setConfig }}>
            {children}
        </configurationContext.Provider>
    );
};
