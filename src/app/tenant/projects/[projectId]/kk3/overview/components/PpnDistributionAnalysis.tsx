"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChartTooltip } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import {
	TrendingUp,
	FileText,
	DollarSign,
	PieChart as PieChartIcon,
	CheckCircle2,
	Calendar,
	Clock,
	AlertCircle,
} from "lucide-react";

interface PphDistributionData {
	totalPph: string;
	breakdown: Array<{
		label: string;
		value: string;
		percentage: string;
		color: string;
		rawValue: number; // for chart
	}>;
	stats: {
		largestContribution: {
			label: string;
			percentage: string;
		};
		averagePerType: string;
		diversification: string;
	};
	compliance: {
		status: string;
		description: string;
		details: Array<{
			type: string;
			status: "On Time" | "Planned" | "Late";
			dateLabel: string;
			date: string;
		}>;
	};
}

interface PpnDistributionAnalysisProps {
	data: PphDistributionData;
}

export function PpnDistributionAnalysis({
	data,
}: PpnDistributionAnalysisProps) {
	return (
		<Card className="flex flex-1 flex-col gap-[30px] rounded-[14px] border-[0.8px] border-[rgba(0,0,0,0.10)] bg-card p-5">
			{/* Header */}
			<div className="flex items-center justify-between self-stretch">
				<div className="flex flex-col gap-1">
					<div className="flex items-center gap-2">
						<PieChartIcon className="h-5 w-5 " />
						<h3 className=" text-base leading-4 ">PPh Distribution Analysis</h3>
					</div>
					<p className=" text-sm leading-5 text-muted-foreground">
						Distribusi dan komposisi berbagai jenis Pajak Penghasilan
					</p>
				</div>
				<div className="flex flex-col items-end gap-1">
					<span className=" text-lg font-bold leading-7 text-primary">
						{data.totalPph}
					</span>
					<span className=" text-sm leading-5 text-muted-foreground">
						Total PPh
					</span>
				</div>
			</div>

			<div className="flex flex-col gap-6 self-stretch">
				{/* Chart and Breakdown */}
				<div className="flex items-start justify-between">
					{/* Chart */}
					<div className="flex h-[300px] w-[300px] items-center justify-center">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie
									data={data.breakdown}
									cx="50%"
									cy="50%"
									innerRadius={60}
									outerRadius={100}
									paddingAngle={2}
									dataKey="rawValue"
								>
									{data.breakdown.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={entry.color} />
									))}
								</Pie>
								<Tooltip content={<ChartTooltip />} />
							</PieChart>
						</ResponsiveContainer>
					</div>

					{/* Breakdown List */}
					<div className="flex w-[252px] flex-col gap-3">
						<h4 className=" text-base font-bold leading-6 ">
							Breakdown by Type
						</h4>
						<div className="flex flex-col gap-2">
							{data.breakdown.map((item) => (
								<Card
									key={item.label}
									className="flex items-center justify-between border rounded-[10px] bg-muted p-3"
								>
									<div className="flex items-center gap-3">
										<div
											className="h-4 w-4 rounded-full"
											style={{ backgroundColor: item.color }}
										/>
										<span className=" text-sm text-muted-foreground">
											{item.label}
										</span>
									</div>
									<div className="flex flex-col items-end">
										<span className=" text-base font-bold ">{item.value}</span>
										<span className=" text-sm text-muted-foreground">
											{item.percentage}
										</span>
									</div>
								</Card>
							))}
						</div>
					</div>
				</div>

				{/* Summary Stats */}
				<div className="flex items-center border justify-between rounded-[10px] bg-muted p-4">
					<div className="flex flex-col items-center gap-1">
						<div className="flex items-center gap-1 text-primary">
							<TrendingUp className="h-4 w-4" />
							<span className=" text-sm">Kontribusi Terbesar</span>
						</div>
						<span className=" text-base font-bold text-primary">
							{data.stats.largestContribution.label} (
							{data.stats.largestContribution.percentage})
						</span>
					</div>
					<div className="h-10 w-[1px] bg-muted-foreground" />
					<div className="flex flex-col items-center gap-1">
						<div className="flex items-center gap-1 text-primary">
							<DollarSign className="h-4 w-4" />
							<span className=" text-sm">Rata-rata per Jenis</span>
						</div>
						<span className=" text-base font-bold text-primary">
							{data.stats.averagePerType}
						</span>
					</div>
					<div className="h-10 w-[1px] bg-muted-foreground" />
					<div className="flex flex-col items-center gap-1">
						<div className="flex items-center gap-1 text-primary">
							<FileText className="h-4 w-4" />
							<span className=" text-sm">Diversifikasi</span>
						</div>
						<span className=" text-base font-bold text-primary">
							{data.stats.diversification}
						</span>
					</div>
				</div>

				{/* Status Kepatuhan */}
				<div className="flex flex-col gap-4 rounded-[10px] border-[0.8px] border-[#B9F8CF] bg-[#F0FDF4] p-4">
					<div className="flex gap-2.5">
						<CheckCircle2 className="h-5 w-5 text-primary" />
						<div className="flex flex-col gap-1">
							<h4 className=" text-base font-bold leading-6 text-primary">
								{data.compliance.status}
							</h4>
							<p className=" text-sm leading-5 text-primary">
								{data.compliance.description}
							</p>
						</div>
					</div>

					<div className="grid grid-cols-4 gap-4">
						{data.compliance.details.map((detail, index) => (
							<div key={index} className="flex flex-col gap-1">
								<span
									className={` text-base leading-6 ${detail.status === "On Time" ? "text-[#008236]" : "text-[#008236]"}`}
								>
									{detail.type}: {detail.status}
								</span>
								<span
									className={` text-base leading-6 ${detail.status === "On Time" ? "text-[#00A63E]" : "text-[#00A63E]"}`}
								>
									{detail.dateLabel}: {detail.date}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</Card>
	);
}
