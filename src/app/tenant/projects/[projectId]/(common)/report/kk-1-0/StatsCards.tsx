"use client";

import { Card } from "@/components/ui/card";
import { TrendingUp, AlertCircle } from "lucide-react";

interface StatsCardsProps {
	stats: {
		totalTransactions: {
			count: number;
			change: string;
			label: string;
		};
		totalValue: {
			amount: string;
			label: string;
		};
		flaggedBlocked: {
			count: number;
			label: string;
		};
	};
}

export function StatsCards({ stats }: StatsCardsProps) {
	return (
		<div className="grid grid-cols-1 gap-[30px] md:grid-cols-3">
			{/* Total Transactions Card */}
			<Card className="flex h-[97px] items-center gap-[18px] border  px-6 ">
				<div className="flex h-14 w-14 items-center justify-center rounded-full">
					<TrendingUp
						className="h-[30px] w-[30px] text-primary"
						strokeWidth={2}
					/>
				</div>
				<div className="flex flex-col gap-1">
					<p className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-muted-foreground">
						Total Transaksi
					</p>
					<p className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] ">
						{stats.totalTransactions.count}
					</p>
					<div className="flex items-center gap-[5px]">
						<span className="font-dm text-xs font-bold leading-5 tracking-[-0.24px] text-[#05CD99]">
							{stats.totalTransactions.change}
						</span>
						<span className="font-dm text-xs leading-5 tracking-[-0.24px] text-muted-foreground">
							{stats.totalTransactions.label}
						</span>
					</div>
				</div>
			</Card>

			{/* Total Value Card */}
			<Card className="flex h-[97px] items-center gap-[18px] border  px-6 ">
				<div className="flex h-14 w-14 items-center justify-center rounded-full">
					<AlertCircle
						className="h-[30px] w-[30px] text-primary"
						strokeWidth={2.5}
					/>
				</div>
				<div className="flex flex-col gap-1">
					<p className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-muted-foreground">
						Total Nilai
					</p>
					<p className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] ">
						{stats.totalValue.amount}
					</p>
					<p className="font-dm text-xs leading-5 tracking-[-0.24px] text-muted-foreground">
						{stats.totalValue.label}
					</p>
				</div>
			</Card>

			{/* Flagged/Blocked Card */}
			<Card className="flex h-[97px] items-center gap-[18px] border  px-6 ">
				<div className="flex h-14 w-14 items-center justify-center rounded-full">
					<AlertCircle
						className="h-[30px] w-[30px] text-primary"
						strokeWidth={2.5}
					/>
				</div>
				<div className="flex flex-col gap-1">
					<p className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-muted-foreground">
						Flagged/Blocked
					</p>
					<p className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] ">
						{stats.flaggedBlocked.count}
					</p>
					<p className="font-dm text-xs leading-5 tracking-[-0.24px] text-muted-foreground">
						{stats.flaggedBlocked.label}
					</p>
				</div>
			</Card>
		</div>
	);
}
