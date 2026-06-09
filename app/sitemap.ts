// app/sitemap.ts  → Next.js serves this automatically at /sitemap.xml
// (Currently /sitemap.xml returns 404.)
// Only the 8 real, indexable routes are listed. /privacy-policy and
// /terms-of-service are 308 redirects to /legal/* — intentionally omitted.
import type { MetadataRoute } from "next";

const BASE = "https://www.lumiiapp.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  ) => ({ url: `${BASE}${path}`, lastModified: now, changeFrequency, priority });

  return [
    page("/", 1.0, "weekly"),
    page("/how-it-works", 0.9, "monthly"),
    page("/features", 0.9, "monthly"),
    page("/faq", 0.8, "monthly"),
    page("/referrals", 0.5, "monthly"),
    page("/contact", 0.4, "yearly"),
    page("/legal/privacy-policy", 0.3, "yearly"),
    page("/legal/terms-of-service", 0.3, "yearly"),
  ];
}
