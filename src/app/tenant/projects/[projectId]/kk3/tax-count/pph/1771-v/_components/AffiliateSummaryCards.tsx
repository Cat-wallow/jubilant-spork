"use client";

import { Card } from "@/components/ui/card";
import { getTotalInvestment, getCompanyCount, getMajorityShareholding } from "../_data/mock-data";

export function AffiliateSummaryCards() {
  const totalInvestment = getTotalInvestment();
  const companyCount = getCompanyCount();
  const majority = getMajorityShareholding();

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString("id-ID")}`;
  };

  return (
    <div className="flex gap-[30px]">
      <Card className="flex-1 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
        <div className="space-y-2">
          <div className="text-sm text-gray-500">Total Penyertaan</div>
          <div className="text-xl font-normal tracking-tight">
            {formatCurrency(totalInvestment)}
          </div>
          <div className="text-xs text-blue-600">{companyCount} Perusahaan afiliasi</div>
        </div>
      </Card>

      <Card className="flex-1 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-4">
        <div className="space-y-2">
          <div className="text-sm text-gray-500">Mayoritas Saham</div>
          <div className="text-xl font-normal tracking-tight">{majority.percentage}%</div>
          <div className="text-xs text-green-600">{majority.company}</div>
        </div>
      </Card>

      <Card className="flex-1 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-50 p-4">
        <div className="space-y-2">
          <div className="text-sm text-gray-500">Status Kontrol</div>
          <div className="text-xl font-normal tracking-tight">Holding</div>
          <div className="text-xs text-purple-600">Company structure</div>
        </div>
      </Card>
    </div>
  );
}
