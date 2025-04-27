import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./Login/SignIn";
import SignUp from "./Login/SignUp";
import ProtectedRoute from "./Utils/ProtectedRoute";
import { Auth } from "./Utils/Auth";
import LoginForm from "./Login/LoginForm";
const App = () => {
  return (
    <Auth>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/dashboard" />} />
          <Route path="/" element={<Navigate to="dashboard" />} />
          <Route path="Login" element={<LoginForm />}>
            <Route path="SignUp" element={<SignUp />} />
            <Route path="SignIn" element={<SignIn />} />
          </Route>
          <Route path="/dashboard/*" element={<ProtectedRoute />} />
        </Routes>
      </BrowserRouter>
    </Auth>
  );
};

export default App;
