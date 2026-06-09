// app/robots.ts  → Next.js serves this automatically at /robots.txt
// (Currently /robots.txt returns 404.)
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.lumiiapp.com/sitemap.xml",
    host: "https://www.lumiiapp.com",
  };
}
