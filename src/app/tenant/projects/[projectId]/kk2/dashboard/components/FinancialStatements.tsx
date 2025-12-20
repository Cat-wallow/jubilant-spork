import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp, Building2, Receipt } from "lucide-react";

interface StatementCardProps {
	title: string;
	period: string;
	icon: React.ReactNode;
	iconColor: string;
	borderColor: string;
	titleColor: string;
	periodColor: string;
	items: { label: string; value: string; color: string }[];
	total: { label: string; value: string; color: string };
}

function StatementCard({
	title,
	period,
	icon,
	iconColor,
	borderColor,
	titleColor,
	periodColor,
	items,
	total,
}: StatementCardProps) {
	return (
		<div
			className={`flex h-[194px] flex-1 flex-col gap-4 rounded-[10px] border-[0.8px] ${borderColor} p-4`}
		>
			<div className="flex h-10 items-center gap-3">
				<div className="flex h-8 w-8 flex-col items-start rounded-[10px]">
					{icon}
				</div>
				<div className="flex flex-col">
					<div className={`text-base font-bold leading-6 ${titleColor}`}>
						{title}
					</div>
					<div className={`text-xs leading-4 ${periodColor}`}>{period}</div>
				</div>
			</div>
			<div className="flex flex-col gap-3">
				{items.map((item, idx) => (
					<div key={idx} className="flex h-6 items-center justify-between">
						<div className="text-sm leading-5 text-[#45556C]">{item.label}</div>
						<div
							className={`font-mono text-base font-bold leading-6 ${item.color}`}
						>
							{item.value}
						</div>
					</div>
				))}
				<div className="flex h-[33px] flex-col border-t-[0.8px] border-[rgba(0,0,0,0.10)] pt-2">
					<div className="flex h-6 items-center justify-between">
						<div className="text-base font-bold leading-6 ">{total.label}</div>
						<div
							className={`font-mono text-base font-bold leading-6 ${total.color}`}
						>
							{total.value}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export function FinancialStatements() {
	return (
		<Card className="flex flex-col gap-2.5 self-stretch rounded-[14px] border-[0.8px] border-[#E2E8F0] shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)]">
			<CardHeader className="flex items-center border-b-[0.8px] border-[#E2E8F0] p-6">
				<div className="flex h-9 items-center gap-2">
					<TrendingUp className="h-5 w-5 text-[#155DFC]" />
					<div className="text-base leading-4 ">
						Financial Statements Overview
					</div>
				</div>
			</CardHeader>
			<CardContent className="flex items-center gap-[30px] p-6">
				<StatementCard
					title="Income Statement"
					period="Period: This Month"
					icon={<TrendingUp className="h-4 w-4 text-[#009966]" />}
					iconColor="text-[#009966]"
					borderColor="border-[#A4F4CF]"
					titleColor="text-[#004F3B]"
					periodColor="text-[#096]"
					items={[
						{ label: "Revenue", value: "Rp 2.1B", color: "text-[#007A55]" },
						{ label: "Expenses", value: "Rp 1.8B", color: "text-[#E7000B]" },
					]}
					total={{
						label: "Net Income",
						value: "Rp 300M",
						color: "text-[#007A55]",
					}}
				/>
				<StatementCard
					title="Balance Sheet"
					period="As of Today"
					icon={<Building2 className="h-4 w-4 text-[#155DFC]" />}
					iconColor="text-[#155DFC]"
					borderColor="border-[#BEDBFF]"
					titleColor="text-primary"
					periodColor="text-[#155DFC]"
					items={[
						{
							label: "Total Assets",
							value: "Rp 15.2B",
							color: "text-[#1447E6]",
						},
						{
							label: "Total Liabilities",
							value: "Rp 8.1B",
							color: "text-[#F54900]",
						},
					]}
					total={{ label: "Equity", value: "Rp 7.1B", color: "text-[#1447E6]" }}
				/>
				<StatementCard
					title="Cash Flow"
					period="This Month"
					icon={<Receipt className="h-4 w-4 text-[#7F22FE]" />}
					iconColor="text-[#7F22FE]"
					borderColor="border-[#DDD6FF]"
					titleColor="text-[#4D179A]"
					periodColor="text-[#7F22FE]"
					items={[
						{ label: "Operating", value: "+Rp 420M", color: "text-[#096]" },
						{ label: "Investment", value: "-Rp 150M", color: "text-[#E7000B]" },
					]}
					total={{
						label: "Net Change",
						value: "+Rp 270M",
						color: "text-[#096]",
					}}
				/>
			</CardContent>
		</Card>
	);
}
