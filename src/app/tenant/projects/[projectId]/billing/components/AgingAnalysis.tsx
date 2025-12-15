"use client";

import { Badge } from "@/components/ui/badge";
import { AgingData } from "../data/invoices";

interface AgingAnalysisProps {
  data: AgingData[];
}

export function AgingAnalysis({ data }: AgingAnalysisProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex w-[450px] flex-col gap-[30px] rounded-[15px] border border-[#D9D9D9] p-6 shadow-md">
      <div className="flex flex-col">
        <h3 className="font-roboto text-base font-medium leading-6 text-[#404040]">
          Aging Analysis
        </h3>
        <p className="font-roboto text-xs font-normal leading-4 text-[#8C8C8C]">
          Invoice aging by payment status
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {data.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-5">
            <Badge
              variant="outline"
              className="w-fit rounded-[5px] border border-[rgba(145,158,171,0.20)] font-inter text-xs font-normal text-[#404040]"
            >
              {item.count} Invoice
            </Badge>

            <div className="flex flex-col gap-[5px]">
              {/* Progress bars */}
              <div className="flex flex-col">
                <div
                  className="h-2.5 rounded-full bg-[#05CD99]"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="font-inter text-xs font-normal text-[#6E7184]">
                  {item.label}
                </span>
                <span className="font-inter text-xs font-normal text-[#6E7184]">
                  {formatCurrency(item.amount)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
