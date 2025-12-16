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
			<Card className="flex h-[97px] items-center gap-[18px] border border-[rgba(145,158,171,0.20)] px-6 shadow-[0_2px_2px_0_rgba(0,0,0,0.10)]">
				<div className="flex h-14 w-14 items-center justify-center rounded-full">
					<TrendingUp className="h-[30px] w-[30px] text-[#332687]" strokeWidth={2} />
				</div>
				<div className="flex flex-col gap-1">
					<p className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-[#A3AED0]">
						Compliance
					</p>
					<p className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] text-[#404040]">
						{stats.compliance.percentage}%
					</p>
					<div className="flex items-center gap-[5px]">
						<span className="font-dm text-xs font-bold leading-5 tracking-[-0.24px] text-[#05CD99]">
							{stats.compliance.completed}/{stats.compliance.total}
						</span>
						<span className="font-dm text-xs font-normal leading-5 tracking-[-0.24px] text-[#A3AED0]">
							{stats.compliance.label}
						</span>
					</div>
				</div>
			</Card>

			{/* Document Gaps Card */}
			<Card className="flex h-[97px] items-center gap-[18px] border border-[rgba(145,158,171,0.20)] px-6 shadow-[0_2px_2px_0_rgba(0,0,0,0.10)]">
				<div className="flex h-14 w-14 items-center justify-center rounded-full">
					<AlertCircle className="h-[30px] w-[30px] text-[#332687]" strokeWidth={2.5} />
				</div>
				<div className="flex flex-col gap-1">
					<p className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-[#A3AED0]">
						Document Gaps
					</p>
					<p className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] text-[#404040]">
						{stats.documentGaps.count}
					</p>
					<div className="flex items-center gap-[5px]">
						<span className="font-dm text-xs font-bold leading-5 tracking-[-0.24px] text-[#05CD99]">
							/ {stats.documentGaps.total}
						</span>
						<span className="font-dm text-xs font-normal leading-5 tracking-[-0.24px] text-[#A3AED0]">
							{stats.documentGaps.label}
						</span>
					</div>
				</div>
			</Card>

			{/* Declarations Card */}
			<Card className="flex h-[97px] items-center gap-[18px] border border-[rgba(145,158,171,0.20)] px-6 shadow-[0_2px_2px_0_rgba(0,0,0,0.10)]">
				<div className="flex h-14 w-14 items-center justify-center rounded-full">
					<AlertCircle className="h-[30px] w-[30px] text-[#332687]" strokeWidth={2.5} />
				</div>
				<div className="flex flex-col gap-1">
					<p className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-[#A3AED0]">
						Pernyataan
					</p>
					<p className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] text-[#404040]">
						{stats.declarations.count}
					</p>
					<p className="font-dm text-xs font-normal leading-5 tracking-[-0.24px] text-[#A3AED0]">
						{stats.declarations.label}
					</p>
				</div>
			</Card>
		</div>
	);
}
