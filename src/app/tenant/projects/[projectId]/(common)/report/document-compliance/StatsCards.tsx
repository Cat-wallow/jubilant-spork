"use client";

import { Card } from "@/components/ui/card";
import { TrendingUp, AlertCircle } from "lucide-react";

interface StatsCardsProps {
	stats: {
		compliance: {
			percentage: number;
			completed: number;
			total: number;
			label: string;
		};
		documentGaps: {
			count: number;
			total: number;
			label: string;
		};
		declarations: {
			count: number;
			label: string;
		};
	};
}

export function StatsCards({ stats }: StatsCardsProps) {
	return (
		<div className="grid grid-cols-1 gap-[30px] md:grid-cols-3">
			{/* Compliance Card */}
			<Card className="flex h-[97px] items-center gap-[18px] border  px-6 ">
				<div className="flex h-14 w-14 items-center justify-center rounded-full">
					<TrendingUp
						className="h-[30px] w-[30px] text-primary"
						strokeWidth={2}
					/>
				</div>
				<div className="flex flex-col gap-1">
					<p className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-muted-foreground">
						Compliance
					</p>
					<p className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] ">
						{stats.compliance.percentage}%
					</p>
					<div className="flex items-center gap-[5px]">
						<span className="font-dm text-xs font-bold leading-5 tracking-[-0.24px] text-[#05CD99]">
							{stats.compliance.completed}/{stats.compliance.total}
						</span>
						<span className="font-dm text-xs leading-5 tracking-[-0.24px] text-muted-foreground">
							{stats.compliance.label}
						</span>
					</div>
				</div>
			</Card>

			{/* Document Gaps Card */}
			<Card className="flex h-[97px] items-center gap-[18px] border  px-6 ">
				<div className="flex h-14 w-14 items-center justify-center rounded-full">
					<AlertCircle
						className="h-[30px] w-[30px] text-primary"
						strokeWidth={2.5}
					/>
				</div>
				<div className="flex flex-col gap-1">
					<p className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-muted-foreground">
						Document Gaps
					</p>
					<p className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] ">
						{stats.documentGaps.count}
					</p>
					<div className="flex items-center gap-[5px]">
						<span className="font-dm text-xs font-bold leading-5 tracking-[-0.24px] text-[#05CD99]">
							/ {stats.documentGaps.total}
						</span>
						<span className="font-dm text-xs leading-5 tracking-[-0.24px] text-muted-foreground">
							{stats.documentGaps.label}
						</span>
					</div>
				</div>
			</Card>

			{/* Declarations Card */}
			<Card className="flex h-[97px] items-center gap-[18px] border  px-6 ">
				<div className="flex h-14 w-14 items-center justify-center rounded-full">
					<AlertCircle
						className="h-[30px] w-[30px] text-primary"
						strokeWidth={2.5}
					/>
				</div>
				<div className="flex flex-col gap-1">
					<p className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-muted-foreground">
						Pernyataan
					</p>
					<p className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] ">
						{stats.declarations.count}
					</p>
					<p className="font-dm text-xs leading-5 tracking-[-0.24px] text-muted-foreground">
						{stats.declarations.label}
					</p>
				</div>
			</Card>
		</div>
	);
}
