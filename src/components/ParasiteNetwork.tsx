
import { useEffect, useState } from "react";
import { FloatingNode } from "./FloatingNode";
import { ConnectionPath } from "./ConnectionPath";
import { motion } from "framer-motion";

interface NodePosition {
  id: string;
  x: number;
  y: number;
  depth: number;
}

export function ParasiteNetwork() {
  const [nodes, setNodes] = useState<NodePosition[]>([]);
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [visitedNodes, setVisitedNodes] = useState<Set<string>>(new Set(["node-0"]));
  const [perspective, setPerspective] = useState(1000);

  useEffect(() => {
    // Generate 15 random positions for nodes with increasing depth
    const generateNodes = () => {
      const newNodes: NodePosition[] = [];
      
      for (let i = 0; i < 15; i++) {
        newNodes.push({
          id: `node-${i}`,
          x: 20 + Math.random() * 60, // Keep nodes within 20-80% of the container
          y: 20 + Math.random() * 60,
          depth: i, // Each subsequent node is deeper in space
        });
      }
      
      setNodes(newNodes);
    };

    generateNodes();
  }, []);

  const handleNavigateNext = () => {
    if (currentNodeIndex < nodes.length - 1) {
      const nextIndex = currentNodeIndex + 1;
      setCurrentNodeIndex(nextIndex);
      setVisitedNodes(prev => new Set([...prev, `node-${nextIndex}`]));
      setPerspective(prev => prev + 200); // Increase perspective to simulate going deeper
    }
  };

  // Create connections between nodes (connect each node to its nearest neighbor)
  const connections = nodes.map((node, index) => {
    if (index === nodes.length - 1) return null;
    
    return {
      start: node.id,
      end: nodes[(index + 1) % nodes.length].id,
      isActive: visitedNodes.has(node.id) && visitedNodes.has(nodes[(index + 1) % nodes.length].id),
    };
  }).filter(Boolean);

  return (
    <motion.div 
      className="relative w-full h-screen bg-black overflow-hidden"
      style={{ 
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d'
      }}
    >
      {nodes.map((node, index) => (
        <FloatingNode
          key={node.id}
          id={node.id}
          x={node.x}
          y={node.y}
          depth={node.depth}
          isActive={index === currentNodeIndex}
          isVisited={visitedNodes.has(node.id)}
          onNavigateNext={handleNavigateNext}
        />
      ))}
      
      {connections.map((connection) => (
        connection && (
          <ConnectionPath
            key={`${connection.start}-${connection.end}`}
            startNodeId={connection.start}
            endNodeId={connection.end}
            isActive={connection.isActive}
          />
        )
      ))}
    </motion.div>
  );
}
