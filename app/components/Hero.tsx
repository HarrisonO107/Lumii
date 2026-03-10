"use client";
import { useRef, useEffect, useState, useCallback, memo, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import type { IntroPhase } from "../lib/intro";

// ─────────────────────────────────────────
// CONSTANTS — defined once outside all components, never recreated
// ─────────────────────────────────────────
const IMG_W = 1536;
const IMG_H = 1024;
const FACE  = { x: 803, y: 115, w: 320, h: 447 } as const;

const LANDMARK_RATIOS = [
  { rx: 0.35, ry: 0.27 }, // left eye
  { rx: 0.65, ry: 0.27 }, // right eye
  { rx: 0.50, ry: 0.18 }, // forehead
  { rx: 0.50, ry: 0.48 }, // nose tip
  { rx: 0.50, ry: 0.65 }, // mouth
  { rx: 0.50, ry: 0.88 }, // chin
  { rx: 0.22, ry: 0.42 }, // left cheek
  { rx: 0.78, ry: 0.42 }, // right cheek
  { rx: 0.30, ry: 0.55 }, // left jaw
  { rx: 0.70, ry: 0.55 }, // right jaw
] as const;

const GHOST_ITEMS = [
  { label: "Texture",    base: 0.82,  pct: false, fixed: null        },
  { label: "Luminosity", base: 94,    pct: true,  fixed: null        },
  { label: "Symmetry",   base: 0.921, pct: false, fixed: null        },
  { label: "Undertone",  base: 0,     pct: false, fixed: "warm"      },
  { label: "Hydration",  base: 76,    pct: true,  fixed: null        },
  { label: "Pore·Sz",   base: 0.04,  pct: false, fixed: null        },
  { label: "Melanin",    base: 0.38,  pct: false, fixed: null        },
  { label: "Elasticity", base: 88,    pct: true,  fixed: null        },
  { label: "UV·Index",  base: 0,     pct: false, fixed: "type·III"  },
  { label: "Redness",    base: 0.12,  pct: false, fixed: null        },
  { label: "Collagen",   base: 91,    pct: true,  fixed: null        },
  { label: "Sebum",      base: 0.44,  pct: false, fixed: null        },
] as const;

const GHOST_POS = [
  { px: -0.85, py: -0.42 }, { px:  1.05, py: -0.38 },
  { px: -0.90, py: -0.22 }, { px:  1.08, py: -0.18 },
  { px: -0.80, py:  0.00 }, { px:  1.05, py:  0.00 },
  { px: -0.88, py:  0.18 }, { px:  1.06, py:  0.18 },
  { px: -0.75, py:  0.32 }, { px:  1.04, py:  0.32 },
  { px:  0.15, py: -0.60 }, { px:  0.65, py:  0.58 },
] as const;

const GHOST_INIT: string[] = GHOST_ITEMS.map(g =>
  g.fixed ?? (g.pct ? `${g.base}%` : g.base.toFixed(g.base < 1 ? 2 : 0))
);

const TOPO_RATIOS = [
  { x1:0.25,y1:0.15,cx:0.50,cy:0.05,x2:0.75,y2:0.15,o:0.07 },
  { x1:0.20,y1:0.22,cx:0.50,cy:0.10,x2:0.80,y2:0.22,o:0.06 },
  { x1:0.10,y1:0.38,cx:0.28,cy:0.30,x2:0.38,y2:0.35,o:0.07 },
  { x1:0.90,y1:0.38,cx:0.72,cy:0.30,x2:0.62,y2:0.35,o:0.07 },
  { x1:0.08,y1:0.48,cx:0.22,cy:0.38,x2:0.35,y2:0.44,o:0.06 },
  { x1:0.92,y1:0.48,cx:0.78,cy:0.38,x2:0.65,y2:0.44,o:0.06 },
  { x1:0.44,y1:0.25,cx:0.50,cy:0.22,x2:0.56,y2:0.25,o:0.08 },
  { x1:0.42,y1:0.32,cx:0.50,cy:0.28,x2:0.58,y2:0.32,o:0.07 },
  { x1:0.40,y1:0.40,cx:0.50,cy:0.35,x2:0.60,y2:0.40,o:0.06 },
  { x1:0.20,y1:0.68,cx:0.50,cy:0.62,x2:0.80,y2:0.68,o:0.07 },
  { x1:0.28,y1:0.76,cx:0.50,cy:0.72,x2:0.72,y2:0.76,o:0.06 },
  { x1:0.35,y1:0.84,cx:0.50,cy:0.82,x2:0.65,y2:0.84,o:0.05 },
  { x1:0.22,y1:0.28,cx:0.35,cy:0.24,x2:0.46,y2:0.28,o:0.08 },
  { x1:0.54,y1:0.28,cx:0.65,cy:0.24,x2:0.78,y2:0.28,o:0.08 },
  { x1:0.20,y1:0.34,cx:0.35,cy:0.29,x2:0.46,y2:0.33,o:0.06 },
  { x1:0.54,y1:0.33,cx:0.65,cy:0.29,x2:0.80,y2:0.34,o:0.06 },
] as const;

// ─────────────────────────────────────────
// FACE SCAN OVERLAY
// ─────────────────────────────────────────
const FaceScanOverlay = memo(function FaceScanOverlay({
  isScanning,
  isRevealed,
}: {
  isScanning: boolean;
  isRevealed: boolean;
}) {
  const [box, setBox]             = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [progress, setProgress]   = useState(0);
  const [nodeCount, setNodeCount] = useState(0);
  const [ghostVals, setGhostVals] = useState<string[]>(GHOST_INIT);

  const rafRef       = useRef<number>(0);
  const timersRef    = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);

  const clearAllAsync = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    timersRef.current.forEach(clearTimeout);
    intervalsRef.current.forEach(clearInterval);
    timersRef.current    = [];
    intervalsRef.current = [];
  }, []);

  useEffect(() => () => clearAllAsync(), [clearAllAsync]);

  const toScreen = useCallback(
    (imgX: number, imgY: number, scale: number, ox: number, oy: number) => ({
      x: imgX * scale - ox,
      y: imgY * scale - oy,
    }),
    []
  );

  useEffect(() => {
    const measure = () => {
      const section = document.getElementById("hero-section");
      if (!section) return;
      const vw    = section.clientWidth;
      const vh    = section.clientHeight;
      const scale = Math.max(vw / IMG_W, vh / IMG_H);
      const ox    = (IMG_W * scale - vw) / 2;
      const oy    = (IMG_H * scale - vh) / 2;
      const tl    = toScreen(FACE.x,          FACE.y,          scale, ox, oy);
      const br    = toScreen(FACE.x + FACE.w, FACE.y + FACE.h, scale, ox, oy);
      setBox({ left: tl.x, top: tl.y, width: br.x - tl.x, height: br.y - tl.y });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [toScreen]);

  useEffect(() => {
    if (!isScanning) { setProgress(0); return; }
    const DURATION = 4200;
    const start    = performance.now();
    const tick = (now: number) => {
      const p = Math.min(((now - start) / DURATION) * 100, 100);
      setProgress(Math.floor(p));
      if (p < 100) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isScanning]);

  useEffect(() => {
    if (!isScanning) { setNodeCount(0); return; }
    setNodeCount(0);
    LANDMARK_RATIOS.forEach((_, i) => {
      const t = setTimeout(() => setNodeCount(i + 1), 300 + i * 350);
      timersRef.current.push(t);
    });
    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
      setNodeCount(0);
    };
  }, [isScanning]);

  useEffect(() => {
    if (!isScanning) { setGhostVals(GHOST_INIT); return; }
    const iv = setInterval(() => {
      setGhostVals(
        GHOST_ITEMS.map(g => {
          if (g.fixed) return g.fixed;
          if (g.pct)   return `${Math.floor(g.base * 0.90 + Math.random() * g.base * 0.12)}%`;
          if (g.base < 1) return (g.base * 0.85 + Math.random() * g.base * 0.30).toFixed(2);
          return (g.base * 0.92 + Math.random() * g.base * 0.10).toFixed(0);
        })
      );
    }, 800);
    intervalsRef.current.push(iv);
    return () => { clearInterval(iv); intervalsRef.current = []; };
  }, [isScanning]);

  const topoLines = useMemo(() => {
    if (box.width === 0) return [];
    const { width: w, height: h } = box;
    return TOPO_RATIOS.map(r => ({
      d: `M ${w*r.x1} ${h*r.y1} Q ${w*r.cx} ${h*r.cy} ${w*r.x2} ${h*r.y2}`,
      o: r.o,
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [box.width, box.height]);

  const landmarks = useMemo(() => {
    if (box.width === 0) return [];
    return LANDMARK_RATIOS.map(({ rx, ry }) => ({
      cx: rx * box.width,
      cy: ry * box.height,
    }));
  }, [box.width, box.height]);

  const ghostPositions = useMemo(() => {
    if (box.width === 0) return [];
    return GHOST_POS.map(({ px, py }) => ({
      left: box.left + box.width  / 2 + px * box.width,
      top:  box.top  + box.height / 2 + py * box.height,
    }));
  }, [box.left, box.top, box.width, box.height]);

  if (box.width === 0) return null;

  const { left, top, width, height } = box;
  const active  = isScanning || isRevealed;
  const BRACKET = 20;

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
      <svg
        style={{ position: "absolute", left, top, width, height, overflow: "visible" }}
        aria-hidden="true"
      >
        <defs>
          <clipPath id="face-clip">
            <ellipse cx={width / 2} cy={height / 2} rx={width / 2} ry={height / 2} />
          </clipPath>
          <filter id="node-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="lens-flare" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(255,200,220,0.32)" />
            <stop offset="40%"  stopColor="rgba(249,168,201,0.10)" />
            <stop offset="100%" stopColor="rgba(249,168,201,0)"    />
          </radialGradient>
        </defs>

        <g clipPath="url(#face-clip)">
          {topoLines.map((line, i) => (
            <motion.path
              key={i}
              d={line.d}
              stroke="rgba(255,220,235,1)"
              strokeWidth={0.6}
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: active ? line.o : 0 }}
              transition={{ duration: 1.4, delay: i * 0.06 }}
            />
          ))}
        </g>

        {([
          { x: 0,     y: 0,      dh:  1, dv:  1 },
          { x: width, y: 0,      dh: -1, dv:  1 },
          { x: 0,     y: height, dh:  1, dv: -1 },
          { x: width, y: height, dh: -1, dv: -1 },
        ] as const).map(({ x, y, dh, dv }, i) => (
          <motion.g key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <line x1={x} y1={y} x2={x + dh * BRACKET} y2={y}
              stroke="rgba(249,168,201,0.7)" strokeWidth={1.2} />
            <line x1={x} y1={y} x2={x} y2={y + dv * BRACKET}
              stroke="rgba(249,168,201,0.7)" strokeWidth={1.2} />
          </motion.g>
        ))}

        {isScanning && (
          <motion.ellipse
            cx={width * 0.5} cy={height * 0.3}
            rx={width * 0.28} ry={height * 0.20}
            fill="url(#lens-flare)"
            animate={{
              cx: [width*0.40, width*0.60, width*0.45, width*0.58, width*0.50],
              cy: [height*0.25, height*0.35, height*0.50, height*0.40, height*0.30],
              rx: [width*0.26, width*0.30, width*0.24, width*0.28, width*0.26],
            }}
            transition={{ duration: 4.5, ease: "easeInOut" }}
          />
        )}

        {landmarks.slice(0, nodeCount).map(({ cx, cy }, i) => (
          <motion.g key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.circle cx={cx} cy={cy} r={7} fill="none"
              stroke="rgba(249,168,201,0.25)" strokeWidth={0.8}
              animate={{ r: [7, 14, 7], opacity: [0.35, 0, 0.35] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            />
            <circle cx={cx} cy={cy} r={2} fill="rgba(255,215,230,0.95)" filter="url(#node-glow)" />
            <circle cx={cx} cy={cy} r={0.9} fill="white" />
          </motion.g>
        ))}
      </svg>

      {isScanning && GHOST_ITEMS.map((item, i) => {
        const pos = ghostPositions[i % ghostPositions.length];
        if (!pos) return null;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.22 }}
            style={{
              position: "absolute",
              left: pos.left,
              top:  pos.top,
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          >
            <motion.span
              animate={{ opacity: [0.35, 0.55, 0.28, 0.50, 0.35] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              style={{
                display: "block",
                fontFamily: "monospace",
                fontSize: 7.5,
                letterSpacing: "0.08em",
                color: "rgba(255,200,220,0.9)",
                whiteSpace: "nowrap",
              }}
            >
              {item.label}
              <span style={{ color: "rgba(249,168,201,0.45)", margin: "0 2px" }}>·</span>
              <span style={{ color: "rgba(255,235,242,0.95)" }}>{ghostVals[i]}</span>
            </motion.span>
          </motion.div>
        );
      })}

      {isScanning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4.5, delay: 0.3, times: [0, 0.05, 0.92, 1] }}
          style={{
            position: "absolute",
            left: left + width / 2,
            top:  top  + height + 16,
            transform: "translateX(-50%)",
            display: "flex", alignItems: "center", gap: 7,
            pointerEvents: "none",
          }}
        >
          <motion.div
            style={{ width: 5, height: 5, borderRadius: "50%", background: "#F9A8C9", flexShrink: 0 }}
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 0.7, repeat: Infinity }}
          />
          <span style={{
            fontFamily: "monospace", fontSize: 9,
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: "rgba(255,210,200,0.7)", fontVariantNumeric: "tabular-nums",
          }}>
            Analysing {progress}%
          </span>
        </motion.div>
      )}
    </div>
  );
});

