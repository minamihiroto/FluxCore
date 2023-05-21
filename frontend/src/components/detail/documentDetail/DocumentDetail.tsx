import React, { useEffect, useRef } from "react";
import styles from "../style/DocumentDetail.module.css";
import commonStyles from "../style/CommonStyle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { useDocument } from "./function/useDocument";
import { useNote } from "./function/useNote";
import { useNewName } from "./function/useNewName";
import {
  updateNoteInDocument,
  updateNameInDocument,
} from "../../../api/documentApi";

const DocumentDetail: React.FC = () => {
  const { id, document, setDocument } = useDocument();
  const { note, setNote } = useNote(document);
  const { newName, setNewName } = useNewName(document);
  const noteInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (noteInputRef.current) {
      noteInputRef.current.style.height = `${noteInputRef.current.scrollHeight}px`;
    }
  }, [note]);

  const handleNoteChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const target = e.target;
    setNote(target.value);
    target.style.height = `${target.scrollHeight}px`;
    if (document) {
      const updatedNoteDocument = await updateNoteInDocument(
        document.id,
        target.value
      );
      setDocument(updatedNoteDocument);
    }
  };

  const handleNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
    if (id && document) {
      const documentId = parseInt(id, 10);
      const updatedNameDocument = await updateNameInDocument(
        documentId,
        e.target.value
      );
      setDocument(updatedNameDocument);
    }
  };

  if (!document) {
    return <div>Loading...</div>;
  }

  return (
    <div className={commonStyles.container}>
      <div className={commonStyles.metadata}>
        <p>作成者ID: {document.created_by}</p>
        <div className={commonStyles.metadataTime}>
          <p>作成日時: {document.created_at}</p>
          <p>更新日時: {document.updated_at}</p>
        </div>
      </div>
      <div className={commonStyles.inputContainer}>
      <FontAwesomeIcon icon={faFile} className={commonStyles.icon} />
        <input
          type="text"
          value={newName}
          onChange={handleNameChange}
          placeholder="タイトルを入力してください"
          className={commonStyles.editInput}
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
          autoFocus
        />
      </div>
    </div>
  );
};

export default DocumentDetail;
