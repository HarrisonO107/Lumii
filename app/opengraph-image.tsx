// app/opengraph-image.tsx
// Auto-generates the 1200×630 social share card and wires it as BOTH
// og:image and twitter:image site-wide. No design tool needed.
// (Prefer a hand-designed card? Delete this file and drop a 1200×630 JPG at
//  /public/og.jpg, then set openGraph.images / twitter.images to "/og.jpg".)
import { ImageResponse } from "next/og";

export const alt = "Lumii — your face, measured to the micron.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #ffffff 0%, #ffe4ef 100%)",
        }}
      >
        <div style={{ fontSize: 130, fontWeight: 700, color: "#0a0a0a" }}>
          lumii
        </div>
        <div
          style={{
            fontSize: 46,
            color: "#0a0a0a",
            marginTop: 8,
            textAlign: "center",
            maxWidth: 920,
          }}
        >
          Your face, measured to the micron.
        </div>
        <div style={{ fontSize: 28, color: "#9d174d", marginTop: 30 }}>
          584 landmarks · 75+ metrics · one glow-up score
        </div>
      </div>
    ),
    { ...size }
  );
}
