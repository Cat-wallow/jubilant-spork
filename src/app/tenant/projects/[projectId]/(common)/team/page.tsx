"use client";

import { TeamHeader } from "./components/TeamHeader";
import { TeamFilters } from "./components/TeamFilters";
import { TeamTable } from "./components/TeamTable";
import { teamMembers } from "./data/team-members";
import { cn } from "@/lib/utils";

export default function TeamPage() {
	return (
		<div className="flex w-full flex-col gap-[30px] ">
			<div className="flex flex-col gap-5 rounded-[20px] bg-card p-4 md:p-6">
				<TeamHeader />
				<TeamFilters />
				<div className="overflow-x-auto">
					<TeamTable members={teamMembers} />
				</div>
			</div>
		</div>
	);
}
