"use client";

import { createContext, useContext, useEffect, useState } from "react";
import _ from "lodash";

export interface IUser {
  username: string;
  email: string;
  categories: string[];
  isLoggedIn: boolean;
}

interface IUserContext {
  user: IUser;
  updateUser: (user: IUser) => void;
}

export const initialState = {
  user: { username: "", email: "", categories: [], isLoggedIn: false },
  updateUser: _.noop,
};

const userContext = createContext<IUserContext>(initialState);
userContext;

type Props = {
  children: React.ReactNode;
};

export const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser>(initialState.user);
  const updateUser = (user: IUser) => {
    setUser(user);
  };

  return (
    <userContext.Provider value={{ user, updateUser }}>
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(userContext);
};
