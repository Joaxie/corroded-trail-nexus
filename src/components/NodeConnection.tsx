
import { ParasiteNode as ParasiteNodeType } from "@/data/parasiteData";

interface NodeConnectionProps {
  sourceNode: ParasiteNodeType;
  targetNode: ParasiteNodeType;
}

export function NodeConnection({ sourceNode, targetNode }: NodeConnectionProps) {
  return (
    <svg 
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 10 }}
    >
      <line
        x1={`${sourceNode.x}%`}
        y1={`${sourceNode.y}%`}
        x2={`${targetNode.x}%`}
        y2={`${targetNode.y}%`}
        stroke="#00FF00"
        strokeWidth="1.5"
      />
    </svg>
  );
}
