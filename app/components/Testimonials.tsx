"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeUp, scaleUp } from "../lib/animations";

const reviews = [
  { name: "Sophie M.", time: "2 days ago", stars: 5, title: "Actually specific to my face", text: "I've never had beauty advice this tailored. The routine it gave me actually cleared my skin in 3 weeks." },
  { name: "Ava T.", time: "1 week ago", stars: 5, title: "The face analysis is insane", text: "Shocked by how accurate it was. It told me heart face shape and warm undertones — exactly what my makeup artist said years ago." },
  { name: "Priya K.", time: "3 days ago", stars: 5, title: "Finally made for all skin tones", text: "Considers my skin tone and undertone properly. Feels like a personal beauty expert who understands my complexion." },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-32 px-8 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"} className="mb-16">
          <motion.p variants={fadeUp} className="text-[10px] font-semibold tracking-[0.28em] uppercase mb-4" style={{ color: "#F9A8C9" }}>
            Reviews
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-[48px] md:text-[64px] font-medium tracking-[-0.02em] leading-none mb-8 text-slate-900">
            What girls say about lumii
          </motion.h2>
          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <div>
              <p className="text-[24px] font-semibold leading-none text-slate-900">Great</p>
              <div className="flex gap-1 mt-1">
                {[1,2,3,4].map(s => <span key={s} className="text-green-500 text-base">★</span>)}
                <span className="text-gray-200 text-base">★</span>
              </div>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <p className="text-[13px] text-slate-400 font-light">Based on <span className="text-slate-700 font-medium underline cursor-pointer">2,400 reviews</span></p>
          </motion.div>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <motion.div key={i} variants={scaleUp} whileHover={{ y: -4, transition: { duration: 0.3 } }} className="bg-white rounded-[24px] p-6 shadow-[0_2px_20px_rgba(0,0,0,0.06)] cursor-default border border-white">
              <div className="flex gap-0.5 mb-2">
                {[...Array(r.stars)].map((_, s) => <span key={s} className="text-green-500 text-sm">★</span>)}
              </div>
              <p className="text-[11px] text-slate-300 font-medium mb-4">● Verified user</p>
              <h4 className="font-medium text-[16px] mb-3 tracking-[-0.01em] text-slate-900">"{r.title}"</h4>
              <p className="text-slate-400 text-[13px] leading-relaxed mb-6 font-light">"{r.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-semibold flex-shrink-0" style={{ background: "#F9A8C9" }}>
                  {r.name[0]}
                </div>
                <div>
                  <p className="font-medium text-[13px] text-slate-900">{r.name}</p>
                  <p className="text-slate-300 text-[11px] font-light">{r.time}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}