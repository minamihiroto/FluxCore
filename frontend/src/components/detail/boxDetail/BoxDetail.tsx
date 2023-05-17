import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import commonStyles from "../style/CommonStyle.module.css";
import CombinedList from "../../list/CombinedList";
import { handleSubmit, loadDirectories } from "./function/directoryFunctions";
import { documentSubmit, loadDocuments } from "./function/documentFunctions";
import { handleUpdateBoxName, loadBoxDetails } from "./function/boxFunctions";

const BoxDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [box, setBox] = useState<any>(null);
  const [directoryName, setDirectoryName] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [directories, setDirectories] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    loadBoxDetailsWrapper();
    loadDirectoriesWrapper();
    loadDocumentsWrapper();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!id) {
    return <div>Box ID is not defined</div>;
  }

  const handleDirectorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(id, directoryName, loadDirectoriesWrapper);
    setDirectoryName("");
  };

  const handleDocumentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await documentSubmit(id, documentName, loadDocumentsWrapper);
    setDocumentName("");
  };

  const handleBoxNameUpdate = async () => {
    await handleUpdateBoxName(id, newName, loadBoxDetailsWrapper, setIsEditing);
  };

  const loadDirectoriesWrapper = async () => {
    const directories = await loadDirectories(id);
    setDirectories(directories);
  };

  const loadDocumentsWrapper = async () => {
    const documents = await loadDocuments(id);
    setDocuments(documents);
  };

  const loadBoxDetailsWrapper = async () => {
    const boxDetails = await loadBoxDetails(id);
    setBox(boxDetails);
  };

  if (!box) {
    return <div>Loading...</div>;
  }

  return (
    <div className={commonStyles.container}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button onClick={handleBoxNameUpdate}>更新</button>
          <button onClick={() => setIsEditing(false)}>キャンセル</button>
        </div>
      ) : (
        <p>
          ボックス名: {box.name}{" "}
          <button
            onClick={() => {
              setIsEditing(true);
              setNewName(box.name);
            }}
          >
            編集
          </button>
        </p>
      )}
      <p>説明: {box.explain}</p>
      <div className={commonStyles.metadata}>
        <p>作成者ID: {box.created_by}</p>
        <div className={commonStyles.metadataTime}>
          <p>作成日時: {box.created_at}</p>
          <p>更新日時: {box.updated_at}</p>
        </div>
      </div>
      <form onSubmit={handleDirectorySubmit}>
        <label htmlFor="directoryName">ディレクトリ作成</label>
        <input
          type="text"
          id="directoryName"
          value={directoryName}
          onChange={(e) => setDirectoryName(e.target.value)}
        />
        <button type="submit">作成</button>
      </form>
      <form onSubmit={handleDocumentSubmit}>
        <label htmlFor="documentName">ドキュメント作成</label>
        <input
          type="text"
          id="documentName"
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
        />
        <button type="submit">作成</button>
      </form>
      <CombinedList directories={directories} documents={documents} />
    </div>
  );
};

export default BoxDetails;
