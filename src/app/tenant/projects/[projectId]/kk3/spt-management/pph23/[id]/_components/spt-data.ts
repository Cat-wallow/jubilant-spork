export interface TaxObjectEntry {
  no: string;
  kodeObjekPajak: string;
  uraianObjekPajak: string;
  jumlahPenerimaanPenghasilan: number;
  jumlahPenghasilanBruto: number;
  jumlahPPhDipotong: number;
}

export interface SPTData {
  id: string;
  title: string;
  periode: string;
  perusahaan: string;
  status: 'draft' | 'submitted' | 'approved';
  completeness: number;
  
  // Summary
  dppTotal: number;
  ppnKeluaran: number;
  ppnMasukan: number;
  ppnTerutang: number;
  
  // Identitas Wajib Pajak
  npwp: string;
  namaWajibPajak: string;
  alamat: string;
  nomorTelepon: string;
  email: string;
  
  // Tax Objects
  taxObjects: TaxObjectEntry[];
  totalPenerima: number;
  totalPenghasilanBruto: number;
  totalPPhDipotong: number;
  
  // Calculation
  pphTerutang: number;
  pphDipotongSebelumnya: number;
  pphHarusDipotong: number;
  pphKurangDipotong: number;
  pphLebihDipotong: number;
  pphHarusDisetor: number;
  
  // Lampiran
  lampiran: {
    formulir1721I: boolean;
    formulir1721II: boolean;
    formulir1721III: boolean;
    formulir1721IV: boolean;
    formulir1721V: boolean;
    formulir1721VI: boolean;
  };
  
  // Pernyataan
  tempatTanggal: string;
  namaLengkap: string;
  
  // Info Tambahan
  tanggalPembuatan: string;
  deadlinePenyampaian: string;
  autoFillStatus: 'auto-filled' | 'manual';
  dataSource: string;
  terakhirDiubah: string;
}

