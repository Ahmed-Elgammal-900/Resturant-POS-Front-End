import Kitchen from "../Kitchen/Kitchen";
import ManagerSystem from "../ManagerSystem/ManagerDashboard";
import DashboardPage from "../ProductsDashboard/DashboardPage";
import { useAuth } from "./Auth";
import { Navigate } from "react-router-dom";
const ProtectedRoute = () => {
  const { isAuth, user } = useAuth();
  if (!isAuth) return <Navigate to="/Login/SignIn" replace/>;
  if(user === "cashier") return <DashboardPage/>
  if(user === "manager") return <ManagerSystem/>
  if(user === "chief") return <Kitchen/>
};

export default ProtectedRoute;
