import React from "react";
import { useNavigate } from "react-router-dom";
import commonStyles from "./style/CommonStyle.module.css";

interface Directory {
  id: number;
  name: string;
  created_by: number;
  created_at: string;
  updated_at: string;
}

interface DirectoryListProps {
  directories: Directory[];
}

const DirectoryList: React.FC<DirectoryListProps> = ({ directories }) => {
  const navigate = useNavigate();
  const sortedDirectories = [...directories].sort((a, b) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

  const handleRowClick = (id: number) => {
    navigate(`/directory/${id}`);
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
          {sortedDirectories.map((directory) => (
            <tr key={directory.id} onClick={() => handleRowClick(directory.id)}>
              <td className={commonStyles.width70}>
                <span className={commonStyles.link}>{directory.name}</span>
              </td>
              <td>{directory.created_by}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DirectoryList;
