
import { BlobNetwork } from "@/components/BlobNetwork";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="w-screen h-screen bg-black overflow-hidden relative">
      <BlobNetwork />
      {/* Access link to Poliovirus route module */}
      <Link
        to="/poliovirus"
        className="fixed z-50 bottom-4 right-4 border border-[#00FF00] text-[#00FF00] neon-text px-4 py-2 rounded font-mono bg-black/40 hover:bg-[#00FF00] hover:bg-opacity-20"
        style={{
          borderRadius: 0,
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "0.07em",
        }}
      >
        Ruta Poliovirus
      </Link>
    </div>
  );
};

export default Index;
