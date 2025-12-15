"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export function InvoicePagination() {
  return (
    <div className="flex items-center justify-between">
      <p className="font-geist text-sm font-normal leading-[150%] text-[#737373]">
        Showing 1-10 of 100 products
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="gap-2 rounded-lg font-geist text-sm font-medium leading-[150%] text-[#404040]"
        >
          <ChevronLeft className="h-[5.5px] w-[5.5px]" />
          Previous
        </Button>

        <Button
          variant="outline"
          className="h-9 w-[34px] rounded-lg border border-[#D4D4D4] bg-[rgba(255,255,255,0.10)] px-4 py-[7.5px] font-geist text-sm font-medium leading-[150%] text-[#0A0A0A] shadow-sm"
        >
          1
        </Button>

        <Button
          variant="ghost"
          className="h-9 w-[34px] px-4 py-[7.5px] font-geist text-sm font-medium leading-[150%] text-[#404040]"
        >
          2
        </Button>

        <Button
          variant="ghost"
          className="h-9 w-[34px] px-4 py-[7.5px] font-geist text-sm font-medium leading-[150%] text-[#404040]"
        >
          3
        </Button>

        <Button
          variant="ghost"
          className="h-9 w-[34px] px-4 py-[7.5px] font-geist text-sm font-medium leading-[150%] text-[#404040]"
        >
          4
        </Button>

        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
          <MoreHorizontal className="h-[14.834px] w-[3.167px]" />
        </Button>

        <Button
          variant="ghost"
          className="h-9 w-[34px] px-4 py-[7.5px] font-geist text-sm font-medium leading-[150%] text-[#404040]"
        >
          10
        </Button>

        <Button
          variant="ghost"
          className="gap-2 rounded-lg font-geist text-sm font-medium leading-[150%] text-[#404040]"
        >
          Next
          <ChevronRight className="h-[5.5px] w-[5.5px]" />
        </Button>
      </div>
    </div>
  );
}
