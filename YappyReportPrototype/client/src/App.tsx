import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Placeholder from "@/pages/Placeholder";
import { Layout } from "@/components/layout/Layout";
import { useEffect } from "react";

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
        <Route path="/campaigns">
           <Placeholder title="All Campaigns" />
        </Route>
        <Route path="/campaigns/new">
           <Placeholder title="Create New Campaign" />
        </Route>
        <Route path="/campaigns/edit">
           <Placeholder title="Edit Campaign" />
        </Route>
        <Route path="/reporting">
           <Placeholder title="Reporting Overview" />
        </Route>
        <Route path="/reporting/always-on">
           <Placeholder title="Always On Campaigns" />
        </Route>
        <Route path="/reporting/tactical">
           <Placeholder title="Tactical Campaigns" />
        </Route>
        <Route path="/creative">
           <Placeholder title="Creative Overview" />
        </Route>
        <Route path="/creative/library">
           <Placeholder title="Content Library" />
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
