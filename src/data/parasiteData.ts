
// Define the parasite types
export type ParasiteType = 
  | "salmonella"
  | "salmonella_enterica"
  | "shigella"
  | "vibrio_cholerae"
  | "burkholderia"
  | "giardia"
  | "poliovirus";

// Define the node data structure
export interface ParasiteNode {
  id: string;
  title: string;
  description: string;
  image: string;
  type: ParasiteType;
  x: number;
  y: number;
  z: number;
  mapX: number;
  mapY: number;
}

// Define the connection data structure
export interface NodeConnection {
  start: string;
  end: string;
}

// Define the parasite data
export const parasiteData: ParasiteNode[] = [
  // Origin Layer (Closest to viewer)
  {
    id: "salmonella-origin",
    title: "Salmonella Origin",
    description: "Salmonella bacteria originates from contaminated food sources, particularly eggs, poultry, and unpasteurized dairy products. It enters the water system through agricultural runoff and sewage leaks.",
    image: "/lovable-uploads/f6707e57-be57-46e2-a9f9-afd671d66b9f.png",
    type: "salmonella",
    x: 25,
    y: 20,
    z: 0,
    mapX: 15,
    mapY: 10
  },
  {
    id: "shigella-origin",
    title: "Shigella Origin",
    description: "Shigella bacteria primarily comes from human fecal matter. It enters urban water systems through cracked pipes and cross-contamination between sewage and drinking water infrastructure.",
    image: "/lovable-uploads/e73ff598-8ff1-4e07-b2df-95ed89a29f8f.png",
    type: "shigella",
    x: 60,
    y: 30,
    z: -100,
    mapX: 45,
    mapY: 25
  },
  {
    id: "vibrio-origin",
    title: "Vibrio Cholerae Origin",
    description: "This bacteria thrives in warm, shallow, and brackish water. In Mexico City, it enters the water supply through contaminated surface water and inadequate water treatment facilities.",
    image: "/lovable-uploads/0b7538bb-1623-46cf-b294-835fcdf8cf7c.png",
    type: "vibrio_cholerae",
    x: 30,
    y: 70,
    z: -200,
    mapX: 20,
    mapY: 50
  },
  // Water Routes & Infrastructure Layer (Middle depth)
  {
    id: "water-infiltration",
    title: "Water Infiltration Point",
    description: "This crucial junction is where parasites first enter the municipal water system. Aging infrastructure, including cracked pipes and outdated filtration systems, creates vulnerability points.",
    image: "/lovable-uploads/f6707e57-be57-46e2-a9f9-afd671d66b9f.png",
    type: "salmonella",
    x: 45,
    y: 40,
    z: -300,
    mapX: 35,
    mapY: 30
  },
  {
    id: "distribution-system",
    title: "Water Distribution System",
    description: "Once inside the distribution network, parasites travel through a complex labyrinth of pipes, tanks, and pumping stations. The network's vastness makes comprehensive treatment difficult.",
    image: "/lovable-uploads/e73ff598-8ff1-4e07-b2df-95ed89a29f8f.png",
    type: "shigella",
    x: 70,
    y: 60,
    z: -400,
    mapX: 55,
    mapY: 40
  },
  {
    id: "water-storage",
    title: "Neighborhood Water Storage",
    description: "Communal cisterns and rooftop water tanks are breeding grounds for parasites. The irregular water supply forces residents to store water, creating stagnant conditions ideal for microbial growth.",
    image: "/lovable-uploads/0b7538bb-1623-46cf-b294-835fcdf8cf7c.png",
    type: "vibrio_cholerae",
    x: 35,
    y: 55,
    z: -350,
    mapX: 40,
    mapY: 45
  },
  // Human Exposure Layer (Deepest)
  {
    id: "residential-area",
    title: "Residential Water Access",
    description: "In Mexico City's residential areas, particularly in underserved communities, water access is often intermittent. This creates conditions where parasites can concentrate during storage periods.",
    image: "/lovable-uploads/0b7538bb-1623-46cf-b294-835fcdf8cf7c.png",
    type: "vibrio_cholerae",
    x: 40,
    y: 80,
    z: -500,
    mapX: 30,
    mapY: 60
  },
  {
    id: "human-consumption",
    title: "Human Consumption",
    description: "The final stage of the parasite journey is human consumption, leading to waterborne illnesses. Mexico City reports thousands of such cases annually, with the highest concentrations in areas with poor water infrastructure.",
    image: "/lovable-uploads/f6707e57-be57-46e2-a9f9-afd671d66b9f.png",
    type: "salmonella",
    x: 60,
    y: 50,
    z: -600,
    mapX: 70,
    mapY: 75
  }
];

// Define the connections between nodes
export const nodeConnections: NodeConnection[] = [
  // Origin to infiltration connections
  { start: "salmonella-origin", end: "water-infiltration" },
  { start: "shigella-origin", end: "water-infiltration" },
  { start: "vibrio-origin", end: "water-infiltration" },
  
  // Infrastructure connections
  { start: "water-infiltration", end: "distribution-system" },
  { start: "water-infiltration", end: "water-storage" },
  { start: "distribution-system", end: "water-storage" },
  
  // Human exposure connections
  { start: "distribution-system", end: "residential-area" },
  { start: "water-storage", end: "residential-area" },
  { start: "residential-area", end: "human-consumption" },
  
  // Cyclic connections (to ensure no endpoints)
  { start: "human-consumption", end: "salmonella-origin" },
  { start: "human-consumption", end: "shigella-origin" },
  { start: "human-consumption", end: "vibrio-origin" }
];
