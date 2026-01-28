import { useEffect, useState } from "react";

export function loadingDuration(durationMs = 15000) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = 99;
    const intervalMs = 100;
    const steps = durationMs / intervalMs;
    const increment = target / steps;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= target) {
          clearInterval(interval);
          return target;
        }
        return Math.min(prev + increment, target);
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [durationMs]);

  return Math.round(progress);
}
