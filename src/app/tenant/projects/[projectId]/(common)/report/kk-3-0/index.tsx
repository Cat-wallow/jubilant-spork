"use client";

import { kk30Data } from "./data";
import { StatsCards } from "./StatsCards";
import { Charts } from "./Charts";
import { TaxDetailsTable } from "./TaxDetailsTable";

export function KK30Tab() {
	return (
		<div className="flex flex-col gap-[30px]">
			{/* Stats Cards */}
			<StatsCards stats={kk30Data.stats} />

			{/* Charts */}
			<Charts
				ppnNetChart={kk30Data.ppnNetChart}
				ppnDistributionChart={kk30Data.ppnDistributionChart}
			/>

			{/* Tax Details Table */}
			<TaxDetailsTable data={kk30Data.taxDetails} />
		</div>
	);
}
