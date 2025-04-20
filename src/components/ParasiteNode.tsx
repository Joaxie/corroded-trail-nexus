
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface ParasiteNodeProps {
  id: string;
  title: string;
  description: string;
  image: string;
  x: number;
  y: number;
  zIndex: number;
  onNavigateNext: () => void;
  isActive: boolean;
}

export function ParasiteNode({
  id,
  title,
  description,
  image,
  x,
  y,
  zIndex,
  onNavigateNext,
  isActive,
}: ParasiteNodeProps) {
  const [showInfo, setShowInfo] = useState(false);
  
  const handleClick = () => {
    if (!showInfo) {
      setShowInfo(true);
    } else {
      setShowInfo(false);
      onNavigateNext();
    }
  };

  return (
    <>
      <motion.div
        className={`neon-box node-hover absolute ${isActive ? 'animate-pulse-neon' : ''}`}
        style={{
          left: `${x}%`,
          top: `${y}%`,
          width: '180px',
          height: '180px',
          zIndex: zIndex,
          position: 'absolute',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        data-node-id={id}
      >
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover opacity-80" />
        </div>
        {isActive && (
          <div className="plus-sign" onClick={handleClick}>+</div>
        )}
      </motion.div>

      <Dialog open={showInfo} onOpenChange={setShowInfo}>
        <DialogContent className="bg-black border border-[#00FF00] max-w-md neon-box animate-pulse-neon">
          <DialogHeader>
            <DialogTitle className="neon-text text-xl font-mono">{title}</DialogTitle>
          </DialogHeader>
          <div className="text-white font-mono text-sm my-4">
            {description}
          </div>
          <div className="flex justify-end">
            <button 
              onClick={onNavigateNext} 
              className="neon-text border border-[#00FF00] px-4 py-2 rounded hover:bg-[#00FF00] hover:bg-opacity-20 font-mono"
            >
              Continue Journey →
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
