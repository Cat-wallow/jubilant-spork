"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import { trialBalanceData } from "./data";
import { ReportFilters } from "./components/report-filters";

export function TrialBalanceTab() {
  return (
    <div className="flex flex-col gap-5 self-stretch rounded-[20px] shadow-[0_1px_2px_0_rgba(0,0,0,0.3),0_1px_3px_1px_rgba(0,0,0,0.15)]">
      <div className="flex items-start justify-between self-stretch">
        <div className="flex flex-col">
          <h2 className="font-dm-sans text-2xl font-bold leading-8 tracking-[-0.48px] text-[#2B3674]">
            Trial Balance
          </h2>
          <p className="font-roboto text-xs leading-4 tracking-[0.4px] text-[#2B3674]">
            Kelola Invoice di dalam Project
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            className="flex items-center gap-1 rounded-[10px] border border-[#D9D9D9]"
          >
            <Download className="h-[30px] w-[30px] text-[#404040]" />
            <span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">
              Export XLSX
            </span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-1 rounded-[10px] border border-[#D9D9D9]"
          >
            <Download className="h-[30px] w-[30px] text-[#404040]" />
            <span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">
              Export PDF
            </span>
          </Button>
        </div>
      </div>

      <ReportFilters />

      <div className="flex flex-col self-stretch">
        <div className="flex items-start gap-[34px] border-b-[0.8px] border-[rgba(0,0,0,0.1)] py-2">
          <div className="flex items-center px-2">
            <div className="font-arial text-sm leading-5 text-[#0A0A0A]">Account No</div>
          </div>
          <div className="flex w-[150px] items-center gap-2.5">
            <div className="font-arial text-sm leading-5 text-[#0A0A0A]">Account Name</div>
          </div>
          <div className="flex w-[150px] items-center gap-2.5">
            <div className="font-arial text-sm leading-5 text-[#0A0A0A]">Begining Balance</div>
          </div>
          <div className="flex w-[236px] items-center justify-end">
            <div className="font-arial text-right text-sm leading-5 text-[#0A0A0A]">Debit</div>
          </div>
          <div className="flex w-[236px] items-center justify-end">
            <div className="font-arial text-right text-sm leading-5 text-[#0A0A0A]">Credit</div>
          </div>
          <div className="flex w-[236px] items-center justify-end">
            <div className="font-arial text-right text-sm leading-5 text-[#0A0A0A]">Balance</div>
          </div>
          <div className="flex items-center">
            <div className="font-arial text-sm leading-5 text-[#0A0A0A]">Normal Side</div>
          </div>
        </div>

        {trialBalanceData.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-[34px] border-b-[0.8px] border-[rgba(0,0,0,0.1)] py-2"
          >
            <div className="flex w-[193px] items-center px-2">
              <div className="font-arial text-sm leading-5 text-[#0A0A0A]">
                {item.accountNo}
              </div>
            </div>
            <div className="flex w-[150px] items-center gap-2.5">
              <div className="font-arial text-sm leading-5 text-[#0A0A0A]">
                {item.accountName}
              </div>
            </div>
            <div className="flex w-[150px] items-center gap-2.5">
              <div className="font-arial text-sm leading-5 text-[#0A0A0A]">
                {item.beginningBalance}
              </div>
            </div>
            <div className="flex w-[236px] items-center justify-end">
              <div className="font-arial text-right text-sm leading-5 text-[#0A0A0A]">
                {item.debit}
              </div>
            </div>
            <div className="flex w-[236px] items-center justify-end">
              <div className="font-arial text-right text-sm leading-5 text-[#0A0A0A]">
                {item.credit}
              </div>
            </div>
            <div className="flex w-[236px] items-center justify-end">
              <div className="font-arial text-right text-sm leading-5 text-[#0A0A0A]">
                {item.balance}
              </div>
            </div>
            <div className="flex h-[38px] w-[200px] items-center">
              <Badge
                variant="outline"
                className="h-[22px] rounded-lg border-[0.8px] border-[rgba(0,0,0,0.1)]"
              >
                <span className="font-arial text-xs leading-4 text-[#0A0A0A]">
                  {item.normalSide}
                </span>
              </Badge>
            </div>
          </div>
        ))}

        <div className="flex items-center self-stretch py-2">
          <div className="flex w-[986px] items-center px-2">
            <div className="font-arial text-sm leading-5 text-[#0A0A0A]">TOTAL</div>
          </div>
          <div className="flex w-[270px] items-center gap-2.5">
            <div className="font-arial text-right text-sm leading-5 text-[#0A0A0A]">
              Rp 165.500.000
            </div>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <div className="font-arial text-right text-sm leading-5 text-[#0A0A0A]">
              Rp 165.500.000
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between self-stretch py-4">
        <div className="font-geist text-sm leading-[150%] tracking-[0.07px] text-[#737373]">
          Showing 1-10 of 100 products
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="font-geist text-sm font-medium text-[#404040]">
            Previous
          </Button>
          <Button
            variant="outline"
            className="h-9 w-[34px] rounded-lg border border-[#D4D4D4] bg-[rgba(255,255,255,0.1)] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]"
          >
            <span className="font-geist text-sm font-medium text-[#0A0A0A]">1</span>
          </Button>
          <Button variant="ghost" className="h-9 w-[34px] rounded-lg">
            <span className="font-geist text-sm font-medium text-[#404040]">2</span>
          </Button>
          <Button variant="ghost" className="h-9 w-[34px] rounded-lg">
            <span className="font-geist text-sm font-medium text-[#404040]">3</span>
          </Button>
          <Button variant="ghost" className="h-9 w-[34px] rounded-lg">
            <span className="font-geist text-sm font-medium text-[#404040]">4</span>
          </Button>
          <Button variant="ghost" className="h-9 w-[34px] rounded-lg">
            <span className="font-geist text-sm font-medium text-[#404040]">...</span>
          </Button>
          <Button variant="ghost" className="h-9 w-[34px] rounded-lg">
            <span className="font-geist text-sm font-medium text-[#404040]">10</span>
          </Button>
          <Button variant="ghost" className="font-geist text-sm font-medium text-[#404040]">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
