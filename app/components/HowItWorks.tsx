"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeUp } from "../lib/animations";

const steps = [
  {
    accent: "bg-pink-500",
    card: "bg-pink-50",
    title: "Upload your photo",
    desc: "Take a selfie or upload any clear photo. Our AI reads your unique facial features in under 3 seconds.",
    ui: (
      <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
        <p className="text-[10px] text-gray-400 font-semibold tracking-widest uppercase">Photo Upload</p>
        <div className="bg-gray-50 rounded-xl h-24 flex flex-col items-center justify-center gap-1.5 border-2 border-dashed border-gray-200">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round"/></svg>
          <p className="text-[11px] text-gray-300 font-medium">Drop photo here</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 rounded-xl p-3">
          <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px]">✓</span>
          <span className="text-[11px] font-medium text-green-700">Photo ready for analysis</span>
        </div>
      </div>
    ),
  },
  {
    accent: "bg-purple-500",
    card: "bg-purple-50",
    title: "AI reads your face",
    desc: "Face shape, skin type, undertone, symmetry score, and your three strongest features.",
    ui: (
      <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
        <p className="text-[10px] text-gray-400 font-semibold tracking-widest uppercase">Analysis Results</p>
        {[["Face Shape", "Oval", "text-purple-600 bg-purple-50"], ["Skin Type", "Combination", "text-blue-600 bg-blue-50"], ["Undertone", "Warm", "text-orange-600 bg-orange-50"]].map(([l, v, c]) => (
          <div key={l} className="flex justify-between items-center">
            <span className="text-[12px] text-gray-500">{l}</span>
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${c}`}>{v}</span>
          </div>
        ))}
        <div className="flex gap-1.5 flex-wrap pt-1">
          {["Eyes ✦", "Cheekbones ✦", "Lips ✦"].map(f => (
            <span key={f} className="text-[10px] bg-purple-50 text-purple-600 border border-purple-200 px-2 py-0.5 rounded-full font-medium">{f}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    accent: "bg-orange-500",
    card: "bg-orange-50",
    title: "Get your plan",
    desc: "Skincare, makeup, and hair advice built for your actual face — not a template.",
    ui: (
      <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2">
        <p className="text-[10px] text-gray-400 font-semibold tracking-widest uppercase">Your Glow-Up Plan</p>
        {["Morning Skincare Routine", "Evening Routine", "Makeup Tips", "Hair Advice"].map((item, i) => (
          <div key={item} className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-[10px] font-bold flex-shrink-0">{i + 1}</span>
            <span className="text-[12px] text-gray-700 font-medium">{item}</span>
            <span className="ml-auto text-green-500 text-[11px]">✓</span>
          </div>
        ))}
        <div className="bg-orange-500 rounded-xl p-2.5 text-white text-center mt-2">
          <p className="text-[12px] font-bold">Your plan is ready ✦</p>
        </div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" ref={ref} className="py-32 px-8 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"} className="mb-20">
          <motion.p variants={fadeUp} className="text-[10px] font-semibold tracking-[0.28em] uppercase mb-4" style={{ color: "#F9A8C9" }}>
            How it works
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-[48px] md:text-[72px] font-medium tracking-[-0.02em] leading-none text-slate-900">
            Simple. Fast. Personal.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              variants={{
                hidden: { opacity: 0, x: i === 0 ? -60 : i === 2 ? 60 : 0, y: i === 1 ? 40 : 0 },
                visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const } },
              }}
            >
              <div className={`${step.card} rounded-3xl p-5 mb-6`}>{step.ui}</div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`w-8 h-8 rounded-full ${step.accent} text-white text-[12px] font-black flex items-center justify-center flex-shrink-0`}>
                  {i + 1}
                </span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <h3 className="text-[20px] font-medium mb-2 tracking-[-0.01em] text-slate-900">{step.title}</h3>
              <p className="text-slate-400 text-[14px] leading-relaxed font-light">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}