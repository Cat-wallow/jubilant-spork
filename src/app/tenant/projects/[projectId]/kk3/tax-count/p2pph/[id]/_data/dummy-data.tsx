import { FileText, Users, TrendingUp, Percent } from "lucide-react";

// Overview Stats
export const overviewStats = [
	{
		icon: <FileText className="h-8 w-8 text-[#155DFC]" />,
		label: "Total Pemotongan",
		value: "Rp.120.000.000",
		subtitle: "Nilai Pajak",
	},
	{
		icon: <FileText className="h-8 w-8 text-[#155DFC]" />,
		label: "Bukti Potong",
		value: "345",
		subtitle: "dokumen",
	},
	{
		icon: <Users className="h-8 w-8 text-[#9810FA]" />,
		label: "Wajib Pajak",
		value: "89",
		subtitle: "penerima penghasilan",
	},
	{
		icon: <Percent className="h-8 w-8 text-[#00A63E]" />,
		label: "Compliance Rate",
		value: "94.2%",
		subtitle: "",
		badge: true,
	},
];

// Status Bukti Potong
export const statusBuktiPotong = [
	{
		label: "Valid",
		value: 325,
		percentage: "94.2%",
		color: "text-[#10B981]",
	},
	{
		label: "Pending Review",
		value: 15,
		percentage: "4.3%",
		color: "text-[#F59E0B]",
	},
	{
		label: "Error",
		value: 5,
		percentage: "1.4%",
		color: "text-[#EF4444]",
	},
];

// Pemotongan Berdasarkan Pasal
export const pemotonganByPasal = [
	{
		pasal: "PPh 21",
		amount: 850000000,
	},
	{
		pasal: "PPh 23",
		amount: 250000000,
	},
	{
		pasal: "PPh 25",
		amount: 50000000,
	},
	{
		pasal: "PPh 29",
		amount: 10000000,
	},
];

// Trend Pemotongan Bulanan
export const trendPemotongan = [
	{ month: "Jan", amount: 60000000 },
	{ month: "Feb", amount: 80000000 },
	{ month: "Mar", amount: 75000000 },
	{ month: "Apr", amount: 90000000 },
	{ month: "Mei", amount: 105000000 },
	{ month: "Jun", amount: 120000000 },
];

// Objek Pajak
export const objekPajak = [
	{
		name: "Jasa Profesional",
		transactions: 89,
		percentage: "2%",
		amount: "Rp 445.000.000",
		pph: "Rp 8.900.000",
	},
	{
		name: "Sewa",
		transactions: 34,
		percentage: "2%",
		amount: "Rp 180.000.000",
		pph: "Rp 3.600.000",
	},
	{
		name: "Bunga",
		transactions: 12,
		percentage: "15%",
		amount: "Rp 95.000.000",
		pph: "Rp 14.250.000",
	},
	{
		name: "Royalti",
		transactions: 8,
		percentage: "15%",
		amount: "Rp 75.000.000",
		pph: "Rp 11.250.000",
	},
	{
		name: "Hadiah & Penghargaan",
		transactions: 15,
		percentage: "15%",
		amount: "Rp 55.000.000",
		pph: "Rp 8.250.000",
	},
];

// Bottom Stats
export const bottomStats = [
	{
		icon: <FileText className="h-8 w-8 text-[#155DFC]" />,
		iconBg: "bg-[#155DFC]/10",
		label: "Rata-rata Pemotongan",
		value: "Rp 3.623.188",
		subtitle: "per bukti potong",
	},
	{
		icon: <FileText className="h-8 w-8 text-[#00A63E]" />,
		iconBg: "bg-[#00A63E]/10",
		label: "Efektif Tax Rate",
		value: "2.8%",
		subtitle: "rata-rata tertimbang",
	},
	{
		icon: <FileText className="h-8 w-8 text-[#F54900]" />,
		iconBg: "bg-[#F54900]/10",
		label: "Perlu Review",
		value: "20",
		subtitle: "bukti potong",
	},
];

