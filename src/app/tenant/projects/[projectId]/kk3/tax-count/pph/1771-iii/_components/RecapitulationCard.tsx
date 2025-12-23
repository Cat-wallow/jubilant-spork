"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { recapitulationData } from "../_data/mock-data";

export function RecapitulationCard() {
  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString("id-ID")}`;
  };

  return (
    <Card className="flex-1 border-gray-200">
      <CardHeader className="pb-6">
        <CardTitle className="text-base font-bold">
          Rekapitulasi per Kode Penghasilan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recapitulationData.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between rounded-lg ${item.bgColor} p-3`}
          >
            <div className="flex-1">
              <div className="font-normal text-sm">{item.title}</div>
              <div className="text-xs text-gray-500">{item.description}</div>
            </div>
            <div className="font-mono text-sm">{formatCurrency(item.amount)}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
