export const sptData = {
  id: "SPT-PPN-1111-2024-03",
  status: "Draft",
  completeness: 85,
  totalTax: 15000000,
  autoFilled: true,
  dataSource: "KK2 accounting data",
  
  identitasPemotong: {
    npwp: "12.345.678.9-012.345",
    nama: "PT CONTOH PERUSAHAAN",
    klasifikasiUsaha: "496000",
    nomorTelepon: "021-5555-1234",
    email: "tax@ptcontoh.co.id",
    alamat: "Gedung Sudirman Center Lt. 15, Jl. Jend. Sudirman No. 123, Tanah Abang, Jakarta Pusat 10270"
  },
  
  bagianI: {
    penyerahanA: [
      { no: 1, uraian: "Dalam Negeri dengan Faktur Pajak", nilai: 150000000 },
      { no: 2, uraian: "Ekspor BKP", nilai: 75000000 },
      { no: 3, uraian: "Penyerahan yang PPN-nya tidak dipungut", nilai: 25000000 },
      { no: 4, uraian: "Penyerahan yang dibebaskan dari PPN", nilai: 10000000 },
      { no: 5, uraian: "Penyerahan kepada Pemungut PPN", nilai: 5000000 },
      { no: 6, uraian: "Penyerahan lainnya", nilai: 15000000 }
    ],
    totalPenyerahanA: 280000000,
    
    penyerahanB: [
      { no: 1, uraian: "Yang dikenakan PPN", nilai: 225000000 },
      { no: 2, uraian: "Yang dikenakan PPN dengan tarif 0%", nilai: 75000000 },
      { no: 3, uraian: "Yang dibebaskan dari PPN", nilai: 10000000 },
      { no: 4, uraian: "Yang tidak termasuk objek PPN", nilai: 30000000 },
      { no: 5, uraian: "Penyerahan lainnya", nilai: 15000000 }
    ],
    totalPenyerahanB: 430000000
  },
  
  bagianII: {
    dasarPengenaan: 225000000,
    ppnTerutang: 24750000,
    ppnMasukanDikreditkan: 18500000,
    ppnMasukanDimintaKembali: 2250000,
    jumlahPpnMasukan: 20750000,
    ppnKurangBayar: 4000000,
    ppnLebihBayar: 0,
    ppnKompensasi: 0,
    ppnRestitusi: 0,
    saldoPpnLebihBayar: 4000000
  },
  
  bagianIII: {
    dasarPengenaan: 0,
    ppnTerutang: 0
  },
  
  bagianVI: {
    lampiran: [
      { nama: "Lampiran A (Rekapitulasi Penyerahan dan Perolehan)", checked: true },
      { nama: "Lampiran A1 (Daftar Ekspor BKP)", checked: true },
      { nama: "Lampiran A2 (Daftar Pajak Keluaran Dalam Negeri)", checked: true },
      { nama: "Lampiran B (Rekapitulasi Impor)", checked: true },
      { nama: "Lampiran B1 (Daftar Pajak Masukan Impor)", checked: true },
      { nama: "Lampiran B2 (Daftar Pajak Masukan Dalam Negeri)", checked: true },
      { nama: "Lampiran C (Daftar Pajak Masukan yang diminta kembali)", checked: false }
    ],
    jumlahLampiran: 6
  },
  
  lampiranA: {
    penyerahan: [
      { no: "01", uraian: "Penyerahan Dalam Negeri (Tarif 11%)", dpp: 150000000, ppn: 16500000 },
      { no: "02", uraian: "Penyerahan Ekspor", dpp: 75000000, ppn: 0 },
      { no: "03", uraian: "Penyerahan Lainnya", dpp: 15000000, ppn: 1650000 }
    ],
    totalPenyerahan: { dpp: 240000000, ppn: 18150000 },
    
    perolehan: [
      { no: "01", uraian: "Perolehan BKP/JKP Dalam Negeri", dpp: 120000000, ppn: 13200000 },
      { no: "02", uraian: "Perolehan Impor BKP", dpp: 45000000, ppn: 4950000 },
      { no: "03", uraian: "Perolehan Lainnya", dpp: 25000000, ppn: 2750000 }
    ],
    totalPerolehan: { dpp: 190000000, ppn: 20900000 }
  },
  
  lampiranA1: {
    eksporList: [
      {
        no: 1,
        tanggalDokumen: "5 Maret 2024",
        nomorDokumen: "010-0000000001",
        namaEksportir: "PT EXPORT JAYA",
        npwpEksportir: "12.345.678.9-123.000",
        namaPembeli: "GLOBAL TRADERS INC",
        alamatPembeli: "123 Main Street, Singapore",
        uraianBkp: "Komponen elektronik",
        jumlahHarga: 47000000,
        ppn: 5170000,
        ppnbm: 0,
        keterangan: "-"
      },
      {
        no: 2,
        tanggalDokumen: "8 Maret 2024",
        nomorDokumen: "010-0000000002",
        namaEksportir: "CV TEKNIK MAJU",
        npwpEksportir: "98.765.432.1-321.000",
        namaPembeli: "TECH SOLUTIONS LTD",
        alamatPembeli: "456 Business Ave, Malaysia",
        uraianBkp: "Spare parts otomotif",
        jumlahHarga: 30000000,
        ppn: 3300000,
        ppnbm: 0,
        keterangan: "-"
      },
      {
        no: 3,
        tanggalDokumen: "8 Maret 2024",
        nomorDokumen: "010-0000000003",
        namaEksportir: "PT TEKNOLOGI DIGITAL",
        npwpEksportir: "76.543.210.9-876.000",
        namaPembeli: "DIGITAL SYSTEMS CO",
        alamatPembeli: "789 Tech Park, Thailand",
        uraianBkp: "Software dan hardware IT",
        jumlahHarga: 28000000,
        ppn: 3080000,
        ppnbm: 0,
        keterangan: "-"
      }
    ],
    totalEkspor: { jumlahHarga: 105000000, ppn: 11550000, ppnbm: 0 }
  },
  
  lampiranB1: {
    imporList: [
      {
        no: 1,
        namaPenjual: "TECH COMPONENTS LTD",
        nomorDokumen: "PIB-001/III/2024",
        tanggalDokumen: "2 Maret 2024",
        dpp: 15000000,
        ppn: 1650000,
        ppnbm: 0,
        keterangan: "Impor komponen elektronik"
      },
      {
        no: 2,
        namaPenjual: "GLOBAL MACHINERY PTE",
        nomorDokumen: "PIB-002/III/2024",
        tanggalDokumen: "10 Maret 2024",
        dpp: 22000000,
        ppn: 2420000,
        ppnbm: 0,
        keterangan: "Impor mesin produksi"
      }
    ],
    totalImpor: { dpp: 37000000, ppn: 4070000, ppnbm: 0 }
  },
  
  lampiranB2: {
    pembelianList: [
      {
        no: 1,
        namaPenjual: "PT SUPPLIER UTAMA",
        npwp: "11.222.333.4-555.000",
        nomorFaktur: "010-9999000001",
        tanggalFaktur: "3 Maret 2024",
        dpp: 18000000,
        ppn: 1980000,
        ppnbm: 0,
        fakturDiganti: "-"
      },
      {
        no: 2,
        namaPenjual: "CV BAHAN BAKU JAYA",
        npwp: "22.333.444.5-666.000",
        nomorFaktur: "010-9999000002",
        tanggalFaktur: "7 Maret 2024",
        dpp: 25000000,
        ppn: 2750000,
        ppnbm: 0,
        fakturDiganti: "-"
      },
      {
        no: 3,
        namaPenjual: "PT LOGISTIK NUSANTARA",
        npwp: "33.444.555.6-777.000",
        nomorFaktur: "010-9999000003",
        tanggalFaktur: "12 Maret 2024",
        dpp: 12000000,
        ppn: 1320000,
        ppnbm: 0,
        fakturDiganti: "-"
      }
    ],
    totalPembelian: { dpp: 55000000, ppn: 6050000, ppnbm: 0 }
  },
  
  pernyataan: {
    tempatTanggal: "Jakarta, 30 September 2025",
    namaLengkap: "PT CONTOH PERUSAHAAN",
    ttd: null
  },
  
  validasi: {
    sumberData: {
      jurnalAkuntansi: 0,
      fakturPajakMasukan: 0,
      fakturPajakKeluaran: 0
    },
    tingkatAkurasi: 95
  },
  
  informasiTambahan: {
    tanggalPembuatan: "25 Maret 2024",
    deadlinePenyampaian: "30 April 2024",
    terakhirDiubah: "28 Maret 2024",
    autoFillStatus: "Auto-Filled",
    dataSource: "KK2 Journals"
  }
};
