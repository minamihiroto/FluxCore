import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./style/BoxList.module.css";
import { getUserInfo } from "../../api/authApi";

interface Box {
  id: number;
  name: string;
  created_by: number;
  created_at: string;
  updated_at: string;
}

interface BoxListProps {
  boxes: Box[];
}

const BoxList: React.FC<BoxListProps> = ({ boxes }) => {
  const navigate = useNavigate();
  const [usernames, setUsernames] = useState<Record<number, string>>({});
  const sortedBoxes = [...boxes].sort((a, b) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

  useEffect(() => {
    const getUsers = async () => {
      const usernamesTemp: Record<number, string> = {};
      for (const box of sortedBoxes) {
        try {
          const response = await getUserInfo(box.created_by);
          if (!response.data) {
            navigate("/login");
          }
          usernamesTemp[box.created_by] = response.data.username;
        } catch (error) {
          console.error(error);
        }
      }
      setUsernames(usernamesTemp);
    };
    getUsers();
  }, [sortedBoxes, navigate]);

  return (
    <ul className={styles.boxContainer}>
      {sortedBoxes.map((box) => (
        <Link
          to={`/box/${box.id}`}
          style={{ textDecoration: "none" }}
          key={box.id}
          className={styles.box}
        >
          <li className={styles.boxItem}>
            <p className={styles.boxItemLink}>{box.name}</p>
            <p className={styles.boxCreator}>
              作成者: {usernames[box.created_by]}
            </p>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default BoxList;
