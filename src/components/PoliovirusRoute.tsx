
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Placeholder for Poliovirus, use provided placeholder or your own uploads
const placeholderImg = "/lovable-uploads/photo-1518770660439-4636190af475.png"; // generic placeholder, adjust as needed

// Node definitions in Spanish, 19 nodes, IDs should match connection graph
const NODES = [
  {
    id: "poliovirus",
    label: "Poliovirus",
    desc: "El poliovirus es un virus altamente infeccioso que invade el tracto gastrointestinal humano.",
    img: placeholderImg,
    x: 46, y: 11,
  },
  {
    id: "tracto-intestinal",
    label: "Tracto intestinal humano",
    desc: "El virus se multiplica en el intestino y puede salir del cuerpo con las heces.",
    img: placeholderImg,
    x: 70, y: 21,
  },
  {
    id: "heces-infectadas",
    label: "Heces infectadas",
    desc: "Las heces de personas infectadas contienen gran cantidad de poliovirus.",
    img: placeholderImg,
    x: 79, y: 40,
  },
  {
    id: "drenaje",
    label: "Sistema de drenaje",
    desc: "Las heces pueden ingresar al drenaje sanitario o pluvial de la ciudad.",
    img: placeholderImg,
    x: 71, y: 54,
  },
  {
    id: "agua-residual-sin-tratamiento",
    label: "Agua residual sin tratamiento",
    desc: "El agua residual sin tratar transporta el poliovirus fuera del sistema urbano.",
    img: placeholderImg,
    x: 53, y: 70,
  },
  {
    id: "agua-riego-cultivos1",
    label: "Agua usada para riego de cultivos",
    desc: "El agua residual sin tratar se emplea para regar cultivos, contaminando la producción agrícola.",
    img: placeholderImg,
    x: 30, y: 78,
  },
  {
    id: "cultivos-contaminados1",
    label: "Cultivos contaminados",
    desc: "Las plantas regadas con agua contaminada contienen poliovirus en su superficie.",
    img: placeholderImg,
    x: 12, y: 69,
  },
  {
    id: "consumo1",
    label: "Consumo de cultivos contaminados",
    desc: "Los humanos consumen cultivos sin suficiente lavado o cocción.",
    img: placeholderImg,
    x: 15, y: 54,
  },
  {
    id: "contagio1",
    label: "Contagio",
    desc: "El poliovirus es ingerido por nuevos huéspedes humanos tras el consumo.",
    img: placeholderImg,
    x: 20, y: 39,
  },
  // Bifurcación 1
  {
    id: "desemboque-rios",
    label: "Desemboque en ríos, lagos u océanos",
    desc: "Parte del agua residual llega a fuentes naturales de agua.",
    img: placeholderImg,
    x: 49, y: 86,
  },
  {
    id: "contacto-directo-cuerpos",
    label: "Contacto directo con cuerpos de agua",
    desc: "Personas entran en contacto directo con agua contaminada.",
    img: placeholderImg,
    x: 67, y: 89,
  },
  {
    id: "contagio2",
    label: "Contagio",
    desc: "El poliovirus infecta a los humanos por contacto con agua contaminada.",
    img: placeholderImg,
    x: 80, y: 84,
  },
  // Regreso loop
  {
    id: "agua-residual-mal-tratada",
    label: "Agua residual con tratamiento incorrecto",
    desc: "El tratamiento deficiente no remueve completamente el poliovirus.",
    img: placeholderImg,
    x: 65, y: 67,
  },
  {
    id: "agua-riego-cultivos2",
    label: "Agua de riego para cultivos",
    desc: "El agua tratada de forma incorrecta riega cultivos, manteniendo el riesgo.",
    img: placeholderImg,
    x: 85, y: 59,
  },
  {
    id: "cultivos-contaminados2",
    label: "Cultivos contaminados",
    desc: "Los cultivos se contaminan nuevamente en la cadena de producción.",
    img: placeholderImg,
    x: 92, y: 45,
  },
  {
    id: "consumo2",
    label: "Consumo de cultivos contaminados",
    desc: "El consumo humano perpetúa el ciclo infeccioso.",
    img: placeholderImg,
    x: 98, y: 35,
  },
  {
    id: "contagio3",
    label: "Contagio",
    desc: "Continúa la infección por contacto indirecto.",
    img: placeholderImg,
    x: 95, y: 25,
  },
  // Camino de las moscas
  {
    id: "consumo-moscas",
    label: "Consumo de heces por moscas",
    desc: "Moscas consumen y transportan los virus en sus patas.",
    img: placeholderImg,
    x: 60, y: 35,
  },
  {
    id: "transporte-mosca",
    label: "Transportación por patas de mosca",
    desc: "Las moscas portan virus a superficies y alimentos humanos.",
    img: placeholderImg,
    x: 40, y: 28,
  },
  {
    id: "contacto-alimentos",
    label: "Contacto con alimentos",
    desc: "Los alimentos contaminados pueden ser ingeridos por humanos.",
    img: placeholderImg,
    x: 29, y: 17,
  },
];
const NODES_MAP = Object.fromEntries(NODES.map(n => [n.id, n]));

