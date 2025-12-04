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
        <Route path="/targets" component={() => <Placeholder title="Targets" />} />
        <Route path="/campaigns" component={() => <Placeholder title="Campaigns" />} />
        <Route path="/content" component={() => <Placeholder title="Content" />} />
        <Route path="/analytics" component={() => <Placeholder title="Analytics" />} />
        <Route path="/targets/:id" component={TargetDashboardRoute} />
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
