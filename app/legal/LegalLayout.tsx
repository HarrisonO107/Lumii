import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  effectiveDate: string;
  lastUpdated: string;
  intro: ReactNode;
  children: ReactNode;
};

export default function LegalLayout({
  eyebrow,
  title,
  effectiveDate,
  lastUpdated,
  intro,
  children,
}: Props) {
  return (
    <main className="min-h-screen bg-[#060308]">
      <section className="pt-32 pb-12 px-6 md:px-20 max-w-[820px] mx-auto">
        <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/30 mb-4">
          {eyebrow}
        </p>
        <h1 className="text-[44px] md:text-[64px] font-light text-white leading-[0.98] tracking-[-0.02em] mb-7">
          {title}
        </h1>
        <div
          className="flex flex-wrap gap-x-6 gap-y-1 pb-6"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-baseline gap-2">
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/25">
              Effective
            </span>
            <span className="text-[12px] font-light text-white/55">{effectiveDate}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/25">
              Last updated
            </span>
            <span className="text-[12px] font-light text-white/55">{lastUpdated}</span>
          </div>
        </div>
        <div className="mt-7 text-[14px] md:text-[15px] text-white/55 font-light leading-[1.8] max-w-[640px]">
          {intro}
        </div>
      </section>

      <section className="px-6 md:px-20 max-w-[820px] mx-auto pb-24 legal-prose">
        {children}
      </section>

      <section className="px-6 md:px-20 max-w-[820px] mx-auto pb-28">
        <div
          className="rounded-[24px] px-7 md:px-10 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div>
            <p className="text-[10px] font-medium tracking-[0.24em] uppercase text-white/30 mb-2">
              Other legal
            </p>
            <p className="text-[13px] text-white/40 font-light">
              See our other policies and how to reach us.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/legal/terms-of-service"
              className="inline-flex items-center text-[12px] font-medium px-4 py-2.5 rounded-full transition-colors"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Terms of Service
            </Link>
            <Link
              href="/legal/privacy-policy"
              className="inline-flex items-center text-[12px] font-medium px-4 py-2.5 rounded-full transition-colors"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center text-[12px] font-medium px-4 py-2.5 rounded-full"
              style={{
                background: "rgba(249,168,201,0.1)",
                border: "1px solid rgba(249,168,201,0.2)",
                color: "#F9A8C9",
              }}
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
