"use client";

import { kk10Data } from "./data";
import { StatsCards } from "./StatsCards";
import { Charts } from "./Charts";
import { TransactionList } from "./TransactionList";

export function KK10Tab() {
	return (
		<div className="flex flex-col gap-[30px]">
			{/* Stats Cards */}
			<StatsCards stats={kk10Data.stats} />

			{/* Charts */}
			<Charts
				volumeChart={kk10Data.volumeChart}
				anomalyTrendChart={kk10Data.anomalyTrendChart}
			/>

			{/* Transaction List */}
			<TransactionList transactions={kk10Data.transactions} />
		</div>
	);
}
