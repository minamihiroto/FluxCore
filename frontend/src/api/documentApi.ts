import axios from '../components/config/axiosConfig';

export const createBoxLinkedDocument = async (documentName: string, userId: number, boxId: number) => {
  try {
    const token = localStorage.getItem("access");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post('/document/create/', { name: documentName, user_id: userId, box_id: boxId }, config);
    return response.data;
  } catch (error) {
    console.error("Error creating document:", error);
    return null;
  }
};

export const createDirectoryLinkedDocument = async (documentName: string, userId: number, directoryId: number) => {
  try {
    const token = localStorage.getItem("access");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post('/document/create/', { name: documentName, user_id: userId, directory_id: directoryId }, config);
    return response.data;
  } catch (error) {
    console.error("Error creating document:", error);
    return null;
  }
};

export const getBoxLinkedDocuments = async (boxId: number) => {
  try {
    const response = await axios.get(`/document/boxlist/${boxId}`);
    return response.data.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getDirectoryLinkedDocuments = async (directroyId: number) => {
  try {
    const response = await axios.get(`/document/directorylist/${directroyId}`);
    return response.data.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getDocumentDetail = async (documentId: number) => {
  try {
    const response = await axios.get(`/document/${documentId}`);
    return response.data.document;
  } catch (error) {
    console.error(`Error fetching document details: ${error}`);
    throw error;
  }
};

export const updateNoteInDocument = async (documentId: number, newNote: string) => {
  try {
    const token = localStorage.getItem("access");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.patch(`/document/update/${documentId}/`, { note: newNote }, config);
    return response.data.document;
  } catch (error) {
    console.error(`Error updating note in document: ${error}`);
    throw error;
  }
};

export const updateNameInDocument = async (documentId: number, newName: string) => {
  try {
    const token = localStorage.getItem("access");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.patch(`/document/update/${documentId}/`, { name: newName }, config);
    return response.data.document;
  } catch (error) {
    console.error(`Error updating note in document: ${error}`);
    throw error;
  }
};