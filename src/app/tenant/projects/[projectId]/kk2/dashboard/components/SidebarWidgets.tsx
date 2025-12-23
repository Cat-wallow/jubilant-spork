import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	AlertCircle,
	Clock,
	BarChart3,
	Building2,
	Calculator,
	BookOpen,
	ChartNoAxesCombined,
	TrendingUp,
} from "lucide-react";

export function SidebarWidgets() {
	return (
		<div className="flex w-full gap-4  justify-between">
			<Card className="flex flex-col flex-1 gap-6 border">
				<CardHeader className="flex items-center border-b-[0.8px] border-[#E2E8F0] p-6">
					<div className="flex h-8 items-center gap-2">
						<AlertCircle className="h-4 w-4 text-[#F54900]" />
						<div className="text-base leading-4 ">Pending Actions</div>
					</div>
				</CardHeader>
				<CardContent className="flex flex-col gap-4 p-6">
					<div className="flex h-[70px] items-center justify-between rounded-[10px] border-[0.8px] border-[#FFC9C9] px-4">
						<div className="flex items-center gap-3">
							<AlertCircle className="h-4 w-4 text-[#FB2C36]" />
							<div className="flex flex-col">
								<div className="text-base leading-6 text-[#82181A]">
									Unbalanced
								</div>
								<div className="text-sm leading-5 text-[#C10007]">
									1 vouchers
								</div>
							</div>
						</div>
						<Button
							variant="outline"
							className="h-8 rounded-lg border-[0.8px] px-4 text-sm"
						>
							Review
						</Button>
					</div>
					<div className="flex h-[70px] items-center justify-between rounded-[10px] border-[0.8px] border-[#BEDBFF] px-4">
						<div className="flex items-center gap-3">
							<Clock className="h-4 w-4 text-[#2B7FFF]" />
							<div className="flex flex-col">
								<div className="text-base leading-6 text-primary">
									Draft Vouchers
								</div>
								<div className="text-sm leading-5 text-[#1447E6]">
									1 pending
								</div>
							</div>
						</div>
						<Button
							variant="outline"
							className="h-8 rounded-lg border-[0.8px] px-4 text-sm"
						>
							Complete
						</Button>
					</div>
				</CardContent>
			</Card>

			<Card className="flex flex-col flex-1 gap-6 rounded-[14px] border-[0.8px] border-[#E2E8F0] shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)]">
				<CardHeader className="flex items-center border-b-[0.8px] border-[#E2E8F0] p-6">
					<div className="flex h-8 items-center gap-2">
						<BarChart3 className="h-4 w-4 text-[#155DFC]" />
						<div className="text-base leading-4 ">Quick Reports</div>
					</div>
				</CardHeader>
				<CardContent className="flex flex-col gap-3 p-6">
					{[
						{ label: "General Ledger", icon: <BookOpen className="w-4 h-4" /> },
						{
							label: "Trial Balance",
							icon: <Calculator className="w-4 h-4" />,
						},
						{
							label: "Income Statement",
							icon: <TrendingUp className="w-4 h-4" />,
						},
						{ label: "Balance Sheet", icon: <Building2 className="w-4 h-4" /> },
					].map((report, idx) => (
						<Button
							key={idx}
							variant="outline"
							className="h-10 justify-start gap-4 rounded-lg border-[0.8px] text-sm"
						>
							<span className="w-4 h-4">{report.icon}</span>
							{report.label}
						</Button>
					))}
				</CardContent>
			</Card>

			<Card className="flex flex-col flex-1 gap-6 rounded-[14px] border-[0.8px] border-[#E2E8F0] shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)]">
				<CardHeader className="flex items-center border-b-[0.8px] border-[#E2E8F0] p-6">
					<div className="flex h-8 items-center gap-2">
						<Building2 className="h-4 w-4 text-[#009966]" />
						<div className="text-base leading-4 ">Integration Status</div>
					</div>
				</CardHeader>
				<CardContent className="flex flex-col gap-3 p-6">
					{[
						{
							name: "Form 1.0",
							subtitle: "Document source",
							status: "Connected",
							statusColor: "bg-[#A4F4CF] text-[#006045]",
						},
						{
							name: "KK 1.0",
							subtitle: "Transaction data",
							status: "Active",
							statusColor: "bg-[#A4F4CF] text-[#006045]",
						},
						{
							name: "KK 3.0",
							subtitle: "Tax calculation",
							status: "Ready",
							statusColor: "bg-[#FFD6A7] text-[#9F2D00]",
						},
					].map((integration, idx) => (
						<div
							key={idx}
							className="flex h-[70px] items-center justify-between rounded-[10px] border-[0.8px] border-[#A4F4CF] px-4"
						>
							<div className="flex items-center gap-3">
								<Building2 className="h-4 w-4 text-[#00BC7D]" />
								<div className="flex flex-col">
									<div className="text-base leading-6 text-[#004F3B]">
										{integration.name}
									</div>
									<div className="text-sm leading-5 text-[#007A55]">
										{integration.subtitle}
									</div>
								</div>
							</div>
							<Badge
								className={`rounded-lg border-0 ${integration.statusColor}`}
							>
								{integration.status}
							</Badge>
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
}
