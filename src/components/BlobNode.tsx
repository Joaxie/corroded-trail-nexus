
import { useEffect, useRef } from "react";
import { BlobNodeData } from "@/data/nodes";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface BlobNodeProps {
  node: BlobNodeData;
  selected: boolean;
  normalize: boolean;
  onClick: () => void;
  onClose: () => void;
}

export function BlobNode({
  node,
  selected,
  normalize,
  onClick,
  onClose,
}: BlobNodeProps) {
  // Node glow and size: bigger/closer if z = 0, all become normal after click
  const depth = normalize ? 0 : node.z * 1.2;
  const size = normalize ? 120 : 120 - node.z * 12;

  // Floating offset for a sense of depth movement
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!nodeRef.current) return;
    // Subtle floating animation via motion
    const el = nodeRef.current;
    el.animate(
      [
        { transform: `translateY(0px) rotate(-2deg)` },
        { transform: `translateY(-8px) rotate(3deg)` },
        { transform: `translateY(0px) rotate(-2deg)` },
      ],
      { duration: 5100 + node.z * 700, iterations: Infinity }
    );
  }, [node.z]);

  return (
    <>
      <div
        data-node-id={node.id}
        ref={nodeRef}
        tabIndex={0}
        onClick={onClick}
        className={`absolute cursor-pointer group select-none outline-none focus:outline-none hover:ring-2 ring-[#00FF00] transition-all ${
          selected
            ? "border-4 border-[#00FF00] shadow-[0_0_30px_#00FF00] z-[1001]"
            : "z-[1000] border-2"
        }`}
        style={{
          left: `calc(${node.x}% - ${size / 2}px)`,
          top: `calc(${node.y}% - ${size / 2}px)`,
          width: size,
          height: size,
          borderColor: "#00FF00",
          boxShadow:
            selected || !normalize
              ? "0 0 16px #00FF00, 0 0 64px #00FF0011"
              : "0 0 6px #00FF0088, 0 0 30px #00FF0011",
          background: "transparent",
          borderRadius: "6px",
          outline: selected ? "#00FF00 solid 3px" : "",
          transition: "box-shadow 0.5s, border 0.4s, left 0.6s, top 0.6s, width 0.5s, height 0.5s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={node.img}
          className="w-[85%] h-[85%] object-contain opacity-90 pointer-events-none mix-blend-lighten"
          draggable={false}
          aria-hidden
          alt={node.title}
          style={{
            filter: "drop-shadow(0 0 10px #00FF0055)",
            borderRadius: 4,
          }}
        />
        {/* Animated green glow overlay */}
        <div className="absolute inset-0 pointer-events-none animate-blink-glow rounded" />
      </div>
      <Dialog open={selected} onOpenChange={onClose}>
        <DialogContent className="bg-black border border-[#00FF00] neon-box max-w-md animate-fade-in p-0" style={{overflow: "visible", background: "#050505"}}>
          <div className="flex flex-col items-center p-3">
            <img
              src={node.img}
              className="w-28 h-28 object-contain mb-0 drop-shadow-lg"
              style={{borderRadius: 8}}
              alt={node.title}
            />
            <div className="mt-6 bg-[#00FF00] bg-opacity-10 border border-[#00FF00] rounded-full px-3 py-1 text-[#00FF00] font-mono text-xs flex gap-1 shadow-neon-pulse mb-2">
              {node.type === "parasite" && node.parasiteMeta
                ? (
                  <>
                  <span className="font-bold">{node.parasiteMeta.name}</span> | <span>{node.parasiteMeta.source}</span>
                  </>
                )
                : (
                  <span>{node.title}</span>
                )
              }
            </div>
            <div className="text-sm text-white/90 font-mono px-2 text-center mb-2">{node.info}</div>
            {node.type === "parasite" && node.parasiteMeta && (
              <>
                <div className="w-full text-left px-2 font-mono">
                  <div className="mb-1 text-[#00FF00] font-bold text-xs">How it enters: <span className="font-normal text-white/90">{node.parasiteMeta.entry}</span></div>
                  <div className="mb-1 text-[#00FF00] font-bold text-xs">Health risks: <span className="font-normal text-white/90">{node.parasiteMeta.risks}</span></div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
