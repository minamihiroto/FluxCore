import axios from '../components/config/axiosConfig';
import { treeMenuRefreshEvent } from "../hooks/useTreeMenuRefresh";
import { breadcrumbRefreshEvent } from "../hooks/useBreadcrumbRefresh";

export const createBoxLinkedDirectory = async (directoryName: string, userId: number, boxId: number) => {
  try {
    const token = localStorage.getItem("access");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post('/directory/create/', { name: directoryName, user_id: userId, box_id: boxId }, config);
    document.dispatchEvent(treeMenuRefreshEvent);
    return response.data;
  } catch (error) {
    console.error("Error creating directory:", error);
    return null;
  }
};

export const createDirectoryLinkedDirectory = async (directoryName: string, userId: number, directoryId: number) => {
  try {
    const token = localStorage.getItem("access");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post('/directory/create/', { name: directoryName, user_id: userId, directory_id: directoryId }, config);
    document.dispatchEvent(treeMenuRefreshEvent);
    return response.data;
  } catch (error) {
    console.error("Error creating directory:", error);
    return null;
  }
};

export const getBoxLinkedDirectories = async (boxId: number) => {
  try {
    const response = await axios.get(`/directory/boxlist/${boxId}`);
    return response.data.directories;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getDirectoryDetail = async (directoryId: number) => {
  try {
    const response = await axios.get(`/directory/${directoryId}`);
    return response.data.directory;
  } catch (error) {
    console.error(`Error fetching directory details: ${error}`);
    throw error;
  }
};

export const getDirectoryLinkedDirectories = async (directoryId: number) => {
  try {
    const response = await axios.get(`/directory/directorylist/${directoryId}`);
    return response.data.directories;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const updateNameInDirectory = async (directoryId: number, newName: string) => {
  try {
    const token = localStorage.getItem("access");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.patch(`/directory/update/${directoryId}/`, { name: newName }, config);
    document.dispatchEvent(treeMenuRefreshEvent);
    document.dispatchEvent(breadcrumbRefreshEvent)
    return response.data.directory;
  } catch (error) {
    console.error(`Error updating note in directory: ${error}`);
    throw error;
  }
};