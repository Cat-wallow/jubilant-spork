"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronDown, Download } from "lucide-react";
import { generalLedgerData } from "./data";
import { ReportFilters } from "./components/report-filters";
import { Card } from "@/components/ui/card";

export function GeneralLedgerTab() {
	const [expandedAccounts, setExpandedAccounts] = useState<string[]>([]);

	const toggleAccount = (accountId: string) => {
		setExpandedAccounts((prev) =>
			prev.includes(accountId)
				? prev.filter((id) => id !== accountId)
				: [...prev, accountId],
		);
	};

	return (
		<Card className=" p-8 flex flex-col gap-5 self-stretch rounded-[20px] shadow-[0_1px_2px_0_rgba(0,0,0,0.3),0_1px_3px_1px_rgba(0,0,0,0.15)]">
			<div className="flex items-start justify-between self-stretch">
				<div className="flex flex-col">
					<h2 className="font-dm-sans text-2xl font-bold leading-8 tracking-[-0.48px] text-[#2B3674]">
						General Ledger
					</h2>
					<p className="font-roboto text-xs leading-4 tracking-[0.4px] text-[#2B3674]">
						Kelola Invoice di dalam Project
					</p>
				</div>
				<div className="flex items-center gap-2.5">
					<Button
						variant="outline"
						className="flex items-center gap-1 rounded-[10px] border border-[#D9D9D9]"
					>
						<Download className="h-[30px] w-[30px] text-[#404040]" />
						<span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">
							Export XLSX
						</span>
					</Button>
					<Button
						variant="outline"
						className="flex items-center gap-1 rounded-[10px] border border-[#D9D9D9]"
					>
						<Download className="h-[30px] w-[30px] text-[#404040]" />
						<span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">
							Export PDF
						</span>
					</Button>
				</div>
			</div>

			<ReportFilters />

			<div className="flex flex-col gap-1 self-stretch">
				<div className="flex items-center self-stretch">
					<div className="flex flex-1 items-center gap-2.5">
						<div className="font-inter text-xs font-medium leading-[17.5px] text-[#1E293B]">
							Account
						</div>
					</div>
					<div className="flex w-[106px] items-center justify-end gap-2.5">
						<div className="font-inter text-right text-xs font-medium leading-[17.5px] text-[#1E293B]">
							Debit
						</div>
					</div>
					<div className="flex w-[92px] items-center justify-end gap-2.5">
						<div className="font-inter text-right text-xs font-medium leading-[17.5px] text-[#1E293B]">
							Credit
						</div>
					</div>
					<div className="flex w-[163px] items-center justify-end gap-2.5">
						<div className="font-inter text-right text-xs font-medium leading-[17.5px] text-[#1E293B]">
							Balance
						</div>
					</div>
				</div>

				{generalLedgerData.map((account) => (
					<div key={account.id}>
						<div className="flex min-h-[76px] items-center justify-between self-stretch rounded-[10px] border-[0.8px] border-[rgba(0,0,0,0.1)] px-4">
							<div className="flex items-center gap-3">
								<Button
									variant="ghost"
									size="icon"
									className="h-6 w-6 rounded-lg p-0"
									onClick={() => toggleAccount(account.id)}
								>
									{expandedAccounts.includes(account.id) ? (
										<ChevronDown
											className="h-4 w-4 text-[#0A0A0A]"
											strokeWidth={1.33}
										/>
									) : (
										<ChevronRight
											className="h-4 w-4 text-[#0A0A0A]"
											strokeWidth={1.33}
										/>
									)}
								</Button>
								<div className="flex flex-col">
									<div className="font-arial text-base leading-6 text-[#0A0A0A]">
										{account.accountNumber}
									</div>
									<div className="font-arial text-sm leading-5 text-[#717182]">
										{account.accountName}
									</div>
								</div>
							</div>
							<div className="flex items-center gap-8">
								<div className="flex flex-col items-end">
									<div className="font-arial text-sm leading-5 text-[#0A0A0A]">
										{account.totalDebit}
									</div>
									<div className="font-arial text-xs leading-4 text-[#717182]">
										Total Debit
									</div>
								</div>
								<div className="flex flex-col items-end">
									<div className="font-arial text-sm leading-5 text-[#0A0A0A]">
										{account.totalCredit}
									</div>
									<div className="font-arial text-xs leading-4 text-[#717182]">
										Total Credit
									</div>
								</div>
								<div className="flex flex-col items-end">
									<div className="font-arial text-base leading-6 text-[#0A0A0A]">
										{account.balance}
									</div>
									<div className="font-arial text-xs leading-4 text-[#717182]">
										Balance
									</div>
								</div>
							</div>
						</div>

						{expandedAccounts.includes(account.id) &&
							account.transactions.length > 0 && (
								<div className="mt-2.5 flex flex-col gap-2.5 rounded-[10px] shadow-[0_2px_2px_0_rgba(0,0,0,0.15)]">
									<div className="flex items-center justify-between border-b-[0.8px] border-[rgba(0,0,0,0.1)] p-4">
										<div className="font-arial text-sm leading-5 text-[#0A0A0A]">
											Date
										</div>
										<div className="font-arial text-sm leading-5 text-[#0A0A0A]">
											Type
										</div>
										<div className="font-arial text-sm leading-5 text-[#0A0A0A]">
											Voucher
										</div>
										<div className="font-arial text-sm leading-5 text-[#0A0A0A]">
											Narration
										</div>
										<div className="font-arial text-right text-sm leading-5 text-[#0A0A0A]">
											Debit
										</div>
										<div className="font-arial text-right text-sm leading-5 text-[#0A0A0A]">
											Credit
										</div>
										<div className="font-arial text-right text-sm leading-5 text-[#0A0A0A]">
											Balance
										</div>
									</div>

									{account.transactions.map((transaction, idx) => (
										<div
											key={idx}
											className="flex items-center justify-between border-b-[0.8px] border-[rgba(0,0,0,0.1)] p-4"
										>
											<div className="font-arial text-sm leading-5 text-[#0A0A0A]">
												{transaction.date}
											</div>
											<Badge
												variant="outline"
												className="rounded-lg border-[0.8px] border-[rgba(0,0,0,0.1)]"
											>
												<span className="font-arial text-xs leading-4 text-[#0A0A0A]">
													{transaction.type}
												</span>
											</Badge>
											<div className="flex items-center gap-2">
												<Badge
													variant="secondary"
													className="rounded-lg border-0"
												>
													<span
														className={`font-arial text-xs leading-4 ${
															transaction.voucher.code === "BRV"
																? "text-[#193CB8]"
																: "text-[#016630]"
														}`}
													>
														{transaction.voucher.code}
													</span>
												</Badge>
												<span className="font-arial text-xs leading-4 text-[#0A0A0A]">
													{transaction.voucher.number}
												</span>
											</div>
											<div className="font-arial text-sm leading-5 text-[#0A0A0A]">
												{transaction.narration}
											</div>
											<div className="font-arial text-right text-sm leading-5 text-[#0A0A0A]">
												{transaction.debit}
											</div>
											<div className="font-arial text-right text-sm leading-5 text-[#0A0A0A]">
												{transaction.credit}
											</div>
											<div className="font-arial text-right text-sm leading-5 text-[#0A0A0A]">
												{transaction.balance}
											</div>
										</div>
									))}
								</div>
							)}
					</div>
				))}
			</div>
		</Card>
	);
}
