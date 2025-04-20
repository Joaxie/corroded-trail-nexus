
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface ConnectionPathProps {
  startNodeId: string;
  endNodeId: string;
  isActive: boolean;
}

export function ConnectionPath({
  startNodeId,
  endNodeId,
  isActive,
}: ConnectionPathProps) {
  const pathRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [pathDetails, setPathDetails] = useState({
    width: 0,
    left: 0,
    top: 0,
    angle: 0,
  });

  useEffect(() => {
    // Skip processing for inactive connections
    if (!isActive) return;
    
    const updatePath = () => {
      if (!pathRef.current) return;

      const startNode = document.querySelector(`[data-node-id="${startNodeId}"]`);
      const endNode = document.querySelector(`[data-node-id="${endNodeId}"]`);

      if (startNode && endNode) {
        const startRect = startNode.getBoundingClientRect();
        const endRect = endNode.getBoundingClientRect();

        const startX = startRect.left + startRect.width / 2;
        const startY = startRect.top + startRect.height / 2;
        const endX = endRect.left + endRect.width / 2;
        const endY = endRect.top + endRect.height / 2;

        // Calculate the distance and angle
        const dx = endX - startX;
        const dy = endY - startY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        // Update state for the path
        setPathDetails({
          width: distance,
          left: startX,
          top: startY,
          angle: angle,
        });
          
        // Check visibility
        const isStartVisible = startRect.top < window.innerHeight && 
                              startRect.bottom > 0 && 
                              startRect.left < window.innerWidth && 
                              startRect.right > 0;
        
        const isEndVisible = endRect.top < window.innerHeight && 
                            endRect.bottom > 0 && 
                            endRect.left < window.innerWidth && 
                            endRect.right > 0;
        
        setIsVisible(isStartVisible && isEndVisible);
      }
    };

    // Initial update
    updatePath();

    // Update on window resize
    window.addEventListener("resize", updatePath);
    
    // Update periodically but at a reduced rate to improve performance
    const interval = setInterval(updatePath, 300);

    return () => {
      window.removeEventListener("resize", updatePath);
      clearInterval(interval);
    };
  }, [startNodeId, endNodeId, isActive]);

  if (!isActive || !isVisible) return null;

  return (
    <motion.div
      ref={pathRef}
      className="absolute pointer-events-none"
      style={{
        width: `${pathDetails.width}px`,
        left: `${pathDetails.left}px`,
        top: `${pathDetails.top}px`,
        transform: `rotate(${pathDetails.angle}deg)`,
        transformOrigin: "0 0",
      }}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
      }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="h-[1px] w-full" 
        style={{
          background: "linear-gradient(90deg, rgba(0,255,0,0) 0%, rgba(0,255,0,0.6) 50%, rgba(0,255,0,0) 100%)",
          boxShadow: "0 0 8px rgba(0, 255, 0, 0.5)"
        }}
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </motion.div>
  );
}
