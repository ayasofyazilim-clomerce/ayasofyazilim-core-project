"use client";

import { createContext, useContext } from "react";

interface IApplicationProvider {
  appName: string;
  children: JSX.Element;
}
interface IApplicationContext {
  appName: string;
}

export const ApplicationContext = createContext<IApplicationContext>({
  appName: "UNIREFUND",
});

export const useApplication = () => {
  return useContext(ApplicationContext);
};

export const ApplicationProvider = ({
  children,
  appName,
}: IApplicationProvider) => {
  return (
    <ApplicationContext.Provider value={{ appName }}>
      {children}
    </ApplicationContext.Provider>
  );
};
