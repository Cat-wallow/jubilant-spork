"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Search, Filter, MoreHorizontal } from "lucide-react";
import { JournalVoucherCard } from "./JournalVoucherCard";

interface JournalEntry {
	accountCode: string;
	accountName: string;
	debit: string;
	credit: string;
}

interface JournalVoucher {
	voucherNumber: string;
	badges: { label: string; variant: "dark" | "light" }[];
	date: string;
	description: string;
	linkedTo?: string;
	totalAmount: string;
	status: string;
	entries: JournalEntry[];
}

interface JournalVoucherListProps {
	vouchers: JournalVoucher[];
}

export function JournalVoucherList({ vouchers }: JournalVoucherListProps) {
	return (
		<Card className="border-[0.8px] ">
			<CardHeader className="pb-5">
				<CardTitle className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] text-primary">
					Detail Voucher Transaksi Pajak
				</CardTitle>
				<CardDescription className="font-['Roboto'] text-xs leading-4 tracking-[0.4px] text-primary">
					Daftar transkasi tercatat
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-5">
				{/* Filters */}
				<div className="flex items-center gap-5 rounded-[10px] bg-background p-2.5">
					<Select defaultValue="20">
						<SelectTrigger className="h-[54px] w-auto gap-1 rounded-[10px] border  bg-card px-[5px]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="10">10</SelectItem>
							<SelectItem value="20">20</SelectItem>
							<SelectItem value="50">50</SelectItem>
						</SelectContent>
					</Select>

					<div className="relative flex flex-1 items-center gap-[15px] rounded-[10px] border  bg-card px-5">
						<Search className="h-5 w-5 text-primary" strokeWidth={3} />
						<Input
							placeholder="Cari nama user"
							className="h-[54px] border-0 p-0 font-dm text-base leading-5 tracking-[-0.32px] text-muted-foreground placeholder:text-muted-foreground focus-visible:ring-0"
						/>
					</div>

					<Select defaultValue="all-status">
						<SelectTrigger className="h-[54px] w-auto gap-1 rounded-[10px] border  bg-card px-[5px]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all-status">All Status</SelectItem>
						</SelectContent>
					</Select>

					<Select defaultValue="all-type">
						<SelectTrigger className="h-[54px] w-auto gap-1 rounded-[10px] border  bg-card px-[5px]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all-type">All Type</SelectItem>
						</SelectContent>
					</Select>

					<Button
						variant="ghost"
						size="icon"
						className="h-[54px] rounded-[10px] border  bg-muted px-3"
					>
						<Filter className="h-[18px] w-[18px] text-primary" />
						<span className="ml-1 font-['Roboto'] text-sm font-medium leading-5 tracking-[0.1px] text-muted-foreground">
							Filter
						</span>
					</Button>

					<Button
						variant="ghost"
						size="icon"
						className="h-[54px] w-[54px] rounded-[10px] bg-background"
					>
						<MoreHorizontal className="h-[35px] w-[35px] text-[#4318FF]" />
					</Button>
				</div>

				{/* Voucher Cards */}
				<div className="space-y-6">
					{vouchers.map((voucher, index) => (
						<JournalVoucherCard key={index} voucher={voucher} />
					))}
				</div>
			</CardContent>
		</Card>
	);
}
