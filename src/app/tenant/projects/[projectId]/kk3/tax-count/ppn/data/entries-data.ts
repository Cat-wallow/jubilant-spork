export interface PPNEntry {
  posSpt: string;
  formRef: string;
  noFaktur: string;
  tanggalFaktur: string;
  dpp: string;
  ppn: string;
  masa: string;
  fpPengganti: string;
  progress: 'Completed' | 'Review Required' | 'In Progress' | 'Not Started';
  approval?: {
    by: string;
    date: string;
  };
  status: 'Valid' | 'Pending';
}

export const entriesData: PPNEntry[] = [
  {
    posSpt: 'PPN Keluaran A1',
    formRef: 'A1',
    noFaktur: '010-001-24000001',
    tanggalFaktur: '3/1/2024',
    dpp: 'Rp 45.000.000',
    ppn: 'Rp 4.950.000',
    masa: '03',
    fpPengganti: '-',
    progress: 'Completed',
    approval: {
      by: 'by Ahmad PMO',
      date: '3/15/2024',
    },
    status: 'Valid',
  },
  {
    posSpt: 'PPN Keluaran A1',
    formRef: 'A1',
    noFaktur: '010-001-24000002',
    tanggalFaktur: '3/5/2024',
    dpp: 'Rp 32.000.000',
    ppn: 'Rp 3.520.000',
    masa: '03',
    fpPengganti: '-',
    progress: 'Review Required',
    status: 'Valid',
  },
  {
    posSpt: 'PPN Masukan B2',
    formRef: 'B2',
    noFaktur: '010-999-24000123',
    tanggalFaktur: '3/3/2024',
    dpp: 'Rp 18.000.000',
    ppn: 'Rp 1.980.000',
    masa: '03',
    fpPengganti: '-',
    progress: 'In Progress',
    status: 'Valid',
  },
  {
    posSpt: 'PPN Masukan B1',
    formRef: 'B1',
    noFaktur: 'PIB-001/III/2024',
    tanggalFaktur: '3/2/2024',
    dpp: 'Rp 15.000.000',
    ppn: 'Rp 1.650.000',
    masa: '03',
    fpPengganti: '-',
    progress: 'Not Started',
    status: 'Valid',
  },
];
