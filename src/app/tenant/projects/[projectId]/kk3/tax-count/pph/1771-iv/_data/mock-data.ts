export interface FinalTaxEntry {
  id: number;
  incomeType: string;
  incomeAmount: number | null;
  pphAmount: number | null;
}

export const bagianAData: FinalTaxEntry[] = [
  {
    id: 1,
    incomeType: "Bunga Deposito, Tabungan, Diskonto SBI, dll",
    incomeAmount: 12500000,
    pphAmount: 2500000,
  },
  {
    id: 2,
    incomeType: "Bunga Obligasi",
    incomeAmount: null,
    pphAmount: null,
  },
  {
    id: 3,
    incomeType: "Penghasilan dari transaksi saham dan sekuritas lainnya di bursa efek",
    incomeAmount: null,
    pphAmount: null,
  },
  {
    id: 4,
    incomeType: "Penghasilan dari transaksi saham dan sekuritas lainnya di luar bursa efek",
    incomeAmount: null,
    pphAmount: null,
  },
  {
    id: 5,
    incomeType: "Penghasilan dari usaha jasa konstruksi (skala kecil)",
    incomeAmount: null,
    pphAmount: null,
  },
  {
    id: 6,
    incomeType: "Penghasilan dari penjualan tanah dan/atau bangunan",
    incomeAmount: null,
    pphAmount: null,
  },
  {
    id: 7,
    incomeType: "Penghasilan dari penyewaan tanah dan/atau bangunan",
    incomeAmount: 36000000,
    pphAmount: 3600000,
  },
  {
    id: 8,
    incomeType: "Penghasilan dari usaha",
    incomeAmount: null,
    pphAmount: null,
  },
  {
    id: 9,
    incomeType: "Penghasilan UMKM dengan peredaran bruto tertentu",
    incomeAmount: null,
    pphAmount: null,
  },
  {
    id: 10,
    incomeType: "Penghasilan dari usaha yang dikelola oleh lembaga khusus",
    incomeAmount: null,
    pphAmount: null,
  },
  {
    id: 11,
    incomeType: "Penghasilan dari jasa tertentu",
    incomeAmount: null,
    pphAmount: null,
  },
  {
    id: 12,
    incomeType: "Penghasilan lain-lain selisih Rupiah",
    incomeAmount: null,
    pphAmount: null,
  },
  {
    id: 13,
    incomeType: "Penghasilan tertentu Wajib Pajak di bidang Usaha Tertentu",
    incomeAmount: null,
    pphAmount: null,
  },
];

export const getTotalBagianA = () => {
  return bagianAData.reduce(
    (acc, item) => ({
      incomeAmount: acc.incomeAmount + (item.incomeAmount || 0),
      pphAmount: acc.pphAmount + (item.pphAmount || 0),
    }),
    { incomeAmount: 0, pphAmount: 0 }
  );
};
