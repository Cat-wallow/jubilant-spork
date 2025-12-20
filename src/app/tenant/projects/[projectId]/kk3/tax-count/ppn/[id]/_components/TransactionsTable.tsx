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
import { Search, Filter, MoreHorizontal, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
	no: number;
	date: string;
	documentNumber: string;
	counterparty: {
		name: string;
		npwp?: string;
	};
	type?: string;
	dpp: string;
	ppn: string;
	category: {
		type: "keluaran" | "masukan" | "impor";
		label: string;
		icon: React.ReactNode;
	};
}

interface TransactionsTableProps {
	transactions: Transaction[];
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
	const getCategoryBadge = (category: Transaction["category"]) => {
		const colors = {
			keluaran: "bg-[#DCFCE7] text-[#016630] border-transparent",
			masukan: "bg-[#DBEAFE] text-primary border-transparent",
			impor: "bg-[#F3E8FF] text-[#6E11B0] border-transparent",
		};

		return (
			<div className="flex items-center gap-2">
				{category.icon}
				<Badge
					className={cn(
						"rounded-lg border-[0.8px] px-2 py-0.5",
						colors[category.type],
					)}
				>
					<span className="font-['Arial'] text-xs leading-4">
						{category.label}
					</span>
				</Badge>
			</div>
		);
	};

	return (
		<Card className="border-[0.8px] ">
			<CardHeader className="pb-5">
				<CardTitle className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] text-primary">
					Detail Transaksi Pajak
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

				{/* Table */}
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow className="border-b-[0.8px]  bg-[#ECECF0]/50">
								<TableHead className="font-['Arial'] text-sm leading-5 ">
									No
								</TableHead>
								<TableHead className="font-['Arial'] text-sm leading-5 ">
									Tanggal
								</TableHead>
								<TableHead className="font-['Arial'] text-sm leading-5 ">
									No Dokumen/Faktur
								</TableHead>
								<TableHead className="font-['Arial'] text-sm leading-5 ">
									Lawan Transaksi
								</TableHead>
								<TableHead className="font-['Arial'] text-sm leading-5 ">
									Jenis
								</TableHead>
								<TableHead className="text-right font-['Arial'] text-sm leading-5 ">
									DPP
								</TableHead>
								<TableHead className="text-right font-['Arial'] text-sm leading-5 ">
									PPN
								</TableHead>
								<TableHead className="font-['Arial'] text-sm leading-5 ">
									Kategori
								</TableHead>
								<TableHead className="font-['Arial'] text-sm leading-5 ">
									Aksi
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{transactions.map((transaction) => (
								<TableRow key={transaction.no} className="border-b-[0.8px] ">
									<TableCell className="font-['Arial'] text-sm leading-5 ">
										{transaction.no}
									</TableCell>
									<TableCell className="font-['Arial'] text-sm leading-5 ">
										{transaction.date}
									</TableCell>
									<TableCell className="font-['Consolas'] text-sm leading-5 ">
										{transaction.documentNumber}
									</TableCell>
									<TableCell>
										<div className="flex flex-col">
											<span className="font-['Arial'] text-sm leading-5 ">
												{transaction.counterparty.name}
											</span>
											{transaction.counterparty.npwp && (
												<span className="font-['Consolas'] text-xs leading-4 text-muted-foreground">
													{transaction.counterparty.npwp}
												</span>
											)}
										</div>
									</TableCell>
									<TableCell className="font-['Arial'] text-sm leading-5 ">
										{transaction.type || "-"}
									</TableCell>
									<TableCell className="text-right font-['Consolas'] text-sm leading-5 ">
										{transaction.dpp}
									</TableCell>
									<TableCell className="text-right font-['Consolas'] text-sm leading-5 ">
										{transaction.ppn}
									</TableCell>
									<TableCell>
										{getCategoryBadge(transaction.category)}
									</TableCell>
									<TableCell>
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8 rounded-lg"
										>
											<Eye className="h-4 w-4 " />
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	);
}
