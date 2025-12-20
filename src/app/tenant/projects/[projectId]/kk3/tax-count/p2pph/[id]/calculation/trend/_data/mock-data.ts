export interface MonthlyTrend {
  month: string;
  monthFull: string;
  pph21: number;
  pph23: number;
  pph25: number;
  pph29: number;
}

export interface Insight {
  title: string;
  description: string;
  type: 'info' | 'success' | 'warning';
}

export interface TaxRate {
  name: string;
  rate: string;
  description: string;
  badgeVariant: 'default' | 'success' | 'warning';
}

export const monthlyTrendData: MonthlyTrend[] = [
  {
    month: 'Jan',
    monthFull: 'Januari',
    pph21: 18500000,
    pph23: 7200000,
    pph25: 3100000,
    pph29: 850000,
  },
  {
    month: 'Feb',
    monthFull: 'Februari',
    pph21: 21200000,
    pph23: 7500000,
    pph25: 3250000,
    pph29: 890000,
  },
  {
    month: 'Mar',
    monthFull: 'Maret',
    pph21: 22500000,
    pph23: 7800000,
    pph25: 3400000,
    pph29: 920000,
  },
  {
    month: 'Apr',
    monthFull: 'April',
    pph21: 20100000,
    pph23: 7500000,
    pph25: 3300000,
    pph29: 880000,
  },
  {
    month: 'Mei',
    monthFull: 'Mei',
    pph21: 25800000,
    pph23: 8200000,
    pph25: 3600000,
    pph29: 950000,
  },
  {
    month: 'Jun',
    monthFull: 'Juni',
    pph21: 28900000,
    pph23: 9100000,
    pph25: 3850000,
    pph29: 1020000,
  },
];

export const insights: Insight[] = [
  {
    title: 'PPh 21 Dominan',
    description:
      'PPh 21 menyumbang 67.4% dari total pemotongan karena tingginya gaji karyawan.',
    type: 'info',
  },
  {
    title: 'Efisiensi Tarif',
    description: 'Tarif 2% pada PPh 23 memberikan kontribusi optimal untuk jasa profesional.',
    type: 'success',
  },
  {
    title: 'Review Diperlukan',
    description: 'PPh 29 meningkat 62.5% dari bulan sebelumnya, perlu analisis lebih lanjut.',
    type: 'warning',
  },
];

export const taxRates: TaxRate[] = [
  {
    name: 'PPh 21',
    rate: 'Progresif',
    description: 'Tarif progresif 5%-30% sesuai penghasilan',
    badgeVariant: 'default',
  },
  {
    name: 'PPh 23',
    rate: '2% / 15%',
    description: '2% untuk jasa, 15% untuk dividen & bunga',
    badgeVariant: 'success',
  },
  {
    name: 'PPh 25',
    rate: '25%',
    description: 'Angsuran bulanan WP Badan',
    badgeVariant: 'warning',
  },
];
