"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, CheckCircle2, Shield } from "lucide-react";

export function DataSourceCard() {
  return (
    <Card className="flex-1 border-gray-200">
      <CardHeader className="pb-6">
        <CardTitle className="text-base font-bold">
          Data Source Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 rounded-lg bg-gray-100/30 p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
            <Database className="h-4 w-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-500">Auto-imported</div>
            <div className="text-sm text-blue-600">From Bukti Potong</div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-gray-100/30 p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-500">Validation Status</div>
            <div className="text-sm text-green-600">Verified</div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-gray-100/30 p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
            <Shield className="h-4 w-4 text-purple-600" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-500">Tax Compliance</div>
            <div className="text-sm text-purple-600">Complete</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
