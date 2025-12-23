"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { monthlyTrendData } from "../_data/mock-data";

export function TrendChart() {
	return (
		<Card className="rounded-[14px] border-[0.8px] ">
			<CardHeader className="p-[25px]">
				<CardTitle className="flex items-center gap-2 text-base font-bold ">
					<TrendingUp className="h-5 w-5" />
					Trend Pemotongan Bulanan per Pasal
				</CardTitle>
			</CardHeader>
			<CardContent className="p-[25px] pt-0">
				<div className="h-[450px] w-full">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart
							data={monthlyTrendData}
							margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
						>
							<CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
							<XAxis
								dataKey="month"
								tick={{ fill: "#62748E", fontSize: 12 }}
								axisLine={{ stroke: "#E2E8F0" }}
							/>
							<YAxis
								tick={{ fill: "#62748E", fontSize: 12 }}
								axisLine={{ stroke: "#E2E8F0" }}
								tickFormatter={(value) =>
									`Rp ${(value / 1000000).toFixed(1)}jt`
								}
							/>
							<Tooltip
								contentStyle={{
									backgroundColor: "white",
									border: "1px solid #E2E8F0",
									borderRadius: "8px",
									padding: "12px",
								}}
								formatter={(value: number) => [
									`Rp ${value.toLocaleString("id-ID")}`,
									"",
								]}
							/>
							<Line
								type="monotone"
								dataKey="pph21"
								stroke="#3B82F6"
								strokeWidth={2}
								dot={{ fill: "#3B82F6", r: 4 }}
								activeDot={{ r: 6 }}
								name="PPh 21"
							/>
							<Line
								type="monotone"
								dataKey="pph23"
								stroke="#10B981"
								strokeWidth={2}
								dot={{ fill: "#10B981", r: 4 }}
								activeDot={{ r: 6 }}
								name="PPh 23"
							/>
							<Line
								type="monotone"
								dataKey="pph25"
								stroke="#F59E0B"
								strokeWidth={2}
								dot={{ fill: "#F59E0B", r: 4 }}
								activeDot={{ r: 6 }}
								name="PPh 25"
							/>
							<Line
								type="monotone"
								dataKey="pph29"
								stroke="#EF4444"
								strokeWidth={2}
								dot={{ fill: "#EF4444", r: 4 }}
								activeDot={{ r: 6 }}
								name="PPh 29"
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
}
