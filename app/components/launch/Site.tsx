"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate, useReducedMotion } from "framer-motion";

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

/* ───────────────────  HERO — "THE READING ROOM"  ─────────────────── */
/* A pinned, scroll-scrubbed develop: a soft "?" portrait is read by a single
   caliper, 584 landmarks settle, the φ-geometry proves it, and "97 · ethereal"
   arrives last. ONE normalized progress (0→1) drives every layer imperatively
   (no per-frame React state); a static composition renders under
   prefers-reduced-motion. Pinned via sticky (robust on touch), not GSAP. */

const clampN = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const seg = (p: number, a: number, b: number) => clampN((p - a) / (b - a), 0, 1);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function hexToRgb(h: string): [number, number, number] {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
const RGB_PAPER = hexToRgb(C.paper);
const RGB_INK = hexToRgb(C.ink);
const mix = (a: number[], b: number[], t: number) =>
  `rgb(${Math.round(lerp(a[0], b[0], t))},${Math.round(lerp(a[1], b[1], t))},${Math.round(lerp(a[2], b[2], t))})`;

function mulberry32(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type LM = { x: number; y: number; key: boolean };

// Face region in plate-normalized coords (tuned to face2.png inside a 4/5 plate)
const FACE = { topY: 0.11, chinY: 0.5, cx: 0.5, halfW: 0.225 };

function buildFaceMesh(): LM[] {
  const rnd = mulberry32(20260609);
  const P: LM[] = [];
  const { cx, topY, chinY, halfW } = FACE;
  const faceH = chinY - topY;
  const ecy = (topY + chinY) / 2;
  const ry = faceH / 2;
  const push = (x: number, y: number, key = false, j = 0.008) =>
    P.push({ x: x + (rnd() - 0.5) * j, y: y + (rnd() - 0.5) * j, key });

  for (let i = 0; i < 60; i++) {
    const a = -Math.PI / 2 + (i / 60) * Math.PI * 2;
    push(cx + Math.cos(a) * halfW, ecy + Math.sin(a) * ry * 1.05);
  }
  for (let i = 0; i < 22; i++) {
    const t = i / 21;
    const a = Math.PI * (0.16 + 0.68 * t);
    push(cx - Math.cos(a) * halfW * 0.97, ecy + Math.sin(a) * ry * 1.05, i === 11);
  }
  const browY = topY + faceH * 0.32;
  for (let s = -1; s <= 1; s += 2)
    for (let i = 0; i < 9; i++) {
      const t = i / 8;
      push(cx + s * (0.05 + t * 0.12), browY - Math.sin(t * Math.PI) * 0.012, i === 0 || i === 8);
    }
  const eyeY = topY + faceH * 0.42;
  for (let s = -1; s <= 1; s += 2) {
    const ex = cx + s * 0.105;
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      push(ex + Math.cos(a) * 0.05, eyeY + Math.sin(a) * 0.022, i === 0 || i === 6);
    }
  }
  const noseBotY = topY + faceH * 0.64;
  for (let i = 0; i < 7; i++) push(cx, lerp(eyeY, noseBotY, i / 6), i === 6, 0.004);
  for (let i = 0; i < 7; i++) {
    const t = i / 6;
    push(cx + (t - 0.5) * 0.075, noseBotY + Math.abs(t - 0.5) * 0.012, i === 0 || i === 6);
  }
  const lipY = topY + faceH * 0.77;
  for (let i = 0; i < 15; i++) {
    const t = i / 14;
    const x = cx + (t - 0.5) * 0.15;
    const yo = Math.sin(t * Math.PI) * 0.018;
    push(x, lipY - yo, i === 0 || i === 14);
    push(x, lipY + yo * 0.7);
  }
  for (let i = 0; i < 34; i++) {
    const a = rnd() * Math.PI * 2;
    const rr = Math.sqrt(rnd());
    push(cx + Math.cos(a) * halfW * 0.8 * rr, ecy + Math.sin(a) * ry * 0.88 * rr);
  }
  return P;
}

const BANDS = [
  { y: 0.2, label: "BROW TILT", value: "4.6°" },
  { y: 0.27, label: "INTERCANTHAL", value: "33.1 MM" },
  { y: 0.34, label: "NASAL WIDTH", value: "31.8 MM" },
  { y: 0.42, label: "LIP FULLNESS", value: "8.7 / 10" },
  { y: 0.48, label: "JAW ANGLE", value: "122°" },
];

function ReadingRoomHero() {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // Keep SSR and first client render in agreement (both non-reduced), then settle
  // to the real preference after mount — avoids a hydration mismatch on the
  // section height (320vh vs 100svh) for reduced-motion users.
  const reduce = mounted ? prefersReduced : false;
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rulerRef = useRef<HTMLDivElement>(null);
  const softRef = useRef<HTMLImageElement>(null);
  const sharpRef = useRef<HTMLDivElement>(null);
  const vignRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const tabRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const numWrapRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLDivElement>(null);
  const outOfRef = useRef<HTMLDivElement>(null);
  const etherRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!stage || !canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mesh = buildFaceMesh();
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const visible = mobile ? mesh.filter((_, i) => i % 3 !== 0) : mesh;

    let cssW = 0,
      cssH = 0;
    const measure = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(mobile ? 1.5 : 2, window.devicePixelRatio || 1);
      cssW = r.width;
      cssH = r.height;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const bandAt = (cy: number) => {
      let b = BANDS[0];
      for (const x of BANDS) if (cy >= x.y) b = x;
      return b;
    };

    const draw = (p: number, caliperY: number, dev: number) => {
      const W = cssW,
        H = cssH;
      ctx.clearRect(0, 0, W, H);
      const span = FACE.chinY - FACE.topY + 0.14;
      const fH = FACE.chinY - FACE.topY;

      // 0.50→0.66 : landmarks settle top→bottom, then dim (but stay legible) before the number
      const wave = seg(p, 0.5, 0.66);
      const gdot = wave > 0 ? lerp(1, 0.55, seg(p, 0.66, 0.82)) : 0;
      if (gdot > 0) {
        for (const m of visible) {
          const ny = (m.y - FACE.topY) / span;
          const a = clampN((wave * 1.25 - ny) / 0.1, 0, 1) * gdot;
          if (a < 0.02) continue;
          ctx.beginPath();
          ctx.arc(m.x * W, m.y * H, m.key ? 2.3 : 1.5, 0, Math.PI * 2);
          ctx.fillStyle = m.key ? `rgba(199,97,124,${0.95 * a})` : `rgba(247,242,233,${0.6 * a})`;
          ctx.fill();
        }
      }

      // 0.66→0.78 : the proof — thirds + one φ rectangle (the only forest)
      const geo = seg(p, 0.66, 0.78);
      if (geo > 0) {
        ctx.lineWidth = 1;
        const thirds = [FACE.topY + fH * 0.32, FACE.topY + fH * 0.64, FACE.chinY - 0.004];
        thirds.forEach((ty, i) => {
          const fr = clampN(geo * 3 - i, 0, 1);
          if (fr <= 0) return;
          const x0 = W * (FACE.cx - FACE.halfW * 1.2);
          ctx.strokeStyle = "rgba(108,150,112,0.92)";
          ctx.beginPath();
          ctx.moveTo(x0, ty * H);
          ctx.lineTo(x0 + W * FACE.halfW * 2.4 * fr, ty * H);
          ctx.stroke();
        });
        if (geo > 0.5) {
          const fr = clampN((geo - 0.5) / 0.5, 0, 1);
          const x = W * (FACE.cx - 0.12),
            y = H * (FACE.topY + fH * 0.4),
            w = W * 0.24,
            h = H * fH * 0.42;
          ctx.strokeStyle = "rgba(118,160,122,0.95)";
          ctx.beginPath();
          ctx.moveTo(x, y);
          let rem = 2 * (w + h) * fr,
            cxp = x,
            cyp = y;
          for (const [sx, sy] of [[w, 0], [0, h], [-w, 0], [0, -h]] as const) {
            const len = Math.abs(sx) + Math.abs(sy);
            const f = clampN(rem / len, 0, 1);
            cxp += sx * f;
            cyp += sy * f;
            ctx.lineTo(cxp, cyp);
            rem -= len;
            if (rem <= 0) break;
          }
          ctx.stroke();
        }
      }

      // 0.25→0.55 : the caliper (drawn last, on top) — the signature
      const calA = Math.min(seg(p, 0.25, 0.28), 1) - seg(p, 0.52, 0.56);
      if (calA > 0.02) {
        const y = caliperY * H;
        ctx.strokeStyle = `rgba(244,238,228,${0.9 * calA})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(W * 0.1, y);
        ctx.lineTo(W * 0.9, y);
        ctx.stroke();
        ctx.strokeStyle = `rgba(194,86,111,${0.95 * calA})`;
        ctx.lineWidth = 1.5;
        for (const x of [W * 0.1, W * 0.9]) {
          ctx.beginPath();
          ctx.moveTo(x, y - 5);
          ctx.lineTo(x, y + 5);
          ctx.stroke();
        }
        const b = bandAt(caliperY);
        ctx.font = "600 10px 'Spline Sans Mono', ui-monospace, monospace";
        ctx.textAlign = "right";
        ctx.textBaseline = "bottom";
        ctx.fillStyle = `rgba(244,238,228,${0.85 * calA})`;
        ctx.fillText(`${b.label} · ${b.value}`, W * 0.88, y - 7);
        ctx.textAlign = "left";
      }
    };

    const render = (p: number) => {
      const dark = seg(p, 0.12, 0.42);
      stage.style.backgroundColor = mix(RGB_PAPER, RGB_INK, dark);
      stage.style.setProperty("--fg", mix(RGB_INK, RGB_PAPER, dark));
      if (rulerRef.current)
        rulerRef.current.style.clipPath = `inset(${(1 - seg(p, 0.05, 0.22)) * 100}% 0 0 0)`;
      if (softRef.current) {
        const c = seg(p, 0.1, 0.3);
        softRef.current.style.filter = `blur(${lerp(7, 4.5, c)}px) brightness(${lerp(1.08, 1.02, c)}) saturate(${lerp(1.2, 1.12, c)})`;
      }
      const dev = seg(p, 0.26, 0.5);
      const caliperY = lerp(FACE.topY, FACE.chinY, dev);
      const revealY = dev >= 1 ? 1 : caliperY;
      if (sharpRef.current) sharpRef.current.style.clipPath = `inset(0 0 ${(1 - revealY) * 100}% 0)`;
      if (vignRef.current) vignRef.current.style.opacity = `${dark}`;
      const num = seg(p, 0.78, 0.9);
      if (plateRef.current) plateRef.current.style.transform = `scale(${lerp(1, 0.985, num)})`;
      if (numWrapRef.current) {
        numWrapRef.current.style.opacity = `${seg(p, 0.76, 0.82)}`;
        numWrapRef.current.style.transform = `translateY(${lerp(14, 0, seg(p, 0.76, 0.88))}px)`;
      }
      if (numRef.current) numRef.current.textContent = `${Math.round(lerp(0, 97, seg(p, 0.78, 0.87)))}`;
      if (outOfRef.current) outOfRef.current.style.opacity = `${seg(p, 0.75, 0.8)}`;
      if (etherRef.current) {
        etherRef.current.style.opacity = `${seg(p, 0.86, 0.92)}`;
        etherRef.current.style.transform = `translateY(${lerp(12, 0, seg(p, 0.86, 0.96))}px)`;
      }
      if (cueRef.current) cueRef.current.style.opacity = `${1 - seg(p, 0.03, 0.12)}`;
      if (tabRef.current) tabRef.current.textContent = p > 0.6 ? "PLATE 01 · READ" : "PLATE 01 · UNREAD";
      if (badgesRef.current) badgesRef.current.style.opacity = `${seg(p, 0.85, 1)}`;
      if (quoteRef.current) {
        quoteRef.current.style.opacity = `${seg(p, 0.9, 0.99)}`;
        quoteRef.current.style.transform = `translateY(${lerp(18, 0, seg(p, 0.9, 1))}px)`;
      }
      draw(p, caliperY, dev);
    };

    if (reduce) {
      measure();
      render(1);
      const onR = () => {
        measure();
        render(1);
      };
      window.addEventListener("resize", onR);
      return () => window.removeEventListener("resize", onR);
    }

    measure();
    let cur = 0,
      target = 0,
      raf = 0,
      alive = true,
      running = false;
    const ro = new ResizeObserver(([e]) => {
      // Skip sticky-reflow callbacks that don't actually change the canvas box.
      if (e.contentRect.width === cssW && e.contentRect.height === cssH) return;
      measure();
      render(cur);
    });
    ro.observe(canvas);

    const compute = () => {
      const r = section.getBoundingClientRect();
      // Use the sticky stage's own height (100svh — stable), NOT window.innerHeight,
      // which changes as the mobile URL bar shows/hides and would make progress jump.
      const dist = r.height - stage.offsetHeight;
      return dist <= 0 ? 0 : clampN(-r.top / dist, 0, 1);
    };
    const tick = () => {
      if (!alive) return;
      cur += (target - cur) * 0.14;
      if (Math.abs(target - cur) < 0.0002) cur = target;
      render(cur);
      if (cur === target) {
        running = false; // settled — stop burning frames until the next scroll
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!running && alive) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    const onScroll = () => {
      target = compute();
      wake();
    };
    target = compute();
    render(cur);
    wake();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduce]);

  const TRACK = 320; // vh of scroll the pin consumes
  const cropMarks = [
    "top-[-12px] left-[-12px] border-l border-t",
    "top-[-12px] right-[-12px] border-r border-t",
    "bottom-[-12px] left-[-12px] border-l border-b",
    "bottom-[-12px] right-[-12px] border-r border-b",
  ];

  return (
    <section id="top" ref={sectionRef} style={{ height: reduce ? "100svh" : `${TRACK}vh` }}>
      <div
        ref={stageRef}
        className="sticky top-0 h-[100svh] overflow-hidden flex items-center"
        style={{ background: C.paper, ["--fg" as string]: C.ink } as React.CSSProperties}
      >
        <div
          ref={rulerRef}
          className="ruler-y absolute left-0 top-0 bottom-0 w-[10px] hidden md:block"
          style={{ opacity: 0.5 }}
        />

        <div className="w-full max-w-[1320px] mx-auto px-6 md:px-10 grid lg:grid-cols-[1fr_minmax(0,440px)] gap-10 lg:gap-12 items-center">
          {/* copy */}
          <div className="relative z-10 order-2 lg:order-1">
            <div className="mono-label flex items-center gap-3 mb-6" style={{ color: "var(--fg)", opacity: 0.55 }}>
              <span style={{ color: C.rose }}>Vol. 01</span>
              <span className="w-8 h-px" style={{ background: "currentColor" }} />
              <span>The science of your face</span>
            </div>

            <h1 className="font-display leading-[0.92] tracking-[-0.03em]" style={{ color: "var(--fg)", fontSize: "clamp(2.6rem, 6.4vw, 5rem)" }}>
              <span className="block">Your face,</span>
              <span className="block">
                by the <span className="italic" style={{ color: C.rose }}>numbers.</span>
              </span>
            </h1>

            <p className="mt-6 max-w-[440px] text-[15px] md:text-[16px] leading-[1.7]" style={{ color: "var(--fg)", opacity: 0.62 }}>
              584 landmarks. 75 measurements. Watch the unknown resolve into the most precise beauty
              read ever put in a pocket — one number that finally means something.
            </p>

            <div ref={badgesRef} className="mt-8 flex flex-wrap items-center gap-3" style={{ opacity: 0 }}>
              <a href="#" className="group inline-flex items-center gap-3 rounded-full px-5 py-3 transition-transform active:scale-[0.97]" style={{ background: C.paper, color: C.ink }}>
                <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden>
                  <path d="M17.05 12.04c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.1-2.01-3.77-2.04-1.6-.16-3.13.94-3.94.94-.82 0-2.07-.92-3.41-.9-1.75.03-3.37 1.02-4.27 2.59-1.82 3.16-.47 7.83 1.31 10.4.87 1.26 1.9 2.67 3.25 2.62 1.31-.05 1.8-.85 3.38-.85 1.57 0 2.01.85 3.39.82 1.4-.02 2.29-1.28 3.14-2.55.99-1.46 1.4-2.87 1.42-2.95-.03-.01-2.72-1.04-2.75-4.13M14.6 4.59c.72-.87 1.2-2.08 1.07-3.29-1.03.04-2.28.69-3.02 1.56-.66.77-1.24 2-1.08 3.18 1.15.09 2.32-.58 3.03-1.45" />
                </svg>
                <span className="text-left leading-none">
                  <span className="block text-[8px] tracking-[0.18em] uppercase opacity-60 font-mono">Download on the</span>
                  <span className="block text-[14px] font-semibold mt-[3px]">App Store</span>
                </span>
              </a>
              <a href="#" className="group inline-flex items-center gap-3 rounded-full px-5 py-3 transition-transform active:scale-[0.97]" style={{ background: "transparent", color: C.paper, border: "1px solid rgba(244,238,228,0.28)" }}>
                <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden>
                  <path d="M3 2.2v19.6a.6.6 0 0 0 .92.5l16.3-9.8a.6.6 0 0 0 0-1.03L3.92 1.7A.6.6 0 0 0 3 2.2Z" />
                </svg>
                <span className="text-left leading-none">
                  <span className="block text-[8px] tracking-[0.18em] uppercase opacity-60 font-mono">Get it on</span>
                  <span className="block text-[14px] font-semibold mt-[3px]">
                    Google Play
                    <span className="ml-1.5 align-middle text-[8px] tracking-[0.16em] px-1.5 py-[2px] rounded-full font-mono" style={{ background: C.rose, color: "#fff" }}>SOON</span>
                  </span>
                </span>
              </a>
            </div>

            <div ref={quoteRef} className="mt-7 max-w-[420px]" style={{ opacity: 0 }}>
              <p className="font-display italic text-[17px] leading-[1.45]" style={{ color: "var(--fg)" }}>
                “A defined lower third anchors the whole read.”
              </p>
              <p className="mono-label mt-3" style={{ color: "var(--fg)", opacity: 0.5 }}>Free at launch · Live now on iOS · Android soon</p>
            </div>
          </div>

          {/* plate */}
          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
            <span className="font-display absolute select-none italic pointer-events-none" style={{ color: C.rosePale, opacity: 0.38, fontSize: "clamp(8rem,18vw,15rem)", top: "-9%", right: "-3%", lineHeight: 1, zIndex: 0 }}>97</span>
            <div ref={plateRef} className="relative" style={{ width: "min(440px, 80vw)", aspectRatio: "4 / 5", zIndex: 1, willChange: "transform" }}>
              {cropMarks.map((c) => (
                <span key={c} className={`absolute w-3 h-3 ${c}`} style={{ borderColor: "rgba(244,238,228,0.4)" }} />
              ))}
              <div ref={tabRef} className="mono-label absolute right-0 -top-7" style={{ color: "var(--fg)", opacity: 0.5 }}>PLATE 01 · UNREAD</div>
              <div className="absolute inset-0 overflow-hidden rounded-[1.6rem]" style={{ background: "#0c0c0e" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img ref={softRef} src="/face2.png" alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "50% 45%", filter: "blur(7px) brightness(1.08) saturate(1.2)" }} draggable={false} />
                <div ref={sharpRef} className="absolute inset-0" style={{ clipPath: "inset(0 0 100% 0)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/face2.png" alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "50% 45%", filter: "blur(0px) brightness(0.68) contrast(1.2) saturate(0.82)" }} draggable={false} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(14,16,26,0.46), rgba(8,8,14,0.64))", mixBlendMode: "multiply" }} />
                </div>
                <div ref={vignRef} className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(120% 88% at 50% 34%, transparent 50%, rgba(8,8,12,0.62) 100%)", opacity: 0 }} />
                <canvas ref={canvasRef} aria-hidden className="absolute inset-0 w-full h-full" />
                <div ref={numWrapRef} className="absolute inset-x-0 text-center pointer-events-none" style={{ top: "57%", opacity: 0 }}>
                  <div ref={outOfRef} className="mono-label" style={{ color: "rgba(244,238,228,0.6)", opacity: 0 }}>Out of 100</div>
                  <div ref={numRef} className="font-display tabular-nums" style={{ color: C.rose, fontSize: "clamp(3.6rem, 11vw, 6.4rem)", lineHeight: 1 }}>0</div>
                  <div ref={etherRef} className="font-display italic" style={{ color: C.rosePale, fontSize: "clamp(1.1rem, 3.2vw, 1.7rem)", opacity: 0 }}>ethereal</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <div ref={cueRef} className="mono-label absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: "var(--fg)", opacity: 0.6 }}>
          <span>Scroll to develop</span>
          <span style={{ fontSize: 14 }}>↓</span>
        </div>
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
            <p className="mono-label mt-5" style={{ color: "rgba(244,238,228,0.5)" }}>Built for girls</p>
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
      <ReadingRoomHero />
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
