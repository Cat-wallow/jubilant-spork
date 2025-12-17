import { StatsCards } from './components/StatsCards';
import { FinancialStatements } from './components/FinancialStatements';
import { SidebarWidgets } from './components/SidebarWidgets';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { FileText, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const recentVouchers = [
  { id: 1, type: 'Posted', status: 'Posted', amount: 'Rp 55.500.000', statusColor: 'bg-[#332687] text-white' },
  { id: 2, type: 'Posted', status: 'Posted', amount: 'Rp 110.000.000', statusColor: 'bg-[#332687] text-white' },
  { id: 3, type: 'Ready', status: 'Ready', amount: 'Rp 5.500.000', statusColor: 'bg-gray-100 text-[#030213]' },
  { id: 4, type: 'Draft', status: 'Draft', amount: 'Rp 15.000.000', statusColor: 'bg-gray-100 text-[#030213]' },
];

const topAccounts = [
  { name: 'Bank', balance: 'Rp 55.500.000', type: 'Debit' },
  { name: 'Piutang Dagang', balance: 'Rp 107.500.000', type: 'Debit' },
  { name: 'Piutang PPh 23', balance: 'Rp 2.500.000', type: 'Debit' },
  { name: 'Hutang PPN', balance: 'Rp 15.500.000', type: 'Credit' },
  { name: 'Uang Muka Penjualan', balance: 'Rp 50.000.000', type: 'Credit' },
];

export default function KK2DashboardPage() {
  return (
    <div className="flex items-start gap-[30px] self-stretch">
      <div className="flex flex-1 flex-col gap-6">
        <StatsCards />
        <FinancialStatements />
        
        <div className="flex items-start gap-[30px]">
          <Card className="flex flex-1 flex-col gap-2.5 rounded-[14px] border-[0.8px] border-[#E2E8F0] shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)]">
            <CardHeader className="flex items-center border-b-[0.8px] border-[#E2E8F0] p-6">
              <div className="flex h-8 items-center gap-2">
                <FileText className="h-4 w-4 text-[#009966]" />
                <div className="text-base font-normal leading-4 text-[#0F172B]">Recent Vouchers</div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 p-6">
              {recentVouchers.map((voucher) => (
                <div key={voucher.id} className="flex h-[68px] items-center justify-between rounded-[10px] p-3">
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-[#155DFC]" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge className={`rounded-lg border-0 ${voucher.statusColor}`}>
                      {voucher.status}
                    </Badge>
                    <div className="text-xs font-normal leading-4 text-[#62748E]">{voucher.amount}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="flex flex-1 flex-col gap-2.5 rounded-[14px] border-[0.8px] border-[#E2E8F0] shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)]">
            <CardHeader className="flex items-center border-b-[0.8px] border-[#E2E8F0] p-6">
              <div className="flex h-8 items-center gap-2">
                <BarChart3 className="h-4 w-4 text-[#7F22FE]" />
                <div className="text-base font-normal leading-4 text-[#0F172B]">Top Account Balances</div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 p-6">
              {topAccounts.map((account, idx) => (
                <div key={idx} className="flex h-16 items-center justify-between rounded-[10px]">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-6 w-6 text-[#7F22FE]" />
                    <div className="text-xs font-normal leading-4 text-[#62748E]">{account.name}</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="font-mono text-base font-bold leading-6 text-[#0F172B]">
                      {account.balance}
                    </div>
                    <div className="text-xs font-normal leading-4 text-[#62748E]">{account.type}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <SidebarWidgets />
    </div>
  );
}
