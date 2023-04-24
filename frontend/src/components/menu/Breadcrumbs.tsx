import React, { useEffect, useState } from "react";
import {
  getDirectoryBreadcrumbs,
  getDocumentBreadcrumbs,
} from "../../api/breadcrumbApi";
import { Link } from "react-router-dom";

export interface Breadcrumb {
  id: number;
  name: string;
}

interface Props {
  directoryId?: number;
  documentId?: number;
}

const Breadcrumbs: React.FC<Props> = ({ directoryId, documentId }) => {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

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
    </nav>
  );
};

export default Breadcrumbs;
