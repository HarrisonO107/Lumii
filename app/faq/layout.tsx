// app/faq/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Lumii FAQ — Face Analysis & Skincare Questions" },
  description:
    "Answers about how Lumii's AI analyzes your face, what your glow-up score means, photo privacy, pricing, and Android availability.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Lumii FAQ — Face Analysis & Skincare Questions",
    description:
      "Everything about Lumii's AI face analysis, glow-up score, privacy, and pricing.",
    url: "https://www.lumiiapp.com/faq",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
