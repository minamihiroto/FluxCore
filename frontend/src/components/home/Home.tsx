import React, { useState, useEffect } from "react";
import { createBox, getBoxes } from "../../api/boxApi";
import BoxList from "../list/BoxList";
import Modal from "../modal/Modal";
import styles from "./style/Home.module.css";

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

  return (
    <div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="boxName">ボックス名</label>
            <input
              type="text"
              id="boxName"
              value={boxName}
              onChange={(e) => setBoxName(e.target.value)}
            />
            <label htmlFor="boxExplain">説明</label>
            <textarea
              id="boxExplain"
              value={boxExplain}
              onChange={(e) => setBoxExplain(e.target.value)}
            ></textarea>
            <button type="submit">作成</button>
          </form>
        </Modal>
      )}
      <div className={styles.boxList}>
        <div className={styles.addButton}>
          <button onClick={() => setShowModal(true)}>＋ボックス追加</button>
        </div>
        <BoxList boxes={boxes} />
      </div>
    </div>
  );
};

export default Dashboard;
