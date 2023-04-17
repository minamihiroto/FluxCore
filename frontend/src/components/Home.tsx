import React, { useState, useEffect } from "react";
import { createBox } from '../api/boxApi';
import axios from "../AxiosConfig";

const Dashboard: React.FC = () => {
  const [username, setUsername] = useState("");
  const [boxName, setBoxName] = useState('');
  const [userId, setUserId] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userId) {
      const result = await createBox(boxName, userId);
      if (result) {
        alert("Box created successfully!");
      } else {
        alert("Error creating box");
      }
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const token = localStorage.getItem("access");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get("/auth/user/", config);
        setUsername(response.data.username);
        setUserId(response.data.id);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    getUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/login";
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {username}!</p>
      <h1>Create Box</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="boxName">Box Name:</label>
        <input
          type="text"
          id="boxName"
          value={boxName}
          onChange={(e) => setBoxName(e.target.value)}
        />
        <button type="submit">Create Box</button>
      </form>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};

export default Dashboard;
