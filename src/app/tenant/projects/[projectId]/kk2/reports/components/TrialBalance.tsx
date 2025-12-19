'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download } from 'lucide-react';
import { trialBalanceAccounts, formatCurrency } from '../data/mockData';

export default function TrialBalance() {
  const totalDebit = trialBalanceAccounts.reduce((sum, acc) => sum + acc.debit, 0);
  const totalCredit = trialBalanceAccounts.reduce((sum, acc) => sum + acc.credit, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-dm text-2xl font-bold leading-8 tracking-tight text-[#2B3674]">
            Trial Balance
          </h2>
          <p className="font-roboto text-xs leading-4 tracking-wide text-[#2B3674]">
            Deskripsi
          </p>
        </div>
        <Button
          variant="outline"
          className="gap-2 rounded-lg border border-[#D9D9D9] px-4 py-3"
        >
          <Download className="h-5 w-5 text-[#404040]" />
          Export XLSX
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-[rgba(0,0,0,0.1)]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(0,0,0,0.1)] bg-white">
              <th className="p-3 text-left font-arial text-sm font-normal text-[#0A0A0A]">
                Account No
              </th>
              <th className="p-3 text-left font-arial text-sm font-normal text-[#0A0A0A]">
                Account Name
              </th>
              <th className="p-3 text-left font-arial text-sm font-normal text-[#0A0A0A]">
                Begining Balance
              </th>
              <th className="p-3 text-right font-arial text-sm font-normal text-[#0A0A0A]">
                Debit
              </th>
              <th className="p-3 text-right font-arial text-sm font-normal text-[#0A0A0A]">
                Credit
              </th>
              <th className="p-3 text-right font-arial text-sm font-normal text-[#0A0A0A]">
                Balance
              </th>
              <th className="p-3 text-left font-arial text-sm font-normal text-[#0A0A0A]">
                Normal Side
              </th>
            </tr>
          </thead>
          <tbody>
            {trialBalanceAccounts.map((account, index) => (
              <tr
                key={index}
                className="border-b border-[rgba(0,0,0,0.1)] last:border-b-0"
              >
                <td className="p-3 font-arial text-sm text-[#0A0A0A]">
                  {account.accountNo}
                </td>
                <td className="p-3 font-arial text-sm text-[#0A0A0A]">
                  {account.accountName}
                </td>
                <td className="p-3 font-arial text-sm text-[#0A0A0A]">
                  {formatCurrency(account.beginningBalance)}
                </td>
                <td className="p-3 text-right font-arial text-sm text-[#0A0A0A]">
                  {account.debit > 0 ? formatCurrency(account.debit) : '-'}
                </td>
                <td className="p-3 text-right font-arial text-sm text-[#0A0A0A]">
                  {account.credit > 0 ? formatCurrency(account.credit) : '-'}
                </td>
                <td className="p-3 text-right font-arial text-sm text-[#0A0A0A]">
                  {formatCurrency(account.balance)}
                </td>
                <td className="p-3">
                  <Badge
                    variant="outline"
                    className="rounded-lg border-[rgba(0,0,0,0.1)]"
                  >
                    {account.normalSide}
                  </Badge>
                </td>
              </tr>
            ))}
            <tr className="border-t-2 border-[#0A0A0A] bg-gray-50">
              <td colSpan={3} className="p-3 font-arial text-sm font-bold text-[#0A0A0A]">
                TOTAL
              </td>
              <td className="p-3 text-right font-arial text-sm font-bold text-[#0A0A0A]">
                {formatCurrency(totalDebit)}
              </td>
              <td className="p-3 text-right font-arial text-sm font-bold text-[#0A0A0A]">
                {formatCurrency(totalCredit)}
              </td>
              <td className="p-3"></td>
              <td className="p-3"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <div className="font-geist text-sm text-[#737373]">
          Showing 1-10 of 100 products
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-white shadow-sm">
            1
          </Button>
          <Button variant="ghost" size="sm">
            2
          </Button>
          <Button variant="ghost" size="sm">
            3
          </Button>
          <Button variant="ghost" size="sm">
            4
          </Button>
          <span className="px-2">...</span>
          <Button variant="ghost" size="sm">
            10
          </Button>
          <Button variant="ghost" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
