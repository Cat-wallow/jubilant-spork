import { DetailTable } from './components/DetailTable';
import { SummaryCards } from './components/SummaryCards';
import { mockData } from './data/mock-data';

export default function Form1771IIPage() {
	return (
		<div className="flex flex-col gap-6">
			<DetailTable data={mockData.tableData} />
			<SummaryCards data={mockData.summaryCards} />
		</div>
	);
}
