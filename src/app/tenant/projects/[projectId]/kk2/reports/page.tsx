'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatsCards from './components/StatsCards';
import ReportFilters from './components/ReportFilters';
import GeneralLedger from './components/GeneralLedger';
import TrialBalance from './components/TrialBalance';
import Neraca from './components/Neraca';
import LabaRugi from './components/LabaRugi';
import CashFlow from './components/CashFlow';
import PlaceholderTab from './components/PlaceholderTab';
import { statsCards } from './data/mockData';

export default function KK2ReportsPage() {
  return (
    <div className="space-y-8">



          <StatsCards stats={statsCards} />

          <Tabs defaultValue="general-ledger" className="w-full">
            <TabsList className="h-auto w-full justify-start gap-5 rounded-md bg-transparent p-0">
              <TabsTrigger
                value="general-ledger"
                className="rounded-md px-4 py-2 font-public-sans text-sm font-semibold text-[#757575] data-[state=active]:bg-[#F4F7FE] data-[state=active]:text-[#332687]"
              >
                General Ledger
              </TabsTrigger>
              <TabsTrigger
                value="trial-balance"
                className="rounded-md px-4 py-2 font-public-sans text-sm font-semibold text-[#757575] data-[state=active]:bg-[#F4F7FE] data-[state=active]:text-[#332687]"
              >
                Trial Balance
              </TabsTrigger>
              <TabsTrigger
                value="neraca"
                className="rounded-md px-4 py-2 font-public-sans text-sm font-semibold text-[#757575] data-[state=active]:bg-[#F4F7FE] data-[state=active]:text-[#332687]"
              >
                Neraca
              </TabsTrigger>
              <TabsTrigger
                value="laba-rugi"
                className="rounded-md px-4 py-2 font-public-sans text-sm font-semibold text-[#757575] data-[state=active]:bg-[#F4F7FE] data-[state=active]:text-[#332687]"
              >
                Laba-Rugi
              </TabsTrigger>
              <TabsTrigger
                value="cash-flow"
                className="rounded-md px-4 py-2 font-public-sans text-sm font-semibold text-[#757575] data-[state=active]:bg-[#F4F7FE] data-[state=active]:text-[#332687]"
              >
                Cash Flow
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general-ledger" className="mt-8 space-y-5">
              <ReportFilters
                showAddButton
                addButtonText="Tambah Akun"
                onAdd={() => console.log('Add account')}
              />
              <GeneralLedger />
            </TabsContent>

            <TabsContent value="trial-balance" className="mt-8 space-y-5">
              <ReportFilters showAddButton={false} />
              <TrialBalance />
            </TabsContent>

            <TabsContent value="neraca" className="mt-8">
              <Neraca />
            </TabsContent>

            <TabsContent value="laba-rugi" className="mt-8">
              <LabaRugi />
            </TabsContent>

            <TabsContent value="cash-flow" className="mt-8">
              <CashFlow />
            </TabsContent>
          </Tabs>
    </div>
  );
}
