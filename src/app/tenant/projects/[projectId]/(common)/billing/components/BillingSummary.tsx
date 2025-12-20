"use client";

import { Card } from "@/components/ui/card";
import {
	FileText,
	CheckCircle2,
	DollarSign,
	Clock,
	AlertCircle,
} from "lucide-react";

interface SummaryCardProps {
	icon: React.ReactNode;
	label: string;
	value: string | number;
	subtitle?: string;
}

function SummaryCard({ icon, label, value, subtitle }: SummaryCardProps) {
	return (
		// <div className="flex h-[97px] flex-1 items-center gap-[18px] rounded-[20px] border  px-4 shadow-sm">
		<Card className="flex mt-[10px] px-4 flex-nowrap gap-[18px] items-center">
			<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-background">
				{icon}
			</div>
			<div className="flex flex-col text-ellipsis overflow-hidden">
				<span className="font-dm text-sm font-bold leading-6 text-muted-foreground">
					{label}
				</span>
				<h3 className="font-dm text-nowrap  text-xl font-bold leading-8 ">
					{value}
				</h3>
				{subtitle && (
					<p className="font-dm text-xs leading-5 text-muted-foreground">
						{subtitle}
					</p>
				)}
			</div>
		</Card>
	);
}

export function BillingSummary() {
	return (
		<div className="grid grid-cols-5 gap-[30px]">
			<SummaryCard
				icon={<FileText className="h-[30px] w-[30px] text-primary" />}
				label="Total Invoice"
				value="22"
				subtitle="Semua invoice project"
			/>

			<SummaryCard
				icon={<CheckCircle2 className="h-[30px] w-[30px] text-primary" />}
				label="Paid"
				value="10"
				subtitle="/ 22 Invoice"
			/>

			<SummaryCard
				icon={<DollarSign className="h-[30px] w-[30px] text-primary" />}
				label="Paid Amount"
				value="Rp. 120.000.000"
			/>

			<SummaryCard
				icon={<Clock className="h-[30px] w-[30px] text-primary" />}
				label="Unpaid Amount"
				value="Rp. 20.000.000"
			/>

			<SummaryCard
				icon={<AlertCircle className="h-[30px] w-[30px] text-primary" />}
				label="Overdue"
				value="3 Invoice"
			/>
		</div>
	);
}
