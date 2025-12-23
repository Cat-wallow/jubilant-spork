import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator, Edit } from 'lucide-react';

interface CalculationItem {
	id: string;
	label: string;
	description?: string;
	value: string;
	badge?: string;
	badgeColor?: string;
	editable?: boolean;
}

interface Section {
	title: string;
	items: CalculationItem[];
}

interface CalculationCardProps {
	data: {
		sections: Section[];
		total: {
			label: string;
			description: string;
			value: string;
			badge: string;
		};
	};
}

export function CalculationCard({ data }: CalculationCardProps) {
	const renderItem = (item: CalculationItem, isTotal: boolean = false) => {
		const isCalculated = item.badge === 'Calculated';
		const isAutoFilled = item.badge === 'Auto-filled';
		const isReference = item.badge?.includes('=');

		return (
			<div
				key={item.id}
				className={`flex items-center justify-between gap-4 rounded-[10px] border px-4 ${
					isTotal
						? 'h-[72.8px] border-emerald-200 bg-gradient-to-r from-green-50 to-emerald-50 py-4'
						: isCalculated
							? 'h-[67.2px] border-emerald-300 bg-gradient-to-r from-emerald-50 to-green-100 py-5'
							: 'border-slate-200 bg-slate-50 py-4'
				}`}
			>
				<div className="flex flex-1 items-center gap-4">
					<div className="flex flex-col gap-1">
						<p
							className={`text-sm font-normal leading-[14px] ${
								isTotal
									? 'text-slate-900'
									: isCalculated
										? 'font-bold text-emerald-700'
										: 'text-slate-700'
							}`}
						>
							{item.label}
						</p>
						{item.description && (
							<p
								className={`text-sm font-normal leading-5 ${
									isTotal
										? 'text-slate-500'
										: isCalculated
											? 'text-emerald-600'
											: 'text-slate-500'
								}`}
							>
								{item.description}
							</p>
						)}
					</div>
					{item.badge && (
						<Badge
							className={`h-[21.6px] rounded-lg border px-2 py-0.5 text-xs font-normal leading-4 ${
								isCalculated
									? 'border-transparent bg-emerald-200 text-emerald-900 hover:bg-emerald-200'
									: isAutoFilled
										? 'border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-50'
										: isReference
											? 'border-emerald-400 bg-emerald-100 text-emerald-700 hover:bg-emerald-100'
											: 'border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-50'
							}`}
						>
							{item.badge}
						</Badge>
					)}
				</div>
				<div className="flex items-center gap-3">
					<span
						className={`font-mono text-base font-normal leading-6 ${
							isTotal
								? 'text-emerald-600'
								: isCalculated
									? 'font-bold text-emerald-900'
									: 'text-slate-900'
						}`}
					>
						{item.value}
					</span>
					{item.editable && (
						<button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-100">
							<Edit className="h-4 w-4 text-slate-900" strokeWidth={1.33} />
						</button>
					)}
					{isTotal && (
						<Badge className="h-[21.6px] rounded-lg border-transparent bg-slate-200 px-2 py-0.5 text-xs font-normal leading-4 text-slate-900 hover:bg-slate-200">
							{data.total.badge}
						</Badge>
					)}
				</div>
			</div>
		);
	};

	return (
		<Card className="flex flex-col gap-12 rounded-[14px] border border-slate-200 bg-white p-0.5 shadow-sm">
			<CardHeader className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 p-6">
				<CardTitle className="flex items-center gap-3">
					<div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-emerald-100">
						<Calculator className="h-5 w-5 text-emerald-600" strokeWidth={1.67} />
					</div>
					<span className="font-bold text-base leading-4 text-slate-900">
						Form 1771-I - Perhitungan Penghasilan Neto Fiskal
					</span>
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-5 px-6 pb-6 pt-0">
				{data.sections.map((section, idx) => (
					<div key={idx} className="flex flex-col gap-6">
						<div className="flex items-end gap-2">
							{section.title.includes('1.') && (
								<div className="h-6 w-2 rounded-full bg-emerald-500" />
							)}
							<h4 className="text-lg font-bold leading-7 text-slate-900">{section.title}</h4>
						</div>
						<div className="flex flex-col gap-4">
							{section.items.map((item) => renderItem(item))}
						</div>
					</div>
				))}

				<div className="border-t border-black/10 pt-4">
					{renderItem(
						{
							id: 'total',
							label: data.total.label,
							description: data.total.description,
							value: data.total.value,
						},
						true,
					)}
				</div>
			</CardContent>
		</Card>
	);
}
