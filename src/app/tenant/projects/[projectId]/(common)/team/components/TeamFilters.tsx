"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, Filter, MoreHorizontal, Search } from "lucide-react";

export function TeamFilters() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      {/* Show count */}
      <Select defaultValue="20">
        <SelectTrigger className="h-[54px] w-auto min-w-[80px] rounded-[10px] border border-[#D9D9D9]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </SelectContent>
      </Select>

      {/* Search */}
      <div className="relative flex h-[54px] flex-1 items-center gap-[15px] rounded-[10px] border border-[#D9D9D9] px-4">
        <Search className="h-5 w-5 text-[#332687]" />
        <Input
          placeholder="Cari nama user"
          className="h-auto border-0 p-0 font-dm text-base text-[#8F9BBA] placeholder:text-[#8F9BBA] focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      {/* Filter buttons */}
      <div className="flex items-center gap-2.5">
        <Select defaultValue="all-module">
          <SelectTrigger className="h-[54px] w-auto min-w-[120px] rounded-[10px] border border-[#D9D9D9]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-module">All Modul</SelectItem>
            <SelectItem value="kk1">KK 1.0</SelectItem>
            <SelectItem value="kk2">KK 2.0</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="assignee">
          <SelectTrigger className="h-[54px] w-auto min-w-[120px] rounded-[10px] border border-[#D9D9D9]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="assignee">Assignee</SelectItem>
            <SelectItem value="user1">User 1</SelectItem>
            <SelectItem value="user2">User 2</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all-status">
          <SelectTrigger className="h-[54px] w-auto min-w-[120px] rounded-[10px] border border-[#D9D9D9]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-status">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="due">
          <SelectTrigger className="h-[54px] w-auto min-w-[100px] rounded-[10px] border border-[#D9D9D9]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="due">Due</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          className="h-[54px] gap-1 rounded-[10px] border border-[#D9D9D9]"
        >
          <Filter className="h-[18px] w-[18px] text-[#332687]" />
          <span className="font-roboto text-sm font-medium leading-5 text-[#49454F]">
            Filter
          </span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-[54px] w-[54px] rounded-[10px] hover:bg-muted"
        >
          <MoreHorizontal className="h-[35px] w-[35px] text-[#4318FF]" />
        </Button>
      </div>
    </div>
  );
}
