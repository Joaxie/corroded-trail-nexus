
import { BlobNodeData } from "@/data/nodes";

/**
 * Displays a static, solid green line between node centers.
 * No animation, blinking, or shadow.
 */
export function BlobConnection({
  from,
  to,
  blink,
  normalize,
}: {
  from: BlobNodeData;
  to: BlobNodeData;
  blink?: boolean;
  normalize?: boolean;
}) {
  // Node size for proper line positioning
  const getSize = (z: number) => (normalize ? 120 : 120 - z * 12);

  const sx = from.x, sy = from.y, z1 = normalize ? 0 : from.z;
  const tx = to.x, ty = to.y, z2 = normalize ? 0 : to.z;

  // All calculations are percent-based; we render in 100vw x 100vh context.
  return (
    <svg
      className="pointer-events-none absolute"
      style={{
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        zIndex: 100,
        mixBlendMode: "normal", // Clean blend
      }}
      aria-hidden
    >
      <line
        x1={`calc(${sx}% )`}
        y1={`calc(${sy}% )`}
        x2={`calc(${tx}% )`}
        y2={`calc(${ty}% )`}
        stroke="#00FF00"
        strokeWidth="3"
        opacity="0.95"
        // No classes, no animation, no filter
        style={{
          strokeDasharray: "none",
          strokeDashoffset: 0,
          transition: "none",
        }}
      />
    </svg>
  );
}
