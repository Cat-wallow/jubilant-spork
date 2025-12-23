import { StatsCards } from "./components/StatsCards";
import { JournalTable } from "./components/JournalTable";
import { journalListData, journalStatsData } from "./mock-data";
import { Card } from "@/components/ui/card";

export default function KK2JournalPage() {
	return (
		<div className="flex  flex-col items-start gap-6">
			<StatsCards data={journalStatsData} />
			<JournalTable data={journalListData} />
		</div>
	);
}
