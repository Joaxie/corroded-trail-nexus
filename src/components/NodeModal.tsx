
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ParasiteNode as ParasiteNodeType } from "@/data/parasiteData";

interface NodeModalProps {
  node: ParasiteNodeType;
  onClose: () => void;
}

export function NodeModal({ node, onClose }: NodeModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-black border border-[#00FF00] p-0 m-0 max-w-md">
        <DialogTitle className="sr-only">{node.name}</DialogTitle>
        <div className="p-4 font-mono">
          <div className="mb-4 flex justify-center">
            <img 
              src={node.image} 
              alt={node.name}
              className="w-32 h-32 object-cover border border-[#00FF00]"
            />
          </div>
          
          <div className="mb-2">
            <h3 className="text-[#00FF00] text-lg uppercase">{node.name}</h3>
            <div className="text-[#00FF00] text-xs mb-2 uppercase">{node.type}</div>
          </div>
          
          <p className="text-white text-sm">{node.description}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
