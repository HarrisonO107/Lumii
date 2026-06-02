"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

const SERIF = "var(--font-serif), serif";

const C = {
  cream: "#FAF7F2",
  dark: "#0A0A0C",
  green: "#3B5A3E",
  greenLight: "#4A8C5E",
  rose: "#C8617C",
  roseLight: "#E8A0B0",
  roseBg: "rgba(200,97,124,0.08)",
  champagne: "#C9A96E",
  text: "#1A1A1A",
  textSec: "#6B6B6B",
  textTer: "#9A9A9A",
  border: "rgba(0,0,0,0.08)",
};

// ─── SCROLL REVEAL HOOK ────────────────
function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll("[data-r]");
    if (!items.length) return;
    gsap.set(items, { opacity: 0, y: 32 });
    const tl = gsap.to(items, {
      opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 82%", once: true },
    });
    return () => { tl.scrollTrigger?.kill(); };
  }, [ref]);
}

// ─── HIGHLIGHT TEXT HOOK ───────────────
function useHighlight(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const text = el.innerText;
    const dimColor = "rgba(255,255,255,0.2)";
    const litColor = "rgba(255,255,255,0.9)";
    el.innerHTML = text.split(" ").map(w => `<span style="color:${dimColor};transition:color 0.3s">${w}</span>`).join(" ");
    const spans = el.querySelectorAll("span");
    const st = ScrollTrigger.create({
      trigger: el, start: "top 80%", end: "bottom 40%",
      onUpdate: (self) => {
        spans.forEach((s, i) => {
          (s as HTMLElement).style.color = (i / spans.length) < self.progress ? litColor : dimColor;
        });
      },
    });
    return () => { st.kill(); };
  }, [ref]);
}

// ─── SVG: FACE LANDMARKS ───────────────
function FaceLandmarks({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const dots = svg.querySelectorAll(".lm-dot");
    const lines = svg.querySelectorAll(".lm-line");
    gsap.set(dots, { opacity: 0, scale: 0 });
    gsap.set(lines, { opacity: 0 });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: svg, start: "top 75%", once: true },
    });
    tl.to(lines, { opacity: 1, duration: 0.8, stagger: 0.05, ease: "power2.out" }, 0);
    tl.to(dots, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.02, ease: "back.out(2)" }, 0.3);
    return () => { tl.scrollTrigger?.kill(); };
  }, []);

  // Generate landmark positions on a face shape
  const landmarks: [number, number][] = [];
  // Jaw outline
  for (let i = 0; i <= 16; i++) {
    const t = (i / 16) * Math.PI;
    landmarks.push([200 + Math.sin(t) * 140, 120 + Math.cos(t) * -30 + i * 14]);
  }
  // Eyebrows
  for (let i = 0; i < 10; i++) landmarks.push([120 + i * 8, 150 - Math.sin(i / 9 * Math.PI) * 12]);
  for (let i = 0; i < 10; i++) landmarks.push([220 + i * 8, 150 - Math.sin(i / 9 * Math.PI) * 12]);
  // Eyes
  for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; landmarks.push([155 + Math.cos(a) * 18, 180 + Math.sin(a) * 8]); }
  for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; landmarks.push([245 + Math.cos(a) * 18, 180 + Math.sin(a) * 8]); }
  // Nose
  for (let i = 0; i < 9; i++) landmarks.push([200 + (i - 4) * 6, 200 + i * 4]);
  // Mouth
  for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; landmarks.push([200 + Math.cos(a) * 25, 280 + Math.sin(a) * 10]); }
  // Extra scatter (deterministic — no Math.random to avoid hydration mismatch)
  const seed = [0.12,0.87,0.34,0.62,0.91,0.23,0.55,0.78,0.41,0.06,0.69,0.33,0.95,0.17,0.48,0.72,0.29,0.84,0.53,0.11,0.66,0.38,0.93,0.21,0.57,0.79,0.44,0.02,0.68,0.36,0.14,0.88,0.31,0.65,0.92,0.25,0.51,0.76,0.43,0.08,0.71,0.35,0.97,0.19,0.46,0.74,0.27,0.82,0.56,0.13,0.63,0.39,0.94,0.22,0.58,0.77,0.42,0.05,0.67,0.37];
  for (let i = 0; i < 30; i++) landmarks.push([100 + seed[i * 2] * 200, 130 + seed[i * 2 + 1] * 200]);

  return (
    <svg ref={ref} viewBox="0 0 400 380" fill="none" className={className} style={{ width: "100%", maxWidth: 360 }}>
      {/* Face outline */}
      <ellipse className="lm-line" cx="200" cy="210" rx="120" ry="155" stroke={C.roseLight} strokeWidth="1" opacity="0.3" />
      {/* Symmetry line */}
      <line className="lm-line" x1="200" y1="60" x2="200" y2="360" stroke={C.roseLight} strokeWidth="0.5" strokeDasharray="4 4" opacity="0.2" />
      {/* Horizontal guide */}
      <line className="lm-line" x1="80" y1="180" x2="320" y2="180" stroke={C.roseLight} strokeWidth="0.5" strokeDasharray="4 4" opacity="0.15" />
      {/* Eye ovals */}
      <ellipse className="lm-line" cx="155" cy="180" rx="22" ry="10" stroke={C.rose} strokeWidth="0.8" opacity="0.3" />
      <ellipse className="lm-line" cx="245" cy="180" rx="22" ry="10" stroke={C.rose} strokeWidth="0.8" opacity="0.3" />
      {/* Nose bridge */}
      <path className="lm-line" d="M200 155 L190 240 Q200 248 210 240 L200 155" stroke={C.rose} strokeWidth="0.6" opacity="0.25" fill="none" />
      {/* Mouth */}
      <ellipse className="lm-line" cx="200" cy="280" rx="28" ry="12" stroke={C.rose} strokeWidth="0.8" opacity="0.25" />
      {/* Landmark dots */}
      {landmarks.map(([x, y], i) => (
        <circle key={i} className="lm-dot" cx={x} cy={y} r={1.4}
          fill={i % 3 === 0 ? C.rose : i % 3 === 1 ? C.green : C.champagne} opacity={0.6 + (i % 4) * 0.1} />
      ))}
    </svg>
  );
}

