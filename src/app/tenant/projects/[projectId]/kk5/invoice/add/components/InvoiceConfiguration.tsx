'use client';

import { ChevronLeft, Save } from 'lucide-react';

interface InvoiceConfigurationProps {
  selectedBAST: string[];
  onPrevious: () => void;
}

export function InvoiceConfiguration({
  selectedBAST,
  onPrevious,
}: InvoiceConfigurationProps) {
  const handleSubmit = () => {
    // Handle invoice creation
    console.log('Creating invoice for BAST:', selectedBAST);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-base font-normal text-gray-900">Konfigurasi & Finalisasi Invoice</h2>
        <p className="mt-1 text-sm text-gray-600">
          Atur detail invoice dan finalisasi pembuatan
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-normal text-gray-900">
            Nomor Invoice
          </label>
          <input
            type="text"
            placeholder="Auto-generate"
            disabled
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-normal text-gray-900">
            Tanggal Invoice
          </label>
          <input
            type="date"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-normal text-gray-900">
            Tanggal Jatuh Tempo
          </label>
          <input
            type="date"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-normal text-gray-900">
            Termin Pembayaran
          </label>
          <select className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900">
            <option>Pilih termin pembayaran</option>
            <option>Termin 1 (20%)</option>
            <option>Termin 2 (30%)</option>
            <option>Termin 3 (25%)</option>
            <option>Termin 4 (20%)</option>
            <option>Termin 5 (5%)</option>
            <option>Full Payment (100%)</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-normal text-gray-900">
            Catatan
          </label>
          <textarea
            rows={4}
            placeholder="Tambahkan catatan untuk invoice..."
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-normal text-gray-900 hover:bg-gray-50"
        >
          <ChevronLeft className="h-4 w-4" />
          Sebelumnya
        </button>
        <div className="flex gap-4">
          <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-normal text-gray-900 hover:bg-gray-50">
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-normal text-white hover:bg-gray-800"
          >
            <Save className="h-4 w-4" />
            Buat Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
