"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function TeamHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="flex flex-col">
        <h2 className="font-dm text-2xl font-bold leading-8 text-[#2B3674]">
          Daftar Anggota Tim
        </h2>
        <p className="font-roboto text-xs font-normal leading-4 text-[#2B3674]">
          Kelola anggota tim yang terlibat di dalam project
        </p>
      </div>

      <Button className="flex h-12 w-full items-center gap-1 rounded-[10px] bg-[#332687] hover:bg-[#241963] md:w-auto">
        <Plus className="h-6 w-6" />
        <span className="font-roboto text-sm font-medium leading-5">Invite User</span>
      </Button>
    </div>
  );
}
