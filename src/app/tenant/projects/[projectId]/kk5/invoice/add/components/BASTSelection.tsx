'use client';

import { FileText, ChevronRight } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface BAST {
  id: string;
  bastId: string;
  client: string;
  person: string;
  services: string[];
  approvedDate: string;
  selected: boolean;
}

interface BASTSelectionProps {
  bastList: BAST[];
  selectedBAST: string[];
  onSelectBAST: (selected: string[]) => void;
  onNext: () => void;
}

export function BASTSelection({
  bastList,
  selectedBAST,
  onSelectBAST,
  onNext,
}: BASTSelectionProps) {
  const handleToggleBAST = (bastId: string) => {
    if (selectedBAST.includes(bastId)) {
      onSelectBAST(selectedBAST.filter((id) => id !== bastId));
    } else {
      onSelectBAST([...selectedBAST, bastId]);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      {/* Header */}
      <div className="mb-6 flex items-start gap-3">
        <FileText className="h-5 w-5 text-gray-900" />
        <div>
          <h2 className="text-base font-normal text-gray-900">Pilih BAST Reference</h2>
          <p className="mt-1 text-sm text-gray-600">
            Pilih BAST yang telah disetujui untuk dibuatkan invoice
          </p>
        </div>
      </div>

      {/* BAST List */}
      <div className="space-y-3">
        <p className="text-sm text-gray-600">
          Ditemukan {bastList.length} BAST yang siap untuk dibuatkan invoice
        </p>

        {bastList.map((bast, index) => (
          <div
            key={bast.id}
            className={`flex items-start gap-3 rounded-2xl border p-4 ${
              selectedBAST.includes(bast.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <Checkbox
              checked={selectedBAST.includes(bast.id)}
              onCheckedChange={() => handleToggleBAST(bast.id)}
              className={selectedBAST.includes(bast.id) ? 'border-gray-900 bg-gray-900' : ''}
            />
            <div className="flex-1">
              <p className="text-base font-normal text-gray-900">{bast.bastId}</p>
              <p className="text-sm text-gray-600">
                {bast.client} • {bast.person}
              </p>
              <div className="mt-2 flex gap-2">
                {bast.services.map((service) => (
                  <span
                    key={service}
                    className="inline-block rounded-lg border border-gray-200 px-2 py-1 text-xs font-normal text-gray-900"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Approved:</p>
              <p className="text-sm font-normal text-gray-900">{bast.approvedDate}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-between">
        <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-normal text-gray-900 hover:bg-gray-50">
          Sebelumnya
        </button>
        <div className="flex gap-4">
          <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-normal text-gray-900 hover:bg-gray-50">
            Batal
          </button>
          <button
            onClick={onNext}
            disabled={selectedBAST.length === 0}
            className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-normal text-white hover:bg-gray-800 disabled:opacity-50"
          >
            Selanjutnya
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
