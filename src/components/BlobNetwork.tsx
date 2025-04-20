
import { useState } from "react";
import { blobNodes, BlobNodeData } from "@/data/nodes";
import { BlobNode } from "./BlobNode";
import { BlobConnection } from "./BlobConnection";

export function BlobNetwork() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // When node is clicked, open modal for that node
  const handleNodeClick = (id: string) => setSelectedId(id);

  // For recenter/restart: Deselect node, nodes remain accessible
  const handleRestart = () => setSelectedId(null);

  // For visual depth: after click, nodes normalize in size
  const normalizeDepth = !!selectedId;

  return (
    <div className="w-full h-full relative bg-black overflow-hidden">
      {/* Glowing connections */}
      {blobNodes.map((node) =>
        node.links.map((targetId) => {
          const target = blobNodes.find((n) => n.id === targetId);
          if (!target) return null;
          // Only render each connection once (avoid doubles)
          if (node.id > targetId) return null;
          return (
            <BlobConnection
              key={node.id + "-" + targetId}
              from={node}
              to={target}
              blink
              normalize={normalizeDepth}
            />
          );
        })
      )}
      {/* Nodes */}
      {blobNodes.map((node) => (
        <BlobNode
          key={node.id}
          node={node}
          selected={selectedId === node.id}
          normalize={normalizeDepth}
          onClick={() => handleNodeClick(node.id)}
          onClose={handleRestart}
        />
      ))}
      {/* Restart Button */}
      <button
        className="fixed z-50 top-4 right-4 border border-[#00FF00] text-[#00FF00] neon-text px-4 py-2 rounded font-mono bg-black/40 transition hover:bg-[#00FF00] hover:bg-opacity-20"
        onClick={handleRestart}
      >
        Recenter Field
      </button>
      {/* Label */}
      <div className="fixed left-1/2 top-12 -translate-x-1/2 text-[#00FF00] font-mono text-2xl tracking-widest neon-text pointer-events-none drop-shadow-lg uppercase">
        RASTRO CORROSIVO
      </div>
    </div>
  );
}
