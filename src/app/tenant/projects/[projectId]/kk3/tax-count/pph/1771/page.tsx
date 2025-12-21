import { StatsCards } from './components/StatsCards';
import { CalculationForm } from './components/CalculationForm';
import { mockData } from './data/mock-data';

export default function Form1771Page() {
	return (
		<div className="flex flex-col gap-6">
			<StatsCards data={mockData.stats} />
			<CalculationForm data={mockData.calculation} />
		</div>
	);
}
