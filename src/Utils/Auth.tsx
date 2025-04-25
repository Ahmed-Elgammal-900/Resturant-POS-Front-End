import { createContext, useContext, useEffect, useState } from "react";
type AuthContextType = { isAuth: boolean, user: string, handleAuth: any };
const AuthContext = createContext<AuthContextType>({isAuth: false, user: "", handleAuth:() => Promise<void>});

export const useAuth = () => useContext<AuthContextType>(AuthContext);

export const Auth = ({ children }: any) => {
  const [isAuth, setAuth] = useState<boolean>(false);
  const [user, setUser] = useState<string>("chief");
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      const { isAuth, user } = JSON.parse(data);
      setAuth(isAuth);
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAuth = async (e: any, formInfo: object) => {
    e.preventDefault();

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInfo),
      });

      const {user} = await response.json();
      setAuth(true)
      setUser(user)
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{ isAuth: isAuth, user: user, handleAuth: handleAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