// ─────────────────────────────────────────
// CARD MODAL
// ─────────────────────────────────────────
const CardModal = memo(function CardModal({
  card,
  onClose,
}: {
  card: "glow" | "face" | "routine" | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!card) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [card, onClose]);

  return (
    <AnimatePresence>
      {card && (
        <>
          <motion.div
            className="fixed inset-0 z-[100]"
            style={{ background: "rgba(10,5,8,0.75)", backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed z-[101] left-1/2 top-1/2"
            style={{
              width: `min(92vw, ${card === "face" ? "480px" : "440px"})`,
              maxHeight: "88vh",
              overflowY: "auto",
            }}
            initial={{ opacity: 0, scale: 0.90, x: "-50%", y: "-44%" }}
            animate={{ opacity: 1, scale: 1,    x: "-50%", y: "-50%" }}
            exit={{   opacity: 0, scale: 0.95,  x: "-50%", y: "-48%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            role="dialog" aria-modal="true"
          >
            <div style={{
              background: "rgba(255,255,255,0.98)", borderRadius: 28,
              border: "1px solid rgba(255,255,255,0.95)",
              boxShadow: "0 60px 160px rgba(0,0,0,0.35), 0 0 0 1px rgba(249,168,201,0.12)",
              overflow: "hidden", position: "relative",
            }}>
              <div style={{ height: 4, background: "linear-gradient(90deg, #fda4af, #F9A8C9, #f472b6, #c084fc, #818cf8)" }} />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.07)", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.13)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,0,0,0.07)")}
                aria-label="Close modal"
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M1 1L10 10M10 1L1 10" stroke="#64748b" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
              {card === "glow"    && <GlowModalContent />}
              {card === "face"    && <FaceModalContent />}
              {card === "routine" && <RoutineModalContent />}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

// ─────────────────────────────────────────
// GLOW MODAL
// ─────────────────────────────────────────
function GlowModalContent() {
  const metrics = [
    { label: "Luminosity",  value: 88, desc: "Natural light reflection",  color: "#F9A8C9" },
    { label: "Clarity",     value: 94, desc: "Pore visibility & texture", color: "#f472b6" },
    { label: "Evenness",    value: 90, desc: "Tone consistency",           color: "#c084fc" },
    { label: "Hydration",   value: 76, desc: "Moisture retention level",  color: "#60a5fa" },
    { label: "Texture",     value: 85, desc: "Surface smoothness",        color: "#34d399" },
  ];
  const comparisons = [
    { label: "vs. Your Age Group", delta: 14 },
    { label: "vs. Same Skin Type", delta: 9  },
    { label: "vs. Last Month",     delta: 3  },
  ];
  const circumference = 2 * Math.PI * 40;

  return (
    <div>
      <div className="px-7 pt-7 pb-5" style={{ background: "linear-gradient(135deg, rgba(249,168,201,0.06), rgba(192,132,252,0.04))" }}>
        <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 16 }}>Glow Score</p>
        <div className="flex items-center gap-6">
          <div className="relative flex-shrink-0" style={{ width: 96, height: 96 }}>
            <svg width="96" height="96" viewBox="0 0 96 96" style={{ transform: "rotate(-90deg)" }}>
              <defs>
                <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%"   stopColor="#F9A8C9" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
              </defs>
              <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(249,168,201,0.12)" strokeWidth="8" />
              <motion.circle
                cx="48" cy="48" r="40" fill="none"
                stroke="url(#ring-grad)" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: circumference * 0.08 }}
                transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span style={{ fontSize: 26, fontWeight: 200, color: "#0f172a", lineHeight: 1, letterSpacing: "-2px" }}>92</span>
              <span style={{ fontSize: 9, color: "#94a3b8", letterSpacing: "0.1em" }}>/100</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-1.5 mb-1.5">
              <span style={{ fontSize: 13, fontWeight: 500, color: "#db2777" }}>Exceptional</span>
              <span style={{ fontSize: 11, color: "#94a3b8" }}>— top 8% globally</span>
            </div>
            <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6, fontWeight: 300 }}>
              Your skin is performing beautifully. Minor improvements in hydration could push you into the top 3%.
            </p>
            <div className="flex flex-col gap-1 mt-3">
              {comparisons.map(({ label, delta }, i) => (
                <motion.div key={label}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-2"
                >
                  <span style={{ fontSize: 9, fontWeight: 600, color: "#16a34a", background: "rgba(22,163,74,0.1)", borderRadius: 20, padding: "1px 6px" }}>+{delta}</span>
                  <span style={{ fontSize: 10, color: "#94a3b8" }}>{label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: 1, background: "rgba(0,0,0,0.05)", margin: "0 28px" }} />
      <div className="px-7 py-5">
        <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 16 }}>Score Breakdown</p>
        <div className="flex flex-col gap-4">
          {metrics.map(({ label, value, desc, color }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.07 }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <span style={{ fontSize: 12, fontWeight: 500, color: "#1e293b" }}>{label}</span>
                  <span style={{ fontSize: 10, color: "#94a3b8", marginLeft: 8 }}>{desc}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span style={{ fontSize: 11, fontWeight: 600, color }}>{value}</span>
                  <span style={{ fontSize: 9, color: "#cbd5e1" }}>/100</span>
                </div>
              </div>
              <div style={{ height: 5, background: "rgba(0,0,0,0.06)", borderRadius: 10, overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  style={{ height: "100%", borderRadius: 10, background: `linear-gradient(90deg, ${color}88, ${color})` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div style={{ height: 1, background: "rgba(0,0,0,0.05)", margin: "0 28px" }} />
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        className="mx-7 my-5 rounded-2xl p-4"
        style={{ background: "linear-gradient(135deg, rgba(249,168,201,0.08), rgba(192,132,252,0.06))", border: "1px solid rgba(249,168,201,0.2)" }}
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: "rgba(249,168,201,0.15)" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1C7 1 4 4 4 7.5C4 9.43 5.34 11 7 11C8.66 11 10 9.43 10 7.5C10 4 7 1 7 1Z" stroke="#F9A8C9" strokeWidth="1.2" fill="none" />
              <line x1="7" y1="11" x2="7" y2="13" stroke="#F9A8C9" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#db2777", marginBottom: 4 }}>Lumii Insight</p>
            <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.7, fontWeight: 300 }}>
              Your clarity is exceptional — top 8% of users. Hydration is your biggest growth lever. Adding a{" "}
              <span style={{ color: "#db2777", fontWeight: 500 }}>ceramide moisturiser</span> at night and{" "}
              <span style={{ color: "#db2777", fontWeight: 500 }}>Vitamin C serum</span> in the morning could lift your score to <strong style={{ color: "#0f172a" }}>96+</strong> within 6 weeks.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────
// FACE MODAL
// ─────────────────────────────────────────
function FaceModalContent() {
  const attributes = [
    { label: "Face Shape",    value: "Oval",        note: "Most versatile — suits all cuts",     icon: "○" },
    { label: "Undertone",     value: "Warm",        note: "Gold & peach shades suit you",        icon: "◐" },
    { label: "Skin Type",     value: "Combination", note: "T-zone oily, cheeks balanced",        icon: "◈" },
    { label: "Eye Shape",     value: "Almond",      note: "Classic — most liner styles work",    icon: "◇" },
    { label: "Jaw Structure", value: "Soft",        note: "Angular accessories complement well", icon: "△" },
    { label: "Skin Tone",     value: "Medium",      note: "Fitzpatrick Type III",                icon: "◉" },
  ];

  return (
    <div>
      <div className="px-7 pt-7 pb-0">
        <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 4 }}>Face Analysis</p>
        <p style={{ fontSize: 22, fontWeight: 300, color: "#0f172a", letterSpacing: "-0.02em" }}>Your complete profile</p>
        <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>Analysed by lumii Engine · Updated today</p>
      </div>
      <div className="px-7 py-5 flex items-center gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0"
        >
          <svg width="110" height="130" viewBox="0 0 110 130" fill="none">
            <ellipse cx="55" cy="68" rx="36" ry="52" stroke="rgba(249,168,201,0.4)" strokeWidth="1.5" fill="rgba(249,168,201,0.04)" />
            <line x1="55" y1="16"  x2="55"  y2="24"  stroke="rgba(249,168,201,0.3)" strokeWidth="0.75" strokeDasharray="2,2" />
            <line x1="55" y1="112" x2="55"  y2="120" stroke="rgba(249,168,201,0.3)" strokeWidth="0.75" strokeDasharray="2,2" />
            <line x1="8"  y1="68"  x2="19"  y2="68"  stroke="rgba(249,168,201,0.3)" strokeWidth="0.75" strokeDasharray="2,2" />
            <line x1="91" y1="68"  x2="102" y2="68"  stroke="rgba(249,168,201,0.3)" strokeWidth="0.75" strokeDasharray="2,2" />
            <line x1="55" y1="40"  x2="55"  y2="96"  stroke="rgba(249,168,201,0.12)" strokeWidth="0.5" />
            <line x1="26" y1="68"  x2="84"  y2="68"  stroke="rgba(249,168,201,0.12)" strokeWidth="0.5" />
            <ellipse cx="40" cy="57" rx="7"   ry="4.5" stroke="rgba(249,168,201,0.6)" strokeWidth="1.2" fill="rgba(249,168,201,0.05)" />
            <ellipse cx="70" cy="57" rx="7"   ry="4.5" stroke="rgba(249,168,201,0.6)" strokeWidth="1.2" fill="rgba(249,168,201,0.05)" />
            <ellipse cx="40" cy="57" rx="2.5" ry="2.5" fill="rgba(249,168,201,0.3)" />
            <ellipse cx="70" cy="57" rx="2.5" ry="2.5" fill="rgba(249,168,201,0.3)" />
            <path d="M33 50 Q40 47 47 50" stroke="rgba(249,168,201,0.5)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M63 50 Q70 47 77 50" stroke="rgba(249,168,201,0.5)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M55 62 L51 74 Q55 77 59 74 L55 62" stroke="rgba(249,168,201,0.45)" strokeWidth="1" fill="none" />
            <path d="M44 85 Q55 92 66 85" stroke="rgba(249,168,201,0.55)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <circle cx="55" cy="28" r="2" fill="rgba(249,168,201,0.5)" />
            <circle cx="19" cy="68" r="2" fill="rgba(249,168,201,0.5)" />
            <circle cx="91" cy="68" r="2" fill="rgba(249,168,201,0.5)" />
          </svg>
        </motion.div>
        <div className="flex-1">
          <div className="rounded-2xl p-4 mb-3"
            style={{ background: "linear-gradient(135deg, rgba(249,168,201,0.08), rgba(192,132,252,0.05))", border: "1px solid rgba(249,168,201,0.15)" }}>
            <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 4 }}>Facial Symmetry</p>
            <div className="flex items-end gap-2 mb-2">
              <span style={{ fontSize: 36, fontWeight: 200, color: "#0f172a", lineHeight: 1, letterSpacing: "-2px" }}>92</span>
              <span style={{ fontSize: 13, color: "#94a3b8", marginBottom: 3 }}>%</span>
            </div>
            <div style={{ height: 4, background: "rgba(0,0,0,0.07)", borderRadius: 10, overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }} animate={{ width: "92%" }}
                transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: "100%", borderRadius: 10, background: "linear-gradient(90deg, #F9A8C9, #c084fc)" }}
              />
            </div>
            <p style={{ fontSize: 10, color: "#94a3b8", marginTop: 4 }}>Top 5% — exceptionally high</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[["Skin Age","24"],["Pore Size","Fine"]].map(([k, v]) => (
              <div key={k} className="rounded-xl p-2.5"
                style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)" }}>
                <p style={{ fontSize: 9, color: "#94a3b8", marginBottom: 2 }}>{k}</p>
                <p style={{ fontSize: 14, fontWeight: 300, color: "#db2777" }}>{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ height: 1, background: "rgba(0,0,0,0.05)", margin: "0 28px" }} />
      <div className="px-7 py-5">
        <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 14 }}>Feature Breakdown</p>
        <div className="grid grid-cols-2 gap-2.5">
          {attributes.map(({ label, value, note, icon }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              className="rounded-2xl p-3.5"
              style={{ background: "rgba(249,168,201,0.04)", border: "1px solid rgba(249,168,201,0.12)" }}
            >
              <div className="flex items-center justify-between mb-1">
                <span style={{ fontSize: 14, color: "rgba(249,168,201,0.6)" }}>{icon}</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: "#db2777", background: "rgba(249,168,201,0.12)", borderRadius: 20, padding: "1px 8px" }}>{value}</span>
              </div>
              <p style={{ fontSize: 11, fontWeight: 500, color: "#1e293b", marginBottom: 2 }}>{label}</p>
              <p style={{ fontSize: 9.5, color: "#94a3b8", lineHeight: 1.4 }}>{note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// ROUTINE MODAL
// ─────────────────────────────────────────
function RoutineModalContent() {
  const morning = [
    { step:"01", name:"Gentle Cleanser", timing:"60 sec",     note:"Removes overnight oils",    tag:"Daily",  tc:"#F9A8C9", tb:"rgba(249,168,201,0.12)" },
    { step:"02", name:"Vitamin C Serum", timing:"Absorb 2m",  note:"Brightening + antioxidant", tag:"Daily",  tc:"#F9A8C9", tb:"rgba(249,168,201,0.12)" },
    { step:"03", name:"Niacinamide 10%", timing:"Layer over", note:"Pore tightening",           tag:"Daily",  tc:"#F9A8C9", tb:"rgba(249,168,201,0.12)" },
    { step:"04", name:"Moisturiser",     timing:"Pat in",     note:"Barrier protection",        tag:"Daily",  tc:"#F9A8C9", tb:"rgba(249,168,201,0.12)" },
    { step:"05", name:"SPF 50+",         timing:"Last step",  note:"Non-negotiable",            tag:"Daily",  tc:"#F9A8C9", tb:"rgba(249,168,201,0.12)" },
  ];
  const evening = [
    { step:"01", name:"Oil Cleanser",   timing:"90 sec",     note:"Dissolves SPF & makeup",    tag:"Daily",  tc:"#c084fc", tb:"rgba(192,132,252,0.10)" },
    { step:"02", name:"Gentle Cleanser",timing:"60 sec",     note:"Double cleanse method",     tag:"Daily",  tc:"#c084fc", tb:"rgba(192,132,252,0.10)" },
    { step:"03", name:"Retinol 0.3%",   timing:"Thin layer", note:"Cell renewal overnight",    tag:"x3/wk", tc:"#7c3aed", tb:"rgba(192,132,252,0.15)" },
    { step:"04", name:"Ceramide Cream", timing:"Seal in",    note:"Locks in moisture barrier", tag:"Daily",  tc:"#c084fc", tb:"rgba(192,132,252,0.10)" },
  ];
  const weekDays    = ["M","T","W","T","F","S","S"];
  const retinolDays = [0, 2, 4];

  return (
    <div>
      <div className="px-7 pt-7 pb-5" style={{ background: "linear-gradient(135deg, rgba(249,168,201,0.05), rgba(192,132,252,0.04))" }}>
        <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 4 }}>Your Routine</p>
        <p style={{ fontSize: 22, fontWeight: 300, color: "#0f172a", letterSpacing: "-0.02em" }}>Built for your face</p>
        <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>Personalised for combination skin · warm undertone</p>
        <div className="mt-4 rounded-2xl p-3.5" style={{ background: "rgba(192,132,252,0.07)", border: "1px solid rgba(192,132,252,0.15)" }}>
          <div className="flex items-center justify-between mb-2.5">
            <p style={{ fontSize: 10, fontWeight: 500, color: "#7c3aed" }}>Retinol Schedule</p>
            <p style={{ fontSize: 9, color: "#a78bfa" }}>x3 per week · alternate days</p>
          </div>
          <div className="flex gap-1.5">
            {weekDays.map((day, i) => {
              const on = retinolDays.includes(i);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span style={{ fontSize: 9, color: on ? "#7c3aed" : "#cbd5e1" }}>{day}</span>
                  <div style={{
                    width: "100%", height: 24, borderRadius: 8,
                    background: on ? "rgba(192,132,252,0.2)" : "rgba(0,0,0,0.04)",
                    border: on ? "1px solid rgba(192,132,252,0.4)" : "1px solid rgba(0,0,0,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {on && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(192,132,252,0.6)" }} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {[
        { title:"Morning", dot:"#F9A8C9", meta:"5 steps · ~12 min", items:morning, baseDelay:0    },
        { title:"Evening", dot:"#c084fc", meta:"4 steps · ~10 min", items:evening, baseDelay:0.15 },
      ].map(({ title, dot, meta, items, baseDelay }, gi) => (
        <div key={title}>
          {gi > 0 && <div style={{ height: 1, background: "rgba(0,0,0,0.05)", margin: "0 28px" }} />}
          <div className="px-7 py-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ background: dot }} />
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#64748b" }}>{title}</p>
              <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.06)", marginLeft: 4 }} />
              <p style={{ fontSize: 9, color: "#94a3b8" }}>{meta}</p>
            </div>
            <div className="flex flex-col">
              {items.map(({ step, name, timing, note, tag, tc, tb }, i) => (
                <motion.div key={name}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: baseDelay + i * 0.07, duration: 0.4 }}
                  className="flex items-center gap-3 py-3"
                  style={{ borderBottom: i < items.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}
                >
                  <span style={{ fontSize: 9, fontWeight: 700, color: `${dot}88`, width: 18, flexShrink: 0 }}>{step}</span>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: 12, fontWeight: 500, color: "#1e293b" }}>{name}</p>
                    <p style={{ fontSize: 10, color: "#94a3b8", fontWeight: 300 }}>{note}</p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span style={{ fontSize: 9, color: "#94a3b8" }}>{timing}</span>
                    <span style={{ fontSize: 8, fontWeight: 600, color: tc, background: tb, borderRadius: 20, padding: "2px 6px" }}>{tag}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        className="mx-7 mb-6 rounded-2xl p-4"
        style={{ background: "linear-gradient(135deg, rgba(249,168,201,0.07), rgba(192,132,252,0.05))", border: "1px solid rgba(249,168,201,0.15)" }}
      >
        <div className="flex gap-3 items-start">
          <span style={{ fontSize: 16, lineHeight: 1, marginTop: 1, color: "#F9A8C9" }}>✦</span>
          <p style={{ fontSize: 11, color: "#475569", lineHeight: 1.7, fontWeight: 300 }}>
            Start retinol slowly — every 3rd day for the first 2 weeks, then alternate days. Always follow with{" "}
            <span style={{ color: "#7c3aed", fontWeight: 500 }}>ceramide cream</span> to protect your barrier.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────
// CARDS
// ─────────────────────────────────────────
const GlowScoreCard = memo(function GlowScoreCard({
  isRevealed, onClick, entryDelay,
}: { isRevealed: boolean; onClick: () => void; entryDelay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: isRevealed ? 1 : 0, x: isRevealed ? 0 : 16 }}
      whileHover={{ scale: 1.03, y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ delay: entryDelay, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="rounded-[18px] p-4 cursor-pointer select-none"
      style={{
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.9)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.95)",
        willChange: "transform",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(249,168,201,0.15)" }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1.5 5L3.5 7.5L8.5 2.5" stroke="#F9A8C9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="text-[12px] font-medium text-slate-800 leading-tight">Glow score</p>
            <p className="text-[10px] font-light text-slate-400 leading-tight">Tap to see breakdown</p>
          </div>
        </div>
        <span className="text-[30px] font-extralight text-slate-900 tracking-[-2px]">92</span>
      </div>
      <div className="h-[3px] bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: isRevealed ? "92%" : "0%" }}
          transition={{ delay: entryDelay + 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #F9A8C9, #f472b6)" }}
        />
      </div>
    </motion.div>
  );
});

const FaceAnalysisCard = memo(function FaceAnalysisCard({
  isRevealed, onClick, entryDelay,
}: { isRevealed: boolean; onClick: () => void; entryDelay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: isRevealed ? 1 : 0, x: isRevealed ? 0 : 16 }}
      whileHover={{ scale: 1.03, y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ delay: entryDelay, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="rounded-[18px] p-4 cursor-pointer select-none"
      style={{
        background: "rgba(255,255,255,0.80)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.8)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,0.9)",
        willChange: "transform",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full" style={{ background: "#F9A8C9" }} />
          <p className="text-[9px] font-medium tracking-[0.22em] uppercase text-slate-400">Face Analysis</p>
        </div>
        <span className="text-[9px] text-slate-300">Tap to expand</span>
      </div>
      <div className="flex flex-col gap-2.5">
        {([["Face Shape","Oval"],["Undertone","Warm"],["Skin Type","Combination"]] as const).map(([label, value], i) => (
          <motion.div key={label} className="flex justify-between items-center"
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: isRevealed ? 1 : 0, x: isRevealed ? 0 : 6 }}
            transition={{ delay: entryDelay + 0.1 + i * 0.1, duration: 0.7 }}
          >
            <span className="text-[11px] font-light text-slate-400">{label}</span>
            <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-full" style={{ color: "#db2777", background: "rgba(249,168,201,0.15)" }}>{value}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});

const RoutineCard = memo(function RoutineCard({
  isRevealed, onClick, entryDelay,
}: { isRevealed: boolean; onClick: () => void; entryDelay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: isRevealed ? 1 : 0, x: isRevealed ? 0 : 16 }}
      whileHover={{ scale: 1.03, y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ delay: entryDelay, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="rounded-[18px] p-4 cursor-pointer select-none"
      style={{
        background: "rgba(255,255,255,0.80)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.8)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
        willChange: "transform",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full" style={{ background: "#F9A8C9" }} />
          <p className="text-[9px] font-medium tracking-[0.22em] uppercase text-slate-400">Your Routine</p>
        </div>
        <span className="text-[9px] font-medium" style={{ color: "#F9A8C9" }}>Ready</span>
      </div>
      <div className="flex flex-col gap-2">
        {["Morning skincare","Evening routine","Makeup tips"].map((item, i) => (
          <motion.div key={item}
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: isRevealed ? 1 : 0, x: isRevealed ? 0 : 6 }}
            transition={{ delay: entryDelay + 0.1 + i * 0.1, duration: 0.7 }}
            className="flex items-center gap-2.5"
          >
            <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#F9A8C9" }} />
            <span className="text-[11px] font-light text-slate-500">{item}</span>
            <svg className="ml-auto" width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="#86efac" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});

// ─────────────────────────────────────────
// HERO
// ─────────────────────────────────────────
type HeroProps = {
  phase: IntroPhase;
};

export default function Hero({ phase }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const [email, setEmail]         = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [openCard, setOpenCard]   = useState<"glow" | "face" | "routine" | null>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const smooth   = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const imageY   = useTransform(smooth, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(smooth, [0, 1], ["0%", "8%"]);
  const cardsY   = useTransform(smooth, [0, 1], ["0%", "12%"]);
  const opacity  = useTransform(smooth, [0, 0.55], [1, 0]);

  const isRevealed = phase === "revealed";
  const isScanning = phase === "scanning";

  const handleSubmit = useCallback(async () => {
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [email]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => { if (e.key === "Enter") handleSubmit(); }, [handleSubmit]);
  const closeCard     = useCallback(() => setOpenCard(null), []);
  const openGlow      = useCallback(() => setOpenCard("glow"),    []);
  const openFace      = useCallback(() => setOpenCard("face"),    []);
  const openRoutine   = useCallback(() => setOpenCard("routine"), []);

  return (
    <section ref={ref} id="hero-section" className="relative w-full h-screen overflow-hidden bg-black">

      {/* Background image */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-[1.06]">
        <img
          src="/hero-bg.png" alt=""
          className="h-full w-full object-cover object-center"
          draggable={false}
        />
      </motion.div>

      {/* Opening veil */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(0,0,0,0.6)", zIndex: 2 }}
        animate={{ opacity: isRevealed ? 0 : 1 }}
        transition={{ duration: 2.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Face scan */}
      {(isScanning || isRevealed) && (
        <FaceScanOverlay isScanning={isScanning} isRevealed={isRevealed} />
      )}

      {/* ── REVEAL PAYOFF ── */}
      <AnimatePresence>
        {isRevealed && (
          <>
            {/* Flash */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "rgba(255,225,238,1)", zIndex: 15 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Radial bloom */}
            <motion.div className="absolute pointer-events-none" style={{
              left:"62%", top:"33%", width:600, height:600,
              transform:"translate(-50%,-50%)", borderRadius:"50%",
              background:"radial-gradient(circle, rgba(249,168,201,0.55) 0%, rgba(249,168,201,0.15) 35%, transparent 70%)",
              zIndex:14,
            }}
              initial={{ opacity:0, scale:0.3 }}
              animate={{ opacity:[0,1,0], scale:[0.3,1.5,2.2] }}
              transition={{ duration:1.2, ease:[0.16,1,0.3,1] }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Warm glow */}
      {isRevealed && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 38% 48% at 62% 36%, rgba(249,168,201,0.18) 0%, transparent 70%)",
            zIndex: 3,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      )}

      {/* Permanent overlays */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex:4, background:"linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 45%, transparent 65%)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex:4, background:"linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%)" }} />

      {/* ── LEFT — Waitlist content ── */}
      {/* MOBILE FIX: w-full + tighter padding on mobile, wider on sm+, capped on md+ */}
      {isRevealed && (
        <motion.div
          style={{ y: contentY, opacity, zIndex: 20 }}
          className="absolute bottom-0 left-0 w-full px-6 pb-10 sm:px-10 sm:pb-16 md:px-20 md:pb-24 md:max-w-[560px]"
        >
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-3.5 py-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-medium tracking-[0.2em] text-white/70 uppercase">Waitlist open</span>
            </div>
          </motion.div>

          {/* MOBILE FIX: headline scales down on mobile */}
          <div className="overflow-hidden mb-1">
            <motion.h1
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-[38px] sm:text-[52px] md:text-[68px] font-light text-white leading-[0.92] tracking-[-0.02em]"
            >
              Glow-up that starts
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-7">
            <motion.h1
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.4, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="text-[38px] sm:text-[52px] md:text-[68px] font-light text-white leading-[0.92] tracking-[-0.02em]"
            >
              with <span className="italic" style={{ color: "#F9A8C9" }}>you.</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 1.1 }}
            className="flex flex-col gap-2 mb-8"
          >
            {[
              "Upload a photo. Get your glow score in 10 seconds.",
              "AI reads your face shape, undertone, and skin — not a quiz.",
              "A personalised beauty routine built only for you.",
            ].map((line, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-1 h-1 rounded-full mt-[7px] flex-shrink-0" style={{ background: "#F9A8C9" }} />
                <p className="text-[13px] font-light text-white/50 leading-[1.6]">{line}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 1.1 }}
          >
            {!submitted ? (
              <div className="flex flex-col gap-3">
                {/* MOBILE FIX: stacked on mobile, side-by-side on sm+ */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter your email"
                    className="w-full sm:flex-1 sm:min-w-0 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-5 py-3.5 text-[13px] text-white placeholder:text-white/30 outline-none focus:border-white/40 transition-all duration-200"
                  />
                  <motion.button
                    onClick={handleSubmit}
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.97 }}
                    className="w-full sm:w-auto bg-white text-slate-900 font-semibold text-[13px] px-6 py-3.5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.25)] whitespace-nowrap flex-shrink-0 disabled:opacity-60 transition-opacity"
                  >
                    {loading ? "Reserving…" : "Reserve my spot →"}
                  </motion.button>
                </div>

                {error && (
                  <p className="text-[11px] text-red-400 pl-1">{error}</p>
                )}

                <div className="flex items-center gap-2 pl-1">
                  <div className="h-1 w-16 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width:"73%", background:"linear-gradient(90deg, #F9A8C9, #f472b6)" }} />
                  </div>
                  <p className="text-[11px] font-light text-white/35">
                    <span className="text-white/60">364 spots</span> left of 500 · Free at launch
                  </p>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity:0, scale:0.97 }} animate={{ opacity:1, scale:1 }}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-5 py-3.5"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-400/20 flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-[13px] font-light text-white/80">
                  You&apos;re on the list. We&apos;ll reach out before anyone else.
                </p>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1.0 }}
            className="flex items-center gap-3 mt-5"
          >
            <div className="flex -space-x-1.5">
              {["#e8b4c8","#d4a0b8","#f0c4d4","#c8a0b4","#ead0c0"].map((bg, i) => (
                <div key={i} className="w-5 h-5 rounded-full border border-white/20 flex-shrink-0"
                  style={{ background:`radial-gradient(circle at 35% 35%, ${bg}, ${bg}99)` }} />
              ))}
            </div>
            <p className="text-[11px] font-light text-white/35">
              <span className="text-white/55 font-normal">2,847 women</span> already waiting
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* ── RIGHT — Cards (desktop only) ── */}
      {isRevealed && (
        <motion.div
          style={{ y: cardsY, opacity, zIndex: 20 }}
          className="absolute top-1/2 right-8 md:right-14 -translate-y-[54%] hidden md:block w-[258px]"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3"
          >
            <GlowScoreCard    isRevealed={isRevealed} onClick={openGlow}    entryDelay={0.9} />
            <FaceAnalysisCard isRevealed={isRevealed} onClick={openFace}    entryDelay={1.1} />
            <RoutineCard      isRevealed={isRevealed} onClick={openRoutine} entryDelay={1.3} />
          </motion.div>
        </motion.div>
      )}

      <CardModal card={openCard} onClose={closeCard} />

      {/* Scroll indicator */}
      {isRevealed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1.0 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ zIndex: 20 }}
        >
          <div className="w-px h-10 bg-white/15 relative overflow-hidden rounded-full">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              className="w-full h-1/2 rounded-full bg-white/35"
            />
          </div>
        </motion.div>
      )}

    </section>
  );
}
