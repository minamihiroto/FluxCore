import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import { getBoxDetail } from "../../api/boxApi";
import axios from "../config/axiosConfig";
import styles from "./style/HeaderMenu.module.css";
import { Link } from "react-router-dom";

interface MenuProps {}

const HeaderMenu: React.FC<MenuProps> = () => {
  const location = useLocation();
  const pathMatch = location.pathname.match(
    /^\/(?:directory|document|box)\/(\d+)$/
  );

  const [directoryId, setDirectoryId] = useState<number | undefined>();
  const [documentId, setDocumentId] = useState<number | undefined>();
  const [boxId, setBoxId] = useState<number | undefined>();
  const [boxName, setBoxName] = useState<string | undefined>();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (pathMatch) {
      const id = parseInt(pathMatch[1], 10);
      if (location.pathname.startsWith("/directory")) {
        setDirectoryId(id);
        setDocumentId(undefined);
        setBoxId(undefined);
      } else if (location.pathname.startsWith("/document")) {
        setDocumentId(id);
        setDirectoryId(undefined);
        setBoxId(undefined);
      } else if (location.pathname.startsWith("/box")) {
        setBoxId(id);
        setDirectoryId(undefined);
        setDocumentId(undefined);
      }
    } else {
      setDirectoryId(undefined);
      setDocumentId(undefined);
      setBoxId(undefined);
    }
  }, [location.pathname, pathMatch]);

  useEffect(() => {
    if (boxId || boxId === 0) {
      const fetchBoxDetails = async () => {
        try {
          const boxDetail = await getBoxDetail(boxId);
          setBoxName(boxDetail.name);
          console.log("Fetching box details", boxDetail.name);
        } catch (error) {
          console.error("Error fetching box details:", error);
        }
      };

      fetchBoxDetails();
    }
  }, [boxId]);

  let showBreadcrumbs = false;
  if (pathMatch && (directoryId || documentId || boxId)) {
    showBreadcrumbs = true;
  }

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
        localStorage.setItem("user_id", response.data.id);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    getUserInfo();
  }, []);

  const isHomePage = location.pathname === "/";

  return (
    <div className={styles.headerMenuContainer}>
      {showBreadcrumbs && (
        <div className={styles.breadcrumbsContainer}>
          <Breadcrumbs directoryId={directoryId} documentId={documentId} />
        </div>
      )}
        {boxId || boxId === 0 ? (
          <div className={styles.boxName}>{boxName}</div>
        ) : null}
      {isHomePage && <div className={styles.homeText}>Home</div>}
      <Link to="/profile" className={styles.userInfo}>{username}</Link>
    </div>
  );
};

export default HeaderMenu;
