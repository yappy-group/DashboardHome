import { Link } from "wouter";
import { ArrowLeft, Users, TrendingUp, Activity, BarChart3 } from "lucide-react";

interface TargetDashboardProps {
  id: string;
}

export default function TargetDashboard({ id }: TargetDashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Back to Home */}
      <Link href="/targets" className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium mb-6 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to All Targets
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Target Profile</h1>
        <p className="text-gray-600">Target ID: {id}</p>
      </div>

      {/* Target Metadata */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Target Metadata
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Target Name</p>
            <p className="text-base font-medium text-gray-900">Enterprise Account {id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Industry</p>
            <p className="text-base font-medium text-gray-900">Technology</p>
          </div>
        </div>
      </div>

      {/* Hero Metrics */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          Target Hero Metrics
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">Engagement Score</p>
            <p className="text-2xl font-bold text-primary">8.5/10</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">Content Interactions</p>
            <p className="text-2xl font-bold text-gray-900">324</p>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Target Activity Feed
        </h2>
        <div className="space-y-4">
          <div className="pb-4 border-b border-gray-100 last:border-b-0">
            <p className="text-sm text-gray-600">Recent activity will appear here</p>
          </div>
        </div>
      </div>

      {/* Tactical Performance */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Tactical Performance
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-600">Tactical campaign performance data will be displayed here</p>
        </div>
      </div>

      {/* Always On Contributions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Always On Contributions
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-600">Always On campaign contributions will be displayed here</p>
        </div>
      </div>
    </div>
  );
}
