import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import PasswordResetRequest from "./components/PasswordResetRequest";
import PasswordResetConfirm from "./components/PasswordResetConfirm";
import BoxDetail from "./components/BoxDetail";
import axios from "axios";

const AuthWrapper: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const checkResponseStatus = async () => {
    try {
      const token = localStorage.getItem("access");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get("/auth/user/", config);
      if (response.status >= 200 && response.status < 300) {
        localStorage.setItem("user_id", response.data.id);
        return true;
      } else if (response.status >= 400 && response.status < 500) {
        return false;
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    if (
      location.pathname.includes("/password-reset") ||
      location.pathname === "/login"
    ) {
      return;
    }

    const handleRedirect = async () => {
      const isAuthenticated = await checkResponseStatus();
      if (!isAuthenticated) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user_id");
        navigate("/login");
      }
    };
    handleRedirect();
  }, [navigate, location.pathname]);

  return (
    <Routes>
      {/* ログイン前 */}
      <Route path="/login" element={<Login />} />
      {/* ログイン後 */}
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/box/:id" element={<BoxDetail />} />
      {/* どちらでもアクセス可能 */}
      <Route path="/password-reset" element={<PasswordResetRequest />} />
      <Route
        path="/password-reset-confirm/:uidb64/:token"
        element={<PasswordResetConfirm />}
      />
    </Routes>
  );
};
const App: React.FC = () => {
  return (
    <Router>
      <AuthWrapper />
    </Router>
  );
};

export default App;
