'use client';

import { Download, Plus, Search, Filter, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface BASTRow {
  id: string;
  bastId: string;
  date: string;
  description: string;
  status: string;
  statusColor: string;
  statusTextColor: string;
  signedBy: string;
  due: string;
  dueColor: string;
  dueTextColor: string;
}

interface BASTTableData {
  title: string;
  subtitle: string;
  rows: BASTRow[];
}

interface BASTTableProps {
  table: BASTTableData;
}

export function BASTTable({ table }: BASTTableProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{table.title}</h2>
          <p className="mt-1 text-sm text-gray-600">{table.subtitle}</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-normal text-gray-900 hover:bg-gray-50">
            <Download className="h-5 w-5" />
            Export XLSX
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-normal text-gray-900 hover:bg-gray-50">
            <Download className="h-5 w-5" />
            Export PDF
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-normal text-white hover:bg-blue-700">
            <Plus className="h-5 w-5" />
            Buat BAST Baru
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3 rounded-lg bg-gray-50 p-3">
        <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2">
          <span className="text-sm font-normal text-gray-900">20</span>
          <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        <div className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2">
          <Search className="inline-block h-5 w-5 text-gray-600" />
          <input
            type="text"
            placeholder="Nama tugas"
            className="ml-2 w-full border-none bg-transparent text-sm text-gray-900 placeholder-gray-500 focus:outline-none"
          />
        </div>

        <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-normal text-gray-900 hover:bg-gray-50">
          All Status
          <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>

        <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-normal text-gray-900 hover:bg-gray-50">
          All Type
          <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>

        <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-normal text-gray-900 hover:bg-gray-50">
          <Filter className="h-4 w-4" />
          Filter
        </button>

        <button className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2">
          <MoreVertical className="h-5 w-5 text-gray-900" />
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
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">BAST</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Description</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Signed By</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Due</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Checkbox />
                </td>
                <td className="px-4 py-3 text-sm font-normal text-gray-900">{row.bastId}</td>
                <td className="px-4 py-3 text-sm font-bold text-gray-900">{row.date}</td>
                <td className="px-4 py-3 text-sm font-bold text-gray-900">{row.description}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-normal ${row.statusColor} ${row.statusTextColor}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-bold text-gray-900">{row.signedBy}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-md px-2 py-1 text-xs font-normal ${row.dueColor} ${row.dueTextColor}`}
                  >
                    {row.due}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
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
    </div>
  );
}
