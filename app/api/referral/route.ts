import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const TIERS = [
  { min: 0,   name: "Getting Started" },
  { min: 50,  name: "Rising Star" },
  { min: 120, name: "Ambassador" },
  { min: 250, name: "VIP" },
  { min: 500, name: "Lumii OG" },
] as const;

function getTier(points: number) {
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (points >= TIERS[i].min) return TIERS[i].name;
  }
  return TIERS[0].name;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const { data: referrer, error } = await supabaseAdmin
    .from("Referrers")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !referrer) {
    return NextResponse.json({ error: "Referrer not found" }, { status: 404 });
  }

  // Count how many waitlist entries used this referral code
  const { count: referralCount } = await supabaseAdmin
    .from("Waitlist")
    .select("*", { count: "exact", head: true })
    .eq("refferal_source", referrer.referral_code);

  const points = referrer.points ?? 0;

  return NextResponse.json({
    name: referrer.name,
    referral_code: referrer.referral_code,
    points,
    referral_count: referralCount ?? 0,
    tier: getTier(points),
  });
}

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (!name || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // Check if already registered
    const { data: existing } = await supabaseAdmin
      .from("Referrers")
      .select("referral_code")
      .eq("email", email)
      .single();

    if (existing) {
      return NextResponse.json({
        referral_code: existing.referral_code,
        share_url: `https://lumiiapp.com?ref=${existing.referral_code}`,
      });
    }

    // Generate unique referral code: first name lowercase + random 4 digits
    const firstName = name.trim().split(/\s+/)[0].toLowerCase();
    const code = `${firstName}${Math.floor(1000 + Math.random() * 9000)}`;

    const { error: insertError } = await supabaseAdmin
      .from("Referrers")
      .insert([{
        email,
        name: name.trim(),
        referral_code: code,
        points: 0,
      }]);

    if (insertError) {
      console.error("Referrer insert error:", insertError);
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }

    return NextResponse.json({
      referral_code: code,
      share_url: `https://lumiiapp.com?ref=${code}`,
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
