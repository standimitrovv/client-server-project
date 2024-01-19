'use client';

import { useEffect, useState } from 'react';

export const useMediaQuery = (minWidthPx: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const matchQueryList = window.matchMedia(`(min-width: ${minWidthPx}px)`);

    function handleChange(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }

    matchQueryList.addEventListener('change', handleChange);

    return () => {
      matchQueryList.removeEventListener('change', handleChange);
    };
  }, [minWidthPx]);

  return matches;
};
