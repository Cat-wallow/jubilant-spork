import { Card } from "@/components/ui/card";
import { FileCheck, Wallet, Calculator, DollarSign } from "lucide-react";

interface StatCardProps {
	icon: React.ReactNode;
	label: string;
	value: string | number;
	subtitle?: string;
	subtitleColor?: string;
}

function StatCard({
	icon,
	label,
	value,
	subtitle,
	subtitleColor,
}: StatCardProps) {
	return (
		<Card className="flex h-[97px] flex-1 items-center gap-[18px] rounded-[20px] border  px-4 ">
			<div className="flex h-14 w-14 items-center justify-center gap-2.5 rounded-[28px]">
				{icon}
			</div>
			<div className="flex flex-col">
				<div className="text-sm font-bold leading-6 tracking-[-0.28px] text-muted-foreground">
					{label}
				</div>
				<div className="text-2xl font-bold leading-8 tracking-[-0.48px] ">
					{value}
				</div>
				{subtitle && (
					<div className="flex items-center gap-2">
						<span
							className={`text-xs font-bold leading-5 tracking-[-0.24px] ${subtitleColor}`}
						>
							{subtitle.split(" ")[0]}
						</span>
						<span className="text-xs leading-5 tracking-[-0.24px] text-muted-foreground">
							{subtitle.split(" ").slice(1).join(" ")}
						</span>
					</div>
				)}
			</div>
		</Card>
	);
}

interface StatsCardsProps {
	data: {
		voucherRecorded: { count: number; total: number; draft: boolean };
		activeAccounts: { count: number; total: number };
		trialBalance: { status: string; asOf: string };
		journalValue: { amount: number; description: string };
	};
}

export function StatsCards({ data }: StatsCardsProps) {
	return (
		<div className="flex items-start gap-[30px] self-stretch">
			<StatCard
				icon={<FileCheck className="h-[30px] w-[30px] text-primary" />}
				label="Voucher Recorded"
				value={data.voucherRecorded.count}
				subtitle={`/${data.voucherRecorded.total} Draft`}
				subtitleColor="text-[#05CD99]"
			/>
			<StatCard
				icon={<Wallet className="h-[30px] w-[30px] text-primary" />}
				label="Active Of Account"
				value={data.activeAccounts.count}
				subtitle={`/${data.activeAccounts.total} Active Account`}
				subtitleColor="text-[#05CD99]"
			/>
			<StatCard
				icon={<Calculator className="h-[30px] w-[30px] text-primary" />}
				label="Trial Balance"
				value={data.trialBalance.status}
				subtitle={`As of ${data.trialBalance.asOf}`}
				subtitleColor="text-muted-foreground"
			/>
			<StatCard
				icon={<DollarSign className="h-[30px] w-[30px] text-primary" />}
				label="Journal Value"
				value={`Rp. ${data.journalValue.amount.toLocaleString("id-ID")}`}
				subtitle={data.journalValue.description}
				subtitleColor="text-muted-foreground"
			/>
		</div>
	);
}
