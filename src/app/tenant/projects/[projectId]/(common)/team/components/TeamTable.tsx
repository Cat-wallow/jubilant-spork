"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, Edit, Trash2 } from "lucide-react";
import { TeamMember } from "../data/team-members";

interface TeamTableProps {
  members: TeamMember[];
}

export function TeamTable({ members }: TeamTableProps) {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const toggleMember = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedMembers((prev) =>
      prev.length === members.length ? [] : members.map((m) => m.id)
    );
  };

  return (
    <div className="flex flex-col gap-2.5">
      {/* Table Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex w-[150px] items-center gap-2.5">
          <Checkbox
            checked={selectedMembers.length === members.length}
            onCheckedChange={toggleAll}
          />
          <span className="font-dm text-sm font-medium leading-6 text-[#A3AED0]">
            Nama
          </span>
          <ChevronDown className="h-6 w-6 text-[#A3AED0]" />
        </div>

        <div className="flex w-[120px] items-center gap-[7px]">
          <span className="font-dm text-sm font-medium leading-6 text-[#A3AED0]">
            Role
          </span>
          <ChevronDown className="h-6 w-6 text-[#A3AED0]" />
        </div>

        <div className="flex w-[120px] items-center gap-[7px]">
          <span className="font-dm text-sm font-medium leading-6 text-[#A3AED0]">
            Modul
          </span>
          <ChevronDown className="h-6 w-6 text-[#A3AED0]" />
        </div>

        <div className="flex w-[210px] items-center gap-[7px]">
          <span className="font-dm text-sm font-medium leading-6 text-[#A3AED0]">
            Action
          </span>
          <ChevronDown className="h-6 w-6 text-[#A3AED0]" />
        </div>
      </div>

      {/* Separator */}
      <div className="h-px w-full bg-border" />

      {/* Table Rows */}
      <div className="flex flex-col gap-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between border-b pb-4 last:border-b-0"
          >
            <div className="flex w-[150px] items-center gap-2.5">
              <Checkbox
                checked={selectedMembers.includes(member.id)}
                onCheckedChange={() => toggleMember(member.id)}
              />
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4318FF] font-dm text-base font-normal leading-[30px] text-white">
                {member.avatar}
              </div>
              <span className="font-inter text-sm font-medium leading-[14px] text-[#404040]">
                {member.name}
              </span>
            </div>

            <div className="w-[120px]">
              <div className="flex h-[29px] items-center justify-center rounded-[5px] bg-transparent px-2">
                <span className="font-dm text-sm font-bold leading-6 text-[#2B3674]">
                  {member.role}
                </span>
              </div>
            </div>

            <div className="flex w-[120px] flex-wrap items-start gap-2.5">
              {member.modules.map((module, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="justify-center rounded-[5px] border border-[rgba(145,158,171,0.20)] px-2.5 py-1 font-inter text-xs font-normal text-[#332687]"
                >
                  {module}
                </Badge>
              ))}
            </div>

            <div className="flex w-[210px] items-center gap-5">
              <Button variant="ghost" size="icon" className="h-auto w-auto p-0">
                <Edit className="h-[25px] w-[25px] text-[#6750A4]" />
              </Button>
              <Button variant="ghost" size="icon" className="h-auto w-auto p-0">
                <Trash2 className="h-[30px] w-[30px] text-[#BF6A02]" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Button */}
      <Button
        variant="outline"
        className="mt-10 flex h-[42px] items-center gap-1 self-start rounded-[10px] border border-[#D9D9D9] bg-transparent"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
        >
          <path
            d="M11.25 6.00879C11.4489 6.00879 11.6397 6.08781 11.7803 6.22846C11.921 6.36911 12 6.55988 12 6.75879V10.5088H15.75C15.9489 10.5088 16.1397 10.5878 16.2803 10.7285C16.421 10.8691 16.5 11.0599 16.5 11.2588C16.5 11.4577 16.421 11.6485 16.2803 11.7891C16.1397 11.9298 15.9489 12.0088 15.75 12.0088H12V15.7588C12 15.9577 11.921 16.1485 11.7803 16.2891C11.6397 16.4298 11.4489 16.5088 11.25 16.5088C11.0511 16.5088 10.8603 16.4298 10.7197 16.2891C10.579 16.1485 10.5 15.9577 10.5 15.7588V12.0088H6.75C6.55109 12.0088 6.36032 11.9298 6.21967 11.7891C6.07902 11.6485 6 11.4577 6 11.2588C6 11.0599 6.07902 10.8691 6.21967 10.7285C6.36032 10.5878 6.55109 10.5088 6.75 10.5088H10.5V6.75879C10.5 6.55988 10.579 6.36911 10.7197 6.22846C10.8603 6.08781 11.0511 6.00879 11.25 6.00879Z"
            fill="#332687"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 9.609C0 6.249 0 4.569 0.654 3.279C1.23202 2.15033 2.15033 1.23202 3.279 0.654C4.563 0 6.249 0 9.609 0H12.909C16.269 0 17.949 0 19.239 0.654C20.3685 1.2285 21.279 2.1465 21.864 3.279C22.518 4.563 22.518 6.249 22.518 9.609V12.909C22.518 16.269 22.518 17.949 21.864 19.239C21.286 20.3677 20.3677 21.286 19.239 21.864C17.955 22.518 16.269 22.518 12.909 22.518H9.609C6.249 22.518 4.569 22.518 3.279 21.864C2.15033 21.286 1.23202 20.3677 0.654 19.239C0 17.955 0 16.269 0 12.909V9.609ZM9.6 1.509H12.9C14.61 1.509 15.795 1.509 16.725 1.5855C17.6325 1.6605 18.1545 1.7985 18.555 1.9995C19.3997 2.43246 20.087 3.11981 20.52 3.9645C20.721 4.359 20.859 4.881 20.934 5.7945C21.009 6.72 21.0105 7.9095 21.0105 9.6195V12.9195C21.0105 14.6295 21.0105 15.8145 20.934 16.7445C20.859 17.652 20.721 18.174 20.52 18.5745C20.0887 19.4204 19.4009 20.1082 18.555 20.5395C18.1605 20.7405 17.6385 20.8785 16.725 20.9535C15.7995 21.0285 14.61 21.03 12.9 21.03H9.6C7.89 21.03 6.705 21.03 5.775 20.955C4.8675 20.88 4.3455 20.7405 3.945 20.5395C3.09909 20.1082 2.41129 19.4204 1.98 18.5745C1.779 18.18 1.641 17.6595 1.566 16.7445C1.491 15.819 1.4895 14.6295 1.4895 12.9195V9.6195C1.4895 7.9095 1.4895 6.7245 1.566 5.7945C1.641 4.887 1.779 4.365 1.98 3.9645C2.41296 3.11981 3.10031 2.43246 3.945 1.9995C4.3395 1.7985 4.8615 1.6605 5.775 1.5855C6.7005 1.5105 7.89 1.509 9.6 1.509Z"
            fill="#332687"
          />
        </svg>
        <span className="font-roboto text-sm font-medium leading-5 text-[#332687]">
          Upload
        </span>
      </Button>
    </div>
  );
}
