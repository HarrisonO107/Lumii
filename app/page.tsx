"use client";

import { useState, useCallback } from "react";
import { useLenis } from "./hooks/useLenis";
import Preloader from "./components/Preloader";
import Hero from "./components/Hero";
import Sections from "./components/Sections";

export default function Home() {
  useLenis();
  const [preloaderDone, setPreloaderDone] = useState(false);
  const handlePreloaderComplete = useCallback(() => setPreloaderDone(true), []);

  return (
    <>
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}
      <main className="relative w-full">
        <Hero />
        <Sections />
      </main>
    </>
  );
}
