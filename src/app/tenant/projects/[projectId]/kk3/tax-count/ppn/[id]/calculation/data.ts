export const calculationData = {
  header: {
    title: 'Breakdown Perhitungan PPN 1111',
    period: '2024-03/2024',
    tariff: 11,
  },
  bagianA: {
    title: 'Bagian A - Penyerahan BKP/JKP',
    items: [
      {
        label: 'Yang PPN-nya dipungut sendiri',
        description: 'Kena tarif 11%',
        amount: 155000000,
        percentage: 83.8,
        color: 'green',
      },
      {
        label: 'Yang PPN-nya dipungut pemungut',
        description: 'Instansi pemerintah, BUMN',
        amount: 0,
        percentage: 0,
        color: 'blue',
      },
      {
        label: 'Yang dibebaskan dari PPN',
        description: 'Barang kebutuhan pokok',
        amount: 0,
        percentage: 0,
        color: 'gray',
      },
      {
        label: 'Ekspor BKP/JKP',
        description: 'Tarif 0%',
        amount: 30000000,
        percentage: 16.2,
        color: 'orange',
      },
    ],
    total: 185000000,
  },
  bagianB: {
    title: 'Bagian B - Perhitungan PPN',
    ppnKeluaran: {
      dppTerutang: 125000000,
      tarif: 11,
      total: 13750000,
    },
    ppnMasukan: {
      dariFakturPajak: 5355000,
      dariDokumenImpor: 1650000,
      dariDokumenLain: 0,
      total: 7005000,
    },
    ppnKurangBayar: 6745000,
  },
  analysis: {
    effectiveTaxRate: {
      actual: 11.0,
      target: 11.0,
    },
    creditUtilizationRatio: {
      ratio: 50.9,
      description: 'PPN Masukan vs PPN Keluaran',
    },
    insight: 'Credit utilization dalam range normal',
  },
  compliance: [
    {
      title: 'Perhitungan Matematis',
      description: 'Semua perhitungan sudah sesuai',
      status: 'success',
    },
    {
      title: 'Tarif PPN',
      description: 'Menggunakan tarif 11% sesuai regulasi',
      status: 'success',
    },
    {
      title: 'Data Source',
      description: 'Auto-generated dari KK2 jurnal akuntansi',
      status: 'info',
    },
  ],
};
