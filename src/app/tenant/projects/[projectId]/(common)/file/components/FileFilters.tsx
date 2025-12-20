"use client";

import { Search, Filter, MoreHorizontal, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface FileFiltersProps {
	searchQuery: string;
	onSearchChange: (value: string) => void;
	selectedModule: string;
	onModuleChange: (value: string) => void;
	selectedAssignee: string;
	onAssigneeChange: (value: string) => void;
	selectedStatus: string;
	onStatusChange: (value: string) => void;
}

export function FileFilters({
	searchQuery,
	onSearchChange,
	selectedModule,
	onModuleChange,
	selectedAssignee,
	onAssigneeChange,
	selectedStatus,
	onStatusChange,
}: FileFiltersProps) {
	return (
		<div className="flex flex-col gap-5">
			{/* First Row - Results count and Search */}
			<div className="flex items-center gap-5">
				<Select defaultValue="20">
					<SelectTrigger className="h-[54px] w-[120px] rounded-[10px] border ">
						<SelectValue />
						<ChevronDown className="ml-2 h-6 w-6 text-primary" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="10">10</SelectItem>
						<SelectItem value="20">20</SelectItem>
						<SelectItem value="50">50</SelectItem>
						<SelectItem value="100">100</SelectItem>
					</SelectContent>
				</Select>

				<div className="relative flex flex-1 items-center">
					<Search className="absolute left-4 h-5 w-5 text-primary" />
					<Input
						placeholder="Cari nama user"
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
						className="h-[54px] rounded-[10px] border  pl-12 font-dm text-base text-muted-foreground"
					/>
				</div>
			</div>

			{/* Second Row - Filters */}
			<div className="flex items-center justify-between gap-2.5">
				<div className="flex items-center gap-2.5">
					<Select value={selectedModule} onValueChange={onModuleChange}>
						<SelectTrigger className="h-[54px] w-auto min-w-[140px] rounded-[10px] border ">
							<SelectValue placeholder="All Modul" />
							<ChevronDown className="ml-2 h-6 w-6 text-primary" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Modul</SelectItem>
							<SelectItem value="kk1">KK 1.0</SelectItem>
							<SelectItem value="kk2">KK 2.0</SelectItem>
							<SelectItem value="kk3">KK 3.0</SelectItem>
						</SelectContent>
					</Select>

					<Select value={selectedAssignee} onValueChange={onAssigneeChange}>
						<SelectTrigger className="h-[54px] w-auto min-w-[140px] rounded-[10px] border ">
							<SelectValue placeholder="Assignee" />
							<ChevronDown className="ml-2 h-6 w-6 text-primary" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Assignees</SelectItem>
							<SelectItem value="user1">User 1</SelectItem>
							<SelectItem value="user2">User 2</SelectItem>
						</SelectContent>
					</Select>

					<Select value={selectedStatus} onValueChange={onStatusChange}>
						<SelectTrigger className="h-[54px] w-auto min-w-[140px] rounded-[10px] border ">
							<SelectValue placeholder="All Status" />
							<ChevronDown className="ml-2 h-6 w-6 text-primary" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Status</SelectItem>
							<SelectItem value="pending">Pending</SelectItem>
							<SelectItem value="approved">Approved</SelectItem>
						</SelectContent>
					</Select>

					<Button
						variant="outline"
						className="h-[54px] gap-2 rounded-[10px] border "
					>
						<span className=" text-sm font-medium leading-5 tracking-[0.1px] text-muted-foreground">
							Due
						</span>
						<ChevronDown className="h-6 w-6 text-primary" />
					</Button>

					<Button
						variant="outline"
						className="h-[54px] gap-2 rounded-[10px] border "
					>
						<Filter className="h-[18px] w-[18px] text-primary" />
						<span className=" text-sm font-medium leading-5 tracking-[0.1px] text-muted-foreground">
							Filter
						</span>
					</Button>
				</div>

				<Button
					variant="ghost"
					size="icon"
					className="h-[54px] w-[54px] rounded-[10px]"
				>
					<MoreHorizontal className="h-9 w-9 text-[#4318FF]" />
				</Button>
			</div>
		</div>
	);
}
