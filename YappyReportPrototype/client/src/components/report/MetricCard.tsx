import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: {
    direction: "up" | "down" | "neutral";
    label?: string; // e.g. "+12%"
  };
  subtext?: string;
  highlight?: boolean;
}

export function MetricCard({ title, value, trend, subtext, highlight }: MetricCardProps) {
  return (
    <Card className={cn(
      "border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white overflow-hidden relative group h-full flex flex-col",
      highlight && "border-l-4 border-primary"
    )}>
      <CardContent className="p-6 flex flex-col h-full justify-between gap-4">
        {/* Top: Title */}
        <div className="space-y-1">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider leading-none">
            {title}
          </p>
          {subtext && (
            <p className="text-[10px] text-muted-foreground font-medium leading-tight opacity-80">
              {subtext}
            </p>
          )}
        </div>
        
        {/* Middle: Value */}
        <div className="flex-1 flex items-center py-2">
           <div className="text-5xl font-bold text-foreground tracking-tight leading-none">
            {value}
          </div>
        </div>
        
        {/* Bottom: Trend */}
        <div className="flex items-center pt-2">
          {trend ? (
            <div className={cn(
              "flex items-center gap-1.5 text-sm font-bold px-2.5 py-1 rounded-md w-fit",
              trend.direction === "up" ? "text-emerald-700 bg-emerald-50" : 
              trend.direction === "down" ? "text-rose-700 bg-rose-50" : 
              "text-gray-700 bg-gray-100"
            )}>
              {trend.direction === "up" && <ArrowUp className="w-4 h-4 stroke-[3px]" />}
              {trend.direction === "down" && <ArrowDown className="w-4 h-4 stroke-[3px]" />}
              {trend.direction === "neutral" && <Minus className="w-4 h-4 stroke-[3px]" />}
              {trend.label}
            </div>
          ) : (
            <div className="h-7" /> /* Spacer if no trend to keep alignment */
          )}
        </div>
      </CardContent>
    </Card>
  );
}
