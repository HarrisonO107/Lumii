import { useScroll, useTransform, useSpring } from "framer-motion";
import { RefObject } from "react";

export function useParallax(ref: RefObject<HTMLElement | null>, offset = 20) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const y = useTransform(smooth, [0, 1], ["0%", `${offset}%`]);
  return y;
}