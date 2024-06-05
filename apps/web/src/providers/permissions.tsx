"use client";

import { ReactNode, createContext, useContext, useState } from "react";

const permissionContext = createContext<any>({});

export const usePermission = () => {
    return useContext(permissionContext);
};

export const PermissionProvider = ({ children }: { children: ReactNode }) => {
    const [permission, setPermission] = useState<string | Object>();

    return (
        <permissionContext.Provider value={{ permission, setPermission }}>
            {children}
        </permissionContext.Provider>
    );
};
