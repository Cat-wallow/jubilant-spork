'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, TrendingUp, TrendingDown, DollarSign, Building2, X, AlertTriangle } from 'lucide-react';
import { balanceSheetData, formatCurrency } from '../data/mockData';

export default function Neraca() {
  const data = balanceSheetData;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-[#0A0A0A]" />
          <h2 className="font-arial text-lg font-normal text-[#0A0A0A]">
            Neraca (Balance Sheet)
          </h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="rounded-lg border border-[rgba(0,0,0,0.1)]"
        >
          <X className="mr-1 h-4 w-4" />
          Tutup
        </Button>
      </div>

      {/* Main Card */}
      <div className="space-y-6 rounded-[14px] border border-[rgba(0,0,0,0.1)] p-6">
        {/* Card Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-[#0A0A0A]" />
            <span className="font-arial text-base text-[#0A0A0A]">
              Neraca (Balance Sheet)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="destructive"
              className="gap-2 rounded-lg border-0 bg-gradient-to-r from-red-500 to-red-600"
            >
              <TrendingUp className="h-3 w-3" />
              Unbalanced
            </Badge>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 rounded-lg border border-[rgba(0,0,0,0.1)]"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 rounded-lg border border-[rgba(0,0,0,0.1)]"
            >
              <FileText className="h-4 w-4" />
              Print
            </Button>
          </div>
        </div>

        {/* Company Header */}
        <div className="space-y-1 text-center">
          <h1 className="font-arial text-xl font-bold text-[#0A0A0A]">
            {data.companyName}
          </h1>
          <h2 className="font-arial text-lg font-bold text-[#0A0A0A]">NERACA</h2>
          <p className="font-arial text-sm text-[#717182]">{data.reportDate}</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Total Aktiva */}
          <div className="rounded-[14px] border border-[rgba(0,0,0,0.1)] p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-arial text-sm text-[#717182]">Total Aktiva</p>
                <p className="font-arial text-lg font-bold text-[#0A0A0A]">
                  {formatCurrency(data.totalAktiva)}
                </p>
              </div>
              <div className="rounded-full bg-blue-50 p-2">
                <DollarSign className="h-6 w-6 text-[#2B7FFF]" />
              </div>
            </div>
          </div>

          {/* Total Kewajiban */}
          <div className="rounded-[14px] border border-[rgba(0,0,0,0.1)] p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-arial text-sm text-[#717182]">Total Kewajiban</p>
                <p className="font-arial text-lg font-bold text-[#0A0A0A]">
                  {formatCurrency(data.kewajiban.total)}
                </p>
              </div>
              <div className="rounded-full bg-red-50 p-2">
                <TrendingDown className="h-6 w-6 text-[#FB2C36]" />
              </div>
            </div>
          </div>

          {/* Total Modal */}
          <div className="rounded-[14px] border border-[rgba(0,0,0,0.1)] p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-arial text-sm text-[#717182]">Total Modal</p>
                <p className="font-arial text-lg font-bold text-[#0A0A0A]">
                  {formatCurrency(data.modal.total)}
                </p>
              </div>
              <div className="rounded-full bg-green-50 p-2">
                <TrendingUp className="h-6 w-6 text-[#00C950]" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* AKTIVA Column */}
          <div className="space-y-6 rounded-[14px] border border-[rgba(0,0,0,0.1)] p-6">
            <h3 className="font-arial text-base font-normal text-[#0A0A0A]">AKTIVA</h3>

            <div className="space-y-4">
              {/* AKTIVA LANCAR */}
              <div className="space-y-1">
                <div className="rounded border-y border-[rgba(0,0,0,0.1)] py-2">
                  <p className="font-arial text-base font-bold text-[#0A0A0A]">
                    {data.aktiva.lancar.title}
                  </p>
                </div>

                {data.aktiva.lancar.accounts.map((account, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <span className="font-arial text-sm text-[#717182]">
                        {account.accountNo}
                      </span>
                      <span className="font-arial text-base text-[#0A0A0A]">
                        {account.accountName}
                      </span>
                    </div>
                    <span className="font-arial text-base text-[#0A0A0A]">
                      {formatCurrency(account.amount)}
                    </span>
                  </div>
                ))}

                <div className="rounded border-y border-[rgba(0,0,0,0.1)] py-2">
                  <div className="flex items-center justify-between">
                    <p className="font-arial text-base font-bold text-[#0A0A0A]">
                      Total Aktiva Lancar
                    </p>
                    <p className="font-arial text-base font-bold text-[#0A0A0A]">
                      {formatCurrency(data.aktiva.lancar.total)}
                    </p>
                  </div>
                </div>
              </div>

              {/* AKTIVA TETAP */}
              <div className="space-y-1">
                {data.aktiva.tetap.accounts.map((account, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <span className="font-arial text-sm text-[#717182]">
                        {account.accountNo}
                      </span>
                      <span className="font-arial text-base text-[#0A0A0A]">
                        {account.accountName}
                      </span>
                    </div>
                    <span className="font-arial text-base text-[#0A0A0A]">
                      {formatCurrency(account.amount)}
                    </span>
                  </div>
                ))}

                <div className="rounded border-y border-[rgba(0,0,0,0.1)] py-2">
                  <p className="font-arial text-base font-bold text-[#0A0A0A]">
                    {data.aktiva.tetap.title}
                  </p>
                </div>
              </div>

              {/* TOTAL AKTIVA */}
              <div className="border-t-2 border-[#D1D5DC] pt-2">
                <div className="flex items-center justify-between">
                  <p className="font-arial text-lg font-bold text-[#0A0A0A]">
                    TOTAL AKTIVA
                  </p>
                  <p className="font-arial text-lg font-bold text-[#0A0A0A]">
                    {formatCurrency(data.totalAktiva)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* KEWAJIBAN & MODAL Column */}
          <div className="space-y-6 rounded-[14px] border border-[rgba(0,0,0,0.1)] p-6">
            <h3 className="font-arial text-base font-normal text-[#0A0A0A]">
              KEWAJIBAN & MODAL
            </h3>

            <div className="space-y-4">
              {/* KEWAJIBAN */}
              <div className="space-y-1">
                <div className="rounded border-y border-[rgba(0,0,0,0.1)] py-2">
                  <p className="font-arial text-base font-bold text-[#0A0A0A]">
                    KEWAJIBAN
                  </p>
                </div>

                {data.kewajiban.accounts.map((account, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <span className="font-arial text-sm text-[#717182]">
                        {account.accountNo}
                      </span>
                      <span className="font-arial text-base text-[#0A0A0A]">
                        {account.accountName}
                      </span>
                    </div>
                    <span className="font-arial text-base text-[#0A0A0A]">
                      {formatCurrency(account.amount)}
                    </span>
                  </div>
                ))}

                <div className="rounded border-t border-[#E5E7EB] py-2">
                  <div className="flex items-center justify-between">
                    <p className="font-arial text-base font-bold text-[#0A0A0A]">
                      Total Kewajiban
                    </p>
                    <p className="font-arial text-base font-bold text-[#0A0A0A]">
                      {formatCurrency(data.kewajiban.total)}
                    </p>
                  </div>
                </div>
              </div>

              {/* MODAL */}
              <div className="space-y-4">
                <div className="rounded border-y border-[rgba(0,0,0,0.1)] py-2">
                  <p className="font-arial text-base font-bold text-[#0A0A0A]">MODAL</p>
                </div>

                <div className="rounded border-t border-[#E5E7EB] py-2">
                  <div className="flex items-center justify-between">
                    <p className="font-arial text-base font-bold text-[#0A0A0A]">
                      Total Modal
                    </p>
                    <p className="font-arial text-base font-bold text-[#0A0A0A]">
                      {formatCurrency(data.modal.total)}
                    </p>
                  </div>
                </div>
              </div>

              {/* TOTAL KEWAJIBAN & MODAL */}
              <div className="border-t-2 border-[#D1D5DC] pt-2">
                <div className="flex items-center justify-between">
                  <p className="font-arial text-lg font-bold text-[#0A0A0A]">
                    TOTAL KEWAJIBAN & MODAL
                  </p>
                  <p className="font-arial text-lg font-bold text-[#0A0A0A]">
                    {formatCurrency(data.totalKewajibanModal)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Alert - Unbalanced */}
        {!data.isBalanced && (
          <div className="flex items-center justify-between rounded-[14px] border-l-4 border-[#FB2C36] bg-red-50 p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-[#FB2C36]" />
              <span className="font-arial text-base font-bold text-[#0A0A0A]">
                Neraca Tidak Seimbang
              </span>
            </div>
            <div className="text-right">
              <p className="font-arial text-sm text-[#717182]">Selisih:</p>
              <p className="font-arial text-base font-bold text-[#E7000B]">
                {formatCurrency(data.difference)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
