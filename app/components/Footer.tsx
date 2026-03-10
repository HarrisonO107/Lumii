"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer } from "../lib/animations";

const links = [
  {
    heading: "Product",
    items: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Features", href: "#features" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About us", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    heading: "Support",
    items: [
      { label: "Help centre", href: "#" },
      { label: "Contact us", href: "#contact" },
      { label: "Privacy policy", href: "#" },
    ],
  },
  {
    heading: "Legal",
    items: [
      { label: "Terms of use", href: "#" },
      { label: "Cookie policy", href: "#" },
      { label: "GDPR", href: "#" },
    ],
  },
];

export default function Footer() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer ref={ref} className="bg-[#0a0a0a] text-white pt-24 pb-10">
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 40px" }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16 pb-16 border-b border-white/10"
        >
          {/* ── Brand column ── */}
          <motion.div variants={fadeUp} className="col-span-2">
            <p className="text-[20px] font-semibold mb-1 tracking-[-0.3px]">
              Lumii<span style={{ color: "#FF9CC7", fontWeight: 400, fontSize: 15 }}>+</span>
            </p>
            <p className="text-gray-500 text-[13px] leading-relaxed mb-8 max-w-[220px] font-light">
              AI beauty advisor built for girls who take their glow seriously.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 mb-8">
              {[
                { label: "tt", icon: "TikTok" },
                { label: "ig", icon: "Instagram" },
                { label: "f", icon: "Facebook" },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href="#"
                  whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.4)" }}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[11px] text-gray-500 hover:text-white transition-colors"
                  aria-label={s.icon}
                >
                  {s.label}
                </motion.a>
              ))}
            </div>

            {/* App Store badge */}
            <motion.div
              whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.3)" }}
              className="border border-white/10 rounded-xl px-4 py-3 w-fit flex items-center gap-3 cursor-pointer transition-colors"
            >
              <span className="text-xl">🍎</span>
              <div>
                <p className="text-[10px] text-gray-500 leading-tight font-light">
                  Download on the
                </p>
                <p className="text-[13px] font-semibold leading-tight">App Store</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Link columns ── */}
          {links.map((col) => (
            <motion.div key={col.heading} variants={fadeUp}>
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-[0.22em] mb-5">
                {col.heading}
              </p>
              <div className="flex flex-col gap-3.5">
                {col.items.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-gray-500 text-[13px] hover:text-white transition-colors font-light"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-[12px] font-light">
            © 2026 lumii Inc. All rights reserved.
          </p>
          <p className="text-gray-600 text-[12px] font-light">
            Built for girls who glow different.{" "}
            <span style={{ color: "#FF9CC7" }}>✦</span>
          </p>
        </div>
      </div>
    </footer>
  );
}