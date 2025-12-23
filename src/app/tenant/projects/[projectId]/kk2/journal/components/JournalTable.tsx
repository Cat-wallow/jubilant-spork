"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Search,
	ChevronDown,
	Filter,
	MoreHorizontal,
	Edit,
	Trash2,
} from "lucide-react";
import { JournalEntry } from "../mock-data";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";

interface JournalTableProps {
	data: JournalEntry[];
}

export function JournalTable({ data }: JournalTableProps) {
	const [pageSize, setPageSize] = useState("20");
	const [statusFilter, setStatusFilter] = useState("all");
	const [typeFilter, setTypeFilter] = useState("all");
	const params = useParams();
	const projectId = params.projectId as string;

	return (
		<Card className="flex flex-col items-start gap-[50px] p-6 self-stretch rounded-[20px]">
			<div className="flex flex-col items-start gap-5 self-stretch">
				{/* Header */}
				<div className="flex items-start justify-between self-stretch">
					<div className="flex flex-col items-start">
						<h2 className="text-2xl font-bold leading-8 tracking-[-0.48px] text-primary">
							Journal
						</h2>
						<p className="text-xs leading-4 tracking-[0.4px] text-primary">
							Daftar dokumen dari Form 1.0 yang menunggu pencatatan transaksi
						</p>
					</div>
					<Link href={`/tenant/projects/${projectId}/kk2/journal/add`}>
						<Button className="h-12 gap-1 rounded-[10px] bg-primary hover:bg-primary/90">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M11.25 6.00977C11.4489 6.00977 11.6397 6.08878 11.7803 6.22944C11.921 6.37009 12 6.56085 12 6.75977V10.5098H15.75C15.9489 10.5098 16.1397 10.5888 16.2803 10.7294C16.421 10.8701 16.5 11.0609 16.5 11.2598C16.5 11.4587 16.421 11.6494 16.2803 11.7901C16.1397 11.9307 15.9489 12.0098 15.75 12.0098H12V15.7598C12 15.9587 11.921 16.1494 11.7803 16.2901C11.6397 16.4307 11.4489 16.5098 11.25 16.5098C11.0511 16.5098 10.8603 16.4307 10.7197 16.2901C10.579 16.1494 10.5 15.9587 10.5 15.7598V12.0098H6.75C6.55109 12.0098 6.36032 11.9307 6.21967 11.7901C6.07902 11.6494 6 11.4587 6 11.2598C6 11.0609 6.07902 10.8701 6.21967 10.7294C6.36032 10.5888 6.55109 10.5098 6.75 10.5098H10.5V6.75977C10.5 6.56085 10.579 6.37009 10.7197 6.22944C10.8603 6.08878 11.0511 6.00977 11.25 6.00977Z"
									fill="white"
								/>
							</svg>
							<span className="text-sm font-medium leading-5 tracking-[0.1px]">
								Buat Jurnal Manual
							</span>
						</Button>
					</Link>
				</div>

				{/* Filters */}
				<div className="flex items-center gap-5 self-stretch rounded-[10px]">
					<Select value={pageSize} onValueChange={setPageSize}>
						<SelectTrigger className="h-[54px] w-auto gap-1 rounded-[10px] border ">
							<SelectValue />
							<ChevronDown className="h-3 w-6 text-primary" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="10">10</SelectItem>
							<SelectItem value="20">20</SelectItem>
							<SelectItem value="50">50</SelectItem>
						</SelectContent>
					</Select>

					<div className="relative flex h-[54px] flex-1 items-center gap-[15px] rounded-[10px] border  px-4">
						<Search className="h-5 w-5 text-primary" />
						<Input
							placeholder="Cari dokumen"
							className="h-full border-0 p-0 text-base leading-5 tracking-[-0.32px] text-muted-foreground placeholder:text-muted-foreground focus-visible:ring-0"
						/>
					</div>

					<div className="flex items-center gap-2.5">
						<Select value={statusFilter} onValueChange={setStatusFilter}>
							<SelectTrigger className="h-[54px] gap-1 rounded-[10px] border ">
								<SelectValue placeholder="All Status" />
								<ChevronDown className="h-3 w-6 text-primary" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Status</SelectItem>
								<SelectItem value="posted">Posted</SelectItem>
								<SelectItem value="draft">Draft</SelectItem>
							</SelectContent>
						</Select>

						<Select value={typeFilter} onValueChange={setTypeFilter}>
							<SelectTrigger className="h-[54px] gap-1 rounded-[10px] border ">
								<SelectValue placeholder="All Type" />
								<ChevronDown className="h-3 w-6 text-primary" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Type</SelectItem>
								<SelectItem value="manual">Manual</SelectItem>
								<SelectItem value="auto">Auto</SelectItem>
							</SelectContent>
						</Select>

						<Button
							variant="outline"
							className="h-[54px] gap-1 rounded-[10px] border "
						>
							<Filter className="h-[18px] w-[18px] text-primary" />
							<span className="text-sm font-medium leading-5 tracking-[0.1px] text-muted-foreground">
								Filter
							</span>
						</Button>

						<Button
							variant="ghost"
							size="icon"
							className="h-[54px] w-[54px] rounded-[10px]"
						>
							<MoreHorizontal className="h-[35px] w-[35px] text-[#4318FF]" />
						</Button>
					</div>
				</div>
			</div>

			{/* Table */}
			<div className="flex flex-col items-start gap-2.5 self-stretch">
				<div className="flex items-center justify-between self-stretch">
					<div className="flex w-[120px] items-center gap-[7px]">
						<span className="text-sm font-medium leading-6 tracking-[-0.28px] text-muted-foreground">
							Tanggal
						</span>
						<ChevronDown className="h-6 w-6 text-muted-foreground" />
					</div>
					<div className="flex w-[150px] items-center gap-2.5">
						<span className="text-sm font-medium leading-6 tracking-[-0.28px] text-muted-foreground">
							Number - Deskripsi
						</span>
						<ChevronDown className="h-6 w-6 text-muted-foreground" />
					</div>
					<div className="flex w-[120px] items-center gap-[7px]">
						<span className="text-sm font-medium leading-6 tracking-[-0.28px] text-muted-foreground">
							Jumlah Nilai
						</span>
						<ChevronDown className="h-6 w-6 text-muted-foreground" />
					</div>
					<div className="flex w-[150px] items-center gap-[7px]">
						<span className="text-sm font-medium leading-6 tracking-[-0.28px] text-muted-foreground">
							Action
						</span>
						<ChevronDown className="h-6 w-6 text-muted-foreground" />
					</div>
				</div>

				{data.map((entry) => (
					<div
						key={entry.id}
						className="flex items-center justify-between self-stretch"
					>
						<div className="flex w-[120px] flex-col items-start gap-2.5">
							<span className="text-sm font-medium leading-[14px] ">
								{entry.date}
							</span>
						</div>
						<div className="flex w-[150px] items-center gap-2.5">
							<span className="w-[120px] flex-shrink-0 text-sm font-medium leading-[14px] ">
								{entry.number}
							</span>
						</div>
						<div className="flex w-[120px] flex-col items-start gap-2.5">
							<span className="text-sm font-medium leading-[14px] ">
								Rp. {entry.amount.toLocaleString("id-ID")}
							</span>
						</div>
						<div className="flex h-12 w-[150px] items-center gap-2.5">
							<Link
								href={`/tenant/projects/${projectId}/kk2/journal/${entry.id}`}
							>
								<Button
									variant="ghost"
									size="icon"
									className="h-[25px] w-[25px]"
								>
									<Edit className="h-5 w-5 text-[#958DA5]" />
								</Button>
							</Link>
							<Button variant="ghost" size="icon" className="h-[30px] w-[30px]">
								<Trash2 className="h-[30px] w-[30px] text-[#BF6A02]" />
							</Button>
						</div>
					</div>
				))}
			</div>
		</Card>
	);
}
