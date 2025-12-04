"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Separator } from "@/components/ui/separator";
import {
	Plus,
	Trash2,
	RefreshCw,
	Check,
	AlertTriangle,
	Eye,
	FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Dummy data untuk items barang/jasa
const dummyItems = [
	{
		id: 1,
		namaItem: "Makan Bergizi",
		qty: 20,
		satuan: "Pcs",
		harga: 150000,
		mataUang: "IDR",
		kurs: 1,
		lineAmount: 3000000,
		ppn: 300000,
		p2pph: 300000,
	},
	{
		id: 2,
		namaItem: "Minum Bergizi",
		qty: 20,
		satuan: "Pcs",
		harga: 150000,
		mataUang: "IDR",
		kurs: 1,
		lineAmount: 3000000,
		ppn: 300000,
		p2pph: 300000,
	},
	{
		id: 3,
		namaItem: "Susu Bergizi",
		qty: 20,
		satuan: "Pcs",
		harga: 150000,
		mataUang: "IDR",
		kurs: 1,
		lineAmount: 3000000,
		ppn: 300000,
		p2pph: 300000,
	},
	{
		id: 4,
		namaItem: "Mangkuk Bergizi",
		qty: 20,
		satuan: "Pcs",
		harga: 150000,
		mataUang: "IDR",
		kurs: 1,
		lineAmount: 3000000,
		ppn: 300000,
		p2pph: 300000,
	},
];

// Komponen untuk section identitas dokumen
function IdentitasDokumen() {
	const identitasData = [
		{ label: "Jenis Document:", value: "Invoice" },
		{ label: "Nomor Dokumen", value: "INV-23123-2023-001" },
		{ label: "Tanggal", value: "2025-09-29" },
		{ label: "Jumlah Lembar", value: "30" },
		{ label: "Asli/Copy/Digital", value: "Asli" },
		{ label: "Jumlah Lembar", value: "30" },
	];

	return (
		<Card className="flex-1 rounded-[20px] border border-[rgba(145,158,171,0.20)] p-5">
			<CardTitle className="mb-5 font-roboto text-[22px] font-medium leading-7 text-[#2B3674]">
				Identitas Dokumen
			</CardTitle>
			<div className="flex flex-col gap-2.5">
				{identitasData.map((item, index) => (
					<div
						key={index}
						className="flex items-center justify-between text-sm leading-5 tracking-[0.25px]"
					>
						<span className="font-roboto text-[#404040]">{item.label}</span>
						<span className="font-roboto font-medium text-[#404040]">
							{item.value}
						</span>
					</div>
				))}
			</div>
		</Card>
	);
}

// Komponen untuk section informasi administrasi
function InformasiAdministrasi() {
	const adminData = [
		{ label: "Divisi:", value: "Sales" },
		{ label: "Admin PIC", value: "Admin 223" },
		{ label: "Posisi Dokumen Asli", value: "Rak 2025-09-29" },
		{ label: "Nomor Urut Sortiran dari Klien", value: "30" },
	];

	return (
		<Card className="flex-1 rounded-[20px] border border-[rgba(145,158,171,0.20)] p-5">
			<CardTitle className="mb-5 font-roboto text-[22px] font-medium leading-7 text-[#2B3674]">
				Informasi Administrasi
			</CardTitle>
			<div className="flex flex-col gap-2.5">
				{adminData.map((item, index) => (
					<div
						key={index}
						className="flex items-center justify-between text-sm leading-5 tracking-[0.25px]"
					>
						<span className="font-roboto text-[#404040]">{item.label}</span>
						<span className="font-roboto font-medium text-[#404040]">
							{item.value}
						</span>
					</div>
				))}
			</div>
		</Card>
	);
}

// Komponen untuk section informasi objek pajak
function InformasiObjekPajak() {
	return (
		<Card className="rounded-[20px] border border-[rgba(145,158,171,0.20)] p-5">
			<CardTitle className="mb-5 font-roboto text-[22px] font-medium leading-7 text-[#2B3674]">
				Informasi Objek Pajak
			</CardTitle>

			<div className="grid grid-cols-2 gap-6">
				{/* Left Column */}
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-[5px]">
						<Label className="text-base font-medium text-[#404040]">
							Jenis Transaksi
						</Label>
						<Select>
							<SelectTrigger className="h-[45px] rounded-lg border-none bg-[#F3F3F5]">
								<SelectValue placeholder="Pilih jenis transaksii" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="penjualan">Penjualan</SelectItem>
								<SelectItem value="pembelian">Pembelian</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="flex flex-col gap-[5px]">
						<Label className="text-base font-medium text-[#404040]">
							Subjek Lawan
						</Label>
						<Select>
							<SelectTrigger className="h-[45px] rounded-lg border-none bg-[#F3F3F5]">
								<SelectValue placeholder="OP/Badan" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="op">Orang Pribadi</SelectItem>
								<SelectItem value="badan">Badan</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="flex flex-col gap-[5px]">
						<Label className="text-base font-medium text-[#404040]">
							Tipe PKP
						</Label>
						<Select>
							<SelectTrigger className="h-[45px] rounded-lg border-none bg-[#F3F3F5]">
								<SelectValue placeholder="PKP/Non-PKP" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="pkp">PKP</SelectItem>
								<SelectItem value="non-pkp">Non-PKP</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* Right Column */}
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-[5px]">
						<Label className="text-base font-medium text-[#404040]">NPWP</Label>
						<Input
							placeholder="23232312312312312323"
							className="h-[45px] rounded-lg border-none bg-[#F3F3F5]"
						/>
					</div>

					<div className="flex flex-col gap-[5px]">
						<Label className="text-base font-medium text-[#404040]">
							Jenis Barang/Jasa
						</Label>
						<Input
							placeholder="Deskripsi barang/jasa"
							className="h-[45px] rounded-lg border-none bg-[#F3F3F5]"
						/>
					</div>

					<div className="flex flex-col gap-[5px]">
						<Label className="text-base font-medium text-[#404040]">
							Keterangan B/J
						</Label>
						<Textarea
							placeholder="Keterangan tambahan"
							className="min-h-[64px] rounded-lg border-none bg-[#F3F3F5]"
						/>
					</div>
				</div>
			</div>
		</Card>
	);
}

