"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Pie,
	PieChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";

interface SeverityDistributionProps {
	title: string;
	data: Array<{
		name: string;
		value: number;
		fill: string;
	}>;
}

interface EqualisasiChartProps {
	title: string;
	data: Array<{
		category: string;
		spt: number;
		laporan: number;
	}>;
}

interface ChartsProps {
	severityDistribution: SeverityDistributionProps;
	equalisasiChart: EqualisasiChartProps;
}

export function Charts({ severityDistribution, equalisasiChart }: ChartsProps) {
	return (
		<div className="grid grid-cols-1 gap-[30px] lg:grid-cols-2">
			{/* Pie Chart - Distribusi Severity Temuan */}
			<Card className="flex flex-col items-center justify-center gap-[30px] rounded-[20px] border  p-[30px]">
				<CardHeader className="h-[32px] w-full p-0">
					<CardTitle className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] ">
						{severityDistribution.title}
					</CardTitle>
				</CardHeader>
				<CardContent className="relative h-[354px] w-[594px] p-0">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={severityDistribution.data}
								cx="50%"
								cy="50%"
								innerRadius={0}
								outerRadius={169}
								startAngle={90}
								endAngle={450}
								dataKey="value"
								stroke="#fff"
								strokeWidth={2}
							>
								{severityDistribution.data.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.fill} />
								))}
							</Pie>
						</PieChart>
					</ResponsiveContainer>
					{/* Labels */}
					<div className="absolute left-0 top-[14px] flex h-[23px] w-[117px] flex-col justify-center font-inter text-xs text-[#34C759]">
						Low 20
					</div>
					<div className="absolute right-[0px] top-[226px] flex h-[23px] w-[139px] flex-col justify-center font-inter text-xs text-[#FF8D28]">
						Medium 4
					</div>
					<div className="absolute bottom-[0px] left-[346px] flex h-[23px] w-[169px] flex-col justify-center font-inter text-xs text-[#FF383C]">
						High 5
					</div>
				</CardContent>
			</Card>

			{/* Bar Chart - Equalisasi SPT vs Laporan */}
			<Card className="flex flex-col items-center rounded-[20px] border  p-[30px]">
				<CardHeader className="h-[32px] w-full p-0 pb-6">
					<CardTitle className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] ">
						{equalisasiChart.title}
					</CardTitle>
				</CardHeader>
				<CardContent className="flex w-full flex-1 items-start p-0">
					<div className="flex flex-col items-start justify-center gap-[40px]">
						<div className="w-[50px] text-center font-geist text-xs leading-[150%] tracking-[0.18px] text-[#737373]">
							100
						</div>
						<div className="w-[50px] text-center font-geist text-xs leading-[150%] tracking-[0.18px] text-[#737373]">
							50
						</div>
						<div className="w-[50px] text-center font-geist text-xs leading-[150%] tracking-[0.18px] text-[#737373]">
							25
						</div>
						<div className="w-[50px] text-center font-geist text-xs leading-[150%] tracking-[0.18px] text-[#737373]">
							10
						</div>
						<div className="w-[50px] text-center font-geist text-xs leading-[150%] tracking-[0.18px] text-[#737373]">
							0
						</div>
					</div>
					<div className="h-[358px] flex-1">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={equalisasiChart.data}
								margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
							>
								<CartesianGrid
									strokeDasharray="0"
									stroke="#f1f1f1"
									vertical={false}
								/>
								<XAxis
									dataKey="category"
									axisLine={false}
									tickLine={false}
									tick={{ fill: "#737373", fontSize: 12, fontFamily: "Geist" }}
								/>
								<YAxis hide />
								<Bar
									dataKey="spt"
									fill="#0088FF"
									radius={[4, 4, 0, 0]}
									barSize={38}
								/>
								<Bar
									dataKey="laporan"
									fill="#A3B9F8"
									radius={[4, 4, 0, 0]}
									barSize={38}
								/>
							</BarChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
