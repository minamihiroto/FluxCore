import axios from "../components/axiosConfig";

export interface Breadcrumb {
  id: number;
  name: string;
}

export const getDirectoryBreadcrumbs = async (directoryId: number): Promise<Breadcrumb[]> => {
  const response = await axios.get(`/breadcrumbs/directory/${directoryId}/`);
  return response.data.breadcrumbs;
};

export const getDocumentBreadcrumbs = async (documentId: number): Promise<Breadcrumb[]> => {
  const response = await axios.get(`/breadcrumbs/document/${documentId}/`);
  return response.data.breadcrumbs;
};