"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";

interface PPNNetChartProps {
	title: string;
	data: Array<{
		month: string;
		keluaran: number;
		masukan: number;
		neto: number;
	}>;
}

interface PPNDistributionChartProps {
	title: string;
	data: Array<{
		category: string;
		value: number;
	}>;
}

interface ChartsProps {
	ppnNetChart: PPNNetChartProps;
	ppnDistributionChart: PPNDistributionChartProps;
}

const COLORS = ["#868CFF", "#CB30E0", "#A3B9F8"];
const HORIZONTAL_COLORS = ["#868CFF", "#009689", "#CB30E0", "#4318FF"];

export function Charts({ ppnNetChart, ppnDistributionChart }: ChartsProps) {
	return (
		<div className="grid grid-cols-1 gap-[30px] lg:grid-cols-2">
			{/* Vertical Bar Chart - PPN Net per-Periode */}
			<Card className="flex flex-col items-center rounded-[20px] border  p-[30px]">
				<CardHeader className="h-[32px] w-full p-0 pb-6">
					<CardTitle className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] ">
						{ppnNetChart.title}
					</CardTitle>
				</CardHeader>
				<CardContent className="flex w-full flex-1 items-start p-0">
					<div className="flex flex-col items-start justify-center gap-[54px]">
						<div className="w-[50px] text-center font-geist text-xs leading-[150%] tracking-[0.18px] text-[#737373]">
							100Jt
						</div>
						<div className="w-[50px] text-center font-geist text-xs leading-[150%] tracking-[0.18px] text-[#737373]">
							50Jt
						</div>
						<div className="w-[50px] text-center font-geist text-xs leading-[150%] tracking-[0.18px] text-[#737373]">
							25Jt
						</div>
						<div className="w-[50px] text-center font-geist text-xs leading-[150%] tracking-[0.18px] text-[#737373]">
							10Jt
						</div>
						<div className="w-[50px] text-center font-geist text-xs leading-[150%] tracking-[0.18px] text-[#737373]">
							0
						</div>
					</div>
					<div className="h-[358px] flex-1">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={ppnNetChart.data}
								margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
							>
								<CartesianGrid
									strokeDasharray="0"
									stroke="#f1f1f1"
									vertical={false}
								/>
								<XAxis
									dataKey="month"
									axisLine={false}
									tickLine={false}
									tick={{ fill: "#737373", fontSize: 12, fontFamily: "Geist" }}
								/>
								<YAxis hide />
								<Bar
									dataKey="keluaran"
									fill={COLORS[0]}
									radius={[4, 4, 0, 0]}
									barSize={32}
								/>
								<Bar
									dataKey="masukan"
									fill={COLORS[1]}
									radius={[4, 4, 0, 0]}
									barSize={32}
								/>
								<Bar
									dataKey="neto"
									fill={COLORS[2]}
									radius={[4, 4, 0, 0]}
									barSize={32}
								/>
							</BarChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			{/* Horizontal Bar Chart - Distribusi PPh */}
			<Card className="flex h-[456px] flex-col justify-between rounded-[20px] border  p-[30px]">
				<CardHeader className="h-[32px] w-full flex-shrink-0 p-0 pb-6">
					<CardTitle className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] ">
						{ppnDistributionChart.title}
					</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col justify-center gap-[10px] p-0">
					<div className="flex justify-between">
						<ResponsiveContainer width="100%" height={350}>
							<BarChart
								data={ppnDistributionChart.data}
								layout="vertical"
								margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
							>
								<CartesianGrid
									strokeDasharray="0"
									stroke="#f1f1f1"
									horizontal={false}
								/>
								<XAxis type="number" hide />
								<YAxis
									type="category"
									dataKey="category"
									axisLine={false}
									tickLine={false}
									tick={{ fill: "#737373", fontSize: 12, fontFamily: "Geist" }}
									width={94}
								/>
								<Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={59}>
									{ppnDistributionChart.data.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={HORIZONTAL_COLORS[index % HORIZONTAL_COLORS.length]}
										/>
									))}
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					</div>
					<div className="flex h-[18px] items-start justify-center gap-[15.942px]">
						{["5Jt", "10Jt", "15Jt", "20Jt", "25Jt", "30Jt"].map((label) => (
							<div
								key={label}
								className="w-[80px] flex-shrink-0 text-center font-geist text-xs leading-[150%] tracking-[0.18px] text-[#737373]"
							>
								{label}
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