// Komponen untuk tabel barang dan jasa
function TabelBarangJasa({ items }: { items: typeof dummyItems }) {
	return (
		<Card className="rounded-[20px] border border-[rgba(145,158,171,0.20)] p-5">
			<div className="mb-5 flex items-center justify-between">
				<CardTitle className="font-roboto text-[22px] font-medium text-[#404040]">
					Jenis Barang dan/atau Jasa
				</CardTitle>
				<Button className="flex h-12 items-center gap-1 rounded-[10px] bg-[#08F] hover:bg-[#0077dd]">
					<Plus className="h-6 w-6" />
					<span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px]">
						Tambah Item
					</span>
				</Button>
			</div>

			<div className="overflow-x-auto">
				<div className="mb-2.5 flex gap-2 text-sm font-medium text-[#404040]">
					<div className="w-[150px]">Nama Item</div>
					<div className="w-[120px]">Qty</div>
					<div className="w-[120px]">Satuan</div>
					<div className="w-[120px]">Harga</div>
					<div className="w-[120px]">Mata Uang</div>
					<div className="w-[120px]">Kurs</div>
					<div className="w-[120px]">Line Amount</div>
					<div className="w-[100px]">PPN</div>
					<div className="w-[100px]">P2PPh</div>
					<div className="w-[50px]"></div>
				</div>

				<Separator className="mb-2.5" />

				{/* Items */}
				<div className="flex flex-col gap-2">
					{items.map((item) => (
						<div key={item.id} className="flex gap-2">
							<Input
								value={item.namaItem}
								className="h-[45px] w-[150px] rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
								readOnly
							/>
							<Input
								value={item.qty}
								className="h-[45px] w-[120px] rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
								readOnly
							/>
							<Input
								value={item.satuan}
								className="h-[45px] w-[120px] rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
								readOnly
							/>
							<Input
								value={item.harga}
								className="h-[45px] w-[120px] rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
								readOnly
							/>
							<Input
								value={item.mataUang}
								className="h-[45px] w-[120px] rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
								readOnly
							/>
							<Input
								value={item.kurs}
								className="h-[45px] w-[120px] rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
								readOnly
							/>
							<Input
								value={`Rp.${item.lineAmount.toLocaleString("id-ID")}`}
								className="h-[45px] w-[120px] rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
								readOnly
							/>
							<Input
								value={`Rp.${item.ppn.toLocaleString("id-ID")}`}
								className="h-[45px] w-[100px] rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
								readOnly
							/>
							<Input
								value={`Rp.${item.p2pph.toLocaleString("id-ID")}`}
								className="h-[45px] w-[100px] rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
								readOnly
							/>
							<Button variant="ghost" size="icon" className="h-[45px] w-[50px]">
								<Trash2 className="h-5 w-5 text-[#BF6A02]" />
							</Button>
						</div>
					))}
				</div>
			</div>
		</Card>
	);
}

