"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

const SERIF = "var(--font-serif), serif";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);
  const [refCode, setRefCode] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const r = params.get("ref");
    if (r) setRefCode(r);
  }, []);

  useEffect(() => {
    fetch("/api/waitlist")
      .then((r) => r.json())
      .then((d) => { if (typeof d.count === "number") setWaitlistCount(d.count); })
      .catch(() => {});
  }, []);

  // Scroll parallax — content fades as you scroll
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;
    const st = gsap.to(content, {
      yPercent: 15, opacity: 0, ease: "none",
      scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 },
    });
    return () => { st.scrollTrigger?.kill(); };
  }, []);

  // Character reveal on headline + staggered content entrance
  useEffect(() => {
    const h1 = h1Ref.current;
    const sub = subRef.current;
    const form = formRef.current;
    if (!h1 || !sub || !form) return;

    // Split h1 into characters (preserve HTML structure)
    const text = h1.innerHTML;
    // We'll animate the whole h1 with a clip reveal instead of splitting chars
    // This avoids breaking the <br> and <em> tags

    // Start hidden
    gsap.set(h1, { opacity: 0, y: 40 });
    gsap.set(sub, { opacity: 0, y: 20 });
    gsap.set(form, { opacity: 0, y: 20 });

    // Animate in with stagger — triggered after preloader (~2.5s)
    const tl = gsap.timeline({ delay: 2.2 });
    tl.to(h1, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, 0);
    tl.to(sub, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.4);
    tl.to(form, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.6);

    return () => { tl.kill(); };
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!email.includes("@")) { setError("Please enter a valid email."); return; }
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ref: refCode }),
      });
      if (res.ok) setSubmitted(true);
      else setError("Something went wrong. Please try again.");
    } catch { setError("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  }, [email, refCode]);

  return (
    <section ref={sectionRef} id="hero-section" className="relative w-full h-screen overflow-hidden">

      {/* Background — pink gradient */}
      <div className="absolute inset-0">
        <img src="/hero-bg1.png" alt="" className="h-full w-full object-cover object-center" draggable={false} />
      </div>

      {/* Woman */}
      <div className="absolute inset-0">
        <img src="/hero-bg.png" alt="" className="h-full w-full object-cover" style={{ objectPosition: "60% center" }} draggable={false} />
      </div>

      {/* Overlays — softer gradients */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 35%, transparent 60%)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.25) 0%, transparent 45%)" }} />

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col justify-end px-6 pb-12 sm:px-10 sm:pb-20 md:px-20 md:pb-28"
        style={{ zIndex: 10 }}
      >
        <div className="max-w-[520px]">

          {/* Headline — starts hidden, GSAP reveals */}
          <h1
            ref={h1Ref}
            className="text-[30px] sm:text-[48px] md:text-[60px] text-white leading-[1.02] tracking-[-0.04em] mb-4 md:mb-6"
            style={{ fontFamily: SERIF, opacity: 0 }}
          >
            Your face, measured<br />to the <em style={{ color: "#E8A0B0" }}>micron.</em>
          </h1>

          {/* Divider line */}
          <div className="w-12 h-px mb-5 md:mb-7" style={{ background: "rgba(255,255,255,0.25)", opacity: 0 }} ref={(el) => { if (el) gsap.set(el, { opacity: 0 }); }} />

          {/* Subline */}
          <p
            ref={subRef}
            className="text-[13px] sm:text-[14px] font-light text-white/50 leading-relaxed mb-8 md:mb-10 max-w-[360px]"
            style={{ opacity: 0 }}
          >
            584 landmarks. 75+ metrics. One score that tells you everything.
          </p>

          {/* Form */}
          <div ref={formRef} style={{ opacity: 0 }}>
            {!submitted ? (
              <div className="flex flex-col gap-3 max-w-[360px]">
                <input
                  type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
                  placeholder="Your best email"
                  className="w-full px-5 py-4 text-[15px] text-white placeholder:text-white/30 outline-none rounded-xl"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
                />
                <button
                  onClick={handleSubmit} disabled={loading}
                  className="w-full font-semibold text-[15px] py-4 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.97] transition-transform"
                  style={{ background: "linear-gradient(135deg, #E8A0B0, #C8617C)", color: "#fff", boxShadow: "0 4px 20px rgba(200,97,124,0.3)" }}
                >
                  <span>{loading ? "Reserving..." : "Join the Waitlist"}</span>
                  <span style={{ fontSize: 18, lineHeight: 1 }}>→</span>
                </button>
                {error && <p className="text-[11px] text-red-300">{error}</p>}
              </div>
            ) : (
              <div className="inline-flex items-center gap-3 px-5 py-4 rounded-xl"
                style={{ background: "rgba(200,97,124,0.2)", border: "1px solid rgba(200,97,124,0.3)", backdropFilter: "blur(12px)" }}>
                <svg width="14" height="12" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-[14px] font-medium text-white">You&apos;re in!</p>
              </div>
            )}

            {/* Social proof */}
            <div className="flex items-center gap-3 mt-5 text-[10px] text-white/30 tracking-[0.1em] uppercase">
              <span>Free at launch</span>
              <span style={{ width: 1, height: 10, background: "rgba(255,255,255,0.12)" }} />
              <span>
                {waitlistCount != null
                  ? `${(Math.floor(waitlistCount / 5) * 5).toLocaleString()}+ joined`
                  : "Join the first wave"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
