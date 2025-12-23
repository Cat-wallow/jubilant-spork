import React from "react";
import { StatsCards } from "./StatsCards";
import { ReconciliationTable } from "./ReconciliationTable";
import mockData from "../mockData.json";

export default async function RunsTab(){

	return (
		<div className="flex flex-col gap-[21px]">

			{/* Stats Cards */}
			<StatsCards stats={mockData.stats} />

			{/* Reconciliation Table */}
			<ReconciliationTable data={mockData.reconciliationRuns} />
		</div>
	);
}
