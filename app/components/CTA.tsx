"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { slideInLeft, slideInRight } from "../lib/animations";

export default function CTA() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 px-8">
      <div className="mx-auto" style={{ maxWidth: 1300 }}>
        <div className="rounded-[32px] overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[500px]">

          {/* ── Left — Copy ── */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="p-12 md:p-16 flex flex-col justify-center"
            style={{ background: "#FAFAFA" }}
          >
            <p
              className="text-[10px] font-semibold tracking-[0.28em] uppercase mb-5"
              style={{ color: "#F9A8C9" }}
            >
              Ready?
            </p>

            <h2 className="text-[38px] md:text-[52px] font-medium leading-tight tracking-[-0.02em] mb-5 text-slate-900">
              Ready to discover your glow-up?
            </h2>

            <p className="text-slate-400 text-[14px] leading-relaxed mb-10 font-light max-w-[34ch]">
              Join thousands of girls discovering their best look with AI beauty advice built for their actual face.
            </p>

            <div className="flex items-center gap-5">
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: "#1a1a1a" }}
                whileTap={{ scale: 0.97 }}
                className="bg-slate-900 text-white font-semibold text-[13px] px-7 py-3.5 rounded-full transition-colors tracking-[0.01em]"
              >
                Join the Waitlist →
              </motion.button>
              <span className="text-slate-300 text-[12px] font-light">
                
              </span>
            </div>
          </motion.div>

          {/* ── Right — Abstract beauty panel ── */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative min-h-[320px] overflow-hidden flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #FDF2F8 0%, #F9A8C9 40%, #F472B6 70%, #EC4899 100%)",
            }}
          >
            {/* Decorative floating elements */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Large soft circle */}
              <div
                className="absolute rounded-full"
                style={{
                  width: 300,
                  height: 300,
                  top: "-10%",
                  right: "-5%",
                  background: "rgba(255,255,255,0.15)",
                  filter: "blur(40px)",
                }}
              />
              {/* Small accent circle */}
              <div
                className="absolute rounded-full"
                style={{
                  width: 150,
                  height: 150,
                  bottom: "10%",
                  left: "10%",
                  background: "rgba(255,255,255,0.1)",
                  filter: "blur(30px)",
                }}
              />
            </div>

            {/* Floating glassmorphism card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[24px] p-6 w-[240px]"
              style={{
                background: "rgba(255,255,255,0.25)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.35)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
              }}
            >
              {/* Mini score display */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p
                    className="text-[9px] font-semibold tracking-[0.2em] uppercase mb-1"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    Your Score
                  </p>
                  <p className="text-[32px] font-light text-white leading-none tracking-[-1px]">
                    92
                  </p>
                </div>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M2 8.5L5.5 12L14 3.5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Mini progress items */}
              {["Face mapped", "Routine built", "Tips ready"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 8 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-2.5 mb-2"
                >
                  <div
                    className="w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.6)" }}
                  />
                  <span
                    className="text-[11px] font-light flex-1"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    {item}
                  </span>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="rgba(255,255,255,0.6)"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              ))}
            </motion.div>

            {/* Sparkle accents */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute"
              style={{ top: "18%", right: "20%", color: "rgba(255,255,255,0.4)", fontSize: 18 }}
            >
              ✦
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute"
              style={{ bottom: "22%", right: "30%", color: "rgba(255,255,255,0.25)", fontSize: 12 }}
            >
              ✦
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
