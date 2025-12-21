import React from 'react';
import mockData from './mockData.json';
import { PageHeader } from './components/PageHeader';
import { StatsCards } from './components/StatsCards';
import { IdentitasSection } from './components/IdentitasSection';
import { BagianASection } from './components/BagianASection';
import { BagianBSection } from './components/BagianBSection';
import { LampiranTable } from './components/LampiranTable';

export default function PPNEditPage() {
  return (
    <div className="flex flex-col gap-6 pb-10">
      {/* Page Header */}
      <PageHeader
        sptId={mockData.header.sptId}
        title={mockData.header.title}
        period={mockData.header.period}
      />

      {/* Stats Cards */}
      <StatsCards stats={mockData.stats} />

      {/* Identitas Wajib Pajak Section */}
      <IdentitasSection data={mockData.identitasWajibPajak} />

      {/* Bagian A Section */}
      <BagianASection data={mockData.bagianA} />

      {/* Bagian B Section */}
      <BagianBSection data={mockData.bagianB} />

      {/* Lampiran Tables */}
      <LampiranTable
        title={mockData.lampiran.title}
        description={mockData.lampiran.description}
        data={mockData.lampiran.data}
        total={mockData.lampiran.total}
      />

      <LampiranTable
        title={mockData.lampiran2.title}
        description={mockData.lampiran2.description}
        data={mockData.lampiran2.data}
        total={mockData.lampiran2.total}
      />
    </div>
  );
}
