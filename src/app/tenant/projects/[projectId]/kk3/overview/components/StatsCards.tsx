import { Card } from "@/components/ui/card";
import { DollarSign, Calculator, TrendingUp, FileCheck } from "lucide-react";

interface Stat {
	id: string;
	label: string;
	value: string;
	subtitle?: string;
	change?: string;
	changeLabel?: string;
	icon: string;
}

interface StatsCardsProps {
	stats: Stat[];
}

const iconMap: Record<string, React.ElementType> = {
	money: DollarSign,
	calculator: Calculator,
	trend: TrendingUp,
	file: FileCheck,
};

export function StatsCards({ stats }: StatsCardsProps) {
	return (
		<div className="grid grid-cols-4 gap-4 ">
			{stats.map((stat) => {
				const Icon = iconMap[stat.icon] || DollarSign;

				return (
					<Card
						key={stat.id}
						className="flex h-[97px] text-nowrap flex-1 items-center gap-[18px] rounded-[20px] border  bg-card px-5 py-1.5 "
					>
						<div className="flex h-14 w-14 items-center justify-center rounded-[28px] bg-background">
							<Icon className="h-[30px] w-[30px] text-primary" />
						</div>
						<div className="flex flex-col items-start">
							<div className="text-sm font-bold leading-6 tracking-[-0.28px] text-muted-foreground">
								{stat.label}
							</div>
							<div className="text-2xl font-bold leading-8 tracking-[-0.48px] ">
								{stat.value}
							</div>
							<div className="flex items-center gap-1">
								{stat.change && (
									<span className="text-xs font-bold leading-5 tracking-[-0.24px] text-[#05CD99]">
										{stat.change}
									</span>
								)}
								<span className="text-xs leading-5 tracking-[-0.24px] text-muted-foreground">
									{stat.subtitle || stat.changeLabel}
								</span>
							</div>
						</div>
					</Card>
				);
			})}
		</div>
	);
}