// Komponen untuk summary perhitungan
function SummaryPerhitungan() {
	return (
		<div className="flex gap-5">
			{/* Summary Table */}
			<Card className="flex-1 rounded-[20px] border border-[rgba(145,158,171,0.20)] p-5">
				<div className="flex flex-col gap-5">
					{/* Jumlah */}
					<div className="flex items-center justify-center">
						<span className="w-[400px] font-roboto text-base font-medium text-[#3F3F3F]">
							Jumlah
						</span>
						<div className="flex flex-1 gap-2.5">
							<Input
								value="RP"
								className="h-[53px] w-[55px] rounded-lg border-none bg-[rgba(145,158,171,0.08)] text-center"
								readOnly
							/>
							<Input
								value="150.000.000"
								className="h-[53px] flex-1 rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
								readOnly
							/>
						</div>
					</div>

					{/* Tagihan Exclude Pajak */}
					<div className="flex items-center justify-center">
						<span className="w-[400px] font-roboto text-base font-medium text-[#3F3F3F]">
							Tagihan Exclude Pajak
						</span>
						<div className="flex flex-1 gap-2.5">
							<Input
								value="RP"
								className="h-[53px] w-[55px] rounded-lg border-none bg-[rgba(145,158,171,0.08)] text-center"
								readOnly
							/>
							<Input
								value="15.000.000"
								className="h-[53px] flex-1 rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
								readOnly
							/>
						</div>
					</div>

					{/* PPN */}
					<div className="flex items-center justify-center">
						<span className="w-[400px] font-roboto text-base font-medium text-[#3F3F3F]">
							PPN
						</span>
						<div className="flex flex-1 gap-2.5">
							<Input
								value="11%"
								className="h-[53px] w-[55px] rounded-lg border-none bg-[rgba(145,158,171,0.08)] text-center"
								readOnly
							/>
							<Input
								value="RP"
								className="h-[53px] w-[55px] rounded-lg border-none bg-[rgba(145,158,171,0.08)] text-center"
								readOnly
							/>
							<Input
								value="150.000.000"
								className="h-[53px] flex-1 rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
								readOnly
							/>
						</div>
					</div>

					{/* P2PPh */}
					<div className="flex items-center justify-center">
						<span className="w-[400px] font-roboto text-base font-medium text-[#3F3F3F]">
							P2PPh
						</span>
						<div className="flex flex-1 gap-2.5">
							<Input
								value="6.0%"
								className="h-[53px] w-[55px] rounded-lg border-none bg-[rgba(145,158,171,0.08)] text-center"
								readOnly
							/>
							<Input
								value="RP"
								className="h-[53px] w-[55px] rounded-lg border-none bg-[rgba(145,158,171,0.08)] text-center"
								readOnly
							/>
							<Input
								value="150.000.000"
								className="h-[53px] flex-1 rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
								readOnly
							/>
						</div>
					</div>
				</div>
			</Card>

			{/* Kontrol Matematis */}
			<Card className="w-[400px] rounded-[20px] border border-[rgba(145,158,171,0.20)] p-5">
				<h3 className="mb-4 font-roboto text-base font-medium text-[#404040]">
					Kontrol Matematis
				</h3>
				<div className="flex flex-col gap-2 text-sm">
					<div className="flex justify-between">
						<span className="text-[#404040]">Kontrol</span>
						<span className="font-medium">348.000</span>
					</div>
					<div className="flex justify-between">
						<span className="text-[#404040]">Kurs</span>
						<span className="font-medium">16.200</span>
					</div>
					<div className="flex justify-between">
						<span className="text-[#404040]">Total PPN</span>
						<span className="font-medium">16.200</span>
					</div>
					<div className="flex justify-between border-t border-[rgba(145,158,171,0.20)] pt-2">
						<span className="font-medium">Total</span>
						<span className="font-medium">380.400</span>
					</div>
				</div>
				<div className="mt-4 flex items-center gap-2 rounded-lg bg-[#DCFCE7] p-2">
					<Check className="h-4 w-4 text-[#016630]" />
					<span className="text-xs text-[#016630]">
						Cocok = PPN +PPh + Kondisi
					</span>
				</div>
			</Card>
		</div>
	);
}

