import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav";
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: "lumii — AI Beauty Advisor",
  description: "Upload a photo. Get a beauty plan built for your actual face.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className="font-sans antialiased bg-white text-[#0a0a0a] selection:bg-pink-100 selection:text-pink-900"
      >
        <Nav />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
