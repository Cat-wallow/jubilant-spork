import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface StatusCardProps {
  status: string;
  completeness: number;
  totalTax: number;
  dataSource: string;
}

export function StatusCard({ status, completeness, totalTax, dataSource }: StatusCardProps) {
  return (
    <Card className="border-[0.8px] border-[rgba(145,158,171,0.20)] bg-white rounded-[10px] px-6 py-0 flex items-center justify-between h-[101.6px]">
      <div className="flex items-center gap-4">
        <Clock className="w-4 h-4 text-[#D08700] flex-shrink-0" />
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-base font-normal text-[#0A0A0A]">Status:</span>
            <Badge className="bg-[#F59E0B] text-white border-[0.8px] border-transparent rounded-lg px-2 py-0.5 text-xs font-normal h-auto">
              {status}
            </Badge>
          </div>
          <p className="text-sm font-normal text-[#717182]">
            Auto-filled from {dataSource} • Completeness: {completeness}%
          </p>
        </div>
      </div>
      
      <div className="flex flex-col items-end gap-0">
        <p className="text-2xl font-bold text-[#1C398E]">
          Rp {totalTax.toLocaleString("id-ID")}
        </p>
        <p className="text-sm font-normal text-[#717182]">Total Pajak</p>
      </div>
    </Card>
  );
}
