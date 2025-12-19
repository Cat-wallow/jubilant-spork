export interface JournalEntry {
  id: string;
  number: string;
  date: string;
  description: string;
  amount: number;
  status: 'draft' | 'posted';
}

export interface JournalLine {
  accountCode: string;
  accountName: string;
  accountCategory: string;
  debit: number;
  credit: number;
  description: string;
}

export interface JournalDetail {
  id: string;
  number: string;
  date: string;
  description: string;
  status: 'draft' | 'posted';
  createdBy: string;
  reference: string;
  totalDebit: number;
  totalCredit: number;
  entries: JournalLine[];
  lastModified: string;
  postingDate: string;
  fiscalPeriod: string;
  journalType: string;
}

export const journalListData: JournalEntry[] = [
  {
    id: '1',
    number: '123123',
    date: '2024-05-5',
    description: 'Penerimaan DP penjualan service dari PT. ABC Corp',
    amount: 3000000000,
    status: 'posted',
  },
  {
    id: '2',
    number: '123123',
    date: '2024-05-5',
    description: 'Pembelian peralatan kantor',
    amount: 3000000000,
    status: 'draft',
  },
  {
    id: '3',
    number: '123123',
    date: '2024-05-5',
    description: 'Pembayaran hutang supplier',
    amount: 3000000000,
    status: 'posted',
  },
  {
    id: '4',
    number: '123123',
    date: '2024-05-5',
    description: 'Penerimaan piutang customer',
    amount: 3000000000,
    status: 'draft',
  },
  {
    id: '5',
    number: '123123',
    date: '2024-05-5',
    description: 'Adjustment persediaan',
    amount: 3000000000,
    status: 'posted',
  },
  {
    id: '6',
    number: '123123',
    date: '2024-05-5',
    description: 'Koreksi saldo kas',
    amount: 3000000000,
    status: 'draft',
  },
];

export const journalStatsData = {
  voucherRecorded: {
    count: 20,
    total: 30,
    draft: true,
  },
  activeAccounts: {
    count: 5,
    total: 10,
  },
  trialBalance: {
    status: 'Balanced',
    asOf: '29/09/2025',
  },
  journalValue: {
    amount: 200000000,
    description: 'Posted vouchers only',
  },
};

export const accountOptions = [
  { code: '1110', name: 'Kas', category: 'Asset • Current Assets' },
  { code: '1140', name: 'Biaya Dibayar Dimuka', category: 'Asset • Current Assets' },
  { code: '2120', name: 'Utang Bank', category: 'Liability • Current Liabilities' },
  { code: '1120', name: 'Piutang Usaha', category: 'Asset • Current Assets' },
  { code: '2201', name: 'Uang Muka Penjualan', category: 'Liability • Current Liabilities' },
  { code: '2101', name: 'Hutang PPN', category: 'Liability • Current Liabilities' },
];

export const journalDetailData: JournalDetail = {
  id: 'JRN-001',
  number: 'JRN-2024-001',
  date: '15 Maret 2024',
  description: 'Penerimaan DP penjualan service dari PT. ABC Corp',
  status: 'posted',
  createdBy: 'System',
  reference: 'BRV-2024-001',
  totalDebit: 55500000,
  totalCredit: 55500000,
  lastModified: '15 Maret 2024',
  postingDate: '15 Maret 2024',
  fiscalPeriod: '2024 - 03',
  journalType: 'Auto-Generated',
  entries: [
    {
      accountCode: '1102',
      accountName: 'Bank',
      accountCategory: 'Asset • Current Assets',
      debit: 55500000,
      credit: 0,
      description: 'Penerimaan DP dari PT. ABC Corp',
    },
    {
      accountCode: '2201',
      accountName: 'Uang Muka Penjualan',
      accountCategory: 'Liability • Current Liabilities',
      debit: 0,
      credit: 50000000,
      description: 'Uang muka penjualan service',
    },
    {
      accountCode: '2101',
      accountName: 'Hutang PPN',
      accountCategory: 'Liability • Current Liabilities',
      debit: 0,
      credit: 5500000,
      description: 'PPN Keluaran 11%',
    },
  ],
};
