import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	FileText,
	CheckCircle,
	AlertCircle,
	DollarSign,
	Workflow,
} from "lucide-react";

interface StatCardProps {
	icon: React.ReactNode;
	label: string;
	value: string | number;
	subtitle: string;
	subtitleColor: string;
}

function StatCard({
	icon,
	label,
	value,
	subtitle,
	subtitleColor,
}: StatCardProps) {
	return (
		<Card className="flex  flex-1 items-center py-2 overflow-hidden gap-[18px] border border-[rgba(145,158,171,0.20)] px-2 ">
			<div className="flex text-nowrap h-14 w-14 items-center justify-center gap-2.5 rounded-[28px]">
				{icon}
			</div>
			<div className="flex flex-col">
				<div className="text-sm text-nowrap font-bold leading-6 tracking-[-0.28px] text-muted-foreground">
					{label}
				</div>
				<div className="text-2xl text-nowrap font-bold leading-8 tracking-[-0.48px] ">
					{value}
				</div>
				<div
					className={`text-xs text-nowrap leading-5 tracking-[-0.24px] ${subtitleColor}`}
				>
					{subtitle}
				</div>
			</div>
		</Card>
	);
}

export function StatsCards() {
	const stats = [
		{
			icon: <FileText className="h-[30px] w-[30px] text-primary" />,
			label: "Total Voucher",
			value: "20",
			subtitle: "/30 Draft",
			subtitleColor: "text-muted-foreground",
		},
		{
			icon: <CheckCircle className="h-[30px] w-[30px] text-primary" />,
			label: "Posted",
			value: "20",
			subtitle: "Final",
			subtitleColor: "text-[#05CD99]",
		},
		{
			icon: <AlertCircle className="h-[30px] w-[30px] text-primary" />,
			label: "Unbalanced",
			value: "5",
			subtitle: "Need Fixing",
			subtitleColor: "text-muted-foreground",
		},
		{
			icon: <DollarSign className="h-[30px] w-[30px] text-primary" />,
			label: "Total Value",
			value: "Rp. 20.000.000",
			subtitle: "Posted vouchers only",
			subtitleColor: "text-muted-foreground",
		},
		{
			icon: <Workflow className="h-[30px] w-[30px] text-primary" />,
			label: "Auto Journal",
			value: "20",
			subtitle: "As of 29/09/2025",
			subtitleColor: "text-muted-foreground",
		},
	];

	return (
		<div className="grid grid-cols-5 gap-2">
			{stats.map((stat, index) => (
				<StatCard key={index} {...stat} />
			))}
		</div>
	);
}
