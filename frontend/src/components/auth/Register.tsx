import React, { useState } from "react";
import axios from "../axiosConfig";
import { useNavigate,Link } from "react-router-dom";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register/", {
        username,
        password,
        email,
      });
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("登録に失敗しました。");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">登録</button>
      </form>
      <Link to={"/"}>ホームへ</Link>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
