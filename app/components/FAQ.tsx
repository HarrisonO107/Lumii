"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeUp } from "../lib/animations";

const faqs = [
  { q: "How does the AI analysis work?", a: "You upload a photo and our vision AI analyses your facial geometry — face shape, symmetry ratios, skin tone, undertone. It cross-references 50,000+ training examples to build your unique beauty profile, then generates a personalised plan." },
  { q: "Is my photo stored or shared?", a: "Never. Your photo is processed in real-time and immediately discarded. We never store, share, or use your facial data. GDPR compliant — request full data deletion at any time." },
  { q: "How accurate is the analysis?", a: "In internal testing our model achieves 94% accuracy against professional makeup artist assessments. The more front-facing and well-lit your photo, the more precise the result." },
  { q: "Is lumii free?", a: "Your first full glow-up analysis — face shape, skin type, undertone, and a complete beauty plan — is completely free with no sign-up required." },
  { q: "What makes lumii different?", a: "Generic apps give the same advice to everyone. lumii analyses YOUR specific facial geometry and features to give recommendations that genuinely work for your face — not a template." },
  { q: "Does it work for all skin tones?", a: "Yes — our model was trained on a deliberately diverse dataset covering all Fitzpatrick skin types, ethnicities, and facial structures. We actively audit for bias in our recommendations." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" ref={ref} className="py-32 px-8 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
        <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"} className="md:sticky md:top-28">
          <motion.p variants={fadeUp} className="text-[10px] font-semibold tracking-[0.28em] uppercase mb-4" style={{ color: "#F9A8C9" }}>FAQ</motion.p>
          <motion.h2 variants={fadeUp} className="text-[44px] md:text-[56px] font-medium tracking-[-0.02em] leading-[1.05] text-slate-900">
            Frequently Asked Questions
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-400 text-[14px] mt-5 leading-relaxed font-light">
            Can't find what you need?{" "}
            <a href="#" className="text-slate-700 underline hover:text-pink-400 transition-colors">Contact us</a>
          </motion.p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"} className="flex flex-col gap-3">
          {faqs.map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="border border-gray-100 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors group"
              >
                <span className="font-medium text-[14px] pr-4 text-slate-800 group-hover:text-slate-900 transition-colors tracking-[-0.01em]">{item.q}</span>
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }} className="text-[22px] text-gray-300 flex-shrink-0 font-light leading-none">
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }} className="overflow-hidden">
                    <p className="px-6 pb-6 pt-2 text-slate-400 text-[13px] leading-relaxed border-t border-gray-50 font-light">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}