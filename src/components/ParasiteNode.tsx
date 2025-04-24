
import { ParasiteNode as ParasiteNodeType } from "@/data/parasiteData";

interface ParasiteNodeProps {
  node: ParasiteNodeType;
  onClick: () => void;
  // Add these additional props that are being passed from ParasiteExperience
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  x?: number;
  y?: number;
  zIndex?: number;
  onNavigateNext?: () => void;
  isActive?: boolean;
}

export function ParasiteNode({ 
  node, 
  onClick,
  id,
  title,
  description,
  image,
  x,
  y,
  zIndex,
  onNavigateNext,
  isActive 
}: ParasiteNodeProps) {
  // Use either direct props or node object properties
  const nodeId = id || node.id;
  const nodeX = x !== undefined ? x : node.x;
  const nodeY = y !== undefined ? y : node.y;
  const nodeZ = zIndex !== undefined ? zIndex : (100 - node.z);
  
  // Calculate size based on depth (closer = larger)
  const baseSize = 80; // base size in pixels
  const sizeMultiplier = node.z !== undefined ? 1 - (node.z * 0.15) : 1; // reduce size by depth
  const size = Math.max(40, baseSize * sizeMultiplier); // minimum size of 40px
  
  const handleClick = () => {
    if (onNavigateNext) {
      onNavigateNext();
    }
    if (onClick) {
      onClick();
    }
  };
  
  return (
    <div
      className="absolute cursor-pointer border border-[#00FF00] flex items-center justify-center"
      style={{
        left: `${nodeX}%`,
        top: `${nodeY}%`,
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(-50%, -50%)`,
        zIndex: nodeZ, // Higher z-index for closer nodes
      }}
      onClick={handleClick}
      data-node-id={nodeId}
    >
      <span className="text-[#00FF00] text-2xl">+</span>
    </div>
  );
}
