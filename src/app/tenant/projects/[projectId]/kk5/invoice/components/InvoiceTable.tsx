'use client';

import { Download, Plus, Search, Filter, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface Invoice {
  id: string;
  invoiceId: string;
  date: string;
  termin: string;
  total: string;
  status: string;
  statusColor: string;
  statusTextColor: string;
  dueDate: string;
  dueBadge?: string;
  dueBadgeColor?: string;
  dueBadgeTextColor?: string;
  aging: string;
  agingColor: string;
  agingTextColor: string;
}

interface InvoiceTableProps {
  invoices: Invoice[];
}

export function InvoiceTable({ invoices }: InvoiceTableProps) {
  return (
    <div className="rounded-2xl bg-white p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Invoice</h2>
          <p className="mt-1 text-xs text-gray-600">Kelola Invoice di dalam Project</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-normal text-gray-900 hover:bg-gray-50">
            <Download className="h-6 w-6" />
            Export XLSX
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-normal text-gray-900 hover:bg-gray-50">
            <Download className="h-6 w-6" />
            Export PDF
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-normal text-white hover:bg-blue-700">
            <Plus className="h-6 w-6" />
            Buat Invoice
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3 rounded-lg bg-purple-50 p-3">
        <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-3">
          <span className="text-sm font-normal text-gray-900">20</span>
          <svg className="h-3 w-3 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        <div className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-3">
          <Search className="inline-block h-5 w-5 text-purple-700" />
          <input
            type="text"
            placeholder="Nama tugas"
            className="ml-2 w-full border-none bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
          />
        </div>

        <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm font-normal text-gray-900 hover:bg-gray-50">
          All Status
          <svg className="h-3 w-3 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>

        <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm font-normal text-gray-900 hover:bg-gray-50">
          All Type
          <svg className="h-3 w-3 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>

        <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm font-normal text-gray-900 hover:bg-gray-50">
          <Filter className="h-4 w-4" />
          Filter
        </button>

        <button className="flex items-center gap-2 rounded-lg bg-purple-100 px-3 py-3">
          <MoreVertical className="h-5 w-5 text-purple-700" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left">
                <Checkbox />
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-500">Invoice</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-500">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-500">Termin</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-500">Total</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-500">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-500">Due Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-500">Aging</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Checkbox />
                </td>
                <td className="px-4 py-3 text-xs font-normal text-gray-900">{invoice.invoiceId}</td>
                <td className="px-4 py-3 text-sm font-bold text-gray-900">{invoice.date}</td>
                <td className="px-4 py-3">
                  <span className="inline-block rounded-md border border-gray-200 bg-white px-2 py-1 text-xs font-normal text-gray-900">
                    {invoice.termin}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-bold text-gray-900">{invoice.total}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-normal ${invoice.statusColor} ${invoice.statusTextColor}`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">{invoice.dueDate}</span>
                    {invoice.dueBadge && (
                      <span
                        className={`inline-block rounded-full px-2 py-1 text-xs font-normal ${invoice.dueBadgeColor} ${invoice.dueBadgeTextColor}`}
                      >
                        {invoice.dueBadge}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-md px-2 py-1 text-xs font-normal ${invoice.agingColor} ${invoice.agingTextColor}`}
                  >
                    {invoice.aging}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <button className="text-purple-600 hover:text-purple-700">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button className="text-orange-600 hover:text-orange-700">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-600">Showing 1-10 of 100 products</p>
        <div className="flex gap-2">
          <button className="rounded-lg px-4 py-2 text-sm font-normal text-gray-900 hover:bg-gray-50">
            Previous
          </button>
          <button className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-normal text-gray-900 shadow-sm">
            1
          </button>
          <button className="rounded-lg px-3 py-2 text-sm font-normal text-gray-900 hover:bg-gray-50">
            2
          </button>
          <button className="rounded-lg px-3 py-2 text-sm font-normal text-gray-900 hover:bg-gray-50">
            3
          </button>
          <button className="rounded-lg px-3 py-2 text-sm font-normal text-gray-900 hover:bg-gray-50">
            4
          </button>
          <button className="rounded-lg px-3 py-2 text-sm font-normal text-gray-900 hover:bg-gray-50">
            ...
          </button>
          <button className="rounded-lg px-3 py-2 text-sm font-normal text-gray-900 hover:bg-gray-50">
            10
          </button>
          <button className="rounded-lg px-4 py-2 text-sm font-normal text-gray-900 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