// Calculation Stats (Perhitungan Pajak)
export const calculationStats = [
	{
		icon: <FileText className="h-5 w-5 text-[#155DFC]" />,
		iconBg: "bg-[#DBEAFE]",
		label: "Total Objek Pajak",
		value: "Rp 1.250.000.000",
	},
	{
		icon: <FileText className="h-5 w-5 text-[#00A63E]" />,
		iconBg: "bg-[#DCFCE7]",
		label: "Total PPh Dipotong",
		value: "Rp 189.100.000",
	},
	{
		icon: <Percent className="h-5 w-5 text-[#9810FA]" />,
		iconBg: "bg-[#F3E8FF]",
		label: "Effective Rate",
		value: "15.13%",
	},
	{
		icon: <FileText className="h-5 w-5 text-[#F54900]" />,
		iconBg: "bg-[#FFEDD4]",
		label: "Total Bukti Potong",
		value: "345",
	},
];

// PPh 21 Details
export const pph21Details = {
	pasal: "PPh 21",
	title: "Pemotongan atas penghasilan pegawai",
	objekPajak: "Rp 850.000.000",
	dpp: "Rp 850.000.000",
	tarif: "Progresif",
	pphDipotong: "Rp 127.500.000",
	jumlahBuktiPotong: "156 Bukti Potong",
	details: [
		{
			name: "Gaji Pokok",
			dpp: "Rp 620.000.000",
			tarif: "15%",
			amount: "Rp 93.000.000",
		},
		{
			name: "Tunjangan",
			dpp: "Rp 180.000.000",
			tarif: "15%",
			amount: "Rp 27.000.000",
		},
		{
			name: "Bonus",
			dpp: "Rp 50.000.000",
			tarif: "15%",
			amount: "Rp 7.500.000",
		},
	],
};

// PPh 23 Details
export const pph23Details = {
	pasal: "PPh 23",
	title: "Pemotongan atas jasa dan penggunaan harta",
	objekPajak: "Rp 320.000.000",
	dpp: "Rp 320.000.000",
	tarif: "2%/15%",
	pphDipotong: "Rp 41.600.000",
	jumlahBuktiPotong: "123",
	details: [
		{
			name: "Jasa Profesional",
			dpp: "Rp 200.000.000",
			tarif: "2%",
			amount: "Rp 4.000.000",
		},
		{
			name: "Sewa Gedung",
			dpp: "Rp 80.000.000",
			tarif: "2%",
			amount: "Rp 1.600.000",
		},
		{
			name: "Bunga Deposito",
			dpp: "Rp 40.000.000",
			tarif: "15%",
			amount: "Rp 6.000.000",
		},
	],
};

// PPh 25 Details
export const pph25Details = {
	pasal: "PPh 25",
	title: "Angsuran PPh dalam tahun berjalan",
	objekPajak: "Rp 65.000.000",
	dpp: "Rp 65.000.000",
	tarif: "Sesuai Tarif",
	pphDipotong: "Rp 16.250.000",
	jumlahBuktiPotong: "45",
	details: [
		{
			name: "Angsuran Bulanan WP Badan",
			dpp: "Rp 65.000.000",
			tarif: "25%",
			amount: "Rp 16.250.000",
		},
	],
};

// PPh 29 Details
export const pph29Details = {
	pasal: "PPh 29",
	title: "PPh kurang bayar tahun pajak sebelumnya",
	objekPajak: "Rp 15.000.000",
	dpp: "Rp 15.000.000",
	tarif: "Sesuai Perhitungan",
	pphDipotong: "Rp 3.750.000",
	jumlahBuktiPotong: "21",
	details: [
		{
			name: "Kurang Bayar 2023",
			dpp: "Rp 15.000.000",
			tarif: "25%",
			amount: "Rp 3.750.000",
		},
	],
};

export const allPphDetails = [
	pph21Details,
	pph23Details,
	pph25Details,
	pph29Details,
];
