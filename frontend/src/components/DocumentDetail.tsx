import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDocumentDetail, updateNoteInDocument } from "../api/documentApi";
import Breadcrumbs from "./Breadcrumbs";

const DocumentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<any>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!id) {
      console.error("Error: document id is not defined.");
      return;
    }

    const fetchDocumentDetails = async () => {
      const documentId = parseInt(id, 10);
      const documentDetails = await getDocumentDetail(documentId);
      setDocument(documentDetails);
    };

    fetchDocumentDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (document && document.note) {
      setNote(document.note);
    }
  }, [document]);

  const handleNoteChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
    if (document) {
      const updatedDocument = await updateNoteInDocument(document.id, e.target.value);
      setDocument(updatedDocument);
    }
  };

  if (!document) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Breadcrumbs documentId={document.id} />
      <h2>タイトル: {document.name}</h2>
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
