import React from "react";
import { StatsCards } from "./components/StatsCards";
import { IssueTrendsChart } from "./components/IssueTrendsChart";
import { AnalysisModules } from "./components/AnalysisModules";
import { RecentIssues } from "./components/RecentIssues";
import mockData from "./mockData.json";

export default async function KK4Page({
	params,
}: {
	params: Promise<{ projectId: string }>;
}) {
	const { projectId } = await params;

	return (
		<div className="flex flex-col gap-[30px]">
			{/* Breadcrumb */}
			<div className="flex flex-col gap-[5px]">
				<p className="font-dm text-sm font-medium leading-6 text-[#707EAE]">
					KK 4.0
				</p>
				<h1 className="font-dm text-[34px] font-bold leading-[42px] tracking-[-0.68px] text-[#0B1437]">
					Kelola KK 4.0 (Analysis & Validation Perpajakan)
				</h1>
			</div>

			{/* Stats Cards */}
			<StatsCards stats={mockData.stats} />

			{/* Issue Trends Chart */}
			<IssueTrendsChart data={mockData.issueTrends} />

			{/* Analysis Modules */}
			<AnalysisModules modules={mockData.analysisModules} projectId={projectId} />

			{/* Recent Issues */}
			<RecentIssues issues={mockData.recentIssues} />
		</div>
	);
}
