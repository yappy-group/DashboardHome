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
        
        {/* Targets Routes */}
        <Route path="/targets">
           <Placeholder title="All Targets" />
        </Route>
        <Route path="/targets/:id" component={TargetDashboardRoute} />
        
        {/* Campaigns Routes */}
        <Route path="/campaigns">
           <Placeholder title="Campaigns Home" />
        </Route>
        <Route path="/campaigns/always-on">
           <Placeholder title="Always On Campaigns" />
        </Route>
        <Route path="/campaigns/tactical">
           <Placeholder title="Tactical Campaigns" />
        </Route>
        
        {/* Creative Routes */}
        <Route path="/creative/library">
           <Placeholder title="Content Library" />
        </Route>
        <Route path="/creative/messaging">
           <Placeholder title="Messaging Strategy" />
        </Route>
        <Route path="/creative/add">
           <Placeholder title="Add Content" />
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
