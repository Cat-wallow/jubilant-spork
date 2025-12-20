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
					<h2 className="font-dm-sans text-2xl font-bold leading-8 tracking-[-0.48px] text-primary">
						General Ledger
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

			<div className="flex flex-col gap-1 self-stretch">
				<div className="flex items-center self-stretch">
					<div className="flex flex-1 items-center gap-2.5">
						<div className="font-inter text-xs font-medium leading-[17.5px] ">
							Account
						</div>
					</div>
					<div className="flex w-[106px] items-center justify-end gap-2.5">
						<div className="font-inter text-right text-xs font-medium leading-[17.5px] ">
							Debit
						</div>
					</div>
					<div className="flex w-[92px] items-center justify-end gap-2.5">
						<div className="font-inter text-right text-xs font-medium leading-[17.5px] ">
							Credit
						</div>
					</div>
					<div className="flex w-[163px] items-center justify-end gap-2.5">
						<div className="font-inter text-right text-xs font-medium leading-[17.5px] ">
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
										<ChevronDown className="h-4 w-4 " strokeWidth={1.33} />
									) : (
										<ChevronRight className="h-4 w-4 " strokeWidth={1.33} />
									)}
								</Button>
								<div className="flex flex-col">
									<div className=" text-base leading-6 ">
										{account.accountNumber}
									</div>
									<div className=" text-sm leading-5 text-muted-foreground">
										{account.accountName}
									</div>
								</div>
							</div>
							<div className="flex items-center gap-8">
								<div className="flex flex-col items-end">
									<div className=" text-sm leading-5 ">
										{account.totalDebit}
									</div>
									<div className=" text-xs leading-4 text-muted-foreground">
										Total Debit
									</div>
								</div>
								<div className="flex flex-col items-end">
									<div className=" text-sm leading-5 ">
										{account.totalCredit}
									</div>
									<div className=" text-xs leading-4 text-muted-foreground">
										Total Credit
									</div>
								</div>
								<div className="flex flex-col items-end">
									<div className=" text-base leading-6 ">{account.balance}</div>
									<div className=" text-xs leading-4 text-muted-foreground">
										Balance
									</div>
								</div>
							</div>
						</div>

						{expandedAccounts.includes(account.id) &&
							account.transactions.length > 0 && (
								<div className="mt-2.5 flex flex-col gap-2.5 rounded-[10px] shadow-[0_2px_2px_0_rgba(0,0,0,0.15)]">
									<div className="flex items-center justify-between border-b-[0.8px] border-[rgba(0,0,0,0.1)] p-4">
										<div className=" text-sm leading-5 ">Date</div>
										<div className=" text-sm leading-5 ">Type</div>
										<div className=" text-sm leading-5 ">Voucher</div>
										<div className=" text-sm leading-5 ">Narration</div>
										<div className=" text-right text-sm leading-5 ">Debit</div>
										<div className=" text-right text-sm leading-5 ">Credit</div>
										<div className=" text-right text-sm leading-5 ">
											Balance
										</div>
									</div>

									{account.transactions.map((transaction, idx) => (
										<div
											key={idx}
											className="flex items-center justify-between border-b-[0.8px] border-[rgba(0,0,0,0.1)] p-4"
										>
											<div className=" text-sm leading-5 ">
												{transaction.date}
											</div>
											<Badge
												variant="outline"
												className="rounded-lg border-[0.8px] border-[rgba(0,0,0,0.1)]"
											>
												<span className=" text-xs leading-4 ">
													{transaction.type}
												</span>
											</Badge>
											<div className="flex items-center gap-2">
												<Badge
													variant="secondary"
													className="rounded-lg border-0"
												>
													<span
														className={` text-xs leading-4 ${
															transaction.voucher.code === "BRV"
																? "text-primary"
																: "text-[#016630]"
														}`}
													>
														{transaction.voucher.code}
													</span>
												</Badge>
												<span className=" text-xs leading-4 ">
													{transaction.voucher.number}
												</span>
											</div>
											<div className=" text-sm leading-5 ">
												{transaction.narration}
											</div>
											<div className=" text-right text-sm leading-5 ">
												{transaction.debit}
											</div>
											<div className=" text-right text-sm leading-5 ">
												{transaction.credit}
											</div>
											<div className=" text-right text-sm leading-5 ">
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
