// app/JsonLd.tsx
// Structured data: makes the site eligible for Google rich results and
// understandable to AI search (ChatGPT/Perplexity/Google AI Overviews).
// Mount <JsonLd /> once inside <body> in app/layout.tsx.
//
// IMPORTANT: keep the FAQ entries below in sync with the real /faq page text,
// and do NOT add an aggregateRating block until you have genuine App Store
// reviews to cite (fake review schema risks a manual penalty).
//
// FAQ entries below are copied verbatim from app/faq/page.tsx so the schema
// matches on-page text (a Google requirement for FAQ rich results).

export default function JsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Lumii",
      url: "https://www.lumiiapp.com",
      logo: "https://www.lumiiapp.com/icon.png", // 512×512 PNG at /public/icon.png
      sameAs: [
        "https://apps.apple.com/us/app/lumii-skincare-glow-up/id6769432089",
        // add real Instagram / TikTok / X profile URLs here (strong entity signal)
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "MobileApplication",
      name: "Lumii — Skincare Glow Up",
      operatingSystem: "iOS",
      applicationCategory: "LifestyleApplication",
      url: "https://www.lumiiapp.com",
      downloadUrl:
        "https://apps.apple.com/us/app/lumii-skincare-glow-up/id6769432089",
      description:
        "AI face analysis app that maps 584 facial landmarks across 75+ metrics and builds a personalized skincare and beauty glow-up plan from a single photo.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      // aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "120" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Lumii?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Lumii is an AI-powered beauty advisor that analyses your face to give you a personalised Glow Score and skincare routine. Upload a photo, and our engine maps 584 facial landmarks and scores 75+ metrics — texture, tone, symmetry, hydration, and more — to build a routine designed specifically for your skin.",
          },
        },
        {
          "@type": "Question",
          name: "Does Lumii store my photos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Your face photos are uploaded to our server only to be analysed, then automatically deleted within 24 hours of upload. We never sell them, share them with advertisers, or use them to train any third-party AI model.",
          },
        },
        {
          "@type": "Question",
          name: "How accurate is the AI analysis?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our model has been validated against expert dermatologist assessments with 89% concordance across key skin metrics. Accuracy improves with photo quality — clear lighting and no filters give the best results.",
          },
        },
      ],
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
