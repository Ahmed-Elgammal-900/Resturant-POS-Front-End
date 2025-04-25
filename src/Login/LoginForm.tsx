import { Navigate, Outlet, useLocation } from "react-router-dom";
import GraphicalUI from "./GraphicalUI";
import { useAuth } from "../Utils/Auth";
import "../css/Login.css";

const LoginForm = () => {
  const { isAuth } = useAuth();
  const { pathname } = useLocation();

  if (isAuth) return <Navigate to="/dashboard" replace />;
  if (pathname === "/Login") return <Navigate to="SignIn" />;
  return (
    <div className="Layout">
      <GraphicalUI />
      <Outlet />
    </div>
  );
};

export default LoginForm;
