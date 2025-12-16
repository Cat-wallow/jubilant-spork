"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, List } from "lucide-react";
import { issues } from "./data/issues";
import { IssueCard } from "./components/issue-card";
import RBAC from "@/components/rbac/RBAC";

function IssuesPageContent() {
  const [searchQuery, setSearchQuery] = useState("");

  const openIssues = issues.filter((issue) => issue.status === "Open");
  const inProgressIssues = issues.filter((issue) => issue.status === "In Progress");
  const resolvedIssues = issues.filter((issue) => issue.status === "Resolved");

  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex flex-wrap items-start gap-5 self-stretch">
        <div className="flex h-[54px] flex-1 items-center gap-[15px] rounded-[10px] border border-[#D9D9D9] px-4">
          <div className="relative h-5 w-5">
            <div className="absolute left-0 top-0 h-[18px] w-[18px] rounded-full border-[3px] border-[#332687]" />
          </div>
          <Input
            placeholder="Cari nama issue"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-5 flex-1 border-0 bg-transparent p-0 font-dm-sans text-base text-[#8F9BBA] placeholder:text-[#8F9BBA] focus-visible:ring-0"
          />
        </div>
        <div className="flex items-center justify-end gap-2.5">
          <Button className="flex items-center gap-1 rounded-[10px] bg-[#332687] px-4 py-2.5 hover:bg-[#332687]/90">
            <Plus className="h-6 w-6 text-white" />
            <span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-white">
              Tambah Tugas
            </span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-1 rounded-[10px] border border-[#D9D9D9] bg-transparent px-4 py-2.5 hover:bg-accent"
          >
            <List className="h-6 w-6 text-[#404040]" />
            <span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">
              List
            </span>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-5 self-stretch xl:flex-nowrap">
        <div className="flex w-full min-w-[300px] flex-1 flex-col gap-2.5 rounded-[20px]">
          <div className="flex items-center gap-2.5">
            <h2 className="font-dm-sans text-[22px] font-bold leading-8 tracking-[-0.44px] text-[#2B3674]">
              Open
            </h2>
            <div className="flex items-center justify-center gap-2.5 rounded-[5px] px-2 py-1">
              <span className="font-inter text-sm font-bold text-[#404040]">{openIssues.length}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            {openIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </div>

        <div className="flex w-full min-w-[300px] flex-1 flex-col gap-2.5 rounded-[20px]">
          <div className="flex items-center gap-2.5">
            <h2 className="font-dm-sans text-[22px] font-bold leading-8 tracking-[-0.44px] text-[#2B3674]">
              In Progress
            </h2>
            <div className="flex items-center justify-center gap-2.5 rounded-[5px] px-2 py-1">
              <span className="font-inter text-sm font-bold text-[#404040]">
                {inProgressIssues.length}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            {inProgressIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </div>

        <div className="flex w-full min-w-[300px] flex-1 flex-col gap-2.5 rounded-[20px]">
          <div className="flex items-center gap-2.5">
            <h2 className="font-dm-sans text-[22px] font-bold leading-8 tracking-[-0.44px] text-[#2B3674]">
              Resolved
            </h2>
            <div className="flex items-center justify-center gap-2.5 rounded-[5px] px-2 py-1">
              <span className="font-inter text-sm font-bold text-[#404040]">
                {resolvedIssues.length}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            {resolvedIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectIssuesPage() {
  return (
    <RBAC requiredPermission={["project:manage", "project:read"]} unauthorizedPage={true}>
      <IssuesPageContent />
    </RBAC>
  );
}
