export interface Transaction {
  id: string;
  buktiPotong: string;
  date: string;
  pasal: 'PPh 21' | 'PPh 23';
  wajibPajak: {
    name: string;
    npwp: string;
  };
  objekPajak: string;
  dpp: string;
  tarif: string;
  pphDipotong: string;
  status: 'VALID' | 'REVIEW';
}

export const transactionData: Transaction[] = [
  {
    id: '1',
    buktiPotong: 'BP-23-001/VI/2024',
    date: '15/6/2024',
    pasal: 'PPh 23',
    wajibPajak: {
      name: 'PT Teknologi Maju',
      npwp: '01.234.567.8-901.000',
    },
    objekPajak: 'Jasa Konsultasi IT',
    dpp: 'Rp 25.000.000',
    tarif: '2.0%',
    pphDipotong: 'Rp 500.000',
    status: 'VALID',
  },
  {
    id: '2',
    buktiPotong: 'BP-23-002/VI/2024',
    date: '18/6/2024',
    pasal: 'PPh 23',
    wajibPajak: {
      name: 'PT Properti Prima',
      npwp: '02.345.678.9-012.000',
    },
    objekPajak: 'Sewa Gedung',
    dpp: 'Rp 15.000.000',
    tarif: '2.0%',
    pphDipotong: 'Rp 300.000',
    status: 'VALID',
  },
  {
    id: '3',
    buktiPotong: 'BP-21-001/VI/2024',
    date: '20/6/2024',
    pasal: 'PPh 21',
    wajibPajak: {
      name: 'Dr. Ahmad Susanto',
      npwp: '03.456.789.0-123.000',
    },
    objekPajak: 'Honorarium Narasumber',
    dpp: 'Rp 5.000.000',
    tarif: '15.0%',
    pphDipotong: 'Rp 750.000',
    status: 'VALID',
  },
  {
    id: '4',
    buktiPotong: 'BP-23-003/VI/2024',
    date: '22/6/2024',
    pasal: 'PPh 23',
    wajibPajak: {
      name: 'Bank ABC',
      npwp: '04.567.890.1-234.000',
    },
    objekPajak: 'Bunga Deposito',
    dpp: 'Rp 8.000.000',
    tarif: '15.0%',
    pphDipotong: 'Rp 1.200.000',
    status: 'REVIEW',
  },
  {
    id: '5',
    buktiPotong: 'BP-23-004/VI/2024',
    date: '25/6/2024',
    pasal: 'PPh 23',
    wajibPajak: {
      name: 'KAP Sejahtera & Rekan',
      npwp: '05.678.901.2-345.000',
    },
    objekPajak: 'Jasa Audit',
    dpp: 'Rp 35.000.000',
    tarif: '2.0%',
    pphDipotong: 'Rp 700.000',
    status: 'VALID',
  },
];
