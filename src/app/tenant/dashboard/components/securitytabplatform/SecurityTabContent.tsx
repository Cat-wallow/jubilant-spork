"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { securityData } from "../data/platformDashboardData";
import { CheckCircle2, AlertCircle, Zap } from "lucide-react";

export function SecurityTabContent() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-red-200 bg-red-50";
      case "medium":
        return "border-yellow-200 bg-yellow-50";
      case "low":
        return "border-green-200 bg-green-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-red-400 bg-red-100 text-red-800";
      case "medium":
        return "border-yellow-400 bg-yellow-100 text-yellow-800";
      case "low":
        return "border-green-400 bg-green-100 text-green-800";
      default:
        return "border-gray-400 bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Security Score</p>
                <p className="mt-2 text-3xl font-bold text-green-600">{securityData.securityScore}/100</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Active Alerts</p>
                <p className="mt-2 text-3xl font-bold text-yellow-600">{securityData.activeAlerts}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Uptime</p>
                <p className="mt-2 text-3xl font-bold text-blue-600">{securityData.uptime}%</p>
              </div>
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Security Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {securityData.recommendations.map((rec) => (
              <div key={rec.id} className={`flex items-start gap-4 rounded-lg border p-4 ${getSeverityColor(rec.severity)}`}>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{rec.title}</p>
                </div>
                <span className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium ${getSeverityBadgeColor(rec.severity)}`}>
                  {rec.severity.charAt(0).toUpperCase() + rec.severity.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
