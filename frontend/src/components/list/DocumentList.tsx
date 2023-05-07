import React from "react";
import { useNavigate } from "react-router-dom";
import commonStyles from "./style/CommonStyle.module.css";

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
  const navigate = useNavigate();
  const sortedDocuments = [...documents].sort((a, b) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

  const handleRowClick = (id: number) => {
    navigate(`/document/${id}`);
  };

  return (
    <div className={commonStyles.container}>
      <h2>ドキュメント一覧</h2>
      <table className={commonStyles.table}>
        <thead>
          <th>ドキュメント名</th>
          <th>作成者</th>
        </thead>
        <tbody>
          {sortedDocuments.map((document) => (
            <tr key={document.id} onClick={() => handleRowClick(document.id)}>
              <td className={commonStyles.width70}>
                <span className={commonStyles.link}>{document.name}</span>
              </td>
              <td>{document.created_by}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentList;
