
import { useState } from "react";
import { motion } from "framer-motion";
import { ParasiteNode as ParasiteNodeType, parasiteNodes } from "@/data/parasiteData";
import { ParasiteNode } from "./ParasiteNode";
import { NodeConnection } from "./NodeConnection";
import { NodeModal } from "./NodeModal";

interface ParasiteNetworkProps {
  onInteraction: () => void;
}

export function ParasiteNetwork({ onInteraction }: ParasiteNetworkProps) {
  const [selectedNode, setSelectedNode] = useState<ParasiteNodeType | null>(null);

  const handleNodeClick = (node: ParasiteNodeType) => {
    setSelectedNode(node);
    onInteraction();
  };

  const handleCloseModal = () => {
    setSelectedNode(null);
  };

  // Create all unique connections (to avoid duplicates)
  const connections = parasiteNodes.flatMap(node => 
    node.connections.map(targetId => {
      const target = parasiteNodes.find(n => n.id === targetId);
      if (!target) return null;
      
      // Sort IDs to ensure unique connections (prevent A->B and B->A duplicates)
      const ids = [node.id, targetId].sort();
      return { id: `${ids[0]}-${ids[1]}`, source: node, target };
    })
  ).filter((conn): conn is NonNullable<typeof conn> => conn !== null);

  // Deduplicate connections
  const uniqueConnections = connections.filter((conn, index, self) => 
    self.findIndex(c => c.id === conn.id) === index
  );

  return (
    <div className="w-full h-full relative">
      {/* Render all connections first (lines will be underneath the nodes) */}
      {uniqueConnections.map(connection => (
        <NodeConnection 
          key={connection.id}
          sourceNode={connection.source}
          targetNode={connection.target}
        />
      ))}
      
      {/* Render all parasite nodes */}
      {parasiteNodes.map(node => (
        <ParasiteNode
          key={node.id}
          node={node}
          onClick={() => handleNodeClick(node)}
        />
      ))}
      
      {/* Modal for selected node */}
      {selectedNode && (
        <NodeModal 
          node={selectedNode} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}
