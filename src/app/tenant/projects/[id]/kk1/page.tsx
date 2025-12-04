"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
	FileText,
	Plus,
	Search,
	Filter,
	MoreVertical,
	Eye,
	Edit,
	Trash2,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Dummy data untuk transaksi
const transactionData = {
	totalRecorded: 20,
	totalValue: "Rp. 20.000.000",
	pendingDocuments: 20,
	transactions: [
		{
			id: 1,
			jenisDocument: "Invoice",
			nomorDokumen: "INV-20313-231",
			tanggal: "2024-05-5",
			jumlahLembar: 30,
			asliCopyDigital: "Copy",
			status: "In Progress",
		},
		{
			id: 2,
			jenisDocument: "Invoice",
			nomorDokumen: "INV-20313-231",
			tanggal: "2024-05-5",
			jumlahLembar: 30,
			asliCopyDigital: "Copy",
			status: "In Review",
		},
		{
			id: 3,
			jenisDocument: "Invoice",
			nomorDokumen: "INV-20313-231",
			tanggal: "2024-05-5",
			jumlahLembar: 30,
			asliCopyDigital: "Digital",
			status: "In Progress",
		},
		{
			id: 4,
			jenisDocument: "Invoice",
			nomorDokumen: "INV-20313-231",
			tanggal: "2024-05-5",
			jumlahLembar: 30,
			asliCopyDigital: "Digital",
			status: "In Progress",
		},
		{
			id: 5,
			jenisDocument: "Invoice",
			nomorDokumen: "INV-20313-231",
			tanggal: "2024-05-5",
			jumlahLembar: 30,
			asliCopyDigital: "Asli",
			status: "Approved",
		},
	],
};

// Komponen untuk pagination
function PaginationControls() {
	return (
		<div className="flex items-center justify-end gap-2">
			<Button variant="outline" size="icon" className="h-8 w-8">
				<ChevronLeft className="h-4 w-4" />
			</Button>
			<div className="flex gap-1">
				<Button variant="default" size="sm" className="h-8 w-8">
					1
				</Button>
				<Button variant="outline" size="sm" className="h-8 w-8">
					2
				</Button>
				<Button variant="outline" size="sm" className="h-8 w-8">
					3
				</Button>
				<Button variant="outline" size="sm" className="h-8 w-8">
					4
				</Button>
				<span className="flex h-8 w-8 items-center justify-center">...</span>
				<Button variant="outline" size="sm" className="h-8 w-8">
					10
				</Button>
			</div>
			<Button variant="outline" size="icon" className="h-8 w-8">
				<ChevronRight className="h-4 w-4" />
			</Button>
		</div>
	);
}

