import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "./JsonLd";

const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const mono = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F4EEE4",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lumiiapp.com"),
  title: {
    default: "Lumii — AI Face Analysis & Skincare Glow Up App",
    template: "%s · Lumii",
  },
  description:
    "Lumii analyzes your face from one photo — 584 landmarks, 75+ metrics, one glow-up score — and builds your skincare & beauty plan. Free on iOS.",
  applicationName: "Lumii",
  keywords: [
    "face analysis app",
    "facial analysis",
    "AI beauty advisor",
    "skincare app",
    "glow up app",
    "face rating app",
    "skin analysis",
    "personalized skincare routine",
    "beauty score",
    "facial symmetry analysis",
    "AI skincare",
    "glow up plan",
  ],
  authors: [{ name: "Lumii" }],
  creator: "Lumii",
  publisher: "Lumii",
  category: "Health & Fitness",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://www.lumiiapp.com",
    siteName: "Lumii",
    title: "Lumii — AI Face Analysis & Skincare Glow Up",
    description:
      "Upload one photo. Get a beauty plan built for your actual face — 584 landmarks, 75+ metrics, one score that tells you everything.",
    locale: "en_US",
    // og image is auto-provided by app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumii — AI Face Analysis & Skincare Glow Up",
    description:
      "Upload one photo. Get a beauty plan built for your actual face — 584 landmarks, 75+ metrics, one score.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  appleWebApp: { capable: true, title: "Lumii", statusBarStyle: "black-translucent" },
  itunes: { appId: "6769432089" }, // Safari/Spotlight smart app banner for the iOS app
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="paper-grain font-body antialiased" style={{ background: "#F4EEE4", color: "#1C1815" }}>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
