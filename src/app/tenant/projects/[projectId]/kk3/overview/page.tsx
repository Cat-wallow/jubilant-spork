import React from "react";
import mockData from "./mockData.json";
import { StatsCards } from "./components/StatsCards";
import { PPNTrendChart } from "./components/PPNTrendChart";
import { PpnDistributionAnalysis } from "./components/PpnDistributionAnalysis";
import { DaftarSPTTable } from "./components/DaftarSPTTable";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function KK3OverviewPage() {
	// Transform PPh Data for PpnDistributionAnalysis
	const pphDistributionData = mockData.pphDistribution;
	const transformedPphData = {
		totalPph: pphDistributionData.total,
		breakdown: pphDistributionData.breakdown.map((item) => ({
			label: item.type,
			value: item.amount,
			percentage: item.percentage,
			color: item.color,
			rawValue: parseInt(item.amount.replace(/[^0-9]/g, ""), 10),
		})),
		stats: {
			largestContribution: {
				label: pphDistributionData.insights.largest.split(" (")[0],
				percentage: pphDistributionData.insights.largest
					.split(" (")[1]
					.replace(")", ""),
			},
			averagePerType: pphDistributionData.insights.average,
			diversification: pphDistributionData.insights.diversity,
		},
		compliance: {
			status: pphDistributionData.compliance.status,
			description: pphDistributionData.compliance.message,
			details: pphDistributionData.compliance.details.map((d) => ({
				type: d.type,
				status: d.status as "On Time" | "Planned" | "Late",
				dateLabel: d.status === "Planned" ? "Due" : "Setor",
				date: d.date,
			})),
		},
	};

	// Transform PPN Trend Data for PPNTrendChart
	const ppnTrendData = {
		...mockData.ppnTrend,
		changeLabel: mockData.ppnTrend.changeLabel, // Ensure changeLabel is passed
	};

	return (
		<div className="flex flex-col gap-[30px] p-[30px]">
			{/* Stats Cards */}
			<StatsCards stats={mockData.stats} />

			{/* Charts Row */}
			<div className="flex gap-[30px] max-lg:flex-col">
				<PPNTrendChart data={ppnTrendData} />
				<PpnDistributionAnalysis data={transformedPphData} />
			</div>

			{/* Table */}
			<DaftarSPTTable />
		</div>
	);
}
