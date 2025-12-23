"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { TaxCategory } from "../_data/mock-data";
import { SubCategorySection } from "./SubCategorySection";

interface CategoryCardProps {
	category: TaxCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<Card className="rounded-[14px] border-[0.8px]  p-6">
			{/* Header */}
			<div className="mb-4 flex items-center justify-between">
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2">
						<h3 className="text-base font-bold ">{category.name}</h3>
					</div>
					<div className="flex items-end gap-2">
						<Info className="h-4 w-4 text-muted-foreground" />
						<span className="text-sm text-muted-foreground">
							{category.pasal}
						</span>
					</div>
				</div>
				<div className="flex flex-col items-end gap-1">
					<div className="flex items-center gap-2">
						<Badge className="rounded-lg border-0 bg-[#DCFCE7] px-2 py-0.5 text-xs text-[#016630]">
							{category.taxRate}
						</Badge>
						<span className="text-lg font-bold ">
							Rp {category.totalTax.toLocaleString("id-ID")}
						</span>
					</div>
					<span className="text-sm text-muted-foreground">
						{category.transactionCount} transaksi
					</span>
				</div>
			</div>

			{/* Summary Stats */}
			<div className="mb-4 grid grid-cols-4 gap-[30px]">
				<div className="rounded-[10px] border bg-muted p-3">
					<div className="text-sm text-muted-foreground">Total Objek</div>
					<div className="mt-1 text-base font-bold ">
						Rp {category.totalObject.toLocaleString("id-ID")}
					</div>
				</div>
				<div className="rounded-[10px] border bg-muted p-3">
					<div className="text-sm text-muted-foreground">DPP</div>
					<div className="mt-1 text-base font-bold ">
						Rp {category.dpp.toLocaleString("id-ID")}
					</div>
				</div>
				<div className="rounded-[10px] border bg-muted p-3">
					<div className="text-sm text-muted-foreground">PPh Dipotong</div>
					<div className="mt-1 text-base font-bold bg-muted">
						Rp {category.pphDipotong.toLocaleString("id-ID")}
					</div>
				</div>
				<div className="rounded-[10px] border bg-muted p-3">
					<div className="text-sm text-muted-foreground">Jumlah Transaksi</div>
					<div className="mt-1 text-base font-bold bg-muted">
						{category.transactionCount}
					</div>
				</div>
			</div>

			{/* Subcategories */}
			{category.subCategories && category.subCategories.length > 0 && (
				<div className="space-y-2">
					{category.subCategories.map((subCategory, index) => (
						<SubCategorySection key={index} subCategory={subCategory} />
					))}
				</div>
			)}
		</Card>
	);
}