export default function KK1Page() {
	const params = useParams();
	const router = useRouter();
	const projectId = params.id as string;

	const [searchQuery, setSearchQuery] = useState("");
	const [filterStatus, setFilterStatus] = useState("All Status");
	const [filterType, setFilterType] = useState("All Type");
	const [rowsPerPage, setRowsPerPage] = useState("20");

	const handleAddTransaction = () => {
		router.push(`/tenant/projects/${projectId}/kk1/add`);
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Approved":
				return "bg-[#D1FAE5] text-[#065F46] border-[#6EE7B7]";
			case "In Review":
				return "bg-[#FEF3C7] text-[#92400E] border-[#FCD34D]";
			case "In Progress":
				return "bg-[#DBEAFE] text-[#1E40AF] border-[#93C5FD]";
			default:
				return "bg-gray-100 text-gray-800 border-gray-300";
		}
	};

	return (
		<div className="flex w-full flex-col gap-[30px] bg-[#F4F7FE] p-[30px]">
			{/* Header */}
			<div className="flex items-center justify-between gap-2.5">
				<div className="flex flex-col gap-[5px]">
					<p className="font-dm text-sm font-medium leading-6 text-[#707EAE]">
						KK 1.0 &gt; Tambah Transaksi
					</p>
					<h1 className="font-dm text-[34px] font-bold leading-[42px] tracking-tight text-[#0B1437]">
						Tambah Pencatatan Transaksi
					</h1>
					<p className="font-roboto text-sm leading-5 tracking-[0.25px] text-[#2B3674]">
						Pemetaan Dokumen Transaksi Keuangan Harian
					</p>
				</div>
				<Button
					onClick={handleAddTransaction}
					className="flex h-12 items-center gap-1 rounded-[10px] bg-[#08F] px-3 hover:bg-[#0077dd]"
				>
					<Plus className="h-6 w-6" />
					<span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px]">
						Buat Trasaksi
					</span>
				</Button>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-3 gap-[30px]">
				<Card className="flex items-center gap-4 rounded-[20px] p-5">
					<div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#F4F7FE]">
						<FileText className="h-7 w-7 text-[#332687]" />
					</div>
					<div className="flex flex-col">
						<span className="font-dm text-sm font-bold leading-6 tracking-tight text-[#A3AED0]">
							Total Tercatat
						</span>
						<span className="font-dm text-2xl font-bold leading-8 tracking-tight text-[#404040]">
							{transactionData.totalRecorded}
						</span>
						<span className="font-dm text-xs leading-5 tracking-tight text-[#A3AED0]">
							Telah melengkapi pencatatan transaksi
						</span>
					</div>
				</Card>

				<Card className="flex items-center gap-4 rounded-[20px] p-5">
					<div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#F4F7FE]">
						<FileText className="h-7 w-7 text-[#332687]" />
					</div>
					<div className="flex flex-col">
						<span className="font-dm text-sm font-bold leading-6 tracking-tight text-[#A3AED0]">
							Total Nilai
						</span>
						<span className="font-dm text-2xl font-bold leading-8 tracking-tight text-[#404040]">
							{transactionData.totalValue}
						</span>
						<span className="font-dm text-xs leading-5 tracking-tight text-[#A3AED0]">
							Total dari semua transaksi yang terekam
						</span>
					</div>
				</Card>

				<Card className="flex items-center gap-4 rounded-[20px] p-5">
					<div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#F4F7FE]">
						<FileText className="h-7 w-7 text-[#332687]" />
					</div>
					<div className="flex flex-col">
						<span className="font-dm text-sm font-bold leading-6 tracking-tight text-[#A3AED0]">
							Dokumen Pending
						</span>
						<span className="font-dm text-2xl font-bold leading-8 tracking-tight text-[#404040]">
							{transactionData.pendingDocuments}
						</span>
						<span className="font-dm text-xs leading-5 tracking-tight text-[#A3AED0]">
							Membutuhkan review dan persetujuan
						</span>
					</div>
				</Card>
			</div>

			{/* Table Card */}
			<Card className="rounded-[20px] border border-[rgba(145,158,171,0.20)] p-5">
				<CardHeader className="p-0 pb-5">
					<CardTitle className="font-roboto text-[22px] font-medium leading-7 text-[#2B3674]">
						Register Transaksi
					</CardTitle>
					<p className="font-roboto text-sm leading-5 tracking-[0.25px] text-[#404040]">
						Daftar dokumen dan form 1.0 yang menunggu pencatatan transaksi
					</p>
				</CardHeader>

				<CardContent className="p-0">
					{/* Table Controls */}
					<div className="mb-5 flex items-center justify-between gap-4">
						<div className="flex items-center gap-2">
							<Select value={rowsPerPage} onValueChange={setRowsPerPage}>
								<SelectTrigger className="h-10 w-[100px]">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="10">10</SelectItem>
									<SelectItem value="20">20</SelectItem>
									<SelectItem value="50">50</SelectItem>
									<SelectItem value="100">100</SelectItem>
								</SelectContent>
							</Select>

							<div className="relative">
								<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A3AED0]" />
								<Input
									type="text"
									placeholder="Cari dokumen..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="h-10 pl-9 pr-4"
								/>
							</div>
						</div>

						<div className="flex items-center gap-2">
							<Select value={filterStatus} onValueChange={setFilterStatus}>
								<SelectTrigger className="h-10 w-[140px]">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="All Status">All Status</SelectItem>
									<SelectItem value="Approved">Approved</SelectItem>
									<SelectItem value="In Review">In Review</SelectItem>
									<SelectItem value="In Progress">In Progress</SelectItem>
								</SelectContent>
							</Select>

							<Select value={filterType} onValueChange={setFilterType}>
								<SelectTrigger className="h-10 w-[140px]">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="All Type">All Type</SelectItem>
									<SelectItem value="Invoice">Invoice</SelectItem>
									<SelectItem value="Receipt">Receipt</SelectItem>
								</SelectContent>
							</Select>

							<Button variant="outline" size="icon" className="h-10 w-10">
								<Filter className="h-4 w-4" />
							</Button>

							<Button variant="outline" size="icon" className="h-10 w-10">
								<MoreVertical className="h-4 w-4" />
							</Button>
						</div>
					</div>

					{/* Table */}
					<div className="rounded-lg border border-[rgba(145,158,171,0.20)]">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[50px] text-center">#</TableHead>
									<TableHead>Jenis Dokumen</TableHead>
									<TableHead>Nomor Dokumen</TableHead>
									<TableHead>Tanggal</TableHead>
									<TableHead>Jumlah Lembar</TableHead>
									<TableHead>Asli/Copy/Digital</TableHead>
									<TableHead>Status</TableHead>
									<TableHead className="w-[100px] text-center">
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{transactionData.transactions.map((transaction, index) => (
									<TableRow key={transaction.id}>
										<TableCell className="text-center font-medium">
											{index + 1}
										</TableCell>
										<TableCell className="font-medium">
											{transaction.jenisDocument}
										</TableCell>
										<TableCell>{transaction.nomorDokumen}</TableCell>
										<TableCell>{transaction.tanggal}</TableCell>
										<TableCell>{transaction.jumlahLembar}</TableCell>
										<TableCell>
											<Badge
												variant="outline"
												className={cn(
													"border",
													transaction.asliCopyDigital === "Asli"
														? "border-green-200 bg-green-50 text-green-700"
														: transaction.asliCopyDigital === "Copy"
															? "border-yellow-200 bg-yellow-50 text-yellow-700"
															: "border-blue-200 bg-blue-50 text-blue-700"
												)}
											>
												{transaction.asliCopyDigital}
											</Badge>
										</TableCell>
										<TableCell>
											<Badge
												className={cn(
													"border",
													getStatusColor(transaction.status)
												)}
											>
												{transaction.status}
											</Badge>
										</TableCell>
										<TableCell>
											<div className="flex items-center justify-center gap-1">
												<Button variant="ghost" size="icon" className="h-8 w-8">
													<Eye className="h-4 w-4" />
												</Button>
												<Button variant="ghost" size="icon" className="h-8 w-8">
													<Edit className="h-4 w-4" />
												</Button>
												<Button variant="ghost" size="icon" className="h-8 w-8">
													<Trash2 className="h-4 w-4 text-red-600" />
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>

					{/* Pagination */}
					<div className="mt-4 flex items-center justify-between">
						<p className="text-sm text-[#919EAB]">
							Showing 1 to {transactionData.transactions.length} of 100 products
						</p>
						<PaginationControls />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
