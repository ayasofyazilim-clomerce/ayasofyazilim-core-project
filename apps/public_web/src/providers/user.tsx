"use client";

import Spinner from "@repo/ayasofyazilim-ui/molecules/spinner";
import { Volo_Abp_Account_ProfileDto } from "@ayasofyazilim/saas/AccountService";
import { createContext, useContext, useEffect, useState } from "react";
import { getBaseLink } from "src/utils";

interface IUserContext {
  user: Volo_Abp_Account_ProfileDto | undefined;
  getUser: () => Promise<boolean>;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<Volo_Abp_Account_ProfileDto | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getUser() {
    try {
      setIsLoading(true);
      const fetchedUser = await fetch(
        getBaseLink("api/profile/myprofile", false)
      );
      const userData =
        (await fetchedUser.json()) as Volo_Abp_Account_ProfileDto;
      setUser(userData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
    return false;
  }

  return (
    <UserContext.Provider value={{ user, getUser }}>
      {isLoading && <Spinner size="lg" />}
      {children}
    </UserContext.Provider>
  );
};
