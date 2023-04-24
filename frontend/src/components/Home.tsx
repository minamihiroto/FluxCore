import React, { useState, useEffect } from "react";
import { createBox, getBoxes } from "../api/boxApi";
import BoxList from "./list/BoxList";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [boxName, setBoxName] = useState("");
  const [boxes, setBoxes] = useState([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = parseInt(localStorage.getItem("user_id") || "0", 10);
    const result = await createBox(boxName, userId);
    if (result) {
      loadBoxes();
    } else {
      alert("Error creating box");
    }
  };

  const loadBoxes = async () => {
    const boxes = await getBoxes();
    setBoxes(boxes);
  };

  useEffect(() => {
    loadBoxes();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user_id");
    window.location.href = "/login";
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="boxName">ボックス作成</label>
        <input
          type="text"
          id="boxName"
          value={boxName}
          onChange={(e) => setBoxName(e.target.value)}
        />
        <button type="submit">作成</button>
      </form>
      <BoxList boxes={boxes} />
      <Link to={"/register"}>新規ユーザー登録へ</Link>
      <Link to={"/password-reset"}>パスワードリセットする</Link>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};

export default Dashboard;
