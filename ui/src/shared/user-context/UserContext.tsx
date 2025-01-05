"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  email: string | null;
  setEmail: (user: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response =
        await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/${process.env.NEXT_PUBLIC_ENVIRONMENT === 'local' ? process.env.NEXT_PUBLIC_DEFAULT_EMAIL : email}`);
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    };

    if (email || process.env.NEXT_PUBLIC_ENVIRONMENT === 'local') {
      fetchUser();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, email, setEmail }}>
      {children}
    </UserContext.Provider>
  );
}
