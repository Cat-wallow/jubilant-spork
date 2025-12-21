import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface CalculationItem {
	id: string;
	label: string;
	description: string;
	value: string;
	type: 'default' | 'highlighted' | 'warning';
}

interface CalculationFormProps {
	data: {
		leftColumn: CalculationItem[];
		rightColumn: CalculationItem[];
	};
}

export function CalculationForm({ data }: CalculationFormProps) {
	const renderItem = (item: CalculationItem) => {
		const isHighlighted = item.type === 'highlighted';
		const isWarning = item.type === 'warning';

		return (
			<div
				key={item.id}
				className={`flex items-center justify-between rounded-[10px] border px-4 py-[17px] ${
					isHighlighted
						? 'border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50'
						: isWarning
							? 'h-[71.6px] border-red-200 bg-gradient-to-r from-red-50 to-orange-50'
							: 'border-slate-200 bg-slate-50'
				}`}
			>
				<div className="flex flex-col gap-1">
					<p
						className={`text-sm font-normal leading-[14px] ${
							isHighlighted
								? 'text-blue-600'
								: isWarning
									? 'text-red-600'
									: 'text-slate-700'
						}`}
					>
						{item.label}
					</p>
					<p
						className={`text-sm font-normal leading-5 ${
							isHighlighted
								? 'text-blue-500'
								: isWarning
									? 'text-red-500'
									: 'text-slate-500'
						}`}
					>
						{item.description}
					</p>
				</div>
				<div
					className={`font-mono text-base font-bold leading-6 ${
						isHighlighted
							? 'text-blue-900'
							: isWarning
								? 'text-red-600'
								: 'text-slate-900'
					}`}
				>
					{item.value}
				</div>
			</div>
		);
	};

	return (
		<Card className="rounded-[14px] border border-slate-200 bg-white p-0.5 shadow-sm">
			<CardHeader className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 p-6">
				<CardTitle className="flex items-center gap-3">
					<div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-blue-100">
						<FileText className="h-5 w-5 text-blue-600" strokeWidth={1.67} />
					</div>
					<span className="font-normal text-base leading-4 text-slate-900">
						Form 1771 - SPT Tahunan PPh Badan
					</span>
				</CardTitle>
			</CardHeader>
			<CardContent className="p-6">
				<div className="flex items-center gap-[30px]">
					<div className="flex flex-1 flex-col gap-5">
						{data.leftColumn.map((item) => renderItem(item))}
					</div>
					<div className="flex flex-1 flex-col gap-5">
						{data.rightColumn.map((item) => renderItem(item))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
