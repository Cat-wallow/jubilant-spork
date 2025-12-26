"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { analyticsData, tenantManagementData } from "../data/platformDashboardData";
import { TrendingUp, Users, FileText, Zap } from "lucide-react";

export function AnalyticsTabContent() {
  return (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Growth Rate</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">+{analyticsData.growthRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">{analyticsData.activeUsers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Documents</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">{(analyticsData.documents / 1000).toFixed(1)}K</p>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600">API Calls</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">{(analyticsData.apiCalls / 1000).toFixed(0)}K</p>
              </div>
              <Zap className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center rounded-lg bg-gray-50 py-16 text-center">
            <p className="text-sm text-gray-500">Analytics charts would be displayed here</p>
          </div>
        </CardContent>
      </Card>

      {/* Tenant Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Tenant Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tenantManagementData.map((tenant) => (
              <div key={tenant.id} className="rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{tenant.name}</h4>
                    <p className="text-xs text-gray-500">
                      {tenant.plan} • {tenant.users} users
                    </p>
                  </div>
                  <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    {tenant.status}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Storage</span>
                    <span className="font-semibold text-gray-900">
                      {tenant.storage.used}GB / {tenant.storage.total}GB
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full bg-blue-600"
                      style={{ width: `${(tenant.storage.used / tenant.storage.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
