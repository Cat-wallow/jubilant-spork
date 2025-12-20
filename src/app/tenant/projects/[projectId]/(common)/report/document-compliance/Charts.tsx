"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PieChart from "@/components/charts/PieChart";
import BarChart from "@/components/charts/BarChart";

interface ChartsProps {
	distributionChart: {
		series: number[];
		labels: string[];
		colors: string[];
	};
	completenessChart: {
		categories: string[];
		series: Array<{
			name: string;
			data: number[];
			color: string;
		}>;
	};
}

export function Charts({ distributionChart, completenessChart }: ChartsProps) {
	const pieChartOptions = {
		labels: distributionChart.labels,
		colors: distributionChart.colors,
		chart: {
			type: "pie" as const,
		},
		legend: {
			position: "bottom" as const,
			horizontalAlign: "center" as const,
		},
		dataLabels: {
			enabled: true,
			formatter: function (val: number) {
				return val.toFixed(0) + "%";
			},
		},
		plotOptions: {
			pie: {
				donut: {
					labels: {
						show: false,
					},
				},
			},
		},
	};

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
				columnWidth: "45%",
				borderRadius: 4,
			},
		},
		dataLabels: {
			enabled: false,
		},
		xaxis: {
			categories: completenessChart.categories,
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
		colors: completenessChart.series.map((s) => s.color),
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
			{/* Distribution Chart */}
			<Card className="border  p-[30px]">
				<CardHeader className="p-0 pb-6">
					<CardTitle className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] ">
						Distribusi Status Dokumen
					</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					<div className="h-[350px]">
						<PieChart
							chartData={distributionChart.series}
							chartOptions={pieChartOptions}
						/>
					</div>
				</CardContent>
			</Card>

			{/* Completeness Chart */}
			<Card className="border  p-[30px]">
				<CardHeader className="p-0 pb-6">
					<CardTitle className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] ">
						Kelengkapa Berdasarkan Jenis Dokumen
					</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					<div className="h-[350px]">
						<BarChart
							chartData={completenessChart.series}
							chartOptions={barChartOptions}
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
