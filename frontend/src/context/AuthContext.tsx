import { createContext, useEffect, useState } from "react";

interface AuthContextProviderProps {
  children: JSX.Element;
}

interface AuthTokenType {
  access: string;
  refresh: string;
}

interface AuthContextType {
  token: AuthTokenType | null;
  setAuthToken: (auth: AuthTokenType | null) => void;
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
//   logout: () => {},

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [token, setToken] = useState(() => {
    return JSON.parse(localStorage.getItem("token") || "null");
  });

  const setAuthToken = (auth: AuthTokenType | null) => {
    setToken(auth);
  };

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
}
