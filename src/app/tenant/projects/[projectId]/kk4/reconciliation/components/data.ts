export interface Suggestion {
  id: string;
  type: 'positive' | 'negative';
  amount: number;
  title: string;
  accountCode: string;
  rule: string;
  ruleTitle: string;
  description: string;
}

export interface StagedAdjustment {
  id: string;
  type: 'positive' | 'negative';
  amount: number;
  title: string;
  accountCode: string;
  description: string;
  author: string;
  attachments: number;
}

export interface SourceLine {
  id: string;
  journalRef: string;
  date: string;
  coaCode: string;
  accountName: string;
  accountDescription: string;
  amount: number;
  taxHint: 'partial' | 'non-fiscal' | 'fiscal';
  flag: 'warning' | 'critical' | 'info';
  hasAttachments: boolean;
}

export const suggestions: Suggestion[] = [
  {
    id: '1',
    type: 'positive',
    amount: 62500000,
    title: 'Biaya Representasi & Entertainment',
    accountCode: '6-10100',
    rule: 'Entertainment 50% Non-Deductible',
    ruleTitle: 'Entertainment 50% Non-Deductible',
    description: 'Koreksi fiskal 50% sesuai PMK - biaya entertainment hanya 50% dapat dikurangkan'
  },
  {
    id: '2',
    type: 'positive',
    amount: 15000000,
    title: 'Denda & Sanksi Pajak',
    accountCode: '6-10310',
    rule: 'Tax Penalty 100% Non-Deductible',
    ruleTitle: 'Tax Penalty 100% Non-Deductible',
    description: 'Denda pajak tidak dapat dikurangkan 100% sesuai UU PPh'
  },
  {
    id: '3',
    type: 'positive',
    amount: 45000000,
    title: 'Biaya Sumbangan',
    accountCode: '6-10115',
    rule: 'Non-Qualified Donation',
    ruleTitle: 'Non-Qualified Donation',
    description: 'Sumbangan tidak memenuhi kriteria deductible expense'
  },
  {
    id: '4',
    type: 'positive',
    amount: 80000000,
    title: 'Biaya Natura & Kenikmatan',
    accountCode: '6-20210',
    rule: 'Natura 100% Non-Deductible',
    ruleTitle: 'Natura 100% Non-Deductible',
    description: 'Natura karyawan tidak dapat dikurangkan dari penghasilan bruto'
  }
];

export const stagedAdjustments: StagedAdjustment[] = [
  {
    id: '1',
    type: 'negative',
    amount: 50000000,
    title: 'Biaya Penyusutan Aktiva',
    accountCode: '6-10205',
    description: 'Perbedaan metode penyusutan komersial vs fiskal untuk aset X',
    author: 'John Doe',
    attachments: 2
  }
];

export const sourceLines: SourceLine[] = [
  {
    id: '1',
    journalRef: 'JRN-2025-0892',
    date: '2025-09-15',
    coaCode: '6-10100',
    accountName: 'Biaya Representasi & Entertainment',
    accountDescription: 'Entertainment klien - meeting project',
    amount: 125000000,
    taxHint: 'partial',
    flag: 'warning',
    hasAttachments: true
  },
  {
    id: '2',
    journalRef: 'JRN-2025-0905',
    date: '2025-09-18',
    coaCode: '6-10310',
    accountName: 'Denda & Sanksi Pajak',
    accountDescription: 'Denda keterlambatan SPT Masa',
    amount: 15000000,
    taxHint: 'non-fiscal',
    flag: 'critical',
    hasAttachments: false
  },
  {
    id: '3',
    journalRef: 'JRN-2025-0920',
    date: '2025-09-22',
    coaCode: '6-10205',
    accountName: 'Biaya Penyusutan Aktiva',
    accountDescription: 'Penyusutan bulanan metode straight-line',
    amount: 450000000,
    taxHint: 'partial',
    flag: 'warning',
    hasAttachments: true
  },
  {
    id: '4',
    journalRef: 'JRN-2025-0931',
    date: '2025-09-25',
    coaCode: '6-10115',
    accountName: 'Biaya Sumbangan',
    accountDescription: 'Sumbangan ke yayasan X',
    amount: 50000000,
    taxHint: 'non-fiscal',
    flag: 'warning',
    hasAttachments: false
  },
  {
    id: '5',
    journalRef: 'JRN-2025-0945',
    date: '2025-09-28',
    coaCode: '6-20210',
    accountName: 'Biaya Natura & Kenikmatan',
    accountDescription: 'Natura karyawan bulanan',
    amount: 80000000,
    taxHint: 'non-fiscal',
    flag: 'warning',
    hasAttachments: true
  }
];

export const summaryData = {
  totalSuggestions: 4,
  stagedAdjustments: 1,
  positiveCorrection: 202500000,
  negativeCorrection: 50000000
};
