'use client';

import { StatsCards } from './components/StatsCards';
import { InvoiceTable } from './components/InvoiceTable';
import { FeaturesPackages } from './components/FeaturesPackages';
import data from './data.json';

export default function InvoicePage() {
  return (
    <div className="space-y-6 p-6">
      {/* Stats Cards */}
      <StatsCards stats={data.stats} />

      {/* Invoice Table */}
      <InvoiceTable invoices={data.invoices} />

      {/* Features & Packages */}
      <FeaturesPackages features={data.features} packages={data.packages} />
    </div>
  );
}
