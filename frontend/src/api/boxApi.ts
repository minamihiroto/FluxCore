import axios from '../AxiosConfig';

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
