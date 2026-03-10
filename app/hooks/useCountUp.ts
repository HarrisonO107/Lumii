import { useEffect, useState } from "react";

export function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let rafId: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) { rafId = requestAnimationFrame(step); }
    };

    rafId = requestAnimationFrame(step);
    return () => { if (rafId !== null) cancelAnimationFrame(rafId); };
  }, [start, target, duration]);

  return count;
}