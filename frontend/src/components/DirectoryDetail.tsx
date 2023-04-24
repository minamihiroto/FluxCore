import React, { useEffect, useState } from "react";
import {
  createDirectoryLinkedDirectory,
  getDirectoryLinkedDirectories,
  updateNameInDirectory,
} from "../api/directoryApi";
import {
  createDirectoryLinkedDocument,
  getDirectoryLinkedDocuments,
} from "../api/documentApi";
import { useParams } from "react-router-dom";
import { getDirectoryDetail } from "../api/directoryApi";
import DirectoryList from "./DirectoryList";
import DocumentList from "./DocumentList";

const DirectoryDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [directory, setDirectory] = useState<any>(null);
  const [directoryName, setDirectoryName] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [directories, setDirectories] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [newName, setNewName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = parseInt(localStorage.getItem("user_id") || "0", 10);
    if (id) {
      const result = await createDirectoryLinkedDirectory(
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
      console.error("Error: directory id is not defined.");
    }
  };

  const documentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = parseInt(localStorage.getItem("user_id") || "0", 10);
    if (id) {
      const result = await createDirectoryLinkedDocument(
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
      console.error("Error: directory id is not defined.");
    }
  };

  const loadDirectories = async () => {
    if (id) {
      const directoryId = parseInt(id, 10);
      const directories = await getDirectoryLinkedDirectories(directoryId);
      setDirectories(directories);
    } else {
      console.error("Error: directory id is not defined.");
    }
  };

  const loadDocuments = async () => {
    if (id) {
      const directoryId = parseInt(id, 10);
      const documents = await getDirectoryLinkedDocuments(directoryId);
      setDocuments(documents);
    } else {
      console.error("Error: directory id is not defined.");
    }
  };

  const fetchDirectoryDetails = async () => {
    if (!id) {
      console.error("Error: directory id is not defined.");
      return;
    }

    const directoryId = parseInt(id, 10);
    const directoryDetails = await getDirectoryDetail(directoryId);
    setDirectory(directoryDetails);
  };

  useEffect(() => {
    fetchDirectoryDetails();
    loadDirectories();
    loadDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleNameChange = async () => {
    if (id) {
      const directoryId = parseInt(id, 10);
      const updatedDirectory = await updateNameInDirectory(
        directoryId,
        newName
      );
      if (updatedDirectory) {
        setDirectory(updatedDirectory);
        fetchDirectoryDetails();
        setIsEditing(false);
      } else {
        alert("Error updating box name");
      }
    } else {
      console.error("Error: box id is not defined.");
    }
  };

  if (!directory) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button onClick={handleNameChange}>更新</button>
          <button onClick={() => setIsEditing(false)}>キャンセル</button>
        </div>
      ) : (
        <p>
          ディレクトリ名: {directory.name}{" "}
          <button
            onClick={() => {
              setIsEditing(true);
              setNewName(directory.name);
            }}
          >
            編集
          </button>
        </p>
      )}
      <p>作成者ID: {directory.created_by}</p>
      <p>作成日時: {directory.created_at}</p>
      <p>更新日時: {directory.updated_at}</p>
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

export default DirectoryDetails;
