"use client";

import { useEffect, useState } from "react";
import { INTRO_REVEAL_DELAY_MS, INTRO_SCAN_DELAY_MS, type IntroPhase } from "./lib/intro";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import Nav from "./components/Nav";
import Hero from "./components/Hero";

export default function Home() {
  useSmoothScroll();
  const [introPhase, setIntroPhase] = useState<IntroPhase>("hidden");

  useEffect(() => {
    const scanTimer = window.setTimeout(() => setIntroPhase("scanning"), INTRO_SCAN_DELAY_MS);
    const revealTimer = window.setTimeout(() => setIntroPhase("revealed"), INTRO_REVEAL_DELAY_MS);

    return () => {
      window.clearTimeout(scanTimer);
      window.clearTimeout(revealTimer);
    };
  }, []);

  const isIntroComplete = introPhase === "revealed";

  return (
    <main className="relative min-h-screen w-full">
      <Nav isIntroComplete={isIntroComplete} />
      <Hero phase={introPhase} />
    </main>
  );
}
