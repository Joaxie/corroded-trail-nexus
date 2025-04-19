
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface FloatingNodeProps {
  x: number;
  y: number;
  id: string;
  depth: number;
  isActive: boolean;
  isVisited: boolean;
  onNavigateNext: () => void;
}

export function FloatingNode({ 
  x, 
  y, 
  id, 
  depth, 
  isActive,
  isVisited,
  onNavigateNext 
}: FloatingNodeProps) {
  const [showInfo, setShowInfo] = useState(false);

  const getNodeInfo = (nodeId: string) => {
    // Placeholder text based on node ID
    return {
      title: `Node ${nodeId}`,
      description: `This is information about node ${nodeId}. Each node represents a different stage in the parasite's journey through the water system.`,
    };
  };

  const nodeInfo = getNodeInfo(id);

  const handleNext = () => {
    setShowInfo(false);
    onNavigateNext();
  };

  return (
    <>
      <motion.div
        data-node-id={id}
        className={`absolute border ${isVisited ? 'border-[#00FF00]/50' : 'border-[#00FF00]'} w-[120px] h-[120px] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform`}
        style={{
          left: `${x}%`,
          top: `${y}%`,
          transform: 'translate(-50%, -50%)',
          zIndex: depth,
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          z: depth * -100 // Move nodes back in 3D space
        }}
        transition={{ duration: 0.5 }}
        onClick={() => isActive && setShowInfo(true)}
      >
        {isActive && <Plus className="text-[#00FF00] animate-pulse" size={24} />}
      </motion.div>

      <Dialog open={showInfo} onOpenChange={setShowInfo}>
        <DialogContent className="bg-black/95 border border-[#00FF00] text-[#00FF00]">
          <DialogHeader>
            <DialogTitle className="text-[#00FF00]">{nodeInfo.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 font-mono text-sm">
            {nodeInfo.description}
          </div>
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={handleNext}
              className="bg-transparent border border-[#00FF00] text-[#00FF00] hover:bg-[#00FF00] hover:bg-opacity-20"
            >
              Continue Journey →
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
