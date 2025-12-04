import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Plus, 
  ArrowRight, 
  X, 
  Building2, 
  Users, 
  Activity, 
  Flag, 
  Pencil, 
  Trash2, 
  Calendar,
  Phone,
  Mail,
  Video,
  MessageSquare,
  FileText,
  MoreHorizontal,
  ExternalLink,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

interface Target {
  id: string;
  name: string;
  logo?: string;
  status: "Active" | "Inactive";
  lastActivity: string;
  industry?: string;
  website?: string;
  keyRoles: KeyRole[];
  activities: ActivityItem[];
  campaigns: CampaignItem[];
  metrics: {
    impressions: string;
    engagement: string;
    rolesCovered: number;
    contentViews: number;
  };
}

interface KeyRole {
  id: string;
  title: string;
  department?: string;
}

interface ActivityItem {
  id: string;
  type: "Meeting" | "Call" | "Email" | "Demo" | "Event" | "Note" | "Other" | "Platform";
  date: string;
  description: string;
  relatedCampaign?: string;
  relatedRole?: string;
  isManual: boolean;
}

interface CampaignItem {
  id: string;
  name: string;
  status: "Active" | "Completed" | "Planned";
  impressions: string;
  engagement: string;
}

const mockTargets: Target[] = [
  {
    id: "global-logistics",
    name: "Global Logistics Inc",
    status: "Active",
    lastActivity: "2024-12-02",
    industry: "Transportation & Logistics",
    website: "globallogistics.com",
    keyRoles: [
      { id: "1", title: "VP of Operations", department: "Operations" },
      { id: "2", title: "Chief Technology Officer", department: "Technology" },
      { id: "3", title: "Director of Procurement", department: "Procurement" },
    ],
    activities: [
      { id: "a1", type: "Platform", date: "2024-12-02T10:30:00", description: "Viewed Brand Awareness video content", relatedCampaign: "Brand Awareness", isManual: false },
      { id: "a2", type: "Meeting", date: "2024-11-28T14:00:00", description: "Initial discovery call with VP of Operations", relatedRole: "VP of Operations", isManual: true },
      { id: "a3", type: "Platform", date: "2024-11-25T09:15:00", description: "Downloaded sustainability whitepaper", relatedCampaign: "Brand Awareness", isManual: false },
      { id: "a4", type: "Email", date: "2024-11-20T11:00:00", description: "Sent follow-up proposal", isManual: true },
    ],
    campaigns: [
      { id: "c1", name: "Brand Awareness Campaign", status: "Active", impressions: "1.2M", engagement: "High" },
    ],
    metrics: { impressions: "1.2M", engagement: "High", rolesCovered: 3, contentViews: 156 }
  },
  {
    id: "apex-manufacturing",
    name: "Apex Manufacturing",
    status: "Active",
    lastActivity: "2024-12-01",
    industry: "Manufacturing",
    website: "apexmfg.com",
    keyRoles: [
      { id: "4", title: "Plant Manager", department: "Operations" },
      { id: "5", title: "Head of Supply Chain", department: "Supply Chain" },
    ],
    activities: [
      { id: "a5", type: "Platform", date: "2024-12-01T16:45:00", description: "Engaged with automation case study", relatedCampaign: "Brand Awareness", isManual: false },
      { id: "a6", type: "Call", date: "2024-11-29T10:00:00", description: "Follow-up call with Plant Manager", relatedRole: "Plant Manager", isManual: true },
    ],
    campaigns: [
      { id: "c2", name: "Brand Awareness Campaign", status: "Active", impressions: "630K", engagement: "Medium" },
    ],
    metrics: { impressions: "630K", engagement: "Medium", rolesCovered: 2, contentViews: 89 }
  },
  {
    id: "ecoenergy",
    name: "EcoEnergy Solutions",
    status: "Active",
    lastActivity: "2024-11-30",
    industry: "Energy",
    website: "ecoenergy.com",
    keyRoles: [
      { id: "6", title: "Sustainability Director", department: "Sustainability" },
      { id: "7", title: "Chief Operations Officer", department: "Operations" },
      { id: "8", title: "VP of Engineering", department: "Engineering" },
    ],
    activities: [
      { id: "a7", type: "Demo", date: "2024-11-30T13:00:00", description: "Product demo for engineering team", isManual: true },
      { id: "a8", type: "Platform", date: "2024-11-28T08:30:00", description: "Multiple team members viewed solution overview", relatedCampaign: "Brand Awareness", isManual: false },
    ],
    campaigns: [
      { id: "c3", name: "Brand Awareness Campaign", status: "Active", impressions: "450K", engagement: "High" },
    ],
    metrics: { impressions: "450K", engagement: "High", rolesCovered: 3, contentViews: 234 }
  },
  {
    id: "western-minerals",
    name: "Western Minerals Group",
    status: "Active",
    lastActivity: "2024-12-03",
    industry: "Mining",
    website: "westernminerals.com",
    keyRoles: [
      { id: "9", title: "VP of Operations", department: "Operations" },
      { id: "10", title: "CFO", department: "Finance" },
      { id: "11", title: "CTO", department: "Technology" },
    ],
    activities: [
      { id: "a9", type: "Platform", date: "2024-12-03T11:00:00", description: "Watched Future of Mining video", relatedCampaign: "Western Minerals Group", isManual: false },
      { id: "a10", type: "Note", date: "2024-12-02T09:00:00", description: "Added to priority account list for Q1", isManual: true },
    ],
    campaigns: [
      { id: "c4", name: "Western Minerals Group", status: "Active", impressions: "89K", engagement: "High" },
    ],
    metrics: { impressions: "89K", engagement: "High", rolesCovered: 3, contentViews: 45 }
  },
  {
    id: "ironharbor",
    name: "IronHarbor Mining Co.",
    status: "Active",
    lastActivity: "2024-11-28",
    industry: "Mining",
    website: "ironharbor.com",
    keyRoles: [
      { id: "12", title: "Head of Procurement", department: "Procurement" },
      { id: "13", title: "Site Manager", department: "Operations" },
    ],
    activities: [
      { id: "a11", type: "Platform", date: "2024-11-28T14:30:00", description: "Downloaded Heavy Machinery Guide", relatedCampaign: "IronHarbor Mining Co.", isManual: false },
    ],
    campaigns: [
      { id: "c5", name: "IronHarbor Mining Co.", status: "Active", impressions: "52K", engagement: "Medium" },
    ],
    metrics: { impressions: "52K", engagement: "Medium", rolesCovered: 2, contentViews: 28 }
  },
  {
    id: "southern-rail",
    name: "Southern Rail Logistics",
    status: "Inactive",
    lastActivity: "2024-10-15",
    industry: "Transportation",
    website: "southernrail.com",
    keyRoles: [
      { id: "14", title: "Director of Logistics", department: "Logistics" },
      { id: "15", title: "VP of Strategy", department: "Strategy" },
    ],
    activities: [
      { id: "a12", type: "Email", date: "2024-10-15T10:00:00", description: "Sent introductory materials", isManual: true },
    ],
    campaigns: [
      { id: "c6", name: "Southern Rail Logistics", status: "Planned", impressions: "12K", engagement: "Low" },
    ],
    metrics: { impressions: "12K", engagement: "Low", rolesCovered: 2, contentViews: 8 }
  },
];

