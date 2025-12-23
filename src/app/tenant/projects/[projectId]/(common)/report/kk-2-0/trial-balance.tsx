"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import { trialBalanceData } from "./data";
import { ReportFilters } from "./components/report-filters";
import { Card } from "@/components/ui/card";

export function TrialBalanceTab() {
	return (
		<Card className="p-8 flex flex-col gap-5 self-stretch rounded-[20px] shadow-[0_1px_2px_0_rgba(0,0,0,0.3),0_1px_3px_1px_rgba(0,0,0,0.15)]">
			<div className="flex items-start justify-between self-stretch">
				<div className="flex flex-col">
					<h2 className="font-dm-sans text-2xl font-bold leading-8 tracking-[-0.48px] text-primary">
						Trial Balance
					</h2>
					<p className=" text-xs leading-4 tracking-[0.4px] text-primary">
						Kelola Invoice di dalam Project
					</p>
				</div>
				<div className="flex items-center gap-2.5">
					<Button
						variant="outline"
						className="flex items-center gap-1 rounded-[10px] border "
					>
						<Download className="h-[30px] w-[30px] " />
						<span className=" text-sm font-medium leading-5 tracking-[0.1px] text-muted-foreground">
							Export XLSX
						</span>
					</Button>
					<Button
						variant="outline"
						className="flex items-center gap-1 rounded-[10px] border "
					>
						<Download className="h-[30px] w-[30px] " />
						<span className=" text-sm font-medium leading-5 tracking-[0.1px] text-muted-foreground">
							Export PDF
						</span>
					</Button>
				</div>
			</div>

			<ReportFilters />

			<div className="flex flex-col self-stretch">
				<div className="flex items-start gap-[34px] border-b-[0.8px] border-[rgba(0,0,0,0.1)] py-2">
					<div className="flex items-center px-2">
						<div className=" text-sm leading-5 ">Account No</div>
					</div>
					<div className="flex w-[150px] items-center gap-2.5">
						<div className=" text-sm leading-5 ">Account Name</div>
					</div>
					<div className="flex w-[150px] items-center gap-2.5">
						<div className=" text-sm leading-5 ">Begining Balance</div>
					</div>
					<div className="flex w-[236px] items-center justify-end">
						<div className=" text-right text-sm leading-5 ">Debit</div>
					</div>
					<div className="flex w-[236px] items-center justify-end">
						<div className=" text-right text-sm leading-5 ">Credit</div>
					</div>
					<div className="flex w-[236px] items-center justify-end">
						<div className=" text-right text-sm leading-5 ">Balance</div>
					</div>
					<div className="flex items-center">
						<div className=" text-sm leading-5 ">Normal Side</div>
					</div>
				</div>

				{trialBalanceData.map((item, idx) => (
					<div
						key={idx}
						className="flex items-start gap-[34px] border-b-[0.8px] border-[rgba(0,0,0,0.1)] py-2"
					>
						<div className="flex w-[193px] items-center px-2">
							<div className=" text-sm leading-5 ">{item.accountNo}</div>
						</div>
						<div className="flex w-[150px] items-center gap-2.5">
							<div className=" text-sm leading-5 ">{item.accountName}</div>
						</div>
						<div className="flex w-[150px] items-center gap-2.5">
							<div className=" text-sm leading-5 ">{item.beginningBalance}</div>
						</div>
						<div className="flex w-[236px] items-center justify-end">
							<div className=" text-right text-sm leading-5 ">{item.debit}</div>
						</div>
						<div className="flex w-[236px] items-center justify-end">
							<div className=" text-right text-sm leading-5 ">
								{item.credit}
							</div>
						</div>
						<div className="flex w-[236px] items-center justify-end">
							<div className=" text-right text-sm leading-5 ">
								{item.balance}
							</div>
						</div>
						<div className="flex h-[38px] w-[200px] items-center">
							<Badge
								variant="outline"
								className="h-[22px] rounded-lg border-[0.8px] border-[rgba(0,0,0,0.1)]"
							>
								<span className=" text-xs leading-4 ">{item.normalSide}</span>
							</Badge>
						</div>
					</div>
				))}

				<div className="flex items-center self-stretch py-2">
					<div className="flex w-[986px] items-center px-2">
						<div className=" text-sm leading-5 ">TOTAL</div>
					</div>
					<div className="flex w-[270px] items-center gap-2.5">
						<div className=" text-right text-sm leading-5 ">Rp 165.500.000</div>
					</div>
					<div className="flex items-center justify-center gap-2.5">
						<div className=" text-right text-sm leading-5 ">Rp 165.500.000</div>
					</div>
				</div>
			</div>

			<div className="flex items-center justify-between self-stretch py-4">
				<div className="font-geist text-sm leading-[150%] tracking-[0.07px] text-[#737373]">
					Showing 1-10 of 100 products
				</div>
				<div className="flex items-center gap-2">
					<Button variant="ghost" className="font-geist text-sm font-medium ">
						Previous
					</Button>
					<Button
						variant="outline"
						className="h-9 w-[34px] rounded-lg border border-[#D4D4D4] bg-[rgba(255,255,255,0.1)] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]"
					>
						<span className="font-geist text-sm font-medium ">1</span>
					</Button>
					<Button variant="ghost" className="h-9 w-[34px] rounded-lg">
						<span className="font-geist text-sm font-medium ">2</span>
					</Button>
					<Button variant="ghost" className="h-9 w-[34px] rounded-lg">
						<span className="font-geist text-sm font-medium ">3</span>
					</Button>
					<Button variant="ghost" className="h-9 w-[34px] rounded-lg">
						<span className="font-geist text-sm font-medium ">4</span>
					</Button>
					<Button variant="ghost" className="h-9 w-[34px] rounded-lg">
						<span className="font-geist text-sm font-medium ">...</span>
					</Button>
					<Button variant="ghost" className="h-9 w-[34px] rounded-lg">
						<span className="font-geist text-sm font-medium ">10</span>
					</Button>
					<Button variant="ghost" className="font-geist text-sm font-medium ">
						Next
					</Button>
				</div>
			</div>
		</Card>
	);
}
