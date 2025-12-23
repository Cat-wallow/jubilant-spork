"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Search,
	Filter,
	MoreHorizontal,
	Download,
	Edit2,
	FileText,
	ChevronLeft,
	ChevronRight,
	MoreHorizontal as MoreIcon,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock Data
const sptData = [
	{
		id: 1,
		type: "PPN",
		subType: "PPN Keluaran",
		dasarPengenaan: "Rp 125.000.000",
		tarif: "11%",
		pajakTerutang: "Rp 13.750.000",
		kredit: "Rp 0",
		neto: "Rp 13.750.000",
		status: "final",
		sptStatus: "Ready",
	},
	{
		id: 2,
		type: "PPN",
		subType: "PPN Masukan",
		dasarPengenaan: "Rp 85.000.000",
		tarif: "11%",
		pajakTerutang: "Rp 9.350.000",
		kredit: "Rp 9.350.000",
		neto: "Rp 0",
		status: "final",
		sptStatus: "Ready",
	},
	{
		id: 3,
		type: "PPh",
		subType: "PPh 21",
		dasarPengenaan: "Rp 45.000.000",
		tarif: "5%",
		pajakTerutang: "Rp 2.250.000",
		kredit: "Rp 0",
		neto: "Rp 2.250.000",
		status: "final",
		sptStatus: "Ready",
	},
	{
		id: 4,
		type: "PPh",
		subType: "PPh 23",
		dasarPengenaan: "Rp 35.000.000",
		tarif: "2%",
		pajakTerutang: "Rp 700.000",
		kredit: "Rp 0",
		neto: "Rp 700.000",
		status: "final",
		sptStatus: "Ready",
	},
	{
		id: 5,
		type: "PPh",
		subType: "PPh 25",
		dasarPengenaan: "Rp 180.000.000",
		tarif: "25%",
		pajakTerutang: "Rp 45.000.000",
		kredit: "Rp 42.000.000",
		neto: "Rp 3.000.000",
		status: "final",
		sptStatus: "Ready",
	},
	{
		id: 6,
		type: "PPh",
		subType: "PPh 22",
		dasarPengenaan: "Rp 25.000.000",
		tarif: "0.5%",
		pajakTerutang: "Rp 125.000",
		kredit: "Rp 0",
		neto: "Rp 125.000",
		status: "final",
		sptStatus: "Pending",
	},
	{
		id: 7,
		type: "PPh",
		subType: "PPh 26",
		dasarPengenaan: "Rp 15.000.000",
		tarif: "20%",
		pajakTerutang: "Rp 3.000.000",
		kredit: "Rp 0",
		neto: "Rp 3.000.000",
		status: "draft",
		sptStatus: "Pending",
	},
	{
		id: 8,
		type: "PPh",
		subType: "PPh Final",
		dasarPengenaan: "Rp 12.000.000",
		tarif: "0.5%",
		pajakTerutang: "Rp 60.000",
		kredit: "Rp 0",
		neto: "Rp 60.000",
		status: "final",
		sptStatus: "Ready",
	},
	{
		id: 9,
		type: "PPN",
		subType: "PPN Ekspor (0%)",
		dasarPengenaan: "Rp 50.000.000",
		tarif: "0%",
		pajakTerutang: "Rp 0",
		kredit: "Rp 0",
		neto: "Rp 0",
		status: "final",
		sptStatus: "Ready",
	},
	{
		id: 10,
		type: "PPh",
		subType: "PPh 29",
		dasarPengenaan: "Rp 95.000.000",
		tarif: "25%",
		pajakTerutang: "Rp 23.750.000",
		kredit: "Rp 22.000.000",
		neto: "Rp 1.750.000",
		status: "draft",
		sptStatus: "Pending",
	},
];

