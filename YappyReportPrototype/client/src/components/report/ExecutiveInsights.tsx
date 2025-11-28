import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

export function ExecutiveInsights() {
  return (
    <Card className="border-none shadow-sm bg-white h-full">
      <CardHeader className="pb-2 flex flex-row items-center gap-3 border-b border-gray-50">
        <div className="p-2 bg-orange-50 rounded-lg">
            <Lightbulb className="w-5 h-5 text-primary" />
        </div>
        <CardTitle className="text-lg font-bold text-foreground">Executive Insights</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <ul className="space-y-4">
          {[
            "Target Account Reach exceeded benchmarks by 14% due to high engagement with the new 'Sustainable Mining' video series.",
            "Decision Maker penetration in Western Minerals Group increased significantly, indicating readiness for Q4 proposal.",
            "Content consumption patterns show a shift towards technical deep-dives, suggesting a more informed buyer journey.",
            "Engagement from Key Roles at IronHarbor Mining Co. has stabilized, recommending a targeted re-engagement campaign."
          ].map((insight, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 opacity-60" />
              {insight}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
