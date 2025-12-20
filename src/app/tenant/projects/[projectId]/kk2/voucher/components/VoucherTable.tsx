"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
	Filter,
	MoreHorizontal,
	RefreshCw,
	Link2,
	Paperclip,
} from "lucide-react";

const vouchers = [
	{
		id: "1",
		type: "MJV",
		typeColor: "text-[#6E11B0]",
		typeBg: "bg-[#F3E8FF]",
		number: "MJV-20240120-001",
		vcNumber: "VC-20240120-001",
		date: "20/1/2024",
		narration: "Penyesuaian selisih kurs USD transaksi supplier",
		category: "Penyesuaian",
		status: "Draft",
		statusBg: "bg-primary",
		statusColor: "",
		status2: "Unbalanced",
		status2Bg: "bg-[#EF4444]",
		status2Color: "text-white",
		totalDr: "Rp 110.000.000",
		totalCr: "Rp 10.000.000",
		difference: "Rp 10.000.000",
		differenceBg: "bg-[#EF4444]",
		differenceColor: "text-white",
		kk1Link: true,
		attachments: 1,
	},
	{
		id: "2",
		type: "RJV",
		typeColor: "text-[#016630]",
		typeBg: "bg-[#DCFCE7]",
		number: "RJV-20240118-001",
		vcNumber: "VC-20240118-001",
		date: "18/1/2024",
		narration:
			"Pengakuan penjualan termin service & spareparts PT XYZ Client sesuai INV-2024-002, PPh 23 dipungut",
		category: "",
		status: "Ready",
		statusBg: "bg-[#10B981]",
		statusColor: "text-white",
		status2: null,
		status2Bg: "",
		status2Color: "",
		totalDr: "Rp 110.000.000",
		totalCr: "Rp 110.000.000",
		difference: "Balanced",
		differenceBg: "bg-primary",
		differenceColor: "",
		kk1Link: true,
		attachments: 2,
	},
	{
		id: "3",
		type: "MJV",
		typeColor: "text-[#6E11B0]",
		typeBg: "bg-[#F3E8FF]",
		number: "MJV-20240115-001",
		vcNumber: "VC-20240115-002",
		date: "15/1/2024",
		narration:
			"Reclass PPN dipungut bendaharawan - PT ABC Corporation INV-2024-001",
		category: "",
		status: "Posted",
		statusBg: "bg-card",
		statusColor: "",
		status2: null,
		status2Bg: "",
		status2Color: "",
		totalDr: "Rp 5.500.000",
		totalCr: "Rp 5.500.000",
		difference: "Balanced",
		differenceBg: "bg-primary",
		differenceColor: "",
		kk1Link: true,
		attachments: 1,
	},
	{
		id: "4",
		type: "BRV",
		typeColor: "text-primary",
		typeBg: "bg-[#DBEAFE]",
		number: "BRV-20240115-001",
		vcNumber: "VC-20240115-001",
		date: "15/1/2024",
		narration:
			"Penerimaan DP penjualan service PT ABC Corporation sesuai INV-2024-001, PPN dipungut bendaharawan",
		category: "",
		status: "Posted",
		statusBg: "bg-card",
		statusColor: "",
		status2: null,
		status2Bg: "",
		status2Color: "",
		totalDr: "Rp 55.000.000",
		totalCr: "Rp 55.000.000",
		difference: "Balanced",
		differenceBg: "bg-primary",
		differenceColor: "",
		kk1Link: true,
		attachments: 2,
	},
];

