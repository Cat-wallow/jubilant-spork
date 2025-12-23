'use client';

import { Button } from '@/components/ui/button';
import { Printer, Download, Edit2 } from 'lucide-react';

interface PageHeaderProps {
  sptId: string;
  title: string;
  subtitle: string;
  period: string;
}

export function PageHeader({ sptId, title, subtitle, period }: PageHeaderProps) {
  const handlePrint = () => {
    console.log('Print clicked');
    window.print();
  };

  const handleExport = () => {
    console.log('Export PDF clicked');
  };

  const handleEdit = () => {
    console.log('Edit clicked');
  };

  return (
    <div className="mb-8 space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-gray-600">{sptId}</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">{title}</h1>
          <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
          <p className="mt-2 text-xs text-gray-500">{period}</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="flex items-center gap-2"
          >
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          <Button
            size="sm"
            onClick={handleEdit}
            className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800"
          >
            <Edit2 className="h-4 w-4" />
            Edit SPT
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-blue-200 bg-green-50 p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Status: Submitted</h3>
              <p className="mt-1 text-sm text-gray-700">Auto-filled from KK2 accounting data • Completeness: 100%</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">Rp 125.000.000</p>
            <p className="text-xs text-gray-500">Total Pajak</p>
          </div>
        </div>
      </div>
    </div>
  );
}
