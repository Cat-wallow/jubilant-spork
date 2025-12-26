'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DollarSign,
  Download,
  FileText,
  File,
  Info,
  CheckCircle,
  Send,
} from 'lucide-react';

interface InvoiceData {
  invoiceNumber: string;
  status: string;
  createdDate: string;
  dueDate: string;
  sentDate: string;
  subtotal: number;
  tax: number;
  total: number;
  splitBilling: boolean;
  services: Array<{
    name: string;
    description: string;
    code: string;
    amount: number;
  }>;
  bastReference: {
    number: string;
    client: string;
    representative: string;
    status: string;
    approvedDate: string;
    deliverables: string[];
  };
  history: Array<{
    event: string;
    date: string;
    description?: string;
    type: 'created' | 'approved' | 'sent';
  }>;
}

const mockData: InvoiceData = {
  invoiceNumber: 'INV/2024/001',
  status: 'SENT',
  createdDate: '2024-01-16',
  dueDate: '2024-02-15',
  sentDate: '2024-01-17',
  subtotal: 75000000,
  tax: 8250000,
  total: 83250000,
  splitBilling: false,
  services: [
    {
      name: 'Sistem Informasi Manajemen',
      description: 'Layanan dokumen manajemen sistem',
      code: 'SIM',
      amount: 15000000,
    },
    {
      name: 'Sistem Informasi Akuntansi',
      description: 'Layanan akuntansi manajemen sistem',
      code: 'SIA',
      amount: 25000000,
    },
    {
      name: 'Sistem Informasi Perpajakan',
      description: 'Layanan pajak manajemen sistem',
      code: 'SIP',
      amount: 35000000,
    },
  ],
  bastReference: {
    number: 'BAST/2024/001',
    client: 'PT. Contoh Perusahaan',
    representative: 'Budi Santoso',
    status: 'APPROVED',
    approvedDate: '2024-01-16',
    deliverables: [
      'Dokumentasi Form 1.0 - Compliance System',
      'Sistem KK 1.0 - Transaction Management',
      'Sistem KK 2.0 - General Ledger & Financial Statements',
      'Sistem KK 3.0 - Tax Management & SPT Generation',
    ],
  },
  history: [
    {
      event: 'Invoice Created',
      date: '2024-01-16',
      type: 'created',
    },
    {
      event: 'Invoice Approved',
      date: '2024-01-16',
      description: 'Status updated to approved',
      type: 'approved',
    },
    {
      event: 'Invoice Sent',
      date: '2024-01-17',
      type: 'sent',
    },
  ],
};

