"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { TaxSubCategory } from "../_data/mock-data";
import { TransactionTable } from "./TransactionTable";

interface SubCategorySectionProps {
	subCategory: TaxSubCategory;
}

export function SubCategorySection({ subCategory }: SubCategorySectionProps) {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div className="overflow-hidden rounded-[10px] border-[0.8px] ">
			{/* Subcategory Header */}
			<div
				className="flex cursor-pointer items-center justify-between rounded-t-[10px] border-1 bg-muted px-2 py-4"
				onClick={() => setIsExpanded(!isExpanded)}
			>
				<div className="flex items-center gap-2">
					<span className="text-base ">{subCategory.name}</span>
					<span className="text-sm text-muted-foreground">
						({subCategory.transactionCount} transaksi)
					</span>
					{isExpanded ? (
						<ChevronUp className="h-4 w-4 text-muted-foreground" />
					) : (
						<ChevronDown className="h-4 w-4 text-muted-foreground" />
					)}
				</div>
				<div className="flex flex-col items-end gap-0.5">
					<span className="text-base ">
						Rp {subCategory.totalTax.toLocaleString("id-ID")}
					</span>
					<span className="text-xs text-muted-foreground">
						dari Rp {subCategory.totalAmount.toLocaleString("id-ID")}
					</span>
				</div>
			</div>

			{/* Transaction Details */}
			{isExpanded && subCategory.transactions.length > 0 && (
				<div className="border-t border-black bg-card p-3">
					<h4 className="mb-3 text-sm text-muted-foreground">
						Detail Transaksi {subCategory.name}
					</h4>
					<TransactionTable transactions={subCategory.transactions} />
				</div>
			)}
		</div>
	);
}
