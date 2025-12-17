"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Clock, CheckCircle } from "lucide-react";

interface StatCardProps {
	icon: string;
	label: string;
	value: string;
	description: string;
}

interface StatsCardsProps {
	stats: StatCardProps[];
}

export function StatsCards({ stats }: StatsCardsProps) {
	const getIcon = (iconName: string) => {
		switch (iconName) {
			case "warning":
				return <AlertCircle className="h-[30px] w-[30px] text-[#332687]" />;
			case "progress":
				return <Clock className="h-[30px] w-[30px] text-[#332687]" />;
			case "security":
				return <CheckCircle className="h-[30px] w-[30px] text-[#332687]" />;
			default:
				return <AlertCircle className="h-[30px] w-[30px] text-[#332687]" />;
		}
	};

	return (
		<div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3">
			{stats.map((stat, index) => (
				<Card
					key={index}
					className="flex h-[97px] items-center gap-[18px] rounded-[20px] border border-[rgba(145,158,171,0.20)] p-4 shadow-[0_2px_2px_0_rgba(0,0,0,0.10)]"
				>
					<div className="flex h-[56px] w-[56px] items-center justify-center rounded-[28px]">
						{getIcon(stat.icon)}
					</div>
					<CardContent className="flex flex-col p-0">
						<div className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-[#A3AED0]">
							{stat.label}
						</div>
						<div className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] text-[#404040]">
							{stat.value}
						</div>
						<div className="font-dm text-xs leading-5 tracking-[-0.24px] text-[#A3AED0]">
							{stat.description}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
