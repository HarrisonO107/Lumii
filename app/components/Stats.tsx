"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ value, direction = "up" }: { value: number; direction?: "up" | "down" }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(Number(latest.toFixed(0)));
      }
    });
  }, [springValue]);

  return <span ref={ref} />;
}

export default function Stats() {
  return (
    <section className="py-16 bg-[#FAFAFA] overflow-hidden">
      <div className="mx-auto" style={{ maxWidth: 1300, padding: "0 40px" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* STAT 1: Rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group p-8 md:p-10 rounded-[28px] bg-white border border-black/5 flex flex-col items-center text-center overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-52 h-52 bg-pink-100/50 rounded-full blur-[80px] group-hover:bg-pink-200/50 transition-colors duration-700" />

            <p className="text-[10px] font-bold tracking-[0.3em] text-slate-400 uppercase mb-6">
              Average Satisfaction
            </p>

            <div className="flex items-baseline gap-1.5 mb-3">
              <h2 className="text-[60px] md:text-[72px] font-serif leading-none tracking-tighter text-slate-900">
                <Counter value={4} />.<Counter value={9} />
              </h2>
              <span className="text-[20px] font-serif text-pink-500">/5</span>
            </div>

            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-pink-500 text-base">✦</span>
              ))}
            </div>

            <p className="text-slate-500 text-[13px] max-w-[25ch]">
              Based on over 2,400+ verified beauty analysis sessions.
            </p>
          </motion.div>

          {/* STAT 2: Community */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative group p-8 md:p-10 rounded-[28px] bg-white border border-black/5 flex flex-col items-center text-center overflow-hidden"
          >
            <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-purple-100/50 rounded-full blur-[80px] group-hover:bg-purple-200/50 transition-colors duration-700" />

            <p className="text-[10px] font-bold tracking-[0.3em] text-slate-400 uppercase mb-6">
              Global Community
            </p>

            <div className="flex items-baseline gap-1 mb-4">
              <h2 className="text-[60px] md:text-[72px] font-serif leading-none tracking-tighter text-slate-900">
                <Counter value={18} />k
              </h2>
              <span className="text-[32px] font-serif text-slate-300">+</span>
            </div>

            {/* Avatar Stack */}
            <div className="flex -space-x-2.5 mb-5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white bg-pink-500 flex items-center justify-center text-[9px] text-white font-bold">
                +2k
              </div>
            </div>

            <p className="text-slate-500 text-[13px] max-w-[28ch]">
              Girls already glowing up with Lumii's personalized AI engine.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}