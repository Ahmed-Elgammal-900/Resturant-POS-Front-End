import Kitchen from "../Kitchen/Kitchen";
import ManagerSystem from "../ManagerSystem/ManagerDashboard";
import DashboardPage from "../ProductsDashboard/DashboardPage";
import { Auth, useAuth } from "./Auth";
import { Navigate } from "react-router-dom";
import { Cart } from "./Cart";
const ProtectedRoute = () => {
  const { isAuth, user } = useAuth();
  if (!isAuth) return <Navigate to="/Login/SignIn" replace />;
  if (user === "cashier")
    return (
      <Cart>
        <DashboardPage />
      </Cart>
    );
  if (user === "manager") return <ManagerSystem />;
  if (user === "chief")
    return (
      <Auth>
        <Kitchen />
      </Auth>
    );
};

export default ProtectedRoute;
