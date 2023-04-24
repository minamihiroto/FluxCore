import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import { getBoxDetail } from "../../api/boxApi";

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

  return (
    <div className="menu">
      {showBreadcrumbs && (
        <Breadcrumbs directoryId={directoryId} documentId={documentId} />
      )}
      {boxId || boxId === 0 ? (
        <div className="box-name">{boxName}</div>
      ) : null}
    </div>
  );
};

export default HeaderMenu;