export function DaftarSPTTable() {
	return (
		<div className="flex flex-col gap-[30px] rounded-[14px] bg-card pb-8">
			{/* Header & Toolbar */}
			<div className="flex flex-col gap-5 p-[30px] pb-0">
				<div className="flex flex-col gap-1">
					<h3 className=" text-2xl font-bold leading-8 ">Daftar SPT</h3>
					<p className=" text-base leading-4 text-muted-foreground">
						Kelola dan pantau status pelaporan SPT
					</p>
				</div>

				{/* Filters */}
				<div className="flex items-center gap-5 self-stretch rounded-[10px]  p-2.5">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								className="h-[54px] gap-1 rounded-[10px]  bg-card px-[5px] py-0"
							>
								<span className="px-1.5 py-1.5  text-sm font-medium leading-5 tracking-[0.1px] text-muted-foreground">
									20
								</span>
								<svg width="12" height="24" viewBox="0 0 24 12" fill="none">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M11.2884 10.1569L5.63137 4.49994L7.04537 3.08594L11.9954 8.03594L16.9454 3.08594L18.3594 4.49994L12.7024 10.1569C12.5148 10.3444 12.2605 10.4497 11.9954 10.4497C11.7302 10.4497 11.4759 10.3444 11.2884 10.1569Z"
										fill="#332687"
									/>
								</svg>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>10</DropdownMenuItem>
							<DropdownMenuItem>20</DropdownMenuItem>
							<DropdownMenuItem>50</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<div className="flex h-[54px] flex-1 items-center gap-[15px] rounded-[10px] border  bg-card px-5">
						<Search className="h-5 w-5 text-primary" />
						<Input
							placeholder="Cari dokumen"
							className="h-auto border-0 p-0 font-dm text-base leading-5 tracking-[-0.32px] text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
						/>
					</div>

					<div className="flex items-center gap-2.5">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									className="h-[54px] gap-1 rounded-[10px]  bg-card px-[5px] py-0"
								>
									<span className="px-1.5 py-1.5  text-sm font-medium leading-5 tracking-[0.1px] text-muted-foreground">
										All Status
									</span>
									<svg width="12" height="24" viewBox="0 0 24 12" fill="none">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M11.2884 10.1569L5.63137 4.49994L7.04537 3.08594L11.9954 8.03594L16.9454 3.08594L18.3594 4.49994L12.7024 10.1569C12.5148 10.3444 12.2605 10.4497 11.9954 10.4497C11.7302 10.4497 11.4759 10.3444 11.2884 10.1569Z"
											fill="#332687"
										/>
									</svg>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem>All Status</DropdownMenuItem>
								<DropdownMenuItem>Valid</DropdownMenuItem>
								<DropdownMenuItem>Pending</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									className="h-[54px] gap-1 rounded-[10px]  bg-card px-[5px] py-0"
								>
									<span className="px-1.5 py-1.5  text-sm font-medium leading-5 tracking-[0.1px] text-muted-foreground">
										All Type
									</span>
									<svg width="12" height="24" viewBox="0 0 24 12" fill="none">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M11.2884 10.1569L5.63137 4.49994L7.04537 3.08594L11.9954 8.03594L16.9454 3.08594L18.3594 4.49994L12.7024 10.1569C12.5148 10.3444 12.2605 10.4497 11.9954 10.4497C11.7302 10.4497 11.4759 10.3444 11.2884 10.1569Z"
											fill="#332687"
										/>
									</svg>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem>All Type</DropdownMenuItem>
								<DropdownMenuItem>Asset</DropdownMenuItem>
								<DropdownMenuItem>Liability</DropdownMenuItem>
								<DropdownMenuItem>Revenue</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						<Button
							variant="outline"
							className="h-[54px] gap-1 rounded-[10px]   px-[5px] py-0"
						>
							<Filter className="h-[18px] w-[18px] text-primary" />
							<span className="px-1.5 py-1.5  text-sm font-medium leading-5 tracking-[0.1px] text-muted-foreground">
								Filter
							</span>
						</Button>

						<Button
							variant="outline"
							className="h-[54px] w-[54px] rounded-[10px] "
						>
							<MoreHorizontal className="h-[35px] w-[35px] text-primary" />
						</Button>
					</div>
				</div>
			</div>

			{/* Table */}
			<div className="px-[30px]">
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-transparent">
							<TableHead className="w-[217px]  text-base font-bold text-muted-foreground">
								Jenis Pajak
							</TableHead>
							<TableHead className="w-[160px]  text-base font-bold text-muted-foreground">
								Dasar Pengenaan
							</TableHead>
							<TableHead className="w-[58px]  text-base font-bold text-muted-foreground">
								Tarif
							</TableHead>
							<TableHead className="w-[139px]  text-base font-bold text-muted-foreground">
								Pajak Terutang
							</TableHead>
							<TableHead className="w-[130px]  text-base font-bold text-muted-foreground">
								Kredit
							</TableHead>
							<TableHead className="w-[131px]  text-base font-bold text-muted-foreground">
								Neto
							</TableHead>
							<TableHead className="w-[76px]  text-base font-bold text-muted-foreground">
								Status
							</TableHead>
							<TableHead className="w-[100px]  text-base font-bold text-muted-foreground">
								SPT
							</TableHead>
							<TableHead className="w-[117px]  text-base font-bold text-muted-foreground">
								Action
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{sptData.map((row) => (
							<TableRow
								key={row.id}
								className="h-[49px] border-b border-[rgba(0,0,0,0.10)] hover:bg-muted/50"
							>
								<TableCell className=" text-base ">
									<div className="flex items-center gap-2">
										<Badge
											variant="secondary"
											className="h-[21px] rounded bg-[#F3F4F6] px-2 py-[3px]  text-xs font-medium text-[#1F2937]"
										>
											{row.type}
										</Badge>
										<span>{row.subType}</span>
									</div>
								</TableCell>
								<TableCell className=" text-base ">
									{row.dasarPengenaan}
								</TableCell>
								<TableCell className=" text-base ">{row.tarif}</TableCell>
								<TableCell className=" text-base ">
									{row.pajakTerutang}
								</TableCell>
								<TableCell className=" text-base ">{row.kredit}</TableCell>
								<TableCell className=" text-base font-bold ">
									{row.neto}
								</TableCell>
								<TableCell>
									<Badge
										variant={row.status === "final" ? "default" : "secondary"}
										className={`h-[21px] rounded px-2 py-[3px]  text-xs font-medium capitalize ${
											row.status === "final"
												? "bg-[#E6F4EA] text-[#137333] hover:bg-[#E6F4EA]"
												: "bg-[#F3F4F6] text-[#1F2937] hover:bg-[#F3F4F6]"
										}`}
									>
										{row.status}
									</Badge>
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-2">
										<div
											className={`h-4 w-4 rounded-full border-2 ${row.sptStatus === "Ready" ? "border-[#00C950]" : "border-[#FFB020]"}`}
										/>
										<span className=" text-base ">{row.sptStatus}</span>
									</div>
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-2">
										<Button variant="ghost" size="icon" className="h-8 w-9">
											<Download className="h-4 w-4 text-muted-foreground" />
										</Button>
										<Button variant="ghost" size="icon" className="h-8 w-9">
											<Edit2 className="h-4 w-4 text-muted-foreground" />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			{/* Pagination */}
			<div className="flex items-center justify-between px-[30px]">
				<span className=" text-sm text-muted-foreground">
					Showing 1-10 of 100 products
				</span>
				<div className="flex items-center gap-1">
					<Button
						variant="outline"
						size="icon"
						className="h-9 w-9 rounded-[10px] border-[rgba(0,0,0,0.10)]"
						disabled
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="default"
						className="h-9 w-9 rounded-[10px]  p-0  text-sm font-medium text-white "
					>
						1
					</Button>
					<Button
						variant="ghost"
						className="h-9 w-9 rounded-[10px] p-0  text-sm text-muted-foreground"
					>
						2
					</Button>
					<Button
						variant="ghost"
						className="h-9 w-9 rounded-[10px] p-0  text-sm text-muted-foreground"
					>
						3
					</Button>
					<Button
						variant="ghost"
						className="h-9 w-9 rounded-[10px] p-0  text-sm text-muted-foreground"
					>
						4
					</Button>
					<span className="flex h-9 w-9 items-center justify-center  text-sm text-muted-foreground">
						...
					</span>
					<Button
						variant="ghost"
						className="h-9 w-9 rounded-[10px] p-0  text-sm text-muted-foreground"
					>
						10
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="h-9 w-9 rounded-[10px] border-[rgba(0,0,0,0.10)]"
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
