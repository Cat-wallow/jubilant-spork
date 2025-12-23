import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Database, Calculator, TrendingUp } from "lucide-react";

interface StatCardProps {
	icon: React.ReactNode;
	label: string;
	value: string | number;
	subtitle?: string;
	subtitleColor?: string;
	badgeText?: string;
	badgeColor?: string;
}

function StatCard({
	icon,
	label,
	value,
	subtitle,
	subtitleColor,
	badgeText,
	badgeColor,
}: StatCardProps) {
	return (
		<Card className="flex py-4 flex-1 items-center gap-[18px] border  px-6 ">
			<div className="flex h-14 w-14 items-center justify-center gap-2.5 rounded-[28px]">
				{icon}
			</div>
			<div className="flex flex-col">
				<div className="text-sm font-bold leading-6 tracking-[-0.28px] text-muted-foreground">
					{label}
				</div>
				<div className="text-2xl text-nowrap font-bold leading-8 tracking-[-0.48px] ">
					{value}
				</div>
				{subtitle && (
					<div
						className={cn(
							"text-xs font-bold leading-5 tracking-[-0.24px]",
							subtitleColor,
						)}
					>
						{subtitle}
					</div>
				)}
			</div>
		</Card>
	);
}

function cn(...classes: (string | undefined)[]) {
	return classes.filter(Boolean).join(" ");
}

export function StatsCards() {
	const stats = [
		{
			icon: <FileText className="h-[30px] w-[30px] text-primary" />,
			label: "Total Vouchers",
			value: "4",
			subtitle: "/30",
			subtitleColor: "text-[#05CD99]",
			badgeText: "Draft",
			badgeColor: "text-muted-foreground",
		},
		{
			icon: <Database className="h-[30px] w-[30px] text-primary" />,
			label: "Chart of Accounts",
			value: "14",
			subtitle: "14 active accounts",
			subtitleColor: "text-[#096]",
			badgeText: "Active",
			badgeColor: "text-[#007A55]",
		},
		{
			icon: <Calculator className="h-[30px] w-[30px] text-primary" />,
			label: "Trial Balance",
			value: "Balanced",
			subtitle: "As of 3/10/2025",
			subtitleColor: "text-[#7F22FE]",
			badgeText: "OK",
			badgeColor: "text-[#7008E7]",
		},
		{
			icon: <TrendingUp className="h-[30px] w-[30px] text-primary" />,
			label: "Journal Value",
			value: "Rp 165.500.000",
			subtitle: "Posted vouchers only",
			subtitleColor: "text-[#E17100]",
			badgeText: "YTD",
			badgeColor: "text-[#BB4D00]",
		},
	];

	return (
		<div className="grid grid-cols-4  gap-4 ">
			{stats.map((stat, index) => (
				<StatCard key={index} {...stat} />
			))}
		</div>
	);
}
