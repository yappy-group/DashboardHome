import { useState, type ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CampaignCardProps {
  title: string;
  type: string;
  image: string;
  status: "Active" | "Completed" | "Planned";
  metrics?: { label: string; value: string }[];
  backContent?: ReactNode;
}

export function CampaignCard({ title, type, image, status, metrics, backContent }: CampaignCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="perspective-1000 h-[340px] w-full group/container">
      <div 
        className={cn(
          "relative w-full h-full transition-all duration-700 transform-style-3d",
          isFlipped ? "rotate-y-180" : ""
        )}
      >
        {/* FRONT OF CARD */}
        <Card className="absolute w-full h-full backface-hidden border-none shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white overflow-hidden z-10">
          <div className="h-48 w-full overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover group-hover/container:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-4 left-4 z-20">
              <Badge variant="secondary" className="bg-white/90 text-black hover:bg-white mb-2 backdrop-blur-sm font-semibold">
                {type}
              </Badge>
              <h3 className="text-white font-bold text-xl tracking-tight leading-tight max-w-[90%]">
                {title}
              </h3>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4">
              {metrics?.map((m, i) => (
                <div key={i}>
                  <p className="text-xs text-muted-foreground uppercase font-medium mb-1">{m.label}</p>
                  <p className="text-lg font-bold text-foreground">{m.value}</p>
                </div>
              ))}
              <div className="flex items-end justify-end col-span-3 sm:col-span-1 sm:col-start-3">
                 <button 
                   onClick={(e) => {
                     e.stopPropagation();
                     setIsFlipped(true);
                   }}
                   className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
                   aria-label="View Details"
                 >
                    <ArrowRight className="w-5 h-5" />
                 </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* BACK OF CARD */}
        <Card className="absolute w-full h-full backface-hidden rotate-y-180 border-none shadow-sm bg-white overflow-hidden flex flex-col">
          <div className="p-6 flex items-center justify-between border-b border-gray-100">
            <h3 className="font-bold text-lg text-foreground truncate pr-4">{title}</h3>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
              aria-label="Close Details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <CardContent className="p-0 flex-1 overflow-y-auto custom-scrollbar">
            {backContent || (
              <div className="p-6 text-center text-muted-foreground text-sm">
                No detailed metrics available.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
