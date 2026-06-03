"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Design tokens as explicit values — Lightning CSS prunes :root vars only used
// in JSX inline styles, so we keep the palette here.
const C = {
  paper: "#F4EEE4",
  paperDeep: "#ECE3D3",
  paperCard: "#FBF7EF",
  ink: "#1C1815",
  ink80: "rgba(28,24,21,0.80)",
  ink60: "rgba(28,24,21,0.60)",
  ink45: "rgba(28,24,21,0.45)",
  ink30: "rgba(28,24,21,0.30)",
  line: "rgba(28,24,21,0.16)",
  rose: "#C2566F",
  roseDeep: "#A23E56",
  rosePale: "#E7B8C2",
  forest: "#3B5A3E",
};

/* ─────────────────────────  PRIMITIVES  ───────────────────────── */

function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function Counter({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.5, ease: EASE, onUpdate: (x) => setV(x) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className="tabular-nums">
      {v.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function AppleBadge({ primary = true }: { primary?: boolean }) {
  return (
    <a
      href="#"
      className="group inline-flex items-center gap-3 rounded-full px-5 py-3 transition-transform active:scale-[0.97]"
      style={
        primary
          ? { background: C.ink, color: C.paper }
          : { background: "transparent", color: C.ink, border: "1px solid rgba(28,24,21,0.16)" }
      }
    >
      <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden>
        <path d="M17.05 12.04c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.1-2.01-3.77-2.04-1.6-.16-3.13.94-3.94.94-.82 0-2.07-.92-3.41-.9-1.75.03-3.37 1.02-4.27 2.59-1.82 3.16-.47 7.83 1.31 10.4.87 1.26 1.9 2.67 3.25 2.62 1.31-.05 1.8-.85 3.38-.85 1.57 0 2.01.85 3.39.82 1.4-.02 2.29-1.28 3.14-2.55.99-1.46 1.4-2.87 1.42-2.95-.03-.01-2.72-1.04-2.75-4.13M14.6 4.59c.72-.87 1.2-2.08 1.07-3.29-1.03.04-2.28.69-3.02 1.56-.66.77-1.24 2-1.08 3.18 1.15.09 2.32-.58 3.03-1.45" />
      </svg>
      <span className="text-left leading-none">
        <span className="block text-[8px] tracking-[0.18em] uppercase opacity-60 font-mono">Download on the</span>
        <span className="block text-[14px] font-semibold mt-[3px]">App Store</span>
      </span>
    </a>
  );
}

function GoogleBadge() {
  return (
    <a
      href="#"
      className="group inline-flex items-center gap-3 rounded-full px-5 py-3 transition-transform active:scale-[0.97]"
      style={{ background: "transparent", color: C.ink, border: "1px solid rgba(28,24,21,0.16)" }}
    >
      <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden>
        <path d="M3 2.2v19.6a.6.6 0 0 0 .92.5l16.3-9.8a.6.6 0 0 0 0-1.03L3.92 1.7A.6.6 0 0 0 3 2.2Z" />
      </svg>
      <span className="text-left leading-none">
        <span className="block text-[8px] tracking-[0.18em] uppercase opacity-60 font-mono">Get it on</span>
        <span className="block text-[14px] font-semibold mt-[3px]">
          Google Play
          <span className="ml-1.5 align-middle text-[8px] tracking-[0.16em] px-1.5 py-[2px] rounded-full font-mono" style={{ background: C.rose, color: "#fff" }}>
            SOON
          </span>
        </span>
      </span>
    </a>
  );
}

/* phone-screenshot "plate" with print crop marks */
function Plate({
  src,
  fig,
  caption,
  rotate = 0,
  float = false,
  width = 300,
}: {
  src: string;
  fig: string;
  caption: string;
  rotate?: number;
  float?: boolean;
  width?: number | string;
}) {
  return (
    <figure className="relative" style={{ width }}>
      <div style={{ transform: `rotate(${rotate}deg)` }}>
        <div className={float ? "atelier-float" : ""}>
          <div className="relative plate rounded-[2rem] p-[6px]">
            {/* corner crop marks */}
            {[
              "top-[-14px] left-[-14px] border-l border-t",
              "top-[-14px] right-[-14px] border-r border-t",
              "bottom-[-14px] left-[-14px] border-l border-b",
              "bottom-[-14px] right-[-14px] border-r border-b",
            ].map((c) => (
              <span key={c} className={`absolute w-3 h-3 ${c}`} style={{ borderColor: C.ink30 }} />
            ))}
            <div className="overflow-hidden rounded-[1.6rem]" style={{ aspectRatio: "1242 / 2688", background: "#0c0c0e" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-cover object-top" draggable={false} />
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mono-label mt-5 flex items-center gap-2">
        <span style={{ color: C.rose }}>{fig}</span>
        <span className="h-px flex-1" style={{ background: C.line }} />
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}

/* ─────────────────────────  MASTHEAD  ───────────────────────── */

function Masthead() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header
      className="fixed top-0 inset-x-0 z-[80] transition-colors duration-500"
      style={{
        background: scrolled ? "rgba(244,238,228,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: `1px solid ${scrolled ? C.line : "transparent"}`,
      }}
    >
      <div className="max-w-[1320px] mx-auto px-5 md:px-10 h-[64px] flex items-center justify-between">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-display text-[26px] leading-none" style={{ color: C.ink }}>
            Lumii
          </span>
          <span className="font-display text-[26px] leading-none italic" style={{ color: C.rose }}>
            ·
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9 absolute left-1/2 -translate-x-1/2">
          {[
            ["The read", "#read"],
            ["How it works", "#how"],
            ["Momo", "#momo"],
          ].map(([label, href]) => (
            <a key={href} href={href} className="mono-label hover:opacity-100 transition-opacity" style={{ opacity: 0.7 }}>
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#get"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold transition-transform active:scale-95"
          style={{ background: C.ink, color: C.paper }}
        >
          Download
          <span style={{ fontSize: 14 }}>↗</span>
        </a>
      </div>
    </header>
  );
}

/* ─────────────────────────  HERO  ───────────────────────── */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[120px] md:pt-[150px] pb-20 md:pb-28">
      {/* left ruler */}
      <div className="ruler-y absolute left-0 top-0 bottom-0 w-[10px] hidden md:block opacity-70" />
      {/* warm bloom */}
      <div className="absolute pointer-events-none" style={{ top: "8%", right: "-8%", width: "60%", height: "70%", background: "radial-gradient(ellipse at center, rgba(194,86,111,0.12) 0%, transparent 66%)" }} />

      <div className="max-w-[1320px] mx-auto px-5 md:px-10 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-8 items-center">
        {/* copy */}
        <div className="relative z-10">
          <motion.div
            className="mono-label flex items-center gap-3 mb-7"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            <span style={{ color: C.rose }}>Vol. 01</span>
            <span className="w-8 h-px" style={{ background: C.line }} />
            <span>The science of your face</span>
          </motion.div>

          <h1 className="font-display leading-[0.9] tracking-[-0.03em]" style={{ color: C.ink, fontSize: "clamp(3.1rem, 8.2vw, 6.6rem)" }}>
            {["Your face,", "by the"].map((line, i) => (
              <motion.span
                key={line}
                className="block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.2 + i * 0.12 }}
              >
                {line}
              </motion.span>
            ))}
            <motion.span
              className="block italic"
              style={{ color: C.rose }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.44 }}
            >
              numbers.
            </motion.span>
          </h1>

          <motion.p
            className="mt-7 max-w-[440px] text-[15px] md:text-[16px] leading-[1.7]"
            style={{ color: C.ink60 }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
          >
            Lumii maps <strong style={{ color: C.ink, fontWeight: 600 }}>584 landmarks</strong> across your face and
            returns the most precise beauty read ever put in a pocket — then the exact routine to raise it.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.72 }}
          >
            <AppleBadge />
            <GoogleBadge />
          </motion.div>

          <motion.div
            className="mono-label mt-7 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <span>Free at launch</span>
            <span className="w-1 h-1 rounded-full" style={{ background: C.rose }} />
            <span>Live now on iOS</span>
          </motion.div>
        </div>

        {/* plate */}
        <motion.div
          className="relative flex justify-center lg:justify-end"
          initial={{ opacity: 0, y: 40, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
        >
          {/* watermark 97 */}
          <span
            className="font-display absolute -z-0 select-none italic"
            style={{ color: C.rosePale, opacity: 0.5, fontSize: "clamp(10rem,22vw,20rem)", top: "-6%", left: "-4%", lineHeight: 1 }}
          >
            97
          </span>
          <Plate src="/screenshots/app-score.jpg" fig="Fig. 01" caption="The read — Charlotte, 97" float width={296} />
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────  METRICS BAND  ───────────────────────── */

function MetricsBand() {
  const items = ["584 Landmarks", "75 Measurements", "8 Categories", "5 Skin Zones", "3 Photos", "Under 30 Seconds"];
  const row = [...items, ...items];
  return (
    <section className="py-5 overflow-hidden" style={{ background: C.ink, color: C.paper }}>
      <div className="flex whitespace-nowrap atelier-marquee">
        {row.map((t, i) => (
          <span key={i} className="flex items-center font-mono text-[12px] tracking-[0.16em] uppercase">
            <span className="px-7" style={{ opacity: 0.92 }}>{t}</span>
            <span style={{ color: C.rose }}>✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────  THE READ  ───────────────────────── */

function TheRead() {
  return (
    <section id="read" className="py-24 md:py-36">
      <div className="max-w-[1320px] mx-auto px-5 md:px-10">
        <Reveal>
          <div className="mono-label flex items-center gap-3 mb-10">
            <span style={{ color: C.rose }}>§ 01</span>
            <span className="w-10 h-px" style={{ background: C.line }} />
            <span>The read</span>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-14 lg:gap-10 items-center">
          <div>
            <Reveal>
              <h2 className="font-display leading-[0.98] tracking-[-0.02em]" style={{ color: C.ink, fontSize: "clamp(2.2rem,5vw,3.8rem)" }}>
                A score that finally <span className="italic" style={{ color: C.rose }}>means</span> something.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[460px] text-[15px] leading-[1.75]" style={{ color: C.ink60 }}>
                Eight categories, each scored on its own — symmetry, harmony, eyes, nose, lips, jaw, skin and
                proportions. Not a vibe. A measured read of your face against clinically-studied ideals, with the
                exact numbers behind every line.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-3 gap-5 max-w-[460px]">
              {[
                { n: 584, s: "", l: "Landmarks" },
                { n: 75, s: "+", l: "Metrics" },
                { n: 8, s: "", l: "Categories" },
              ].map((stat, i) => (
                <Reveal key={stat.l} delay={0.15 + i * 0.08}>
                  <div className="pt-4" style={{ borderTop: "1px solid rgba(28,24,21,0.16)" }}>
                    <div className="font-display text-[40px] leading-none" style={{ color: C.ink }}>
                      <Counter to={stat.n} suffix={stat.s} />
                    </div>
                    <div className="mono-label mt-2">{stat.l}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.15} className="flex justify-center lg:justify-end">
            <Plate src="/screenshots/app-home.jpg" fig="Fig. 02" caption="Daily glow — the dashboard" rotate={2} width={272} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  PULL QUOTE  ───────────────────────── */

function PullQuote() {
  return (
    <section className="py-20 md:py-28" style={{ background: C.paperDeep }}>
      <div className="max-w-[1000px] mx-auto px-6 text-center">
        <Reveal>
          <p className="mono-label mb-7" style={{ color: C.rose }}>From a sample report</p>
        </Reveal>
        <Reveal delay={0.08}>
          <blockquote className="font-display italic leading-[1.12] tracking-[-0.01em]" style={{ color: C.ink, fontSize: "clamp(1.8rem,4.6vw,3.4rem)" }}>
            “A defined lower third anchors the whole read — your intercanthal width is a strength.”
          </blockquote>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mono-label mt-8">Lumii, on a 97 · Face shape: Heart</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────  FEATURE PLATE  ───────────────────────── */

function FeaturePlate({
  index,
  src,
  fig,
  caption,
  kicker,
  title,
  body,
  flip = false,
}: {
  index: string;
  src: string;
  fig: string;
  caption: string;
  kicker: string;
  title: React.ReactNode;
  body: string;
  flip?: boolean;
}) {
  return (
    <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center`}>
      <Reveal className={`flex justify-center ${flip ? "lg:order-2 lg:justify-start" : "lg:justify-end"}`}>
        <Plate src={src} fig={fig} caption={caption} rotate={flip ? 2.5 : -2.5} width={264} />
      </Reveal>
      <Reveal delay={0.1} className={flip ? "lg:order-1" : ""}>
        <div className="mono-label flex items-center gap-3 mb-6">
          <span style={{ color: C.rose }}>{index}</span>
          <span className="w-8 h-px" style={{ background: C.line }} />
          <span>{kicker}</span>
        </div>
        <h3 className="font-display leading-[1.0] tracking-[-0.02em]" style={{ color: C.ink, fontSize: "clamp(2rem,4.4vw,3.2rem)" }}>
          {title}
        </h3>
        <p className="mt-5 max-w-[440px] text-[15px] leading-[1.75]" style={{ color: C.ink60 }}>
          {body}
        </p>
      </Reveal>
    </div>
  );
}

function Features() {
  return (
    <section className="py-24 md:py-36">
      <div className="max-w-[1320px] mx-auto px-5 md:px-10 flex flex-col gap-28 md:gap-40">
        <FeaturePlate
          index="§ 02"
          src="/screenshots/app-confidence.jpg"
          fig="Fig. 03"
          caption="The routine — built from your numbers"
          kicker="The routine"
          title={<>Advice tied to your <span className="italic" style={{ color: C.rose }}>actual</span> measurements.</>}
          body="Every tip traces back to a number on your report — skin, jaw, eye area, posture. The anatomy behind why it works, the steps to do it, and a one-tap add to your daily goals."
        />
        <FeaturePlate
          flip
          index="§ 03"
          src="/screenshots/app-home.jpg"
          fig="Fig. 04"
          caption="Progress — your glow, trending"
          kicker="Progress"
          title={<>Watch the score <span className="italic" style={{ color: C.rose }}>move.</span></>}
          body="Scan again over time and Lumii tracks every metric against your baseline. Streaks, milestones, and a trend line that turns a glow-up from a guess into something you can measure."
        />
      </div>
    </section>
  );
}

/* ─────────────────────────  HOW IT WORKS  ───────────────────────── */

function HowItWorks() {
  const steps = [
    { n: "I", t: "Scan", b: "Front, left, right. The guided camera lines you up — three photos in under thirty seconds." },
    { n: "II", t: "Measure", b: "584 landmarks mapped, 75+ metrics scored against clinically-studied ideals." },
    { n: "III", t: "Glow", b: "A precise breakdown, a routine tied to your numbers, and Momo to keep you at it." },
  ];
  return (
    <section id="how" className="py-24 md:py-32" style={{ background: C.ink, color: C.paper }}>
      <div className="max-w-[1320px] mx-auto px-5 md:px-10">
        <Reveal>
          <div className="mono-label flex items-center gap-3 mb-12" style={{ color: "rgba(244,238,228,0.5)" }}>
            <span style={{ color: C.rosePale }}>§ 04</span>
            <span className="w-10 h-px" style={{ background: "rgba(244,238,228,0.2)" }} />
            <span>The method</span>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-px" style={{ background: "rgba(244,238,228,0.14)" }}>
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12} className="h-full">
              <div className="h-full px-7 py-10 md:py-14" style={{ background: C.ink }}>
                <div className="font-display text-[clamp(3rem,6vw,5rem)] leading-none" style={{ color: C.rosePale }}>{s.n}</div>
                <h3 className="font-display text-[26px] mt-5" style={{ color: C.paper }}>{s.t}</h3>
                <p className="mt-3 text-[14px] leading-[1.7]" style={{ color: "rgba(244,238,228,0.6)" }}>{s.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  MOMO  ───────────────────────── */

function Momo() {
  return (
    <section id="momo" className="py-24 md:py-36">
      <div className="max-w-[1320px] mx-auto px-5 md:px-10">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-14 items-center">
          <div>
            <Reveal>
              <div className="mono-label flex items-center gap-3 mb-6">
                <span style={{ color: C.rose }}>§ 05</span>
                <span className="w-8 h-px" style={{ background: C.line }} />
                <span>The companion</span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display leading-[0.98] tracking-[-0.02em]" style={{ color: C.ink, fontSize: "clamp(2.2rem,5vw,3.8rem)" }}>
                Meet <span className="italic" style={{ color: C.rose }}>Momo.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-[420px] text-[15px] leading-[1.75]" style={{ color: C.ink60 }}>
                Your read is honest, but never cold. Momo turns your goals into daily missions, cheers your streaks,
                and talks you through every score — proof that beauty maths can still feel like a friend.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-9 flex gap-8">
                <div>
                  <div className="font-display text-[34px] leading-none" style={{ color: C.ink }}>Lv 1</div>
                  <div className="mono-label mt-2">Grows with you</div>
                </div>
                <div>
                  <div className="font-display text-[34px] leading-none" style={{ color: C.ink }}>Daily</div>
                  <div className="mono-label mt-2">Missions & streaks</div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="relative rounded-[28px] px-5 sm:px-6 py-12 md:py-16 flex justify-center gap-4 sm:gap-6 overflow-hidden" style={{ background: C.paperDeep }}>
            <Reveal className="mt-8">
              <Plate src="/screenshots/app-goals.jpg" fig="Fig. 05" caption="Missions" rotate={-3} width="clamp(132px, 38vw, 210px)" />
            </Reveal>
            <Reveal delay={0.12} className="-mt-2">
              <Plate src="/screenshots/app-chat.jpg" fig="Fig. 06" caption="Chat with Momo" rotate={3} float width="clamp(132px, 38vw, 210px)" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  CLOSING CTA  ───────────────────────── */

function Closing() {
  return (
    <section id="get" className="relative py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(194,86,111,0.14) 0%, transparent 68%)" }} />
      <div className="ruler-x absolute top-0 inset-x-0 h-[10px] opacity-60" />
      <div className="ruler-x absolute bottom-0 inset-x-0 h-[10px] opacity-60" />

      <div className="relative max-w-[900px] mx-auto px-6 text-center">
        <Reveal>
          <p className="mono-label mb-8">Free at launch · iOS now, Android next</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display leading-[0.92] tracking-[-0.03em]" style={{ color: C.ink, fontSize: "clamp(2.8rem,8vw,6rem)" }}>
            Read your <span className="italic" style={{ color: C.rose }}>face.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-[440px] mx-auto text-[15px] leading-[1.7]" style={{ color: C.ink60 }}>
            See what 584 landmarks reveal — and the routine to raise your score. Free to download.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <AppleBadge />
            <GoogleBadge />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────  COLOPHON  ───────────────────────── */

function Colophon() {
  return (
    <footer style={{ background: C.ink, color: C.paper }}>
      <div className="max-w-[1320px] mx-auto px-5 md:px-10 py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <div className="font-display text-[48px] leading-none">
              Lumii<span className="italic" style={{ color: C.rosePale }}>.</span>
            </div>
            <p className="mono-label mt-5" style={{ color: "rgba(244,238,228,0.5)" }}>Built for girls, by girls</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-4">
            {[
              ["The read", "#read"],
              ["How it works", "#how"],
              ["Momo", "#momo"],
              ["Privacy", "/legal/privacy-policy"],
              ["Terms", "/legal/terms-of-service"],
              ["Contact", "mailto:hello@lumiiapp.com"],
            ].map(([l, h]) => (
              <a key={l} href={h} className="text-[13px] transition-opacity hover:opacity-100" style={{ color: "rgba(244,238,228,0.62)" }}>
                {l}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-14 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" style={{ borderTop: "1px solid rgba(244,238,228,0.14)" }}>
          <p className="mono-label" style={{ color: "rgba(244,238,228,0.4)" }}>Vol. 01 · The Face Issue · Designed in London</p>
          <p className="mono-label" style={{ color: "rgba(244,238,228,0.4)" }}>© {new Date().getFullYear()} HFJO&amp;CO Limited</p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────  PAGE  ───────────────────────── */

export default function Site() {
  return (
    <main className="relative overflow-x-hidden">
      <Masthead />
      <Hero />
      <MetricsBand />
      <TheRead />
      <PullQuote />
      <Features />
      <HowItWorks />
      <Momo />
      <Closing />
      <Colophon />
    </main>
  );
}
