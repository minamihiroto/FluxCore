import React from 'react';

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
      <h2>ディレクトリ一覧</h2>
      <ul>
        {documents.map((document) => (
          <li key={document.id}>
            <p>{document.name}</p>
            <p>作成者:{document.created_by}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;
