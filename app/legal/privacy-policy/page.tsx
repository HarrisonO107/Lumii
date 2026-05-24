import type { Metadata } from "next";
import LegalLayout from "../LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — Lumii",
  description:
    "How Lumii (HFJO&CO LIMITED) collects, uses and protects your personal data, including face photos, biometric metrics and account information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title={
        <>
          Privacy <em className="italic" style={{ color: "#F9A8C9" }}>Policy.</em>
        </>
      }
      effectiveDate="24 May 2026"
      lastUpdated="24 May 2026"
      intro={
        <>
          <p>
            This Privacy Policy describes how Lumii (&quot;<strong>Lumii</strong>&quot;,
            &quot;<strong>we</strong>&quot;, &quot;<strong>us</strong>&quot; or
            &quot;<strong>our</strong>&quot;) collects, uses, stores and shares information when you use
            the Lumii mobile application (the &quot;<strong>App</strong>&quot;) and any related services
            (together, the &quot;<strong>Service</strong>&quot;).
          </p>
          <p>
            Lumii is operated by <strong>HFJO&amp;CO LIMITED</strong>, a company registered in England
            &amp; Wales under company number <strong>15421741</strong>, with its registered office at{" "}
            <strong>167–169 Great Portland Street, 5th Floor, London W1W 5PF, United Kingdom</strong>.
            HFJO&amp;CO LIMITED is the data controller responsible for your personal data and is
            contactable at the address and email below.
          </p>
          <p>
            If you have any questions about this policy, email{" "}
            <a href="mailto:office@hfjo.co.uk"><strong>office@hfjo.co.uk</strong></a>.
          </p>
        </>
      }
    >
      <h2>1. The short version</h2>
      <p>
        We built Lumii to give you a personalised facial-aesthetics analysis and routine. To do that we
        need to process your face photos and a few details you choose to share (age, beauty goals,
        optional cycle data). Here is the plain-English summary:
      </p>
      <ul>
        <li><strong>Your face photos</strong> are uploaded to our server only to be analysed. They are <strong>automatically deleted within 24 hours</strong> of upload. We never sell them, share them with advertisers, or use them to train any third-party AI model.</li>
        <li><strong>Your scan results</strong> (scores, grades, tips) are kept mostly <strong>on your device</strong>. The server keeps only quota timestamps and cached tips against your profile — not the full scan history.</li>
        <li><strong>Your account</strong> (name, email, password) is stored by our authentication provider, Supabase, so you can sign back in.</li>
        <li><strong>Lumii Pro is an optional subscription</strong> (£3.99/week or £39.99/year). Payments are handled entirely by Apple In-App Purchase — <strong>your card details never touch our servers</strong>. We use RevenueCat to confirm your subscription status and apply promotional rewards.</li>
        <li>We use <strong>Anthropic&apos;s Claude API</strong> to generate personalised tips and to power the in-app cat-mascot chat. <strong>We do not send Anthropic your face photos, your facial landmarks, your email, or your name</strong> — only your numerical scores and your typed chat messages. Under our agreement with Anthropic, your data is not used to train Anthropic&apos;s models.</li>
        <li>We use <strong>Sentry</strong> to keep the app reliable. Sentry collects crash reports and performance data on every session. It also records screen-recording samples — about 10% of all sessions, and 100% of sessions in which an error occurs — to help us reproduce bugs. Sentry data is processed in Frankfurt, Germany.</li>
        <li>We do <strong>not</strong> show ads, track you across other apps, or sell your personal data.</li>
        <li>You can <strong>delete your account and all associated data</strong> from inside the App at any time. We act on the request immediately and finish deleting any backups within 30 days, except for a small number of pseudonymised audit records we keep for fraud-prevention (with your identity removed).</li>
        <li><strong>California residents</strong> have additional rights to know, access, delete, correct, and limit how we use sensitive personal information. See Section 17 for a Notice at Collection summary and Section 10.2 for the full rights breakdown.</li>
      </ul>
      <p>If you want the full detail, the rest of this document spells it out.</p>

      <hr />

      <h2>2. Who this policy applies to</h2>
      <p>
        Lumii is intended for users <strong>aged 13 and over</strong>. Users between the ages of 13 and
        17 should use Lumii only with the consent of a parent or legal guardian. We do not currently
        operate an in-app parental-verification flow — see Section 11 for details on how this works,
        including how a parent or guardian can exercise rights on behalf of a 13–17 year old.
      </p>
      <p>
        We do <strong>not</strong> knowingly collect personal information from children under 13. If you
        believe a child under 13 has provided us with personal data, contact us at the address above and
        we will delete it.
      </p>

      <hr />

      <h2>3. Information we collect</h2>

      <h3>3.1 Information you give us directly</h3>
      <ul>
        <li><strong>Account details:</strong> your name, email address, and password when you create an account, or your Apple ID / Google account if you use Sign in with Apple or Sign in with Google. Passwords are handled by our authentication provider and we never see them in plain text. If you choose Sign in with Apple&apos;s &quot;Hide My Email&quot; feature, we receive only the Apple relay address.</li>
        <li><strong>Profile details:</strong> an optional profile photo (avatar) you choose to upload.</li>
        <li><strong>Onboarding answers:</strong> your age, your beauty goals, your skin concerns and, if you choose to use cycle tracking, your menstrual-cycle dates and phase.</li>
        <li><strong>Photos you submit:</strong> the multi-angle face photos captured during a scan (or photos you pick from your library to analyse).</li>
        <li><strong>Content you create:</strong> goals you set, daily check-ins, journal entries, free-form questions you send to the in-app cat-mascot chat.</li>
        <li><strong>Saved locations (optional):</strong> if you enable location-based goal verification, the labels and coordinates of spots you save (e.g. &quot;gym&quot;, &quot;yoga studio&quot;). These are stored <strong>on your device only</strong>.</li>
        <li><strong>Apple Health data (optional, iOS only):</strong> if you enable Apple Health integration for goal verification, the App reads sleep, workouts, heart-rate variability, hydration, and active energy <strong>on your device only</strong>. This data is never transmitted to our servers.</li>
        <li><strong>Subscription purchases:</strong> if you subscribe to Lumii Pro, Apple&apos;s App Store handles the transaction. Apple shares with us (via RevenueCat) the fact and status of your subscription, but never your card or payment details.</li>
        <li><strong>Referral and waitlist codes:</strong> if you redeem a referral code or a founding-member waitlist code, the code you entered.</li>
        <li><strong>Communications:</strong> any emails or messages you send us.</li>
      </ul>

      <h3>3.2 Information we collect automatically</h3>
      <ul>
        <li><strong>Device information:</strong> device model, operating system version, and basic app configuration (collected through standard Expo / React Native SDKs to make the App work and to debug crashes).</li>
        <li><strong>Server logs:</strong> when your device connects to our backend, our hosting provider (Railway) and our application logs receive your IP address, the timestamp of the request, your user agent (device + app version string), and the API endpoint you called. We use these logs to debug errors, prevent abuse, and meet security obligations. Server logs are retained for up to <strong>30 days</strong> unless required for an active security or legal investigation.</li>
        <li>
          <strong>Crash, performance, and replay data (Sentry):</strong> we use Sentry, an error-monitoring service, to keep the App reliable. <strong>Sentry is always on in production.</strong> Sentry collects:
          <ul>
            <li>Crash reports and the stack traces leading up to them, with your IP address, user agent, and Lumii user ID attached.</li>
            <li>Performance metrics (which screens are slow, which network calls fail).</li>
            <li><strong>Screen recordings (session replay): we record approximately 10% of all sessions, and 100% of sessions in which an error occurs.</strong> Sensitive fields like password inputs are automatically masked by Sentry; however, you should be aware that screens you view (including the scan preview) may be recorded if your session is in the sampled set.</li>
            <li>In-app feedback you submit via the Sentry feedback widget (if surfaced).</li>
          </ul>
          All Sentry data is processed in <strong>Frankfurt, Germany</strong> (Sentry&apos;s EU data-residency endpoint). Sentry does not use Lumii&apos;s data for advertising. Lumii does not sell Sentry&apos;s data, and Sentry&apos;s privacy policy commits it not to sell customer data. We chose Sentry rather than a US-based equivalent specifically to keep this data inside the European Economic Area.
        </li>
        <li><strong>In-app usage events:</strong> in-app events such as which screens you visit, when you complete a scan, and how often you open the app. These events are stored <strong>on your device</strong> for personalisation; we do not currently send them to any third-party analytics provider.</li>
      </ul>

      <h3>3.3 Information generated about you</h3>
      <p>When you complete a scan we run computer-vision analysis on the photos and generate:</p>
      <ul>
        <li><strong>Facial landmarks:</strong> up to 584 numerical points describing the geometry of your face (positions of eyes, nose, lips, jawline, etc.).</li>
        <li><strong>Facial metrics:</strong> approximately 75 measurements derived from those landmarks (proportions, symmetry, skin metrics).</li>
        <li><strong>A &quot;glow score&quot; and grade label</strong> (e.g. &quot;Luminous&quot;), plus written tips and a personalised routine generated by an AI model.</li>
        <li><strong>A referral code</strong> (6 characters) generated automatically when you sign up, so friends can credit you when they join.</li>
      </ul>
      <p>
        We treat the facial landmarks and metrics as <strong>biometric data</strong>. See Section 5 for
        how we handle this category of data and what legal basis we rely on.
      </p>

      <h3>3.4 Information we do not collect</h3>
      <ul>
        <li>We do not collect advertising identifiers (IDFA / GAID) or use them for any purpose.</li>
        <li>We do not access your microphone. The microphone permission key has been removed from the App in this version. The camera library we use is configured with microphone access disabled.</li>
        <li>We do not access your contacts, calendar, or SMS.</li>
        <li>We do not use behavioural tracking cookies (the App is native; there are no cookies inside it).</li>
        <li>We do not track you across other apps or websites. Apple&apos;s App Tracking Transparency prompt does not appear because we have nothing to ask about.</li>
        <li>We do not retain your face photos after analysis (deleted within 24 hours; see Section 6).</li>
        <li>We do not sell your personal data, and we do not &quot;share&quot; it for cross-context behavioural advertising within the meaning of the CCPA / CPRA.</li>
      </ul>

      <h3>3.5 Referrals, waitlist codes, and goal verification</h3>
      <ul>
        <li><strong>Referrals.</strong> When you create an account, we generate a 6-character referral code unique to you. If you share this code and a friend redeems it on signup, we record the redemption (date, redeemer&apos;s Lumii user ID, your Lumii user ID, and the outcome of any reward grant) and increment a counter visible to you (&quot;X friends joined&quot;). We do <strong>not</strong> share the redeemer&apos;s email, name, or any other identifying information with you. If you redeem someone else&apos;s code on signup, we store the code you used on your profile for audit and fraud-prevention purposes.</li>
        <li><strong>Founding-member codes.</strong> A limited number of LUMI-XXXX codes were distributed to our pre-launch waitlist. When you redeem one, we record which code you used and when, so we can apply your founding-member perks and prevent the code being reused.</li>
        <li><strong>Geofence goal verification (optional).</strong> If you save a location for goal verification (for example, your gym), we store the label, latitude, longitude, accuracy, and radius <strong>on your device only</strong>. When you open the App, we may check your current location against your saved spots to auto-mark a goal as complete. Your location is never transmitted to our servers. You can revoke location permission at any time in iOS Settings → Privacy &amp; Security → Location Services → Lumii.</li>
        <li><strong>Photo library writes (optional).</strong> When you choose to save a scan result or progress photo, the App writes the image to your iOS Photos library. The save is performed by your device&apos;s operating system; we do not keep a copy of the saved file or know which album you placed it in.</li>
      </ul>

      <h3>3.6 Data we collect via our marketing website (lumiiapp.com)</h3>
      <p>
        Our marketing website at lumiiapp.com is separate from the Lumii App, but personal data you give
        it is handled with the same care.
      </p>
      <ul>
        <li><strong>Waitlist signup.</strong> If you join our waitlist, we collect your email address and, optionally, the referral source you tell us about. We store this in a Supabase database in London, United Kingdom, and send you a single confirmation email via Resend (a US-based transactional-email provider). We do not contact you further unless you ask us to.</li>
        <li><strong>Referral signup.</strong> If you sign up as a referrer on the marketing site, we collect your name and email address, and we generate a referral code unique to you. We track aggregated referral counts (&quot;points&quot;) on a leaderboard. The Supabase database row stores your email, name, code, and point total. We do not share your name or email with anyone you refer.</li>
        <li><strong>Analytics.</strong> Vercel Analytics tracks aggregated, cookieless page-view counts on the marketing site. See Section 12.</li>
      </ul>
      <p>
        You can ask us to delete data we hold from the marketing site by emailing{" "}
        <a href="mailto:office@hfjo.co.uk"><strong>office@hfjo.co.uk</strong></a> with the email address
        you signed up with.
      </p>
      <p>
        <strong>Age verification on the marketing site.</strong> The waitlist and referral signup forms
        on lumiiapp.com only accept users who select an age category of 13 or older; users selecting a
        lower age cannot submit the form. We do not knowingly collect personal information from anyone
        under 13 via the website.
      </p>

      <hr />

      <h2>4. How we use your information</h2>
      <p>
        The table below lists the purposes for which we process your personal data and our{" "}
        <strong>lawful basis</strong> under UK GDPR / EU GDPR for each.
      </p>
      <div className="legal-table">
        <table>
          <thead>
            <tr>
              <th>Purpose</th>
              <th>What we use</th>
              <th>Lawful basis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Provide the core scan and analysis feature</td>
              <td>Face photos, facial landmarks, facial metrics</td>
              <td>Contract (Art. 6(1)(b)) — and for the biometric category, your <strong>explicit consent</strong> (Art. 9(2)(a))</td>
            </tr>
            <tr>
              <td>Generate personalised tips and the cat-mascot chat</td>
              <td>Numerical scores, your chat messages</td>
              <td>Contract (Art. 6(1)(b))</td>
            </tr>
            <tr>
              <td>Sign you in and keep your session secure</td>
              <td>Email, password (hashed), authentication tokens, Apple / Google sign-in identifiers</td>
              <td>Contract (Art. 6(1)(b))</td>
            </tr>
            <tr>
              <td>Save and show you your scan history, goals, and progress</td>
              <td>Scan results, goal completions, check-ins (all stored on your device)</td>
              <td>Contract (Art. 6(1)(b))</td>
            </tr>
            <tr>
              <td>Personalise content using your onboarding answers</td>
              <td>Age, goals, concerns, cycle data (if entered)</td>
              <td>Contract (Art. 6(1)(b)); for cycle data (health data), your <strong>explicit consent</strong> (Art. 9(2)(a))</td>
            </tr>
            <tr>
              <td>Verify your Lumii Pro subscription and apply promotional rewards</td>
              <td>Lumii user ID, RevenueCat subscriber state, redeemed codes</td>
              <td>Contract (Art. 6(1)(b))</td>
            </tr>
            <tr>
              <td>Operate the referral system</td>
              <td>Referral code, referrer / redeemer user IDs, redemption events</td>
              <td>Contract (Art. 6(1)(b)); legitimate interest in fraud-prevention (Art. 6(1)(f))</td>
            </tr>
            <tr>
              <td>Send transactional emails (sign-up confirmation, password reset)</td>
              <td>Email address</td>
              <td>Contract (Art. 6(1)(b))</td>
            </tr>
            <tr>
              <td>Send local reminder notifications you have opted into</td>
              <td>Notification preferences stored on your device</td>
              <td>Consent (Art. 6(1)(a))</td>
            </tr>
            <tr>
              <td>Apple Health goal verification (on-device only)</td>
              <td>Sleep, workouts, HRV, hydration, energy reads</td>
              <td><strong>Explicit consent</strong> (Art. 9(2)(a)) — health data</td>
            </tr>
            <tr>
              <td>Geofence goal verification (on-device only)</td>
              <td>Latitude, longitude, accuracy, radius</td>
              <td>Consent (Art. 6(1)(a))</td>
            </tr>
            <tr>
              <td>Keep the App reliable; debug crashes</td>
              <td>Crash data, performance metrics, sampled session replay, IP, user agent (Sentry)</td>
              <td>Legitimate interest in app reliability (Art. 6(1)(f))</td>
            </tr>
            <tr>
              <td>Operate server-side rate limiting and prevent abuse</td>
              <td>IP address, user ID, request metadata (server logs)</td>
              <td>Legitimate interest in security (Art. 6(1)(f))</td>
            </tr>
            <tr>
              <td>Comply with legal obligations and enforce our Terms</td>
              <td>Any of the above where strictly necessary</td>
              <td>Legal obligation (Art. 6(1)(c)); legitimate interest (Art. 6(1)(f))</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        We do <strong>not</strong> use your personal data for behavioural advertising, profiling that
        produces legal effects, or training third-party AI models.
      </p>

      <hr />

      <h2>5. Biometric data, AI processing, and our legal basis</h2>
      <p>
        The facial landmarks and metrics we derive from your scan are biometric data and are treated as a{" "}
        <strong>special category of personal data</strong> under UK GDPR / EU GDPR Article 9.
      </p>
      <p>
        We process this data on the basis of your <strong>explicit consent</strong>, which you give the
        first time you complete a scan. You can withdraw consent at any time by deleting your account
        from the App. When you do this:
      </p>
      <ul>
        <li>Your account record is deleted from our authentication database.</li>
        <li>Any scan photos that have not yet aged out of our 24-hour retention window are deleted.</li>
        <li>The biometric metrics derived from your scans are deleted along with your account.</li>
      </ul>
      <p>
        For information about where this processing happens geographically, see Section 8 (International
        data transfers).
      </p>
      <p>
        For everyday (non-special-category) data we rely on the lawful bases listed in the Section 4
        table.
      </p>

      <h3>5.1 Automated processing</h3>
      <p>
        Our scan analysis uses computer vision and an AI model to generate scores, a grade label, and
        personalised tips. This is automated processing.
      </p>
      <p>
        It does <strong>not</strong> produce legal effects or similarly significant effects on you within
        the meaning of UK GDPR / EU GDPR <strong>Article 22(1)</strong>: the output is an aesthetic
        suggestion and a routine recommendation, not a decision about your employment, credit,
        insurance, access to services, or any other matter with material legal or financial consequence.
      </p>
      <p>You can:</p>
      <ul>
        <li>Request a human review of any score that materially affects you, by emailing <a href="mailto:office@hfjo.co.uk"><strong>office@hfjo.co.uk</strong></a>.</li>
        <li>Delete any individual scan, or your entire account, at any time from inside the App.</li>
      </ul>

      <h3>5.2 What we send to Anthropic (Claude)</h3>
      <p>
        We use <strong>Anthropic&apos;s Claude API</strong> to generate personalised tips and to power
        the cat-mascot chat. We want to be explicit about what does and does not leave our servers for
        Anthropic:
      </p>
      <p><strong>We never send Anthropic:</strong></p>
      <ul>
        <li>Your face photos.</li>
        <li>Your facial landmarks (the 584 numerical points).</li>
        <li>Your email address.</li>
        <li>Your name.</li>
        <li>Your account identifiers.</li>
      </ul>
      <p><strong>What we do send Anthropic, to generate your tips:</strong></p>
      <ul>
        <li>Your numerical scan scores (overall score, grade label, per-category scores).</li>
        <li>Your skin tone and undertone classification from the scan.</li>
        <li>A short prompt template that describes the response format.</li>
      </ul>
      <p><strong>What we send Anthropic when you use the cat-mascot chat:</strong></p>
      <ul>
        <li>The chat message you typed.</li>
        <li>Your numerical scan scores for context.</li>
        <li>A short prompt template that describes the cat-mascot persona.</li>
      </ul>
      <p>
        Anthropic processes the request and returns a text response.{" "}
        <strong>Under our Commercial Terms agreement with Anthropic, the prompts and responses are not
        used to train Anthropic&apos;s models.</strong>{" "}
        Anthropic&apos;s privacy policy is at{" "}
        <a href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noreferrer">
          anthropic.com/legal/privacy
        </a>.
      </p>
      <p>
        You can avoid sending any data to Anthropic by not generating tips (don&apos;t open the Improve
        tab) and not using the cat-mascot chat. Both are features you initiate.
      </p>

      <hr />

      <h2>6. How long we keep your data</h2>
      <div className="legal-table">
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Retention</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Uploaded face photos on our backend</td>
              <td>Automatically deleted within <strong>24 hours</strong> of upload</td>
            </tr>
            <tr>
              <td>Cached tips, scan timestamps, quota anchors on your profile</td>
              <td>Until you delete your account</td>
            </tr>
            <tr>
              <td>Profile (name, email, avatar)</td>
              <td>Until you delete your account</td>
            </tr>
            <tr>
              <td>On-device data (scan history, goals, cycle log, streaks, saved locations)</td>
              <td>Until you uninstall the App or clear its data</td>
            </tr>
            <tr>
              <td>Authentication tokens</td>
              <td>While you remain signed in; you can sign out at any time</td>
            </tr>
            <tr>
              <td>Crash, performance, and session-replay data (Sentry)</td>
              <td>Up to 90 days, then deleted by Sentry</td>
            </tr>
            <tr>
              <td>Server logs (IP, user agent, request metadata)</td>
              <td>Up to 30 days, unless required for an active security or legal investigation</td>
            </tr>
            <tr>
              <td>Email correspondence with us</td>
              <td>Up to 24 months unless we need it longer to resolve a complaint</td>
            </tr>
            <tr>
              <td>Subscription history (via RevenueCat)</td>
              <td>For the life of your account, then handled per RevenueCat&apos;s retention policy after deletion</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        When you request account deletion in-app, we begin removing your data immediately. Any residual
        copies in encrypted backups are overwritten on our backup-rotation schedule and fully gone within{" "}
        <strong>30 days</strong>.
      </p>

      <h3>After account deletion: what we keep</h3>
      <p>
        For fraud-prevention and audit integrity we retain a small number of{" "}
        <strong>pseudonymised</strong> records after you delete your account:
      </p>
      <ul>
        <li>Which waitlist code was redeemed and when, with the redeemer&apos;s user ID set to NULL.</li>
        <li>Referral redemption events, with both referrer and redeemer user IDs set to NULL.</li>
      </ul>
      <p>
        These records cannot be linked back to you after deletion. We rely on UK GDPR / EU GDPR Article
        17(3)(b) and 17(3)(e) (legal obligation / establishment of legal claims) for this retention.
      </p>

      <hr />

      <h2>7. Who we share your data with</h2>
      <p>
        We do not sell your personal data. We share it only with the service providers below, and only to
        the extent necessary for them to perform their function. These providers are contractually bound
        to protect your data and to use it only on our instructions.
      </p>
      <div className="legal-table">
        <table>
          <thead>
            <tr>
              <th>Provider</th>
              <th>Purpose</th>
              <th>Where</th>
              <th>Privacy policy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Lumii backend (operated by HFJO&amp;CO LIMITED, hosted on Railway, Inc.)</strong></td>
              <td>Computer-vision analysis of your scan photos to generate facial landmarks, metrics, and your glow score; storage of your profile; quota and subscription checks</td>
              <td>Active multi-region deployment on Railway: <strong>California (US West)</strong>, <strong>Virginia (US East)</strong>, <strong>Amsterdam (Netherlands)</strong>, and <strong>Singapore</strong>. Your request is routed to the nearest region — your personal data may be processed in any of these regions during a request.</td>
              <td>This Privacy Policy applies; Railway&apos;s policy at railway.app/legal/privacy</td>
            </tr>
            <tr>
              <td><strong>Supabase Inc.</strong> (App project)</td>
              <td>Authentication and database for your Lumii App account and profile</td>
              <td>London, United Kingdom (eu-west-2)</td>
              <td>supabase.com/privacy</td>
            </tr>
            <tr>
              <td><strong>Supabase Inc.</strong> (marketing-site project)</td>
              <td>Database for the marketing-site waitlist and referrer signups. <strong>Separate Supabase project</strong> from the App&apos;s.</td>
              <td>London, United Kingdom (eu-west-2)</td>
              <td>supabase.com/privacy</td>
            </tr>
            <tr>
              <td><strong>Anthropic, PBC</strong></td>
              <td>Generating personalised tips and powering the cat-mascot chat (Claude API)</td>
              <td>United States</td>
              <td>anthropic.com/legal/privacy</td>
            </tr>
            <tr>
              <td><strong>RevenueCat, Inc.</strong></td>
              <td>Verifying your Lumii Pro subscription status, applying promotional grants (e.g. referral rewards). Receives your Lumii user ID and your anonymous Apple subscriber identifier (a randomised ID Apple gives Lumii — not your Apple ID or email). <strong>Never receives your payment card details.</strong></td>
              <td>United States</td>
              <td>revenuecat.com/privacy</td>
            </tr>
            <tr>
              <td><strong>Resend, Inc.</strong></td>
              <td>Transactional email delivery for the marketing-site waitlist confirmation. Receives the recipient&apos;s email address and the email content.</td>
              <td>United States</td>
              <td>resend.com/legal/privacy-policy</td>
            </tr>
            <tr>
              <td><strong>Apple, Inc.</strong></td>
              <td>App distribution; Sign in with Apple (when you choose it); In-App Purchase payments for Lumii Pro; APNs is registered but <strong>only for local notifications scheduled by your device</strong> (we do not send a remote push token to our servers)</td>
              <td>Worldwide</td>
              <td>apple.com/legal/privacy</td>
            </tr>
            <tr>
              <td><strong>Google LLC — Sign in with Google</strong></td>
              <td>Authenticating you when you choose &quot;Sign in with Google&quot;. Google returns your name and email to us.</td>
              <td>United States</td>
              <td>policies.google.com/privacy</td>
            </tr>
            <tr>
              <td><strong>Google LLC — YouTube Data API</strong></td>
              <td>Returning tutorial-video search results inside the App</td>
              <td>United States</td>
              <td>policies.google.com/privacy</td>
            </tr>
            <tr>
              <td><strong>Google LLC — ML Kit Face Detection</strong></td>
              <td>On-device face tracking during the scan flow (runs locally on your device — no network calls)</td>
              <td>On-device only</td>
              <td>policies.google.com/privacy</td>
            </tr>
            <tr>
              <td><strong>Sentry (Functional Software, Inc.)</strong></td>
              <td>Crash reports, performance metrics, sampled session replay, in-app feedback widget. <strong>Always on in production builds.</strong> Session-replay default field masking is enabled — password inputs and sensitive form fields are automatically obscured.</td>
              <td><strong>Frankfurt, Germany</strong> (Sentry EU data residency)</td>
              <td>sentry.io/privacy</td>
            </tr>
            <tr>
              <td><strong>Expo / EAS (650 Industries, Inc.)</strong></td>
              <td>Build and over-the-air update infrastructure</td>
              <td>United States</td>
              <td>expo.dev/privacy</td>
            </tr>
            <tr>
              <td><strong>Vercel, Inc.</strong></td>
              <td>Hosting our marketing website at lumiiapp.com, <strong>and Vercel Analytics</strong> — cookieless, aggregated page-view analytics on the marketing site (no in-app data flows here).</td>
              <td>United States / European Union</td>
              <td>vercel.com/legal/privacy-policy</td>
            </tr>
            <tr>
              <td><strong>Google Play (Google LLC)</strong></td>
              <td>App distribution on Android, if you install the Android version</td>
              <td>Worldwide</td>
              <td>policies.google.com/privacy</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>Changes to our subprocessors.</strong> We will update this Privacy Policy whenever we
        add, remove, or materially change a subprocessor. If you have signed up to product updates, we
        will notify you of changes that materially affect what categories of data we share or where data
        is processed.
      </p>
      <p><strong>Other disclosures.</strong> We may also disclose your information:</p>
      <ul>
        <li>to comply with a legal obligation, court order, or lawful request from a government authority;</li>
        <li>to enforce our Terms of Service or to investigate potential breaches;</li>
        <li>to protect the rights, property, or safety of Lumii, our users, or the public; and</li>
        <li>as part of a corporate transaction (merger, acquisition, or sale of assets), in which case any acquirer will be bound by this Privacy Policy or a successor with at least the same protections.</li>
      </ul>
      <p>
        For information about how HFJO&amp;CO LIMITED handles general business correspondence and
        non-Lumii data, see our group privacy notice at{" "}
        <a href="https://www.hfjo.co.uk/privacy" target="_blank" rel="noreferrer">
          hfjo.co.uk/privacy
        </a>.
      </p>

      <hr />

      <h2>8. International data transfers</h2>
      <p>
        Lumii is based in the United Kingdom. Several of our service providers, and parts of our own
        backend, operate outside the UK and the European Economic Area.
      </p>
      <p>
        When personal data is transferred outside the UK or the EEA, we rely on one of the following
        safeguards in each case:
      </p>
      <div className="legal-table">
        <table>
          <thead>
            <tr>
              <th>Transfer</th>
              <th>Recipient location</th>
              <th>Safeguard</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lumii backend (Railway) — US West</td>
              <td>California, US</td>
              <td><strong>UK Addendum + EU Standard Contractual Clauses</strong> (Module 2: controller-to-processor), plus encryption in transit</td>
            </tr>
            <tr>
              <td>Lumii backend (Railway) — US East</td>
              <td>Virginia, US</td>
              <td>UK Addendum + EU SCCs (Module 2), plus encryption in transit</td>
            </tr>
            <tr>
              <td>Lumii backend (Railway) — Amsterdam</td>
              <td>Netherlands (EEA)</td>
              <td>No transfer outside the EEA</td>
            </tr>
            <tr>
              <td>Lumii backend (Railway) — Singapore</td>
              <td>Singapore</td>
              <td>UK Addendum + EU SCCs (Module 2), plus encryption in transit</td>
            </tr>
            <tr>
              <td>Anthropic (Claude API)</td>
              <td>United States</td>
              <td>UK Addendum + EU SCCs (Module 2), plus the contractual no-training commitment in Anthropic&apos;s Commercial Terms</td>
            </tr>
            <tr>
              <td>RevenueCat</td>
              <td>United States</td>
              <td>UK Addendum + EU SCCs (Module 2)</td>
            </tr>
            <tr>
              <td>Resend, Inc.</td>
              <td>United States</td>
              <td>UK Addendum + EU SCCs (Module 2)</td>
            </tr>
            <tr>
              <td>Google LLC (Sign-In, YouTube Data API)</td>
              <td>United States</td>
              <td><strong>EU-US Data Privacy Framework + UK Extension</strong> (Google is DPF-certified)</td>
            </tr>
            <tr>
              <td>Vercel, Inc. (hosting + Vercel Analytics)</td>
              <td>United States</td>
              <td><strong>EU-US Data Privacy Framework + UK Extension</strong> (Vercel is DPF-certified)</td>
            </tr>
            <tr>
              <td>Sentry (Frankfurt)</td>
              <td>Germany (EEA)</td>
              <td>No transfer outside the EEA</td>
            </tr>
            <tr>
              <td>Supabase (App project)</td>
              <td>London, UK</td>
              <td>No transfer outside the UK</td>
            </tr>
            <tr>
              <td>Supabase (marketing-site project)</td>
              <td>London, UK</td>
              <td>No transfer outside the UK</td>
            </tr>
            <tr>
              <td>Apple, Inc.</td>
              <td>Worldwide</td>
              <td>SCCs (intra-corporate, via Apple Distribution International as Apple&apos;s EU-facing entity), as applicable to the data category</td>
            </tr>
            <tr>
              <td>Expo / EAS</td>
              <td>United States</td>
              <td>UK Addendum + EU SCCs (Module 2)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        You can request a copy of the SCCs or the relevant DPF certifications by emailing the contact
        address at the top of this policy.
      </p>

      <hr />

      <h2>9. Security</h2>
      <p>We take reasonable technical and organisational measures to protect your personal data, including:</p>
      <ul>
        <li>HTTPS / TLS for all network traffic between the App, our backend, and our providers.</li>
        <li>Storage of authentication tokens in iOS Keychain and Android Keystore (via the operating-system secure storage).</li>
        <li>Server-side rate limiting and API-key gating on scan endpoints.</li>
        <li>Validation of uploaded files (size and format) before processing.</li>
        <li>Automatic deletion of scan photos within 24 hours of upload.</li>
        <li>Row-level security policies on our database so that users can only read their own profile data.</li>
        <li>Access controls so that only authorised people on the Lumii team can reach production systems.</li>
      </ul>
      <p>
        No internet-based service can be made absolutely secure. If a personal-data breach occurs that is
        likely to result in a risk to your rights and freedoms:
      </p>
      <ul>
        <li>We will assess severity within <strong>24 hours</strong> of discovery.</li>
        <li>We will notify the UK Information Commissioner&apos;s Office within <strong>72 hours</strong> if required under UK GDPR Article 33.</li>
        <li>We will notify affected <strong>California residents</strong> in accordance with <strong>California Civil Code §1798.82</strong>.</li>
        <li>We will notify other affected users by email, and through an in-app banner if appropriate, without undue delay where the breach is likely to result in a high risk to your rights and freedoms.</li>
      </ul>

      <hr />

      <h2>10. Your rights</h2>
      <p>Depending on where you live, you have some or all of the following rights.</p>

      <h3>10.1 Rights under UK GDPR and EU GDPR</h3>
      <ul>
        <li><strong>Access</strong> — ask for a copy of the personal data we hold about you.</li>
        <li><strong>Rectification</strong> — ask us to correct inaccurate or incomplete data.</li>
        <li><strong>Erasure</strong> (&quot;right to be forgotten&quot;) — ask us to delete your data. You can also do this yourself instantly from the in-app <strong>Account → Delete account</strong> option.</li>
        <li><strong>Restriction</strong> — ask us to pause our use of your data while a query is resolved.</li>
        <li><strong>Portability</strong> — ask for your data in a structured, machine-readable format.</li>
        <li><strong>Objection</strong> — object to processing based on our legitimate interests.</li>
        <li><strong>Withdraw consent</strong> — for anything we process on the basis of your consent (including biometric data, Apple Health integration, cycle tracking, and geofence verification).</li>
        <li><strong>Not be subject to automated decision-making that produces legal or similarly significant effects</strong> — see Section 5.1 for why we believe this does not apply to Lumii, and how to request human review if you disagree.</li>
        <li><strong>Complain to a supervisory authority</strong> — the UK ICO (<code>ico.org.uk</code>) or your local EU data-protection authority.</li>
      </ul>

      <h3>10.2 Rights under California law (CCPA, as amended by CPRA)</h3>
      <p>If you are a California resident:</p>
      <ul>
        <li>You have the right to <strong>know</strong> what categories of personal information we collect, the sources, the purposes for collection, and the categories of third parties we share it with. Sections 3, 4, and 7 of this policy describe these in full.</li>
        <li>You have the right to <strong>access</strong> the specific pieces of personal information we hold about you.</li>
        <li>You have the right to <strong>delete</strong> your personal information, subject to certain legal exceptions (see &quot;After account deletion: what we keep&quot; in Section 6).</li>
        <li>You have the right to <strong>correct</strong> inaccurate personal information.</li>
        <li>You have the right to <strong>limit the use and disclosure of sensitive personal information</strong>. Under CPRA, our biometric data (facial landmarks and metrics), precise location data, and any health data are categorised as <strong>sensitive personal information</strong>. To exercise this right, email <a href="mailto:office@hfjo.co.uk"><strong>office@hfjo.co.uk</strong></a> with subject <code>LIMIT SENSITIVE PI</code>. We will restrict processing of these categories to what is strictly necessary to provide the Service within <strong>15 business days</strong>.</li>
        <li>You have the right to <strong>opt out of the sale or sharing</strong> of your personal information. <strong>Lumii does not sell your personal information and does not &quot;share&quot; it for cross-context behavioural advertising within the meaning of CCPA / CPRA §1798.140(ad) or §1798.140(ah).</strong> The third-party processors listed in Section 7 receive personal information only to perform services we direct them to perform.</li>
        <li>You have the right not to receive <strong>discriminatory treatment</strong> for exercising any of these rights.</li>
      </ul>
      <p>You may authorise an agent to act on your behalf in line with California law.</p>

      <h3>10.3 Rights under CalOPPA</h3>
      <p>
        We honour Do Not Track signals as follows: the App does not use third-party behavioural tracking,
        so Do Not Track signals have no operational effect on Lumii. We will update this disclosure if
        that changes.
      </p>
      <p>
        We do not allow third parties to collect personally identifiable information about your activity
        across different websites or apps when you use Lumii.
      </p>

      <h3>10.4 How to exercise your rights</h3>
      <p>
        To exercise any of the rights above, email{" "}
        <a href="mailto:office@hfjo.co.uk"><strong>office@hfjo.co.uk</strong></a> from the email address
        on your Lumii account. (We are setting up a dedicated{" "}
        <strong>privacy@lumiiapp.com</strong> alias; until then, office@hfjo.co.uk is the canonical
        channel.)
      </p>
      <p><strong>Our intake process:</strong></p>
      <ol>
        <li>Send your request to office@hfjo.co.uk with a subject line that identifies the type (e.g. <code>ACCESS REQUEST</code>, <code>DELETION REQUEST</code>, <code>LIMIT SENSITIVE PI</code>).</li>
        <li>We will acknowledge within <strong>5 working days</strong>.</li>
        <li>We will respond in full within <strong>one month</strong> (UK / EU) or <strong>45 days</strong> (California). If your request is complex we may extend by a further two months and tell you why.</li>
        <li>For identity verification we may ask you to confirm details we already hold (e.g. account creation date, the email on your account). We will not ask for new sensitive information.</li>
        <li>Requests are free of charge, except where the law permits us to charge a reasonable fee (typically for manifestly unfounded or excessive requests).</li>
      </ol>

      <hr />

      <h2>11. Children&apos;s privacy and users aged 13–17</h2>
      <p>
        Lumii is rated 13+ in the App Store and Google Play.{" "}
        <strong>We do not knowingly collect personal information from children under 13.</strong> If you
        are a parent or guardian and believe your child under 13 has signed up to Lumii, please email{" "}
        <a href="mailto:office@hfjo.co.uk"><strong>office@hfjo.co.uk</strong></a> with subject{" "}
        <code>PARENTAL REQUEST — UNDER 13</code> and we will delete the account and any associated data
        within 7 working days.
      </p>

      <h3>11.1 Why the age picture is complicated</h3>
      <p>The age of digital consent is set differently in different jurisdictions:</p>
      <ul>
        <li><strong>UK</strong> — 13 (UK GDPR Article 8, retained EU law).</li>
        <li><strong>United States</strong> — 13 for COPPA purposes (we collect personal data only from users 13+; COPPA does not apply at or above 13).</li>
        <li><strong>EU member states</strong> — between 13 and 16 depending on the country. As of this policy&apos;s date, several EU member states have set the threshold at 16, including <strong>Germany, France, Ireland, the Netherlands, and others</strong>. In those countries, a user aged 13–15 needs parental consent for processing that relies on a &quot;consent&quot; lawful basis (notably our biometric scan, cycle tracking, and Apple Health integration).</li>
      </ul>
      <p>
        We currently rely on you to tell us your age truthfully during signup.{" "}
        <strong>We do not operate an in-app parental-verification flow at this time.</strong> If you are
        below the age of digital consent in your country, you should use Lumii only with your
        parent&apos;s or guardian&apos;s permission.
      </p>

      <h3>11.2 What we do for users we know or treat as under 18</h3>
      <p>
        For accounts where the user is, or appears to be, between 13 and 17, we apply protective defaults
        inspired by the UK Information Commissioner&apos;s Office Age-Appropriate Design Code (the
        &quot;Children&apos;s Code&quot;):
      </p>
      <ul>
        <li><strong>No marketing emails by default.</strong> Marketing emails (if we ever add them) require an explicit opt-in for any user.</li>
        <li><strong>No behavioural advertising.</strong> We do not show ads anywhere in Lumii, full stop — see Section 3.4.</li>
        <li><strong>No use of under-18 user data to train any AI model</strong>, including our own and our subprocessors&apos;.</li>
        <li><strong>No profile photo prompted beyond the optional avatar.</strong> We never ask under-18 users to upload images of themselves to anywhere except the scan flow itself.</li>
        <li><strong>Geofence and Apple Health integrations are off by default</strong> and require an explicit in-app opt-in.</li>
        <li><strong>The same data-minimisation defaults apply to all users</strong>, so this set is not less protective for adults; it is simply protective for everyone.</li>
      </ul>

      <h3>11.3 Rights of parents and guardians of 13–17 year olds</h3>
      <p>If you are the parent or guardian of a Lumii user aged 13–17, you can:</p>
      <ul>
        <li><strong>Review</strong> the personal data we hold about your child;</li>
        <li><strong>Request deletion</strong> of your child&apos;s account and associated data;</li>
        <li><strong>Withdraw consent</strong> for any consent-based processing (biometric scan, Apple Health, cycle tracking, geofence verification);</li>
        <li><strong>Restrict</strong> processing while a query is being resolved.</li>
      </ul>
      <p>
        To exercise these rights, email{" "}
        <a href="mailto:office@hfjo.co.uk"><strong>office@hfjo.co.uk</strong></a> with subject{" "}
        <code>PARENTAL REQUEST — UNDER 18</code> and include:
      </p>
      <ul>
        <li>Your name and relationship to the child;</li>
        <li>The child&apos;s name and the email address on the Lumii account;</li>
        <li>The right you are exercising.</li>
      </ul>
      <p>
        We will respond within <strong>7 working days</strong> for child-related requests. We may ask for
        a single additional confirmation (for example, the date the account was created, or a screenshot
        from inside the App) to verify your parental relationship.
      </p>

      <h3>11.4 If you are a user aged 13–17</h3>
      <p>
        You can delete the content you have posted at any time using the in-app Delete options, or by
        emailing us. You have the same rights as adult users (see Section 10) and we will respond to your
        requests directly — you do not need to go through a parent unless you would prefer to.
      </p>

      <hr />

      <h2>12. Cookies and tracking technologies</h2>
      <p>
        The Lumii App is a native iOS and Android application;{" "}
        <strong>it does not use cookies, web beacons, pixels, or any browser-based tracking
        technology</strong>, because there is no browser inside the App.
      </p>
      <p>
        Our marketing website at <strong>lumiiapp.com</strong> is a Next.js application hosted on Vercel.
        It uses <strong>Vercel Analytics</strong> for cookieless, aggregated page-view analytics. Vercel
        Analytics does not use cookies, does not track you across other sites, and does not assign you a
        persistent identifier. We will update this section if we add any other tracking or analytics
        technology to the App or the website.
      </p>

      <hr />

      <h2>13. Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. When we make material changes — for example,
        adding a new subprocessor, changing where personal data is processed, or adding a new category of
        data we collect — we will:
      </p>
      <ul>
        <li>update the <strong>Last Updated</strong> date at the top of this policy, and</li>
        <li>notify you through the App or by email of the change (see also the subprocessor-change-notification commitment in Section 7).</li>
      </ul>
      <p>
        Your continued use of Lumii after the new policy takes effect means you accept the updated
        policy. If a change materially reduces your rights, we will give you a reasonable opportunity to
        delete your account before the change takes effect.
      </p>

      <hr />

      <h2>14. Contact</h2>
      <p>If you have questions about this Privacy Policy, or want to exercise any of your rights:</p>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:office@hfjo.co.uk">office@hfjo.co.uk</a></li>
        <li><strong>Postal address:</strong> HFJO&amp;CO LIMITED, 167–169 Great Portland Street, 5th Floor, London W1W 5PF, United Kingdom</li>
        <li><strong>Data controller:</strong> HFJO&amp;CO LIMITED, registered in England &amp; Wales under company number 15421741</li>
      </ul>
      <p>
        A dedicated <strong>privacy@lumiiapp.com</strong> alias is being set up. Until it is live, please
        use <strong>office@hfjo.co.uk</strong> — your message will reach the same person.
      </p>
      <p>If you are not satisfied with our response, you can complain to:</p>
      <ul>
        <li>the UK Information Commissioner&apos;s Office at <strong>ico.org.uk</strong> (0303 123 1113);</li>
        <li>your local EU data-protection authority (see Section 18 on our EU representative position); or</li>
        <li>(for California residents) the California Attorney General&apos;s office.</li>
      </ul>

      <hr />

      <h2>15. Subscriptions and payments</h2>
      <p>
        Lumii offers an optional subscription called <strong>Lumii Pro</strong>, which unlocks the full
        feature set described inside the App (the score breakdown, AI coach, verification integrations,
        personalised protocols, unlimited scans, and more).
      </p>

      <h3>15.1 Pricing and renewal</h3>
      <div className="legal-table">
        <table>
          <thead>
            <tr>
              <th>Plan</th>
              <th>Price (UK)</th>
              <th>Billing</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Weekly</td>
              <td><strong>£3.99 / week</strong></td>
              <td>Auto-renews each week unless cancelled</td>
            </tr>
            <tr>
              <td>Annual</td>
              <td><strong>£39.99 / year</strong></td>
              <td>Auto-renews each year unless cancelled</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Regional pricing may vary based on Apple&apos;s local pricing tiers and any taxes Apple is
        required to collect. The exact price you will be charged is displayed inside the App before you
        confirm the purchase.
      </p>
      <p>
        Subscriptions <strong>auto-renew</strong> at the end of each billing period unless you cancel at
        least <strong>24 hours before</strong> the end of the current period. Renewal is charged to your
        Apple ID payment method.
      </p>

      <h3>15.2 How payment works</h3>
      <p>
        Payment is processed entirely by <strong>Apple In-App Purchase</strong> through the App Store.{" "}
        <strong>Lumii never receives or stores your payment card, bank account, or other financial
        details.</strong>
      </p>
      <p>
        We use <strong>RevenueCat, Inc.</strong> (a US-based subscription-management provider) to verify
        your subscription status and apply promotional rewards. RevenueCat receives your Lumii user ID
        and an anonymous Apple subscriber identifier (a randomised ID Apple gives to apps — not your
        Apple ID or your email). RevenueCat does not receive your payment details. See Section 7 for
        RevenueCat&apos;s processor entry and Section 8 for the transfer mechanism we use.
      </p>

      <h3>15.3 Managing or cancelling your subscription</h3>
      <p>You can manage or cancel your subscription at any time from your device:</p>
      <ul>
        <li><strong>iOS:</strong> Settings → tap your name at the top → Subscriptions → Lumii.</li>
        <li><strong>inside the App:</strong> the Paywall screen has a &quot;Manage subscription&quot; link that opens the same iOS Subscriptions screen.</li>
      </ul>
      <p>Cancellation takes effect at the end of your current billing period. You keep Lumii Pro access until then.</p>

      <h3>15.4 Refunds</h3>
      <p>
        Refunds are handled by <strong>Apple</strong> under the standard App Store Terms of Service. You
        can request a refund from Apple at <strong>reportaproblem.apple.com</strong>. Lumii cannot
        directly issue refunds for App Store purchases.
      </p>

      <h3>15.5 Promotional grants (referrals and waitlist codes)</h3>
      <p>
        When you redeem a friend&apos;s referral code, redeem a founding-member LUMI- code, or receive
        any other promotional grant from us, the resulting access to Lumii Pro is granted as a{" "}
        <strong>promotional entitlement through RevenueCat</strong>. It is <strong>not</strong> an Apple
        In-App Purchase, you are <strong>not charged</strong>, and your Apple ID is not billed.
        Promotional grants have a fixed duration (e.g. 14 days for a referral reward) and do not
        auto-renew. When the promotional period ends, your account returns to the free tier unless you
        have an active paid subscription.
      </p>

      <hr />

      <h2>16. In-app privacy controls</h2>
      <p>You have several controls available inside the App:</p>
      <ul>
        <li><strong>Save scan photos toggle</strong> (Settings → Privacy &amp; Data → &quot;Save scan photos&quot;). When on (default), the photos you capture during a scan are saved locally to the App&apos;s storage so you can revisit them. When off, the photos are kept only for the duration of the scan and discarded immediately after the scan response is received. <strong>This toggle controls on-device storage only — it does not change the 24-hour server-side photo retention described in Section 6, which applies regardless.</strong></li>
        <li><strong>Delete a single scan</strong> (Scan history → swipe a scan → Delete). Removes the scan from your on-device history.</li>
        <li><strong>Delete your account</strong> (Settings → Account → Delete account). Removes your authentication record, your server-side profile, any cached tips on your profile, and any scan photo still inside the 24-hour server retention window. Pseudonymised audit records are retained as described in Section 6 (&quot;After account deletion: what we keep&quot;).</li>
        <li><strong>Revoke biometric consent</strong> — happens automatically when you delete your account; see Section 5.</li>
        <li><strong>Revoke Apple Health access</strong> — iOS Settings → Privacy &amp; Security → Health → Lumii.</li>
        <li><strong>Revoke location access</strong> — iOS Settings → Privacy &amp; Security → Location Services → Lumii.</li>
        <li><strong>Revoke notification permissions</strong> — iOS Settings → Notifications → Lumii.</li>
      </ul>

      <hr />

      <h2>17. Notice at collection (California residents)</h2>
      <p>
        This section is provided to meet the requirement in{" "}
        <strong>California Civil Code §1798.100(a)</strong>. It is a summary of disclosures already made
        elsewhere in this policy.
      </p>
      <div className="legal-table">
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Purpose</th>
              <th>Retention</th>
              <th>Sold or shared?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Identifiers (name, email, Lumii user ID, anonymous Apple subscriber ID)</td>
              <td>Account creation, authentication, subscription verification</td>
              <td>Until account deletion</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Internet activity (IP address, user agent, app interaction logs)</td>
              <td>Server-side rate limiting, debugging, security</td>
              <td>30 days for server logs; 90 days for Sentry</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Biometric information (facial landmarks and metrics) — <strong>sensitive personal information</strong></td>
              <td>Scan analysis and personalised tips</td>
              <td>Until account deletion</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Visual information (face photos uploaded for scan)</td>
              <td>Computer-vision analysis</td>
              <td><strong>Deleted within 24 hours of upload</strong></td>
              <td>No</td>
            </tr>
            <tr>
              <td>Geolocation data (precise) — <strong>sensitive personal information</strong></td>
              <td>Geofence-based goal verification (on-device only)</td>
              <td>On device only; not stored on our servers</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Health and fitness data (Apple Health reads) — <strong>sensitive personal information</strong></td>
              <td>Goal verification (on-device only)</td>
              <td>On device only; <strong>never transmitted to our servers</strong></td>
              <td>No</td>
            </tr>
            <tr>
              <td>Commercial information (subscription status, redeemed codes)</td>
              <td>Apply Lumii Pro entitlement and promotional grants</td>
              <td>Until account deletion</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Audio, electronic, visual, thermal, olfactory, or similar information (Sentry session replay)</td>
              <td>App reliability and debugging</td>
              <td>90 days</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Inferences drawn from the above (scan scores, grade labels)</td>
              <td>Personalised tips and routine</td>
              <td>Until account deletion</td>
              <td>No</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        For the full disclosures, rights, and how to exercise the right to{" "}
        <strong>limit use and disclosure of sensitive personal information</strong>, see Section 10.2.
      </p>

      <hr />

      <h2>18. EU representative under GDPR Article 27</h2>
      <p>
        Lumii&apos;s user base at launch is primarily in the United Kingdom and the United States.{" "}
        <strong>We have not yet appointed a representative in the European Union under GDPR Article
        27.</strong> As we expand to material EU user volumes, we will appoint and disclose an EU
        representative.
      </p>
      <p>In the meantime, EU users can:</p>
      <ul>
        <li>exercise all GDPR rights via the contact methods in Section 14;</li>
        <li>contact their local data-protection authority directly; and</li>
        <li>complain to their local supervisory authority if dissatisfied with our response.</li>
      </ul>
      <p>
        The UK Information Commissioner&apos;s Office (ICO) acts as our lead supervisory authority
        because HFJO&amp;CO LIMITED is established in the United Kingdom.
      </p>

      <hr />

      <h2>19. Glossary</h2>
      <p>A short list of terms used in this Privacy Policy that have specific legal meanings.</p>
      <ul>
        <li><strong>Personal data</strong> (UK / EU GDPR) and <strong>personal information</strong> (CCPA) — information relating to an identified or identifiable individual. Includes obvious items like name and email, less obvious items like IP address, and inferences drawn from those items.</li>
        <li><strong>Processing</strong> — anything done with personal data: collecting, storing, using, sharing, deleting. If we touch the data, we &quot;process&quot; it.</li>
        <li><strong>Biometric data</strong> (UK / EU GDPR Article 9) — personal data resulting from specific technical processing relating to the physical, physiological, or behavioural characteristics of a natural person, which allow or confirm the unique identification of that person. The facial landmarks and metrics we derive from a scan fall under this definition.</li>
        <li><strong>Sensitive personal information</strong> (CPRA §1798.140(ae)) — a sub-set of personal information including biometric data used for identification, precise geolocation, and health information. Triggers additional disclosure and the right described in Section 10.2.</li>
        <li><strong>Subprocessor</strong> — a third party (like RevenueCat or Sentry) that processes your personal data on our behalf, under our instructions and a written contract.</li>
        <li><strong>Standard Contractual Clauses (SCCs)</strong> — model contract terms approved by the European Commission and the UK ICO that authorise transfers of personal data outside the UK / EEA.</li>
        <li><strong>UK International Data Transfer Addendum</strong> — the UK-specific addition to the EU SCCs that makes them effective for UK-originating personal data.</li>
        <li><strong>Data Privacy Framework (DPF)</strong> — the EU-US and UK-US arrangements under which US companies can self-certify to receive personal data from the EU / UK. We use it for Google and Vercel; we use SCCs for Anthropic, RevenueCat, Railway, Apple, and Expo.</li>
        <li><strong>Session replay</strong> — a recording of the visible content of the App during a user session, used for debugging. Sentry&apos;s mobile session replay automatically masks input fields like passwords. See Section 3.2.</li>
        <li><strong>Promotional entitlement</strong> — a free grant of Lumii Pro access (via RevenueCat) that does not involve an Apple In-App Purchase or any payment by you. See Section 15.5.</li>
      </ul>
    </LegalLayout>
  );
}
