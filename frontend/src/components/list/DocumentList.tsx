import React from "react";
import { Link } from "react-router-dom";

interface Document {
  id: number;
  name: string;
  created_by: number;
  created_at: string;
  updated_at: string;
}

interface DocumentListProps {
  documents: Document[];
}

const DocumentList: React.FC<DocumentListProps> = ({ documents }) => {
  const sortedDocuments = [...documents].sort((a, b) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

  return (
    <div>
      <h2>ドキュメント一覧</h2>
      <ul>
        {sortedDocuments.map((document) => (
          <li key={document.id}>
            <Link to={`/document/${document.id}`}>{document.name}</Link>
            <p>作成者:{document.created_by}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;
