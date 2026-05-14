"use client";
import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    const container = containerRef.current;
    const title = titleRef.current;
    const tagline = taglineRef.current;
    if (!bg || !container || !title || !tagline) return;

    const chars = title.querySelectorAll(".pre-char");

    const tl = gsap.timeline({ onComplete });

    // Animate in
    tl.to(chars, {
      opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power3.out",
    }, 0.15);

    tl.to(tagline, {
      opacity: 1, y: 0, duration: 0.5, ease: "power3.out",
    }, 0.5);

    // Hold
    tl.to({}, { duration: 0.4 });

    // Fade content
    tl.to(container, {
      opacity: 0, y: -30, duration: 0.4, ease: "power3.inOut",
    });

    // Slide bg away
    tl.to(bg, {
      yPercent: -100, duration: 0.7, ease: "power4.inOut",
    }, "-=0.2");

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #f0d0dc 0%, #f2c8d8 30%, #eec4d0 60%, #f0ccd8 100%)" }}
    >
      <div ref={containerRef} className="flex flex-col items-center gap-4">
        <div ref={titleRef} className="flex items-baseline">
          {"lumii".split("").map((char, i) => (
            <span
              key={i}
              className="pre-char inline-block"
              style={{
                fontFamily: "var(--font-serif), serif",
                fontSize: "clamp(36px, 8vw, 64px)",
                fontWeight: 400,
                color: "#1A1A1A",
                letterSpacing: "-0.03em",
                opacity: 0,
                transform: "translateY(20px)",
              }}
            >
              {char}
            </span>
          ))}
        </div>
        <div
          ref={taglineRef}
          style={{
            fontSize: "clamp(11px, 2.5vw, 14px)",
            fontWeight: 300,
            color: "rgba(26,26,26,0.4)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            opacity: 0,
            transform: "translateY(10px)",
          }}
        >
          Built for girls, by girls.
        </div>
      </div>
    </div>
  );
}
