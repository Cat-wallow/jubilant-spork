"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Plus, Calendar, Eye } from "lucide-react";

export default function ProjectsTab() {
	const getMilestoneColor = (status: string) => {
		switch (status) {
			case "Done":
				return "bg-[rgba(207,247,211,1)] hover:bg-[rgba(207,247,211,1)]";
			case "In Progress":
				return "bg-[#EADDFF] hover:bg-[#EADDFF]";
			default:
				return "bg-[rgba(205,205,205,1)] hover:bg-[rgba(205,205,205,1)]";
		}
	};

	return (
		<div className="flex flex-col gap-[30px]">
			{/* Header */}
			<Card className="flex h-12 items-center justify-between self-stretch rounded-[20px] bg-white px-[30px]">
				<div className="flex flex-col">
					<h2 className="text-2xl font-bold leading-8 tracking-[-0.48px] text-[#2B3674]">
						Proyek Aktif
					</h2>
					<p className="text-xs font-normal leading-4 tracking-[0.4px] text-[#2B3674]">
						Realtime status berbagai proyek dengan milestone board
					</p>
				</div>
				<div className="flex items-center justify-end gap-5">
					<Button
						variant="outline"
						className="h-12 gap-1 rounded-[10px] border border-[#CAC4D0] bg-[#F9FAFB] px-3"
					>
						<Filter className="h-6 w-6 text-[#332687]" />
						<span className="text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">
							Filter
						</span>
					</Button>
					<Button className="h-12 gap-1 rounded-[10px] bg-[#08F] px-3">
						<Plus className="h-6 w-6" />
						Tambah Project
					</Button>
				</div>
			</Card>

			{/* Project Cards */}
			<div className="flex flex-col gap-[10px]">
				{projectsData.map((project, index) => (
					<Card
						key={index}
						className="flex flex-col items-start justify-center gap-5 self-stretch rounded-[20px] border border-[#D9D9D9] bg-white p-5 shadow-[0_2px_2px_0_rgba(0,0,0,0.15)]"
					>
						{/* Project Info */}
						<div className="flex flex-col items-start justify-center gap-[9px]">
							<h3 className="font-roboto text-base font-bold leading-6 tracking-[0.15px] text-[#2B3674]">
								{project.id}
							</h3>
							<p className="font-roboto text-xs font-normal leading-4 tracking-[0.4px] text-[#2B3674]">
								{project.companyName}
							</p>
							<p className="font-roboto text-xs font-bold leading-4 tracking-[0.4px] text-[#2B3674]">
								Team: {project.team}
							</p>
						</div>

						{/* Milestones */}
						<div className="flex items-center gap-[10px]">
							{project.milestones.map((milestone, idx) => (
								<Badge
									key={idx}
									className={`min-w-[48px] rounded-[50px] px-3 py-[6px] font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#4A4459] ${getMilestoneColor(milestone.status)}`}
								>
									{milestone.name}: {milestone.status}
								</Badge>
							))}
						</div>

						{/* Next Milestone */}
						<div className="flex items-center gap-[10px]">
							<Calendar className="h-6 w-6 text-[#332687]" />
							<p className="font-roboto text-sm font-bold leading-5 tracking-[0.25px] text-[#2B3674]">
								Next: {project.nextMilestone.name} ({project.nextMilestone.date}
								)
							</p>
						</div>

						{/* Progress Bar */}
						<div className="flex items-center gap-5 self-stretch">
							<div className="flex flex-1 flex-col justify-center gap-5">
								<div className="flex items-center justify-between self-stretch">
									<span className="font-inter text-sm font-normal text-[#6E7184]">
										Progress
									</span>
									<span className="font-inter text-xs font-normal text-[#9C9EAA]">
										{project.progress}%
									</span>
								</div>
								<div className="flex h-[10px] flex-col items-start self-stretch overflow-hidden">
									<div className="h-full w-full bg-[#A3AED0]"></div>
									<div
										className="h-full bg-[#332687]"
										style={{
											width: `${project.progress}%`,
											marginTop: "-10px",
										}}
									></div>
								</div>
							</div>
							<Button
								variant="outline"
								className="gap-1 rounded-[5px] border border-[#CAC4D0] bg-white px-3 py-[6px]"
							>
								<Eye className="h-6 w-6 text-[#404040]" />
								<span className="text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">
									View
								</span>
							</Button>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}
