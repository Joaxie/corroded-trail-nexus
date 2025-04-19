import { useEffect, useState, useRef } from "react";
import { FloatingNode } from "./FloatingNode";
import { ConnectionPath } from "./ConnectionPath";
import { motion } from "framer-motion";

interface NodePosition {
  id: string;
  x: number;
  y: number;
  z: number;
  depth: number;
}

export function ParasiteNetwork() {
  const [nodes, setNodes] = useState<NodePosition[]>([]);
  const [visitedNodes, setVisitedNodes] = useState<Set<string>>(new Set());
  const [connections, setConnections] = useState<{start: string, end: string, isActive: boolean}[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse movement for subtle parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
  };

  // Generate nodes with better spatial distribution
  useEffect(() => {
    const generateNodes = () => {
      const newNodes: NodePosition[] = [];
      const nodeCount = 24; // Increased number of nodes
      const usedPositions: {x: number, y: number}[] = [];
      
      // Distribute nodes in 3D space, ensuring no overlap
      for (let i = 0; i < nodeCount; i++) {
        let x: number, y: number, isOverlapping: boolean;
        const minDistance = 15; // Minimum distance between nodes (percentage of container)
        
        // Keep generating positions until we find one that doesn't overlap
        do {
          isOverlapping = false;
          x = 15 + Math.random() * 70; // Keep nodes within 15-85% of the container
          y = 15 + Math.random() * 70;
          
          // Check for overlap with existing nodes
          for (const pos of usedPositions) {
            const distance = Math.sqrt(Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2));
            if (distance < minDistance) {
              isOverlapping = true;
              break;
            }
          }
        } while (isOverlapping);
        
        usedPositions.push({ x, y });
        
        // Calculate z position for depth effect
        // Distribute z values from -800 to -100 for depth perception
        const z = -100 - Math.random() * 700;
        
        newNodes.push({
          id: `node-${i}`,
          x,
          y,
          z,
          depth: i, // Each node gets a unique depth value
        });
      }
      
      setNodes(newNodes);
    };

    generateNodes();
  }, []);

  // Generate connections between nodes
  useEffect(() => {
    if (nodes.length === 0) return;
    
    // Create more organic connections between nodes
    const newConnections: {start: string, end: string, isActive: boolean}[] = [];
    
    // Connect each node to 2-3 closest neighbors
    nodes.forEach((node) => {
      // Calculate distances to all other nodes
      const distances = nodes
        .filter(n => n.id !== node.id)
        .map(n => ({
          id: n.id,
          distance: Math.sqrt(
            Math.pow(n.x - node.x, 2) + 
            Math.pow(n.y - node.y, 2) +
            Math.pow(n.z - node.z, 2) / 10 // Scale z distance
          )
        }))
        .sort((a, b) => a.distance - b.distance);
      
      // Connect to 2-3 closest nodes
      const connectCount = 2 + Math.floor(Math.random() * 2);
      
      for (let i = 0; i < Math.min(connectCount, distances.length); i++) {
        // Check if this connection already exists
        const alreadyExists = newConnections.some(
          conn => (conn.start === node.id && conn.end === distances[i].id) || 
                 (conn.start === distances[i].id && conn.end === node.id)
        );
        
        if (!alreadyExists) {
          newConnections.push({
            start: node.id,
            end: distances[i].id,
            isActive: visitedNodes.has(node.id) && visitedNodes.has(distances[i].id)
          });
        }
      }
    });
    
    setConnections(newConnections);
  }, [nodes, visitedNodes]);

  const handleNodeNavigate = (nodeId: string) => {
    setVisitedNodes(prev => new Set([...prev, nodeId]));
    
    // Update connections
    setConnections(prev => 
      prev.map(conn => ({
        ...conn,
        isActive: (conn.start === nodeId || conn.end === nodeId) ? true : conn.isActive
      }))
    );
  };

  return (
    <motion.div 
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden"
      style={{ 
        perspective: '1200px',
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      animate={{
        backgroundPosition: `${mousePosition.x * 10}px ${mousePosition.y * 10}px`
      }}
      transition={{ type: "spring", damping: 50 }}
    >
      {nodes.map((node) => (
        <FloatingNode
          key={node.id}
          id={node.id}
          x={node.x - mousePosition.x * 2} // Subtle parallax effect
          y={node.y - mousePosition.y * 2}
          z={node.z}
          depth={node.depth}
          isVisited={visitedNodes.has(node.id)}
          onNavigate={handleNodeNavigate}
        />
      ))}
      
      {connections.map((connection, index) => (
        <ConnectionPath
          key={`${connection.start}-${connection.end}-${index}`}
          startNodeId={connection.start}
          endNodeId={connection.end}
          isActive={connection.isActive}
        />
      ))}
    </motion.div>
  );
}
