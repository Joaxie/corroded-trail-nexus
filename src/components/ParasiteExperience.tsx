
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ParasiteNode } from "./ParasiteNode";
import { ConnectionPath } from "./ConnectionPath";
import { MapOverview } from "./MapOverview";
import { ThemeToggle } from "./ThemeToggle";
import { Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { parasiteData, nodeConnections } from "@/data/parasiteData";

export function ParasiteExperience() {
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [activeNodeIds, setActiveNodeIds] = useState<string[]>([parasiteData[0].id]);
  const [showMap, setShowMap] = useState(false);
  const [perspective, setPerspective] = useState(1000);

  // Function to navigate to the next node
  const navigateNext = () => {
    if (currentNodeIndex < parasiteData.length - 1) {
      const nextIndex = currentNodeIndex + 1;
      setCurrentNodeIndex(nextIndex);
      setActiveNodeIds(prev => [...prev, parasiteData[nextIndex].id]);
      
      // Increase perspective to simulate going deeper
      setPerspective(prev => prev + 200);
    }
  };

  // Function to determine if a node is currently active (clickable)
  const isNodeActive = (nodeId: string) => {
    if (nodeId === parasiteData[currentNodeIndex].id) {
      return true;
    }
    return false;
  };

  // Function to determine if a connection is active
  const isConnectionActive = (startId: string, endId: string) => {
    return activeNodeIds.includes(startId) && activeNodeIds.includes(endId);
  };

  // Empty click handler for nodes that aren't meant to navigate
  const handleEmptyClick = () => {
    // This is a placeholder function to satisfy the onClick prop requirement
  };

  return (
    <div 
      className="parasite-container"
      style={{ perspective: `${perspective}px` }}
    >
      <ThemeToggle />
      
      <Button
        variant="outline"
        className="fixed top-4 left-4 z-50 bg-transparent border-[#00FF00] text-[#00FF00] hover:bg-[#00FF00] hover:bg-opacity-20 flex items-center gap-2"
        onClick={() => setShowMap(true)}
      >
        <Map className="h-4 w-4" />
        <span>View Map</span>
      </Button>

      {/* Title */}
      <motion.h1 
        className="fixed top-8 left-0 right-0 text-center neon-text text-4xl font-mono uppercase tracking-wider"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        RASTRO CORROSIVO
      </motion.h1>

      <motion.div 
        className="relative w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Render all nodes */}
        <AnimatePresence>
          {parasiteData.map((node, index) => {
            // Only show nodes that we've navigated to
            if (!activeNodeIds.includes(node.id)) {
              return null;
            }

            return (
              <ParasiteNode
                key={node.id}
                node={node} // Add the required node prop
                onClick={handleEmptyClick} // Add the required onClick prop
                id={node.id}
                title={node.title}
                description={node.description}
                image={node.image}
                x={node.x}
                y={node.y}
                zIndex={parasiteData.length - index}
                onNavigateNext={navigateNext}
                isActive={isNodeActive(node.id)}
              />
            );
          })}
        </AnimatePresence>

        {/* Render connections */}
        {nodeConnections.map((connection) => (
          <ConnectionPath
            key={`${connection.start}-${connection.end}`}
            startNodeId={connection.start}
            endNodeId={connection.end}
            isActive={isConnectionActive(connection.start, connection.end)}
          />
        ))}
      </motion.div>

      {/* Map overview */}
      <MapOverview
        isOpen={showMap}
        onClose={() => setShowMap(false)}
        currentNodeId={parasiteData[currentNodeIndex].id}
      />
    </div>
  );
}
