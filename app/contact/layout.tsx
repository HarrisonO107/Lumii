// app/contact/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Contact Lumii" },
  description:
    "Get in touch with the Lumii team for support, press, and partnership enquiries.",
  alternates: { canonical: "/contact" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
