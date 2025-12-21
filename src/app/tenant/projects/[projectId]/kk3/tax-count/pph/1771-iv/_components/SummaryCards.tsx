"use client";

import { Card } from "@/components/ui/card";

export function SummaryCards() {
  return (
    <div className="flex gap-[30px]">
      <Card className="flex-1 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
        <div className="space-y-2">
          <div className="text-sm text-gray-500">Total PPh Final</div>
          <div className="text-2xl font-normal tracking-tight">Rp 6.100.000</div>
          <div className="text-xs text-blue-600">Dari penghasilan final</div>
        </div>
      </Card>

      <Card className="flex-1 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-6">
        <div className="space-y-2">
          <div className="text-sm text-gray-500">Non-Objek Pajak</div>
          <div className="text-2xl font-normal tracking-tight">Nihil</div>
          <div className="text-xs text-green-600">Tidak ada penghasilan</div>
        </div>
      </Card>
    </div>
  );
}
