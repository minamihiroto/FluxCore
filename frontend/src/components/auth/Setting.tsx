import React, { useState } from "react";
import Admin from "./Admin";
import Profile from "./Profile";
import styles from "./style/Setting.module.css";

const Setting: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<"admin" | "profile">(
    "profile"
  );

  const handleClick = (page: "admin" | "profile") => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.setting}>
      <div className={styles.navigation}>
        <div className={styles.menuContainer}>
          <div
            className={`${styles.menuItem} ${
              currentPage === "profile" ? styles.active : ""
            }`}
            onClick={() => handleClick("profile")}
          >
            {currentPage === "profile" && (
              <span className={styles.indicator}></span>
            )}
            マイページ
          </div>
          <div
            className={`${styles.menuItem} ${
              currentPage === "admin" ? styles.active : ""
            }`}
            onClick={() => handleClick("admin")}
          >
            {currentPage === "admin" && (
              <span className={styles.indicator}></span>
            )}
            管理ページ
          </div>
        </div>
        <div>{currentPage === "admin" ? <Admin /> : <Profile />}</div>
      </div>
    </div>
  );
};

export default Setting;
