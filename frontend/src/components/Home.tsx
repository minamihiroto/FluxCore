import React, { useState, useEffect } from "react";
import { createBox, getBoxes } from "../api/boxApi";
import BoxList from "./list/BoxList";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [boxName, setBoxName] = useState("");
  const [boxExplain, setBoxExplain] = useState("");
  const [boxes, setBoxes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = parseInt(localStorage.getItem("user_id") || "0", 10);
    const result = await createBox(boxName, boxExplain, userId);
    if (result) {
      loadBoxes();
    } else {
      alert("Error creating box");
    }
    setShowModal(false);
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

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
          marginRight: "20px",
        }}
      >
        <button onClick={handleShowModal}>＋ボックス追加</button>
      </div>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="boxName">ボックス名</label>
            <input
              type="text"
              id="boxName"
              value={boxName}
              onChange={(e) => setBoxName(e.target.value)}
            />
            <label htmlFor="boxName">説明</label>
            <textarea
              style={{ width: "300px", height: "100px" }}
              id="boxExplain"
              value={boxExplain}
              onChange={(e) => setBoxExplain(e.target.value)}
            ></textarea>
            <button type="submit">作成</button>
          </form>
        </Modal>
      )}
      <BoxList boxes={boxes} />
      <Link to={"/register"}>新規ユーザー登録へ</Link>
      <Link to={"/password-reset"}>パスワードリセットする</Link>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};

const Modal: React.FC<{ children: React.ReactNode; onClose: () => void }> = ({
  children,
  onClose,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "1rem",
          borderRadius: "5px",
        }}
      >
        {children}
        <button onClick={onClose} style={{ marginTop: "1rem" }}>
          キャンセル
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
