import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
}
