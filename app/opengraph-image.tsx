import { ImageResponse } from "next/og";

import { SITE } from "@/shared/config/site";

export const alt = `${SITE.name} — ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated at request time, so the card always matches the site copy. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(900px 500px at 15% 0%, #0d2f24 0%, #06090a 60%)",
          color: "#e9efee",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: "#10b981", fontSize: 44, fontWeight: 700 }}>
            .
          </span>
          <span style={{ fontSize: 34, fontWeight: 700 }}>Hrytsenko</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <span style={{ fontSize: 92, fontWeight: 800, lineHeight: 1 }}>
            Front-end
          </span>
          <span
            style={{
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 1,
              fontStyle: "italic",
              color: "#10b981",
            }}
          >
            developer
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#8c9a97",
          }}
        >
          <span>{SITE.name}</span>
          <span>React · Next.js · TypeScript</span>
        </div>
      </div>
    ),
    size
  );
}
