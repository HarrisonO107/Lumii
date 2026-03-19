"use client";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { INTRO_REVEAL_DELAY_MS } from "../lib/intro";

function WaitlistModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = async () => {
    if (!email.includes("@")) { setError("Please enter a valid email."); return; }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) setSubmitted(true);
      else setError("Something went wrong. Please try again.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[200]"
        style={{ background: "rgba(6,3,8,0.85)", backdropFilter: "blur(16px)" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />
      <motion.div
        className="fixed z-[201] left-1/2 top-1/2"
        style={{ width: "min(92vw, 440px)" }}
        initial={{ opacity: 0, scale: 0.92, x: "-50%", y: "-44%" }}
        animate={{ opacity: 1, scale: 1,    x: "-50%", y: "-50%" }}
        exit={{   opacity: 0, scale: 0.95,  x: "-50%", y: "-48%" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        role="dialog" aria-modal="true"
      >
        <div className="rounded-[28px] overflow-hidden" style={{ background: "#0c0710", border: "1px solid rgba(249,168,201,0.15)", boxShadow: "0 60px 160px rgba(0,0,0,0.6)" }}>
          <div style={{ height: 3, background: "linear-gradient(90deg, #fda4af, #F9A8C9, #f472b6, #c084fc)" }} />
          <div className="px-8 pt-7 pb-8">
            <div className="flex justify-end mb-4">
              <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)" }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1L9 9M9 1L1 9" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </button>
            </div>
            {!submitted ? (
              <>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-medium tracking-[0.2em] text-white/40 uppercase">Waitlist open</span>
                </div>
                <h2 className="text-[28px] font-light text-white leading-[1.1] tracking-[-0.02em] mb-2">Reserve your spot.</h2>
                <p className="text-[13px] text-white/35 font-light leading-[1.7] mb-7">Join 2,847 women already on the Lumii waitlist. Free access at launch — no credit card needed.</p>
                <div className="flex flex-col gap-3">
                  <input
                    type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
                    placeholder="Enter your email" autoFocus
                    className="w-full rounded-xl px-4 py-3.5 text-[13px] text-white placeholder:text-white/20 outline-none transition-all duration-200"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(249,168,201,0.4)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                  {error && <p className="text-[11px] text-red-400 pl-1">{error}</p>}
                  <motion.button onClick={handleSubmit} disabled={loading} whileHover={{ scale: loading ? 1 : 1.01 }} whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full py-3.5 rounded-xl text-[13px] font-semibold text-slate-900 disabled:opacity-50" style={{ background: "white" }}>
                    {loading ? "Reserving…" : "Reserve my spot →"}
                  </motion.button>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="h-1 w-14 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
                    <div className="h-full rounded-full" style={{ width: "73%", background: "linear-gradient(90deg, #F9A8C9, #f472b6)" }} />
                  </div>
                  <p className="text-[10px] text-white/25 font-light">364 spots left · Free at launch</p>
                </div>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)" }}>
                  <svg width="20" height="16" viewBox="0 0 20 16" fill="none"><path d="M1 8L7 14L19 1" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <p className="text-[20px] font-light text-white mb-2">You&apos;re in. ✦</p>
                <p className="text-[13px] text-white/35 font-light leading-[1.7]">You&apos;ll hear from us before anyone else when we launch.</p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

const NAV_LINKS = [
  { label: "HOW IT WORKS", href: "/how-it-works" },
  { label: "FEATURES",     href: "/features" },
  { label: "FAQ",          href: "/faq" },
  { label: "CONTACT",      href: "/contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [showModal, setShowModal]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [introReady, setIntroReady] = useState(pathname !== "/");

  const openModal  = useCallback(() => { setShowModal(true);  setMobileOpen(false); }, []);
  const closeModal = useCallback(() => setShowModal(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") { setIntroReady(true); return; }
    if (sessionStorage.getItem("hasSeenIntro")) { setIntroReady(true); return; }
    setIntroReady(false);
    const t = window.setTimeout(() => setIntroReady(true), INTRO_REVEAL_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        animate={{ opacity: introReady ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: introReady ? "auto" : "none" }}
      >
        {/* Main bar */}
        <div
          className="flex items-center justify-between transition-all duration-500"
          style={{
            padding: "0 44px",
            height: 68,
            background: scrolled
              ? "rgba(10, 5, 14, 0.65)"
              : isHome
              ? "transparent"
              : "rgba(10,5,14,0.2)",
            backdropFilter: scrolled || !isHome ? "blur(24px) saturate(160%)" : "none",
            WebkitBackdropFilter: scrolled || !isHome ? "blur(24px) saturate(160%)" : "none",
            borderBottom: scrolled
              ? "1px solid rgba(255,255,255,0.07)"
              : "1px solid transparent",
          }}
        >
          {/* Logo — "Lumii+" wordmark matching live site */}
          <Link href="/" className="flex items-center group">
            <span
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "#fff",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              Lumii
            </span>
            <span
              style={{
                fontSize: 20,
                fontWeight: 300,
                color: "#F9A8C9",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                marginLeft: 1,
                opacity: 0.9,
                transition: "opacity 0.2s",
              }}
              className="group-hover:opacity-100"
            >
              +
            </span>
          </Link>

          {/* Desktop links — uppercase, tracked, absolutely centred */}
          <div className="hidden md:flex items-center gap-9 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className="text-[11px] font-medium tracking-[0.13em] transition-colors duration-200"
                  style={{ color: active ? "#F9A8C9" : "rgba(255,255,255,0.52)" }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.9)"; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.52)"; }}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/referrals"
              className="text-[11px] font-semibold tracking-[0.08em] uppercase transition-all duration-200"
              style={{
                color: "#fff",
                padding: "8px 18px",
                borderRadius: 100,
                border: "1px solid rgba(255,255,255,0.45)",
                background: "rgba(255,255,255,0.10)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.18)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.65)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.10)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)";
              }}
            >
              Invite &amp; Earn
            </Link>
            <motion.button
              onClick={openModal}
              whileHover={{ scale: 1.02, boxShadow: "0 6px 28px rgba(0,0,0,0.35)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: "#ffffff",
                color: "#0d0612",
                fontSize: 12.5,
                fontWeight: 600,
                letterSpacing: "0.01em",
                padding: "10px 22px",
                borderRadius: 100,
                border: "none",
                cursor: "pointer",
              }}
            >
              Join the Waitlist
            </motion.button>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 7 : 0 }} className="block w-5 h-px bg-white/60 origin-center" />
            <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }} className="block w-5 h-px bg-white/60" />
            <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -7 : 0 }} className="block w-5 h-px bg-white/60 origin-center" />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mx-4 mt-2 rounded-2xl overflow-hidden"
              style={{ background: "rgba(10,5,14,0.97)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(24px)", transformOrigin: "top" }}
            >
              <div className="p-5 flex flex-col gap-1">
                {NAV_LINKS.map(({ label, href }) => {
                  const active = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      className="px-3 py-3 rounded-xl text-[12px] font-medium tracking-[0.1em] transition-colors"
                      style={{ color: active ? "#F9A8C9" : "rgba(255,255,255,0.52)", background: active ? "rgba(249,168,201,0.06)" : "transparent" }}
                    >
                      {label}
                    </Link>
                  );
                })}
                <div className="mt-3 pt-3 flex flex-col gap-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <Link
                    href="/referrals"
                    className="w-full py-3 rounded-xl text-[12px] font-semibold tracking-[0.08em] uppercase text-center"
                    style={{
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.45)",
                      background: "rgba(255,255,255,0.10)",
                    }}
                  >
                    Invite &amp; Earn
                  </Link>
                  <button
                    onClick={openModal}
                    className="w-full py-3 rounded-xl text-[13px] font-semibold"
                    style={{ background: "#fff", color: "#0d0612" }}
                  >
                    Join the Waitlist →
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AnimatePresence>
        {showModal && <WaitlistModal onClose={closeModal} />}
      </AnimatePresence>
    </>
  );
}
