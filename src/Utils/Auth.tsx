import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isAuth: boolean;
  user: string;
  SignUp: any;
  SignIn: any;
  massege: string;
  setMassege: any;
  Logout: any;
  deleteAccount: any;
};
const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  user: "",
  SignUp: () => Promise<void>,
  SignIn: () => Promise<void>,
  massege: "",
  setMassege: () => {},
  Logout: () => {},
  deleteAccount: () => {},
});

export const useAuth = () => useContext<AuthContextType>(AuthContext);

export const Auth = ({ children }: any) => {
  const [isAuth, setAuth] = useState<boolean>(false);
  const [user, setUser] = useState<string>("");
  const [massege, setMassege] = useState<string>("");
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/status`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        const { user } = data;
        setAuth(true);
        setUser(user);
      }
    } catch (error: any) {
      console.error(error);
      setAuth(false);
      setUser("");
    }
  };

  const SignUp = async (
    e: any,
    formInfo: { email: string; password: string; user: string }
  ) => {
    e.preventDefault();
    const validaEmail = formInfo.email.match(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    );
    if (!validaEmail || !formInfo.password) {
      setMassege("invalid Email or Password");
      return;
    } else {
      setMassege("");
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/SignUp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formInfo),
          credentials: "include",
        }
      );

      const { user, isAuth } = await response.json();
      setAuth(isAuth);
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const SignIn = async (
    e: any,
    formInfo: { email: string; password: "string" }
  ) => {
    e.preventDefault();
    const validaEmail = formInfo.email.match(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    );
    if (!validaEmail || !formInfo.password) {
      setMassege("invalid Email or Password");
      return;
    } else {
      setMassege("");
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/SignIn`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formInfo),
          credentials: "include",
        }
      );

      const { user, isAuth } = await response.json();
      setAuth(isAuth);
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/auth/Logout`, {
        method: "POST",
        credentials: "include",
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAccount = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/auth`, {
        method: "DELETE",
        credentials: "include",
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        user: user,
        SignUp: SignUp,
        SignIn: SignIn,
        massege: massege,
        setMassege: setMassege,
        Logout: logout,
        deleteAccount: deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
