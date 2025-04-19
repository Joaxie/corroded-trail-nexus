
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FloatingNodeProps {
  x: number;
  y: number;
  id: string;
}

export function FloatingNode({ x, y, id }: FloatingNodeProps) {
  const [showInfo, setShowInfo] = useState(false);

  const getNodeInfo = (nodeId: string) => {
    // Placeholder text based on node ID
    return {
      title: `Node ${nodeId}`,
      description: `This is information about node ${nodeId}. Each node represents a different stage in the parasite's journey through the water system.`,
    };
  };

  const nodeInfo = getNodeInfo(id);

  return (
    <>
      <div
        data-node-id={id}
        className="absolute border border-[#00FF00] w-[120px] h-[120px] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          transform: 'translate(-50%, -50%)',
        }}
        onClick={() => setShowInfo(true)}
      >
        <Plus className="text-[#00FF00]" size={24} />
      </div>

      <Dialog open={showInfo} onOpenChange={setShowInfo}>
        <DialogContent className="bg-black/95 border border-[#00FF00] text-[#00FF00]">
          <DialogHeader>
            <DialogTitle className="text-[#00FF00]">{nodeInfo.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 font-mono text-sm">
            {nodeInfo.description}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
