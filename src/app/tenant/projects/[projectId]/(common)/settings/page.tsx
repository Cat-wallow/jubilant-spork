"use client";

import { ActiveServiceSection } from "./components/ActiveServiceSection";
import { SlaBaselineTable } from "./components/SlaBaselineTable";
import { NumberingOverrideTable } from "./components/NumberingOverrideTable";
import { ImpactSummary } from "./components/ImpactSummary";
import { Card } from "@/components/ui/card";

export default function SettingsPage() {
	return (
		// <div className="flex w-full flex-col gap-[30px] lg:flex-row lg:items-start">
		<Card className="flex   p-6  flex-col gap-[50px]">
			{/* Left Column - Main Content */}
			<div className="flex flex-1 flex-col gap-[30px]">
				{/* Active Service Section */}
				<ActiveServiceSection />

				{/* SLA & Baseline Table */}
				<SlaBaselineTable />

				{/* Numbering Override Table */}
				<NumberingOverrideTable />
			</div>

			{/* Right Column - Impact Summary */}
			<div className="w-full lg:w-auto">
				<ImpactSummary />
			</div>
		</Card>
	);
}
