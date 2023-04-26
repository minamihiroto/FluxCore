import React from "react";
import { Link } from "react-router-dom";
import styles from "./style/BoxList.module.css";

interface Box {
  id: number;
  name: string;
  created_by: number;
}

interface BoxListProps {
  boxes: Box[];
}

const BoxList: React.FC<BoxListProps> = ({ boxes }) => {
  return (
    <ul className={styles.boxContainer}>
      {boxes.map((box) => (
        <Link
          to={`/box/${box.id}`}
          style={{ textDecoration: "none" }}
          key={box.id}
          className={styles.box}
        >
          <li className={styles.boxItem}>
            <div className={styles.boxItemLink}>{box.name}</div>
            <p className={styles.boxCreator}>作成者:{box.created_by}</p>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default BoxList;
