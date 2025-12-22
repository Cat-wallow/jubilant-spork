import React from 'react';
import mockData from './mockData.json';
import { PageHeader } from './components/PageHeader';
import { StatsCards } from './components/StatsCards';
import { IdentitasSection } from './components/IdentitasSection';
import { PembetulanSection } from './components/PembetulanSection';
import { PenghasilanSection } from './components/PenghasilanSection';
import { PphTerutangSection } from './components/PphTerutangSection';
import { KreditPajakSection } from './components/KreditPajakSection';
import { PphKurangBayarSection } from './components/PphKurangBayarSection';
import { PernyataanSection } from './components/PernyataanSection';
import { LampiranIISection } from './components/LampiranIISection';
import { LampiranIVSection } from './components/LampiranIVSection';
import { InformasiTambahan } from './components/InformasiTambahan';

export default function PphBadanEditPage() {
  return (
    <div className="flex flex-col gap-6 pb-10">
      {/* Page Header */}
      <PageHeader
        sptId={mockData.header.sptId}
        title={mockData.header.title}
        subtitle={mockData.header.subtitle}
        period={mockData.header.period}
      />

      {/* Stats Cards */}
      <StatsCards stats={mockData.stats} />

      {/* Identitas Wajib Pajak Section */}
      <IdentitasSection data={mockData.identitasWajibPajak} />

      {/* Pembetulan / Laporan Keuangan Section */}
      <PembetulanSection data={mockData.pembetulanLaporanKeuangan} />

      {/* Penghasilan dan Penyesuaian Fiskal Section */}
      <PenghasilanSection data={mockData.penghasilanDanPenyesuaian} />

      {/* PPh Terutang Section */}
      <PphTerutangSection data={mockData.pphTerutang} />

      {/* Kredit Pajak Section */}
      <KreditPajakSection data={mockData.kreditPajak} />

      {/* PPh Kurang Bayar Section */}
      <PphKurangBayarSection data={mockData.pphKurangBayar} />

      {/* Pernyataan dan Tanda Tangan Section */}
      <PernyataanSection
        data={{
          disclaimer: mockData.pernyataanDanTandaTangan.disclaimer,
          signature: mockData.pernyataanDanTandaTangan.signature,
          direstitusikan: mockData.pernyataanDanTandaTangan.direstitusikan,
          diperhitungkan: mockData.pernyataanDanTandaTangan.diperhitungkan,
        }}
      />

      {/* Lampiran II Section */}
      <LampiranIISection
        title={mockData.lampiranII.title}
        description={mockData.lampiranII.description}
        data={mockData.lampiranII.data as any}
        summary={mockData.lampiranII.summary}
      />

      {/* Lampiran IV Section */}
      <LampiranIVSection
        title={mockData.lampiranIV.title}
        bagianA={mockData.lampiranIV.bagianA as any}
        bagianB={mockData.lampiranIV.bagianB as any}
      />

      {/* Informasi Tambahan Section */}
      <InformasiTambahan
        tanggalPembuatan={mockData.informasiTambahan.tanggalPembuatan}
        deadlinePenyampaian={mockData.informasiTambahan.deadlinePenyampaian}
        autoFillStatus={mockData.informasiTambahan.autoFillStatus}
        dataSource={mockData.informasiTambahan.dataSource}
        terakhirDiubah={mockData.informasiTambahan.terakhirDiubah}
      />
    </div>
  );
}
