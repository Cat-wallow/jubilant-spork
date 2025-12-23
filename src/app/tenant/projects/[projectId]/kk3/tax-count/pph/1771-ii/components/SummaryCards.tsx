import { Card } from '@/components/ui/card';

interface SummaryCard {
	id: string;
	title: string;
	value: string;
	subtitle: string;
	type: 'blue' | 'green' | 'orange';
}

interface SummaryCardsProps {
	data: SummaryCard[];
}

const typeConfig = {
	blue: {
		gradient: 'bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100',
		textColor: 'text-slate-500',
		valueColor: 'text-slate-900',
		subtitleColor: 'text-blue-600',
	},
	green: {
		gradient: 'bg-gradient-to-br from-green-50 via-emerald-50 to-green-100',
		textColor: 'text-slate-500',
		valueColor: 'text-slate-900',
		subtitleColor: 'text-emerald-600',
	},
	orange: {
		gradient: 'bg-gradient-to-br from-orange-50 via-red-50 to-red-100',
		textColor: 'text-slate-500',
		valueColor: 'text-slate-900',
		subtitleColor: 'text-orange-600',
	},
};

export function SummaryCards({ data }: SummaryCardsProps) {
	return (
		<div className="grid grid-cols-1 gap-[30px] md:grid-cols-3">
			{data.map((card) => {
				const config = typeConfig[card.type];

				return (
					<Card
						key={card.id}
						className={`h-[124px] rounded-[14px] p-4 ${config.gradient}`}
					>
						<div className="flex flex-col gap-2">
							<p className={`text-base font-normal leading-6 ${config.textColor}`}>
								{card.title}
							</p>
							<h3
								className={`text-xl font-normal leading-7 tracking-[-0.5px] ${config.valueColor}`}
							>
								{card.value}
							</h3>
							<p className={`text-xs font-normal leading-4 ${config.subtitleColor}`}>
								{card.subtitle}
							</p>
						</div>
					</Card>
				);
			})}
		</div>
	);
}
