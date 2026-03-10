"use client";

import { motion } from "framer-motion";

const ROW_1 = [
  "Face Analysis", "Skin Care", "Glow Up", "Hair Care", "Confidence",
  "Undertone", "Your Best Self", "Symmetry", "Beauty", "Face Shape"
];

const ROW_2 = [
  "AI Advisor", "Personalised", "Routine", "Skin Type",
  "Makeup", "Luminosity", "Glow", "Expert Advice", "Precise"
];

function MarqueeRow({
  items,
  direction,
}: {
  items: string[];
  direction: "left" | "right";
}) {
  // Determine start and end points based on direction
  const xTranslation = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div
      className="overflow-hidden py-3 select-none"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <motion.div
        className="flex whitespace-nowrap items-center w-max"
        animate={{ x: xTranslation }}
        transition={{
          duration: 35, // Adjust for speed
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* We double the items array to create the seamless loop effect */}
        {[...items, ...items].map((item, j) => (
          <div key={j} className="flex items-center gap-8 px-8">
            <span
              className="text-slate-400/60 uppercase"
              style={{
                fontSize: 12,
                fontWeight: 400,
                letterSpacing: "0.25em",
              }}
            >
              {item}
            </span>
            {/* Elegant pink dot separator */}
            <div className="w-1 h-1 rounded-full bg-pink-300/40 shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="bg-white py-2 border-y border-black/[0.03]">
      <MarqueeRow items={ROW_1} direction="left" />
      <MarqueeRow items={ROW_2} direction="right" />
    </section>
  );
}