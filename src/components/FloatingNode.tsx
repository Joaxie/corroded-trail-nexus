
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingNodeProps {
  x: number;
  y: number;
  z: number;
  id: string;
  depth: number;
  isVisited: boolean;
  onNavigate: (nodeId: string) => void;
}

export function FloatingNode({ 
  x, 
  y, 
  z,
  id, 
  depth, 
  isVisited,
  onNavigate 
}: FloatingNodeProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getNodeInfo = (nodeId: string) => {
    // Placeholder text based on node ID
    return {
      title: `Node ${nodeId}`,
      description: `This is information about node ${nodeId}. Each node represents a different entity in this digital network. Explore further to discover hidden connections and patterns.`,
    };
  };

  const nodeInfo = getNodeInfo(id);

  const handleClose = () => {
    setShowInfo(false);
  };

  const handleNodeClick = () => {
    setShowInfo(true);
  };

  // Generate unique animation delay based on node ID
  const getAnimationDelay = () => {
    // Convert node ID to a number for seed
    const idNum = parseInt(id.replace('node-', ''));
    return (idNum % 5) * 0.8; // 0 to 4 seconds delay, evenly distributed
  };

  return (
    <>
      <motion.div
        data-node-id={id}
        className={`absolute neon-box node-hover ${isVisited ? 'border-[#00FF00]/40' : 'border-[#00FF00]'}`}
        style={{
          left: `${x}%`,
          top: `${y}%`,
          width: '100px',
          height: '100px',
          zIndex: depth + 1, // Ensure it has a valid z-index
          position: 'absolute', // Make sure it's positioned absolutely
          background: 'transparent',
        }}
        initial={{ 
          opacity: 0, 
          scale: 0.8,
          z: z 
        }}
        animate={{ 
          opacity: 1, 
          scale: isHovered ? 1.05 : 1,
          rotate: [0, 1, 0, -1, 0],
          z: z,
          boxShadow: isHovered 
            ? '0 0 15px rgba(0, 255, 0, 0.7), inset 0 0 10px rgba(0, 255, 0, 0.4)' 
            : '0 0 5px rgba(0, 255, 0, 0.5), inset 0 0 5px rgba(0, 255, 0, 0.2)'
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: getAnimationDelay(),
          rotate: {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        whileHover={{ scale: 1.1 }}
        onClick={handleNodeClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.div 
          className="flex items-center justify-center w-full h-full"
          animate={{ 
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Plus className="text-[#00FF00]" size={24} />
        </motion.div>
      </motion.div>

      <Dialog open={showInfo} onOpenChange={setShowInfo}>
        <DialogContent className="bg-black/95 border border-[#00FF00] text-[#00FF00] max-w-md neon-box">
          <DialogHeader>
            <DialogTitle className="text-[#00FF00] text-xl font-mono">{nodeInfo.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 font-mono text-sm">
            {nodeInfo.description}
          </div>
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={() => {
                handleClose();
                onNavigate(id);
              }}
              className="bg-transparent border border-[#00FF00] text-[#00FF00] hover:bg-[#00FF00] hover:bg-opacity-20 font-mono"
            >
              Explore Node
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
