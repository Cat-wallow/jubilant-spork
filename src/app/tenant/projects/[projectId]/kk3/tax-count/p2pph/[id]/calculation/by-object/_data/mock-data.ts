export interface Transaction {
  id: string;
  date: string;
  vendor: string;
  voucher: string;
  type: string;
  amount: number;
  tax: number;
  taxRate: string;
  status: 'Selesai' | 'Review' | 'Pending';
  kk1Link: string;
}

export interface TaxSubCategory {
  name: string;
  transactionCount: number;
  totalAmount: number;
  totalTax: number;
  transactions: Transaction[];
}

export interface TaxCategory {
  name: string;
  pasal: string;
  taxRate: string;
  totalTax: number;
  transactionCount: number;
  totalObject: number;
  dpp: number;
  pphDipotong: number;
  subCategories?: TaxSubCategory[];
}

export const taxCategoriesData: TaxCategory[] = [
  {
    name: 'Jasa Profesional',
    pasal: 'Pasal 23 ayat (1) huruf c',
    taxRate: '2%',
    totalTax: 8900000,
    transactionCount: 89,
    totalObject: 445000000,
    dpp: 445000000,
    pphDipotong: 8900000,
    subCategories: [
      {
        name: 'Jasa Konsultasi',
        transactionCount: 45,
        totalAmount: 225000000,
        totalTax: 4500000,
        transactions: [
          {
            id: 'TRX-001',
            date: '2024-06-01',
            vendor: 'PT Konsultan Bisnis A',
            voucher: 'PV-2024-0101',
            type: 'JSA',
            amount: 25000000,
            tax: 500000,
            taxRate: '2%',
            status: 'Selesai',
            kk1Link: 'KK1 Link',
          },
          {
            id: 'TRX-002',
            date: '2024-06-03',
            vendor: 'CV Solusi Digital',
            voucher: 'PV-2024-0102',
            type: 'JSA',
            amount: 15000000,
            tax: 300000,
            taxRate: '2%',
            status: 'Selesai',
            kk1Link: 'KK1 Link',
          },
          {
            id: 'TRX-003',
            date: '2024-06-05',
            vendor: 'PT Strategic Partner',
            voucher: 'PV-2024-0103',
            type: 'JSA',
            amount: 35000000,
            tax: 700000,
            taxRate: '2%',
            status: 'Selesai',
            kk1Link: 'KK1 Link',
          },
          {
            id: 'TRX-004',
            date: '2024-06-08',
            vendor: 'KAP Audit Prima',
            voucher: 'PV-2024-0104',
            type: 'JSA',
            amount: 45000000,
            tax: 900000,
            taxRate: '2%',
            status: 'Review',
            kk1Link: 'KK1 Link',
          },
          {
            id: 'TRX-005',
            date: '2024-06-10',
            vendor: 'PT Management Consulting',
            voucher: 'PV-2024-0105',
            type: 'JSA',
            amount: 28000000,
            tax: 560000,
            taxRate: '2%',
            status: 'Selesai',
            kk1Link: 'KK1 Link',
          },
        ],
      },
      {
        name: 'Jasa Teknik',
        transactionCount: 28,
        totalAmount: 140000000,
        totalTax: 2800000,
        transactions: [],
      },
      {
        name: 'Jasa Manajemen',
        transactionCount: 16,
        totalAmount: 80000000,
        totalTax: 1600000,
        transactions: [],
      },
    ],
  },
  {
    name: 'Sewa',
    pasal: 'Pasal 23 ayat (1) huruf a',
    taxRate: '2%',
    totalTax: 3600000,
    transactionCount: 34,
    totalObject: 180000000,
    dpp: 180000000,
    pphDipotong: 3600000,
    subCategories: [
      {
        name: 'Sewa Gedung',
        transactionCount: 20,
        totalAmount: 120000000,
        totalTax: 2400000,
        transactions: [],
      },
      {
        name: 'Sewa Kendaraan',
        transactionCount: 14,
        totalAmount: 60000000,
        totalTax: 1200000,
        transactions: [
          {
            id: 'TRX-016',
            date: '2024-06-03',
            vendor: 'PT Transport Service',
            voucher: 'PV-2024-0116',
            type: 'SWA',
            amount: 15000000,
            tax: 300000,
            taxRate: '2%',
            status: 'Selesai',
            kk1Link: 'KK1 Link',
          },
          {
            id: 'TRX-017',
            date: '2024-06-05',
            vendor: 'CV Fleet Management',
            voucher: 'PV-2024-0117',
            type: 'SWA',
            amount: 22000000,
            tax: 440000,
            taxRate: '2%',
            status: 'Selesai',
            kk1Link: 'KK1 Link',
          },
          {
            id: 'TRX-018',
            date: '2024-06-08',
            vendor: 'PT Rental Mobil',
            voucher: 'PV-2024-0118',
            type: 'SWA',
            amount: 23000000,
            tax: 460000,
            taxRate: '2%',
            status: 'Pending',
            kk1Link: 'KK1 Link',
          },
        ],
      },
    ],
  },
  {
    name: 'Bunga dan Diskonto',
    pasal: 'Pasal 23 ayat (1) huruf a',
    taxRate: '15%',
    totalTax: 14250000,
    transactionCount: 12,
    totalObject: 95000000,
    dpp: 95000000,
    pphDipotong: 14250000,
    subCategories: [
      {
        name: 'Bunga Deposito',
        transactionCount: 8,
        totalAmount: 65000000,
        totalTax: 9750000,
        transactions: [
          {
            id: 'TRX-019',
            date: '2024-06-30',
            vendor: 'Bank Mandiri',
            voucher: 'PV-2024-0119',
            type: 'BNG',
            amount: 35000000,
            tax: 5250000,
            taxRate: '15%',
            status: 'Selesai',
            kk1Link: 'KK1 Link',
          },
          {
            id: 'TRX-020',
            date: '2024-06-30',
            vendor: 'Bank BCA',
            voucher: 'PV-2024-0120',
            type: 'BNG',
            amount: 30000000,
            tax: 4500000,
            taxRate: '15%',
            status: 'Selesai',
            kk1Link: 'KK1 Link',
          },
        ],
      },
      {
        name: 'Bunga Obligasi',
        transactionCount: 4,
        totalAmount: 30000000,
        totalTax: 4500000,
        transactions: [],
      },
    ],
  },
];
