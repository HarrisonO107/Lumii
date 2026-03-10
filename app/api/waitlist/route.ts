import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const { error } = await supabase
    .from("Waitlist")
    .insert([{ email }]);

  if (error) {
    // Duplicate email — succeed silently so we don't reveal who's on the list
    if (error.code === "23505") {
      return NextResponse.json({ success: true });
    }
    console.error("Supabase error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }

  // Send confirmation email via Resend
  await resend.emails.send({
    from: "Lumii <hello@yourdomain.com>",
    to: email,
    subject: "You're on the list ✦",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px; background: #fff;">
        <h1 style="font-size: 24px; font-weight: 300; color: #0f172a; margin-bottom: 12px;">
          You're in. ✦
        </h1>
        <p style="font-size: 14px; color: #64748b; line-height: 1.7; font-weight: 300;">
          Thanks for joining the Lumii waitlist. We'll reach out before anyone else
          when we launch — your spot is saved.
        </p>
        <p style="font-size: 14px; color: #64748b; line-height: 1.7; font-weight: 300; margin-top: 24px;">
          — The Lumii team
        </p>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}