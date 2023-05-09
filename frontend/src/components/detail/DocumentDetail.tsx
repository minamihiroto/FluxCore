import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  getDocumentDetail,
  updateNoteInDocument,
  updateNameInDocument,
} from "../../api/documentApi";
import styles from "./style/DocumentDetail.module.css";

const DocumentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<any>(null);
  const [note, setNote] = useState("");
  const [newName, setNewName] = useState("");
  const noteInputRef = useRef<HTMLTextAreaElement>(null);

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
    if (document && document.name) {
      setNewName(document.name);
    }
  }, [document]);

  const handleNoteChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const target = e.target;
    setNote(target.value);
    target.style.height = 'inherit';
    target.style.height = `${target.scrollHeight}px`;
    if (document) {
      const updatedDocument = await updateNoteInDocument(
        document.id,
        target.value
      );
      setDocument(updatedDocument);
    }
  };

  const handleNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
    if (id && document) {
      const documentId = parseInt(id, 10);
      const updatedDocument = await updateNameInDocument(
        documentId,
        e.target.value
      );
      setDocument(updatedDocument);
    }
  };

  if (!document) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.metadata}>
        <p>作成者ID: {document.created_by}</p>
        <div className={styles.metadataTime}>
          <p>作成日時: {document.created_at}</p>
          <p>更新日時: {document.updated_at}</p>
        </div>
      </div>
      <div className={styles.input}>
        <input
          type="text"
          value={newName}
          onChange={handleNameChange}
          placeholder="タイトルを入力してください"
          className={styles.editInput}
        />
      </div>
      <div className={styles.note}>
        <textarea
          className={styles.noteTextarea}
          id="note-input"
          value={note}
          placeholder="入力してください"
          onChange={handleNoteChange}
          ref={noteInputRef}
          style={{ overflowY: 'hidden' }}
          autoFocus
        />
      </div>
    </div>
  );
};

export default DocumentDetail;
