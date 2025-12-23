import { FileCheck, Wallet, Calculator, DollarSign } from "lucide-react";
import { StatsCard } from "../data/mockData";

interface StatsCardsProps {
	stats: StatsCard[];
}

const iconMap = {
	"file-done": FileCheck,
	wallet: Wallet,
	calculator: Calculator,
	money: DollarSign,
};

export default function StatsCards({ stats }: StatsCardsProps) {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
			{stats.map((stat, index) => {
				const Icon = iconMap[stat.icon as keyof typeof iconMap];
				return (
					<div
						key={index}
						className="flex text-nowrap items-center gap-4 py-3 overflow-hidden rounded-[20px] border border-[rgba(145,158,171,0.2)] bg-card px-4 shadow-sm"
					>
						<div className="flex h-14 w-14 items-center justify-center rounded-full">
							{Icon && <Icon className="h-8 w-8 text-primary" />}
						</div>
						<div className="flex flex-col">
							<div className="font-dm text-sm font-bold leading-6 tracking-tight text-muted-foreground">
								{stat.label}
							</div>
							<div className="font-dm text-2xl font-bold leading-8 tracking-tight ">
								{stat.value}
							</div>
							<div className="mt-1 flex items-center gap-1 text-xs">
								{stat.subtitle.includes("/") && (
									<>
										<span className="font-dm font-bold text-[#05CD99]">
											{stat.subtitle.split(" ")[0]}
										</span>
										<span className="font-dm text-muted-foreground">
											{stat.subtitle.substring(stat.subtitle.indexOf(" "))}
										</span>
									</>
								)}
								{!stat.subtitle.includes("/") && (
									<span className="font-dm text-muted-foreground">
										{stat.subtitle}
									</span>
								)}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
