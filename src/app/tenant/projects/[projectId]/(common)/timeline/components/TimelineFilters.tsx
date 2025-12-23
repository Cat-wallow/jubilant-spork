"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Filter, Download, MoreHorizontal } from "lucide-react";

interface TimelineFiltersProps {
	selectedModule: string;
	setSelectedModule: (module: string) => void;
	selectedMilestone: string;
	setSelectedMilestone: (milestone: string) => void;
	selectedZoom: string;
	setSelectedZoom: (zoom: string) => void;
	onExportPNG: () => void;
	onExportPDF: () => void;
	modules: string[];
	milestones: string[];
}

export function TimelineFilters({
	selectedModule,
	setSelectedModule,
	selectedMilestone,
	setSelectedMilestone,
	selectedZoom,
	setSelectedZoom,
	onExportPNG,
	onExportPDF,
	modules,
	milestones,
}: TimelineFiltersProps) {
	return (
		<div className="flex items-center self-end justify-end gap-5">
			<div className="flex items-center gap-5">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="h-[42px] rounded-[10px] ">
							<span className="text-muted-foreground">{selectedModule}</span>
							<ChevronDown className="ml-1 h-3 w-3 text-primary" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{modules.map((module) => (
							<DropdownMenuItem
								key={module}
								onClick={() => setSelectedModule(module)}
							>
								{module}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="h-[42px] rounded-[10px] ">
							<span className="text-muted-foreground">{selectedMilestone}</span>
							<ChevronDown className="ml-1 h-3 w-3 text-primary" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{milestones.map((milestone) => (
							<DropdownMenuItem
								key={milestone}
								onClick={() => setSelectedMilestone(milestone)}
							>
								{milestone}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="h-[42px] rounded-[10px] ">
							<span className="text-muted-foreground">{selectedZoom}</span>
							<ChevronDown className="ml-1 h-3 w-3 text-primary" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={() => setSelectedZoom("Day View")}>
							Day View
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setSelectedZoom("Week View")}>
							Week View
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setSelectedZoom("Month View")}>
							Month View
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<Button variant="outline" className="h-[42px] rounded-[10px] ">
					<Filter className="h-[18px] w-[18px] text-primary" />
					<span className="text-muted-foreground">Filter</span>
				</Button>
			</div>

			<div className="flex items-center gap-5">
				<Button
					variant="outline"
					className="h-[42px] rounded-[5px] "
					onClick={onExportPNG}
				>
					<Download className="h-[30px] w-[30px] " />
					<span className=" text-base font-medium">PNG</span>
				</Button>

				<Button
					variant="outline"
					className="h-[42px] rounded-[5px] "
					onClick={onExportPDF}
				>
					<Download className="h-[30px] w-[30px] " />
					<span className=" text-base font-medium">PDF</span>
				</Button>
			</div>

			<Button
				variant="ghost"
				size="icon"
				className="h-[54px] w-[54px] rounded-[10px]"
			>
				<MoreHorizontal className="h-[35px] w-[35px] text-[#4318FF]" />
			</Button>
		</div>
	);
}
