'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatsCards from './components/StatsCards';
import ReportFilters from './components/ReportFilters';
import GeneralLedger from './components/GeneralLedger';
import TrialBalance from './components/TrialBalance';
import Neraca from './components/Neraca';
import PlaceholderTab from './components/PlaceholderTab';
import { statsCards } from './data/mockData';

export default function KK2ReportsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <p className="font-dm text-sm font-medium leading-6 text-[#707EAE]">KK 2.0</p>
        <h1 className="font-dm text-[34px] font-bold leading-[42px] tracking-tight text-[#0B1437]">
          Kelola KK 2.0 (Manajemen Akuntansi)
        </h1>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="h-auto w-full justify-start gap-5 rounded-md bg-transparent p-0">
          <TabsTrigger
            value="dashboard"
            className="rounded-md px-4 py-2 font-public-sans text-sm font-semibold text-[#757575] data-[state=active]:bg-[#F4F7FE] data-[state=active]:text-[#332687]"
          >
            Dashboard
          </TabsTrigger>
          <TabsTrigger
            value="voucher-list"
            className="rounded-md px-4 py-2 font-public-sans text-sm font-semibold text-[#757575] data-[state=active]:bg-[#F4F7FE] data-[state=active]:text-[#332687]"
          >
            Voucher List
          </TabsTrigger>
          <TabsTrigger
            value="journal"
            className="rounded-md px-4 py-2 font-public-sans text-sm font-semibold text-[#757575] data-[state=active]:bg-[#F4F7FE] data-[state=active]:text-[#332687]"
          >
            Journal
          </TabsTrigger>
          <TabsTrigger
            value="chart-of-accounts"
            className="rounded-md px-4 py-2 font-public-sans text-sm font-semibold text-[#757575] data-[state=active]:bg-[#F4F7FE] data-[state=active]:text-[#332687]"
          >
            Chart of Accounts
          </TabsTrigger>
          <TabsTrigger
            value="report"
            className="rounded-md px-4 py-2 font-public-sans text-sm font-semibold text-[#757575] data-[state=active]:bg-[#F4F7FE] data-[state=active]:text-[#332687]"
          >
            Report
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-8">
          <PlaceholderTab
            title="Dashboard"
            description="Dashboard view with analytics and overview"
          />
        </TabsContent>

        <TabsContent value="voucher-list" className="mt-8">
          <PlaceholderTab
            title="Voucher List"
            description="List of all vouchers and transactions"
          />
        </TabsContent>

        <TabsContent value="journal" className="mt-8">
          <PlaceholderTab
            title="Journal"
            description="Journal entries and transactions"
          />
        </TabsContent>

        <TabsContent value="chart-of-accounts" className="mt-8">
          <PlaceholderTab
            title="Chart of Accounts"
            description="Manage your chart of accounts"
          />
        </TabsContent>

        <TabsContent value="report" className="mt-8 space-y-8">
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
              <PlaceholderTab
                title="Laba-Rugi"
                description="Profit and loss statement"
              />
            </TabsContent>

            <TabsContent value="cash-flow" className="mt-8">
              <PlaceholderTab
                title="Cash Flow"
                description="Cash flow statement"
              />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
