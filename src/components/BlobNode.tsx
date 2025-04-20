
import { useRef } from "react";
import { BlobNodeData } from "@/data/nodes";
import { Dialog, DialogContent } from "@/components/ui/dialog";

/**
 * BlobNode with sharp, flat, green outline.
 * No animation, glow, shadow, or rounded corners.
 * Content translated to Spanish.
 */
export function BlobNode({
  node,
  selected,
  normalize,
  onClick,
  onClose,
}: {
  node: BlobNodeData;
  selected: boolean;
  normalize: boolean;
  onClick: () => void;
  onClose: () => void;
}) {
  // Static square calculation
  const size = normalize ? 120 : 120 - node.z * 12;
  const nodeRef = useRef<HTMLDivElement>(null);

  // Spanish translations for parasiteMeta
  const traducciones = node.parasiteMeta
    ? {
        name: node.parasiteMeta.name,
        source: "Origen: " + node.parasiteMeta.source,
        entry: "Entrada: " + node.parasiteMeta.entry,
        risks: "Riesgos para la salud: " + node.parasiteMeta.risks,
      }
    : null;

  return (
    <>
      <div
        data-node-id={node.id}
        ref={nodeRef}
        tabIndex={0}
        onClick={onClick}
        className={`absolute cursor-pointer group select-none outline-none focus:outline-none border-[1.5px]`} // Thinner border
        style={{
          left: `calc(${node.x}% - ${size / 2}px)`,
          top: `calc(${node.y}% - ${size / 2}px)`,
          width: size,
          height: size,
          border: "1.5px solid #00FF00", // Thinner border
          background: "transparent",
          borderRadius: 0,
          outline: selected ? "#00FF00 solid 1.5px" : "",
          transition: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "none",
          zIndex: selected ? 1001 : 1000,
        }}
      >
        <img
          src={node.img}
          className="w-[85%] h-[85%] object-contain pointer-events-none"
          draggable={false}
          aria-hidden
          alt={node.title}
          style={{
            borderRadius: 0,
            filter: "none",
            boxShadow: "none",
            background: "none",
          }}
        />
      </div>
      <Dialog open={selected} onOpenChange={onClose}>
        <DialogContent className="bg-black border border-[#00FF00] max-w-md p-0"
          style={{
            overflow: "visible",
            background: "#000",
            borderRadius: 0,
            boxShadow: "none",
            animation: "none",
          }}
        >
          <div className="flex flex-col items-center p-3">
            <img
              src={node.img}
              className="w-28 h-28 object-contain mb-0"
              alt={node.title}
              style={{
                borderRadius: 0,
                background: "none",
                boxShadow: "none",
              }}
            />
            <div
              className="mt-6 border border-[#00FF00] rounded-none px-3 py-1 text-[#00FF00] font-mono text-xs flex gap-1 bg-transparent mb-2"
              style={{
                borderRadius: 0,
                background: "none",
                boxShadow: "none",
              }}
            >
              {node.type === "parasite" && traducciones ? (
                <>
                  <span className="font-bold">{traducciones.name}</span>
                </>
              ) : (
                <span>{node.title}</span>
              )}
            </div>
            <div className="text-sm text-white/90 font-mono px-2 text-center mb-2">{node.info}</div>
            {node.type === "parasite" && traducciones && (
              <div className="w-full text-left px-2 font-mono">
                <div className="mb-1 text-[#00FF00] font-bold text-xs">
                  {traducciones.source}
                </div>
                <div className="mb-1 text-[#00FF00] font-bold text-xs">
                  {traducciones.entry}
                </div>
                <div className="mb-1 text-[#00FF00] font-bold text-xs">
                  {traducciones.risks}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
