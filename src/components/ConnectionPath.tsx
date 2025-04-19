
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

  useEffect(() => {
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

        // Set the line's properties
        if (pathRef.current) {
          pathRef.current.style.width = `${distance}px`;
          pathRef.current.style.left = `${startX}px`;
          pathRef.current.style.top = `${startY}px`;
          pathRef.current.style.transform = `rotate(${angle}deg)`;
          pathRef.current.style.transformOrigin = "0 0";
          
          // Make connection visible if both nodes are in viewport
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
      }
    };

    // Initial update
    updatePath();

    // Update on window resize
    window.addEventListener("resize", updatePath);
    
    // Update periodically in case of dynamic layouts
    const interval = setInterval(updatePath, 100);

    return () => {
      window.removeEventListener("resize", updatePath);
      clearInterval(interval);
    };
  }, [startNodeId, endNodeId]);

  if (!isActive || !isVisible) return null;

  return (
    <motion.div
      ref={pathRef}
      className="absolute pointer-events-none"
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
