
import { motion } from "framer-motion";

export function Title() {
  return (
    <motion.div 
      className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-[#00FF00] font-mono text-3xl tracking-widest uppercase">
        RASTRO CORROSIVO
      </h1>
    </motion.div>
  );
}
