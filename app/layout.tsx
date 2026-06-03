import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";

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
  title: "Lumii — Your face, by the numbers.",
  description:
    "584 landmarks. 75 measurements. One beauty score, and the exact routine to raise it. The most precise facial analysis ever put in a pocket.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="paper-grain font-body antialiased" style={{ background: "#F4EEE4", color: "#1C1815" }}>
        {children}
      </body>
    </html>
  );
}
