export interface StatsCard {
  icon: string;
  label: string;
  value: string | number;
  subtitle: string;
}

export interface GeneralLedgerAccount {
  id: string;
  accountNumber: string;
  accountName: string;
  totalDebit: number;
  totalCredit: number;
  balance: number;
  transactions?: GeneralLedgerTransaction[];
  expanded?: boolean;
}

export interface GeneralLedgerTransaction {
  id: string;
  date: string;
  type: string;
  voucher: string;
  voucherCode: string;
  narration: string;
  debit: number;
  credit: number;
  balance: number;
}

export interface TrialBalanceAccount {
  accountNo: string;
  accountName: string;
  beginningBalance: number;
  debit: number;
  credit: number;
  balance: number;
  normalSide: 'Debit' | 'Credit';
}

export interface BalanceSheetAccount {
  accountNo: string;
  accountName: string;
  amount: number;
}

export interface BalanceSheetSection {
  title: string;
  accounts: BalanceSheetAccount[];
  total: number;
}

export interface BalanceSheetData {
  companyName: string;
  reportDate: string;
  aktiva: {
    lancar: BalanceSheetSection;
    tetap: BalanceSheetSection;
  };
  kewajiban: BalanceSheetSection;
  modal: BalanceSheetSection;
  totalAktiva: number;
  totalKewajibanModal: number;
  isBalanced: boolean;
  difference: number;
}

export const statsCards: StatsCard[] = [
  {
    icon: 'file-done',
    label: 'Voucher Recorded',
    value: 20,
    subtitle: '/30 Draft',
  },
  {
    icon: 'wallet',
    label: 'Active Of Account',
    value: 5,
    subtitle: '/10 Active Account',
  },
  {
    icon: 'calculator',
    label: 'Trial Balance',
    value: 'Balanced',
    subtitle: 'As of 29/09/2025',
  },
  {
    icon: 'money',
    label: 'Journal Value',
    value: 'Rp. 200.000.000',
    subtitle: 'Posted vouchers only',
  },
];

export const generalLedgerAccounts: GeneralLedgerAccount[] = [
  {
    id: '1',
    accountNumber: '1102',
    accountName: 'Bank',
    totalDebit: 55500000,
    totalCredit: 0,
    balance: 55500000,
    transactions: [],
  },
  {
    id: '2',
    accountNumber: '2101',
    accountName: 'Hutang PPN',
    totalDebit: 0,
    totalCredit: 15500000,
    balance: 0,
    transactions: [
      {
        id: '2-1',
        date: '2024-03-15',
        type: 'Journal',
        voucher: 'BRV',
        voucherCode: 'BRV-2024-001',
        narration: 'PPN Keluaran 11%',
        debit: 0,
        credit: 5500000,
        balance: 0,
      },
      {
        id: '2-2',
        date: '2024-03-16',
        type: 'Journal',
        voucher: 'RJV',
        voucherCode: 'RJV-2024-001',
        narration: 'PPN Keluaran 10%',
        debit: 0,
        credit: 10000000,
        balance: 0,
      },
    ],
  },
  {
    id: '3',
    accountNumber: '1201',
    accountName: 'Piutang Dagang',
    totalDebit: 107500000,
    totalCredit: 0,
    balance: 107500000,
    transactions: [],
  },
  {
    id: '4',
    accountNumber: '1302',
    accountName: 'Piutang PPh 23',
    totalDebit: 2500000,
    totalCredit: 0,
    balance: 110000000,
    transactions: [],
  },
  {
    id: '5',
    accountNumber: '4102',
    accountName: 'Penjualan Service',
    totalDebit: 0,
    totalCredit: 100000000,
    balance: 10000000,
    transactions: [],
  },
];

export const trialBalanceAccounts: TrialBalanceAccount[] = [
  {
    accountNo: '1102',
    accountName: 'Bank',
    beginningBalance: 200000000,
    debit: 55500000,
    credit: 0,
    balance: 55500000,
    normalSide: 'Debit',
  },
  {
    accountNo: '1201',
    accountName: 'Piutang Dagang',
    beginningBalance: 200000000,
    debit: 107500000,
    credit: 0,
    balance: 107500000,
    normalSide: 'Debit',
  },
  {
    accountNo: '1302',
    accountName: 'Piutang PPh 23',
    beginningBalance: 200000000,
    debit: 2500000,
    credit: 0,
    balance: 2500000,
    normalSide: 'Debit',
  },
  {
    accountNo: '2101',
    accountName: 'Hutang PPN',
    beginningBalance: 200000000,
    debit: 0,
    credit: 15500000,
    balance: 15500000,
    normalSide: 'Credit',
  },
  {
    accountNo: '2201',
    accountName: 'Uang Muka Penjualan',
    beginningBalance: 200000000,
    debit: 0,
    credit: 50000000,
    balance: 50000000,
    normalSide: 'Credit',
  },
  {
    accountNo: '4102',
    accountName: 'Penjualan Service',
    beginningBalance: 200000000,
    debit: 0,
    credit: 100000000,
    balance: 100000000,
    normalSide: 'Credit',
  },
];

export const balanceSheetData: BalanceSheetData = {
  companyName: 'PT. MAJU BERSAMA INDONESIA',
  reportDate: 'Per 29 September 2025',
  aktiva: {
    lancar: {
      title: 'AKTIVA LANCAR',
      accounts: [
        { accountNo: '1102', accountName: 'Bank', amount: 55500000 },
      ],
      total: 55500000,
    },
    tetap: {
      title: 'AKTIVA TETAP',
      accounts: [
        { accountNo: '1201', accountName: 'Piutang Dagang', amount: 107500000 },
      ],
      total: 107500000,
    },
  },
  kewajiban: {
    title: 'KEWAJIBAN',
    accounts: [
      { accountNo: '2101', accountName: 'Hutang PPN', amount: 15500000 },
      { accountNo: '2201', accountName: 'Uang Muka Penjualan', amount: 50000000 },
    ],
    total: -65500000,
  },
  modal: {
    title: 'MODAL',
    accounts: [],
    total: 0,
  },
  totalAktiva: 165500000,
  totalKewajibanModal: -65500000,
  isBalanced: false,
  difference: 231000000,
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};
