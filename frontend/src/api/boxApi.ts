import axios from '../AxiosConfig';

export const createBox = async (boxName: string) => {
  try {
    const response = await axios.post('/box/create/', { name: boxName }, { headers: { 'Content-Type': 'application/json' } });
    return response.data;
  } catch (error) {
    console.error('Error creating box:', error);
    return null;
  }
};
