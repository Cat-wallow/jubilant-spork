"use client";

import { Card } from "@/components/ui/card";
import { Calculator, DollarSign } from "lucide-react";

const statsData = [
	{
		icon: Calculator,
		label: "Total Entries",
		value: "10",
		subtitle: "As of 29/09/2025",
	},
	{
		icon: DollarSign,
		label: "PPN Keluaran",
		value: "Rp.9.000.000",
	},
	{
		icon: DollarSign,
		label: "PPN Masukan",
		value: "Rp.9.000.000",
	},
	{
		icon: DollarSign,
		label: "PPN Neto",
		value: "Rp.9.000.000",
	},
];

export function StatsCards() {
	return (
		<div className="flex items-start gap-[30px]">
			{statsData.map((stat, index) => (
				<Card
					key={index}
					className="flex h-[97px] flex-1 items-center gap-[18px] rounded-[20px] border  bg-card p-[10px_20px] "
				>
					<div className="flex h-14 w-14 items-center justify-center rounded-full bg-background p-[15px]">
						<stat.icon className="h-[30px] w-[30px] text-primary" />
					</div>
					<div className="flex flex-1 flex-col items-start">
						<div className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-muted-foreground">
							{stat.label}
						</div>
						<div className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] ">
							{stat.value}
						</div>
						{stat.subtitle && (
							<div className="font-dm text-xs leading-5 tracking-[-0.24px] text-muted-foreground">
								{stat.subtitle}
							</div>
						)}
					</div>
				</Card>
			))}
		</div>
	);
}
