import React from "react";
import { StatsCards } from "./components/StatsCards";
import { ReconciliationTable } from "./components/ReconciliationTable";
import mockData from "./mockData.json";

export default async function ReconsiliationPage({
	params,
}: {
	params: Promise<{ projectId: string }>;
}) {
	const { projectId } = await params;

	return (
		<div className="flex flex-col gap-[21px]">
			{/* Breadcrumb */}
			<div className="flex flex-col gap-[5px]">
				<p className="font-dm text-sm font-medium leading-6 text-[#707EAE]">
					KK 4.0 &gt; KK 4.1 - Rekonsiliasi Fiskal
				</p>
				<h1 className="font-dm text-[34px] font-bold leading-[42px] tracking-[-0.68px] text-[#0B1437]">
					KK 4.1 - Rekonsiliasi Fiskal
				</h1>
			</div>

			{/* Stats Cards */}
			<StatsCards stats={mockData.stats} />

			{/* Reconciliation Table */}
			<ReconciliationTable data={mockData.reconciliationRuns} />
		</div>
	);
}
