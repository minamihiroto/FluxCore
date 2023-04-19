import React, { useEffect, useState } from "react";
import { createDirectoryLinkedDirectory,getDirectoryLinkedDirectories } from '../api/directoryApi';
import { createDocument, getDocuments } from '../api/documentApi';
import { useParams } from "react-router-dom";
import { getDirectoryDetail } from "../api/directoryApi";
import DirectoryList from './DirectoryList';
import DocumentList from './DocumentList';


const DirectoryDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [directory, setDirectory] = useState<any>(null);
  const [directoryName, setDirectoryName] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [directories, setDirectories] = useState([]);
  const [documents, setDocuments] = useState([]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = parseInt(localStorage.getItem("user_id") || "0", 10);
    if (id) {
      const result = await createDirectoryLinkedDirectory(directoryName, userId, parseInt(id, 10));
      if (result) {
        loadDirectories();
        return;
      } else {
        alert('Error creating directory');
      }
    } else {
      console.error('Error: directory id is not defined.');
    }
  };

  const documentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = parseInt(localStorage.getItem("user_id") || "0", 10);
    if (id) {
      const result = await createDocument(documentName, userId, parseInt(id, 10));
      if (result) {
        loadDocuments();
        return;
      } else {
        alert('Error creating document');
      }
    } else {
      console.error('Error: directory id is not defined.');
    }
  };

  const loadDirectories = async () => {
    if (id) {
      const directoryId = parseInt(id, 10);
      const directories = await getDirectoryLinkedDirectories(directoryId);
      setDirectories(directories);
    } else {
      console.error('Error: directory id is not defined.');
    }
  };

  const loadDocuments = async () => {
    if (id) {
      const directoryId = parseInt(id, 10);
      const documents = await getDocuments(directoryId);
      setDocuments(documents);
    } else {
      console.error('Error: directory id is not defined.');
    }
  };

  useEffect(() => {
    if (!id) {
      console.error('Error: directory id is not defined.');
      return;
    }
  
    const fetchDirectoryDetails = async () => {
      const directoryId = parseInt(id, 10);
      const directoryDetails = await getDirectoryDetail(directoryId);
      setDirectory(directoryDetails);
    };
  
    fetchDirectoryDetails();
    loadDirectories();
    loadDocuments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!directory) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>ディレクトリ詳細</h2>
      <p>ディレクトリ名: {directory.name}</p>
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
