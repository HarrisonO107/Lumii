"use client";

import { useEffect, useState } from "react";

// ── Store targets ────────────────────────────────────────────────────────────
// Android listing resolves by package id. The iOS App Store listing isn't
// published yet — it needs the numeric app id once live
// (https://apps.apple.com/app/id<NUMERIC>). Until APP_STORE_URL is set, iOS and
// desktop fall back to the marketing site so a tapped invite is NEVER a dead end.
//   TODO(harrison): set APP_STORE_URL to the real listing when iOS is live.
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.hfjo.lumii";
const APP_STORE_URL = "";
const SITE_URL = "https://lumiiapp.com";

// Short branded beat before whisking a new (app-less) user to the store. Long
// enough for an existing user to tap "Open it" first.
const AUTO_REDIRECT_MS = 2600;

const INK = "#1C1815";
const PAPER = "#F4EEE4";
const ROSE = "#C2566F";

function storeUrlFor(): string {
  if (typeof navigator === "undefined") return SITE_URL;
  const ua = navigator.userAgent || "";
  if (/iPad|iPhone|iPod/.test(ua)) return APP_STORE_URL || SITE_URL;
  if (/Android/.test(ua)) return PLAY_STORE_URL;
  return SITE_URL;
}

export default function InviteRedirect({ code }: { code: string }) {
  const [store, setStore] = useState(SITE_URL);

  useEffect(() => {
    // Stash the code (best-effort) for any later web-based redeem path. NOTE:
    // true deferred deep-linking — the code auto-applying AFTER a fresh install
    // — needs an attribution provider (Branch/AppsFlyer) and is flagged as a
    // separate decision. This cookie/localStorage only survives within the web.
    try {
      localStorage.setItem("lumii_referral_code", code);
      document.cookie = `lumii_ref=${code}; path=/; max-age=2592000; SameSite=Lax`;
    } catch {
      // Private mode / blocked storage — the code is still shown on-screen.
    }

    const target = storeUrlFor();
    setStore(target);

    // If the user taps "Open in app", the scheme navigation backgrounds this
    // tab — cancel the auto store-redirect so we don't yank them away from it.
    let cancelled = false;
    const onVisibility = () => {
      if (document.hidden) cancelled = true;
    };
    document.addEventListener("visibilitychange", onVisibility);

    const timer = setTimeout(() => {
      if (!cancelled && !document.hidden) window.location.replace(target);
    }, AUTO_REDIRECT_MS);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [code]);

  // Fire the in-app deep link. Manual (a button) rather than auto, so iOS never
  // pops an "invalid address" dialog for users who don't have the app.
  const openInApp = () => {
    window.location.href = `lumii://i/${encodeURIComponent(code)}`;
  };

  return (
    <main
      className="paper-grain flex min-h-screen items-center justify-center px-6"
      style={{ background: PAPER, color: INK }}
    >
      <div className="w-full max-w-sm text-center">
        <div
          className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ background: INK, color: PAPER }}
        >
          <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "1.5rem" }}>
            L
          </span>
        </div>

        <p
          className="mb-3 text-xs uppercase"
          style={{ letterSpacing: "0.2em", color: "rgba(28,24,21,0.5)" }}
        >
          You&rsquo;re invited
        </p>
        <h1
          className="mb-4 text-3xl leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          A friend invited you to Lumii
        </h1>
        <p className="mb-7 text-[15px] leading-relaxed" style={{ color: "rgba(28,24,21,0.7)" }}>
          Their code is locked in. Join and you&rsquo;ll <em>both</em> get 14 days of Lumii&nbsp;Pro
          &mdash; free.
        </p>

        <div
          className="mx-auto mb-7 inline-flex items-center gap-3 rounded-full px-5 py-2.5"
          style={{ background: "rgba(28,24,21,0.05)", border: "1px solid rgba(28,24,21,0.12)" }}
        >
          <span className="text-[11px] uppercase" style={{ letterSpacing: "0.15em", color: "rgba(28,24,21,0.5)" }}>
            code
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.125rem", letterSpacing: "0.25em" }}>
            {code}
          </span>
        </div>

        <a
          href={store}
          className="block w-full rounded-full py-4 text-[15px] font-semibold transition-opacity hover:opacity-90"
          style={{ background: ROSE, color: "#FFFFFF" }}
        >
          Get Lumii
        </a>

        <button
          onClick={openInApp}
          className="mt-4 text-sm hover:underline"
          style={{ color: "rgba(28,24,21,0.6)", textUnderlineOffset: "4px" }}
        >
          Already have the app? Open it &rarr;
        </button>

        <p className="mt-8 text-xs" style={{ color: "rgba(28,24,21,0.4)" }}>
          Taking you to the app&hellip;
        </p>
      </div>
    </main>
  );
}
