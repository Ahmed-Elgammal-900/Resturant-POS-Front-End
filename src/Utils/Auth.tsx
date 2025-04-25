import { createContext, useContext, useEffect, useState } from "react";
type AuthContextType = {
  isAuth: boolean;
  user: string;
  handleAuth: any;
  massege: string;
  setMassege: any;
};
const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  user: "",
  handleAuth: () => Promise<void>,
  massege: "",
  setMassege: () => {},
});

export const useAuth = () => useContext<AuthContextType>(AuthContext);

export const Auth = ({ children }: any) => {
  const [isAuth, setAuth] = useState<boolean>(false);
  const [user, setUser] = useState<string>("chief");
  const [massege, setMassege] = useState<string>("");
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
      const { isAuth, user, massege } = JSON.parse(data);
      setAuth(isAuth);
      setUser(user);
      setMassege(massege);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAuth = async (
    e: any,
    formInfo: { email: string; password: "string" }
  ) => {
    e.preventDefault();
    const validaEmail = formInfo.email.match(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    );
    if (!validaEmail || !formInfo.password) {
      setMassege("invalid Email or Password");
      return
    }else{
      setMassege('')
    }
    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInfo),
      });

      const { user } = await response.json();
      setAuth(true);
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        user: user,
        handleAuth: handleAuth,
        massege: massege,
        setMassege: setMassege,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
