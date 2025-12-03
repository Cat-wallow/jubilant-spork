"use client";

import { ClipboardList, Users, AlertCircle, CheckCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProjectStats } from "@/services/project.service";

export default function ProjectStats() {
	const { data, isLoading } = useQuery({
		queryKey: ["project-stats"],
		queryFn: getProjectStats,
	});

	const stats = [
		{
			icon: ClipboardList,
			label: "Active Project",
			value: isLoading ? "..." : data?.activeProjects || 0,
		},
		{
			icon: Users,
			label: "Team Members",
			value: isLoading ? "..." : data?.totalMembers || 0,
		},
		{
			icon: AlertCircle,
			label: "Overdue",
			value: isLoading ? "..." : data?.overdueProjects || 0,
		},
		{
			icon: CheckCircle,
			label: "Ready for BAST",
			value: isLoading ? "..." : data?.readyForBast || 0,
		},
	];

	return (
		<div className="flex items-start gap-[30px]">
			{stats.map((stat, index) => {
				const Icon = stat.icon;
				return (
					<div
						key={index}
						className="flex h-[97px] flex-1 items-center gap-[18px] rounded-[20px] bg-card px-5 py-[6px] text-primary"
					>
						<div className="flex h-14 w-14 items-center justify-center rounded-[28px] bg-muted text-primary">
							<Icon className="h-[30px] w-[30px] " />
						</div>
						<div className="flex flex-col">
							<span className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] ">
								{stat.label}
							</span>
							<span className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px]">
								{stat.value}
							</span>
						</div>
					</div>
				);
			})}
		</div>
	);
}
