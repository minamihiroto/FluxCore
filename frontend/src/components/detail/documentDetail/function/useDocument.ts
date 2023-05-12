import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDocumentDetail } from "../../../../api/documentApi";

export const useDocument = () => {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<any>(null);

  useEffect(() => {
    const fetchDocumentDetails = async () => {
      if (!id) {
        console.error("Error: document id is not defined.");
        return;
      }

      const documentId = parseInt(id, 10);
      const documentDetails = await getDocumentDetail(documentId);
      setDocument(documentDetails);
    };

    fetchDocumentDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return { id, document, setDocument };
};