// Komponen untuk additional fields
function AdditionalFields() {
	return (
		<div className="flex gap-5">
			{/* P2Ph Lainnya */}
			<div className="flex flex-1 flex-col gap-2">
				<Label className="font-roboto text-base font-medium text-[#3F3F3F]">
					P2Ph Lainnya (KK-1.7.7)
				</Label>
				<div className="flex gap-2.5">
					<Input
						value="0.0%"
						className="h-[53px] w-[55px] rounded-lg border-none bg-[rgba(145,158,171,0.08)] text-center"
						readOnly
					/>
					<Input
						value="RP"
						className="h-[53px] w-[55px] rounded-lg border-none bg-[rgba(145,158,171,0.08)] text-center"
						readOnly
					/>
					<Input
						placeholder="-"
						className="h-[53px] flex-1 rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
					/>
				</div>
			</div>

			{/* Piutang/Kredit PPh */}
			<div className="flex flex-1 flex-col gap-2">
				<Label className="font-roboto text-base font-medium text-[#3F3F3F]">
					Piutang/Kredit PPh dipot/put pihak lain (KK-1.7.6)
				</Label>
				<div className="flex gap-2.5">
					<Input
						value="RP"
						className="h-[53px] w-[55px] rounded-lg border-none bg-[rgba(145,158,171,0.08)] text-center"
						readOnly
					/>
					<Input
						value="150.000.000"
						className="h-[53px] flex-1 rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
						readOnly
					/>
				</div>
			</div>
		</div>
	);
}

// Komponen untuk vouching checklist
function VouchingChecklist() {
	const checklistItems = [
		{ label: "Match Number", status: "ok" },
		{ label: "Match Date", status: "ok" },
		{ label: "Match Partner", status: "warning" },
		{ label: "Match Amount", status: "ok" },
	];

	return (
		<Card className="rounded-[20px] border border-[rgba(145,158,171,0.20)] p-5">
			<div className="mb-5 flex items-start justify-between">
				<CardTitle className="font-roboto text-[22px] font-medium text-[#404040]">
					Vouching Checklist
				</CardTitle>
				<Button className="flex h-12 items-center gap-2 rounded-[10px] bg-[#08F] hover:bg-[#0077dd]">
					<RefreshCw className="h-5 w-5" />
					<span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px]">
						Run Vouching
					</span>
				</Button>
			</div>

			<div className="grid grid-cols-2 gap-6">
				{/* Checklist Items */}
				<div className="flex flex-col gap-4">
					{checklistItems.map((item, index) => (
						<div
							key={index}
							className="flex items-center justify-between rounded-[10px] border border-[rgba(0,0,0,0.10)] px-3 py-3"
						>
							<span className="font-arial text-base text-[#0A0A0A]">
								{item.label}
							</span>
							<div className="flex items-center gap-2">
								{item.status === "ok" ? (
									<>
										<Check className="h-4 w-4 text-[#00C950]" />
										<Badge className="border-none bg-[#DCFCE7] text-[#016630]">
											OK
										</Badge>
									</>
								) : (
									<>
										<AlertTriangle className="h-4 w-4 text-[#F0B100]" />
										<Badge className="border-none bg-[#FEF9C2] text-[#894B00]">
											WARNING
										</Badge>
									</>
								)}
							</div>
						</div>
					))}
				</div>

				{/* Vouching Notes */}
				<div className="flex flex-col gap-2.5">
					<Label className="font-arial text-sm text-[#0A0A0A]">
						Vouching Notes
					</Label>
					<Textarea
						placeholder="Catatan hasil vouching..."
						className="min-h-[150px] rounded-lg border-none bg-[#F3F3F5]"
					/>

					{/* Warning Box */}
					<div className="flex flex-col gap-3 rounded-[10px] border border-[#FFF085] bg-[#FEFCE8] p-4">
						<div className="flex items-start gap-3">
							<AlertTriangle className="h-4 w-4 flex-shrink-0 text-[#D08700]" />
							<div className="flex flex-col">
								<span className="font-arial text-base text-[#733E0A]">
									Warning
								</span>
								<span className="font-arial text-sm text-[#A65F00]">
									Partner name slightly different: "PT ABC Corp" vs "PT. ABC
									Corporation"
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
}

