import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  const { count, error } = await supabaseAdmin
    .from("Waitlist")
    .select("*", { count: "exact", head: true });

  if (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }

  return NextResponse.json({ count: count ?? 0 });
}

export async function POST(req: Request) {
  try {
    const { email, ref } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Insert into Supabase with referral source
    const { error: dbError } = await supabase
      .from("Waitlist")
      .insert([{
        email,
        refferal_source: ref || null,
      }]);

    if (dbError) {
      if (dbError.code === "23505") {
        return NextResponse.json({ success: true });
      }
      console.error("Supabase error:", dbError);
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }

    // Award referral points if ref code matches a referrer
    if (ref) {
      const { data: referrer } = await supabaseAdmin
        .from("Referrers")
        .select("id, points")
        .eq("referral_code", ref)
        .single();

      if (referrer) {
        await supabaseAdmin
          .from("Referrers")
          .update({ points: (referrer.points ?? 0) + 10 })
          .eq("id", referrer.id);
      }
    }

    // Send confirmation email
    try {
      await resend.emails.send({
        from: "Lumii <hello@lumiiapp.com>",
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
    } catch (emailErr) {
      console.error("Resend error:", emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
