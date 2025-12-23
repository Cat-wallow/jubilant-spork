'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FileText, Receipt, DollarSign, Users, Share2, Clock, Flag, Calendar, Eye, Edit } from 'lucide-react';
import { StatusOverview } from './components/StatusOverview';
import { TransactionInfo } from './components/TransactionInfo';
import { FinancialBreakdown } from './components/FinancialBreakdown';
import { ApprovalWorkflow } from './components/ApprovalWorkflow';
import { IntegrationStatus } from './components/IntegrationStatus';
import { DocumentsSection } from './components/DocumentsSection';
import { ActivityTimeline } from './components/ActivityTimeline';

const mockData = {
  transactionId: 'TRX-001',
  referenceNumber: 'TXN-TRX-001',
  title: 'Detail Transaksi: TRX-2024-001',
  description: 'Lihat detail lengkap transaksi termasuk status, informasi keuangan, dan dokumen terkait.',
  
  status: {
    transaction: 'Approved',
    vouching: 'OK',
    processing: 'KK1 Complete',
    integration: 'Synced',
  },
  
  processingPipeline: [
    { name: 'KK1 Recorded', completed: true },
    { name: 'KK2 Journaled', completed: true },
    { name: 'KK3 Tax Computed', completed: true },
    { name: 'KK4 QC Pending', completed: false, pending: true },
  ],
  
  systemFlags: 'No Issues Detected',
  
  transactionInfo: {
    transactionId: 'TRX-001',
    referenceNumber: 'TXN-TRX-001',
    transactionDate: '2024-03-15',
    dueDate: '2/11/2025',
    counterparty: {
      name: 'PT. ABC Corp',
      npwp: '12.345.678.9-012.345',
    },
    transactionType: ['Sales', 'Operasional'],
    division: 'Marketing',
    department: 'Sales',
    billType: 'Total',
    paymentTerms: 'NET 30',
  },
  
  financial: {
    totalAmount: 50000000,
    baseAmount: 42500000,
    currency: 'IDR',
    taxes: {
      ppn11: 5000000,
      pph21: 0,
      pph23: 2500000,
      pph42: 0,
    },
    totalTaxImpact: 7500000,
  },
  
  approval: {
    initiator: {
      name: 'Staff A',
      role: 'Finance Staff',
      date: '2024-03-15',
    },
    reviewer: {
      name: 'Finance Manager',
      status: 'Approved',
      date: '4/10/2025',
    },
    finalApprover: {
      name: 'Not Required',
      status: 'Auto Approved',
      date: '-',
    },
    authMatrix: 'Transaction amount: Rp 50.000.000 | Required approval level: Auto | Risk category: Standard',
  },
  
  integration: {
    modules: [
      { name: 'KK2 - General Ledger', status: 'Synced', synced: true },
      { name: 'KK3 - Tax Calculation', status: 'Computed', synced: true },
      { name: 'KK4 - Quality Control', status: 'Pending', pending: true },
      { name: 'KK5 - BAST/Invoice', status: 'Not Started', notStarted: true },
    ],
    generatedEntries: [
      {
        title: 'Journal Entry: JE-RX-001',
        details: [
          'Dr. Expenses Rp 42.500.000',
          'Dr. PPN Masukan Rp 5.000.000',
          'Cr. Accounts Payable Rp 50.000.000',
        ],
      },
      {
        title: 'Tax Computation: TX-RX-001',
        details: [
          'PPN Masukan: Rp 5.000.000',
          'PPh 23 Dipotong: Rp 2.500.000',
        ],
      },
    ],
  },
  
  documents: {
    supporting: [
      {
        id: 'INV-2024-001',
        type: 'Invoice/Bill',
      },
    ],
    systemGenerated: [
      {
        id: 'Transaction Receipt',
        status: 'Auto-generated',
        type: 'receipt',
      },
      {
        id: 'Journal Voucher',
        code: 'JV-RX-001',
        type: 'journal',
      },
      {
        id: 'Tax Computation',
        code: 'TC-RX-001',
        type: 'tax',
      },
    ],
  },
  
  timeline: [
    {
      title: 'Transaction Created',
      description: 'Initial transaction recorded by Staff A',
      date: '2024-03-15 • Version 1.0',
      status: 'current',
      completed: true,
    },
    {
      title: 'Validation Completed',
      description: 'System validation and data integrity checks passed',
      date: '3/10/2025, 10.27.46 • System Auto',
      completed: true,
    },
    {
      title: 'KK2 Integration',
      description: 'Journal entry created and posted to GL',
      date: '3/10/2025, 11.27.46 • System Auto',
      completed: true,
    },
    {
      title: 'Pending QC Review',
      description: 'Awaiting quality control validation in KK4',
      date: 'Expected completion in 2-3 business days',
      pending: true,
    },
  ],
  
  lastSync: '3/10/2025, 09.22.46',
  transactionHash: 'TRX-001...TRX-001',
};

export default function TransactionDetailPage({
  params,
}: {
  params: { projectId: string; documentId: string };
}) {
  return (
    <div className="container mx-auto max-w-6xl space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-card p-6 shadow-lg">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              <h1 className="text-lg font-bold text-gray-900 md:text-xl">
                {mockData.title}
              </h1>
            </div>
            <p className="text-sm text-gray-600 md:text-base">
              {mockData.description}
            </p>
          </div>
          <Button variant="ghost" size="icon" className="shrink-0">
            <span className="sr-only">Close</span>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.33}
                d="M12 4L4 12M4 4l8 8"
              />
            </svg>
          </Button>
        </div>

        <div className="space-y-6">
          <StatusOverview
            status={mockData.status}
            pipeline={mockData.processingPipeline}
            systemFlags={mockData.systemFlags}
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <TransactionInfo info={mockData.transactionInfo} />
            <FinancialBreakdown financial={mockData.financial} />
          </div>

          <ApprovalWorkflow approval={mockData.approval} />

          <IntegrationStatus integration={mockData.integration} />

          <DocumentsSection documents={mockData.documents} />

          <ActivityTimeline
            timeline={mockData.timeline}
            lastSync={mockData.lastSync}
            transactionHash={mockData.transactionHash}
          />
        </div>
      </div>
    </div>
  );
}
