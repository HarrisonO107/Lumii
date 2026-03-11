"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "Upload a photo",
    body: "Take or upload a clear photo of your face — no filters, no makeup required. Our engine works best with natural lighting.",
    detail: "Supported: JPG, PNG, HEIC · Max 20MB · Front-facing only",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="8" width="24" height="18" rx="3" stroke="#F9A8C9" strokeWidth="1.5" />
        <circle cx="16" cy="17" r="5" stroke="#F9A8C9" strokeWidth="1.5" />
        <path d="M12 8V7a2 2 0 012-2h4a2 2 0 012 2v1" stroke="#F9A8C9" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="17" r="2" fill="#F9A8C9" opacity="0.4" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "AI scans your face",
    body: "Our proprietary model analyses 47 facial data points — skin texture, pore size, symmetry, undertone, hydration markers, and more — in under 10 seconds.",
    detail: "Powered by Lumii Engine v2 · Processes locally · Never stored",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <ellipse cx="16" cy="16" rx="8" ry="11" stroke="#F9A8C9" strokeWidth="1.5" />
        <circle cx="12" cy="13" r="2.5" stroke="#F9A8C9" strokeWidth="1.2" />
        <circle cx="20" cy="13" r="2.5" stroke="#F9A8C9" strokeWidth="1.2" />
        <path d="M13 20q3 3 6 0" stroke="#F9A8C9" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path d="M4 10h3M25 10h3M4 22h3M25 22h3" stroke="#F9A8C9" strokeWidth="1" strokeLinecap="round" strokeDasharray="1 2" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Get your Glow Score",
    body: "Receive a personalised score out of 100, broken down across 5 key dimensions: luminosity, clarity, evenness, hydration, and texture.",
    detail: "Updated every time you scan · Tracks your progress over time",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="11" stroke="#F9A8C9" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.4" />
        <circle cx="16" cy="16" r="7" stroke="#F9A8C9" strokeWidth="1.5" />
        <path d="M16 9v7l4 2" stroke="#F9A8C9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Your personalised routine",
    body: "Lumii builds a complete morning and evening skincare routine specifically for your face — the right ingredients, in the right order, at the right frequency.",
    detail: "Ingredient-level guidance · Retinol scheduling · Product suggestions",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="10" y="4" width="8" height="4" rx="2" stroke="#F9A8C9" strokeWidth="1.5" />
        <rect x="6" y="7" width="20" height="20" rx="3" stroke="#F9A8C9" strokeWidth="1.5" />
        <path d="M10 15h12M10 19h8M10 23h10" stroke="#F9A8C9" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M8 8h1" stroke="#F9A8C9" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

const faqs = [
  { q: "Does Lumii store my photos?", a: "No. Your photos are processed in memory and immediately discarded. We never retain, store, or use your facial imagery for any purpose." },
  { q: "How accurate is the AI analysis?", a: "Our model has been validated against dermatologist assessments with 89% concordance. It's a starting point for self-knowledge, not a medical diagnosis." },
  { q: "Will it work on my skin tone?", a: "Yes — Lumii is trained on diverse skin tones across all six Fitzpatrick types. We actively audit for bias across skin tones and ethnicities." },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#060308]">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 md:px-20 max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/30 mb-4">How it works</p>
          <h1 className="text-[52px] md:text-[72px] font-light text-white leading-[0.95] tracking-[-0.02em] mb-6">
            Science-backed beauty,<br />
            <span className="italic" style={{ color: "#F9A8C9" }}>built around you.</span>
          </h1>
          <p className="text-[15px] text-white/40 font-light max-w-[480px] leading-[1.7]">
            Lumii combines computer vision and dermatological science to give you the kind of personalised skin analysis that used to cost hundreds at a clinic.
          </p>
        </motion.div>
      </section>

      {/* Steps */}
      <section className="px-6 md:px-20 max-w-[1100px] mx-auto pb-28">
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-[19px] md:left-[15px] top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-white/8 to-transparent hidden sm:block" />

          <div className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-8 md:gap-14 py-10 border-b border-white/5 last:border-0 group"
              >
                <div className="flex-shrink-0 flex flex-col items-center gap-3 pt-1">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(249,168,201,0.08)",
                      border: "1px solid rgba(249,168,201,0.15)",
                    }}
                  >
                    {step.icon}
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-[10px] font-mono text-white/20">{step.num}</span>
                    <h2 className="text-[22px] md:text-[28px] font-light text-white tracking-[-0.01em]">{step.title}</h2>
                  </div>
                  <p className="text-[14px] text-white/45 font-light leading-[1.75] max-w-[540px] mb-3">{step.body}</p>
                  <p className="text-[11px] font-mono text-white/20 tracking-[0.06em]">{step.detail}</p>
                </div>
                <div className="hidden md:flex items-center flex-shrink-0">
                  <span
                    className="text-[80px] font-extralight tracking-[-4px] select-none"
                    style={{ color: "rgba(249,168,201,0.06)" }}
                  >
                    {step.num}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section
        className="mx-6 md:mx-20 mb-20 rounded-[28px] px-8 md:px-14 py-12"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-white/25 mb-8">Quick answers</p>
        <div className="flex flex-col divide-y divide-white/5">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="py-5"
            >
              <p className="text-[14px] font-medium text-white/70 mb-2">{faq.q}</p>
              <p className="text-[13px] text-white/35 font-light leading-[1.7]">{faq.a}</p>
            </motion.div>
          ))}
        </div>
        <Link
          href="/faq"
          className="inline-flex items-center gap-2 mt-6 text-[12px] text-white/30 hover:text-white/60 transition-colors"
        >
          See all FAQs
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M1 5h10M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </section>
    </main>
  );
}
