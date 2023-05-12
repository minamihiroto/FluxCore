import { useEffect, useState } from "react";

export const useNewName = (document: any) => {
  const [newName, setNewName] = useState("");

  useEffect(() => {
    if (document && document.name) {
      setNewName(document.name);
    }
  }, [document]);

  return { newName, setNewName };
};
