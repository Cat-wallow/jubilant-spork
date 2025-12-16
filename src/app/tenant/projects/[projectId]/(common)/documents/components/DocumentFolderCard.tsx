"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface DocumentFolderCardProps {
	title: string;
	description: string;
	status: "Approved" | "In Progress" | "In Review";
	progress: number;
	filesCount: number;
	totalFiles: number;
	size: string;
	completedDate: string;
}

const statusStyles = {
	Approved: "bg-[#CFF7D3] text-[#4A4459]",
	"In Progress": "bg-[#E8DEF8] text-[#4A4459]",
	"In Review": "bg-[#FFF1C2] text-[#4A4459]",
};

export function DocumentFolderCard({
	title,
	description,
	status,
	progress,
	filesCount,
	totalFiles,
	size,
	completedDate,
}: DocumentFolderCardProps) {
	return (
		<Card className="flex w-full flex-col justify-center gap-[30px] border border-[#D9D9D9] p-[15px] shadow-[0_2px_2px_0_rgba(0,0,0,0.15)] transition-shadow hover:shadow-md sm:w-[350px]">
			{/* Header */}
			<div className="flex items-start justify-between">
				<div className="flex flex-col">
					<h3 className="font-roboto text-base font-medium ">{title}</h3>
					<p className="w-full font-roboto text-xs font-normal leading-4 tracking-[0.4px] text-[#8C8C8C] sm:w-[228px]">
						{description}
					</p>
				</div>
				<Badge
					className={cn(
						"min-w-[48px] rounded-[50px] px-3 py-1 font-roboto text-sm font-medium leading-5 tracking-[0.1px]",
						statusStyles[status],
					)}
				>
					{status}
				</Badge>
			</div>

			{/* Progress Section */}
			<div className="flex flex-col gap-2.5">
				<div className="flex flex-col gap-5">
					<div className="flex items-center justify-between">
						<span className="font-inter text-xs font-normal text-[#6E7184]">
							Progress
						</span>
						<span className="font-inter text-xs font-normal text-[#6E7184]">
							{progress}%
						</span>
					</div>
					<div className="flex flex-col">
						<Progress value={progress} className="h-2.5 w-full" />
					</div>
				</div>
				<div className="flex items-center justify-between">
					<span className="font-inter text-xs font-normal text-[#6E7184]">
						{filesCount}/{totalFiles} File
					</span>
					<span className="font-inter text-xs font-normal text-[#6E7184]">
						{size}
					</span>
				</div>
			</div>

			{/* Footer */}
			<div className="flex items-center justify-between">
				<span className="font-inter text-xs font-normal text-[#6E7184]">
					Complete
				</span>
				<span className="font-inter text-xs font-normal text-[#6E7184]">
					{completedDate}
				</span>
			</div>
		</Card>
	);
}
