import React from "react";
import { faFolder, faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import commonStyles from "./style/CommonStyle.module.css";

interface CombinedListProps {
  directories: Array<any>;
  documents: Array<any>;
}

const CombinedList: React.FC<CombinedListProps> = ({
  directories,
  documents,
}) => {
  const navigate = useNavigate();

  const handleRowClick = (type: string, id: number) => {
    navigate(`/${type}/${id}`);
  };

  const isEmpty = directories.length === 0 && documents.length === 0;

  return (
    <div className={commonStyles.container}>
      {isEmpty ? (
        <div className={commonStyles.emptyMessage}>
          データがありません。ドキュメント、もしくはディレクトリを作成してください。
        </div>
      ) : (
        <table className={commonStyles.table}>
          <thead>
            <th className={commonStyles.width70}>名前</th>
            <th>作成者</th>
          </thead>
          <tbody>
            {directories.map((directory) => (
              <tr
                key={directory.id}
                onClick={() => handleRowClick("directory", directory.id)}
              >
                <td className={commonStyles.width70}>
                  <FontAwesomeIcon icon={faFolder} />{" "}
                  <span className={commonStyles.link}>{directory.name}</span>
                </td>
                <td>{directory.created_by}</td>
              </tr>
            ))}
            {documents.map((document) => (
              <tr
                key={document.id}
                onClick={() => handleRowClick("document", document.id)}
              >
                <td className={commonStyles.width70}>
                  <FontAwesomeIcon icon={faFile} />{" "}
                  <span className={commonStyles.link}>{document.name}</span>
                </td>
                <td>{document.created_by}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CombinedList;
