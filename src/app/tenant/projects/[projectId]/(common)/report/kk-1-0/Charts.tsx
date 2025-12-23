"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";

interface ChartsProps {
	volumeChart: {
		categories: string[];
		series: Array<{
			name: string;
			data: number[];
			color: string;
		}>;
	};
	anomalyTrendChart: {
		categories: string[];
		series: Array<{
			name: string;
			data: number[];
			color: string;
		}>;
	};
}

export function Charts({ volumeChart, anomalyTrendChart }: ChartsProps) {
	const barChartOptions = {
		chart: {
			type: "bar" as const,
			toolbar: {
				show: false,
			},
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: "55%",
				borderRadius: 4,
			},
		},
		dataLabels: {
			enabled: false,
		},
		xaxis: {
			categories: volumeChart.categories,
			labels: {
				style: {
					colors: "#737373",
					fontSize: "12px",
					fontFamily: "Geist, sans-serif",
				},
			},
		},
		yaxis: {
			labels: {
				style: {
					colors: "#737373",
					fontSize: "12px",
					fontFamily: "Geist, sans-serif",
				},
			},
		},
		colors: volumeChart.series.map((s) => s.color),
		legend: {
			position: "top" as const,
			horizontalAlign: "right" as const,
		},
		grid: {
			borderColor: "#f1f1f1",
		},
	};

	const lineChartOptions = {
		chart: {
			type: "line" as const,
			toolbar: {
				show: false,
			},
			zoom: {
				enabled: false,
			},
		},
		stroke: {
			curve: "smooth" as const,
			width: 2,
		},
		dataLabels: {
			enabled: false,
		},
		xaxis: {
			categories: anomalyTrendChart.categories,
			labels: {
				style: {
					colors: "#737373",
					fontSize: "12px",
					fontFamily: "Geist, sans-serif",
				},
			},
		},
		yaxis: {
			labels: {
				style: {
					colors: "#737373",
					fontSize: "12px",
					fontFamily: "Geist, sans-serif",
				},
			},
		},
		colors: anomalyTrendChart.series.map((s) => s.color),
		legend: {
			position: "top" as const,
			horizontalAlign: "right" as const,
		},
		grid: {
			borderColor: "#f1f1f1",
		},
	};

	return (
		<div className="grid grid-cols-1 gap-[30px] lg:grid-cols-2">
			{/* Volume Chart */}
			<Card className="border  p-[30px]">
				<CardHeader className="p-0 pb-6">
					<CardTitle className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] ">
						Volume Berdasarkan Jenis Transaksi
					</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					<div className="h-[350px]">
						<BarChart
							chartData={volumeChart.series}
							chartOptions={barChartOptions}
						/>
					</div>
				</CardContent>
			</Card>

			{/* Anomaly Trend Chart */}
			<Card className="border  p-[30px]">
				<CardHeader className="p-0 pb-6">
					<CardTitle className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] ">
						Tren Anomali
					</CardTitle>
					<CardDescription className=" text-xs text-[#8C8C8C]">
						Tren transaksi yang bersifat anomali
					</CardDescription>
				</CardHeader>
				<CardContent className="p-0">
					<div className="h-[350px]">
						<LineChart
							chartData={anomalyTrendChart.series}
							chartOptions={lineChartOptions}
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
