import {
  createBoxLinkedDocument,
  getBoxLinkedDocuments,
} from "../../../../api/documentApi";

export const documentSubmit = async (
  id: string,
  documentName: string,
  loadDocuments: () => Promise<void>
) => {
  const userId = parseInt(localStorage.getItem("user_id") || "0", 10);
  if (id) {
    const result = await createBoxLinkedDocument(
      documentName,
      userId,
      parseInt(id, 10)
    );
    if (result) {
      loadDocuments();
      return;
    } else {
      alert("Error creating document");
    }
  } else {
    console.error("Error: box id is not defined.");
  }
};

export const loadDocuments = async (id: string) => {
  if (id) {
    const boxId = parseInt(id, 10);
    const documents = await getBoxLinkedDocuments(boxId);
    return documents;
  } else {
    console.error("Error: box id is not defined.");
  }
};
