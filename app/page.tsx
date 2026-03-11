"use client";

import { useEffect, useState } from "react";
import { INTRO_REVEAL_DELAY_MS, INTRO_SCAN_DELAY_MS, type IntroPhase } from "./lib/intro";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import Hero from "./components/Hero";

export default function Home() {
  useSmoothScroll();
  const [introPhase, setIntroPhase] = useState<IntroPhase>("hidden");

  useEffect(() => {
    if (sessionStorage.getItem("hasSeenIntro")) {
      setIntroPhase("revealed");
      return;
    }
    const scanTimer = window.setTimeout(() => setIntroPhase("scanning"), INTRO_SCAN_DELAY_MS);
    const revealTimer = window.setTimeout(() => {
      setIntroPhase("revealed");
      sessionStorage.setItem("hasSeenIntro", "true");
    }, INTRO_REVEAL_DELAY_MS);

    return () => {
      window.clearTimeout(scanTimer);
      window.clearTimeout(revealTimer);
    };
  }, []);

  return (
    <main className="relative min-h-screen w-full">
<Hero phase={introPhase} />
    </main>
  );
}
