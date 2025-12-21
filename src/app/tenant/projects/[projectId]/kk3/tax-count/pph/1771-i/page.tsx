import { CalculationCard } from './components/CalculationCard';
import { mockData } from './data/mock-data';

export default function Form1771IPage() {
	return (
		<div className="flex flex-col gap-6">
			<CalculationCard data={mockData} />
		</div>
	);
}
