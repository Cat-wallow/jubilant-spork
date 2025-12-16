"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Calendar, Filter, MoreHorizontal, ChevronDown } from "lucide-react";

export function ReportFilters() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex items-center gap-5 self-stretch">
      <div className="flex h-[54px] items-center justify-center gap-1 rounded-[10px] border border-[#D9D9D9] px-4">
        <div className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">
          20
        </div>
        <ChevronDown className="h-3 w-3 text-[#332687]" />
      </div>

      <div className="flex h-[54px] flex-1 items-center gap-[15px] rounded-[10px] border border-[#D9D9D9] px-4">
        <Search className="h-5 w-5 text-[#332687]" strokeWidth={3} />
        <Input
          placeholder="Nama tugas"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-5 flex-1 border-0 bg-transparent p-0 font-dm-sans text-base leading-5 text-foreground placeholder:text-[#8F9BBA] focus-visible:ring-0"
        />
      </div>

      <Button
        variant="outline"
        className="flex h-[54px] items-center gap-1 rounded-[10px] border border-[#D9D9D9] px-4"
      >
        <span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">
          Rentang Waktu
        </span>
        <Calendar className="h-6 w-6 text-[#332687]" />
      </Button>

      <div className="flex items-center gap-2.5">
        <Button
          variant="outline"
          className="flex h-[54px] items-center gap-1 rounded-[10px] border border-[#D9D9D9] px-4"
        >
          <span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">
            All Status
          </span>
          <ChevronDown className="h-3 w-3 text-[#332687]" />
        </Button>

        <Button
          variant="outline"
          className="flex h-[54px] items-center gap-1 rounded-[10px] border border-[#D9D9D9] px-4"
        >
          <span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">
            All Type
          </span>
          <ChevronDown className="h-3 w-3 text-[#332687]" />
        </Button>

        <Button
          variant="outline"
          className="flex h-[54px] items-center gap-1 rounded-[10px] border border-[#D9D9D9] px-4"
        >
          <Filter className="h-[18px] w-[18px] text-[#332687]" />
          <span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">
            Filter
          </span>
        </Button>

        <Button
          variant="outline"
          className="flex h-[54px] w-[54px] items-center justify-center rounded-[10px] border-0 p-0"
        >
          <MoreHorizontal className="h-[35px] w-[35px] text-[#4318FF]" />
        </Button>
      </div>
    </div>
  );
}
