"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Filter, MoreHorizontal, Search } from "lucide-react";

export function InvoiceFilters() {
	return (
		<div className="flex flex-wrap items-center gap-5">
			{/* Show count */}
			<Select defaultValue="20">
				<SelectTrigger className="h-[54px] w-auto min-w-[80px] rounded-[10px] border ">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="10">10</SelectItem>
					<SelectItem value="20">20</SelectItem>
					<SelectItem value="50">50</SelectItem>
				</SelectContent>
			</Select>

			{/* Search */}
			<div className="relative flex h-[54px] flex-1 items-center gap-[15px] rounded-[10px] border  px-4">
				<Search className="h-5 w-5 text-primary" />
				<Input
					placeholder="Nama tugas"
					className="h-auto border-0 p-0 font-dm text-base text-muted-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
				/>
			</div>

			{/* Filter buttons */}
			<div className="flex items-center gap-2.5">
				<Select defaultValue="all-status">
					<SelectTrigger className="h-[54px] w-auto min-w-[120px] rounded-[10px] border ">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all-status">All Status</SelectItem>
						<SelectItem value="paid">Paid</SelectItem>
						<SelectItem value="unpaid">Unpaid</SelectItem>
					</SelectContent>
				</Select>

				<Select defaultValue="all-type">
					<SelectTrigger className="h-[54px] w-auto min-w-[120px] rounded-[10px] border ">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all-type">All Type</SelectItem>
						<SelectItem value="type1">Type 1</SelectItem>
						<SelectItem value="type2">Type 2</SelectItem>
					</SelectContent>
				</Select>

				<Button
					variant="outline"
					className="h-[54px] gap-1 rounded-[10px] border "
				>
					<Filter className="h-[18px] w-[18px] text-primary" />
					<span className=" text-sm font-medium leading-5 text-muted-foreground">
						Filter
					</span>
				</Button>

				<Button
					variant="ghost"
					size="icon"
					className="h-[54px] w-[54px] rounded-[10px] hover:bg-muted"
				>
					<MoreHorizontal className="h-[35px] w-[35px] text-[#4318FF]" />
				</Button>
			</div>
		</div>
	);
}
