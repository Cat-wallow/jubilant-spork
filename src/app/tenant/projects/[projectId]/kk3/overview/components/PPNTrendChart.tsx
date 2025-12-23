"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from "recharts";
import { ChartTooltip } from "@/components/ui/chart";

interface PPNTrendData {
	title: string;
	description: string;
	change: string;
	changeLabel: string;
	legend: Array<{
		label: string;
		value: string;
		color: string;
	}>;
	chartData: Array<{
		month: string;
		keluaran: number;
		masukan: number;
		neto: number;
	}>;
	summary: {
		avgNeto: string;
		highestMonth: string;
		taxCollectionRate: string;
	};
}

interface PPNTrendChartProps {
	data: PPNTrendData;
}

export function PPNTrendChart({ data }: PPNTrendChartProps) {
	return (
		<Card className="flex flex-1 flex-col gap-[30px] rounded-[14px] border-[0.8px] border-[rgba(0,0,0,0.10)] bg-card p-5">
			<div className="flex items-center justify-between self-stretch">
				<div className="flex flex-col gap-1">
					<div className="flex items-center gap-2">
						<TrendingUp className="h-5 w-5 " />
						<h3 className=" text-base leading-4 ">{data.title}</h3>
					</div>
					<p className=" text-sm leading-5 text-muted-foreground">
						{data.description}
					</p>
				</div>
				<div className="flex flex-col items-end gap-1">
					<div className="flex items-center gap-1">
						<TrendingUp className="h-4 w-4 text-[#00A63E]" />
						<span className=" text-sm leading-5 text-[#00A63E]">
							{data.change}
						</span>
					</div>
					<span className=" text-xs leading-4 text-muted-foreground">
						{data.changeLabel}
					</span>
				</div>
			</div>

			<div className="flex flex-col gap-4 self-stretch">
				<div className="flex items-center gap-5 self-stretch">
					{data.legend.map((item) => (
						<div
							key={item.label}
							className="flex h-[72px] flex-1 items-center gap-2 rounded-[10px] px-3"
							style={{ backgroundColor: `${item.color}1A` }}
						>
							<div
								className="h-3 w-3 rounded-full"
								style={{ backgroundColor: item.color }}
							/>
							<div className="flex flex-col">
								<span className=" text-sm ">{item.label}</span>
								<span
									className=" text-lg font-bold leading-7"
									style={{ color: item.color }}
								>
									{item.value}
								</span>
							</div>
						</div>
					))}
				</div>

				<div className="h-[432px] w-full">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={data.chartData}>
							<CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
							<XAxis
								dataKey="month"
								stroke="#62748E"
								style={{ fontSize: "12px" }}
							/>
							<YAxis
								stroke="#62748E"
								style={{ fontSize: "12px" }}
								tickFormatter={(value) =>
									new Intl.NumberFormat("id-ID", {
										notation: "compact",
										compactDisplay: "short",
									}).format(value)
								}
							/>
							<Tooltip content={<ChartTooltip />} />
							<Legend />
							<Line
								type="monotone"
								dataKey="keluaran"
								stroke="#2B7FFF"
								strokeWidth={2}
								name="PPN Keluaran"
								dot={{ fill: "#2B7FFF" }}
							/>
							<Line
								type="monotone"
								dataKey="masukan"
								stroke="#00C950"
								strokeWidth={2}
								name="PPN Masukan"
								dot={{ fill: "#00C950" }}
							/>
							<Line
								type="monotone"
								dataKey="neto"
								stroke="#FF6900"
								strokeWidth={2}
								name="PPN Neto"
								dot={{ fill: "#FF6900" }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>

				<div className="flex items-center justify-between self-stretch rounded-[10px] bg-muted p-4">
					<div className="flex flex-col items-center">
						<span className=" text-sm text-muted-foreground">
							Rata-rata PPN Neto
						</span>
						<span className=" text-lg font-bold ">{data.summary.avgNeto}</span>
					</div>
					<div className="flex flex-col items-center">
						<span className=" text-sm text-muted-foreground">
							Highest Month
						</span>
						<span className=" text-lg font-bold ">
							{data.summary.highestMonth}
						</span>
					</div>
					<div className="flex flex-col items-center">
						<span className=" text-sm text-muted-foreground">
							Tax Collection Rate
						</span>
						<span className=" text-lg font-bold ">
							{data.summary.taxCollectionRate}
						</span>
					</div>
				</div>
			</div>
		</Card>
	);
}
