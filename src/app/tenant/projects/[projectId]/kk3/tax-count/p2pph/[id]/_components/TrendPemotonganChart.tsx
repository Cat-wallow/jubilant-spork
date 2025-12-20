"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface TrendData {
	month: string;
	amount: number;
}

interface TrendPemotonganChartProps {
	data: TrendData[];
}

export function TrendPemotonganChart({ data }: TrendPemotonganChartProps) {
	const maxAmount = Math.max(...data.map((d) => d.amount));
	const minAmount = Math.min(...data.map((d) => d.amount));

	return (
		<Card className="rounded-[14px] border-[0.8px]  p-6">
			<CardHeader className="p-0 pb-[30px]">
				<CardTitle className="flex items-center gap-2  text-base ">
					<TrendingUp className="h-5 w-5" />
					Trend Pemotongan Bulanan
				</CardTitle>
			</CardHeader>
			<CardContent className="p-0">
				<div className="flex h-[427px] flex-col justify-center p-4">
					<div className="relative h-full w-full">
						{/* Grid Lines */}
						<div className="absolute inset-0 flex flex-col justify-between">
							{[0, 1, 2, 3, 4].map((i) => (
								<div key={i} className="border-t border-dashed " />
							))}
						</div>

						{/* Line Chart */}
						<svg
							className="absolute inset-0 h-full w-full"
							preserveAspectRatio="none"
						>
							<polyline
								points={data
									.map((item, index) => {
										const x = (index / (data.length - 1)) * 100;
										const y =
											100 -
											((item.amount - minAmount) / (maxAmount - minAmount)) *
												80;
										return `${x}%,${y}%`;
									})
									.join(" ")}
								fill="none"
								stroke="#3B82F6"
								strokeWidth="2"
							/>
							{data.map((item, index) => {
								const x = (index / (data.length - 1)) * 100;
								const y =
									100 -
									((item.amount - minAmount) / (maxAmount - minAmount)) * 80;
								return (
									<circle
										key={index}
										cx={`${x}%`}
										cy={`${y}%`}
										r="4"
										fill="white"
										stroke="#3B82F6"
										strokeWidth="2"
									/>
								);
							})}
						</svg>

						{/* X-axis labels */}
						<div className="absolute bottom-0 flex w-full justify-around">
							{data.map((item, index) => (
								<p
									key={index}
									className="font-inter text-xs text-muted-foreground"
								>
									{item.month}
								</p>
							))}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
