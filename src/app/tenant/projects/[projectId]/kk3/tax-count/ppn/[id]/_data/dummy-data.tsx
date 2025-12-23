import {
	TrendingUp,
	TrendingDown,
	Globe,
	Calculator,
	FileText,
	Check,
} from "lucide-react";

// Overview Stats
export const overviewStats = [
	{
		icon: <TrendingUp className="h-4 w-4 text-[#00A63E]" />,
		label: "PPN Keluaran",
		value: "Rp 11.550.000",
		subtitle: "3 transaksi",
		valueColor: "text-[#00A63E]",
	},
	{
		icon: <TrendingDown className="h-4 w-4 text-[#155DFC]" />,
		label: "PPN Masukan",
		value: "Rp 6.050.000",
		subtitle: "3 transaksi",
		valueColor: "text-[#155DFC]",
	},
	{
		icon: <Globe className="h-4 w-4 text-[#9810FA]" />,
		label: "PPN Impor",
		value: "Rp 3.300.000",
		subtitle: "1 dokumen",
		valueColor: "text-[#9810FA]",
	},
	{
		icon: <Calculator className="h-4 w-4 text-[#4A5565]" />,
		label: "Net PPN",
		value: "Rp 2.200.000",
		subtitle: "Kurang Bayar",
		valueColor: "text-[#E7000B]",
	},
];

// Transaction Stats
export const transactionStats = overviewStats;

// Journal Stats
export const journalStats = [
	{
		icon: <FileText className="h-4 w-4 text-[#155DFC]" />,
		label: "Total Jurnal",
		value: "2",
		subtitle: "2 auto-generated",
		valueColor: "",
	},
	{
		icon: <TrendingUp className="h-4 w-4 text-[#00A63E]" />,
		label: "Total Debit",
		value: "Rp 77.700.000",
		valueColor: "text-[#00A63E]",
	},
	{
		icon: <TrendingDown className="h-4 w-4 text-[#E7000B]" />,
		label: "Total Kredit",
		value: "Rp 77.700.000",
		valueColor: "text-[#E7000B]",
	},
	{
		icon: <Check className="h-4 w-4 text-[#9810FA]" />,
		label: "Balance",
		value: "Balanced",
		subtitle: "Perfect",
		valueColor: "text-[#9810FA]",
	},
];

