"use client";

import { Card } from "@/components/ui/card";
import { TrendingUp, AlertCircle, DollarSign } from "lucide-react";

interface StatCardsProps {
	stats: {
		totalEntries: number;
		tbBalance: string;
		netIncome: string;
	};
}

export function StatCards({ stats }: StatCardsProps) {
	return (
		<div className="flex gap-[30px] self-stretch">
			<Card className="flex h-[97px] flex-1 items-center gap-[18px] rounded-[20px] border border-[rgba(145,158,171,0.2)] px-4 shadow-[0_2px_2px_0_rgba(0,0,0,0.1)]">
				<div className="flex h-14 w-14 items-center justify-center rounded-full">
					<TrendingUp
						className="h-[30px] w-[30px] text-primary"
						strokeWidth={2}
					/>
				</div>
				<div className="flex flex-col">
					<div className="font-dm-sans text-sm font-bold leading-6 tracking-[-0.28px] text-muted-foreground">
						Total Entries
					</div>
					<div className="font-dm-sans text-2xl font-bold leading-8 tracking-[-0.48px] ">
						{stats.totalEntries}
					</div>
					<div className="font-dm-sans text-xs leading-5 tracking-[-0.24px] text-muted-foreground">
						Jurnal entri bulan ini
					</div>
				</div>
			</Card>

			<Card className="flex h-[97px] flex-1 items-center gap-[18px] rounded-[20px] border border-[rgba(145,158,171,0.2)] px-4 shadow-[0_2px_2px_0_rgba(0,0,0,0.1)]">
				<div className="flex h-14 w-14 items-center justify-center rounded-full">
					<AlertCircle
						className="h-[30px] w-[30px] text-primary"
						strokeWidth={2.5}
					/>
				</div>
				<div className="flex flex-col">
					<div className="font-dm-sans text-sm font-bold leading-6 tracking-[-0.28px] text-muted-foreground">
						TB Balance
					</div>
					<div className="font-dm-sans text-2xl font-bold leading-8 tracking-[-0.48px] ">
						{stats.tbBalance}
					</div>
					<div className="font-dm-sans text-xs leading-5 tracking-[-0.24px] text-muted-foreground">
						Trial balance seimbang
					</div>
				</div>
			</Card>

			<Card className="flex h-[97px] flex-1 items-center gap-[18px] rounded-[20px] border border-[rgba(145,158,171,0.2)] px-4 shadow-[0_2px_2px_0_rgba(0,0,0,0.1)]">
				<div className="flex h-14 w-14 items-center justify-center rounded-full">
					<AlertCircle
						className="h-[30px] w-[30px] text-primary"
						strokeWidth={2.5}
					/>
				</div>
				<div className="flex flex-col">
					<div className="font-dm-sans text-sm font-bold leading-6 tracking-[-0.28px] text-muted-foreground">
						Net Income
					</div>
					<div className="font-dm-sans text-2xl font-bold leading-8 tracking-[-0.48px] ">
						{stats.netIncome}
					</div>
					<div className="font-dm-sans text-xs leading-5 tracking-[-0.24px] text-muted-foreground">
						Year to date
					</div>
				</div>
			</Card>
		</div>
	);
}
