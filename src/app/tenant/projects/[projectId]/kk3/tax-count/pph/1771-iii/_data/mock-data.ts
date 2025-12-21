export interface TaxCreditEntry {
  id: number;
  name: string;
  npwp: string;
  incomeType: string;
  incomeCode: number;
  pphAmount: number;
  subtotal?: number;
}

export const taxCreditData: TaxCreditEntry[] = [
  {
    id: 1,
    name: "PT MITRA BISNIS INDONESIA",
    npwp: "01.234.567.8-901.001",
    incomeType: "Jasa Konsultasi",
    incomeCode: 7,
    pphAmount: 850000,
  },
  {
    id: 2,
    name: "PT GLOBAL TECHNOLOGY",
    npwp: "02.345.678.9-012.000",
    incomeType: "Jasa Teknik",
    incomeCode: 7,
    pphAmount: 1200000,
  },
  {
    id: 3,
    name: "CV MEDIA KREATIF",
    npwp: "03.456.789.0-123.000",
    incomeType: "Jasa Periklanan",
    incomeCode: 15,
    pphAmount: 300000,
  },
  {
    id: 4,
    name: "PT LOGISTIK NUSANTARA",
    npwp: "04.567.890.1-234.000",
    incomeType: "Jasa Angkutan",
    incomeCode: 15,
    pphAmount: 500000,
  },
];

export interface RecapitulationItem {
  code: number;
  title: string;
  description: string;
  amount: number;
  bgColor: string;
}

export const recapitulationData: RecapitulationItem[] = [
  {
    code: 7,
    title: "Kode 7 - Jasa Konsultasi & Teknik",
    description: "2 Pemotong pajak",
    amount: 2050000,
    bgColor: "bg-blue-50",
  },
  {
    code: 15,
    title: "Kode 15 - Jasa Lainnya",
    description: "2 Pemotong pajak",
    amount: 800000,
    bgColor: "bg-green-50",
  },
  {
    code: 0,
    title: "Total Kredit Pajak",
    description: "4 Pemotong pajak",
    amount: 2850000,
    bgColor: "bg-orange-50",
  },
];

export interface DataSourceItem {
  icon: string;
  title: string;
  subtitle: string;
  color: string;
  bgColor: string;
}

export const dataSourceIntegration: DataSourceItem[] = [
  {
    icon: "database",
    title: "Auto-imported",
    subtitle: "From Bukti Potong",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: "check",
    title: "Validation Status",
    subtitle: "Verified",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: "shield",
    title: "Tax Compliance",
    subtitle: "Complete",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
];

export const getSubtotalByCode = (code: number): number => {
  return taxCreditData
    .filter((item) => item.incomeCode === code)
    .reduce((sum, item) => sum + item.pphAmount, 0);
};

export const getTotalAmount = (): number => {
  return taxCreditData.reduce((sum, item) => sum + item.pphAmount, 0);
};
