import type { Metadata } from "next";
import "./globals.css";

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
        {/* The 'children' here is where your page.tsx content lives. 
            By keeping this clean, we ensure the Nav and Footer 
            from page.tsx are positioned correctly.
        */}
        {children}
      </body>
    </html>
  );
}
