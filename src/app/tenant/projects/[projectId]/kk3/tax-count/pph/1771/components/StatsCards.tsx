import { Card } from '@/components/ui/card';
import { TrendingUp, FileText, Receipt, AlertTriangle } from 'lucide-react';

interface StatData {
	id: string;
	title: string;
	value: string;
	subtitle: string;
	badge: string;
	type: 'green' | 'blue' | 'purple' | 'warning';
}

interface StatsCardsProps {
	data: StatData[];
}

const typeConfig = {
	green: {
		gradient: 'bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100',
		iconBg: 'bg-emerald-100',
		iconColor: 'text-emerald-600',
		badgeBg: 'bg-emerald-100',
		badgeColor: 'text-emerald-700',
		textColor: 'text-emerald-600',
		circleColor: 'bg-emerald-500/10',
		Icon: TrendingUp,
	},
	blue: {
		gradient: 'bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100',
		iconBg: 'bg-blue-100',
		iconColor: 'text-blue-600',
		badgeBg: 'bg-blue-100',
		badgeColor: 'text-blue-700',
		textColor: 'text-blue-600',
		circleColor: 'bg-blue-500/10',
		Icon: FileText,
	},
	purple: {
		gradient: 'bg-gradient-to-br from-violet-50 via-purple-50 to-violet-100',
		iconBg: 'bg-violet-100',
		iconColor: 'text-violet-600',
		badgeBg: 'bg-violet-100',
		badgeColor: 'text-purple-700',
		textColor: 'text-purple-600',
		circleColor: 'bg-purple-500/10',
		Icon: Receipt,
	},
	warning: {
		gradient: 'bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50',
		iconBg: 'bg-yellow-100',
		iconColor: 'text-orange-600',
		badgeBg: 'bg-red-100',
		badgeColor: 'text-red-700',
		textColor: 'text-orange-600',
		circleColor: 'bg-orange-500/10',
		Icon: AlertTriangle,
	},
};

export function StatsCards({ data }: StatsCardsProps) {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
			{data.map((stat) => {
				const config = typeConfig[stat.type];
				const Icon = config.Icon;

				return (
					<Card
						key={stat.id}
						className={`relative overflow-hidden rounded-[14px] border border-black/10 p-0 shadow-sm ${config.gradient}`}
					>
						<div className="relative h-[172px] p-6">
							<div className="flex items-start justify-between">
								<div
									className={`flex h-9 w-9 items-center justify-center rounded-[10px] ${config.iconBg}`}
								>
									<Icon className={`h-5 w-5 ${config.iconColor}`} strokeWidth={1.67} />
								</div>
								<div
									className={`rounded-full px-2 py-1 text-xs font-normal leading-4 ${config.badgeBg} ${config.badgeColor}`}
								>
									{stat.badge}
								</div>
							</div>

							<div className="mt-3">
								<p className="text-sm font-normal leading-5 text-slate-600">{stat.title}</p>
								<h3 className="mt-1 text-2xl font-bold leading-8 text-slate-900">
									{stat.value}
								</h3>
								<p className={`mt-1 text-xs font-normal leading-4 ${config.textColor}`}>
									{stat.subtitle}
								</p>
							</div>

							<div
								className={`absolute -right-8 -top-8 h-20 w-20 rounded-full ${config.circleColor}`}
							/>
						</div>
					</Card>
				);
			})}
		</div>
	);
}
