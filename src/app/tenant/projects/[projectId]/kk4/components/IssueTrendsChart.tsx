"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface IssueTrendsData {
	title: string;
	description: string;
	data: Array<{
		month: string;
		Critical: number;
		Warning: number;
		Resolved: number;
	}>;
	lines: Array<{
		dataKey: string;
		stroke: string;
		name: string;
	}>;
}

interface IssueTrendsChartProps {
	data: IssueTrendsData;
}

const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		return (
			<div className="rounded-lg border border-[#E2E8F0] bg-white p-3 shadow-lg">
				<p className="mb-2 text-sm font-semibold text-[#1A1A2E]">{label}</p>
				{payload.map((entry: any, index: number) => (
					<div key={index} className="flex items-center gap-2">
						<div
							className="h-3 w-3 rounded-full"
							style={{ backgroundColor: entry.color }}
						/>
						<span className="text-xs text-[#64748B]">
							{entry.name}: {entry.value}
						</span>
					</div>
				))}
			</div>
		);
	}
	return null;
};

const CustomLegend = ({ payload }: any) => {
	return (
		<div className="flex items-center justify-center gap-6 pt-4">
			{payload?.map((entry: any, index: number) => (
				<div key={index} className="flex items-center gap-2">
					<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
						<g clipPath="url(#clip0)">
							<path
								d="M0 6.99935H4.66667M4.66667 6.99935C4.66667 6.38051 4.9125 5.78702 5.35008 5.34943C5.78767 4.91185 6.38116 4.66602 7 4.66602C7.61884 4.66602 8.21233 4.91185 8.64992 5.34943C9.0875 5.78702 9.33333 6.38051 9.33333 6.99935M4.66667 6.99935C4.66667 7.61819 4.9125 8.21168 5.35008 8.64927C5.78767 9.08685 6.38116 9.33268 7 9.33268C7.61884 9.33268 8.21233 9.08685 8.64992 8.64927C9.0875 8.21168 9.33333 7.61819 9.33333 6.99935M9.33333 6.99935H14"
								stroke={entry.color}
								strokeWidth="1.75"
							/>
						</g>
						<defs>
							<clipPath id="clip0">
								<rect width="14" height="14" fill="white" />
							</clipPath>
						</defs>
					</svg>
					<span className="text-center text-sm text-[#64748B]">
						{entry.value}
					</span>
				</div>
			))}
		</div>
	);
};

export function IssueTrendsChart({ data }: IssueTrendsChartProps) {
	return (
		<Card className="rounded-[14.5px] border-[0.8px] border-[rgba(226,232,240,0.5)] bg-white shadow-sm">
			<CardHeader className="p-[21px]">
				<CardTitle className="text-sm leading-[14px] text-[#1A1A2E]">
					{data.title}
				</CardTitle>
				<CardDescription className="text-sm leading-[21px] text-[#64748B]">
					{data.description}
				</CardDescription>
			</CardHeader>
			<CardContent className="p-[10px]">
				<ResponsiveContainer width="100%" height={400}>
					<LineChart
						data={data.data}
						margin={{ top: 27, right: 116, bottom: 41, left: 56 }}
					>
						<CartesianGrid
							strokeDasharray="3 3"
							stroke="#CCCCCC"
							vertical={true}
							horizontal={true}
						/>
						<XAxis
							dataKey="month"
							tick={{ fill: "#666666", fontSize: 12, fontFamily: "Inter" }}
							tickLine={{ stroke: "#666666" }}
							axisLine={{ stroke: "#666666" }}
							dy={10}
						/>
						<YAxis
							tick={{ fill: "#666666", fontSize: 12, fontFamily: "Inter" }}
							tickLine={{ stroke: "#666666" }}
							axisLine={{ stroke: "#666666" }}
							dx={-10}
							domain={[0, 28]}
							ticks={[0, 7, 14, 21, 28]}
						/>
						<Tooltip content={<CustomTooltip />} />
						<Legend content={<CustomLegend />} />
						{data.lines.map((line) => (
							<Line
								key={line.dataKey}
								type="monotone"
								dataKey={line.dataKey}
								stroke={line.stroke}
								strokeWidth={2}
								dot={{
									fill: "white",
									stroke: line.stroke,
									strokeWidth: 2,
									r: 4,
								}}
								activeDot={{ r: 6 }}
								name={line.name}
							/>
						))}
					</LineChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
