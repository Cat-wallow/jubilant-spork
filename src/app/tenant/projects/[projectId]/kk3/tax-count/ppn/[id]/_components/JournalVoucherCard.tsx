"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

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

interface JournalVoucherCardProps {
	voucher: JournalVoucher;
}

export function JournalVoucherCard({ voucher }: JournalVoucherCardProps) {
	return (
		<Card className="border-[0.8px] ">
			<CardContent className="space-y-[42px] p-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-1">
						<div className="flex items-center gap-3">
							<span className="font-['Arial'] text-base leading-6 ">
								{voucher.voucherNumber}
							</span>
							{voucher.badges.map((badge, index) => (
								<Badge
									key={index}
									className={
										badge.variant === "dark"
											? "rounded-lg border-transparent bg-[#030213] px-2 py-0.5 text-white"
											: "rounded-lg border-transparent bg-[#ECEEF2] px-2 py-0.5 bg-muted"
									}
								>
									<span className="font-['Arial'] text-xs leading-4">
										{badge.label}
									</span>
								</Badge>
							))}
						</div>
						<span className="font-['Arial'] text-sm leading-5 text-muted-foreground">
							{voucher.date} • {voucher.description}
						</span>
						{voucher.linkedTo && (
							<span className="font-['Arial'] text-xs leading-4 text-[#155DFC]">
								Linked to: {voucher.linkedTo}
							</span>
						)}
					</div>
					<div className="flex flex-col items-end">
						<span className="font-['Arial'] text-sm leading-5 ">
							{voucher.totalAmount}
						</span>
						<span className="font-['Arial'] text-xs leading-4 text-muted-foreground">
							{voucher.status}
						</span>
					</div>
				</div>

				{/* Entries Table */}
				<Table>
					<TableHeader>
						<TableRow className="border-b-[0.8px] ">
							<TableHead className="font-['Arial'] text-xs leading-4 ">
								Kode Akun
							</TableHead>
							<TableHead className="font-['Arial'] text-xs leading-4 ">
								Nama Akun
							</TableHead>
							<TableHead className="text-right font-['Arial'] text-xs leading-4 ">
								Debit
							</TableHead>
							<TableHead className="text-right font-['Arial'] text-xs leading-4 ">
								Kredit
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{voucher.entries.map((entry, index) => (
							<TableRow
								key={index}
								className={
									entry.accountName === "Total"
										? "border-0 bg-[#ECECF0]/20"
										: "border-b-[0.8px] "
								}
							>
								<TableCell className="font-['Consolas'] text-xs leading-4 ">
									{entry.accountCode}
								</TableCell>
								<TableCell className="font-['Arial'] text-sm leading-5 ">
									{entry.accountName}
								</TableCell>
								<TableCell className="text-right font-['Consolas'] text-sm leading-5 ">
									{entry.debit}
								</TableCell>
								<TableCell className="text-right font-['Consolas'] text-sm leading-5 ">
									{entry.credit}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
