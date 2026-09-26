'use client';

import { useEffect } from 'react';

export function VisitorTracker() {
  useEffect(() => {
    const hasBeenCalled = sessionStorage.getItem('visitorCounted');
    if (!hasBeenCalled) {
      const currentCount = parseInt(localStorage.getItem('rnw_visitor_count') || '1240', 10);
      localStorage.setItem('rnw_visitor_count', (currentCount + 1).toString());
      sessionStorage.setItem('visitorCounted', 'true');
    }
  }, []);

  return null;
}
