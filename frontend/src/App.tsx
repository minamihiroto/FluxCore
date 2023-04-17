import React from "react";
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from './components/Home';
import PasswordResetRequest from './components/PasswordResetRequest';
import PasswordResetConfirm from "./components/PasswordResetConfirm";
import BoxDetail from "./components/BoxDetail";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* ログイン前 */}
        <Route path="/login" element={<Login />} />
        {/* ログイン後 */}
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home/>} />
        <Route path="/box/:id" element={<BoxDetail/>} />
        {/* 今の所どちらでも */}
        <Route path="/password-reset" element={<PasswordResetRequest />} />
        <Route path="/password-reset-confirm/:uidb64/:token" element={<PasswordResetConfirm />} />
        <Route path="*" element={<Navigate to='/404' replace />} />
      </Routes>
    </Router>
  );
};

export default App;
