"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Receipt, TrendingUp } from "lucide-react";

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
			case "receipt-tax":
				return <Receipt className="h-[30px] w-[30px] text-primary" />;
			case "line-up":
				return <TrendingUp className="h-[30px] w-[30px] text-primary" />;
			default:
				return <Receipt className="h-[30px] w-[30px] text-primary" />;
		}
	};

	return (
		<div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-4">
			{stats.map((stat, index) => (
				<Card
					key={index}
					className="flex h-[97px] items-center gap-[18px] rounded-[20px] border  p-4 "
				>
					<div className="flex h-[56px] w-[56px] items-center justify-center rounded-[28px]">
						{getIcon(stat.icon)}
					</div>
					<CardContent className="flex flex-col p-0">
						<div className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-muted-foreground">
							{stat.label}
						</div>
						<div className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] ">
							{stat.value}
						</div>
						<div className="font-dm text-xs leading-5 tracking-[-0.24px] text-muted-foreground">
							{stat.description}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
