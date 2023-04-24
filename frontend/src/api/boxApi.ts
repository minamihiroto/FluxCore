import axios from '../components/config/axiosConfig';

export const createBox = async (boxName: string, userId: number) => {
  try {
    const token = localStorage.getItem("access");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post('/box/create/', { name: boxName, user_id: userId }, config);
    return response.data;
  } catch (error) {
    console.error("Error creating box:", error);
    return null;
  }
};

export const getBoxes = async () => {
  try {
    const response = await axios.get("/box/list/");
    return response.data.boxes;
  } catch (error) {
    console.error("Error fetching boxes:", error);
    return null;
  }
};

export const getBoxDetail = async (boxId: number) => {
  try {
    const response = await axios.get(`/box/${boxId}`);
    return response.data.box;
  } catch (error) {
    console.error(`Error fetching box details: ${error}`);
    throw error;
  }
};

export const updateBoxName = async (boxId: number, newName: string) => {
  try {
    const token = localStorage.getItem("access");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.patch(`/box/update/${boxId}/`, { name: newName }, config);
    return response.data.box;
  } catch (error) {
    console.error("Error updating box name:", error);
    return null;
  }
};
