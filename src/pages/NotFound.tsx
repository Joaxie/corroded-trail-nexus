import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="text-4xl font-mono neon-text mb-4 animate-pulse-neon">404</h1>
        <p className="text-xl text-white mb-4 font-mono">Rastro interrumpido</p>
        <a href="/" className="neon-text hover:text-opacity-80 underline font-mono">
          Return to Exploration
        </a>
      </div>
    </div>
  );
};

export default NotFound;
