"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "../lib/gsap";

const SERIF = "var(--font-serif), serif";

const shots = [
  { src: "/screenshots/app-confidence.jpg" },
  { src: "/screenshots/app-home.jpg" },
  { src: "/screenshots/app-score.jpg" },
  { src: "/screenshots/app-goals.jpg" },
  { src: "/screenshots/app-chat.jpg" },
];

// Fanned arc poses, left → right; index 2 is the raised centre.
// tyF = vertical offset as a fraction of phone width, so the arc scales with --phw.
const poses = [
  { rot: -14, tyF: 0.36, scale: 0.78, z: 1 },
  { rot: -7,  tyF: 0.15, scale: 0.89, z: 2 },
  { rot: 0,   tyF: 0,    scale: 1.04, z: 3 },
  { rot: 7,   tyF: 0.15, scale: 0.89, z: 2 },
  { rot: 14,  tyF: 0.36, scale: 0.78, z: 1 },
];

function PhoneFrame({ src, raised }: { src: string; raised?: boolean }) {
  return (
    <div
      className="relative rounded-[2rem] p-[5px]"
      style={{
        background: "linear-gradient(160deg, #232327 0%, #08080a 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: raised
          ? "0 44px 90px -28px rgba(0,0,0,0.7), 0 10px 30px rgba(0,0,0,0.5)"
          : "0 30px 64px -30px rgba(0,0,0,0.6)",
        width: "100%",
      }}
    >
      <div className="absolute top-[5px] left-1/2 -translate-x-1/2 z-10" style={{ width: "32%", height: "2.1%", minHeight: 12, background: "#08080a", borderRadius: "0 0 9px 9px" }} />
      <div className="overflow-hidden rounded-[1.65rem]" style={{ aspectRatio: "1242 / 2688", background: "#08080a" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="w-full h-full object-cover object-top" draggable={false} />
      </div>
    </div>
  );
}

function PhoneFan() {
  return (
    <div className="phone-fan flex items-end justify-center">
      {shots.map((shot, i) => {
        const p = poses[i];
        return (
          <div
            key={shot.src}
            className="phone-reveal"
            style={{
              width: "var(--phw)",
              marginLeft: i === 0 ? 0 : "calc(var(--phw) * -0.23)",
              zIndex: p.z,
              opacity: 0,
              transform: `translateY(calc(var(--phw) * ${p.tyF})) rotate(${p.rot}deg) scale(${p.scale})`,
              transformOrigin: "bottom center",
            }}
          >
            <div className="phone-float" style={{ animationDelay: `${i * 0.6}s` }}>
              <PhoneFrame src={shot.src} raised={i === 2} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Hero() {
  const pillRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const phonesRef = useRef<HTMLDivElement>(null);

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

  // Staggered entrance — fires as the preloader slides away (~1.5s)
  useEffect(() => {
    const pill = pillRef.current;
    const h1 = h1Ref.current;
    const sub = subRef.current;
    const form = formRef.current;
    const phones = phonesRef.current;
    if (!pill || !h1 || !sub || !form || !phones) return;

    const phoneItems = phones.querySelectorAll(".phone-reveal");

    gsap.set(pill, { opacity: 0, y: 16 });
    gsap.set(h1, { opacity: 0, y: 40 });
    gsap.set(sub, { opacity: 0, y: 20 });
    gsap.set(form, { opacity: 0, y: 20 });

    const tl = gsap.timeline({ delay: 1.5 });
    tl.to(phoneItems, { opacity: 1, duration: 1.0, stagger: 0.09, ease: "power2.out" }, 0);
    tl.to(pill, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.1);
    tl.to(h1, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, 0.25);
    tl.to(sub, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.55);
    tl.to(form, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.7);

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
    <section className="relative w-full overflow-hidden" style={{ height: "100svh", minHeight: 600, background: "#0A0A0C" }}>
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 50% at 78% 42%, rgba(200,97,124,0.16) 0%, transparent 65%)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 45% at 12% 78%, rgba(75,140,94,0.10) 0%, transparent 60%)" }} />

      <div className="relative h-full w-full max-w-[1260px] mx-auto px-6 md:px-14 flex flex-col md:flex-row md:items-center gap-2 md:gap-10 pt-[88px] md:pt-0 pb-12 md:pb-0">

        {/* ── Left: copy + waitlist ── */}
        <div className="flex-1 md:max-w-[470px] flex flex-col justify-center order-2 md:order-1">
          {/* Status pill */}
          <div
            ref={pillRef}
            className="hidden md:inline-flex self-start items-center gap-2.5 mb-5 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <span className="flex items-center gap-1.5 text-[9.5px] md:text-[10px] font-medium tracking-[0.06em] uppercase text-white/45">
              <span style={{ width: 5, height: 5, borderRadius: 99, background: "rgba(255,255,255,0.3)" }} />
              iOS founding codes closed
            </span>
            <span style={{ width: 1, height: 11, background: "rgba(255,255,255,0.14)" }} />
            <span className="flex items-center gap-1.5 text-[9.5px] md:text-[10px] font-semibold tracking-[0.06em] uppercase" style={{ color: "#E8A0B0" }}>
              <span style={{ width: 5, height: 5, borderRadius: 99, background: "#E8A0B0" }} className="animate-pulse" />
              Android waitlist open
            </span>
          </div>

          <h1
            ref={h1Ref}
            className="text-[32px] sm:text-[44px] md:text-[56px] text-white leading-[1.02] tracking-[-0.04em] mb-4 md:mb-5"
            style={{ fontFamily: SERIF, opacity: 0 }}
          >
            Your face, measured<br />to the <em style={{ color: "#E8A0B0" }}>micron.</em>
          </h1>

          <p
            ref={subRef}
            className="text-[13px] sm:text-[14px] font-light text-white/55 leading-relaxed mb-7 md:mb-9 max-w-[400px]"
            style={{ opacity: 0 }}
          >
            584 landmarks. 75+ metrics. One score that tells you everything. The iOS founding codes are gone — join the waitlist to land Android first.
          </p>

          <div ref={formRef} style={{ opacity: 0 }}>
            {!submitted ? (
              <div className="flex flex-col gap-3 max-w-[400px]">
                <input
                  type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
                  placeholder="Your best email"
                  className="w-full px-5 py-4 text-[15px] text-white placeholder:text-white/30 outline-none rounded-xl"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
                />
                <button
                  onClick={handleSubmit} disabled={loading}
                  className="w-full font-semibold text-[15px] py-4 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.97] transition-transform"
                  style={{ background: "linear-gradient(135deg, #E8A0B0, #C8617C)", color: "#fff", boxShadow: "0 4px 24px rgba(200,97,124,0.35)" }}
                >
                  <span>{loading ? "Reserving..." : "Join the Android Waitlist"}</span>
                  <span style={{ fontSize: 18, lineHeight: 1 }}>→</span>
                </button>
                {error && <p className="text-[11px] text-red-300">{error}</p>}
              </div>
            ) : (
              <div className="inline-flex items-center gap-3 px-5 py-4 rounded-xl"
                style={{ background: "rgba(200,97,124,0.2)", border: "1px solid rgba(200,97,124,0.3)" }}>
                <svg width="14" height="12" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-[14px] font-medium text-white">You&apos;re in!</p>
              </div>
            )}

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

        {/* ── Right: app screenshots ── */}
        <div
          ref={phonesRef}
          className="flex items-center justify-center min-h-0 order-1 md:order-2 flex-none md:flex-1 mt-2 md:mt-0"
        >
          <PhoneFan />
        </div>
      </div>

      {/* Minimal legal */}
      <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-5 text-[10px] tracking-[0.1em] uppercase text-white/25">
        <a href="/legal/terms-of-service" className="hover:text-white/55 transition-colors">Terms</a>
        <a href="/legal/privacy-policy" className="hover:text-white/55 transition-colors">Privacy</a>
        <a href="mailto:hello@lumiiapp.com" className="hover:text-white/55 transition-colors">Contact</a>
        <span className="hidden sm:inline text-white/15">© {new Date().getFullYear()} HFJO&amp;CO</span>
      </div>
    </section>
  );
}
