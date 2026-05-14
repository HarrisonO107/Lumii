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
      effectiveDate="13 May 2026"
      lastUpdated="13 May 2026"
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
            contactable at the address and emails below.
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
        <li><strong>Your face photos</strong> are uploaded to our server only to be analysed. They are <strong>automatically deleted within 24 hours</strong> of upload. We never sell them, share them with advertisers or use them to train third-party models.</li>
        <li><strong>Your scan results</strong> (scores, grades, tips) are kept so you can see your history. Most of this is stored <strong>on your device</strong>, not on our servers.</li>
        <li><strong>Your account</strong> (name, email, password) is stored by our authentication provider, Supabase, so you can sign back in.</li>
        <li>We use <strong>Anthropic&apos;s Claude API</strong> to generate personalised tips and to power the in-app cat-mascot chat. Your scores and questions are sent to Anthropic to do this. Anthropic does not train its models on this data.</li>
        <li>We do <strong>not</strong> show ads, track you across other apps or sell your personal data.</li>
        <li>You can <strong>delete your account and all associated data</strong> from inside the App at any time. We act on the request immediately and finish deleting any backups within 30 days.</li>
      </ul>
      <p>If you want the full detail, the rest of this document spells it out.</p>

      <hr />

      <h2>2. Who this policy applies to</h2>
      <p>
        Lumii is intended for users <strong>aged 13 and over</strong>. Users under 18 must have the
        consent of a parent or legal guardian to use the App.
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
        <li><strong>Account details:</strong> your name, email address and password when you create an account. Your password is handled by our authentication provider and we never see it in plain text.</li>
        <li><strong>Profile details:</strong> an optional profile photo (avatar) you choose to upload.</li>
        <li><strong>Onboarding answers:</strong> your age, your beauty goals, your skin concerns and, if you choose to use cycle tracking, your menstrual-cycle dates and phase.</li>
        <li><strong>Photos you submit:</strong> the multi-angle face photos captured during a scan (or photos you pick from your library to analyse).</li>
        <li><strong>Content you create:</strong> goals you set, daily check-ins, journal entries, free-form questions you send to the in-app cat-mascot chat.</li>
        <li><strong>Communications:</strong> any emails or messages you send us.</li>
      </ul>

      <h3>3.2 Information we collect automatically</h3>
      <ul>
        <li><strong>Device information:</strong> device model, operating system version and basic app configuration (collected through standard Expo/React Native SDKs to make the App work and to debug crashes).</li>
        <li><strong>Diagnostic information:</strong> crash reports and error logs. If we have enabled our error-reporting integration (Sentry) in a given build, these reports are sent to Sentry; otherwise they stay on your device.</li>
        <li><strong>Usage information:</strong> in-app events such as which screens you visit, when you complete a scan, and how often you open the app. These events are stored on your device for personalisation; we do not currently send them to any third-party analytics provider.</li>
      </ul>

      <h3>3.3 Information generated about you</h3>
      <p>When you complete a scan we run computer-vision analysis on the photos and generate:</p>
      <ul>
        <li><strong>Facial landmarks:</strong> up to 584 numerical points describing the geometry of your face (positions of eyes, nose, lips, jawline, etc.).</li>
        <li><strong>Facial metrics:</strong> approximately 75 measurements derived from those landmarks (proportions, symmetry, skin metrics).</li>
        <li><strong>A &quot;glow score&quot; and grade label</strong> (e.g. &quot;Luminous&quot;), plus written tips and a personalised routine generated by an AI model.</li>
      </ul>
      <p>
        We treat the facial landmarks and metrics as <strong>biometric data</strong>. See Section 5 for
        how we handle this category of data and what legal basis we rely on.
      </p>

      <h3>3.4 Information we do not collect</h3>
      <ul>
        <li>We do not collect your precise location.</li>
        <li>We do not access your contacts, microphone, calendar or SMS.</li>
        <li>We do not collect advertising identifiers.</li>
        <li>We do not use behavioural tracking cookies (the App is native; there are no cookies inside it).</li>
        <li>We do not collect payment information today (the App is free at launch). If we add paid features in future we will use the App Store / Google Play billing systems and update this policy.</li>
      </ul>

      <hr />

      <h2>4. How we use your information</h2>
      <div className="legal-table">
        <table>
          <thead>
            <tr>
              <th>Purpose</th>
              <th>What we use</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Provide the core scan and analysis feature</td>
              <td>Face photos, facial landmarks, facial metrics</td>
            </tr>
            <tr>
              <td>Generate personalised tips and the cat-mascot chat</td>
              <td>Scores, top strengths, weak areas, your chat messages</td>
            </tr>
            <tr>
              <td>Sign you in and keep your session secure</td>
              <td>Email, password (hashed), authentication tokens</td>
            </tr>
            <tr>
              <td>Save and show you your scan history, goals and progress</td>
              <td>Scan results, goal completions, check-ins</td>
            </tr>
            <tr>
              <td>Personalise content using your onboarding answers</td>
              <td>Age, goals, concerns, cycle data (if entered)</td>
            </tr>
            <tr>
              <td>Send transactional emails (sign-up confirmation, password reset)</td>
              <td>Email address</td>
            </tr>
            <tr>
              <td>Send local reminder notifications you have opted into</td>
              <td>Notification preferences stored on your device</td>
            </tr>
            <tr>
              <td>Debug crashes and improve reliability</td>
              <td>Diagnostic and device information</td>
            </tr>
            <tr>
              <td>Comply with legal obligations and enforce our Terms</td>
              <td>Any of the above where strictly necessary</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        We do <strong>not</strong> use your personal data for behavioural advertising, profiling that
        produces legal effects, automated decision-making with significant effects on you, or training
        third-party AI models.
      </p>

      <hr />

      <h2>5. Biometric data and our legal basis</h2>
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
        For everyday (non-special-category) data we rely on the following legal bases under UK/EU GDPR
        Article 6:
      </p>
      <ul>
        <li><strong>Performance of a contract</strong> (Art. 6(1)(b)) — to deliver the Service you signed up for.</li>
        <li><strong>Consent</strong> (Art. 6(1)(a)) — for optional features like cycle tracking and notifications.</li>
        <li><strong>Legitimate interests</strong> (Art. 6(1)(f)) — to keep the App secure, debug crashes and prevent abuse, balanced against your interests and freedoms.</li>
        <li><strong>Legal obligation</strong> (Art. 6(1)(c)) — where the law requires us to retain or disclose data.</li>
      </ul>

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
              <td>Automatically deleted within 24 hours of upload</td>
            </tr>
            <tr>
              <td>Scan results, scores and tips</td>
              <td>Until you delete the scan or your account</td>
            </tr>
            <tr>
              <td>Profile (name, email, avatar)</td>
              <td>Until you delete your account</td>
            </tr>
            <tr>
              <td>On-device data (scan history, goals, cycle log, streaks)</td>
              <td>Until you uninstall the App or clear its data</td>
            </tr>
            <tr>
              <td>Authentication tokens</td>
              <td>While you remain signed in; you can sign out at any time</td>
            </tr>
            <tr>
              <td>Crash and diagnostic logs</td>
              <td>Up to 90 days, then deleted</td>
            </tr>
            <tr>
              <td>Email correspondence with us</td>
              <td>Up to 24 months unless we need it longer to resolve a complaint</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        When you request account deletion in-app, we begin removing your data immediately. Any residual
        copies in encrypted backups are overwritten on our backup-rotation schedule and fully gone within{" "}
        <strong>30 days</strong>.
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
              <td><strong>Lumii scoring backend (operated by HFJO&amp;CO LIMITED)</strong></td>
              <td>Computer-vision analysis of your scan photos to generate facial landmarks, metrics and your glow score</td>
              <td>Hosted in the United Kingdom on Railway (railway.app)</td>
              <td>This Privacy Policy applies</td>
            </tr>
            <tr>
              <td><strong>Supabase Inc.</strong></td>
              <td>Authentication and database for your account and profile</td>
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
              <td><strong>Google LLC — YouTube Data API</strong></td>
              <td>Returning tutorial-video search results inside the App</td>
              <td>United States</td>
              <td>policies.google.com/privacy</td>
            </tr>
            <tr>
              <td><strong>Google LLC — ML Kit Face Detection</strong></td>
              <td>On-device face tracking during the scan flow (no network calls; runs locally on your device)</td>
              <td>On-device only</td>
              <td>policies.google.com/privacy</td>
            </tr>
            <tr>
              <td><strong>Sentry (Functional Software, Inc.)</strong></td>
              <td>Crash and error reporting (only active in builds we have configured with a Sentry key)</td>
              <td>United States / European Union</td>
              <td>sentry.io/privacy</td>
            </tr>
            <tr>
              <td><strong>Apple, Inc.</strong></td>
              <td>App distribution, sign-in (when enabled), push delivery via APNs</td>
              <td>Worldwide</td>
              <td>apple.com/legal/privacy</td>
            </tr>
            <tr>
              <td><strong>Google Play (Google LLC)</strong></td>
              <td>App distribution on Android</td>
              <td>Worldwide</td>
              <td>policies.google.com/privacy</td>
            </tr>
            <tr>
              <td><strong>Expo / EAS</strong></td>
              <td>Build and over-the-air update infrastructure</td>
              <td>United States</td>
              <td>expo.dev/privacy</td>
            </tr>
            <tr>
              <td><strong>Vercel, Inc.</strong></td>
              <td>Hosting our marketing website (no in-app data flows here)</td>
              <td>United States / European Union</td>
              <td>vercel.com/legal/privacy-policy</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>We may also disclose your information:</p>
      <ul>
        <li>to comply with a legal obligation, court order or lawful request from a government authority;</li>
        <li>to enforce our Terms of Service or to investigate potential breaches;</li>
        <li>to protect the rights, property or safety of Lumii, our users or the public; and</li>
        <li>as part of a corporate transaction (merger, acquisition or sale of assets), in which case any acquirer will be bound by this Privacy Policy or a successor with at least the same protections.</li>
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
        Lumii is based in the United Kingdom. Some of our service providers (notably Anthropic, Google
        and Vercel) are based in the United States.
      </p>
      <p>
        When we transfer personal data outside the UK or the European Economic Area, we rely on one of
        the following safeguards:
      </p>
      <ul>
        <li>the UK International Data Transfer Agreement, or the UK Addendum to the EU Standard Contractual Clauses, between us and the recipient;</li>
        <li>the EU Standard Contractual Clauses; or</li>
        <li>an adequacy decision recognising the destination country&apos;s data-protection regime.</li>
      </ul>
      <p>You can request a copy of these safeguards by emailing the contact address at the top of this policy.</p>

      <hr />

      <h2>9. Security</h2>
      <p>We take reasonable technical and organisational measures to protect your personal data, including:</p>
      <ul>
        <li>HTTPS / TLS for all network traffic between the App, our backend and our providers.</li>
        <li>Storage of authentication tokens in iOS Keychain and Android Keystore (via the operating-system secure storage).</li>
        <li>Server-side rate limiting and API-key gating on scan endpoints.</li>
        <li>Validation of uploaded files (size and format) before processing.</li>
        <li>Automatic deletion of scan photos within 24 hours of upload.</li>
        <li>Access controls so that only authorised people on the Lumii team can reach production systems.</li>
      </ul>
      <p>
        No internet-based service can be made absolutely secure. If a personal-data breach occurs that is
        likely to result in a risk to your rights and freedoms, we will notify the UK Information
        Commissioner&apos;s Office within 72 hours of becoming aware of it, and we will contact affected
        users without undue delay where the law requires.
      </p>

      <hr />

      <h2>10. Your rights</h2>
      <p>
        Depending on where you live, you have some or all of the following rights. To exercise any of
        them, email the contact address at the top of this policy. We will respond within one month
        (UK/EU) or 45 days (California) and free of charge, except where the law permits us to charge a
        reasonable fee.
      </p>

      <h3>10.1 Rights under UK GDPR and EU GDPR</h3>
      <ul>
        <li><strong>Access</strong> — ask for a copy of the personal data we hold about you.</li>
        <li><strong>Rectification</strong> — ask us to correct inaccurate or incomplete data.</li>
        <li><strong>Erasure</strong> (&quot;right to be forgotten&quot;) — ask us to delete your data. You can also do this yourself instantly from the in-app <strong>Account → Delete account</strong> option.</li>
        <li><strong>Restriction</strong> — ask us to pause our use of your data while a query is resolved.</li>
        <li><strong>Portability</strong> — ask for your data in a structured, machine-readable format.</li>
        <li><strong>Objection</strong> — object to processing based on our legitimate interests.</li>
        <li><strong>Withdraw consent</strong> — for anything we process on the basis of your consent (including biometric data and cycle tracking).</li>
        <li><strong>Complain to a supervisory authority</strong> — the UK ICO (<code>ico.org.uk</code>) or your local EU data-protection authority.</li>
      </ul>

      <h3>10.2 Rights under California law (CCPA, as amended by CPRA)</h3>
      <p>If you are a California resident:</p>
      <ul>
        <li>You have the right to <strong>know</strong> what categories of personal information we collect, the sources, the purposes for collection, and the categories of third parties we share it with. Sections 3, 4 and 7 of this policy describe these in full.</li>
        <li>You have the right to <strong>access</strong> the specific pieces of personal information we hold about you.</li>
        <li>You have the right to <strong>delete</strong> your personal information, subject to certain legal exceptions.</li>
        <li>You have the right to <strong>correct</strong> inaccurate personal information.</li>
        <li>You have the right to <strong>limit the use and disclosure of sensitive personal information</strong> (including biometric data).</li>
        <li>You have the right to <strong>opt out of the sale or sharing</strong> of your personal information. <strong>Lumii does not sell or share personal information</strong> within the meaning of the CCPA/CPRA.</li>
        <li>You have the right not to receive <strong>discriminatory treatment</strong> for exercising any of these rights.</li>
      </ul>
      <p>
        To make a request, email the contact address above. We may ask you to verify your identity
        before fulfilling the request. You may authorise an agent to act on your behalf in line with
        California law.
      </p>

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

      <hr />

      <h2>11. Children&apos;s privacy</h2>
      <p>
        Lumii is for users aged <strong>13 and over</strong>. Users under 18 must have a parent or
        guardian&apos;s consent to use the App.
      </p>
      <p>
        We do not knowingly collect personal information from children under 13. If you are a parent or
        guardian and believe your child under 13 has signed up to Lumii, please email us at the address
        at the top of this policy and we will delete the account and any associated data.
      </p>
      <p>
        If you are a user aged 13–17, you can ask us to delete the content you have posted at any time by
        using the in-app deletion options or by emailing us.
      </p>

      <hr />

      <h2>12. Notifications</h2>
      <p>
        Lumii can send you local push notifications (for example, daily skin reminders or cycle
        reminders). These notifications are scheduled by the App on your device and{" "}
        <strong>do not</strong> involve us sending a push token to a remote server. You can disable
        notifications at any time in your device&apos;s settings or in the App&apos;s{" "}
        <strong>Notification preferences</strong> screen.
      </p>

      <hr />

      <h2>13. Changes to this policy</h2>
      <p>We may update this Privacy Policy from time to time. When we make material changes we will:</p>
      <ul>
        <li>update the &quot;Last Updated&quot; date at the top, and</li>
        <li>notify you through the App or by email of the change.</li>
      </ul>
      <p>Your continued use of Lumii after the new policy takes effect means you accept the updated policy.</p>

      <hr />

      <h2>14. Contact</h2>
      <p>If you have questions or want to exercise any of your rights:</p>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:office@hfjo.co.uk">office@hfjo.co.uk</a></li>
        <li><strong>Postal address:</strong> HFJO&amp;CO LIMITED, 167–169 Great Portland Street, 5th Floor, London W1W 5PF, United Kingdom</li>
        <li><strong>Data controller:</strong> HFJO&amp;CO LIMITED, registered in England &amp; Wales under company number 15421741</li>
      </ul>
      <p>If you are not satisfied with our response, you can complain to:</p>
      <ul>
        <li>the UK Information Commissioner&apos;s Office at <strong>ico.org.uk</strong> (0303 123 1113), or</li>
        <li>your local EU data-protection authority, or</li>
        <li>(for California residents) the California Attorney General&apos;s office.</li>
      </ul>
    </LegalLayout>
  );
}
