import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Users, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface CampaignDashboardProps {
  id: string;
}

const campaignData: Record<string, { title: string; type: string; status: string }> = {
  "brand-awareness": { title: "Brand Awareness Campaign", type: "Always On", status: "Active" },
  "western-minerals": { title: "Western Minerals Group", type: "Tactical", status: "Active" },
  "ironharbor": { title: "IronHarbor Mining Co.", type: "Tactical", status: "Active" },
  "southern-rail": { title: "Southern Rail Logistics", type: "Tactical", status: "Planned" },
};

export default function CampaignDashboard({ id }: CampaignDashboardProps) {
  const campaign = campaignData[id] || { title: "Unknown Campaign", type: "Unknown", status: "Unknown" };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">{campaign.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary" className="bg-[#FFF7F0] text-primary font-medium">
              {campaign.type}
            </Badge>
            <Badge 
              variant="outline" 
              className={campaign.status === "Active" ? "border-emerald-500 text-emerald-600" : "border-gray-300 text-gray-600"}
            >
              {campaign.status}
            </Badge>
          </div>
        </div>
      </div>

      <Card className="border-none shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Campaign Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#FFF7F0] flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Campaign Dashboard – Coming Soon</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Detailed analytics, performance metrics, and engagement insights for this campaign will be available here.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#FFF7F0] flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-medium">Target Accounts</p>
                <p className="text-xl font-bold text-foreground">–</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#FFF7F0] flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-medium">Engagement Rate</p>
                <p className="text-xl font-bold text-foreground">–</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#FFF7F0] flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-medium">Days Active</p>
                <p className="text-xl font-bold text-foreground">–</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
