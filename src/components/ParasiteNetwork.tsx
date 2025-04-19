
import { useEffect, useState } from "react";
import { FloatingNode } from "./FloatingNode";
import { ConnectionPath } from "./ConnectionPath";

interface NodePosition {
  id: string;
  x: number;
  y: number;
}

export function ParasiteNetwork() {
  const [nodes, setNodes] = useState<NodePosition[]>([]);

  useEffect(() => {
    // Generate 15 random positions for nodes
    const generateNodes = () => {
      const newNodes: NodePosition[] = [];
      
      for (let i = 0; i < 15; i++) {
        newNodes.push({
          id: `node-${i}`,
          x: 20 + Math.random() * 60, // Keep nodes within 20-80% of the container
          y: 20 + Math.random() * 60,
        });
      }
      
      setNodes(newNodes);
    };

    generateNodes();
  }, []);

  // Create connections between nodes (connect each node to its nearest neighbor)
  const connections = nodes.map((node, index) => {
    if (index === nodes.length - 1) return null;
    
    return {
      start: node.id,
      end: nodes[(index + 1) % nodes.length].id,
    };
  }).filter(Boolean);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {nodes.map((node) => (
        <FloatingNode
          key={node.id}
          id={node.id}
          x={node.x}
          y={node.y}
        />
      ))}
      
      {connections.map((connection) => (
        connection && (
          <ConnectionPath
            key={`${connection.start}-${connection.end}`}
            startNodeId={connection.start}
            endNodeId={connection.end}
            isActive={true}
          />
        )
      ))}
    </div>
  );
}
