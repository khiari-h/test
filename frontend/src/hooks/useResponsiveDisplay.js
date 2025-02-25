import { useState, useEffect, useCallback } from 'react';

export const useResponsiveDisplay = (initialConfig = {}) => {
  const defaultConfig = {
    mobile: { maxWidth: 768, count: 1 },
    tablet: { maxWidth: 1024, count: 2 },
    desktop: { count: 3 }
  };

  const config = { ...defaultConfig, ...initialConfig };

  const [displayCount, setDisplayCount] = useState(config.desktop.count);

  const updateDisplayCount = useCallback(() => {
    const width = window.innerWidth;

    if (width < config.mobile.maxWidth) {
      setDisplayCount(config.mobile.count);
    } else if (width < config.tablet.maxWidth) {
      setDisplayCount(config.tablet.count);
    } else {
      setDisplayCount(config.desktop.count);
    }
  }, [config]);

  useEffect(() => {
    updateDisplayCount();
    
    window.addEventListener('resize', updateDisplayCount);
    return () => window.removeEventListener('resize', updateDisplayCount);
  }, [updateDisplayCount]);

  return displayCount;
};