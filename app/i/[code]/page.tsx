import type { Metadata } from "next";
import { redirect } from "next/navigation";
import InviteRedirect from "./InviteRedirect";

// Referral codes are 6 chars from the alphabet ABCDEFGHJKMNPQRSTUVWXYZ23456789
// (see the backend handle_new_user trigger). We validate loosely as 6 alphanums
// so a slightly-off code still resolves rather than 404ing the share loop.
const CODE_RE = /^[A-Z0-9]{6}$/;

function normalize(raw: string): string | null {
  const c = decodeURIComponent(raw || "").trim().toUpperCase();
  return CODE_RE.test(c) ? c : null;
}

export async function generateMetadata(
  { params }: { params: Promise<{ code: string }> },
): Promise<Metadata> {
  const { code } = await params;
  const c = normalize(code);
  const title = "You're invited to Lumii";
  const description = c
    ? `Use code ${c} when you join — you'll both get 14 days of Lumii Pro, free.`
    : "Join me on Lumii — your face, by the numbers.";
  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary", title, description },
    // Per-code invite pages are personal links, not content — keep them out of search.
    robots: { index: false, follow: false },
  };
}

export default async function InvitePage(
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;
  const c = normalize(code);
  // Garbage code → send them to the marketing home rather than a dead end.
  if (!c) redirect("/");
  return <InviteRedirect code={c} />;
}
