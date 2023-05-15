import {
  createBoxLinkedDirectory,
  getBoxLinkedDirectories,
} from "../../../../api/directoryApi";

export const handleSubmit = async (
  id: string,
  directoryName: string,
  loadDirectories: () => Promise<void>
) => {
  const userId = parseInt(localStorage.getItem("user_id") || "0", 10);
  if (id) {
    const result = await createBoxLinkedDirectory(
      directoryName,
      userId,
      parseInt(id, 10)
    );
    if (result) {
      loadDirectories();
      return;
    } else {
      alert("Error creating directory");
    }
  } else {
    console.error("Error: box id is not defined.");
  }
};

export const loadDirectories = async (id: string) => {
  if (id) {
    const boxId = parseInt(id, 10);
    const directories = await getBoxLinkedDirectories(boxId);
    return directories;
  } else {
    console.error("Error: box id is not defined.");
  }
};
