"use client";

import { documentComplianceData } from "./data";
import { StatsCards } from "./StatsCards";
import { Charts } from "./Charts";
import { DocumentList } from "./DocumentList";

export function DocumentComplianceTab() {
	return (
		<div className="flex flex-col gap-[30px]">
			{/* Stats Cards */}
			<StatsCards stats={documentComplianceData.stats} />

			{/* Charts */}
			<Charts
				distributionChart={documentComplianceData.distributionChart}
				completenessChart={documentComplianceData.completenessChart}
			/>

			{/* Document List */}
			<DocumentList documents={documentComplianceData.documents} />
		</div>
	);
}
