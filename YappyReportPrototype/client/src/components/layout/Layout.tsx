import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Bell, Search, ChevronDown, ChevronRight, Home, Target, Flag, BookOpen, BarChart3, Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useState, type ReactNode } from "react";

export function TopNav() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6">
      {/* Left: Logo */}
      <div className="flex items-center w-20">
        <Link href="/" className="text-2xl font-bold text-primary tracking-tight">Yappy</Link>
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
  icon?: ReactNode;
  active?: boolean;
  hasSubItems?: boolean;
  onClick?: () => void;
  isOpen?: boolean;
  isCollapsed?: boolean;
}

function NavItem({ href, label, icon, active, hasSubItems, onClick, isOpen, isCollapsed }: NavItemProps) {
  return (
    <Link href={href} className={cn(
      "flex items-center justify-between transition-all relative group rounded-lg",
      isCollapsed 
        ? "px-3 py-2.5 mx-1.5"
        : "px-4 py-2.5 text-sm font-medium mx-3",
      active 
        ? "text-primary bg-[#FFF7F0] font-semibold border-l-[3px] border-primary" 
        : "text-gray-600 hover:bg-[#F5F5F5] border-l-[3px] border-transparent"
    )}>
      <div className="flex items-center gap-3">
        {icon && (
          <span className={cn("transition-colors flex-shrink-0", active ? "text-primary" : "text-gray-400 group-hover:text-gray-600")}>
            {icon}
          </span>
        )}
        {!isCollapsed && <span className="whitespace-nowrap">{label}</span>}
      </div>
      {!isCollapsed && hasSubItems && (
        <div onClick={(e) => { e.preventDefault(); onClick?.(); }} className="cursor-pointer p-1 hover:bg-black/5 rounded">
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-400" />
          )}
        </div>
      )}
    </Link>
  );
}

function SubNavItem({ href, label, active }: { href: string, label: string, active?: boolean }) {
  return (
    <Link href={href} className={cn(
      "block py-2 pl-11 pr-4 text-[13px] transition-colors ml-6 mr-3 rounded-md",
      active 
        ? "text-primary font-medium bg-[#FFF7F0]" 
        : "text-gray-500 hover:text-gray-700 hover:bg-[#F5F5F5]"
    )}>
      {label}
    </Link>
  );
}

export function Sidebar() {
  const [location] = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [targetsOpen, setTargetsOpen] = useState(false);
  const [campaignsOpen, setCampaignsOpen] = useState(false);
  const [contentOpen, setContentOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button for collapsed state */}
      {!isExpanded && (
        <button 
          onClick={() => setIsExpanded(true)}
          className="fixed top-20 left-3 z-35 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Expand menu"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
      )}

      {/* Overlay when expanded */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 top-16"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "bg-white border-r border-gray-100 fixed top-16 bottom-0 left-0 z-40 overflow-y-auto py-4 transition-all duration-300 ease-out",
        isExpanded 
          ? "w-64" 
          : "w-20"
      )}>
        {/* Close button when expanded */}
        {isExpanded && (
          <button 
            onClick={() => setIsExpanded(false)}
            className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Collapse menu"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        )}

        <nav className={cn("space-y-0.5", isExpanded ? "mt-0" : "mt-2")}>
          <NavItem 
            href="/dashboard" 
            label="Dashboard" 
            icon={<Home className="w-4 h-4" />}
            active={location === "/dashboard"} 
            isCollapsed={!isExpanded}
          />
          
          <div className={isExpanded ? "mt-4" : "mt-6"}>
            <NavItem 
              href="/targets" 
              label="Targets" 
              icon={<Target className="w-4 h-4" />}
              active={location.startsWith("/targets")}
              hasSubItems
              isOpen={targetsOpen}
              onClick={() => setTargetsOpen(!targetsOpen)}
              isCollapsed={!isExpanded}
            />
            {isExpanded && targetsOpen && (
              <div className="mt-1 space-y-0.5 pb-1">
                <SubNavItem 
                  href="/targets" 
                  label="All Targets" 
                  active={location === "/targets"}
                />
                <SubNavItem 
                  href="/targets/lists" 
                  label="Target Lists" 
                  active={location === "/targets/lists"}
                />
              </div>
            )}
          </div>

          <div className={isExpanded ? "mt-4" : "mt-6"}>
            <NavItem 
              href="/campaigns" 
              label="Campaigns" 
              icon={<Flag className="w-4 h-4" />}
              active={location.startsWith("/campaigns")}
              hasSubItems
              isOpen={campaignsOpen}
              onClick={() => setCampaignsOpen(!campaignsOpen)}
              isCollapsed={!isExpanded}
            />
            {isExpanded && campaignsOpen && (
              <div className="mt-1 space-y-0.5 pb-1">
                <SubNavItem 
                  href="/campaigns" 
                  label="All Campaigns" 
                  active={location === "/campaigns"}
                />
                <SubNavItem 
                  href="/campaigns/builder" 
                  label="Campaign Builder" 
                  active={location === "/campaigns/builder"}
                />
              </div>
            )}
          </div>

          <div className={isExpanded ? "mt-4" : "mt-6"}>
            <NavItem 
              href="/content" 
              label="Content" 
              icon={<BookOpen className="w-4 h-4" />}
              active={location.startsWith("/content")}
              hasSubItems
              isOpen={contentOpen}
              onClick={() => setContentOpen(!contentOpen)}
              isCollapsed={!isExpanded}
            />
            {isExpanded && contentOpen && (
              <div className="mt-1 space-y-0.5 pb-1">
                <SubNavItem 
                  href="/content/library" 
                  label="Content Library" 
                  active={location === "/content/library"}
                />
                <SubNavItem 
                  href="/content/upload" 
                  label="Upload/Create" 
                  active={location === "/content/upload"}
                />
              </div>
            )}
          </div>

          <div className={isExpanded ? "mt-4" : "mt-6"}>
            <NavItem 
              href="/analytics" 
              label="Analytics" 
              icon={<BarChart3 className="w-4 h-4" />}
              active={location.startsWith("/analytics")}
              hasSubItems
              isOpen={analyticsOpen}
              onClick={() => setAnalyticsOpen(!analyticsOpen)}
              isCollapsed={!isExpanded}
            />
            {isExpanded && analyticsOpen && (
              <div className="mt-1 space-y-0.5 pb-1">
                <SubNavItem 
                  href="/analytics/campaigns" 
                  label="Campaign Performance" 
                  active={location === "/analytics/campaigns"}
                />
                <SubNavItem 
                  href="/analytics/targets" 
                  label="Target Analytics" 
                  active={location === "/analytics/targets"}
                />
                <SubNavItem 
                  href="/analytics/content" 
                  label="Content Performance" 
                  active={location === "/analytics/content"}
                />
              </div>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <TopNav />
      <Sidebar />
      <main className="pl-20 pt-16 min-h-screen">
        <div className="p-8 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
