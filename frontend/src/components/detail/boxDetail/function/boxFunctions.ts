import { getBoxDetail, updateBoxName } from "../../../../api/boxApi";

export const handleUpdateBoxName = async (
  id: string,
  newName: string,
  loadBoxDetails: () => Promise<void>,
  setIsEditing: (value: boolean) => void
) => {
  if (id) {
    const boxId = parseInt(id, 10);
    const updatedBox = await updateBoxName(boxId, newName);
    if (updatedBox) {
      loadBoxDetails();
      setIsEditing(false);
    } else {
      alert("Error updating box name");
    }
  } else {
    console.error("Error: box id is not defined.");
  }
};

export const loadBoxDetails = async (id: string) => {
  if (!id) {
    console.error("Error: box id is not defined.");
    return;
  }
  const boxId = parseInt(id, 10);
  const boxDetails = await getBoxDetail(boxId);
  return boxDetails;
};