export default function InvoiceDetailPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      SENT: 'bg-[#DBEAFE] text-[#193CB8]',
      APPROVED: 'bg-white text-[#0A0A0A]',
      DRAFT: 'bg-gray-100 text-gray-900',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-900';
  };

  const getHistoryIcon = (type: string) => {
    const icons = {
      created: <FileText className="h-4 w-4 text-[#155DFC]" />,
      approved: <CheckCircle className="h-4 w-4 text-[#00A63E]" />,
      sent: <Send className="h-4 w-4 text-[#155DFC]" />,
    };
    return icons[type as keyof typeof icons] || <Info className="h-4 w-4" />;
  };

  const getHistoryBgColor = (type: string) => {
    const colors = {
      created: 'bg-[#F9FAFB]',
      approved: 'bg-[#F0FDF4]',
      sent: 'bg-[#EFF6FF]',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-50';
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Card */}
      <Card className="border-[0.8px] border-black/10 bg-white">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex flex-col">
            <h1 className="font-arial text-2xl font-bold leading-8 text-[#0A0A0A]">
              {mockData.invoiceNumber}
            </h1>
            <p className="font-arial text-base font-normal leading-6 text-[#717182]">
              Created: {mockData.createdDate} • Due: {mockData.dueDate} • Sent: {mockData.sentDate}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p className="font-arial text-2xl font-bold leading-8 text-[#00A63E]">
              {formatCurrency(mockData.total)}
            </p>
            <p className="font-arial text-sm font-normal leading-5 text-[#717182]">Total Amount</p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons Card */}
      <Card className="border-[0.8px] border-black/10 bg-white">
        <CardContent className="flex items-center gap-3 p-6">
          <Button className="gap-4 rounded-lg bg-[#9810FA] px-3 py-2 font-arial text-sm font-normal leading-5 text-white hover:bg-[#9810FA]/90">
            <DollarSign className="h-4 w-4" />
            Mark as Paid
          </Button>
          <Button
            variant="outline"
            className="gap-4 rounded-lg border-[0.8px] border-black/10 bg-white px-3 py-2 font-arial text-sm font-normal leading-5 text-[#0A0A0A] hover:bg-gray-50"
          >
            <Download className="h-4 w-4" />
            Generate Documents
          </Button>
          <Button
            variant="outline"
            className="gap-4 rounded-lg border-[0.8px] border-black/10 bg-white px-3 py-2 font-arial text-sm font-normal leading-5 text-[#0A0A0A] hover:bg-gray-50"
          >
            <FileText className="h-4 w-4" />
            View PDF
          </Button>
          <Button
            variant="outline"
            className="gap-4 rounded-lg border-[0.8px] border-black/10 bg-white px-3 py-2 font-arial text-sm font-normal leading-5 text-[#0A0A0A] hover:bg-gray-50"
          >
            <Download className="h-4 w-4" />
            Download Excel
          </Button>
        </CardContent>
      </Card>

      {/* Information Cards Row */}
      <div className="flex gap-[30px]">
        {/* Invoice Information */}
        <Card className="flex-1 border-[0.8px] border-black/10 bg-white">
          <CardHeader className="gap-[30px] p-6">
            <h2 className="font-arial text-base font-normal leading-6 text-[#0A0A0A]">
              Invoice Information
            </h2>
            <CardContent className="flex flex-col gap-3 p-0">
              <div className="flex items-center justify-between">
                <p className="font-arial text-base font-normal leading-6 text-[#717182]">
                  Invoice Number:
                </p>
                <p className="font-arial text-base font-normal leading-6 text-[#0A0A0A]">
                  {mockData.invoiceNumber}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-arial text-base font-normal leading-6 text-[#717182]">Status:</p>
                <Badge
                  className={`rounded-lg border-[0.8px] border-transparent px-2 py-0.5 font-arial text-xs font-normal leading-4 ${getStatusColor(mockData.status)}`}
                >
                  {mockData.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-arial text-base font-normal leading-6 text-[#717182]">
                  Created Date:
                </p>
                <p className="font-arial text-base font-normal leading-6 text-[#0A0A0A]">
                  {mockData.createdDate}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-arial text-base font-normal leading-6 text-[#717182]">Due Date:</p>
                <p className="font-arial text-base font-normal leading-6 text-[#0A0A0A]">
                  {mockData.dueDate}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-arial text-base font-normal leading-6 text-[#717182]">Sent Date:</p>
                <p className="font-arial text-base font-normal leading-6 text-[#0A0A0A]">
                  {mockData.sentDate}
                </p>
              </div>
            </CardContent>
          </CardHeader>
        </Card>

        {/* Financial Summary */}
        <Card className="flex-1 border-[0.8px] border-black/10 bg-white">
          <CardHeader className="gap-[30px] p-6">
            <h2 className="font-arial text-base font-normal leading-6 text-[#0A0A0A]">
              Financial Summary
            </h2>
            <CardContent className="flex flex-col gap-3 p-0">
              <div className="flex items-center justify-between">
                <p className="font-arial text-base font-normal leading-6 text-[#717182]">Subtotal:</p>
                <p className="font-arial text-base font-normal leading-6 text-[#0A0A0A]">
                  {formatCurrency(mockData.subtotal)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-arial text-base font-normal leading-6 text-[#717182]">Tax:</p>
                <p className="font-arial text-base font-normal leading-6 text-[#0A0A0A]">
                  {formatCurrency(mockData.tax)}
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-black/10 pt-2">
                <p className="font-arial text-lg font-normal leading-7 text-[#0A0A0A]">Total:</p>
                <p className="font-arial text-lg font-normal leading-7 text-[#00A63E]">
                  {formatCurrency(mockData.total)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-arial text-base font-normal leading-6 text-[#717182]">
                  Split Billing:
                </p>
                <p className="font-arial text-base font-normal leading-6 text-[#0A0A0A]">
                  {mockData.splitBilling ? 'Yes' : 'No'}
                </p>
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      </div>

      {/* Service Packages Card */}
      <Card className="border-[0.8px] border-black/10 bg-white">
        <CardHeader className="gap-[30px] p-6">
          <h2 className="font-arial text-base font-normal leading-6 text-[#0A0A0A]">
            Service Packages
          </h2>
          <CardContent className="flex flex-col gap-3 p-0">
            {mockData.services.map((service, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-[10px] border-[0.8px] border-black/10 p-3"
              >
                <div className="flex flex-col">
                  <p className="font-arial text-base font-normal leading-6 text-[#0A0A0A]">
                    {service.name}
                  </p>
                  <p className="font-arial text-sm font-normal leading-5 text-[#717182]">
                    {service.description}
                  </p>
                  <Badge className="mt-2 w-fit rounded-lg border-[0.8px] border-black/10 bg-white px-2 py-0.5 font-arial text-xs font-normal leading-4 text-[#0A0A0A]">
                    {service.code}
                  </Badge>
                </div>
                <p className="font-arial text-base font-normal leading-6 text-[#00A63E]">
                  {formatCurrency(service.amount)}
                </p>
              </div>
            ))}
          </CardContent>
        </CardHeader>
      </Card>

      {/* BAST Reference Card */}
      <Card className="border-[0.8px] border-black/10 bg-white">
        <CardHeader className="gap-[30px] p-6">
          <h2 className="font-arial text-base font-normal leading-6 text-[#0A0A0A]">
            BAST Reference: {mockData.bastReference.number}
          </h2>
          <CardContent className="flex flex-col gap-3 p-0">
            <div className="flex items-center justify-between">
              <p className="font-arial text-base font-normal leading-6 text-[#717182]">Client:</p>
              <p className="font-arial text-base font-normal leading-6 text-[#0A0A0A]">
                {mockData.bastReference.client}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-arial text-base font-normal leading-6 text-[#717182]">
                Representative:
              </p>
              <p className="font-arial text-base font-normal leading-6 text-[#0A0A0A]">
                {mockData.bastReference.representative}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-arial text-base font-normal leading-6 text-[#717182]">Status:</p>
              <Badge className="rounded-lg border-[0.8px] border-black/10 bg-white px-2 py-0.5 font-arial text-xs font-normal leading-4 text-[#0A0A0A]">
                {mockData.bastReference.status}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-arial text-base font-normal leading-6 text-[#717182]">Approved:</p>
              <p className="font-arial text-base font-normal leading-6 text-[#0A0A0A]">
                {mockData.bastReference.approvedDate}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-arial text-base font-normal leading-6 text-[#717182]">
                Deliverables:
              </p>
              <ul className="ml-4 flex flex-col gap-1">
                {mockData.bastReference.deliverables.map((item, index) => (
                  <li key={index} className="font-arial text-sm font-normal leading-5 text-[#0A0A0A]">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </CardHeader>
      </Card>

      {/* Invoice History Card */}
      <Card className="border-[0.8px] border-black/10 bg-white">
        <CardHeader className="gap-[30px] p-6">
          <h2 className="font-arial text-base font-normal leading-6 text-[#0A0A0A]">
            Invoice History
          </h2>
          <CardContent className="flex flex-col gap-3 p-0">
            {mockData.history.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 rounded-[10px] p-3 ${getHistoryBgColor(item.type)}`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DBEAFE]">
                  {getHistoryIcon(item.type)}
                </div>
                <div className="flex flex-col">
                  <p className="font-arial text-base font-normal leading-6 text-[#0A0A0A]">
                    {item.event}
                  </p>
                  {item.description && (
                    <p className="font-arial text-sm font-normal leading-5 text-[#717182]">
                      {item.description}
                    </p>
                  )}
                  {!item.description && (
                    <p className="font-arial text-sm font-normal leading-5 text-[#717182]">
                      {item.date}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
