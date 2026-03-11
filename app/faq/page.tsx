"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    category: "Product",
    items: [
      {
        q: "What is Lumii?",
        a: "Lumii is an AI-powered beauty advisor that analyses your face to give you a personalised Glow Score and skincare routine. Upload a photo, and our engine scans 47 facial data points — texture, tone, symmetry, hydration, and more — to build a routine designed specifically for your skin.",
      },
      {
        q: "Is Lumii a dermatologist?",
        a: "No. Lumii is an AI tool for self-knowledge and skincare guidance, not a medical device. Our model has been validated against dermatologist assessments with 89% concordance, but it does not replace professional medical advice. If you have skin concerns, please consult a dermatologist.",
      },
      {
        q: "When is Lumii launching?",
        a: "We're currently in closed beta. Join the waitlist and you'll be among the first to access Lumii when we open — at no cost. We'll email you before anyone else.",
      },
      {
        q: "Will Lumii be free?",
        a: "Lumii will be free to use at launch for waitlist members. We plan to introduce a premium tier later with advanced features like progress tracking and detailed product recommendations.",
      },
    ],
  },
  {
    category: "Privacy & Data",
    items: [
      {
        q: "Does Lumii store my photos?",
        a: "No. Your photos are processed entirely in memory and immediately discarded after analysis. We do not store, retain, share, or use your facial imagery for any purpose whatsoever.",
      },
      {
        q: "Is my data safe?",
        a: "Yes. We only store your email address (to send your waitlist confirmation and launch notification) and your Glow Score history — not the photos used to generate it. All data is encrypted at rest and in transit.",
      },
      {
        q: "Do you sell my data?",
        a: "Never. We will not sell, rent, or share your personal data with third parties for advertising or any other commercial purpose.",
      },
    ],
  },
  {
    category: "Analysis",
    items: [
      {
        q: "How accurate is the AI analysis?",
        a: "Our model has been validated against expert dermatologist assessments with 89% concordance across key skin metrics. Accuracy improves with photo quality — clear lighting and no filters give the best results.",
      },
      {
        q: "Will it work on my skin tone?",
        a: "Yes. Lumii is trained on diverse skin tones across all six Fitzpatrick types, and we run quarterly bias audits to ensure accuracy is consistent regardless of skin tone or ethnicity. We take this seriously and actively address any imbalances found.",
      },
      {
        q: "What makes a good photo for analysis?",
        a: "Use natural lighting, face the camera straight on, and remove heavy makeup if possible. Avoid strong filters. A simple, well-lit selfie gives the most accurate results.",
      },
      {
        q: "How often should I scan?",
        a: "We recommend scanning once a week or once a fortnight. Skin changes slowly, so daily scans won't show meaningful differences. Weekly scans are ideal for tracking how your routine is working.",
      },
    ],
  },
  {
    category: "Routines",
    items: [
      {
        q: "How does Lumii build my routine?",
        a: "Based on your scan results — skin type, undertone, key concerns, Glow Score breakdown — Lumii assembles a morning and evening routine using evidence-backed ingredients and steps. The routine is ordered correctly (active ingredients, barriers, SPF) and accounts for compatibility between ingredients.",
      },
      {
        q: "Will Lumii recommend specific products?",
        a: "At launch, Lumii provides ingredient-level guidance and product type recommendations. Specific product recommendations (with links) are coming in a future update. We are building this independently — brands cannot pay to be recommended.",
      },
      {
        q: "What if I'm a beginner?",
        a: "Lumii is designed for all experience levels. If you're new to skincare, your routine will be simple and clearly explained. More experienced users will receive more nuanced guidance including scheduling for actives like retinol and exfoliants.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="py-5 cursor-pointer group"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-[14px] font-light text-white/70 group-hover:text-white/90 transition-colors leading-[1.5]">{q}</p>
        <div
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 transition-all"
          style={{
            background: open ? "rgba(249,168,201,0.15)" : "rgba(255,255,255,0.05)",
            border: open ? "1px solid rgba(249,168,201,0.3)" : "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <motion.svg
            width="10" height="10" viewBox="0 0 10 10" fill="none"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <path d="M5 1v8M1 5h8" stroke={open ? "#F9A8C9" : "#ffffff80"} strokeWidth="1.4" strokeLinecap="round" />
          </motion.svg>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-[13px] text-white/35 font-light leading-[1.8] pt-3 pr-8">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#060308]">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 md:px-20 max-w-[860px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/30 mb-4">FAQ</p>
          <h1 className="text-[52px] md:text-[72px] font-light text-white leading-[0.95] tracking-[-0.02em] mb-6">
            Questions,<br />
            <span className="italic" style={{ color: "#F9A8C9" }}>answered.</span>
          </h1>
          <p className="text-[15px] text-white/40 font-light max-w-[420px] leading-[1.7]">
            Everything you need to know about Lumii. Can't find what you're looking for? Reach out via our contact page.
          </p>
        </motion.div>
      </section>

      {/* FAQ sections */}
      <section className="px-6 md:px-20 max-w-[860px] mx-auto pb-28">
        {faqs.map((section, si) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: si * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-white/25 mb-2 pb-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              {section.category}
            </p>
            {section.items.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </motion.div>
        ))}
      </section>

      {/* Contact CTA */}
      <section
        className="mx-6 md:mx-20 mb-20 rounded-[28px] px-8 md:px-14 py-12"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <p className="text-[16px] font-light text-white/60 mb-1">Still have questions?</p>
        <p className="text-[13px] text-white/30 font-light mb-6">We read every message. Usually reply within 24 hours.</p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 text-[13px] font-medium px-5 py-2.5 rounded-full"
          style={{
            background: "rgba(249,168,201,0.1)",
            border: "1px solid rgba(249,168,201,0.2)",
            color: "#F9A8C9",
          }}
        >
          Get in touch
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M1 5h10M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </section>
    </main>
  );
}
