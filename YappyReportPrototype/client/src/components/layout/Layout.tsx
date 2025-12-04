import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Bell, Search, Home, Target, Flag, BookOpen, BarChart3 } from "lucide-react";
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
  icon: ReactNode;
  active?: boolean;
  isCollapsed?: boolean;
  onNavigate?: () => void;
}

function NavItem({ href, label, icon, active, isCollapsed, onNavigate }: NavItemProps) {
  return (
    <Link 
      href={href} 
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 transition-all relative group rounded-lg",
        isCollapsed 
          ? "px-3 py-2.5 mx-1.5 justify-center"
          : "px-4 py-2.5 text-sm font-medium mx-3",
        active 
          ? "text-primary bg-[#FFF7F0] font-semibold border-l-[3px] border-primary" 
          : "text-gray-600 hover:bg-[#F5F5F5] border-l-[3px] border-transparent"
      )}
    >
      <span className={cn("transition-colors flex-shrink-0", active ? "text-primary" : "text-gray-400 group-hover:text-gray-600")}>
        {icon}
      </span>
      {!isCollapsed && <span className="whitespace-nowrap">{label}</span>}
    </Link>
  );
}

export function Sidebar() {
  const [location] = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
    { href: "/targets", label: "Targets", icon: <Target className="w-4 h-4" /> },
    { href: "/campaigns", label: "Campaigns", icon: <Flag className="w-4 h-4" /> },
    { href: "/content", label: "Content", icon: <BookOpen className="w-4 h-4" /> },
    { href: "/analytics", label: "Analytics", icon: <BarChart3 className="w-4 h-4" /> },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return location === "/" || location === "/dashboard";
    }
    return location.startsWith(href);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
  };

  return (
    <>
      {/* Overlay when expanded - click to collapse */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/10 z-30 top-16"
          onClick={handleCollapse}
        />
      )}

      {/* Sidebar - expands on hover, collapses on click */}
      <aside 
        className={cn(
          "bg-white border-r border-gray-100 fixed top-16 bottom-0 left-0 z-40 overflow-y-auto py-4 transition-all duration-300 ease-out cursor-pointer",
          isExpanded ? "w-64" : "w-20"
        )}
        onMouseEnter={() => setIsExpanded(true)}
        onClick={handleCollapse}
      >
        <nav className="space-y-0.5">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={isActive(item.href)}
              isCollapsed={!isExpanded}
              onNavigate={handleCollapse}
            />
          ))}
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
