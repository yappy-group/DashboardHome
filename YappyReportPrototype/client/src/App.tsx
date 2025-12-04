import { Switch, Route, useLocation, useRoute } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Placeholder from "@/pages/Placeholder";
import CampaignDashboard from "@/pages/CampaignDashboard";
import TargetDashboard from "@/pages/TargetDashboard";
import { Layout } from "@/components/layout/Layout";
import { useEffect } from "react";

function TargetDashboardRoute() {
  const [, params] = useRoute("/targets/:id");
  return <TargetDashboard id={params?.id || ""} />;
}

function Router() {
  const [location, setLocation] = useLocation();

  // Redirect /report to / for backward compatibility if needed, or just handle it
  useEffect(() => {
    if (location === "/report") {
      setLocation("/");
    }
  }, [location, setLocation]);

  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/dashboard" component={Home} />
        
        {/* Targets Routes */}
        <Route path="/targets">
           <Placeholder title="All Targets" />
        </Route>
        <Route path="/targets/lists">
           <Placeholder title="Target Lists" />
        </Route>
        <Route path="/targets/:id" component={TargetDashboardRoute} />
        
        {/* Campaigns Routes */}
        <Route path="/campaigns">
           <Placeholder title="All Campaigns" />
        </Route>
        <Route path="/campaigns/builder">
           <Placeholder title="Campaign Builder" />
        </Route>
        
        {/* Content Routes */}
        <Route path="/content/library">
           <Placeholder title="Content Library" />
        </Route>
        <Route path="/content/upload">
           <Placeholder title="Upload/Create" />
        </Route>
        
        {/* Analytics Routes */}
        <Route path="/analytics/campaigns">
           <Placeholder title="Campaign Performance" />
        </Route>
        <Route path="/analytics/targets">
           <Placeholder title="Target Analytics" />
        </Route>
        <Route path="/analytics/content">
           <Placeholder title="Content Performance" />
        </Route>
        
        {/* Fallback */}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