export const mockSPTData: SPTData = {
  id: 'SPT-PPH23-1721-2024-03',
  title: 'SUNTING DATA SPT-PPH23-1721-2024-03',
  periode: '2024-03',
  perusahaan: 'PT CONTOH PERUSAHAAN',
  status: 'draft',
  completeness: 85,
  
  dppTotal: 280000000,
  ppnKeluaran: 16500000,
  ppnMasukan: 16000000,
  ppnTerutang: 1600000,
  
  npwp: '12.345.678.9-012.345',
  namaWajibPajak: 'PT CONTOH PERUSAHAAN',
  alamat: 'Gedung Sudirman Center Lt. 15, Jl. Jend. Sudirman No. 123, Tanah Abang, Jakarta Pusat 10270',
  nomorTelepon: '021-5555-1234',
  email: 'tax@ptcontoh.co.id',
  
  taxObjects: [
    {
      no: '01',
      kodeObjekPajak: '21-100-01',
      uraianObjekPajak: 'Pegawai tetap yang mendapat atau memperoleh penghasilan teratur',
      jumlahPenerimaanPenghasilan: 45,
      jumlahPenghasilanBruto: 450000000,
      jumlahPPhDipotong: 12500000
    },
    {
      no: '02',
      kodeObjekPajak: '21-100-02',
      uraianObjekPajak: 'Penerima pensiun berkala',
      jumlahPenerimaanPenghasilan: 2,
      jumlahPenghasilanBruto: 24000000,
      jumlahPPhDipotong: 600000
    },
    {
      no: '03',
      kodeObjekPajak: '21-100-03',
      uraianObjekPajak: 'Pegawai tidak tetap atau tenaga kerja lepas',
      jumlahPenerimaanPenghasilan: 8,
      jumlahPenghasilanBruto: 48000000,
      jumlahPPhDipotong: 1200000
    },
    {
      no: '04',
      kodeObjekPajak: '21-100-04',
      uraianObjekPajak: 'Bukan pegawai yang menerima atau memperoleh penghasilan sehubungan dengan pekerjaan, jasa, atau kegiatan',
      jumlahPenerimaanPenghasilan: 12,
      jumlahPenghasilanBruto: 60000000,
      jumlahPPhDipotong: 3000000
    },
    {
      no: '05',
      kodeObjekPajak: '21-100-05',
      uraianObjekPajak: 'Peserta kegiatan yang menerima atau memperoleh penghasilan sehubungan dengan keikutsertaannya dalam suatu kegiatan',
      jumlahPenerimaanPenghasilan: 0,
      jumlahPenghasilanBruto: 0,
      jumlahPPhDipotong: 0
    },
    {
      no: '06',
      kodeObjekPajak: '21-100-06',
      uraianObjekPajak: 'Distributor perusahaan multilevel marketing atau direct selling dan kegiatan sejenis lainnya',
      jumlahPenerimaanPenghasilan: 0,
      jumlahPenghasilanBruto: 0,
      jumlahPPhDipotong: 0
    },
    {
      no: '07',
      kodeObjekPajak: '21-100-07',
      uraianObjekPajak: 'Penerima penghasilan berupa uang saku, uang representasi, uang rapat, honorarium, hadiah atau penghargaan, imbalan, dan pembayaran lain',
      jumlahPenerimaanPenghasilan: 15,
      jumlahPenghasilanBruto: 30000000,
      jumlahPPhDipotong: 750000
    },
    {
      no: '08',
      kodeObjekPajak: '21-100-08',
      uraianObjekPajak: 'Anggota dewan komisaris atau dewan pengawas yang tidak merangkap sebagai pegawai tetap',
      jumlahPenerimaanPenghasilan: 3,
      jumlahPenghasilanBruto: 36000000,
      jumlahPPhDipotong: 1800000
    },
    {
      no: '09',
      kodeObjekPajak: '21-100-09',
      uraianObjekPajak: 'Mantan pegawai',
      jumlahPenerimaanPenghasilan: 1,
      jumlahPenghasilanBruto: 15000000,
      jumlahPPhDipotong: 375000
    },
    {
      no: '10',
      kodeObjekPajak: '21-100-10',
      uraianObjekPajak: 'Peserta program pensiun yang menerima penghasilan berupa uang pensiun',
      jumlahPenerimaanPenghasilan: 0,
      jumlahPenghasilanBruto: 0,
      jumlahPPhDipotong: 0
    },
    {
      no: '11',
      kodeObjekPajak: '21-100-11',
      uraianObjekPajak: 'Penerima atau yang memperoleh penghasilan dari dana pensiun',
      jumlahPenerimaanPenghasilan: 0,
      jumlahPenghasilanBruto: 0,
      jumlahPPhDipotong: 0
    },
    {
      no: '12',
      kodeObjekPajak: '21-100-12',
      uraianObjekPajak: 'Penerima Jaminan Hari Tua',
      jumlahPenerimaanPenghasilan: 0,
      jumlahPenghasilanBruto: 0,
      jumlahPPhDipotong: 0
    },
    {
      no: '13',
      kodeObjekPajak: '26-100-01',
      uraianObjekPajak: 'Penerima penghasilan yang dipotong PPh Pasal 26',
      jumlahPenerimaanPenghasilan: 2,
      jumlahPenghasilanBruto: 50000000,
      jumlahPPhDipotong: 10000000
    },
    {
      no: '14',
      kodeObjekPajak: '26-100-02',
      uraianObjekPajak: 'Warga negara asing yang menerima atau memperoleh penghasilan dari Indonesia',
      jumlahPenerimaanPenghasilan: 0,
      jumlahPenghasilanBruto: 0,
      jumlahPPhDipotong: 0
    },
    {
      no: '15',
      kodeObjekPajak: '26-100-03',
      uraianObjekPajak: 'Bentuk usaha tetap (BUT)',
      jumlahPenerimaanPenghasilan: 0,
      jumlahPenghasilanBruto: 0,
      jumlahPPhDipotong: 0
    },
    {
      no: '16',
      kodeObjekPajak: '26-100-04',
      uraianObjekPajak: 'Penerima penghasilan berupa bunga, dividen, royalti, dan penghasilan lain',
      jumlahPenerimaanPenghasilan: 0,
      jumlahPenghasilanBruto: 0,
      jumlahPPhDipotong: 0
    },
    {
      no: '17',
      kodeObjekPajak: '26-100-05',
      uraianObjekPajak: 'Penyelenggara kegiatan',
      jumlahPenerimaanPenghasilan: 0,
      jumlahPenghasilanBruto: 0,
      jumlahPPhDipotong: 0
    },
    {
      no: '18',
      kodeObjekPajak: '26-100-06',
      uraianObjekPajak: 'Lainnya',
      jumlahPenerimaanPenghasilan: 0,
      jumlahPenghasilanBruto: 0,
      jumlahPPhDipotong: 0
    }
  ],
  
  totalPenerima: 88,
  totalPenghasilanBruto: 713000000,
  totalPPhDipotong: 30225000,
  
  pphTerutang: 30225000,
  pphDipotongSebelumnya: 0,
  pphHarusDipotong: 30225000,
  pphKurangDipotong: 0,
  pphLebihDipotong: 0,
  pphHarusDisetor: 30225000,
  
  lampiran: {
    formulir1721I: true,
    formulir1721II: true,
    formulir1721III: false,
    formulir1721IV: false,
    formulir1721V: false,
    formulir1721VI: false
  },
  
  tempatTanggal: 'Jakarta, 30 September 2025',
  namaLengkap: 'PT CONTOH PERUSAHAAN',
  
  tanggalPembuatan: '20 Maret 2024',
  deadlinePenyampaian: '20 April 2024',
  autoFillStatus: 'auto-filled',
  dataSource: 'KK2 Journals',
  terakhirDiubah: '27 Maret 2024'
};

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('id-ID').format(value);
}
