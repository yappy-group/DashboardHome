import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Bell, Search, ChevronDown, ChevronRight, Home, Target, BarChart2, Image } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function TopNav() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6">
      {/* Left: Logo */}
      <div className="flex items-center w-64">
        <Link href="/">
          <a className="text-2xl font-bold text-primary tracking-tight">Yappy</a>
        </Link>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search accounts, campaigns, content, reports…" 
            className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4 w-64 justify-end">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-8 w-px bg-gray-200 mx-1" />
        <button className="flex items-center gap-3 hover:bg-gray-50 p-1.5 rounded-full pr-3 transition-colors">
          <Avatar className="h-8 w-8 border border-gray-200">
            <AvatarFallback className="bg-primary/10 text-primary font-medium">TS</AvatarFallback>
          </Avatar>
        </button>
      </div>
    </header>
  );
}

interface NavItemProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  hasSubItems?: boolean;
  onClick?: () => void;
  isOpen?: boolean;
}

function NavItem({ href, label, icon, active, hasSubItems, onClick, isOpen }: NavItemProps) {
  return (
    <Link href={href}>
      <a className={cn(
        "flex items-center justify-between px-4 py-3 text-sm font-medium mr-4 transition-all relative group mb-1",
        active 
          ? "text-primary bg-gradient-to-b from-white to-[#FFF3E5] border-l-[3px] border-primary font-bold" 
          : "text-gray-600 bg-gradient-to-b from-white to-[#F9F4EF] hover:to-[#FFF3E5] border-l-[3px] border-transparent"
      )}>
        <div className="flex items-center gap-3">
          {icon && (
            <span className={cn("transition-colors", active ? "text-primary" : "text-gray-500 group-hover:text-primary")}>
              {icon}
            </span>
          )}
          <span>{label}</span>
        </div>
        {hasSubItems && (
          <div onClick={(e) => { e.preventDefault(); onClick?.(); }} className="cursor-pointer p-1 hover:bg-black/5 rounded">
            {isOpen ? (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-400" />
            )}
          </div>
        )}
      </a>
    </Link>
  );
}

function SubNavItem({ href, label, active }: { href: string, label: string, active?: boolean }) {
  return (
    <Link href={href}>
      <a className={cn(
        "block py-2 pl-12 pr-4 text-sm transition-colors border-l border-gray-100 ml-6 mb-0.5 rounded-r-md",
        active 
          ? "text-primary font-medium bg-orange-50/30" 
          : "text-gray-500 hover:text-gray-900 hover:bg-[#F3F3F3] font-normal"
      )}>
        {label}
      </a>
    </Link>
  );
}

export function Sidebar() {
  const [location] = useLocation();
  const [campaignsOpen, setCampaignsOpen] = useState(true);
  const [reportingOpen, setReportingOpen] = useState(true);
  const [creativeOpen, setCreativeOpen] = useState(true);

  return (
    <aside className="w-64 bg-[#F5F5F5] border-r border-gray-200 fixed top-16 bottom-0 left-0 z-40 overflow-y-auto py-6">
      <nav className="space-y-1">
        <NavItem 
          href="/" 
          label="Home" 
          icon={<Home className="w-4 h-4" />}
          active={location === "/"} 
        />
        
        <div className="pt-2">
          <NavItem 
            href="/campaigns" 
            label="Campaigns" 
            icon={<Target className="w-4 h-4" />}
            active={location.startsWith("/campaigns")}
            hasSubItems
            isOpen={campaignsOpen}
            onClick={() => setCampaignsOpen(!campaignsOpen)}
          />
          {campaignsOpen && (
            <div className="mt-1 space-y-0.5 pb-2">
              <SubNavItem 
                href="/campaigns/new" 
                label="Create New Campaign" 
                active={location === "/campaigns/new"}
              />
              <SubNavItem 
                href="/campaigns/edit" 
                label="Edit Campaign" 
                active={location === "/campaigns/edit"}
              />
            </div>
          )}
        </div>

        <div className="pt-2">
          <NavItem 
            href="/reporting" 
            label="Reporting" 
            icon={<BarChart2 className="w-4 h-4" />}
            active={location.startsWith("/reporting")}
            hasSubItems
            isOpen={reportingOpen}
            onClick={() => setReportingOpen(!reportingOpen)}
          />
          {reportingOpen && (
            <div className="mt-1 space-y-0.5 pb-2">
              <SubNavItem 
                href="/reporting/always-on" 
                label="Always On Campaigns" 
                active={location === "/reporting/always-on"}
              />
              <SubNavItem 
                href="/reporting/tactical" 
                label="Tactical Campaigns" 
                active={location === "/reporting/tactical"}
              />
            </div>
          )}
        </div>

        <div className="pt-2">
          <NavItem 
            href="/creative" 
            label="Creative" 
            icon={<Image className="w-4 h-4" />}
            active={location.startsWith("/creative")}
            hasSubItems
            isOpen={creativeOpen}
            onClick={() => setCreativeOpen(!creativeOpen)}
          />
          {creativeOpen && (
            <div className="mt-1 space-y-0.5 pb-2">
              <SubNavItem 
                href="/creative/library" 
                label="Content Library" 
                active={location === "/creative/library"}
              />
              <SubNavItem 
                href="/creative/add" 
                label="Add Content" 
                active={location === "/creative/add"}
              />
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <TopNav />
      <Sidebar />
      <main className="pl-64 pt-16 min-h-screen">
        <div className="p-8 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
