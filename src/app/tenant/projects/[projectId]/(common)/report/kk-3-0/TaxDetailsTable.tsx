"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Download, Search, ChevronDown, Filter, MoreHorizontal } from "lucide-react";

interface TaxDetail {
	jenisPajak: string;
	dpp: string;
	tarif: string;
	pajakTerutang: string;
	kredit: string;
	neto: string;
	status: string;
}

interface TaxDetailsTableProps {
	data: TaxDetail[];
}

export function TaxDetailsTable({ data }: TaxDetailsTableProps) {
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<Card className="rounded-[20px] shadow-[0_1px_2px_0_rgba(0,0,0,0.30),0_1px_3px_1px_rgba(0,0,0,0.15)]">
			<CardHeader className="space-y-4 p-6">
				<div>
					<CardTitle className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] text-[#2B3674]">
						Detail Perhitungan Pajak
					</CardTitle>
					<p className="font-roboto text-xs leading-4 tracking-[0.4px] text-[#2B3674]">
						Kelola Invoice di dalam Project
					</p>
				</div>

				{/* Filters */}
				<div className="flex items-center gap-5">
					<Select defaultValue="20">
						<SelectTrigger className="h-[54px] w-auto rounded-[10px] border-[#D9D9D9]">
							<SelectValue />
							<ChevronDown className="h-3 w-6 text-[#332687]" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="20">20</SelectItem>
							<SelectItem value="50">50</SelectItem>
							<SelectItem value="100">100</SelectItem>
						</SelectContent>
					</Select>

					<div className="relative flex-1">
						<Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#332687]" />
						<Input
							placeholder="Nama tugas"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="h-[54px] rounded-[10px] border-[#D9D9D9] pl-12 font-dm text-base text-[#8F9BBA]"
						/>
					</div>

					<div className="flex items-center gap-[10px]">
						<Select defaultValue="all-status">
							<SelectTrigger className="h-[54px] w-auto rounded-[10px] border-[#D9D9D9]">
								<SelectValue placeholder="All Status" />
								<ChevronDown className="h-3 w-6 text-[#332687]" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all-status">All Status</SelectItem>
								<SelectItem value="final">Final</SelectItem>
								<SelectItem value="draft">Draft</SelectItem>
							</SelectContent>
						</Select>

						<Select defaultValue="all-type">
							<SelectTrigger className="h-[54px] w-auto rounded-[10px] border-[#D9D9D9]">
								<SelectValue placeholder="All Type" />
								<ChevronDown className="h-3 w-6 text-[#332687]" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all-type">All Type</SelectItem>
								<SelectItem value="ppn">PPN</SelectItem>
								<SelectItem value="pph">PPh</SelectItem>
							</SelectContent>
						</Select>

						<Button
							variant="outline"
							className="h-[54px] gap-1 rounded-[10px] border-[#D9D9D9]"
						>
							<Filter className="h-[18px] w-[18px] text-[#332687]" />
							<span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">
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
			</CardHeader>

			<CardContent className="space-y-[10px] p-6 pt-0">
				{/* Table Header */}
				<div className="flex items-center justify-between">
					{[
						"Jenis Pajak",
						"DPP",
						"Tarif",
						"Pajak Terutang",
						"Kredit",
						"Neto",
						"Status",
						"SPT Export",
					].map((header) => (
						<div key={header} className="flex w-[120px] items-center gap-[7px]">
							<div className="font-dm text-sm font-medium leading-6 tracking-[-0.28px] text-[#A3AED0]">
								{header}
							</div>
							<ChevronDown className="h-6 w-6 flex-shrink-0 text-[#A3AED0]" />
						</div>
					))}
				</div>

				{/* Table Rows */}
				{data.map((row, index) => (
					<div key={index} className="flex items-center justify-between">
						<div className="w-[150px]">
							<div className="font-inter text-sm font-medium leading-[14px] text-[#404040]">
								{row.jenisPajak}
							</div>
						</div>
						<div className="w-[120px]">
							<div className="font-inter text-sm font-medium leading-[14px] text-[#404040]">
								{row.dpp}
							</div>
						</div>
						<div className="w-[120px]">
							<div className="font-inter text-sm font-medium leading-[14px] text-[#404040]">
								{row.tarif}
							</div>
						</div>
						<div className="w-[120px]">
							<div className="font-inter text-sm font-medium leading-[14px] text-[#404040]">
								{row.pajakTerutang}
							</div>
						</div>
						<div className="w-[120px]">
							<div className="font-inter text-sm font-medium leading-[14px] text-[#404040]">
								{row.kredit}
							</div>
						</div>
						<div className="w-[120px]">
							<div className="font-inter text-sm font-medium leading-[14px] text-[#404040]">
								{row.neto}
							</div>
						</div>
						<div className="w-[120px]">
							<Badge
								variant="secondary"
								className={`min-w-[48px] rounded-[50px] ${
									row.status === "Final"
										? "bg-[rgba(207,247,211,1)]"
										: "bg-[rgba(255,241,194,1)]"
								}`}
							>
								<span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#4A4459]">
									{row.status}
								</span>
							</Badge>
						</div>
						<div className="w-[120px]">
							<Button
								variant="outline"
								className="h-[48px] gap-1 rounded-[10px] border-[#D9D9D9]"
							>
								<Download className="h-[30px] w-[30px] text-[#404040]" />
								<span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">
									Export
								</span>
							</Button>
						</div>
					</div>
				))}

				{/* Pagination */}
				<div className="flex items-center justify-between pt-4">
					<div className="font-geist text-sm leading-[150%] tracking-[0.07px] text-[#737373]">
						Showing 1-10 of 100 products
					</div>
					<div className="flex items-center gap-2">
						{/* Add pagination controls here if needed */}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
