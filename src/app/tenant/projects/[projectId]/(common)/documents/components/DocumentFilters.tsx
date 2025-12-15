"use client";

import { Search, Filter, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DocumentFiltersProps {
	searchQuery: string;
	onSearchChange: (value: string) => void;
	selectedModule: string;
	onModuleChange: (value: string) => void;
	selectedAssignee: string;
	onAssigneeChange: (value: string) => void;
	selectedStatus: string;
	onStatusChange: (value: string) => void;
}

export function DocumentFilters({
	searchQuery,
	onSearchChange,
}: DocumentFiltersProps) {
	return (
		<div className="flex flex-col items-center gap-5 lg:flex-row">
			{/* Entries Dropdown */}
			<div className="flex h-[54px] w-full items-center justify-center gap-1 rounded-[10px] border border-[#D9D9D9] px-4 sm:w-auto">
				<span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">
					20
				</span>
				<ChevronDown className="h-6 w-6 text-[#332687]" />
			</div>

			{/* Search Input */}
			<div className="flex h-[54px] flex-1 items-center gap-[15px] rounded-[10px] border border-[#D9D9D9] px-4">
				<div className="relative h-5 w-5">
					<div className="absolute left-0 top-0 h-[18px] w-[18px] rounded-full border-[3px] border-[#332687]" />
					<div className="absolute left-[15px] top-[15px] h-0 w-2" />
				</div>
				<Input
					placeholder="Cari nama user"
					value={searchQuery}
					onChange={(e) => onSearchChange(e.target.value)}
					className="h-5 border-0 p-0 font-dm text-base font-normal leading-5 tracking-[-0.32px] text-[#8F9BBA] placeholder:text-[#8F9BBA] focus-visible:ring-0 focus-visible:ring-offset-0"
				/>
			</div>

			{/* Filter Buttons */}
			<div className="flex w-full flex-wrap items-center gap-2.5 lg:w-auto">
				<Button
					variant="outline"
					className="h-[54px] rounded-[10px] border-[#D9D9D9] px-4 font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]"
				>
					All Modul
					<ChevronDown className="ml-1 h-6 w-6 text-[#332687]" />
				</Button>

				<Button
					variant="outline"
					className="h-[54px] rounded-[10px] border-[#D9D9D9] px-4 font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]"
				>
					Assignee
					<ChevronDown className="ml-1 h-6 w-6 text-[#332687]" />
				</Button>

				<Button
					variant="outline"
					className="h-[54px] rounded-[10px] border-[#D9D9D9] px-4 font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]"
				>
					All Status
					<ChevronDown className="ml-1 h-6 w-6 text-[#332687]" />
				</Button>

				<Button
					variant="outline"
					className="h-[54px] rounded-[10px] border-[#D9D9D9] px-4 font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]"
				>
					Due
					<ChevronDown className="ml-1 h-6 w-6 text-[#332687]" />
				</Button>

				<Button
					variant="outline"
					className="h-[54px] rounded-[10px] border-[#D9D9D9] px-4 font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]"
				>
					<Filter className="mr-2 h-[18px] w-[18px] text-[#332687]" />
					Filter
				</Button>

				<Button
					variant="outline"
					className="h-[54px] w-[54px] rounded-[10px] border-[#D9D9D9] p-0"
				>
					<MoreHorizontal className="h-[35px] w-[35px] text-[#4318FF]" />
				</Button>
			</div>
		</div>
	);
}