export function VoucherTable() {
	return (
		<div className="flex flex-col gap-5 bg-card p-6 rounded-[20px]">
			<div className="flex flex-col gap-5">
				<div className="flex items-start justify-between">
					<div className="flex flex-col">
						<h2 className="text-2xl font-bold leading-8 tracking-[-0.48px] text-primary">
							Voucher List
						</h2>
						<p className="text-xs leading-4 tracking-[0.4px] text-primary">
							Daftar list voucher di dalam project
						</p>
					</div>
					<Button className="h-12 gap-1 rounded-[10px] bg-primary hover:bg-[#241963]">
						<RefreshCw className="h-5 w-5" />
						Synchronize
					</Button>
				</div>

				<div className="flex items-center gap-5">
					<Button
						variant="outline"
						className="h-[54px] gap-1 rounded-[10px] border "
					>
						20
						<svg
							width="12"
							height="12"
							viewBox="0 0 12 12"
							fill="none"
							className="h-6 w-3"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M5.64401 7.58594L1.81568 3.75761L2.68901 2.88427L5.99901 6.19427L9.30901 2.88427L10.1823 3.75761L6.35401 7.58594C6.25704 7.68284 6.12723 7.73765 5.99901 7.73765C5.87079 7.73765 5.74098 7.68284 5.64401 7.58594Z"
								fill="#332687"
							/>
						</svg>
					</Button>

					<div className="flex h-[54px] flex-1 items-center gap-[15px] rounded-[10px] border  px-4">
						<Search className="h-5 w-5 text-muted-foreground" />
						<Input
							placeholder="Cari dokumen"
							className="h-full border-0 text-base text-muted-foreground focus-visible:ring-0"
						/>
					</div>

					<div className="flex items-center gap-2.5">
						<Button
							variant="outline"
							className="h-[54px] gap-1 rounded-[10px] border "
						>
							All Status
							<svg
								width="12"
								height="12"
								viewBox="0 0 12 12"
								fill="none"
								className="h-6 w-3"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M5.64401 7.58594L1.81568 3.75761L2.68901 2.88427L5.99901 6.19427L9.30901 2.88427L10.1823 3.75761L6.35401 7.58594C6.25704 7.68284 6.12723 7.73765 5.99901 7.73765C5.87079 7.73765 5.74098 7.68284 5.64401 7.58594Z"
									fill="#332687"
								/>
							</svg>
						</Button>
						<Button
							variant="outline"
							className="h-[54px] gap-1 rounded-[10px] border "
						>
							All Type
							<svg
								width="12"
								height="12"
								viewBox="0 0 12 12"
								fill="none"
								className="h-6 w-3"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M5.64401 7.58594L1.81568 3.75761L2.68901 2.88427L5.99901 6.19427L9.30901 2.88427L10.1823 3.75761L6.35401 7.58594C6.25704 7.68284 6.12723 7.73765 5.99901 7.73765C5.87079 7.73765 5.74098 7.68284 5.64401 7.58594Z"
									fill="#332687"
								/>
							</svg>
						</Button>
						<Button
							variant="outline"
							className="h-[54px] gap-1 rounded-[10px] border "
						>
							<Filter className="h-[18px] w-[18px]" />
							Filter
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

			<Card className="rounded-[10.5px]">
				<Table>
					<TableHeader>
						<TableRow className="border-b-[0.8px] border-[rgba(0,0,0,0.15)]">
							<TableHead className="h-[35px] w-[42px]">
								<Checkbox className="h-3.5 w-3.5" />
							</TableHead>
							<TableHead className="text-xs font-medium ">Type</TableHead>
							<TableHead className="text-xs font-medium ">
								No. Voucher
							</TableHead>
							<TableHead className="text-xs font-medium ">Tanggal</TableHead>
							<TableHead className="w-[380px] text-xs font-medium ">
								Narasi
							</TableHead>
							<TableHead className="w-[178px] text-xs font-medium ">
								Status
							</TableHead>
							<TableHead className="text-right text-xs font-medium ">
								Total Dr
							</TableHead>
							<TableHead className="text-right text-xs font-medium ">
								Total Cr
							</TableHead>
							<TableHead className="text-right text-xs font-medium ">
								Selisih
							</TableHead>
							<TableHead className="text-xs font-medium ">Link KK1</TableHead>
							<TableHead className="text-xs font-medium ">Attach</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{vouchers.map((voucher) => (
							<TableRow key={voucher.id}>
								<TableCell className="h-[55px]">
									<Checkbox className="h-3.5 w-3.5" />
								</TableCell>
								<TableCell>
									<Badge
										className={`${voucher.typeBg} ${voucher.typeColor} gap-2 border-0 px-2`}
									>
										{voucher.type}
									</Badge>
								</TableCell>
								<TableCell>
									<div className="flex flex-col gap-0.5">
										<div className="text-xs font-medium ">{voucher.number}</div>
										<div className="text-[11px] font-medium text-[#64748B]">
											{voucher.vcNumber}
										</div>
									</div>
								</TableCell>
								<TableCell className="text-xs ">{voucher.date}</TableCell>
								<TableCell>
									<div className="flex flex-col gap-0.5">
										<div className="text-xs ">{voucher.narration}</div>
										{voucher.category && (
											<Badge
												variant="outline"
												className="w-fit border-[0.8px] text-[11px]"
											>
												{voucher.category}
											</Badge>
										)}
									</div>
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-2">
										<Badge
											className={`${voucher.statusBg} ${voucher.statusColor} text-nowrap border-[0.8px] border-[rgba(0,0,0,0.15)]`}
										>
											{voucher.status}
										</Badge>
										{voucher.status2 && (
											<Badge
												className={`${voucher.status2Bg} ${voucher.status2Color} border-0`}
											>
												{voucher.status2}
											</Badge>
										)}
									</div>
								</TableCell>
								<TableCell className="text-right text-xs font-medium ">
									{voucher.totalDr}
								</TableCell>
								<TableCell className="text-right text-xs font-medium ">
									{voucher.totalCr}
								</TableCell>
								<TableCell className="text-right">
									<Badge
										className={`${voucher.differenceBg} ${voucher.differenceColor} text-nowrap border-[0.8px] border-[rgba(0,0,0,0.15)]`}
									>
										{voucher.difference}
									</Badge>
								</TableCell>
								<TableCell>
									{voucher.kk1Link && (
										<Button
											variant="ghost"
											size="sm"
											className="h-7 gap-1 rounded-[5px]"
										>
											<Link2 className="h-3.5 w-3.5" />
											KK1
										</Button>
									)}
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-1">
										<Paperclip className="h-3.5 w-3.5 text-[#64748B]" />
										<span className="text-xs ">{voucher.attachments}</span>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Card>

			<div className="flex items-center justify-between">
				<div className="text-sm leading-[21px] tracking-[0.07px] text-[#737373]">
					Showing 1-10 of 100 products
				</div>
				<div className="flex items-center gap-2">
					<Button variant="ghost" className="h-9 gap-2 rounded-lg px-4">
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						className="h-9 w-[34px] rounded-lg border shadow-sm"
					>
						1
					</Button>
					<Button variant="ghost" size="sm" className="h-9 w-[34px] rounded-lg">
						2
					</Button>
					<Button variant="ghost" size="sm" className="h-9 w-[34px] rounded-lg">
						3
					</Button>
					<Button variant="ghost" size="sm" className="h-9 w-[34px] rounded-lg">
						4
					</Button>
					<Button variant="ghost" size="sm" className="h-9 w-[34px] rounded-lg">
						...
					</Button>
					<Button variant="ghost" size="sm" className="h-9 w-[34px] rounded-lg">
						10
					</Button>
					<Button variant="ghost" className="h-9 gap-2 rounded-lg px-4">
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
