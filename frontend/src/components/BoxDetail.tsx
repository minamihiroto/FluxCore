import React, { useEffect, useState } from "react";
import {
  createBoxLinkedDirectory,
  getBoxLinkedDirectories,
} from "../api/directoryApi";
import {
  createBoxLinkedDocument,
  getBoxLinkedDocuments,
} from "../api/documentApi";
import { useParams } from "react-router-dom";
import { getBoxDetail, updateBoxName } from "../api/boxApi";
import DirectoryList from "./DirectoryList";
import DocumentList from "./DocumentList";

const BoxDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [box, setBox] = useState<any>(null);
  const [directoryName, setDirectoryName] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [directories, setDirectories] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = parseInt(localStorage.getItem("user_id") || "0", 10);
    if (id) {
      const result = await createBoxLinkedDirectory(
        directoryName,
        userId,
        parseInt(id, 10)
      );
      if (result) {
        loadDirectories();
        setDirectoryName("");
        return;
      } else {
        alert("Error creating directory");
      }
    } else {
      console.error("Error: box id is not defined.");
    }
  };

  const documentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = parseInt(localStorage.getItem("user_id") || "0", 10);
    if (id) {
      const result = await createBoxLinkedDocument(
        documentName,
        userId,
        parseInt(id, 10)
      );
      if (result) {
        loadDocuments();
        setDocumentName("");
        return;
      } else {
        alert("Error creating document");
      }
    } else {
      console.error("Error: box id is not defined.");
    }
  };

  const handleUpdateBoxName = async () => {
    if (id) {
      const boxId = parseInt(id, 10);
      const updatedBox = await updateBoxName(boxId, newName);
      if (updatedBox) {
        setBox(updatedBox);
        loadBoxDetails();
        setIsEditing(false);
      } else {
        alert("Error updating box name");
      }
    } else {
      console.error("Error: box id is not defined.");
    }
  };

  const loadDirectories = async () => {
    if (id) {
      const boxId = parseInt(id, 10);
      const directories = await getBoxLinkedDirectories(boxId);
      setDirectories(directories);
    } else {
      console.error("Error: box id is not defined.");
    }
  };

  const loadDocuments = async () => {
    if (id) {
      const boxId = parseInt(id, 10);
      const documents = await getBoxLinkedDocuments(boxId);
      setDocuments(documents);
    } else {
      console.error("Error: box id is not defined.");
    }
  };

  const loadBoxDetails = async () => {
    if (!id) {
      console.error("Error: box id is not defined.");
      return;
    }
    const boxId = parseInt(id, 10);
    const boxDetails = await getBoxDetail(boxId);
    setBox(boxDetails);
  };

  useEffect(() => {
    loadBoxDetails();
    loadDirectories();
    loadDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!box) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>ボックス詳細</h2>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button onClick={handleUpdateBoxName}>更新</button>
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
      <p>作成者ID: {box.created_by}</p>
      <p>作成日時: {box.created_at}</p>
      <p>更新日時: {box.updated_at}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="directoryName">ディレクトリ作成</label>
        <input
          type="text"
          id="directoryName"
          value={directoryName}
          onChange={(e) => setDirectoryName(e.target.value)}
        />
        <button type="submit">作成</button>
      </form>
      <form onSubmit={documentSubmit}>
        <label htmlFor="documentName">ドキュメント作成</label>
        <input
          type="text"
          id="documentName"
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
        />
        <button type="submit">作成</button>
      </form>
      <DirectoryList directories={directories} />
      <DocumentList documents={documents} />
    </div>
  );
};

export default BoxDetails;