// Connections (parentId, childId)
const CONNECTIONS = [
  ["poliovirus", "tracto-intestinal"],
  ["tracto-intestinal", "heces-infectadas"],
  ["heces-infectadas", "drenaje"],
  ["drenaje", "agua-residual-sin-tratamiento"],
  ["agua-residual-sin-tratamiento", "agua-riego-cultivos1"],
  ["agua-riego-cultivos1", "cultivos-contaminados1"],
  ["cultivos-contaminados1", "consumo1"],
  ["consumo1", "contagio1"],
  ["contagio1", "tracto-intestinal"], // loop close

  // Bifurcación: sin tratamiento → desemboca en ríos...
  ["agua-residual-sin-tratamiento", "desemboque-rios"],
  ["desemboque-rios", "contacto-directo-cuerpos"],
  ["contacto-directo-cuerpos", "contagio2"],
  ["contagio2", "tracto-intestinal"],

  // Bifurcación: agua residual con tratamiento incorrecto
  ["drenaje", "agua-residual-mal-tratada"],
  ["agua-residual-mal-tratada", "agua-riego-cultivos2"],
  ["agua-riego-cultivos2", "cultivos-contaminados2"],
  ["cultivos-contaminados2", "consumo2"],
  ["consumo2", "contagio3"],
  ["contagio3", "tracto-intestinal"],

  // Camino alterno de la mosca
  ["heces-infectadas", "consumo-moscas"],
  ["consumo-moscas", "transporte-mosca"],
  ["transporte-mosca", "contacto-alimentos"],
  ["contacto-alimentos", "contagio1"], // conecta al mismo "contagio"
];

export function PoliovirusRoute() {
  // Which node (id) is open in modal, null for none
  const [openId, setOpenId] = useState<string | null>(null);

  // Helper for SVG line positions (calculate center of squares)
  const getNodeCenter = (node: typeof NODES[number]) => ({
    x: `calc(${node.x}% + 0px)`,
    y: `calc(${node.y}% + 0px)`,
  });

  return (
    <div className="w-full h-full min-h-screen bg-black flex flex-col items-center justify-between relative select-none font-mono" style={{ userSelect: "none" }}>
      {/* Block Title */}
      <div className="w-full text-center mt-8 mb-2 z-50">
        <h1 className="uppercase text-[#00FF00] text-2xl tracking-wider font-mono"
            style={{ letterSpacing: "0.15em" }}>
          Rastro Corrosivo — Ruta Poliovirus
        </h1>
      </div>
      {/* SVG lines: absolutely cover container */}
      <svg className="absolute left-0 top-0 w-full h-full pointer-events-none z-10"
        style={{ width: "100%", height: "100%" }}>
        {CONNECTIONS.map(([fromId, toId], i) => {
          const from = NODES_MAP[fromId];
          const to = NODES_MAP[toId];
          if (!from || !to) return null;
          // All lines perfectly straight and thin, solid, green
          return (
            <line
              key={fromId + "-" + toId}
              x1={from.x + "%"}
              y1={from.y + "%"}
              x2={to.x + "%"}
              y2={to.y + "%"}
              stroke="#00FF00"
              strokeWidth="1.2"
              style={{
                opacity: 0.9,
                strokeDasharray: "none",
                filter: "none",
                transition: "none",
              }}
            />
          );
        })}
      </svg>
      {/* Node squares */}
      {NODES.map((node) => {
        const selected = openId === node.id;
        return (
          <div
            key={node.id}
            data-node-id={node.id}
            style={{
              position: "absolute",
              left: `calc(${node.x}% - 56px)`,
              top: `calc(${node.y}% - 56px)`,
              width: "112px",
              height: "112px",
              border: "1.2px solid #00FF00",
              borderRadius: 0,
              background: "#000",
              outline: selected ? "1.7px solid #00FF00" : "none",
              boxShadow: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: selected ? 11 : 5,
              cursor: "pointer",
              transition: "none",
              userSelect: "none",
            }}
            className="group"
            tabIndex={0}
            onClick={() => setOpenId(selected ? null : node.id)}
          >
            <span className="text-[#00FF00] font-mono text-xs text-center px-1"
                  style={{
                    lineHeight: "1.25em",
                    userSelect: "none",
                    fontWeight: 600,
                  }}>
              {node.label}
            </span>
          </div>
        );
      })}
      {/* Modals (one at a time) */}
      {NODES.map((node) =>
        openId === node.id ? (
          <Dialog open={true} onOpenChange={() => setOpenId(null)} key={node.id}>
            <DialogContent
              className="bg-black border-[#00FF00] px-6 pt-5 pb-6"
              style={{
                border: "1.5px solid #00FF00",
                background: "#000",
                borderRadius: 0,
                boxShadow: "none",
                minWidth: 310,
                maxWidth: 362,
                outline: "none",
                transition: "none",
                zIndex: 30,
              }}>
              <div className="flex flex-col gap-4 items-center">
                <img
                  src={node.img}
                  alt={node.label}
                  className="w-28 h-28 object-contain"
                  draggable={false}
                  style={{
                    borderRadius: 0,
                    boxShadow: "none",
                    border: "1px solid #00FF00",
                    background: "none",
                  }}
                />
                <div className="text-[#00FF00] font-mono text-base text-center mb-1 font-bold uppercase"
                  style={{ letterSpacing: "0.07em", borderRadius: 0 }}>
                  {node.label}
                </div>
                <div className="text-white text-xs font-mono text-center"
                  style={{
                    background: "none",
                    borderRadius: 0,
                    color: "#fff",
                  }}>
                  {node.desc}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ) : null
      )}

      {/* Credits or page bottom padding */}
      <div style={{ height: 26 }} />
    </div>
  );
}
