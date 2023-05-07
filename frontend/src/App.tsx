import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from "./components/Home";
import PasswordResetRequest from "./components/auth/PasswordResetRequest";
import PasswordResetConfirm from "./components/auth/PasswordResetConfirm";
import BoxDetail from "./components/box/BoxDetail";
import axios from "axios";
import DirectoryDetail from "./components/directory/DirectoryDetail";
import DocumentDetail from "./components/document/DocumentDetail";
import TreeMenu from "./components/menu/TreeMenu";
import "./App.css";
import HeaderMenu from "./components/menu/HeaderMenu";
import Setting from "./components/auth/Setting";

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

  const isLoggedIn = localStorage.getItem("access");
  const contentClassName =
    location.pathname === "/login" || location.pathname === "/password-reset"
      ? "fullWidthContent"
      : "content";

  return (
    <div className="container">
      {isLoggedIn && (
        <div className="tree">
          <TreeMenu />
        </div>
      )}
      <div className={contentClassName}>
        {isLoggedIn && <HeaderMenu />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/box/:id" element={<BoxDetail />} />
          <Route path="/directory/:id" element={<DirectoryDetail />} />
          <Route path="/document/:id" element={<DocumentDetail />} />
          <Route path="/password-reset" element={<PasswordResetRequest />} />
          <Route
            path="/password-reset-confirm/:uidb64/:token"
            element={<PasswordResetConfirm />}
          />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </div>
    </div>
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
