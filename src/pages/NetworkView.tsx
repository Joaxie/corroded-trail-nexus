
import { useState } from "react";
import { ParasiteNetwork } from "@/components/ParasiteNetwork";
import { Title } from "@/components/Title";

export default function NetworkView() {
  const [titleVisible, setTitleVisible] = useState(true);
  
  const handleInteraction = () => {
    setTitleVisible(false);
  };

  return (
    <div 
      className="w-screen h-screen bg-black relative overflow-hidden"
      onClick={handleInteraction}
    >
      {titleVisible && <Title />}
      <ParasiteNetwork onInteraction={handleInteraction} />
    </div>
  );
}
