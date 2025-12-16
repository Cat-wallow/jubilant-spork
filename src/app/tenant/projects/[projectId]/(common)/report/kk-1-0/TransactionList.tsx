"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Download,
	Search,
	ChevronDown,
	Filter,
	MoreHorizontal,
	ExternalLink,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
	id: string;
	date: string;
	type: string;
	value: string;
	status: string;
	module: string;
}

interface TransactionListProps {
	transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
	const getStatusColor = (status: string) => {
		switch (status) {
			case "Vouching":
				return "bg-[#E8DEF8] text-[#4A4459]";
			case "Review":
				return "bg-[rgba(255,241,194,1)] text-[#4A4459]";
			case "Blocked":
				return "bg-[rgba(236,34,31,1)] text-white";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<Card className="shadow-[0_1px_2px_0_rgba(0,0,0,0.30),0_1px_3px_1px_rgba(0,0,0,0.15)]">
			<CardHeader>
				<div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
					<div>
						<CardTitle>Daftar Transaksi</CardTitle>
						<CardDescription>Kelola Invoice di dalam Project</CardDescription>
					</div>
					<div className="flex gap-2.5">
						<Button variant="outline" size="sm" className="gap-1">
							<Download className="h-4 w-4" />
							Export XLSX
						</Button>
						<Button variant="outline" size="sm" className="gap-1">
							<Download className="h-4 w-4" />
							Export PDF
						</Button>
					</div>
				</div>
			</CardHeader>

			<CardContent className="space-y-5">
				{/* Filters */}
				<div className="flex flex-wrap items-center gap-5">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="gap-1">
								20
								<ChevronDown className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>10</DropdownMenuItem>
							<DropdownMenuItem>20</DropdownMenuItem>
							<DropdownMenuItem>50</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
						<Input placeholder="Nama tugas" className="pl-10" />
					</div>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="gap-1">
								All Status
								<ChevronDown className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>All Status</DropdownMenuItem>
							<DropdownMenuItem>Vouching</DropdownMenuItem>
							<DropdownMenuItem>Review</DropdownMenuItem>
							<DropdownMenuItem>Blocked</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="gap-1">
								All Type
								<ChevronDown className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>All Type</DropdownMenuItem>
							<DropdownMenuItem>Sales</DropdownMenuItem>
							<DropdownMenuItem>Purchase</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<Button variant="outline" className="gap-1">
						<Filter className="h-4 w-4" />
						Filter
					</Button>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon">
								<MoreHorizontal className="h-5 w-5" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>Export</DropdownMenuItem>
							<DropdownMenuItem>Delete All</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{/* Table Header */}
				<div className="flex items-center justify-between border-b pb-2.5">
					<div className="flex w-[150px] items-center gap-1.5">
						<span className="font-dm text-sm font-medium text-[#A3AED0]">Nomor Transaksi</span>
						<ChevronDown className="h-4 w-4 text-[#A3AED0]" />
					</div>
					<div className="flex w-[150px] items-center gap-1.5">
						<span className="font-dm text-sm font-medium text-[#A3AED0]">Tanggal</span>
						<ChevronDown className="h-4 w-4 text-[#A3AED0]" />
					</div>
					<div className="flex w-[120px] items-center gap-1.5">
						<span className="font-dm text-sm font-medium text-[#A3AED0]">Jenis</span>
						<ChevronDown className="h-4 w-4 text-[#A3AED0]" />
					</div>
					<div className="flex w-[120px] items-center gap-1.5">
						<span className="font-dm text-sm font-medium text-[#A3AED0]">Nilai</span>
						<ChevronDown className="h-4 w-4 text-[#A3AED0]" />
					</div>
					<div className="flex w-[120px] items-center gap-1.5">
						<span className="font-dm text-sm font-medium text-[#A3AED0]">Status</span>
						<ChevronDown className="h-4 w-4 text-[#A3AED0]" />
					</div>
					<div className="flex w-[120px] items-center gap-1.5">
						<span className="font-dm text-sm font-medium text-[#A3AED0]">Modul Asal</span>
						<ChevronDown className="h-4 w-4 text-[#A3AED0]" />
					</div>
					<div className="flex w-[120px] items-center gap-1.5">
						<span className="font-dm text-sm font-medium text-[#A3AED0]">Action</span>
						<ChevronDown className="h-4 w-4 text-[#A3AED0]" />
					</div>
				</div>

				{/* Table Body */}
				<div className="space-y-2.5">
					{transactions.map((transaction) => (
						<div key={transaction.id} className="flex items-center justify-between py-2.5">
							<div className="w-[150px]">
								<span className="font-inter text-sm font-medium text-[#404040]">
									{transaction.id}
								</span>
							</div>
							<div className="w-[150px]">
								<span className="font-inter text-sm font-medium text-[#404040]">
									{transaction.date}
								</span>
							</div>
							<div className="w-[120px]">
								<span className="font-inter text-sm font-medium text-[#404040]">
									{transaction.type}
								</span>
							</div>
							<div className="w-[120px]">
								<span className="font-inter text-sm font-medium text-[#404040]">
									{transaction.value}
								</span>
							</div>
							<div className="w-[120px]">
								<Badge className={cn("rounded-full px-3 py-1", getStatusColor(transaction.status))}>
									{transaction.status}
								</Badge>
							</div>
							<div className="w-[120px]">
								<div className="inline-flex items-center justify-center gap-2.5 rounded-[5px] border border-[rgba(145,158,171,0.20)] px-3 py-1">
									<span className="font-inter text-xs text-[#332687]">{transaction.module}</span>
								</div>
							</div>
							<div className="flex w-[120px] items-center gap-5">
								<Button variant="ghost" size="icon" className="h-8 w-8">
									<ExternalLink className="h-5 w-5 text-[#332687]" />
								</Button>
							</div>
						</div>
					))}
				</div>

				{/* Pagination */}
				<div className="flex items-center justify-between pt-2.5">
					<p className="font-geist text-sm text-[#737373]">Showing 1-10 of 100 products</p>
					<div className="flex items-center gap-2">
						<Button variant="ghost" size="sm" className="gap-1">
							<ChevronLeft className="h-4 w-4" />
							Previous
						</Button>
						<Button variant="outline" size="sm" className="bg-white shadow-sm">
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
						<Button variant="ghost" size="sm">
							...
						</Button>
						<Button variant="ghost" size="sm">
							10
						</Button>
						<Button variant="ghost" size="sm" className="gap-1">
							Next
							<ChevronRight className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
