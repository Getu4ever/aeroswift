import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AeroSwift — Cheap flights from the UK";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(145deg, #0B1F33 0%, #16324A 55%, #0D9488 140%)",
          color: "white",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 600, letterSpacing: -1 }}>
          Aero<span style={{ color: "#E8C547" }}>Swift</span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 36,
            fontFamily: "sans-serif",
            fontWeight: 500,
            maxWidth: 900,
            lineHeight: 1.3,
            opacity: 0.92,
          }}
        >
          Cheap flights from the UK — compared in seconds
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 22,
            fontFamily: "sans-serif",
            opacity: 0.65,
          }}
        >
          aeroswift.co.uk · Prices in £
        </div>
      </div>
    ),
    { ...size },
  );
}
