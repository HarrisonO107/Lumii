"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features",     href: "#features"     },
  { label: "FAQ",          href: "#faq"           },
  { label: "Contact",      href: "#contact"       },
] as const;

export default function Nav() {
  const [ready,      setReady]      = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // ── Wait for hero scan to finish before appearing ──
  useEffect(() => {
    // Already revealed (return visit / fast load)
    if (document.body.getAttribute("data-hero-phase") === "revealed") {
      setReady(true);
      return;
    }
    // Hero sets phase at 600ms (scanning) and 5000ms (revealed).
    // Listen for both the attribute change AND a fallback timeout.
    const observer = new MutationObserver(() => {
      if (document.body.getAttribute("data-hero-phase") === "revealed") {
        setReady(true);
        observer.disconnect();
      }
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-hero-phase"],
    });
    // Hard fallback — if observer somehow misses it, show nav at 5.5s
    const fallback = setTimeout(() => setReady(true), 5500);
    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  // ── Scroll state ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Lock body scroll when mobile menu open ──
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: ready ? 0 : -12, opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          backdropFilter:       scrolled ? "blur(20px)" : "blur(10px)",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(10px)",
          background:    scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.05)",
          borderBottom:  scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(255,255,255,0.1)",
        }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      >
        <div
          className="h-[72px] flex items-center justify-between"
          style={{ maxWidth: 1300, margin: "0 auto", padding: "0 40px" }}
        >
          {/* Logo */}
          <a
            href="#top"
            className={`transition-colors duration-500 ${scrolled ? "text-slate-900" : "text-white"}`}
            style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.5px", lineHeight: 1 }}
          >
            Lumii
            <span style={{ color: "#FF9CC7", fontSize: 15, fontWeight: 400, position: "relative", top: -3, marginLeft: 1 }}>
              +
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center" style={{ gap: 32 }}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`transition-all duration-300 hover:opacity-60 ${scrolled ? "text-slate-500" : "text-white/80"}`}
                style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#how-it-works"
            className={`hidden md:inline-flex font-semibold rounded-full transition-all duration-500 ${
              scrolled ? "bg-slate-900 text-white hover:bg-slate-800" : "bg-white text-slate-900 hover:bg-white/90"
            }`}
            style={{ fontSize: 13, padding: "12px 28px" }}
          >
            Join the Waitlist
          </motion.a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[1.5px] rounded-full transition-all duration-300 ${scrolled ? "bg-slate-900" : "bg-white"} ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`block w-5 h-[1.5px] rounded-full transition-all duration-300 ${scrolled ? "bg-slate-900" : "bg-white"} ${mobileOpen ? "opacity-0 scale-0" : ""}`} />
            <span className={`block w-5 h-[1.5px] rounded-full transition-all duration-300 ${scrolled ? "bg-slate-900" : "bg-white"} ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.12em" }}
                  className="text-slate-900"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#how-it-works"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="mt-4 font-semibold rounded-full bg-slate-900 text-white"
                style={{ fontSize: 14, padding: "14px 32px" }}
              >
                Join the Waitlist
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
