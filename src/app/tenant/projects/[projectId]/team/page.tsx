"use client";

import { TeamHeader } from "./components/TeamHeader";
import { TeamFilters } from "./components/TeamFilters";
import { TeamTable } from "./components/TeamTable";
import { teamMembers } from "./data/team-members";

export default function TeamPage() {
  return (
    <div className="flex flex-col gap-5 rounded-[20px] bg-card p-6">
      <TeamHeader />
      <TeamFilters />
      <TeamTable members={teamMembers} />
    </div>
  );
}
