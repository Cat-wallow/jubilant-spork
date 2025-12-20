"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
	icon: React.ReactNode;
	label: string;
	value: string;
	subtitle?: string;
	valueColor?: string;
}

export function StatsCard({
	icon,
	label,
	value,
	subtitle,
	valueColor,
}: StatsCardProps) {
	return (
		<Card className="border-[0.8px] ">
			<CardContent className="flex flex-col gap-2 p-4">
				{/* Icon and Label */}
				<div className="flex items-center gap-2">
					{icon}
					<span className="font-['Arial'] text-sm leading-5 ">{label}</span>
				</div>

				{/* Value */}
				<div className="flex flex-col gap-1">
					<span
						className={cn(
							"font-['Arial'] text-2xl font-bold leading-8",
							valueColor || "",
						)}
					>
						{value}
					</span>
					{subtitle && (
						<span className="font-['Arial'] text-xs leading-4 text-muted-foreground">
							{subtitle}
						</span>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
