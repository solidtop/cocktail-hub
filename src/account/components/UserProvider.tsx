"use client";

import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { User } from "../types";
import { useRouter, usePathname } from "next/navigation";

type UserState = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<any>;
};

export const UserContext = createContext<UserState>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
});

type UserProviderProps = {
  children: ReactNode;
};

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/auth/user");
        const user = await res.json();
        setUser(user);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const payload = await res.json();
      if (!payload.error) {
        setUser(payload);
      }
      return payload;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    setUser(null);
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
        }),
      });
      const payload = await res.json();
      if (!payload._errors) {
        setUser(payload);
      }
      return payload;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/my-cocktails" && !user && !loading) {
    setTimeout(() => {
      router.push("/");
    }, 100);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
