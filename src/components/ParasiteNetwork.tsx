
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ParasiteNode } from "./ParasiteNode";
import { ConnectionPath } from "./ConnectionPath";
import { parasiteData, nodeConnections } from "@/data/parasiteData";

export function ParasiteNetwork() {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<Set<string>>(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse movement for subtle parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
  };

  // Reset the experience
  const handleReset = () => {
    setActiveNodeId(null);
    setVisitedNodes(new Set());
  };

  // Navigate to the next node
  const handleNodeNavigate = (nodeId: string) => {
    setActiveNodeId(nodeId);
    setVisitedNodes(prev => {
      const newSet = new Set(prev);
      newSet.add(nodeId);
      return newSet;
    });
  };

  // Check if connections are active based on visited nodes
  const isConnectionActive = (start: string, end: string) => {
    return visitedNodes.has(start) || visitedNodes.has(end);
  };

  return (
    <motion.div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
      style={{
        perspective: '1200px',
      }}
    >
      {/* Rendering all parasite nodes */}
      {parasiteData.map((node, index) => (
        <ParasiteNode
          key={node.id}
          id={node.id}
          title={node.title}
          description={node.description}
          image={node.image}
          x={node.x - mousePosition.x * 5} // Apply subtle parallax effect
          y={node.y - mousePosition.y * 5}
          zIndex={1000 - index}
          onNavigateNext={() => handleNodeNavigate(node.id)}
          isActive={activeNodeId === node.id || activeNodeId === null}
        />
      ))}

      {/* Rendering connections between nodes */}
      {nodeConnections.map((connection, index) => (
        <ConnectionPath
          key={`connection-${index}`}
          startNodeId={connection.start}
          endNodeId={connection.end}
          isActive={isConnectionActive(connection.start, connection.end)}
        />
      ))}

      {/* Reset button */}
      <button 
        onClick={handleReset} 
        className="fixed bottom-5 right-5 z-50 bg-transparent border border-[#00FF00] text-[#00FF00] px-4 py-2 rounded neon-text"
      >
        Reset View
      </button>
    </motion.div>
  );
}
