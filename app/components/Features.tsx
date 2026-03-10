"use client";

import { useMemo, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

type FeatureCard = {
  tag: string;
  title: string;
  description: string;
  accent: string;
  bg: string;
  ui: React.ReactNode;
};

const CARDS: FeatureCard[] = [
  {
    tag: "FACE ANALYSIS",
    title: "Your face is a map. We just read it.",
    description:
      "Lumii analyzes key facial landmarks to understand your unique geometry — so your plan is built for your face, not a template.",
    accent: "#FF914D",
    bg: "#FFF4ED",
    ui: (
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-white p-6">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-slate-400 uppercase mb-4">
          Face shape confidence
        </p>
        {[
          ["Oval", 82],
          ["Heart", 12],
          ["Square", 6],
        ].map(([label, pct]) => (
          <div key={String(label)} className="flex items-center gap-3 mb-3">
            <span className="w-14 text-[12px] text-slate-500">{label as string}</span>
            <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full rounded-full bg-black/70" style={{ width: `${pct}%` }} />
            </div>
            <span className="w-10 text-right text-[12px] text-slate-400">{pct as number}%</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    tag: "SKINCARE",
    title: "A routine that fits your skin, not TikTok.",
    description:
      "Your AM/PM steps are generated from your skin type, sensitivity and goals — with exact product categories and order.",
    accent: "#7C3AED",
    bg: "#F3F0FF",
    ui: (
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-white p-6">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-slate-400 uppercase mb-4">
          Morning routine
        </p>
        {["Cleanser", "Vitamin C", "Moisturiser", "SPF 50"].map((step, i) => (
          <div key={step} className="flex items-center gap-3 mb-3">
            <span className="w-6 h-6 rounded-full bg-black/5 text-slate-700 text-[11px] font-semibold flex items-center justify-center">
              {i + 1}
            </span>
            <span className="text-[13px] text-slate-700 font-medium">{step}</span>
            <span className="ml-auto text-[12px] text-slate-400">✓</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    tag: "MAKEUP",
    title: "Makeup mapped to your features.",
    description:
      "Placement changes everything. Lumii tells you where to apply, what to avoid, and which techniques flatter your structure.",
    accent: "#FF4D7D",
    bg: "#FFF0F5",
    ui: (
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-white p-6">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-slate-400 uppercase mb-4">
          Technique picks
        </p>
        {["Soft contour", "Lifted blush placement", "Brow shape", "Lip shape"].map((tip) => (
          <div key={tip} className="flex items-center gap-3 mb-3">
            <span className="text-[14px] text-black/50">✦</span>
            <span className="text-[13px] text-slate-700 font-medium">{tip}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    tag: "HAIR",
    title: "Hair that balances your proportions.",
    description:
      "Cuts, parts and styles change perceived symmetry. Lumii recommends what suits your face shape and hair profile.",
    accent: "#16A34A",
    bg: "#EDFFF5",
    ui: (
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-white p-6">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-slate-400 uppercase mb-4">
          Hair profile
        </p>
        {[
          ["Type", "2B Wavy"],
          ["Porosity", "Medium-High"],
          ["Density", "High"],
          ["Scalp", "Normal"],
        ].map(([k, v]) => (
          <div key={String(k)} className="flex items-center justify-between mb-3">
            <span className="text-[13px] text-slate-500">{k as string}</span>
            <span className="text-[12px] font-medium text-slate-700 bg-black/5 px-3 py-1 rounded-full">
              {v as string}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    tag: "STYLE",
    title: "Aesthetic direction you can actually execute.",
    description:
      "Lumii helps you find a coherent look — colours, silhouettes and references — so you stop drifting between trends.",
    accent: "#3B82F6",
    bg: "#EFF6FF",
    ui: (
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-white p-6">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-slate-400 uppercase mb-4">
          Your aesthetic
        </p>
        {[
          ["Clean Girl", 94],
          ["Soft Glam", 78],
          ["Coastal", 61],
        ].map(([label, pct]) => (
          <div key={String(label)} className="flex items-center gap-3 mb-3">
            <span className="w-24 text-[12px] text-slate-500">{label as string}</span>
            <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full rounded-full bg-black/70" style={{ width: `${pct}%` }} />
            </div>
            <span className="w-10 text-right text-[12px] text-slate-400">{pct as number}%</span>
          </div>
        ))}
      </div>
    ),
  },
];

/**
 * LEFT: pinned copy that changes per scroll segment
 */
function FeatureCopy({
  card,
  i,
  progress,
  total,
}: {
  card: FeatureCard;
  i: number;
  progress: MotionValue<number>;
  total: number;
}) {
  const start = i / total;
  const end = (i + 1) / total;

  const isLast = i === total - 1;
  const opacityInputRange = isLast
    ? [start, start + 0.08]
    : [start, start + 0.08, end - 0.08, end];
  const opacityOutputRange = isLast ? [0, 1] : [0, 1, 1, 0];
  const opacity = useTransform(progress, opacityInputRange, opacityOutputRange);
  const y = useTransform(progress, [start, start + 0.1], [14, 0]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0">
      <div className="flex items-center gap-3 mb-4">
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{ backgroundColor: card.accent }}
        />
        <p className="text-[11px] font-semibold tracking-[0.22em] text-slate-500 uppercase">
          {card.tag}
        </p>
      </div>

      <h3 className="text-[44px] md:text-[52px] font-medium tracking-[-0.02em] text-slate-900 leading-[1.05]">
        {card.title}
      </h3>

      <p className="mt-6 text-[16px] md:text-[18px] text-slate-500 leading-relaxed max-w-[38ch]">
        {card.description}
      </p>
    </motion.div>
  );
}

/**
 * RIGHT: stacked panels that scale/rotate/fade
 */
function FeaturePanel({
  card,
  i,
  progress,
  total,
}: {
  card: FeatureCard;
  i: number;
  progress: MotionValue<number>;
  total: number;
}) {
  const start = i / total;
  const mid = start + 1 / total / 2;
  const end = (i + 1) / total;

  const isLast = i === total - 1;
  const opacityInputRange = isLast
    ? [start - 0.08, start]
    : [start - 0.08, start, end - 0.06, end];
  const opacityOutputRange = isLast ? [0, 1] : [0, 1, 1, 0];
  const opacity = useTransform(progress, opacityInputRange, opacityOutputRange);
  const scale = useTransform(progress, [start - 0.15, mid, end + 0.1], [0.92, 1, 0.96]);
  const y = useTransform(progress, [start - 0.1, mid, end + 0.1], [22, 0, -12]);
  const rotate = useTransform(progress, [start, end], [i % 2 === 0 ? 1.2 : -1.2, 0]);

  const zIndex = 50 + i;

  return (
    <motion.div
      style={{
        opacity,
        scale,
        y,
        rotate,
        backgroundColor: card.bg,
        zIndex,
      }}
      className="absolute inset-0 rounded-[44px] border border-white/60 shadow-[0_40px_120px_rgba(0,0,0,0.08)] overflow-hidden"
    >
      <div className="p-10 pb-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: card.accent }}
            />
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-slate-700/70">
              {card.tag}
            </p>
          </div>
          <div className="text-[11px] text-slate-500/70 font-medium">
            Lumii Engine
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-[22px] md:text-[24px] font-medium tracking-[-0.01em] text-slate-900 leading-snug">
            {card.title}
          </h4>
        </div>
      </div>

      <div className="p-10 pt-8 h-full flex flex-col">
        <div className="flex-1 flex flex-col">
          {card.ui}
        </div>
        <div className="mt-8 h-10 bg-gradient-to-b from-transparent to-black/5 rounded-2xl" />
      </div>
    </motion.div>
  );
}

export default function Features() {
  const containerRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  const vhPerCard = 95;
  const endBufferVh = 40;
  const sectionHeight = `${CARDS.length * vhPerCard + endBufferVh}vh`;

  const items = useMemo(() => CARDS, []);

  return (
    <section
      ref={containerRef}
      id="features"
      className="relative"
      style={{
        height: sectionHeight,
        /* Ensure no parent overflow clips the sticky */
        contain: "none",
      }}
    >
      {/*
        The sticky container uses inset-0 width (not max-w constrained)
        so the background fills edge-to-edge.
      */}
      <div
        className="sticky top-0 h-screen w-screen overflow-hidden"
        style={{ background: "#FAFAFA" }}
      >
        {/* Inner content container with max-width */}
        <div className="mx-auto h-full" style={{ maxWidth: 1300, padding: "0 40px" }}>
          <div className="h-full grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            {/* LEFT */}
            <div className="relative w-full">
              <p className="mb-6 text-[11px] font-semibold tracking-[0.26em] text-pink-500 uppercase">
                The Lumii Engine
              </p>

              <div className="relative h-[260px] md:h-[320px]">
                {items.map((card, i) => (
                  <FeatureCopy
                    key={card.tag}
                    card={card}
                    i={i}
                    progress={smooth}
                    total={items.length}
                  />
                ))}
              </div>

              <div className="mt-10 flex items-center gap-3 text-slate-400">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-[12px] font-medium">Scroll</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative w-full h-[70vh] md:h-[74vh] flex items-center justify-center">
              <div
                className="absolute inset-0"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                  maskImage:
                    "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                }}
              >
                <div className="relative w-full h-full">
                  {items.map((card, i) => (
                    <FeaturePanel
                      key={card.tag}
                      card={card}
                      i={i}
                      progress={smooth}
                      total={items.length}
                    />
                  ))}
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-[48px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