// Transactions
export const transactions = [
	{
		no: 1,
		date: "15 Mar 2024",
		documentNumber: "PEB-EXP-001/III/2024",
		counterparty: {
			name: "DIGITAL SOLUTIONS MALAYSIA SDN BHD",
		},
		type: "",
		dpp: "Rp 50.000.000",
		ppn: "Rp 0",
		category: {
			type: "keluaran" as const,
			label: "Ekspor",
			icon: <Globe className="h-4 w-4 text-[#F54900]" />,
		},
	},
	{
		no: 2,
		date: "12 Mar 2024",
		documentNumber: "010-9999000003",
		counterparty: {
			name: "PT LOGISTIK NUSANTARA",
			npwp: "33.444.555.6-777.000",
		},
		type: "Pembelian Jasa",
		dpp: "Rp 12.000.000",
		ppn: "Rp 1.320.000",
		category: {
			type: "masukan" as const,
			label: "Masukan",
			icon: <TrendingDown className="h-4 w-4 text-[#155DFC]" />,
		},
	},
	{
		no: 3,
		date: "10 Mar 2024",
		documentNumber: "PIB-001234567890",
		counterparty: {
			name: "PT CONTOH PERUSAHAAN TEKNOLOGI",
			npwp: "12.345.678.9-012.345",
		},
		type: "",
		dpp: "Rp 30.000.000",
		ppn: "Rp 3.300.000",
		category: {
			type: "impor" as const,
			label: "Impor",
			icon: <Globe className="h-4 w-4 text-[#9810FA]" />,
		},
	},
	{
		no: 4,
		date: "8 Mar 2024",
		documentNumber: "010-0000000003",
		counterparty: {
			name: "PT TEKNOLOGI DIGITAL INDONESIA",
			npwp: "76.543.210.9-876.000",
		},
		type: "Penjualan Software",
		dpp: "Rp 28.000.000",
		ppn: "Rp 3.080.000",
		category: {
			type: "keluaran" as const,
			label: "Keluaran",
			icon: <TrendingUp className="h-4 w-4 text-[#00A63E]" />,
		},
	},
	{
		no: 5,
		date: "7 Mar 2024",
		documentNumber: "010-9999000002",
		counterparty: {
			name: "CV BAHAN TEKNOLOGI JAYA",
			npwp: "22.333.444.5-666.000",
		},
		type: "Pembelian Komponen",
		dpp: "Rp 18.000.000",
		ppn: "Rp 1.980.000",
		category: {
			type: "masukan" as const,
			label: "Masukan",
			icon: <TrendingDown className="h-4 w-4 text-[#155DFC]" />,
		},
	},
	{
		no: 6,
		date: "5 Mar 2024",
		documentNumber: "010-0000000002",
		counterparty: {
			name: "CV SUKSES MANDIRI",
			npwp: "87.654.321.0-987.000",
		},
		type: "Penjualan Jasa",
		dpp: "Rp 32.000.000",
		ppn: "Rp 3.520.000",
		category: {
			type: "keluaran" as const,
			label: "Keluaran",
			icon: <TrendingUp className="h-4 w-4 text-[#00A63E]" />,
		},
	},
	{
		no: 7,
		date: "3 Mar 2024",
		documentNumber: "010-9999000001",
		counterparty: {
			name: "PT SUPPLIER TEKNOLOGI UTAMA",
			npwp: "11.222.333.4-555.000",
		},
		type: "Pembelian Barang",
		dpp: "Rp 25.000.000",
		ppn: "Rp 2.750.000",
		category: {
			type: "masukan" as const,
			label: "Masukan",
			icon: <TrendingDown className="h-4 w-4 text-[#155DFC]" />,
		},
	},
	{
		no: 8,
		date: "1 Mar 2024",
		documentNumber: "010-0000000001",
		counterparty: {
			name: "PT MITRA DISTRIBUSI TEKNOLOGI",
			npwp: "98.765.432.1-098.000",
		},
		type: "Penjualan Barang",
		dpp: "Rp 45.000.000",
		ppn: "Rp 4.950.000",
		category: {
			type: "keluaran" as const,
			label: "Keluaran",
			icon: <TrendingUp className="h-4 w-4 text-[#00A63E]" />,
		},
	},
];

// Journal Vouchers
export const journalVouchers = [
	{
		voucherNumber: "VCR-001/III/2024",
		badges: [
			{ label: "auto", variant: "dark" as const },
			{ label: "KK1", variant: "light" as const },
		],
		date: "1 Mar 2024",
		description: "Jurnal penjualan - INV-001/III/2024",
		linkedTo: "TRX-2024-001",
		totalAmount: "Rp 49.950.000",
		status: "Debit = Kredit",
		entries: [
			{
				accountCode: "1120",
				accountName: "Piutang Usaha",
				debit: "Rp 49.950.000",
				credit: "-",
			},
			{
				accountCode: "4110",
				accountName: "Pendapatan Penjualan",
				debit: "-",
				credit: "Rp 45.000.000",
			},
			{
				accountCode: "2210",
				accountName: "PPN Keluaran",
				debit: "-",
				credit: "Rp 4.950.000",
			},
			{
				accountCode: "",
				accountName: "Total",
				debit: "Rp 49.950.000",
				credit: "Rp 49.950.000",
			},
		],
	},
	{
		voucherNumber: "VCR-002/III/2024",
		badges: [
			{ label: "auto", variant: "dark" as const },
			{ label: "KK1", variant: "light" as const },
		],
		date: "5 Mar 2024",
		description: "Jurnal pembelian - PUR-001/III/2024",
		linkedTo: "TRX-2024-002",
		totalAmount: "Rp 27.750.000",
		status: "Debit = Kredit",
		entries: [
			{
				accountCode: "1410",
				accountName: "Persediaan Bahan Baku",
				debit: "Rp 25.000.000",
				credit: "-",
			},
			{
				accountCode: "1170",
				accountName: "PPN Masukan",
				debit: "Rp 2.750.000",
				credit: "-",
			},
			{
				accountCode: "2110",
				accountName: "Hutang Usaha",
				debit: "-",
				credit: "Rp 27.750.000",
			},
			{
				accountCode: "",
				accountName: "Total",
				debit: "Rp 27.750.000",
				credit: "Rp 27.750.000",
			},
		],
	},
];
