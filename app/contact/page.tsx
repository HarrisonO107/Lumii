"use client";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#060308]">
      <section className="pt-32 pb-16 px-6 md:px-20 max-w-[1000px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/30 mb-4">Contact</p>
          <h1 className="text-[52px] md:text-[72px] font-light text-white leading-[0.95] tracking-[-0.02em] mb-6">
            Say hello.<br />
            <span className="italic" style={{ color: "#F9A8C9" }}>We're listening.</span>
          </h1>
          <p className="text-[15px] text-white/40 font-light max-w-[400px] leading-[1.7]">
            We read every message and reply within 24 hours. No support bots, no ticket system — just us.
          </p>
        </motion.div>
      </section>

      <section className="px-6 md:px-20 max-w-[1000px] mx-auto pb-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[28px] p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div>
            <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-white/25 mb-3">Get in touch</p>
            <a
              href="mailto:help@lumiiapp.com"
              className="text-[22px] md:text-[28px] font-light transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.85)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F9A8C9")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
            >
              help@lumiiapp.com
            </a>
            <p className="text-[12px] text-white/25 font-light mt-2">
              Product questions, feedback, partnerships & support
            </p>
          </div>

          <motion.a
            href="mailto:help@lumiiapp.com"
            whileHover={{ scale: 1.02, boxShadow: "0 6px 28px rgba(0,0,0,0.35)" }}
            whileTap={{ scale: 0.97 }}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[13px] font-semibold"
            style={{ background: "#fff", color: "#0d0612" }}
          >
            Send an email
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="#0d0612" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-[11px] text-white/20 font-light mt-8 leading-[1.8] max-w-[480px]"
        >
          Lumii is a small team building something we genuinely believe in. Every message gets read by a real person. We're especially grateful for honest feedback — good or bad.
        </motion.p>
      </section>
    </main>
  );
}
