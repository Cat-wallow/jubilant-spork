"use client";

import { BillingSummary } from "./components/BillingSummary";
import { InvoiceHeader } from "./components/InvoiceHeader";
import { InvoiceFilters } from "./components/InvoiceFilters";
import { InvoiceTable } from "./components/InvoiceTable";
import { AgingAnalysis } from "./components/AgingAnalysis";
import { InvoicePagination } from "./components/InvoicePagination";
import { invoices, agingAnalysis } from "./data/invoices";

export default function BillingPage() {
  return (
    <div className="flex flex-col gap-[30px]">
      {/* Summary Cards */}
      <BillingSummary />

      {/* Main Content Grid */}
      <div className="flex flex-col gap-[30px] xl:flex-row">
        {/* Left Column - Invoice Table */}
        <div className="flex flex-1 flex-col gap-5 rounded-[20px] bg-card p-4 md:p-6">
          <InvoiceHeader />
          <InvoiceFilters />
          <div className="overflow-x-auto">
            <InvoiceTable invoices={invoices} />
          </div>
          <InvoicePagination />
        </div>

        {/* Right Column - Aging Analysis */}
        <div className="xl:w-[450px]">
          <AgingAnalysis data={agingAnalysis} />
        </div>
      </div>
    </div>
  );
}
