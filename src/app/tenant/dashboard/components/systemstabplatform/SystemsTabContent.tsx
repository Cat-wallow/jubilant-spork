"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { systemsHealthData, systemMetricsData, recentActivityData } from "../data/platformDashboardData";

export function SystemsTabContent() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-600";
      case "warning":
        return "text-yellow-600";
      case "critical":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "critical":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Health Card */}
      <Card>
        <CardHeader>
          <CardTitle>Systems Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Overall Health</span>
              <span className={`text-2xl font-bold ${getStatusColor("healthy")}`}>
                {systemsHealthData.overallHealth}%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-blue-600"
                style={{ width: `${systemsHealthData.overallHealth}%` }}
              />
            </div>

            {/* Health Metrics Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              {systemsHealthData.metrics.map((metric) => (
                <div key={metric.label} className="rounded-lg bg-gray-50 p-6 text-center">
                  <p className="text-sm text-gray-600">{metric.label}</p>
                  <p className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                    {metric.value}
                    {metric.unit && metric.unit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Metrics Card */}
      <Card>
        <CardHeader>
          <CardTitle>System Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemMetricsData.map((metric) => (
              <div key={metric.label} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{metric.label}</span>
                <div className="flex items-center gap-3">
                  <span className={`font-semibold ${getStatusColor(metric.status)}`}>
                    {metric.value}
                    {metric.unit}
                  </span>
                  <div className={`h-2 w-2 rounded-full ${getStatusDotColor(metric.status)}`} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Card */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivityData.map((activity) => (
              <div key={activity.id} className="flex gap-4 border-b pb-4 last:border-b-0">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                      {activity.type}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
