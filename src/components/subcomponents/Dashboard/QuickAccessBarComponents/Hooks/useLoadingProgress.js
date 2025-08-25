import { useState, useEffect } from 'react';

export const useLoadingProgress = (isLoading) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (isLoading) {
      setProgress(5); // Start at 5%
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            return prev; // Stop at 95% to avoid reaching 100% prematurely
          }
          return prev + Math.random() * 10; // Increment by random small steps
        });
      }, 300);
    } else {
      setProgress(0); // Reset progress when not loading
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  return progress;
};