import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#13172B",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "6px",
        }}
      >
        <span
          style={{
            color: "#07CFFE",
            fontSize: "9px",
            fontWeight: 700,
            fontFamily: "monospace",
            letterSpacing: "-0.5px",
            lineHeight: 1,
          }}
        >
          {"<DC/>"}
        </span>
      </div>
    ),
    { ...size }
  );
}
