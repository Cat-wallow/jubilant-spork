'use client';

import { InfoCards } from './components/InfoCards';
import { BASTTable } from './components/BASTTable';
import { TemplateSection } from './components/TemplateSection';
import data from './data.json';

export default function BASTPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Info Cards */}
      <InfoCards stats={data.stats} />

      {/* BAST Table Section */}
      <BASTTable table={data.bastTable} />

      {/* Template & Standar Section */}
      <TemplateSection template={data.template} />
    </div>
  );
}
