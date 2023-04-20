import React from 'react';
import { Link } from 'react-router-dom';

interface Document {
  id: number;
  name: string;
  created_by: number;
}

interface DocumentListProps {
  documents: Document[];
}

const DocumentList: React.FC<DocumentListProps> = ({ documents }) => {
  return (
    <div>
      <h2>ドキュメント一覧</h2>
      <ul>
        {documents.map((document) => (
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
