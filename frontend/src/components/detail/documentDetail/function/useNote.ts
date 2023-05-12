import { useEffect, useState } from "react";

export const useNote = (document: any) => {
  const [note, setNote] = useState("");

  useEffect(() => {
    if (document && document.note) {
      setNote(document.note);
    }
  }, [document]);

  return { note, setNote };
};
