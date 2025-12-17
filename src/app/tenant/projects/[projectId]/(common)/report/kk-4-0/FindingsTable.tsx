"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Download,
	Search,
	ChevronDown,
	Filter,
	MoreHorizontal,
	Plus,
	FilePlus,
} from "lucide-react";

interface Finding {
	id: string;
	task: string;
	module: string;
	assignee: {
		name: string;
		initials: string;
	};
	priority: string;
	status: string;
	progress: number;
	due: string;
	daysOverdue: number | null;
	updated: string;
}

interface FindingsTableProps {
	data: Finding[];
}

export function FindingsTable({ data }: FindingsTableProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedItems, setSelectedItems] = useState<string[]>([]);

	const toggleSelectAll = () => {
		if (selectedItems.length === data.length) {
			setSelectedItems([]);
		} else {
			setSelectedItems(data.map((item) => item.id));
		}
	};

	const toggleSelectItem = (id: string) => {
		if (selectedItems.includes(id)) {
			setSelectedItems(selectedItems.filter((item) => item !== id));
		} else {
			setSelectedItems([...selectedItems, id]);
		}
	};

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case "High":
				return "text-[rgba(191,106,2,1)]";
			case "Medium":
				return "text-[rgba(191,106,2,1)]";
			case "Low":
				return "text-[#404040]";
			default:
				return "text-[#404040]";
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Selesai":
				return "bg-[rgba(207,247,211,1)]";
			case "In Progress":
				return "bg-[#E8DEF8]";
			case "In Review":
				return "bg-[rgba(255,241,194,1)]";
			default:
				return "bg-gray-100";
		}
	};

	return (
		<Card className="rounded-[20px] shadow-[0_1px_2px_0_rgba(0,0,0,0.30),0_1px_3px_1px_rgba(0,0,0,0.15)]">
			<CardHeader className="space-y-4 p-6">
				<div className="flex items-start justify-between">
					<div>
						<CardTitle className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] text-[#2B3674]">
							Detail Temuan/QC
						</CardTitle>
						<p className="font-roboto text-xs leading-4 tracking-[0.4px] text-[#2B3674]">
							Kelola Invoice di dalam Project
						</p>
					</div>
					<div className="flex items-center justify-end gap-[10px]">
						<Button
							variant="outline"
							className="h-[48px] gap-1 rounded-[10px] border-[#D9D9D9]"
						>
							<Download className="h-[30px] w-[30px] text-[#404040]" />
							<span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">
								Export XLSX
							</span>
						</Button>
						<Button
							variant="outline"
							className="h-[48px] gap-1 rounded-[10px] border-[#D9D9D9]"
						>
							<Download className="h-[30px] w-[30px] text-[#404040]" />
							<span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">
								Export PDF
							</span>
						</Button>
						<Button className="h-[48px] gap-1 rounded-[10px] bg-[#4318FF] hover:bg-[#4318FF]/90">
							<Plus className="h-6 w-6 text-white" />
							<span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-white">
								Tambahkan Issue
							</span>
						</Button>
					</div>
				</div>

				{/* Filters */}
				<div className="flex items-center gap-5">
					<Select defaultValue="20">
						<SelectTrigger className="h-[54px] w-auto rounded-[10px] border-[#D9D9D9]">
							<SelectValue />
							<ChevronDown className="h-3 w-6 text-[#332687]" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="20">20</SelectItem>
							<SelectItem value="50">50</SelectItem>
							<SelectItem value="100">100</SelectItem>
						</SelectContent>
					</Select>

					<div className="relative flex-1">
						<Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#332687]" />
						<Input
							placeholder="Nama tugas"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="h-[54px] rounded-[10px] border-[#D9D9D9] pl-12 font-dm text-base text-[#8F9BBA]"
						/>
					</div>

					<div className="flex items-center gap-[10px]">
						<Select defaultValue="all-status">
							<SelectTrigger className="h-[54px] w-auto rounded-[10px] border-[#D9D9D9]">
								<SelectValue placeholder="All Status" />
								<ChevronDown className="h-3 w-6 text-[#332687]" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all-status">All Status</SelectItem>
								<SelectItem value="selesai">Selesai</SelectItem>
								<SelectItem value="progress">In Progress</SelectItem>
								<SelectItem value="review">In Review</SelectItem>
							</SelectContent>
						</Select>

						<Select defaultValue="all-type">
							<SelectTrigger className="h-[54px] w-auto rounded-[10px] border-[#D9D9D9]">
								<SelectValue placeholder="All Type" />
								<ChevronDown className="h-3 w-6 text-[#332687]" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all-type">All Type</SelectItem>
								<SelectItem value="form">Form</SelectItem>
								<SelectItem value="kk">KK</SelectItem>
							</SelectContent>
						</Select>

						<Button
							variant="outline"
							className="h-[54px] gap-1 rounded-[10px] border-[#D9D9D9]"
						>
							<Filter className="h-[18px] w-[18px] text-[#332687]" />
							<span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">
								Filter
							</span>
						</Button>

						<Button
							variant="ghost"
							size="icon"
							className="h-[54px] w-[54px] rounded-[10px]"
						>
							<MoreHorizontal className="h-[35px] w-[35px] text-[#4318FF]" />
						</Button>
					</div>
				</div>
			</CardHeader>

			<CardContent className="space-y-[10px] p-6 pt-0">
				{/* Table Header */}
				<div className="flex items-center justify-between">
					<div className="flex w-[120px] items-center gap-[10px]">
						<Checkbox
							checked={selectedItems.length === data.length}
							onCheckedChange={toggleSelectAll}
							className="h-6 w-6"
						/>
						<div className="font-dm text-sm font-medium leading-6 tracking-[-0.28px] text-[#A3AED0]">
							Task
						</div>
						<ChevronDown className="h-6 w-6 flex-shrink-0 text-[#A3AED0]" />
					</div>
					{["Modul", "Assignee", "Priority", "Status", "Progress", "Due", "Update", "Action"].map(
						(header) => (
							<div key={header} className="flex w-[120px] items-center gap-[7px]">
								<div className="font-dm text-sm font-medium leading-6 tracking-[-0.28px] text-[#A3AED0]">
									{header}
								</div>
								<ChevronDown className="h-6 w-6 flex-shrink-0 text-[#A3AED0]" />
							</div>
						),
					)}
				</div>

				<div className="h-px w-[1450px] bg-border" />

				{/* Table Rows */}
				{data.map((row) => (
					<div key={row.id} className="flex items-center justify-between py-2">
						<div className="flex w-[120px] items-center gap-[10px]">
							<Checkbox
								checked={selectedItems.includes(row.id)}
								onCheckedChange={() => toggleSelectItem(row.id)}
								className="h-6 w-6"
							/>
							<div className="w-[120px] flex-shrink-0 font-roboto text-xs leading-4 tracking-[0.4px] text-[#2B3674]">
								{row.task}
							</div>
						</div>
						<div className="w-[120px]">
							<div className="flex items-center justify-center gap-[10px] rounded-[5px] border border-[rgba(145,158,171,0.20)] px-2 py-1">
								<div className="font-inter text-xs text-[#332687]">{row.module}</div>
							</div>
						</div>
						<div className="flex w-[120px] items-center gap-[10px]">
							<div className="flex h-[40px] w-[40px] flex-shrink-0 flex-col items-center justify-center gap-[10px] rounded-[50px] bg-[#4318FF]">
								<div className="self-stretch text-center font-dm text-base leading-[30px] tracking-[-0.32px] text-white">
									{row.assignee.initials}
								</div>
							</div>
							<div className="font-roboto text-xs leading-4 tracking-[0.4px] text-[#404040]">
								{row.assignee.name}
							</div>
						</div>
						<div className="w-[120px]">
							<div
								className={`flex items-center justify-center gap-[10px] rounded-[5px] border border-[rgba(145,158,171,0.20)] px-2 py-1 ${getPriorityColor(row.priority)}`}
							>
								<div className="font-inter text-xs">{row.priority}</div>
							</div>
						</div>
						<div className="w-[120px]">
							<Badge
								variant="secondary"
								className={`min-w-[48px] rounded-[50px] ${getStatusColor(row.status)}`}
							>
								<span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#4A4459]">
									{row.status}
								</span>
							</Badge>
						</div>
						<div className="w-[120px]">
							<div className="flex w-[120px] items-center gap-[6px]">
								<div className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-[#2B3674]">
									{row.progress}%
								</div>
								<div className="relative h-2 w-[63px] flex-shrink-0">
									<Progress value={row.progress} className="h-full" />
								</div>
							</div>
						</div>
						<div className="flex w-[120px] items-center gap-[5px]">
							<div className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-[#2B3674]">
								{row.due}
							</div>
							{row.daysOverdue && (
								<Badge
									variant="secondary"
									className="min-w-[48px] rounded-[50px] bg-[rgba(236,34,31,1)]"
								>
									<span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-white">
										{row.daysOverdue}d
									</span>
								</Badge>
							)}
						</div>
						<div className="w-[120px] font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-[#2B3674]">
							{row.updated}
						</div>
						<div className="w-[120px]">
							<Button
								variant="outline"
								className="h-[38px] w-[65px] rounded-[5.75px] border-[#C5C4C5]"
							>
								<span className="font-inter text-[13.2px] font-bold text-[#676A79]">View</span>
							</Button>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
