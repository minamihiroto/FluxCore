import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getDocumentDetail,
  updateNoteInDocument,
  updateNameInDocument,
} from "../../api/documentApi";
import commonStyles from "./style/CommonStyle.module.css";
 
const DocumentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<any>(null);
  const [note, setNote] = useState("");
  const [newName, setNewName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchDocumentDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchDocumentDetails = async () => {
    if (!id) {
      console.error("Error: document id is not defined.");
      return;
    }

    const documentId = parseInt(id, 10);
    const documentDetails = await getDocumentDetail(documentId);
    setDocument(documentDetails);
  };

  useEffect(() => {
    if (document && document.note) {
      setNote(document.note);
    }
  }, [document]);

  const handleNoteChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNote(e.target.value);
    if (document) {
      const updatedDocument = await updateNoteInDocument(
        document.id,
        e.target.value
      );
      setDocument(updatedDocument);
    }
  };

  const handleNameChange = async () => {
    if (id) {
      const documentId = parseInt(id, 10);
      const updatedDocument = await updateNameInDocument(documentId, newName);
      if (updatedDocument) {
        setDocument(updatedDocument);
        fetchDocumentDetails();
        setIsEditing(false);
      } else {
        alert("Error updating box name");
      }
    } else {
      console.error("Error: box id is not defined.");
    }
  };

  if (!document) {
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
          <button onClick={handleNameChange}>更新</button>
          <button onClick={() => setIsEditing(false)}>キャンセル</button>
        </div>
      ) : (
        <p>
          ボックス名: {document.name}{" "}
          <button
            onClick={() => {
              setIsEditing(true);
              setNewName(document.name);
            }}
          >
            編集
          </button>
        </p>
      )}
      <p>作成者ID: {document.created_by}</p>
      <p>作成日時: {document.created_at}</p>
      <p>更新日時: {document.updated_at}</p>
      <div>
        <h3>ノート</h3>
        <textarea
          style={{ width: "600px", height: "400px" }}
          id="note-input"
          value={note}
          onChange={handleNoteChange}
        />
      </div>
    </div>
  );
};

export default DocumentDetail;
