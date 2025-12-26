"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { SystemsTabContent } from "./systemstabplatform/SystemsTabContent";
import { SecurityTabContent } from "./securitytabplatform/SecurityTabContent";
import { AnalyticsTabContent } from "./analyticstabplatform/AnalyticsTabContent";
import { adminStatsData } from "./data/platformDashboardData";

export function PlatformDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-500">Dashboard</p>
        <h1 className="text-4xl font-bold text-gray-900">Dashboard Admin Platform</h1>
      </div>

      {/* Admin Stats Cards */}
      <div className="grid gap-6 md:grid-cols-5">
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-500">Total Tenants</p>
            <p className="text-3xl font-bold text-gray-900">{adminStatsData.totalTenants}</p>
            <p className="text-xs text-green-600 font-semibold">
              {adminStatsData.activeTenants} active
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-500">Total Users</p>
            <p className="text-3xl font-bold text-gray-900">{adminStatsData.totalUsers}</p>
            <p className="text-xs text-green-600 font-semibold">
              Across all tenants
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-500">Total Projects</p>
            <p className="text-3xl font-bold text-gray-900">{adminStatsData.totalProjects}</p>
            <p className="text-xs text-green-600 font-semibold">
              {adminStatsData.activeClients} Clients
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-500">Storage Usage</p>
            <p className="text-3xl font-bold text-gray-900">{adminStatsData.storageUsage.percentage}%</p>
            <p className="text-xs text-green-600 font-semibold">
              {adminStatsData.storageUsage.used}GB / {adminStatsData.storageUsage.total}GB
            </p>
          </div>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="systems" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="systems">Systems</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="systems" className="mt-6">
          <SystemsTabContent />
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <SecurityTabContent />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <AnalyticsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
