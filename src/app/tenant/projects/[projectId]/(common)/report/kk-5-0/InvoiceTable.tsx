"use client";

import { useState } from "react";
import {
	Download,
	Filter,
	MoreHorizontal,
	Search,
	ChevronDown,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { invoiceData } from "./data";
import { Card } from "@/components/ui/card";

export function InvoiceTable() {
	const [selectedItems, setSelectedItems] = useState<string[]>([]);

	const toggleItem = (id: string) => {
		setSelectedItems((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
		);
	};

	const toggleAll = () => {
		if (selectedItems.length === invoiceData.length) {
			setSelectedItems([]);
		} else {
			setSelectedItems(invoiceData.map((item) => item.id));
		}
	};

	return (
		<Card className="flex flex-col items-start gap-5 self-stretch rounded-[20px] border  p-6">
			{/* Header */}
			<div className="flex items-start justify-between self-stretch">
				<div className="flex flex-col items-start">
					<h2 className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] text-primary">
						Invoice
					</h2>
					<p className=" text-xs leading-4 tracking-[0.4px] text-primary">
						Kelola Invoice di dalam Project
					</p>
				</div>
				<div className="flex items-center justify-end gap-2.5">
					<Button
						variant="outline"
						className="flex items-center gap-1 rounded-[10px] border  px-3 py-2"
					>
						<Download className="h-[30px] w-[30px]" />
						<span className=" text-sm font-medium leading-5 tracking-[0.1px] text-muted-foreground">
							Export XLSX
						</span>
					</Button>
					<Button
						variant="outline"
						className="flex items-center gap-1 rounded-[10px] border  px-3 py-2"
					>
						<Download className="h-[30px] w-[30px]" />
						<span className=" text-sm font-medium leading-5 tracking-[0.1px] text-muted-foreground">
							Export PDF
						</span>
					</Button>
				</div>
			</div>

			{/* Filters */}
			<div className="flex items-center gap-5 self-stretch rounded-[10px]">
				<Button
					variant="outline"
					className="flex h-[54px] items-center gap-1 rounded-[10px] border  px-3"
				>
					<span className=" text-sm font-medium leading-5 tracking-[0.1px] text-muted-foreground">
						20
					</span>
					<ChevronDown className="h-3 w-6" />
				</Button>

				<div className="relative flex h-[54px] flex-1 items-center gap-[15px] rounded-[10px] border  px-4">
					<Search className="h-5 w-5 text-primary" />
					<Input
						placeholder="Nama tugas"
						className="border-0 p-0 font-dm text-base leading-5 tracking-[-0.32px] text-muted-foreground focus-visible:ring-0"
					/>
				</div>

				<div className="flex h-[54px] items-center gap-2.5">
					<Button
						variant="outline"
						className="flex h-[54px] items-center gap-1 rounded-[10px] border  px-3"
					>
						<span className=" text-sm font-medium leading-5 tracking-[0.1px] text-muted-foreground">
							All Status
						</span>
						<ChevronDown className="h-3 w-6" />
					</Button>
					<Button
						variant="outline"
						className="flex h-[54px] items-center gap-1 rounded-[10px] border  px-3"
					>
						<span className=" text-sm font-medium leading-5 tracking-[0.1px] text-muted-foreground">
							All Type
						</span>
						<ChevronDown className="h-3 w-6" />
					</Button>
					<Button
						variant="outline"
						className="flex h-[54px] items-center gap-1 rounded-[10px] border  px-3"
					>
						<Filter className="h-[18px] w-[18px]" />
						<span className=" text-sm font-medium leading-5 tracking-[0.1px] text-muted-foreground">
							Filter
						</span>
					</Button>
					<Button
						variant="ghost"
						className="h-[54px] w-[54px] rounded-[10px] p-2"
					>
						<MoreHorizontal className="h-[35px] w-[35px] text-[#4318FF]" />
					</Button>
				</div>
			</div>

			{/* Table */}
			<div className="flex flex-col items-start gap-2.5 self-stretch">
				{/* Table Header */}
				<div className="flex items-center justify-between self-stretch">
					<div className="flex w-[120px] items-center gap-2.5">
						<Checkbox
							checked={selectedItems.length === invoiceData.length}
							onCheckedChange={toggleAll}
						/>
						<span className="font-dm text-sm font-medium leading-6 tracking-[-0.28px] text-muted-foreground">
							Invoice
						</span>
						<ChevronDown className="h-6 w-6 text-muted-foreground" />
					</div>
					<div className="flex w-[120px] items-center gap-[7px]">
						<span className="font-dm text-sm font-medium leading-6 tracking-[-0.28px] text-muted-foreground">
							Date
						</span>
						<ChevronDown className="h-6 w-6 text-muted-foreground" />
					</div>
					<div className="flex w-[120px] items-center gap-[7px]">
						<span className="font-dm text-sm font-medium leading-6 tracking-[-0.28px] text-muted-foreground">
							Termin
						</span>
						<ChevronDown className="h-6 w-6 text-muted-foreground" />
					</div>
					<div className="flex w-[120px] items-center gap-[7px]">
						<span className="font-dm text-sm font-medium leading-6 tracking-[-0.28px] text-muted-foreground">
							Total
						</span>
						<ChevronDown className="h-6 w-6 text-muted-foreground" />
					</div>
					<div className="flex w-[120px] items-center gap-[7px]">
						<span className="font-dm text-sm font-medium leading-6 tracking-[-0.28px] text-muted-foreground">
							Status
						</span>
						<ChevronDown className="h-6 w-6 text-muted-foreground" />
					</div>
					<div className="flex w-[120px] items-center gap-[7px]">
						<span className="font-dm text-sm font-medium leading-6 tracking-[-0.28px] text-muted-foreground">
							Due Date
						</span>
						<ChevronDown className="h-6 w-6 text-muted-foreground" />
					</div>
					<div className="flex w-[120px] items-center gap-[7px]">
						<span className="font-dm text-sm font-medium leading-6 tracking-[-0.28px] text-muted-foreground">
							Aging
						</span>
						<ChevronDown className="h-6 w-6 text-muted-foreground" />
					</div>
				</div>

				<div className="h-px w-full bg-gray-200" />

				{/* Table Rows */}
				{invoiceData.map((item, index) => (
					<div
						key={index}
						className="flex items-center justify-between self-stretch"
					>
						<div className="flex w-[120px] items-center gap-2.5">
							<Checkbox
								checked={selectedItems.includes(item.id)}
								onCheckedChange={() => toggleItem(item.id)}
							/>
							<span className="w-[120px] shrink-0  text-xs leading-4 tracking-[0.4px] text-primary">
								{item.id}
							</span>
						</div>
						<span className="w-[120px] font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-primary">
							{item.date}
						</span>
						<div className="flex w-[120px] items-start content-start flex-wrap">
							<div className="flex items-center justify-center gap-2.5 rounded-[5px] border  px-2 py-1">
								<span className="font-inter text-xs ">{item.termin}</span>
							</div>
						</div>
						<span className="w-[120px] font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-primary">
							{item.total}
						</span>
						<div className="flex w-[120px] flex-col items-start gap-2.5">
							<Badge
								className={`min-w-[48px] rounded-[50px] ${
									item.status === "paid"
										? "bg-[rgba(207,247,211,1)]"
										: "bg-[#E8DEF8]"
								}`}
							>
								<span className=" text-sm font-medium leading-5 tracking-[0.1px] text-[#4A4459]">
									{item.status === "paid" ? "Paid" : "Unpaid"}
								</span>
							</Badge>
						</div>
						<div className="flex w-[120px] items-center gap-[5px]">
							<span className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-primary">
								{item.dueDate}
							</span>
							{item.aging && item.agingType === "overdue" && (
								<Badge className="min-w-[48px] rounded-[50px] bg-[rgba(236,34,31,1)]">
									<span className=" text-sm font-medium leading-5 tracking-[0.1px] text-white">
										{item.aging}
									</span>
								</Badge>
							)}
						</div>
						<div className="flex w-[120px] items-center gap-[5px]">
							<div className="flex items-center justify-center gap-2.5 rounded-[5px] border  px-2 py-1">
								<span className="font-inter text-xs text-[rgba(191,106,2,1)]">
									{item.days} days
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</Card>
	);
}
