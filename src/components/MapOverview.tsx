
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ParasiteNode } from "./ParasiteNode";
import { ConnectionPath } from "./ConnectionPath";
import { parasiteData, nodeConnections } from "@/data/parasiteData";

interface MapOverviewProps {
  isOpen: boolean;
  onClose: () => void;
  currentNodeId: string;
}

export function MapOverview({
  isOpen,
  onClose,
  currentNodeId,
}: MapOverviewProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleNodeClick = (id: string) => {
    setSelectedNode(id);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={onClose}
        className="absolute top-4 right-4 bg-transparent border-[#00FF00] text-[#00FF00] hover:bg-[#00FF00] hover:bg-opacity-20"
      >
        <X className="h-5 w-5" />
      </Button>

      <div className="w-full h-full relative overflow-hidden">
        <h2 className="neon-text text-center text-2xl mb-8 font-mono">
          Parasite Journey Map
        </h2>

        <div className="w-full h-[calc(100%-3rem)] relative" style={{ transform: "scale(0.8)" }}>
          {/* Render all parasite nodes */}
          {parasiteData.map((node) => (
            <div
              key={node.id}
              className={`absolute cursor-pointer transition-all duration-300`}
              style={{
                left: `${node.mapX}%`,
                top: `${node.mapY}%`,
                transform: `scale(${node.id === currentNodeId ? 1.2 : 0.6})`,
                zIndex: node.id === currentNodeId ? 2 : 1,
                opacity: 0.8,
              }}
              onClick={() => handleNodeClick(node.id)}
            >
              <div 
                className={`neon-box w-20 h-20 flex items-center justify-center
                  ${node.id === currentNodeId ? 'animate-pulse-neon' : ''}`}
              >
                <div className="text-xs font-mono text-center neon-text">
                  {node.title}
                </div>
              </div>
            </div>
          ))}

          {/* Render all connections */}
          {nodeConnections.map((connection, index) => (
            <ConnectionPath
              key={`${connection.start}-${connection.end}`}
              startNodeId={connection.start}
              endNodeId={connection.end}
              isActive={true}
            />
          ))}
        </div>

        {selectedNode && (
          <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-80 border border-[#00FF00] p-4 rounded">
            <h3 className="neon-text text-lg font-mono mb-2">
              {parasiteData.find(node => node.id === selectedNode)?.title}
            </h3>
            <p className="text-white font-mono text-sm">
              {parasiteData.find(node => node.id === selectedNode)?.description}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
