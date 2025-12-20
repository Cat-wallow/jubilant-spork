"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	GeneralLedgerAccount,
	formatCurrency,
	generalLedgerAccounts,
} from "../data/mockData";
import { Card } from "@/components/ui/card";

export default function GeneralLedger() {
	const [accounts, setAccounts] = useState<GeneralLedgerAccount[]>(
		generalLedgerAccounts,
	);

	const toggleAccount = (accountId: string) => {
		setAccounts((prev) =>
			prev.map((acc) =>
				acc.id === accountId ? { ...acc, expanded: !acc.expanded } : acc,
			),
		);
	};

	return (
		<Card className="space-y-1">
			<div className="flex items-center gap-10 border-b  pb-2">
				<div className="w-[1149px] text-xs font-medium ">Account</div>
				<div className="w-[116px] text-right text-xs font-medium ">Debit</div>
				<div className="w-[138px] text-right text-xs  font-medium ">Credit</div>
				<div className="flex-1 text-right text-xs font-medium ">Balance</div>
			</div>

			{accounts.map((account) => (
				<div key={account.id} className="space-y-0">
					<div className="flex items-center justify-between rounded-lg border  p-4">
						<div className="flex items-center gap-3">
							<Button
								variant="ghost"
								size="icon"
								className="h-6 w-6"
								onClick={() => toggleAccount(account.id)}
							>
								{account.expanded ? (
									<ChevronDown className="h-4 w-4" />
								) : (
									<ChevronRight className="h-4 w-4" />
								)}
							</Button>
							<div>
								<div className=" text-base">{account.accountNumber}</div>
								<div className=" text-sm ">{account.accountName}</div>
							</div>
						</div>

						<div className="flex items-center gap-8">
							<div className="w-[120px] text-right">
								<div className=" text-sm">
									{formatCurrency(account.totalDebit)}
								</div>
								<div className=" text-xs ">Total Debit</div>
							</div>
							<div className="w-[120px] text-right">
								<div className=" text-sm">
									{account.totalCredit > 0
										? formatCurrency(account.totalCredit)
										: "Rp0"}
								</div>
								<div className=" text-xs ">Total Credit</div>
							</div>
							<div className="w-[120px] text-right">
								<div className=" text-base">
									{formatCurrency(account.balance)}
								</div>
								<div className=" text-xs ">Balance</div>
							</div>
						</div>
					</div>

					{account.expanded &&
						account.transactions &&
						account.transactions.length > 0 && (
							<div className="ml-12 rounded-lg border  shadow-md">
								<div className="flex items-center justify-between border-b  p-3 text-sm">
									<div className="w-[182px] ">Date</div>
									<div className="w-[153px] ">Type</div>
									<div className="w-[293px] ">Voucher</div>
									<div className="w-[271px] ">Narration</div>
									<div className="w-[105px] text-right ">Debit</div>
									<div className="w-[214px] text-right ">Credit</div>
									<div className="w-[135px] text-right ">Balance</div>
								</div>

								{account.transactions.map((transaction) => (
									<div
										key={transaction.id}
										className="flex items-center justify-between border-b  p-3 text-sm last:border-b-0"
									>
										<div className="w-[182px] ">{transaction.date}</div>
										<div className="w-[153px]">
											<Badge variant="outline" className="rounded-lg ">
												{transaction.type}
											</Badge>
										</div>
										<div className="w-[293px]">
											<div className="flex items-center gap-2">
												<Badge
													variant="outline"
													className={`border-0 ${
														transaction.voucher === "BRV"
															? "text-primary"
															: "text-[#016630]"
													}`}
												>
													{transaction.voucher}
												</Badge>
												<span className=" text-xs">
													{transaction.voucherCode}
												</span>
											</div>
										</div>
										<div className="w-[271px] ">{transaction.narration}</div>
										<div className="w-[105px] text-right ">
											{transaction.debit > 0
												? formatCurrency(transaction.debit)
												: "Rp0"}
										</div>
										<div className="w-[214px] text-right ">
											{formatCurrency(transaction.credit)}
										</div>
										<div className="w-[135px] text-right ">
											{transaction.balance > 0
												? formatCurrency(transaction.balance)
												: "Rp 0"}
										</div>
									</div>
								))}
							</div>
						)}
				</div>
			))}

			<div className="mt-4 flex items-center justify-between">
				<div className="font-geist text-sm text-[#737373]">
					Showing 1-10 of 100 products
				</div>
				<div className="flex items-center gap-2">
					<Button variant="ghost" size="sm">
						Previous
					</Button>
					<Button variant="outline" size="sm" className="bg-card shadow-sm">
						1
					</Button>
					<Button variant="ghost" size="sm">
						2
					</Button>
					<Button variant="ghost" size="sm">
						3
					</Button>
					<Button variant="ghost" size="sm">
						4
					</Button>
					<span className="px-2">...</span>
					<Button variant="ghost" size="sm">
						10
					</Button>
					<Button variant="ghost" size="sm">
						Next
					</Button>
				</div>
			</div>
		</Card>
	);
}
