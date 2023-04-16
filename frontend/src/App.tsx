import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from './components/Home';
import PasswordResetRequest from './components/PasswordResetRequest';
import PasswordResetConfirm from "./components/PasswordResetConfirm";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password-reset" element={<PasswordResetRequest />} />
        <Route path="/password-reset-confirm/:uidb64/:token" element={<PasswordResetConfirm />} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  );
};

export default App;
