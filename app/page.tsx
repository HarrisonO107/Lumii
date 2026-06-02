"use client";

import { useState, useCallback } from "react";
import Preloader from "./components/Preloader";
import Hero from "./components/Hero";

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const handlePreloaderComplete = useCallback(() => setPreloaderDone(true), []);

  return (
    <>
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}
      <main className="relative w-full">
        <Hero />
      </main>
    </>
  );
}
