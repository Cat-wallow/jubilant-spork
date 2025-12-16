"use client";

import { kk40Data } from "./data";
import { StatsCards } from "./StatsCards";
import { Charts } from "./Charts";
import { FindingsTable } from "./FindingsTable";

export function KK40Tab() {
	return (
		<div className="flex flex-col gap-[30px]">
			{/* Stats Cards */}
			<StatsCards stats={kk40Data.stats} />

			{/* Charts */}
			<Charts
				severityDistribution={kk40Data.severityDistribution}
				equalisasiChart={kk40Data.equalisasiChart}
			/>

			{/* Findings Table */}
			<FindingsTable data={kk40Data.findings} />
		</div>
	);
}
