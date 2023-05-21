import React, { useState } from "react";
import { faFolder, faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import commonStyles from "./style/CommonStyle.module.css";
import { handleSubmit } from "../detail/boxDetail/function/directoryFunctions";
import { documentSubmit } from "../detail/boxDetail/function/documentFunctions";
import Modal from "../modal/Modal";

interface CombinedListProps {
  directories: Array<any>;
  documents: Array<any>;
  id?: string;
  loadDirectoriesWrapper?: () => Promise<void>;
  loadDocumentsWrapper?: () => Promise<void>;
}

const CombinedList: React.FC<CombinedListProps> = ({
  directories,
  documents,
  id,
  loadDirectoriesWrapper,
  loadDocumentsWrapper,
}) => {
  const navigate = useNavigate();
  const [directoryName, setDirectoryName] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [selectedOption, setSelectedOption] = useState("directory");
  const [showCreateModal, setShowCreateModal] = useState(false);

  if (!id) {
    return <div>ID is not defined</div>;
  }

  if (!loadDirectoriesWrapper) {
    return <div>loadDirectoriesWrapper is not defined</div>;
  }

  if (!loadDocumentsWrapper) {
    return <div>loadDocumentsWrapper is not defined</div>;
  }

  const handleDirectorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(id, directoryName, loadDirectoriesWrapper);
    setDirectoryName("");
    setShowCreateModal(false);
  };

  const handleDocumentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await documentSubmit(id, documentName, loadDocumentsWrapper);
    setDocumentName("");
    setShowCreateModal(false);
  };

  const handleRowClick = (type: string, id: number) => {
    navigate(`/${type}/${id}`);
  };

  const isEmpty = directories.length === 0 && documents.length === 0;

  return (
    <div className={commonStyles.container}>
      {showCreateModal && (
        <Modal onClose={() => setShowCreateModal(false)}>
          <form
            onSubmit={
              selectedOption === "directory"
                ? handleDirectorySubmit
                : handleDocumentSubmit
            }
          >
            <div>
              <label>
                <input
                  type="radio"
                  value="directory"
                  checked={selectedOption === "directory"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                ディレクトリ作成
              </label>
              <label>
                <input
                  type="radio"
                  value="document"
                  checked={selectedOption === "document"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                ドキュメント作成
              </label>
            </div>
            <label htmlFor="name">
              {selectedOption === "directory"
                ? "ディレクトリ名"
                : "ドキュメント名"}
            </label>
            <input
              type="text"
              id="name"
              value={
                selectedOption === "directory" ? directoryName : documentName
              }
              onChange={(e) =>
                selectedOption === "directory"
                  ? setDirectoryName(e.target.value)
                  : setDocumentName(e.target.value)
              }
            />
            <button type="submit">作成</button>
          </form>
        </Modal>
      )}
      {isEmpty ? (
        <div className={commonStyles.emptyMessage}>
          <p>
            データがありません。ドキュメント、もしくはディレクトリを作成してください。
          </p>
          <button
            className={commonStyles.createItem}
            onClick={() => setShowCreateModal(true)}
          >
            ＋新規作成
          </button>
        </div>
      ) : (
        <table className={commonStyles.table}>
          <thead>
            <th className={commonStyles.width70}>名前</th>
            <th>作成者</th>
            <th className={commonStyles.pointer} onClick={() => setShowCreateModal(true)}>＋追加</th>
          </thead>
          <tbody>
            {directories.map((directory) => (
              <tr
                key={directory.id}
                onClick={() => handleRowClick("directory", directory.id)}
              >
                <td className={commonStyles.width70}>
                  <FontAwesomeIcon icon={faFolder} />
                  <span className={commonStyles.link}> {directory.name}</span>
                </td>
                <td>{directory.created_by}</td>
                <td></td>
              </tr>
            ))}
            {documents.map((document) => (
              <tr
                key={document.id}
                onClick={() => handleRowClick("document", document.id)}
              >
                <td className={commonStyles.width70}>
                  <FontAwesomeIcon icon={faFile} />
                  <span className={commonStyles.link}> {document.name}</span>
                </td>
                <td>{document.created_by}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CombinedList;
