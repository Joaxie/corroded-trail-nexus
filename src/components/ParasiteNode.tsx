
import { ParasiteNode as ParasiteNodeType } from "@/data/parasiteData";

interface ParasiteNodeProps {
  node: ParasiteNodeType;
  onClick: () => void;
}

export function ParasiteNode({ node, onClick }: ParasiteNodeProps) {
  // Calculate size based on depth (closer = larger)
  const baseSize = 80; // base size in pixels
  const sizeMultiplier = 1 - (node.z * 0.15); // reduce size by depth
  const size = Math.max(40, baseSize * sizeMultiplier); // minimum size of 40px
  
  return (
    <div
      className="absolute cursor-pointer border border-[#00FF00] flex items-center justify-center"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(-50%, -50%)`,
        zIndex: 100 - node.z, // Higher z-index for closer nodes
      }}
      onClick={onClick}
      data-node-id={node.id}
    >
      <span className="text-[#00FF00] text-2xl">+</span>
    </div>
  );
}