// ─── SVG: SCORE RADIAL ─────────────────
const categories = [
  { name: "Eyes", score: 87, color: "#7BA68E" },
  { name: "Nose", score: 72, color: "#6B9B9A" },
  { name: "Lips", score: 91, color: C.rose },
  { name: "Jaw", score: 78, color: C.roseLight },
  { name: "Harmony", score: 85, color: C.champagne },
  { name: "Symmetry", score: 94, color: C.green },
  { name: "Skin", score: 82, color: C.greenLight },
  { name: "Proportions", score: 88, color: "#B8A89A" },
];

function ScoreRadial({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const arcs = svg.querySelectorAll(".score-arc");
    arcs.forEach((arc) => {
      const length = (arc as SVGPathElement).getTotalLength();
      gsap.set(arc, { strokeDasharray: length, strokeDashoffset: length });
    });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: svg, start: "top 75%", once: true },
    });
    tl.to(arcs, { strokeDashoffset: 0, duration: 1.2, stagger: 0.08, ease: "power2.out" }, 0);
    return () => { tl.scrollTrigger?.kill(); };
  }, []);

  const cx = 200, cy = 200, r = 160;
  const gap = 2; // degrees gap between segments
  const segAngle = 360 / categories.length;

  return (
    <svg ref={ref} viewBox="0 0 400 400" fill="none" className={className} style={{ width: "100%", maxWidth: 340 }}>
      {/* Background ring */}
      <circle cx={cx} cy={cy} r={r} stroke={C.border} strokeWidth="20" fill="none" />
      {/* Score arcs */}
      {categories.map((cat, i) => {
        const startAngle = (i * segAngle + gap / 2 - 90) * (Math.PI / 180);
        const sweepAngle = ((segAngle - gap) * (cat.score / 100)) * (Math.PI / 180);
        const x1 = cx + r * Math.cos(startAngle);
        const y1 = cy + r * Math.sin(startAngle);
        const x2 = cx + r * Math.cos(startAngle + sweepAngle);
        const y2 = cy + r * Math.sin(startAngle + sweepAngle);
        const large = sweepAngle > Math.PI ? 1 : 0;
        return (
          <path key={cat.name} className="score-arc"
            d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`}
            stroke={cat.color} strokeWidth="20" strokeLinecap="round" fill="none" />
        );
      })}
      {/* Center text */}
      <text x={cx} y={cy - 8} textAnchor="middle" fill={C.text} fontSize="48" fontWeight="300" style={{ fontFamily: SERIF }}>84</text>
      <text x={cx} y={cy + 18} textAnchor="middle" fill={C.textTer} fontSize="12" letterSpacing="2">/100</text>
      {/* Category labels around the ring */}
      {categories.map((cat, i) => {
        const angle = ((i * segAngle + segAngle / 2 - 90) * Math.PI) / 180;
        const labelR = r + 34;
        const lx = cx + labelR * Math.cos(angle);
        const ly = cy + labelR * Math.sin(angle);
        return (
          <text key={cat.name} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
            fill={C.textSec} fontSize="9" letterSpacing="0.5">{cat.name}</text>
        );
      })}
    </svg>
  );
}

// ─── SECTIONS ──────────────────────────

// 1. Hero transition
function HeroTransition() {
  return <div style={{ height: 100, background: `linear-gradient(180deg, #000 0%, ${C.dark} 100%)` }} />;
}

// 2. Lead text (dark bg, highlight on scroll)
function LeadText() {
  const ref = useRef<HTMLParagraphElement>(null);
  useHighlight(ref);
  return (
    <section className="py-32 md:py-48 px-6 md:px-20" style={{ background: C.dark }}>
      <div className="max-w-[700px] mx-auto">
        <p ref={ref} className="text-[21px] md:text-[30px] leading-[1.6] tracking-[-0.01em]" style={{ fontFamily: SERIF }}>
          Lumii maps 584 facial landmarks and measures 75+ metrics across symmetry, harmony, proportions, and skin quality — to build a beauty plan that could only be yours.
        </p>
      </div>
    </section>
  );
}

// Dark → cream transition
function DarkToCream() {
  return <div style={{ height: 120, background: `linear-gradient(180deg, ${C.dark} 0%, ${C.cream} 100%)` }} />;
}

// 3. How it works + Face landmarks visual
const steps = [
  { num: "01", title: "Three angles. That's it.", body: "Front. Left. Right. Our guided camera positions you perfectly — three photos in under 30 seconds." },
  { num: "02", title: "584 landmarks, mapped.", body: "Every contour, ratio, and proportion — detected, measured, and scored against clinically-studied ideals." },
  { num: "03", title: "A real score.", body: "A precise breakdown across symmetry, harmony, eyes, nose, lips, jaw, and skin — each scored individually." },
  { num: "04", title: "Tips backed by numbers.", body: "Exercises, hairstyles, skincare — all tied to your actual measurements. Nothing generic." },
  { num: "05", title: "Track your glow up.", body: "Scan again over time. Watch scores shift. Progress measured, not guessed." },
];

function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} className="py-28 md:py-40 px-6 md:px-20" style={{ background: C.cream }}>
      <div className="max-w-[960px] mx-auto">
        <p data-r="" className="text-[10px] font-medium tracking-[0.3em] uppercase mb-3" style={{ color: C.textTer }}>How it works</p>
        <h2 data-r="" className="text-[28px] md:text-[42px] leading-tight tracking-[-0.03em] mb-14 md:mb-20" style={{ fontFamily: SERIF, color: C.text }}>
          Five steps to your <em style={{ color: C.rose }}>score</em>
        </h2>

        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {/* Steps */}
          <div className="flex-1 order-2 md:order-1">
            <div className="flex flex-col gap-8 md:gap-10">
              {steps.map((step, i) => (
                <div key={step.num} data-r="" className="flex items-start gap-4">
                  <span className="text-[12px] font-bold tracking-[0.1em] mt-1 flex-shrink-0" style={{ color: i % 2 === 0 ? C.rose : C.green }}>{step.num}</span>
                  <div>
                    <h3 className="text-[16px] md:text-[18px] font-semibold mb-1" style={{ color: C.text }}>{step.title}</h3>
                    <p className="text-[13px] font-light leading-relaxed" style={{ color: C.textSec }}>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Face landmark SVG */}
          <div className="flex-1 flex items-center justify-center order-1 md:order-2">
            <FaceLandmarks />
          </div>
        </div>
      </div>
    </section>
  );
}

// 4. Score showcase
function ScoreShowcase() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} className="py-28 md:py-40 px-6 md:px-20" style={{ background: C.cream }}>
      <div className="max-w-[800px] mx-auto text-center">
        <p data-r="" className="text-[10px] font-medium tracking-[0.3em] uppercase mb-3" style={{ color: C.textTer }}>Your score</p>
        <h2 data-r="" className="text-[28px] md:text-[42px] leading-tight tracking-[-0.03em] mb-4" style={{ fontFamily: SERIF, color: C.text }}>
          A score that actually <em style={{ color: C.rose }}>means</em> something
        </h2>
        <p data-r="" className="text-[14px] font-light mb-12 md:mb-16 max-w-[480px] mx-auto" style={{ color: C.textSec }}>
          Eight categories. Each scored individually. Together they tell you exactly where you stand — and where to focus.
        </p>

        <div className="flex justify-center">
          <ScoreRadial />
        </div>

        {/* Category legend below */}
        <div data-r="" className="flex flex-wrap justify-center gap-3 mt-10">
          {categories.map((cat) => (
            <div key={cat.name} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "#fff", border: `1px solid ${C.border}` }}>
              <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
              <span className="text-[10px] font-medium" style={{ color: C.textSec }}>{cat.name}</span>
              <span className="text-[10px] font-bold" style={{ color: C.text }}>{cat.score}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 4b. App screenshots showcase
const shots = [
  { src: "/screenshots/app-confidence.jpg", label: "Confidence rituals" },
  { src: "/screenshots/app-home.jpg",       label: "Your daily glow" },
  { src: "/screenshots/app-score.jpg",      label: "Your beauty read" },
  { src: "/screenshots/app-goals.jpg",      label: "Goals with Momo" },
  { src: "/screenshots/app-chat.jpg",       label: "Chat with Lumii" },
];

// Fanned arc poses (desktop), left → right; index 2 is the raised centre
const poses = [
  { rot: -13, ty: 52, scale: 0.80, z: 1 },
  { rot: -6,  ty: 22, scale: 0.90, z: 2 },
  { rot: 0,   ty: 0,  scale: 1.05, z: 3 },
  { rot: 6,   ty: 22, scale: 0.90, z: 2 },
  { rot: 13,  ty: 52, scale: 0.80, z: 1 },
];

function PhoneFrame({ src, raised }: { src: string; raised?: boolean }) {
  return (
    <div
      className="relative rounded-[2.2rem] p-[6px]"
      style={{
        background: "linear-gradient(160deg, #202024 0%, #08080a 100%)",
        border: "1px solid rgba(0,0,0,0.55)",
        boxShadow: raised
          ? "0 44px 90px -28px rgba(20,8,16,0.55), 0 10px 30px rgba(0,0,0,0.25)"
          : "0 30px 64px -30px rgba(20,8,16,0.4)",
        width: "100%",
      }}
    >
      {/* Notch */}
      <div className="absolute top-[6px] left-1/2 -translate-x-1/2 z-10" style={{ width: "32%", height: "2.1%", minHeight: 14, background: "#08080a", borderRadius: "0 0 10px 10px" }} />
      <div className="overflow-hidden rounded-[1.75rem]" style={{ aspectRatio: "1242 / 2688", background: "#08080a" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="w-full h-full object-cover object-top" draggable={false} />
      </div>
    </div>
  );
}

function AppShowcase() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} className="relative py-28 md:py-40 px-6 md:px-20 overflow-hidden" style={{ background: C.cream }}>
      {/* Soft rose glow behind the phones */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 50% 42% at 50% 62%, ${C.roseBg} 0%, transparent 70%)` }} />

      <div className="relative max-w-[1100px] mx-auto">
        <div className="text-center mb-14 md:mb-24">
          <p data-r="" className="text-[10px] font-medium tracking-[0.3em] uppercase mb-3" style={{ color: C.textTer }}>Inside the app</p>
          <h2 data-r="" className="text-[28px] md:text-[42px] leading-tight tracking-[-0.03em]" style={{ fontFamily: SERIF, color: C.text }}>
            This is what you&apos;ll <em style={{ color: C.rose }}>open</em>
          </h2>
          <p data-r="" className="text-[14px] font-light mt-4 max-w-[440px] mx-auto" style={{ color: C.textSec }}>
            Already live on iOS. Now landing on Android — every screen built around your actual measurements.
          </p>
        </div>

        {/* Desktop — fanned arc */}
        <div data-r="" className="hidden md:flex items-end justify-center" style={{ minHeight: 520 }}>
          {shots.map((shot, i) => {
            const p = poses[i];
            return (
              <div
                key={shot.src}
                style={{
                  width: 200,
                  marginLeft: i === 0 ? 0 : -44,
                  zIndex: p.z,
                  transform: `translateY(${p.ty}px) rotate(${p.rot}deg) scale(${p.scale})`,
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

        {/* Mobile — horizontal snap scroll */}
        <div data-r="" className="md:hidden flex gap-5 overflow-x-auto scroll-none snap-x snap-mandatory -mx-6 px-6 pb-3">
          {shots.map((shot, i) => (
            <div key={shot.src} className="snap-center shrink-0 flex flex-col items-center" style={{ width: "62vw", maxWidth: 250 }}>
              <PhoneFrame src={shot.src} raised={i === 2} />
              <p className="text-[11px] font-medium mt-4 text-center" style={{ color: C.textSec }}>{shot.label}</p>
            </div>
          ))}
        </div>

        {/* Caption row (desktop) */}
        <div className="hidden md:flex items-center justify-center gap-2 mt-16">
          {shots.map((shot) => (
            <span key={shot.src} className="text-[10px] font-medium tracking-[0.04em] px-3 py-1.5 rounded-full" style={{ background: "#fff", border: `1px solid ${C.border}`, color: C.textSec }}>
              {shot.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// 5. Features accordion
const features = [
  { title: "Precision Analysis", body: "75+ facial metrics scored against ideal proportions. Every measurement comes with its actual value, ideal range, and a clear score out of 100." },
  { title: "Skin Mapping", body: "Zone-by-zone analysis across your T-zone, cheeks, chin, and under-eye. Smoothness, redness, brightness — all measured." },
  { title: "Face Shape Detection", body: "Your face shape identified and factored into every recommendation — hairstyles, contouring, exercises." },
  { title: "Personalised Routines", body: "Science-backed tips with real steps. Each explains the anatomy behind why it works." },
  { title: "Progress Tracking", body: "Multiple scans build your trend line. See score changes across every metric." },
  { title: "Goal System", body: "Turn tips into trackable daily goals. Build streaks, hit milestones, stay consistent." },
];

function FeaturesAccordion() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="py-28 md:py-40 px-6 md:px-20" style={{ background: C.cream }}>
      <div className="max-w-[700px] mx-auto">
        <p data-r="" className="text-[10px] font-medium tracking-[0.3em] uppercase mb-3" style={{ color: C.textTer }}>Features</p>
        <h2 data-r="" className="text-[28px] md:text-[42px] leading-tight tracking-[-0.03em] mb-12" style={{ fontFamily: SERIF, color: C.text }}>
          What Lumii <em style={{ color: C.rose }}>measures</em>
        </h2>

        <div data-r="">
          {features.map((feat, i) => {
            const open = active === i;
            return (
              <div key={feat.title}>
                <div className="h-px" style={{ background: C.border }} />
                <button onClick={() => setActive(open ? -1 : i)} className="w-full flex items-center justify-between py-5 text-left">
                  <h3 className="text-[16px] md:text-[18px] transition-colors duration-300" style={{ color: open ? C.text : C.textTer, fontFamily: open ? SERIF : "inherit" }}>
                    {feat.title}
                  </h3>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 transition-transform duration-300" style={{ transform: open ? "rotate(45deg)" : "rotate(0)" }}>
                    <line x1="7" y1="1" x2="7" y2="13" stroke={C.textTer} strokeWidth="1.5" />
                    <line x1="1" y1="7" x2="13" y2="7" stroke={C.textTer} strokeWidth="1.5" />
                  </svg>
                </button>
                <div className="overflow-hidden transition-all duration-500" style={{ maxHeight: open ? 160 : 0, opacity: open ? 1 : 0 }}>
                  <p className="pb-6 pr-10 text-[13px] font-light leading-relaxed" style={{ color: C.textSec }}>{feat.body}</p>
                </div>
              </div>
            );
          })}
          <div className="h-px" style={{ background: C.border }} />
        </div>
      </div>
    </section>
  );
}

// 6. Data strip — clean, like Jesko's data section
const dataItems = [
  { label: "Landmarks per scan", value: "584" },
  { label: "Metrics scored", value: "75+" },
  { label: "Facial categories", value: "8" },
  { label: "Skin zones mapped", value: "5" },
  { label: "Photos needed", value: "3" },
  { label: "Time to scan", value: "<30s" },
];

function DataStrip() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} className="py-6 md:py-8 px-6 md:px-20" style={{ background: C.cream }}>
      <div className="max-w-[800px] mx-auto">
        <div className="h-px" style={{ background: C.border }} />
        <div className="py-6 md:py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-4">
            {dataItems.map((item) => (
              <div key={item.label} data-r="" className="flex justify-between items-baseline">
                <span className="text-[11px] tracking-[0.05em]" style={{ color: C.textTer }}>{item.label}</span>
                <span className="text-[13px] font-medium" style={{ color: C.text }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="h-px" style={{ background: C.border }} />
      </div>
    </section>
  );
}

// 7. Positioning quote
function Positioning() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} className="py-28 md:py-40 px-6 md:px-20" style={{ background: C.cream }}>
      <div className="max-w-[680px] mx-auto text-center">
        <h2 data-r="" className="text-[26px] md:text-[40px] leading-[1.3] tracking-[-0.02em]" style={{ fontFamily: SERIF, color: C.text }}>
          Beauty scores exist.<br /><em style={{ color: C.rose }}>Precise ones don&apos;t.</em>
        </h2>
        <p data-r="" className="text-[14px] font-light leading-relaxed mt-6 max-w-[520px] mx-auto" style={{ color: C.textSec }}>
          This isn&apos;t a toy. It&apos;s the most detailed facial analysis available on a phone.
        </p>
      </div>
    </section>
  );
}

// 8. Final CTA
function FinalCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const handleSubmit = useCallback(async () => {
    if (!email.includes("@")) { setError("Please enter a valid email."); return; }
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      if (res.ok) setSubmitted(true); else setError("Something went wrong.");
    } catch { setError("Something went wrong."); } finally { setLoading(false); }
  }, [email]);

  return (
    <section ref={ref} className="relative py-28 md:py-40 px-6 md:px-20 overflow-hidden" style={{ background: C.cream }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 40% at 50% 70%, ${C.roseBg} 0%, transparent 70%)` }} />
      <div className="relative max-w-[440px] mx-auto text-center">
        <div data-r="" className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full" style={{ background: "#fff", border: `1px solid ${C.border}` }}>
          <span style={{ width: 5, height: 5, borderRadius: 99, background: C.green }} />
          <span className="text-[10px] font-medium tracking-[0.08em] uppercase" style={{ color: C.textSec }}>Android waitlist open · iOS founding codes closed</span>
        </div>
        <h2 data-r="" className="text-[26px] md:text-[40px] leading-[1.2] tracking-[-0.03em] mb-3" style={{ fontFamily: SERIF, color: C.text }}>
          See what 584 landmarks reveal about <em style={{ color: C.rose }}>your face.</em>
        </h2>
        <p data-r="" className="text-[13px] font-light mb-10 leading-relaxed" style={{ color: C.textSec }}>
          The iOS founding-member codes are all claimed. We&apos;re building the Android release now — join the waitlist to be first in line when it drops.
        </p>
        <div data-r="">
          {!submitted ? (
            <div className="flex flex-col gap-3">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
                placeholder="Your best email"
                className="w-full px-5 py-4 text-[15px] outline-none rounded-xl text-center"
                style={{ background: "#fff", border: `1px solid ${C.border}`, color: C.text }} />
              <button onClick={handleSubmit} disabled={loading}
                className="w-full font-semibold text-[15px] py-4 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.97] transition-transform"
                style={{ background: C.green, color: "#fff", boxShadow: "0 4px 20px rgba(59,90,62,0.25)" }}>
                <span>{loading ? "Reserving…" : "Join the Android Waitlist"}</span>
                <span style={{ fontSize: 18 }}>→</span>
              </button>
              {error && <p className="text-[11px]" style={{ color: C.rose }}>{error}</p>}
            </div>
          ) : (
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl" style={{ background: "rgba(59,90,62,0.08)", border: "1px solid rgba(59,90,62,0.2)" }}>
              <svg width="16" height="14" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke={C.green} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <p className="text-[14px] font-medium" style={{ color: C.text }}>You&apos;re in!</p>
            </div>
          )}
        </div>
        <p data-r="" className="text-[10px] mt-8" style={{ color: C.textTer }}>Live on iOS. Android release in the works — free at launch.</p>
      </div>
    </section>
  );
}

// ─── EXPORT ────────────────────────────
export default function Sections() {
  return (
    <div>
      <HeroTransition />
      <LeadText />
      <DarkToCream />
      <HowItWorks />
      <ScoreShowcase />
      <AppShowcase />
      <FeaturesAccordion />
      <DataStrip />
      <Positioning />
      <FinalCTA />
    </div>
  );
}
