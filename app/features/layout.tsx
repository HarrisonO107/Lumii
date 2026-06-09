// app/features/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Lumii Features — 584 Landmarks, 75+ Facial Metrics" },
  description:
    "Explore Lumii's AI face analysis: 584 facial landmarks, 75+ metrics, symmetry and skin scoring, and a personalized glow-up and skincare plan built for your face.",
  alternates: { canonical: "/features" },
  openGraph: {
    title: "Lumii Features — 584 Landmarks, 75+ Facial Metrics",
    description:
      "AI face analysis with 584 landmarks and 75+ metrics, plus a personalized glow-up plan.",
    url: "https://www.lumiiapp.com/features",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
