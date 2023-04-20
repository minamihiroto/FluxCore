import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDocumentDetail } from "../api/documentApi";
import Breadcrumbs from './Breadcrumbs';


const DocumentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<any>(null);

  useEffect(() => {
    if (!id) {
      console.error('Error: document id is not defined.');
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
    </div>
  );
};

export default DocumentDetail;
