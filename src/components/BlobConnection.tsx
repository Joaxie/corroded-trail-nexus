
import { BlobNodeData } from "@/data/nodes";

interface BlobConnectionProps {
  from: BlobNodeData;
  to: BlobNodeData;
  blink?: boolean;
  normalize?: boolean;
}

// Simple blink/fade line between node centers using absolute/inline SVG.
// Minimal math to position and animate.
export function BlobConnection({ from, to, blink, normalize }: BlobConnectionProps) {
  // Depth collapse after click
  const z1 = normalize ? 0 : from.z;
  const z2 = normalize ? 0 : to.z;

  // Node size (pixels) - match BlobNode
  const getSize = (z: number) => (normalize ? 120 : 120 - z * 12);

  // Compute center points
  const sx = from.x, sy = from.y, sz = z1;
  const tx = to.x, ty = to.y, tz = z2;

  // Convert percent pos + size to px center
  // All relative to parent (full viewport)
  const px1 = `calc(${sx}% - ${(getSize(z1) / 2)}px + ${(getSize(z1) / 2)}px)`;
  const py1 = `calc(${sy}% - ${(getSize(z1) / 2)}px + ${(getSize(z1) / 2)}px)`;
  const px2 = `calc(${tx}% - ${(getSize(z2) / 2)}px + ${(getSize(z2) / 2)}px)`;
  const py2 = `calc(${ty}% - ${(getSize(z2) / 2)}px + ${(getSize(z2) / 2)}px)`;

  // Fake Z for visual depth (lines under nodes)
  const zidx = 100 + Math.min(sz, tz);

  return (
    <svg
      className="pointer-events-none absolute"
      style={{
        left: 0, top: 0, width: "100%", height: "100%", zIndex: zidx,
        mixBlendMode: "lighten",
      }}
      aria-hidden
    >
      <line
        x1={`calc(${sx}% )`} y1={`calc(${sy}% )`}
        x2={`calc(${tx}% )`} y2={`calc(${ty}% )`}
        stroke="#00FF00"
        strokeWidth="4"
        opacity="0.7"
        className={blink ? "connection-blink" : ""}
        style={{
          filter: "drop-shadow(0 0 8px #00FF00)",
          strokeDasharray: 30,
          strokeDashoffset: 0,
          transition: "stroke-dashoffset 1s",
        }}
      />
    </svg>
  );
}
