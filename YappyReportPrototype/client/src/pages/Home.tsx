import { MetricCard } from "@/components/report/MetricCard";
import { CampaignCard } from "@/components/report/CampaignCard";
import { Badge } from "@/components/ui/badge";
import { Star, User, Download, FileImage, FileText, FileSpreadsheet } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Images
import brandImg from "@assets/generated_images/brand_awareness_abstract.png";
import westernImg from "@assets/generated_images/western_minerals_context.png";
import ironImg from "@assets/generated_images/ironharbor_context.png";
import southernImg from "@assets/generated_images/southern_rail_context.png";

export default function Home() {

  // Export Functions
  const handleExportPNG = async () => {
    const element = document.getElementById("hero-metrics-widget");
    if (!element) return;
    
    try {
      const canvas = await html2canvas(element, {
        scale: 2, // Higher resolution
        backgroundColor: "#ffffff",
      });
      
      const link = document.createElement("a");
      link.download = "yappy-hero-metrics.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Failed to export PNG", err);
    }
  };

  const handleExportPDF = async () => {
    const element = document.getElementById("hero-metrics-widget");
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff",
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height] // Match canvas dimensions
      });
      
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("yappy-hero-metrics.pdf");
    } catch (err) {
      console.error("Failed to export PDF", err);
    }
  };

  const handleExportCSV = () => {
    const data = [
      ["Metric Label", "Value", "Trend"],
      ["Active Targets", "28", "+3"],
      ["Roles Reached", "840", "+15%"],
      ["Key Roles Engaged", "124", "+8"],
      ["Content Watch Time (hrs)", "342", "-2.1%"]
    ];
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + data.map(e => e.join(",")).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "yappy-hero-metrics.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Back content for "Always On"
  const alwaysOnBackContent = (
    <div className="divide-y divide-gray-100">
      <div className="px-6 py-3 bg-gray-50 flex text-xs font-semibold text-gray-500 uppercase tracking-wider">
        <div className="flex-1">Target Name</div>
        <div className="w-24 text-right">Impressions</div>
      </div>
      {[
        { name: "Global Logistics Inc", impressions: "1.2M" },
        { name: "Apex Manufacturing", impressions: "630k" },
        { name: "EcoEnergy Solutions", impressions: "450k" },
      ].map((account, i) => (
        <div key={i} className="px-6 py-4 flex items-center text-sm">
          <div className="flex-1 font-medium text-gray-900">{account.name}</div>
          <div className="w-24 text-right text-gray-600 font-mono">{account.impressions}</div>
        </div>
      ))}
    </div>
  );

  // Helper for Tactical Back Content
  const TacticalBackContent = ({ content, keyRoles }: { content: any[], keyRoles?: { group: string; level: "High" | "Medium" | "Low" }[] }) => (
    <div className="p-6 space-y-6">
      {/* Content Pieces */}
      <div>
        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Top Content Engagement</h4>
        <div className="space-y-3">
          {content.map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-sm text-gray-700 truncate max-w-[180px]">{item.title}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{item.absorption}</span>
                <div className={`h-2 w-12 rounded-full ${
                  item.absorption === 'High' ? 'bg-emerald-500' : 
                  item.absorption === 'Med' ? 'bg-yellow-400' : 'bg-gray-300'
                }`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Roles Engaged */}
      {keyRoles && (
        <div>
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Key Roles Engaged</h4>
          <div className="space-y-3">
            {keyRoles.map((role, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 truncate max-w-[180px]">{role.group}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{role.level}</span>
                  <div className={`h-2 w-12 rounded-full ${
                    role.level === 'High' ? 'bg-emerald-500' : 
                    role.level === 'Medium' ? 'bg-yellow-400' : 'bg-gray-300'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-10">
      
      {/* HERO METRICS */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground tracking-tight">Performance Overview</h2>
          
          {/* Export Control */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 text-xs font-medium h-8">
                <Download className="w-3.5 h-3.5" />
                Export Hero Metrics
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleExportPNG} className="cursor-pointer">
                <FileImage className="w-4 h-4 mr-2 text-muted-foreground" />
                Export as PNG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportPDF} className="cursor-pointer">
                <FileText className="w-4 h-4 mr-2 text-muted-foreground" />
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportCSV} className="cursor-pointer">
                <FileSpreadsheet className="w-4 h-4 mr-2 text-muted-foreground" />
                Export as CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div id="hero-metrics-widget" className="p-1 bg-[#fcfcfc] rounded-xl"> 
           {/* Added wrapper for cleaner capture with slight padding/bg if needed, currently subtle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard 
              title="Active Targets" 
              value="28" 
              trend={{ direction: "up", label: "+3" }}
              highlight
            />
            <MetricCard 
              title="Roles Reached" 
              value="840" 
              trend={{ direction: "up", label: "+15%" }}
            />
            <MetricCard 
              title="Key Roles Engaged" 
              value="124" 
              trend={{ direction: "up", label: "+8" }}
            />
            <MetricCard 
              title="Content Watch Time" 
              value="342h" 
              trend={{ direction: "down", label: "-2.1%" }}
            />
          </div>
        </div>
      </section>

      {/* CAMPAIGN OVERVIEW */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-bold text-foreground tracking-tight">Active Campaigns</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Left: Brand Awareness */}
          <CampaignCard 
            title="Brand Awareness Campaign"
            type="Always On"
            image={brandImg}
            status="Active"
            metrics={[
              { label: "Impressions", value: "2.4M" },
              { label: "CPM", value: "$12.50" }
            ]}
            backContent={alwaysOnBackContent}
          />
          
          {/* Top Right: Western Minerals */}
          <CampaignCard 
            title="Western Minerals Group"
            type="Tactical"
            image={westernImg}
            status="Active"
            metrics={[
              { label: "Engagement", value: "High" },
              { label: "Role Coverage", value: "38%" }
            ]}
            backContent={
              <TacticalBackContent 
                content={[
                  { title: "Future of Mining Video", absorption: "High" },
                  { title: "Sustainability Report", absorption: "High" },
                  { title: "Q3 Technical Brief", absorption: "Med" },
                ]}
                keyRoles={[
                  { group: "Operations", level: "High" },
                  { group: "Finance", level: "Medium" },
                  { group: "Technology", level: "Low" }
                ]}
              />
            }
          />

          {/* Bottom Left: IronHarbor */}
          <CampaignCard 
            title="IronHarbor Mining Co."
            type="Tactical"
            image={ironImg}
            status="Active"
            metrics={[
              { label: "Engagement", value: "Med" },
              { label: "Role Coverage", value: "22%" }
            ]}
            backContent={
               <TacticalBackContent 
                content={[
                  { title: "Heavy Machinery Guide", absorption: "High" },
                  { title: "Safety Protocols", absorption: "Med" },
                  { title: "Automation Overview", absorption: "Low" },
                ]}
                keyRoles={[
                  { group: "Procurement", level: "High" },
                  { group: "Site Management", level: "Medium" },
                ]}
              />
            }
          />

          {/* Bottom Right: Southern Rail */}
          <CampaignCard 
            title="Southern Rail Logistics"
            type="Tactical"
            image={southernImg}
            status="Planned"
            metrics={[
              { label: "Engagement", value: "Low" },
              { label: "Role Coverage", value: "15%" }
            ]}
            backContent={
               <TacticalBackContent 
                content={[
                  { title: "Intro Deck", absorption: "Med" },
                  { title: "Rail Efficiency Whitepaper", absorption: "Low" },
                  { title: "Case Studies 2024", absorption: "Low" },
                ]}
                keyRoles={[
                  { group: "Logistics", level: "Low" },
                  { group: "Strategy", level: "Low" },
                ]}
              />
            }
          />
        </div>
      </section>

    </div>
  );
}
