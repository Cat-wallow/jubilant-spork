export interface VendorComputation {
  id: string;
  vendorName: string;
  lastDate: string;
  npwp: string;
  serviceType: string;
  brutoAmount: string;
  pph23: string;
  status: 'Computed' | 'Pending';
  vouchers: string;
  taxRate: string;
  netPayment: string;
}

export const computeTableData: VendorComputation[] = [
  {
    id: '1',
    vendorName: 'PT Konsultan Teknologi',
    lastDate: '2024-03-28',
    npwp: '01.234.567.8-901.000',
    serviceType: '2% - Jasa Teknik, Manajemen, Konsultan',
    brutoAmount: 'Rp 50.000.000',
    pph23: 'Rp 1.000.000',
    status: 'Computed',
    vouchers: '5 vouchers',
    taxRate: '2%',
    netPayment: 'Rp 49.000.000',
  },
  {
    id: '2',
    vendorName: 'CV Jasa Profesional',
    lastDate: '2024-03-29',
    npwp: '02.345.678.9-012.000',
    serviceType: '4% - Jasa Lainnya',
    brutoAmount: 'Rp 25.000.000',
    pph23: 'Rp 1.000.000',
    status: 'Pending',
    vouchers: '3 vouchers',
    taxRate: '4%',
    netPayment: 'Rp 24.000.000',
  },
  {
    id: '3',
    vendorName: 'PT Sewa Properti',
    lastDate: '2024-03-30',
    npwp: '03.456.789.0-123.000',
    serviceType: '15% - Sewa Tanah dan Bangunan',
    brutoAmount: 'Rp 12.000.000',
    pph23: 'Rp 1.800.000',
    status: 'Computed',
    vouchers: '2 vouchers',
    taxRate: '15%',
    netPayment: 'Rp 10.200.000',
  },
];
