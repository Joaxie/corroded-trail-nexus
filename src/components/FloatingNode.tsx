
import { Plus } from "lucide-react";

interface FloatingNodeProps {
  x: number;
  y: number;
  id: string;
}

export function FloatingNode({ x, y, id }: FloatingNodeProps) {
  return (
    <div
      data-node-id={id}
      className="absolute border border-[#00FF00] w-[120px] h-[120px] flex items-center justify-center"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Plus className="text-[#00FF00]" size={24} />
    </div>
  );
}