const activityIcons: Record<string, React.ReactNode> = {
  Meeting: <Users className="w-4 h-4" />,
  Call: <Phone className="w-4 h-4" />,
  Email: <Mail className="w-4 h-4" />,
  Demo: <Video className="w-4 h-4" />,
  Event: <Calendar className="w-4 h-4" />,
  Note: <FileText className="w-4 h-4" />,
  Other: <MoreHorizontal className="w-4 h-4" />,
  Platform: <Zap className="w-4 h-4" />,
};

export default function Targets() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedTarget, setSelectedTarget] = useState<Target | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [activityFilter, setActivityFilter] = useState<string>("all");
  
  const [isAddRoleDialogOpen, setIsAddRoleDialogOpen] = useState(false);
  const [newRoleTitle, setNewRoleTitle] = useState("");
  const [newRoleDepartment, setNewRoleDepartment] = useState("");
  
  const [isAddActivityDialogOpen, setIsAddActivityDialogOpen] = useState(false);
  const [newActivityType, setNewActivityType] = useState<string>("");
  const [newActivityDate, setNewActivityDate] = useState("");
  const [newActivityDescription, setNewActivityDescription] = useState("");
  const [newActivityCampaign, setNewActivityCampaign] = useState("");
  const [newActivityRole, setNewActivityRole] = useState("");

  const filteredTargets = mockTargets.filter(target => {
    const matchesSearch = target.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || target.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const openDrawer = (target: Target) => {
    setSelectedTarget(target);
    setIsDrawerOpen(true);
    setActiveTab("overview");
  };

  const handleDrawerChange = (open: boolean) => {
    setIsDrawerOpen(open);
    if (!open) {
      setSelectedTarget(null);
      setActiveTab("overview");
      setActivityFilter("all");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const handleAddRole = () => {
    if (newRoleTitle.trim() && selectedTarget) {
      console.log("Adding role:", { title: newRoleTitle, department: newRoleDepartment });
      setNewRoleTitle("");
      setNewRoleDepartment("");
      setIsAddRoleDialogOpen(false);
    }
  };

  const handleAddActivity = () => {
    if (newActivityType && newActivityDate && newActivityDescription.trim() && selectedTarget) {
      console.log("Adding activity:", {
        type: newActivityType,
        date: newActivityDate,
        description: newActivityDescription,
        campaign: newActivityCampaign,
        role: newActivityRole
      });
      setNewActivityType("");
      setNewActivityDate("");
      setNewActivityDescription("");
      setNewActivityCampaign("");
      setNewActivityRole("");
      setIsAddActivityDialogOpen(false);
    }
  };

  const filteredActivities = selectedTarget?.activities.filter(activity => {
    if (activityFilter === "all") return true;
    if (activityFilter === "manual") return activity.isManual;
    if (activityFilter === "platform") return !activity.isManual;
    return true;
  }) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Targets</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your target accounts and track engagement</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Target
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by company name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50">
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[140px]">Last Activity</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTargets.map((target) => (
              <TableRow 
                key={target.id} 
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => openDrawer(target)}
              >
                <TableCell>
                  <Avatar className="h-9 w-9 border">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
                      {getInitials(target.name)}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{target.name}</TableCell>
                <TableCell>
                  <Badge 
                    variant={target.status === "Active" ? "default" : "secondary"}
                    className={cn(
                      "font-medium",
                      target.status === "Active" 
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    {target.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(target.lastActivity)}
                </TableCell>
                <TableCell>
                  <button 
                    className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      openDrawer(target);
                    }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredTargets.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No targets found matching your criteria.
          </div>
        )}
      </div>

      <Sheet open={isDrawerOpen} onOpenChange={handleDrawerChange}>
        <SheetContent className="w-full sm:max-w-xl lg:max-w-2xl p-0 overflow-hidden">
          {selectedTarget && (
            <div className="flex flex-col h-full">
              <SheetHeader className="p-6 border-b bg-gray-50/50">
                <div className="flex items-start gap-4">
                  <Avatar className="h-14 w-14 border-2">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                      {getInitials(selectedTarget.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <SheetTitle className="text-xl font-bold truncate">{selectedTarget.name}</SheetTitle>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge 
                        className={cn(
                          "font-medium",
                          selectedTarget.status === "Active" 
                            ? "bg-emerald-100 text-emerald-700" 
                            : "bg-gray-100 text-gray-600"
                        )}
                      >
                        {selectedTarget.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Last activity: {formatDate(selectedTarget.lastActivity)}
                      </span>
                    </div>
                  </div>
                </div>
              </SheetHeader>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-auto p-0">
                  <TabsTrigger 
                    value="overview" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3"
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="keyroles"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Key Roles
                  </TabsTrigger>
                  <TabsTrigger 
                    value="activity"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3"
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    Activity
                  </TabsTrigger>
                  <TabsTrigger 
                    value="campaigns"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3"
                  >
                    <Flag className="w-4 h-4 mr-2" />
                    Campaigns
                  </TabsTrigger>
                </TabsList>

                <div className="flex-1 overflow-y-auto">
                  <TabsContent value="overview" className="m-0 p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Impressions</p>
                          <p className="text-2xl font-bold">{selectedTarget.metrics.impressions}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Engagement</p>
                          <p className="text-2xl font-bold">{selectedTarget.metrics.engagement}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Roles Covered</p>
                          <p className="text-2xl font-bold">{selectedTarget.metrics.rolesCovered}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Content Views</p>
                          <p className="text-2xl font-bold">{selectedTarget.metrics.contentViews}</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-3">Recent Activity</h4>
                      <div className="space-y-3">
                        {selectedTarget.activities.slice(0, 3).map((activity) => (
                          <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center",
                              activity.isManual ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-primary"
                            )}>
                              {activityIcons[activity.type]}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">{activity.description}</p>
                              <p className="text-xs text-muted-foreground mt-1">{formatDateTime(activity.date)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button 
                        variant="ghost" 
                        className="w-full mt-3 text-primary"
                        onClick={() => setActiveTab("activity")}
                      >
                        View all activity
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="keyroles" className="m-0 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-semibold">Key Roles ({selectedTarget.keyRoles.length})</h4>
                      <Button size="sm" className="gap-2" onClick={() => setIsAddRoleDialogOpen(true)}>
                        <Plus className="w-3 h-3" />
                        Add Role
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {selectedTarget.keyRoles.map((role) => (
                        <div 
                          key={role.id} 
                          className="flex items-center justify-between p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors"
                        >
                          <div>
                            <p className="font-medium">{role.title}</p>
                            {role.department && (
                              <p className="text-sm text-muted-foreground">{role.department}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <button className="p-2 hover:bg-gray-100 rounded-md text-gray-500 hover:text-gray-700">
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-red-50 rounded-md text-gray-500 hover:text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="activity" className="m-0 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Select value={activityFilter} onValueChange={setActivityFilter}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter activity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Activity</SelectItem>
                          <SelectItem value="platform">Platform Activity</SelectItem>
                          <SelectItem value="manual">Manual Activity</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button size="sm" className="gap-2" onClick={() => setIsAddActivityDialogOpen(true)}>
                        <Plus className="w-3 h-3" />
                        Add Activity
                      </Button>
                    </div>
                    {filteredActivities.length > 0 ? (
                      <div className="space-y-3">
                        {filteredActivities.map((activity) => (
                          <div 
                            key={activity.id} 
                            className="flex items-start gap-3 p-4 border rounded-lg bg-white"
                          >
                            <div className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                              activity.isManual ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-primary"
                            )}>
                              {activityIcons[activity.type]}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-medium uppercase text-muted-foreground">{activity.type}</span>
                                    {activity.isManual && (
                                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">Manual</Badge>
                                    )}
                                  </div>
                                  <p className="text-sm font-medium">{activity.description}</p>
                                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                                    <span>{formatDateTime(activity.date)}</span>
                                    {activity.relatedCampaign && (
                                      <span className="flex items-center gap-1">
                                        <Flag className="w-3 h-3" />
                                        {activity.relatedCampaign}
                                      </span>
                                    )}
                                    {activity.relatedRole && (
                                      <span className="flex items-center gap-1">
                                        <Users className="w-3 h-3" />
                                        {activity.relatedRole}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                {activity.isManual && (
                                  <div className="flex items-center gap-1">
                                    <button className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500 hover:text-gray-700">
                                      <Pencil className="w-3.5 h-3.5" />
                                    </button>
                                    <button className="p-1.5 hover:bg-red-50 rounded-md text-gray-500 hover:text-red-600">
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Activity className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p>No {activityFilter === "manual" ? "manual" : activityFilter === "platform" ? "platform" : ""} activities found.</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="campaigns" className="m-0 p-6">
                    <h4 className="text-sm font-semibold mb-4">Related Campaigns ({selectedTarget.campaigns.length})</h4>
                    {selectedTarget.campaigns.length > 0 ? (
                      <div className="space-y-3">
                        {selectedTarget.campaigns.map((campaign) => (
                          <Card key={campaign.id} className="overflow-hidden">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h5 className="font-semibold">{campaign.name}</h5>
                                  <Badge 
                                    variant="secondary"
                                    className={cn(
                                      "mt-1 text-xs",
                                      campaign.status === "Active" && "bg-emerald-100 text-emerald-700",
                                      campaign.status === "Completed" && "bg-blue-100 text-blue-700",
                                      campaign.status === "Planned" && "bg-amber-100 text-amber-700"
                                    )}
                                  >
                                    {campaign.status}
                                  </Badge>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                  <p className="text-xs text-muted-foreground uppercase">Impressions</p>
                                  <p className="font-semibold">{campaign.impressions}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground uppercase">Engagement</p>
                                  <p className="font-semibold">{campaign.engagement}</p>
                                </div>
                              </div>
                              <Link href="/analytics">
                                <Button variant="outline" size="sm" className="w-full gap-2">
                                  View Dashboard
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </Button>
                              </Link>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Flag className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p>No campaigns associated with this target.</p>
                      </div>
                    )}
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={isAddRoleDialogOpen} onOpenChange={setIsAddRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Key Role</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="role-title">Job Title</Label>
              <Input
                id="role-title"
                placeholder="e.g., VP of Operations"
                value={newRoleTitle}
                onChange={(e) => setNewRoleTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role-department">Department (optional)</Label>
              <Input
                id="role-department"
                placeholder="e.g., Operations"
                value={newRoleDepartment}
                onChange={(e) => setNewRoleDepartment(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRoleDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddRole} disabled={!newRoleTitle.trim()}>Add Role</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddActivityDialogOpen} onOpenChange={setIsAddActivityDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Activity</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="activity-type">Activity Type</Label>
              <Select value={newActivityType} onValueChange={setNewActivityType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Meeting">Meeting</SelectItem>
                  <SelectItem value="Call">Call</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="Demo">Demo</SelectItem>
                  <SelectItem value="Event">Event</SelectItem>
                  <SelectItem value="Note">Note</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="activity-date">Date & Time</Label>
              <Input
                id="activity-date"
                type="datetime-local"
                value={newActivityDate}
                onChange={(e) => setNewActivityDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="activity-description">Description</Label>
              <Textarea
                id="activity-description"
                placeholder="Describe the activity..."
                value={newActivityDescription}
                onChange={(e) => setNewActivityDescription(e.target.value)}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="activity-campaign">Related Campaign (optional)</Label>
                <Select value={newActivityCampaign} onValueChange={setNewActivityCampaign}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedTarget?.campaigns.map((c) => (
                      <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="activity-role">Related Key Role (optional)</Label>
                <Select value={newActivityRole} onValueChange={setNewActivityRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedTarget?.keyRoles.map((r) => (
                      <SelectItem key={r.id} value={r.title}>{r.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddActivityDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleAddActivity} 
              disabled={!newActivityType || !newActivityDate || !newActivityDescription.trim()}
            >
              Add Activity
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
