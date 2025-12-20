"use client";

import { Badge } from "@/components/ui/badge";
import { Transaction } from "../_data/mock-data";

interface TransactionTableProps {
	transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
	const getStatusBadge = (status: string) => {
		switch (status) {
			case "Selesai":
				return (
					<Badge className="rounded-lg border-0 bg-[#030213] px-2 py-0.5 text-xs text-white">
						Selesai
					</Badge>
				);
			case "Review":
				return (
					<Badge className="rounded-lg border-[0.8px]  bg-[#ECEEF2] px-2 py-0.5 text-xs bg-muted">
						Review
					</Badge>
				);
			case "Pending":
				return (
					<Badge className="rounded-lg border-[0.8px]  px-2 py-0.5 text-xs ">
						Pending
					</Badge>
				);
			default:
				return null;
		}
	};

	return (
		<div className="space-y-1">
			{transactions.map((transaction) => (
				<div
					key={transaction.id}
					className="flex items-center justify-between rounded border-l-2 border-[#030213]/20 bg-[#ECEEF0]/10 px-2.5 py-2"
				>
					{/* ID & Date */}
					<div className="flex flex-col gap-0">
						<span className="text-xs bg-muted">{transaction.id}</span>
						<span className="text-xs text-muted-foreground">
							{transaction.date}
						</span>
					</div>

					{/* Vendor & Voucher */}
					<div className="flex flex-col gap-0">
						<span className="text-xs ">{transaction.vendor}</span>
						<span className="text-xs text-muted-foreground">
							{transaction.voucher}
						</span>
					</div>

					{/* Type Badge */}
					<Badge className="rounded-lg border-[0.8px]  px-1.5 py-0 text-xs ">
						{transaction.type}
					</Badge>

					{/* Amount */}
					<div className="flex flex-col gap-0">
						<span className="text-right text-xs ">
							Rp {transaction.amount.toLocaleString("id-ID")}
						</span>
						<span className="text-right text-xs text-muted-foreground">
							IDR
						</span>
					</div>

					{/* Tax */}
					<div className="flex flex-col gap-0">
						<span className="text-right text-xs text-[#00A63E]">
							Rp {transaction.tax.toLocaleString("id-ID")}
						</span>
						<span className="text-right text-xs text-muted-foreground">
							{transaction.taxRate}
						</span>
					</div>

					{/* Status & Link */}
					<div className="flex flex-col items-end gap-1">
						{getStatusBadge(transaction.status)}
						<span className="text-right text-xs text-muted-foreground">
							{transaction.kk1Link}
						</span>
					</div>
				</div>
			))}
		</div>
	);
}
