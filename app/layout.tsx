import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Setting up Inter as the primary Sans font
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "lumii — AI Beauty Advisor",
  description: "Upload a photo. Get a beauty plan built for your actual face.",
};

<body className="bg-black antialiased"></body>

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
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
