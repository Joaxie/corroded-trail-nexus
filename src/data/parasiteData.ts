
export type NodeType = 
  | "parasite" 
  | "human" 
  | "infrastructure" 
  | "environment" 
  | "food" 
  | "water"
  | "transmission";

export interface ParasiteNode {
  id: string;
  name: string;
  type: NodeType;
  description: string;
  image: string;
  x: number; // Position X (percentage of screen)
  y: number; // Position Y (percentage of screen)
  z: number; // Depth layer (0 = closest, higher = deeper)
  connections: string[]; // IDs of connected nodes
  // For map view positioning
  mapX?: number;
  mapY?: number;
  // For card view
  title?: string;
}

// Define our parasite nodes
export const parasiteNodes: ParasiteNode[] = [
  // Poliovirus pathway
  {
    id: "polio-1",
    name: "Poliovirus",
    type: "parasite",
    description: "Enterovirus that attacks the nervous system, causing paralysis in severe cases. Found in fecal matter, enters water through sewage leaks.",
    image: "/lovable-uploads/f6707e57-be57-46e2-a9f9-afd671d66b9f.png",
    x: 24,
    y: 15,
    z: 0,
    connections: ["polio-2", "polio-7"]
  },
  {
    id: "polio-2",
    name: "Sewage System",
    type: "infrastructure",
    description: "Damaged sewage infrastructure allows viral particles to leak into groundwater and drinking water supplies.",
    image: "/lovable-uploads/0b7538bb-1623-46cf-b294-835fcdf8cf7c.png",
    x: 32,
    y: 28,
    z: 1,
    connections: ["polio-3", "polio-5"]
  },
  {
    id: "polio-3",
    name: "Water Treatment Failure",
    type: "infrastructure",
    description: "Inadequate chlorination fails to neutralize viral load. Poliovirus can survive standard treatment processes.",
    image: "/lovable-uploads/e73ff598-8ff1-4e07-b2df-95ed89a29f8f.png",
    x: 38,
    y: 40,
    z: 2,
    connections: ["polio-4"]
  },
  {
    id: "polio-4",
    name: "Drinking Water",
    type: "water",
    description: "Contaminated water reaches households through the municipal supply system, especially in areas with intermittent service.",
    image: "/lovable-uploads/f6707e57-be57-46e2-a9f9-afd671d66b9f.png",
    x: 44,
    y: 52,
    z: 3,
    connections: ["polio-6"]
  },
  {
    id: "polio-5",
    name: "Agricultural Irrigation",
    type: "environment",
    description: "Untreated wastewater used for crop irrigation transfers viruses to produce, creating a secondary transmission path.",
    image: "/lovable-uploads/0b7538bb-1623-46cf-b294-835fcdf8cf7c.png",
    x: 50,
    y: 38,
    z: 2,
    connections: ["polio-6"]
  },
  {
    id: "polio-6",
    name: "Human Ingestion",
    type: "human",
    description: "Virus enters human digestive system through contaminated water or food, initiating infection cycle.",
    image: "/lovable-uploads/e73ff598-8ff1-4e07-b2df-95ed89a29f8f.png",
    x: 55,
    y: 60,
    z: 4,
    connections: ["polio-8"]
  },
  {
    id: "polio-7",
    name: "Flies and Insects",
    type: "transmission",
    description: "Mechanical vectors transfer viral particles from sewage to exposed food and water in urban households.",
    image: "/lovable-uploads/f6707e57-be57-46e2-a9f9-afd671d66b9f.png",
    x: 39,
    y: 22,
    z: 1,
    connections: ["polio-6"]
  },
  {
    id: "polio-8",
    name: "Intestinal Replication",
    type: "human",
    description: "Virus multiplies in intestinal tract, shedding back into sewage through fecal matter, completing the infection cycle.",
    image: "/lovable-uploads/0b7538bb-1623-46cf-b294-835fcdf8cf7c.png",
    x: 68,
    y: 50,
    z: 4,
    connections: ["polio-1"]
  },
  
  // Salmonella enterica pathway
  {
    id: "salmonella-1",
    name: "Salmonella Enterica",
    type: "parasite",
    description: "Bacteria causing salmonellosis, typhoid fever. Originates in animal intestines, contaminates water through fecal matter.",
    image: "/lovable-uploads/e73ff598-8ff1-4e07-b2df-95ed89a29f8f.png",
    x: 15,
    y: 40,
    z: 0,
    connections: ["salmonella-2", "salmonella-7"]
  },
  {
    id: "salmonella-2",
    name: "Animal Waste",
    type: "environment",
    description: "Runoff from livestock operations and urban fauna carries high bacterial loads into watershed systems.",
    image: "/lovable-uploads/f6707e57-be57-46e2-a9f9-afd671d66b9f.png",
    x: 25,
    y: 52,
    z: 1,
    connections: ["salmonella-3"]
  },
  {
    id: "salmonella-3",
    name: "Water Reservoirs",
    type: "water",
    description: "Mexico City's reservoirs become contaminated during rainy season with agricultural runoff carrying salmonella.",
    image: "/lovable-uploads/0b7538bb-1623-46cf-b294-835fcdf8cf7c.png",
    x: 20,
    y: 65,
    z: 2,
    connections: ["salmonella-4", "salmonella-6"]
  },
  {
    id: "salmonella-4",
    name: "Municipal Water",
    type: "infrastructure",
    description: "Bacteria survive inadequate treatment processes, especially when chlorine levels are insufficient.",
    image: "/lovable-uploads/e73ff598-8ff1-4e07-b2df-95ed89a29f8f.png",
    x: 28,
    y: 78,
    z: 3,
    connections: ["salmonella-5"]
  },
  {
    id: "salmonella-5",
    name: "Human Consumption",
    type: "human",
    description: "Salmonella enters human hosts through drinking water and washing food with contaminated water.",
    image: "/lovable-uploads/f6707e57-be57-46e2-a9f9-afd671d66b9f.png",
    x: 40,
    y: 85,
    z: 4,
    connections: ["salmonella-8"]
  },
  {
    id: "salmonella-6",
    name: "Street Food Preparation",
    type: "food",
    description: "Vendors using untreated water for food preparation spread salmonella to consumers.",
    image: "/lovable-uploads/0b7538bb-1623-46cf-b294-835fcdf8cf7c.png",
    x: 32,
    y: 60,
    z: 3,
    connections: ["salmonella-5"]
  },
  {
    id: "salmonella-7",
    name: "Produce Contamination",
    type: "food",
    description: "Fruits and vegetables irrigated with contaminated water harbor bacteria on their surfaces.",
    image: "/lovable-uploads/e73ff598-8ff1-4e07-b2df-95ed89a29f8f.png",
    x: 8,
    y: 52,
    z: 1,
    connections: ["salmonella-5"]
  },
  {
    id: "salmonella-8",
    name: "Intestinal Proliferation",
    type: "human",
    description: "Bacteria multiply in human gut, cause illness, and are excreted to restart the cycle of contamination.",
    image: "/lovable-uploads/f6707e57-be57-46e2-a9f9-afd671d66b9f.png",
    x: 55,
    y: 75,
    z: 4,
    connections: ["salmonella-1"]
  },
  
  // Shigella pathway
  {
    id: "shigella-1",
    name: "Shigella",
    type: "parasite",
    description: "Bacteria causing dysentery. Highly contagious, requires minimal exposure for infection. Primarily human-to-human transmission.",
    image: "/lovable-uploads/0b7538bb-1623-46cf-b294-835fcdf8cf7c.png",
    x: 62,
    y: 20,
    z: 0,
    connections: ["shigella-2", "shigella-3"]
  },
  {
    id: "shigella-2",
    name: "Human Waste",
    type: "human",
    description: "Infected fecal matter enters water system through inadequate sanitation in dense urban settlements.",
    image: "/lovable-uploads/e73ff598-8ff1-4e07-b2df-95ed89a29f8f.png",
    x: 72,
    y: 30,
    z: 1,
    connections: ["shigella-4"]
  },
  {
    id: "shigella-3",
    name: "Direct Contact",
    type: "transmission",
    description: "Person-to-person transmission through unwashed hands in crowded conditions like schools and markets.",
    image: "/lovable-uploads/f6707e57-be57-46e2-a9f9-afd671d66b9f.png",
    x: 75,
    y: 14,
    z: 1,
    connections: ["shigella-7"]
  },
  {
    id: "shigella-4",
    name: "Leaking Sewers",
    type: "infrastructure",
    description: "Damaged sewer systems allow bacterial seepage into soil and groundwater around residential areas.",
    image: "/lovable-uploads/0b7538bb-1623-46cf-b294-835fcdf8cf7c.png",
    x: 80,
    y: 42,
    z: 2,
    connections: ["shigella-5", "shigella-6"]
  },
  {
    id: "shigella-5",
    name: "Local Water Storage",
    type: "infrastructure",
    description: "Rooftop tanks and cisterns become contaminated during water shortages when filled from unregulated sources.",
    image: "/lovable-uploads/e73ff598-8ff1-4e07-b2df-95ed89a29f8f.png",
    x: 85,
    y: 55,
    z: 3,
    connections: ["shigella-7"]
  },
  {
    id: "shigella-6",
    name: "Surface Water",
    type: "water",
    description: "Urban canals and water channels collect runoff contaminated with shigella, used for informal irrigation.",
    image: "/lovable-uploads/f6707e57-be57-46e2-a9f9-afd671d66b9f.png",
    x: 70,
    y: 60,
    z: 3,
    connections: ["shigella-7"]
  },
  {
    id: "shigella-7",
    name: "Human Infection",
    type: "human",
    description: "Ingestion through contaminated hands, water, or food leads to dysentery symptoms and bacterial shedding.",
    image: "/lovable-uploads/0b7538bb-1623-46cf-b294-835fcdf8cf7c.png",
    x: 82,
    y: 72,
    z: 4,
    connections: ["shigella-8"]
  },
  {
    id: "shigella-8",
    name: "Community Spread",
    type: "transmission",
    description: "High population density accelerates transmission within neighborhoods, keeping the bacteria circulating.",
    image: "/lovable-uploads/e73ff598-8ff1-4e07-b2df-95ed89a29f8f.png",
    x: 72,
    y: 80,
    z: 4,
    connections: ["shigella-1"]
  },
  
  // Giardia pathway
  {
    id: "giardia-1",
    name: "Giardia Lamblia",
    type: "parasite",
    description: "Protozoan parasite causing giardiasis. Forms resistant cysts that can survive in water for months.",
    image: "/lovable-uploads/f6707e57-be57-46e2-a9f9-afd671d66b9f.png",
    x: 40,
    y: 10,
    z: 0,
    connections: ["giardia-2", "giardia-3"]
  },
  {
    id: "giardia-2",
    name: "Wild Animal Carriers",
    type: "environment",
    description: "Wildlife in watershed areas shed cysts into surface water that feeds city reservoirs.",
    image: "/lovable-uploads/0b7538bb-1623-46cf-b294-835fcdf8cf7c.png",
    x: 53,
    y: 8,
    z: 1,
    connections: ["giardia-4"]
  },
  {
    id: "giardia-3",
    name: "Urban Animal Vectors",
    type: "transmission",
    description: "Stray dogs and cats spread cysts through their waste in streets and public spaces.",
    image: "/lovable-uploads/e73ff598-8ff1-4e07-b2df-95ed89a29f8f.png",
    x: 45,
    y: 25,
    z: 1,
    connections: ["giardia-5"]
  },
  {
    id: "giardia-4",
    name: "Watershed Contamination",
    type: "environment",
    description: "Rainy season washes cysts into rivers and streams feeding Mexico City's water supply.",
    image: "/lovable-uploads/f6707e57-be57-46e2-a9f9-afd671d66b9f.png",
    x: 60,
    y: 18,
    z: 2,
    connections: ["giardia-6"]
  },
  {
    id: "giardia-5",
    name: "Street Runoff",
    type: "environment",
    description: "Urban flooding redistributes parasite cysts across neighborhoods and into cracked water pipes.",
    image: "/lovable-uploads/0b7538bb-1623-46cf-b294-835fcdf8cf7c.png",
    x: 52,
    y: 30,
    z: 2,
    connections: ["giardia-6"]
  },
  {
    id: "giardia-6",
    name: "Filtration Resistance",
    type: "infrastructure",
    description: "Giardia cysts resist standard filtration methods in municipal treatment plants due to their small size.",
    image: "/lovable-uploads/e73ff598-8ff1-4e07-b2df-95ed89a29f8f.png",
    x: 65,
    y: 35,
    z: 3,
    connections: ["giardia-7"]
  },
  {
    id: "giardia-7",
    name: "Household Exposure",
    type: "human",
    description: "Families exposed through drinking water, bathing, and washing vegetables in contaminated tap water.",
    image: "/lovable-uploads/f6707e57-be57-46e2-a9f9-afd671d66b9f.png",
    x: 60,
    y: 45,
    z: 4,
    connections: ["giardia-8"]
  },
  {
    id: "giardia-8",
    name: "Intestinal Colonization",
    type: "human",
    description: "Cysts excyst in small intestine, attach to intestinal wall, and produce new cysts that pass through sewage.",
    image: "/lovable-uploads/0b7538bb-1623-46cf-b294-835fcdf8cf7c.png",
    x: 50,
    y: 55,
    z: 4,
    connections: ["giardia-1"]
  }
];

// Create parasiteData and nodeConnections exports for components using these names
export const parasiteData = parasiteNodes.map(node => ({
  ...node,
  title: node.name, // Map name to title for components expecting title property
}));

// Create connection objects from the node connection data
export const nodeConnections = parasiteNodes.flatMap(node => 
  node.connections.map(targetId => ({
    start: node.id,
    end: targetId
  }))
);