// Komponen untuk simulasi voucher
function SimulasiVoucher() {
	const voucherLines = [
		{
			line: 1,
			accountNo: "1201",
			accountName: "Piutang Dagang",
			debit: "-",
			credit: "-",
			description: "Piutang sales PT. ABC Corp",
		},
		{
			line: 2,
			accountNo: "4102",
			accountName: "Penjualan Service",
			debit: "-",
			credit: "-",
			description: "Sales PT. ABC Corp",
		},
	];

	return (
		<Card className="rounded-[14px] border border-[rgba(0,0,0,0.10)] p-5">
			<div className="mb-5 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<FileText className="h-5 w-5 text-[#2B7FFF]" />
					<span className="font-arial text-base text-[#0A0A0A]">
						Simulasi Voucher Yang Akan Dibuat
					</span>
				</div>
				<Badge className="border border-[#FFD6A7] bg-transparent text-[#F54900]">
					Review Required
				</Badge>
			</div>

			{/* Voucher Details */}
			<div className="mb-5 flex items-center justify-between rounded-[10px] bg-[rgba(236,236,240,0.30)] p-4">
				<div className="flex flex-col">
					<span className="text-xs text-[#717182]">Voucher Type</span>
					<span className="text-base text-[#0A0A0A]">RJV</span>
				</div>
				<div className="flex flex-col">
					<span className="text-xs text-[#717182]">Voucher No</span>
					<span className="text-base text-[#0A0A0A]">RJV-2025-184</span>
				</div>
				<div className="flex flex-col">
					<span className="text-xs text-[#717182]">Date</span>
					<span className="text-base text-[#0A0A0A]">2024-03-15</span>
				</div>
				<div className="flex flex-col">
					<span className="text-xs text-[#717182]">Status</span>
					<Badge className="border border-[#FFD6A7] bg-transparent text-[#F54900]">
						Draft Preview
					</Badge>
				</div>
			</div>

			{/* Narration */}
			<div className="mb-4 rounded-[10px] bg-[#EFF6FF] p-3">
				<span className="text-xs text-[#717182]">Narration</span>
				<p className="text-sm text-[#0A0A0A]">
					Pengakuan sales kepada PT. ABC Corp sesuai
				</p>
			</div>

			{/* Voucher Table */}
			<div className="overflow-hidden rounded-[10px] border border-[rgba(0,0,0,0.10)]">
				<Table>
					<TableHeader>
						<TableRow className="border-b border-[rgba(0,0,0,0.10)]">
							<TableHead className="text-[#0A0A0A]">Line</TableHead>
							<TableHead className="text-[#0A0A0A]">Account No</TableHead>
							<TableHead className="text-[#0A0A0A]">Account Name</TableHead>
							<TableHead className="text-right text-[#0A0A0A]">Debit</TableHead>
							<TableHead className="text-right text-[#0A0A0A]">
								Credit
							</TableHead>
							<TableHead className="text-[#0A0A0A]">Description</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{voucherLines.map((line) => (
							<TableRow
								key={line.line}
								className="border-b border-[rgba(0,0,0,0.10)]"
							>
								<TableCell className="text-center">{line.line}</TableCell>
								<TableCell className="font-mono">{line.accountNo}</TableCell>
								<TableCell>{line.accountName}</TableCell>
								<TableCell className="text-right font-mono">
									{line.debit}
								</TableCell>
								<TableCell className="text-right font-mono">
									{line.credit}
								</TableCell>
								<TableCell className="text-[#717182]">
									{line.description}
								</TableCell>
							</TableRow>
						))}
						<TableRow className="bg-[rgba(236,236,240,0.20)]">
							<TableCell colSpan={3} className="text-right font-medium">
								TOTAL
							</TableCell>
							<TableCell className="text-right font-mono font-medium">
								0
							</TableCell>
							<TableCell className="text-right font-mono font-medium">
								0
							</TableCell>
							<TableCell>
								<Badge className="border-none bg-[#DCFCE7] text-[#016630]">
									<Check className="mr-1 h-3 w-3" />
									Balanced
								</Badge>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>

			{/* Footer */}
			<div className="mt-4 flex items-center justify-between border-t border-[rgba(0,0,0,0.10)] pt-4">
				<span className="text-sm text-[#717182]">
					Voucher akan dibuat otomatis setelah transaksi disetujui
				</span>
				<Button variant="outline" className="flex items-center gap-2">
					<Eye className="h-4 w-4" />
					<span>Preview Detail</span>
				</Button>
			</div>
		</Card>
	);
}

export default function KK1AddPage() {
	const params = useParams();
	const router = useRouter();
	const projectId = params.id as string;
	const [isPublished, setIsPublished] = useState(false);

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
				<div className="flex items-center gap-2">
					<span className="text-sm font-medium text-[#404040]">Aktifkan</span>
					<button
						onClick={() => setIsPublished(!isPublished)}
						className={cn(
							"relative h-6 w-11 rounded-full transition-colors",
							isPublished ? "bg-[#08F]" : "bg-[#E2E8F0]",
						)}
					>
						<div
							className={cn(
								"absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
								isPublished ? "left-5" : "left-0.5",
							)}
						/>
					</button>
				</div>
			</div>

			{/* Main Form */}
			<Card className="rounded-[20px] border border-[rgba(145,158,171,0.20)] p-5">
				<div className="flex flex-col gap-[30px]">
					{/* Identitas Dokumen & Informasi Administrasi */}
					<div className="flex gap-[30px]">
						<IdentitasDokumen />
						<InformasiAdministrasi />
					</div>

					{/* Informasi Objek Pajak */}
					<InformasiObjekPajak />

					{/* Tabel Barang Jasa */}
					<TabelBarangJasa items={dummyItems} />

					<Separator />

					{/* Summary Perhitungan */}
					<SummaryPerhitungan />

					{/* Additional Fields */}
					<AdditionalFields />

					{/* Catatan */}
					<div className="flex flex-col gap-2">
						<Label className="font-roboto text-base font-medium text-[#3F3F3F]">
							Catatan *
						</Label>
						<Textarea
							placeholder="Deskripsi catatan"
							className="min-h-[100px] rounded-lg border border-[rgba(145,158,171,0.20)]"
						/>
					</div>
				</div>
			</Card>

			{/* Vouching Checklist */}
			<VouchingChecklist />

			{/* Simulasi Voucher */}
			<SimulasiVoucher />

			{/* Action Buttons */}
			<div className="flex justify-end gap-3">
				<Button
					variant="outline"
					onClick={() => router.back()}
					className="h-12 px-6"
				>
					Cancel
				</Button>
				<Button className="h-12 bg-[#08F] px-6 hover:bg-[#0077dd]">
					Save Transaction
				</Button>
			</div>
		</div>
	);
}
