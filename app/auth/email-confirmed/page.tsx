// Landing page for Supabase email-change confirmation links.
//
// Flow:
//   1. User changes email in the Lumii app, Supabase emails the NEW address
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

async function verifyEmailChange(tokenHash: string) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
  );

  const { error } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type: 'email_change',
  });

  if (!error) {
    return { ok: true as const };
  }

  const msg = error.message.toLowerCase();
  const isExpired = msg.includes('expired') || msg.includes('invalid');
  return {
    ok: false as const,
    reason: isExpired
      ? 'This link has expired or already been used. Open the Lumii app and request a new email change.'
      : error.message,
  };
}

const pageStyle = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  background: 'linear-gradient(180deg, #0E0710 0%, #1a0d1f 100%)',
  color: '#fff',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  textAlign: 'center' as const,
};

const primaryButtonStyle = {
  display: 'inline-block',
  padding: '0.875rem 2rem',
  background: 'linear-gradient(135deg, #f8b3d0 0%, #e89bbf 100%)',
  color: '#1a0d1f',
  fontWeight: 600,
  borderRadius: 999,
  textDecoration: 'none',
};

const secondaryButtonStyle = {
  display: 'inline-block',
  padding: '0.875rem 2rem',
  background: 'rgba(255,255,255,0.1)',
  color: '#fff',
  fontWeight: 600,
  borderRadius: 999,
  textDecoration: 'none',
  border: '1px solid rgba(255,255,255,0.2)',
};

export default async function EmailConfirmedPage({ searchParams }: Props) {
  const params = await searchParams;
  const tokenHash = params.token_hash;
  const type = params.type;

  let state: 'success' | 'error' = 'error';
  let errorMsg = 'This link is missing required information. Try changing your email again from the app.';

  if (tokenHash && type === 'email_change') {
    const result = await verifyEmailChange(tokenHash);
    if (result.ok) {
      state = 'success';
    } else {
      errorMsg = result.reason;
    }
  }

  if (state === 'success') {
    return (
      <main style={pageStyle}>
        <div style={{ maxWidth: 420 }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Email confirmed</h1>
          <p style={{ opacity: 0.8, marginBottom: '2rem' }}>
            Your new email address is now active. You can close this page and return to the Lumii app.
          </p>
          <a href="lumii://" style={primaryButtonStyle}>Open Lumii</a>
        </div>
      </main>
    );
  }

  return (
    <main style={pageStyle}>
      <div style={{ maxWidth: 420 }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Couldn&apos;t confirm</h1>
        <p style={{ opacity: 0.8, marginBottom: '2rem' }}>{errorMsg}</p>
        <a href="lumii://" style={secondaryButtonStyle}>Return to Lumii</a>
      </div>
    </main>
  );
}
