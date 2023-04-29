import { useEffect } from 'react';

export const treeMenuRefreshEvent = new Event("treeMenuRefresh");

export const useTreeMenuRefresh = (callback: () => void) => {
  useEffect(() => {
    const handleTreeMenuRefresh = () => {
      callback();
    };

    document.addEventListener("treeMenuRefresh", handleTreeMenuRefresh);

    return () => {
      document.removeEventListener("treeMenuRefresh", handleTreeMenuRefresh);
    };
  }, [callback]);
};
