import { useEffect } from 'react';

export const breadcrumbRefreshEvent = new Event('breadcrumbRefresh');

export const useBreadcrumbRefresh = (callback: () => void) => {
  useEffect(() => {
    const handleRefresh = () => {
      callback();
    };

    document.addEventListener('breadcrumbRefresh', handleRefresh);
    return () => {
      document.removeEventListener('breadcrumbRefresh', handleRefresh);
    };
  }, [callback]);
};
