import React, { useEffect, useState } from "react";
import {
  getDirectoryBreadcrumbs,
  getDocumentBreadcrumbs,
} from "../../api/breadcrumbApi";
import { Link } from "react-router-dom";
import { getBoxDetail } from "../../api/boxApi";

export interface Breadcrumb {
  id: number;
  name: string;
}

interface Props {
  directoryId?: number;
  documentId?: number;
  boxId?: number;
}

const Breadcrumbs: React.FC<Props> = ({ directoryId, documentId, boxId }) => {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  const [boxName, setBoxName] = useState<string | undefined>();
  const shouldShowBoxName = boxId || boxId === 0;

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

  useEffect(() => {
    const fetchBreadcrumbs = async () => {
      let newBreadcrumbs: Breadcrumb[] = [];

      if (directoryId) {
        newBreadcrumbs = await getDirectoryBreadcrumbs(directoryId);
      } else if (documentId) {
        newBreadcrumbs = await getDocumentBreadcrumbs(documentId);
      }

      setBreadcrumbs(newBreadcrumbs);
    };

    fetchBreadcrumbs();
  }, [directoryId, documentId]);

  return (
    <nav>
      {breadcrumbs.map((breadcrumb, index) => {
        const isFirst = index === 0;
        const isLast = index === breadcrumbs.length - 1;

        let content;
        if (isFirst) {
          content = <Link to={`/box/${breadcrumb.id}`}>{breadcrumb.name}</Link>;
        } else if (isLast) {
          content = <span>{breadcrumb.name}</span>;
        } else {
          content = (
            <Link to={`/directory/${breadcrumb.id}`}>{breadcrumb.name}</Link>
          );
        }
        return (
          <span key={breadcrumb.id}>
            {content}
            {index < breadcrumbs.length - 1 && " > "}
          </span>
        );
      })}
      {shouldShowBoxName && <div>{boxName}</div>}
    </nav>
  );
};

export default Breadcrumbs;
