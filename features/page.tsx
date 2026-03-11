"use client";
import { motion } from "framer-motion";

const features = [
  {
    tag: "Analysis",
    title: "47-point facial scan",
    body: "Our engine maps your face across 47 data points — pore density, melanin distribution, hydration markers, sebum levels, facial symmetry, and more. The most comprehensive AI skin analysis available.",
    metrics: [{ label: "Data points", val: "47" }, { label: "Accuracy", val: "89%" }, { label: "Scan time", val: "<10s" }],
    accent: "#F9A8C9",
  },
  {
    tag: "Scoring",
    title: "Your Glow Score",
    body: "A single number — out of 100 — that captures your skin's overall health and radiance. Broken down across five dimensions so you know exactly where to focus. Updated every scan.",
    metrics: [{ label: "Dimensions", val: "5" }, { label: "Top 8%", val: "score 90+" }, { label: "Updates", val: "Real-time" }],
    accent: "#f472b6",
  },
  {
    tag: "Personalisation",
    title: "Routines built for your face",
    body: "Not a generic 10-step routine. Lumii builds a morning and evening routine tailored to your specific skin type, undertone, concerns, and goals. Ingredient-level, in the right order.",
    metrics: [{ label: "Routine steps", val: "4–7" }, { label: "Ingredients", val: "Curated" }, { label: "Scheduling", val: "Smart" }],
    accent: "#c084fc",
  },
  {
    tag: "Progress",
    title: "Track your skin over time",
    body: "Scan weekly or monthly to see how your routine is working. Lumii tracks your Glow Score history, shows which dimensions improved, and adjusts your routine as your skin changes.",
    metrics: [{ label: "History", val: "Unlimited" }, { label: "Trends", val: "Weekly" }, { label: "Adjustments", val: "Automatic" }],
    accent: "#60a5fa",
  },
  {
    tag: "Privacy",
    title: "Your photos never leave your device",
    body: "All facial analysis is processed in memory and immediately discarded. We never store, share, or use your photos. Your face is yours — full stop.",
    metrics: [{ label: "Storage", val: "None" }, { label: "Sharing", val: "Never" }, { label: "Retention", val: "0 seconds" }],
    accent: "#34d399",
  },
  {
    tag: "Diversity",
    title: "Built for all skin tones",
    body: "Lumii is trained and audited across all six Fitzpatrick skin types. We actively test for algorithmic bias and update our model to ensure accuracy regardless of skin tone or ethnicity.",
    metrics: [{ label: "Skin types", val: "All 6" }, { label: "Bias audits", val: "Quarterly" }, { label: "Coverage", val: "Global" }],
    accent: "#fbbf24",
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#060308]">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 md:px-20 max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/30 mb-4">Features</p>
          <h1 className="text-[52px] md:text-[72px] font-light text-white leading-[0.95] tracking-[-0.02em] mb-6">
            Everything your skin<br />
            <span className="italic" style={{ color: "#F9A8C9" }}>has been waiting for.</span>
          </h1>
          <p className="text-[15px] text-white/40 font-light max-w-[480px] leading-[1.7]">
            A complete AI beauty platform — from scan to routine to progress tracking — built with the same rigour as professional dermatology tools.
          </p>
        </motion.div>
      </section>

      {/* Feature grid */}
      <section className="px-6 md:px-20 max-w-[1100px] mx-auto pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.tag}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[24px] p-8"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Tag */}
              <div className="flex items-center justify-between mb-6">
                <span
                  className="text-[9px] font-semibold tracking-[0.28em] uppercase px-3 py-1.5 rounded-full"
                  style={{
                    color: f.accent,
                    background: `${f.accent}14`,
                    border: `1px solid ${f.accent}30`,
                  }}
                >
                  {f.tag}
                </span>
              </div>

              {/* Title + body */}
              <h2 className="text-[22px] font-light text-white tracking-[-0.01em] mb-3 leading-[1.2]">{f.title}</h2>
              <p className="text-[13px] text-white/40 font-light leading-[1.75] mb-8">{f.body}</p>

              {/* Metrics */}
              <div
                className="grid grid-cols-3 gap-3 pt-6"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
              >
                {f.metrics.map(({ label, val }) => (
                  <div key={label}>
                    <p className="text-[18px] font-light tracking-[-0.02em] mb-0.5" style={{ color: f.accent }}>{val}</p>
                    <p className="text-[10px] text-white/25 font-light leading-tight">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section
        className="mx-6 md:mx-20 mb-20 rounded-[28px] px-8 md:px-14 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        style={{
          background: "linear-gradient(135deg, rgba(249,168,201,0.07), rgba(192,132,252,0.05))",
          border: "1px solid rgba(249,168,201,0.12)",
        }}
      >
        <div>
          <p className="text-[22px] font-light text-white tracking-[-0.01em] mb-1">Ready to see your Glow Score?</p>
          <p className="text-[13px] text-white/35 font-light">Join the waitlist — free at launch.</p>
        </div>
        <button
          className="flex-shrink-0 bg-white text-slate-900 font-semibold text-[13px] px-7 py-3.5 rounded-full shadow-lg whitespace-nowrap"
          onClick={() => (window as Window & { openWaitlistModal?: () => void }).openWaitlistModal?.()}
        >
          Join the waitlist →
        </button>
      </section>
    </main>
  );
}
