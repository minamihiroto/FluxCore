import axios from 'axios';

export const createDocument = async (documentName: string, userId: number, boxId: number) => {
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

export const getDocuments = async (boxId: number) => {
  try {
    const response = await axios.get(`/document/list/${boxId}`);
    return response.data.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
};