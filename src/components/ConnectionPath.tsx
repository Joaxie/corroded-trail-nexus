
import { useEffect, useRef } from "react";
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
        pathRef.current.style.width = `${distance}px`;
        pathRef.current.style.left = `${startX}px`;
        pathRef.current.style.top = `${startY}px`;
        pathRef.current.style.transform = `rotate(${angle}deg)`;
        pathRef.current.style.transformOrigin = "0 0";
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

  if (!isActive) return null;

  return (
    <motion.div
      ref={pathRef}
      className="active-path"
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    />
  );
}
