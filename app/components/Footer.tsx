import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="px-6 md:px-20 py-10"
      style={{
        background: "#060308",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-baseline">
          <span
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#fff",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            Lumii
          </span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 300,
              color: "#F9A8C9",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              marginLeft: 1,
              opacity: 0.9,
            }}
          >
            +
          </span>
          <span className="text-[11px] font-light text-white/30 ml-4">
            © {new Date().getFullYear()} HFJO&amp;CO LIMITED
          </span>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link
            href="/legal/terms-of-service"
            className="text-[11px] font-medium tracking-[0.12em] uppercase text-white/45 hover:text-white/85 transition-colors"
          >
            Terms
          </Link>
          <Link
            href="/legal/privacy-policy"
            className="text-[11px] font-medium tracking-[0.12em] uppercase text-white/45 hover:text-white/85 transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/contact"
            className="text-[11px] font-medium tracking-[0.12em] uppercase text-white/45 hover:text-white/85 transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/faq"
            className="text-[11px] font-medium tracking-[0.12em] uppercase text-white/45 hover:text-white/85 transition-colors"
          >
            FAQ
          </Link>
        </nav>
      </div>
    </footer>
  );
}
