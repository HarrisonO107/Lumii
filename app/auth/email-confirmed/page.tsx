// Landing page for Supabase email-change confirmation links.
//
// Flow:
//   1. User changes email in the Lumii app → Supabase emails the NEW address
//   2. Supabase's link points here with ?token_hash=...&type=email_change
//   3. Server-side: we POST the token to Supabase /auth/v1/verify
//   4. Supabase flips auth.users.email; we render the appropriate UI
//
// We do this server-side so we can reuse the existing SUPABASE_URL /
// SUPABASE_ANON_KEY env vars without exposing them client-side.

import { createClient } from '@supabase/supabase-js';

type Props = {
  searchParams: Promise<{ token_hash?: string; type?: string }>;
};

async function verifyEmailChange(tokenHash: string): Promise<{ ok: true } | { ok: false; reason: string }> {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
  );

  const { error } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type: 'email_change',
  });

  if (!error) return { ok: true };

  const msg = error.message.toLowerCase();
  if (msg.includes('expired') || msg.includes('invalid')) {
    return {
      ok: false,
      reason: 'This link has expired or already been used. Open the Lumii app and request a new email change.',
    };
  }
  return { ok: false, reason: error.message };
}

export default async function EmailConfirmedPage({ searchParams }: Props) {
  const { token_hash, type } = await searchParams;

  let state: 'success' | 'error';
  let errorMsg = '';

  if (!token_hash || type !== 'email_change') {
    state = 'error';
    errorMsg = 'This link is missing required information. Try changing your email again from the app.';
  } else {
    const result = await verifyEmailChange(token_hash);
    if (result.ok) {
      state = 'success';
    } else {
      state = 'error';
      errorMsg = result.reason;
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: 'linear-gradient(180deg, #0E0710 0%, #1a0d1f 100%)',
        color: '#fff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 420 }}>
        {state === 'success' ? (
          <>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✨</div>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Email confirmed</h1>
            <p style={{ opacity: 0.8, marginBottom: '2rem' }}>
              Your new email address is now active. You can close this page and return to the Lumii app.
            </p>
            
              href="lumii://"
              style={{
                display: 'inline-block',
                padding: '0.875rem 2rem',
                background: 'linear-gradient(135deg, #f8b3d0 0%, #e89bbf 100%)',
                color: '#1a0d1f',
                fontWeight: 600,
                borderRadius: 999,
                textDecoration: 'none',
              }}
            >
              Open Lumii
            </a>
          </>
        ) : (
          <>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Couldn't confirm</h1>
            <p style={{ opacity: 0.8, marginBottom: '2rem' }}>{errorMsg}</p>
            
              href="lumii://"
              style={{
                display: 'inline-block',
                padding: '0.875rem 2rem',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                fontWeight: 600,
                borderRadius: 999,
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              Return to Lumii
            </a>
          </>
        )}
      </div>
    </main>
  );
}
