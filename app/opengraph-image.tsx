import { ImageResponse } from "next/og";

// Generated Open Graph image — navy field, the MX mark (recreated from
// app/icon.svg using the same design tokens), and the site name. No
// photograph: none exists to use honestly, and a stock photo would
// misrepresent the brand.
// See node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/opengraph-image.md

export const alt = "MXPCB — Diseño, fabricación y ensamble de PCB en México";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          background: "#102630",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {/* MX mark, recreated from app/icon.svg */}
          <div
            style={{
              width: 148,
              height: 148,
              borderRadius: 28,
              background: "#1B3A4B",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 64,
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: -2,
              }}
            >
              MX
            </div>
            <div
              style={{
                display: "flex",
                width: 72,
                height: 12,
                borderRadius: 6,
                background: "#F06000",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 108,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: -3,
            }}
          >
            MXPCB
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#F69C61",
            letterSpacing: 0.5,
          }}
        >
          Diseño, fabricación y ensamble de PCB en México
        </div>
      </div>
    ),
    { ...size }
  );
}
