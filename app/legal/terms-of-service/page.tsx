import type { Metadata } from "next";
import LegalLayout from "../LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service — Lumii",
  description:
    "The terms and conditions that govern your use of the Lumii app and services, operated by HFJO&CO LIMITED.",
};

export default function TermsOfServicePage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title={
        <>
          Terms of <em className="italic" style={{ color: "#F9A8C9" }}>Service.</em>
        </>
      }
      effectiveDate="13 May 2026"
      lastUpdated="13 May 2026"
      intro={
        <p>
          These Terms of Service (&quot;<strong>Terms</strong>&quot;) are a legal agreement
          between you and <strong>HFJO&amp;CO LIMITED</strong> (&quot;<strong>Lumii</strong>&quot;,
          &quot;<strong>we</strong>&quot;, &quot;<strong>us</strong>&quot; or &quot;<strong>our</strong>&quot;),
          a company registered in England &amp; Wales under company number{" "}
          <strong>15421741</strong>, with its registered office at{" "}
          <strong>167–169 Great Portland Street, 5th Floor, London W1W 5PF, United Kingdom</strong>.
          These Terms govern your use of the Lumii mobile application and any related services
          (together, the &quot;<strong>Service</strong>&quot;).
          {" "}By downloading, installing or using the App, you agree to these Terms and to our{" "}
          <a href="/legal/privacy-policy">Privacy Policy</a>. If you do not agree, do not use the App.
        </p>
      }
    >
      <h2>1. Eligibility</h2>
      <ul>
        <li>You must be at least <strong>13 years old</strong> to use Lumii.</li>
        <li>If you are under 18, you must have the consent of a parent or legal guardian, and that parent or guardian agrees to be bound by these Terms on your behalf.</li>
        <li>You confirm that the information you provide when you sign up is accurate and that you are not barred from using the Service under any applicable law.</li>
      </ul>
      <p>We may refuse, suspend or terminate accounts that do not meet these requirements.</p>

      <hr />

      <h2>2. What Lumii does (and what it doesn&apos;t)</h2>
      <p>Lumii is a self-improvement app that uses computer vision and AI to:</p>
      <ul>
        <li>analyse multi-angle photos of your face that you submit;</li>
        <li>give you a &quot;glow score&quot;, proportion and symmetry metrics, and a personalised routine; and</li>
        <li>track your progress over time, with optional goals, cycle logging and reminders.</li>
      </ul>
      <p>
        <strong>Lumii is for entertainment, self-care and personal-development purposes only.</strong>{" "}
        It is <strong>not</strong>:
      </p>
      <ul>
        <li>medical, dermatological, cosmetic-surgery, psychological or any other professional advice;</li>
        <li>a diagnostic tool of any kind;</li>
        <li>a substitute for consultation with a qualified healthcare or beauty professional.</li>
      </ul>
      <p>
        If you have a medical or mental-health concern, speak to a qualified professional. If you are in
        crisis, call your local emergency services or a crisis line (in the UK, Samaritans on 116 123).
      </p>

      <hr />

      <h2>3. Your account</h2>
      <p>To use most of Lumii&apos;s features you need to create an account. You agree:</p>
      <ul>
        <li>to give us accurate, current information when you sign up;</li>
        <li>to keep your password confidential and not to share your account with anyone;</li>
        <li>that you are responsible for all activity on your account; and</li>
        <li>to tell us straight away if you think someone has accessed your account without permission.</li>
      </ul>
      <p>
        You can delete your account at any time from the in-app{" "}
        <strong>Account → Delete account</strong> option. Deletion removes your profile and any data
        linked to your account from our systems; see the Privacy Policy for full retention details.
      </p>

      <hr />

      <h2>4. Your photos and content</h2>

      <h3>4.1 You own your content</h3>
      <p>
        You keep all rights in the photos you submit and the content you create in the App
        (&quot;<strong>User Content</strong>&quot;). We do <strong>not</strong> claim ownership of any of it.
      </p>

      <h3>4.2 Licence to us</h3>
      <p>
        To run the App, we need a limited licence to handle your User Content. By using Lumii you grant us a{" "}
        <strong>worldwide, non-exclusive, royalty-free licence</strong> to host, store, copy, transmit,
        display and process your User Content solely to operate, provide and improve the Service for you.
        This licence ends when you delete the content or your account.
      </p>
      <p>
        We do <strong>not</strong> use your photos to train third-party AI models. We do not sell your
        photos. We do not use your photos for advertising. We do not share your photos with anyone except
        the service providers listed in our Privacy Policy, and only where necessary to deliver the Service
        to you. Your actual photos are processed only by our own scoring backend. Other AI services we use
        (such as Anthropic&apos;s Claude API) receive only your scores and summary information, never the
        photos themselves.
      </p>

      <h3>4.3 Your warranties</h3>
      <p>You warrant that:</p>
      <ul>
        <li>the content you upload is of yourself, or you have the explicit consent of the person shown to upload and analyse it;</li>
        <li>you have all rights necessary to grant the licence in section 4.2;</li>
        <li>your content does not infringe anyone else&apos;s rights and is not illegal, abusive, defamatory, sexually explicit involving minors, or otherwise prohibited by section 5.</li>
      </ul>

      <hr />

      <h2>5. Acceptable use</h2>
      <p>You agree <strong>not</strong> to:</p>
      <ul>
        <li>upload photos of anyone other than yourself without their explicit, informed consent;</li>
        <li>upload nudity, sexually explicit content, content depicting minors in any inappropriate way, or any content that violates the law where you live or where we operate;</li>
        <li>use the App to harass, bully, dox, threaten, defame or discriminate against any person;</li>
        <li>impersonate another person or misrepresent your identity, age or affiliation;</li>
        <li>reverse-engineer, decompile, disassemble or attempt to derive the source code of the App, except to the limited extent the law allows you to do so;</li>
        <li>use bots, scrapers, automated agents or AI tools to access the Service in ways that are not part of the normal user interface;</li>
        <li>circumvent any security, rate-limit, authentication or access-control feature of the App;</li>
        <li>probe, scan or test the vulnerability of our systems without our prior written consent;</li>
        <li>use the Service in any way that could damage, disable, overburden or impair it; or</li>
        <li>use the Service for any unlawful purpose or in breach of these Terms.</li>
      </ul>
      <p>We may suspend or terminate your access if we reasonably believe you have breached these rules.</p>

      <hr />

      <h2>6. AI, analysis and body-image disclaimer</h2>
      <p>
        The scores, grades, proportion analyses and tips Lumii produces are generated by computer-vision
        algorithms and AI language models. They are inherently:
      </p>
      <ul>
        <li><strong>probabilistic and approximate</strong> — results vary with lighting, photo quality, angle, expression and other factors;</li>
        <li><strong>not measurements of objective worth, beauty, health or attractiveness</strong> — they are pattern outputs based on a model we have trained;</li>
        <li><strong>not personalised medical or psychological advice</strong> — see section 2.</li>
      </ul>
      <p>We have designed Lumii to feel supportive and to nudge healthy self-care behaviours. We strongly recommend you:</p>
      <ul>
        <li>treat the scores as a fun, motivational tool rather than a verdict;</li>
        <li>stop using the App if it is harming your mental health or self-image;</li>
        <li>talk to a qualified professional if your relationship with your appearance becomes distressing.</li>
      </ul>
      <p>
        You agree that you will not make significant cosmetic, medical, surgical or mental-health decisions
        based solely on Lumii&apos;s outputs.
      </p>

      <hr />

      <h2>7. Subscriptions and payments</h2>
      <p>The App is free at launch. If we introduce paid features in future:</p>
      <ul>
        <li>payments will be processed by the relevant app store (Apple App Store or Google Play), under their billing terms;</li>
        <li>subscription prices, billing periods and free-trial terms will be shown clearly before you subscribe;</li>
        <li>you can manage and cancel subscriptions through your app-store account settings;</li>
        <li>refunds are governed by the app store&apos;s refund policy, not by us, except where applicable law requires otherwise.</li>
      </ul>
      <p>
        When we add paid features we will update these Terms; your continued use after that update will
        mean you accept the new terms.
      </p>

      <hr />

      <h2>8. Intellectual property</h2>
      <p>
        Lumii, the App, the cat mascot (&quot;Momo&quot;), the design, the scoring system, the underlying
        code, all text, graphics, logos and audio, and any improvements to any of the above, are owned by
        HFJO&amp;CO LIMITED (or our licensors) and are protected by copyright, trademark and other
        intellectual-property laws.
      </p>
      <p>
        We grant you a{" "}
        <strong>personal, revocable, non-transferable, non-exclusive licence</strong> to use the App for
        your own personal, non-commercial use, in accordance with these Terms. Nothing else is granted.
      </p>
      <p>
        You may not reproduce, distribute, publicly display, create derivative works of or commercially
        exploit any part of the App without our prior written consent.
      </p>

      <hr />

      <h2>9. Third-party services</h2>
      <p>
        The App relies on third-party services (listed in our Privacy Policy) to operate. Your use of those
        services through Lumii is also subject to their own terms. We are not responsible for the acts,
        omissions or content of third parties, and we make no warranties about their services.
      </p>
      <p>
        The App may include links to third-party websites or videos (for example, YouTube tutorials).
        Following those links is at your own risk.
      </p>

      <hr />

      <h2>10. Disclaimers</h2>
      <p>
        To the maximum extent permitted by law, the Service is provided{" "}
        <strong>&quot;as is&quot; and &quot;as available&quot;</strong>, without warranties of any kind,
        express or implied. We do not warrant that:
      </p>
      <ul>
        <li>the Service will be uninterrupted, timely, secure or error-free;</li>
        <li>the scores, tips or analyses will be accurate, complete or suitable for any particular purpose;</li>
        <li>any defects will be corrected; or</li>
        <li>the Service will meet your expectations.</li>
      </ul>
      <p>
        Nothing in this section limits any rights you have under the UK Consumer Rights Act 2015 or any
        other mandatory consumer-protection laws that apply to you.
      </p>

      <hr />

      <h2>11. Limitation of liability</h2>
      <p>To the maximum extent permitted by law:</p>
      <ul>
        <li>We are not liable for any indirect, incidental, special, consequential, punitive or exemplary loss or damage; lost profits; lost revenues; lost data; lost goodwill; or business interruption, arising out of or in connection with your use of the Service.</li>
        <li>Our total aggregate liability to you for all claims arising out of or relating to the Service in any 12-month period is limited to the greater of (a) the amount you have paid us for the Service in that period or (b) £50.</li>
      </ul>
      <p>Nothing in these Terms excludes or limits our liability for:</p>
      <ul>
        <li>death or personal injury caused by our negligence;</li>
        <li>fraud or fraudulent misrepresentation; or</li>
        <li>any other liability that cannot be excluded or limited under applicable law.</li>
      </ul>
      <p>
        If you are a consumer based in the UK or EU, these limits apply only to the extent permitted by
        your local consumer-protection laws, and your statutory rights are unaffected.
      </p>

      <hr />

      <h2>12. Indemnity</h2>
      <p>
        To the maximum extent permitted by law, you agree to indemnify and hold harmless Lumii, its owners,
        employees, contractors and agents from and against any claim, liability, loss or expense (including
        reasonable legal fees) arising out of:
      </p>
      <ul>
        <li>your breach of these Terms;</li>
        <li>your User Content; or</li>
        <li>your violation of any law or of any third party&apos;s rights.</li>
      </ul>
      <p>
        This section does not apply to claims that arise from our own breach of these Terms, our
        negligence or our wilful misconduct, and it applies only to the extent permitted by your local
        consumer-protection laws.
      </p>

      <hr />

      <h2>13. Suspension and termination</h2>
      <p>We may suspend or terminate your access to the Service at any time, with or without notice, if:</p>
      <ul>
        <li>you breach these Terms or our Privacy Policy;</li>
        <li>we reasonably believe your use of the Service may cause legal or reputational harm to Lumii or to other users; or</li>
        <li>we discontinue all or part of the Service.</li>
      </ul>
      <p>
        You may terminate these Terms at any time by deleting your account and uninstalling the App.
        Sections that by their nature should survive termination (including ownership, disclaimers,
        liability, indemnity and governing law) will survive.
      </p>

      <hr />

      <h2>14. Changes to the Service</h2>
      <p>
        We may add, change, suspend or remove features of the Service at any time. We will give you
        reasonable notice if a change is material and adverse to you, except where we have to make the
        change immediately for legal or security reasons.
      </p>

      <hr />

      <h2>15. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. When we make a material change we will update the
        &quot;Last Updated&quot; date and notify you through the App or by email of the change. Your
        continued use of the Service after the new Terms take effect means you accept the new Terms. If
        you do not agree, you must stop using the Service and delete your account.
      </p>

      <hr />

      <h2>16. Governing law and disputes</h2>
      <p>
        These Terms and any non-contractual obligations arising out of them are governed by the{" "}
        <strong>laws of England and Wales</strong>.
      </p>
      <p>
        You and we agree that the courts of England and Wales will have{" "}
        <strong>exclusive jurisdiction</strong> to settle any dispute arising under these Terms, except
        that:
      </p>
      <ul>
        <li>if you are a consumer resident in another part of the UK (Scotland or Northern Ireland), you may bring proceedings in the courts of that part; and</li>
        <li>if you are a consumer resident in the EU, you can bring proceedings in your country of residence and you may benefit from mandatory consumer-protection provisions of your local law.</li>
      </ul>
      <p>
        If you are a consumer in the EU, you can also use the European Commission&apos;s online
        dispute-resolution platform at <code>ec.europa.eu/consumers/odr</code>.
      </p>

      <hr />

      <h2>17. App-store specific terms</h2>

      <h3>17.1 Apple App Store</h3>
      <p>
        If you downloaded Lumii from the Apple App Store, the following also applies, and you acknowledge
        that:
      </p>
      <ul>
        <li>these Terms are between you and Lumii, not Apple, and Apple is not responsible for the App or its content;</li>
        <li>the licence granted to you is limited to a non-transferable licence to use the App on any Apple-branded products that you own or control, as permitted by the App Store&apos;s Usage Rules;</li>
        <li>Apple has no obligation to provide maintenance or support for the App;</li>
        <li>if the App fails to conform to any applicable warranty, you may notify Apple, and Apple will refund the purchase price (if any). To the maximum extent permitted by law, Apple has no other warranty obligation in respect of the App;</li>
        <li>Apple is not responsible for addressing any claims by you or any third party relating to the App, including product-liability, legal-compliance or intellectual-property claims;</li>
        <li>Apple and Apple&apos;s subsidiaries are third-party beneficiaries of these Terms and may enforce them against you.</li>
      </ul>

      <h3>17.2 Google Play</h3>
      <p>
        If you downloaded Lumii from Google Play, your use is additionally subject to the Google Play
        Terms of Service. Google is not a party to these Terms and is not responsible for the App.
      </p>

      <hr />

      <h2>18. Miscellaneous</h2>
      <ul>
        <li><strong>Entire agreement.</strong> These Terms and our Privacy Policy are the entire agreement between you and us about the Service.</li>
        <li><strong>No waiver.</strong> If we don&apos;t enforce a right or term, that is not a waiver of it.</li>
        <li><strong>Severability.</strong> If any part of these Terms is found unenforceable, the rest stays in effect.</li>
        <li><strong>Assignment.</strong> You may not assign these Terms. We may assign them to any successor in connection with a corporate transaction.</li>
        <li><strong>Notices.</strong> We may send you notices through the App or by email to the address on your account. You can reach us at the address below.</li>
      </ul>

      <hr />

      <h2>19. Contact</h2>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:office@hfjo.co.uk">office@hfjo.co.uk</a></li>
        <li><strong>Postal address:</strong> HFJO&amp;CO LIMITED, 167–169 Great Portland Street, 5th Floor, London W1W 5PF, United Kingdom</li>
        <li><strong>Operator:</strong> HFJO&amp;CO LIMITED, registered in England &amp; Wales under company number 15421741</li>
      </ul>
    </LegalLayout>
  );
}
