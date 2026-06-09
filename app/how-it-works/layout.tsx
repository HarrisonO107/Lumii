// app/how-it-works/layout.tsx
// The page itself is "use client", so its <title>/description live here in a
// server-component wrapper. This adds page-specific SEO without touching the page.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "How Lumii Works — AI Face Scan to Glow-Up Plan" },
  description:
    "Upload one photo. Lumii's AI maps 584 facial landmarks across 75+ metrics, gives you a glow-up score, and turns it into a step-by-step skincare and beauty plan.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How Lumii Works — AI Face Scan to Glow-Up Plan",
    description:
      "See how Lumii turns a single selfie into a personalized glow-up and skincare plan.",
    url: "https://www.lumiiapp.com/how-it-works",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
