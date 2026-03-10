"use client";

import { useSmoothScroll } from "./hooks/useSmoothScroll";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Stats from "./components/Stats";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  useSmoothScroll();

  return (
    <main className="relative min-h-screen w-full">
      <Nav />
      <Hero />
    </main>
  );
}

