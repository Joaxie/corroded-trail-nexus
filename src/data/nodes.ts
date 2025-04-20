
type BlobNodeType = "parasite" | "infrastructure" | "exposure";

export interface BlobNodeData {
  id: string;
  type: BlobNodeType;
  title: string;
  info: string;
  img: string; // can be a static image or gif
  x: number; // 0-100 (percent for left)
  y: number; // 0-100 (percent for top)
  z: number; // 0 = closest, higher = deeper
  links: string[]; // ids of connected nodes
  parasiteMeta?: {
    name: string;
    source: string;
    entry: string;
    risks: string;
  };
}

// NOTE: Replace with your actual uploads as you see fit
export const blobNodes: BlobNodeData[] = [
  {
    id: "p1",
    type: "parasite",
    title: "Salmonella Typhi",
    info: "A dangerous waterborne parasite commonly found in sewage-contaminated water.",
    img: "/lovable-uploads/f6707e57-be57-46e2-a9f9-afd671d66b9f.png",
    x: 20, y: 22, z: 0,
    links: ["infra1", "p2"],
    parasiteMeta: {
      name: "Salmonella Typhi",
      source: "Sewage, contaminated food",
      entry: "Ingestion of tainted water/food",
      risks: "Typhoid fever, intestinal complications",
    },
  },
  {
    id: "p2",
    type: "parasite",
    title: "Shigella Dysenteriae",
    info: "Causes dysentery in contaminated urban water supplies.",
    img: "/lovable-uploads/e73ff598-8ff1-4e07-b2df-95ed89a29f8f.png",
    x: 68, y: 17, z: 0,
    links: ["infra2", "p1", "infra3"],
    parasiteMeta: {
      name: "Shigella Dysenteriae",
      source: "Human waste leaks",
      entry: "Consumption of contaminated water",
      risks: "Severe diarrhea, dehydration, death",
    },
  },
  {
    id: "infra1",
    type: "infrastructure",
    title: "Old Water Main",
    info: "Cracked pipes leaking contaminants into city water.",
    img: "/lovable-uploads/0b7538bb-1623-46cf-b294-835fcdf8cf7c.png",
    x: 21, y: 59, z: 1,
    links: ["p1", "infra2", "exp1"],
  },
  {
    id: "infra2",
    type: "infrastructure",
    title: "Sewage Crosspoint",
    info: "Intersection where parasite-rich water flows in.",
    img: "/lovable-uploads/f6707e57-be57-46e2-a9f9-afd671d66b9f.png",
    x: 52, y: 41, z: 1,
    links: ["p2", "infra3", "exp1"],
  },
  {
    id: "infra3",
    type: "infrastructure",
    title: "Storage Cistern",
    info: "Dark, stagnant tanks where lifeforms multiply.",
    img: "/lovable-uploads/e73ff598-8ff1-4e07-b2df-95ed89a29f8f.png",
    x: 79, y: 54, z: 1,
    links: ["p2", "infra2", "exp2"],
  },
  {
    id: "exp1",
    type: "exposure",
    title: "Household Faucet",
    info: "Point of entry for parasites into homes.",
    img: "/lovable-uploads/f6707e57-be57-46e2-a9f9-afd671d66b9f.png",
    x: 36, y: 87, z: 2,
    links: ["infra1", "infra2", "exp2"],
  },
  {
    id: "exp2",
    type: "exposure",
    title: "Human Infection",
    info: "Parasitic symptoms — fever, cramps, diarrhea.",
    img: "/lovable-uploads/0b7538bb-1623-46cf-b294-835fcdf8cf7c.png",
    x: 72, y: 82, z: 2,
    links: ["exp1", "infra3"],
  },
];
