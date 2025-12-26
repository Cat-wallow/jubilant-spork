'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Users, Package, Calendar, CheckCircle } from 'lucide-react';

interface BASTData {
  bastNumber: string;
  createdDate: string;
  approvedDate: string;
  totalAmount: number;
  client: {
    company: string;
    representative: string;
  };
  consultant: {
    representative: string;
    projectId: string;
  };
  services: Array<{
    name: string;
    description: string;
    code: string;
    amount: number;
  }>;
  deliverables: string[];
  timeline: Array<{
    status: string;
    date: string;
    color: string;
  }>;
  workflow: Array<{
    title: string;
    description: string;
    completed: boolean;
  }>;
}

const mockData: BASTData = {
  bastNumber: 'BAST/2024/001',
  createdDate: '2024-01-15',
  approvedDate: '2024-01-16',
  totalAmount: 75000000,
  client: {
    company: 'PT. Contoh Perusahaan',
    representative: 'Budi Santoso',
  },
  consultant: {
    representative: 'Dr. Ahmad Wijaya',
    projectId: 'proj-001',
  },
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
  deliverables: [
    'Dokumentasi Form 1.0 - Compliance System',
    'Sistem KK 1.0 - Transaction Management',
    'Sistem KK 2.0 - General Ledger & Financial Statements',
    'Sistem KK 3.0 - Tax Management & SPT Generation',
  ],
  timeline: [
    { status: 'BAST Created', date: '2024-01-15', color: 'blue' },
    { status: 'BAST Approved', date: '2024-01-16', color: 'green' },
  ],
  workflow: [
    { title: 'QC Checklist Complete', description: 'All quality checks passed', completed: true },
    { title: 'PMO Review', description: 'Project Manager approval', completed: true },
    { title: 'BAST Approval', description: 'Final document approval', completed: true },
  ],
};

export default function OverviewTab() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex flex-col gap-[10px]">
      {/* Header Card */}
      <Card className="border-[0.8px] border-black/10 bg-white">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex flex-col gap-0">
            <h1 className="font-arial text-xl font-bold leading-8 text-[#0A0A0A]">
              {mockData.bastNumber}
            </h1>
            <p className="font-arial text-base font-normal leading-6 text-[#717182]">
              Created: {mockData.createdDate} • Approved: {mockData.approvedDate}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p className="font-arial text-2xl font-bold leading-8 text-[#008236]">
              {formatCurrency(mockData.totalAmount)}
            </p>
            <p className="font-arial text-sm font-normal leading-5 text-[#717182]">Total Nilai BAST</p>
          </div>
        </CardContent>
      </Card>

      {/* Client & Consultant Cards */}
      <div className="flex gap-[10px]">
        {/* Client Info */}
        <Card className="flex-1 border-[0.8px] border-black/10 bg-white">
          <CardHeader className="gap-[30px] p-6">
            <div className="flex items-start gap-2">
              <Users className="h-5 w-5 text-[#0A0A0A]" />
              <h2 className="font-arial text-base font-bold leading-4 text-[#0A0A0A]">
                Informasi Klien
              </h2>
            </div>
            <CardContent className="flex flex-col gap-4 p-0">
              <div className="flex flex-col gap-1">
                <p className="font-arial text-sm font-normal leading-5 text-[#717182]">
                  Nama Perusahaan
                </p>
                <p className="font-arial text-lg font-normal leading-7 text-[#0A0A0A]">
                  {mockData.client.company}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-arial text-sm font-normal leading-5 text-[#717182]">Perwakilan</p>
                <p className="font-arial text-lg font-normal leading-7 text-[#0A0A0A]">
                  {mockData.client.representative}
                </p>
              </div>
            </CardContent>
          </CardHeader>
        </Card>

        {/* Consultant Info */}
        <Card className="flex-1 border-[0.8px] border-black/10 bg-white">
          <CardHeader className="gap-[30px] p-6">
            <div className="flex items-start gap-2">
              <Users className="h-5 w-5 text-[#0A0A0A]" />
              <h2 className="font-arial text-base font-bold leading-4 text-[#0A0A0A]">
                Informasi Konsultan
              </h2>
            </div>
            <CardContent className="flex flex-col gap-4 p-0">
              <div className="flex flex-col gap-1">
                <p className="font-arial text-sm font-normal leading-5 text-[#717182]">Perwakilan</p>
                <p className="font-arial text-lg font-normal leading-7 text-[#0A0A0A]">
                  {mockData.consultant.representative}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-arial text-sm font-normal leading-5 text-[#717182]">Project ID</p>
                <p className="font-arial text-lg font-normal leading-7 text-[#0A0A0A]">
                  {mockData.consultant.projectId}
                </p>
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      </div>

      {/* Services Card */}
      <Card className="border-[0.8px] border-black/10 bg-white">
        <CardHeader className="gap-[30px] p-6">
          <div className="flex items-start gap-2">
            <Package className="h-5 w-5 text-[#0A0A0A]" />
            <h2 className="font-arial text-base font-bold leading-4 text-[#0A0A0A]">
              Layanan yang Diserahterimakan
            </h2>
          </div>
          <CardContent className="flex flex-col gap-6 p-0">
            <div className="flex flex-col gap-3">
              {mockData.services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-[10px] border-[0.8px] border-black/10 p-3"
                >
                  <div className="flex flex-col">
                    <p className="font-arial text-lg font-normal leading-7 text-[#0A0A0A]">
                      {service.name}
                    </p>
                    <p className="font-arial text-base font-normal leading-6 text-[#717182]">
                      {service.description}
                    </p>
                    <Badge className="mt-2 w-fit rounded-lg border-[0.8px] border-black/10 bg-white px-2 py-0.5 font-arial text-xs font-normal leading-4 text-[#0A0A0A]">
                      {service.code}
                    </Badge>
                  </div>
                  <p className="font-arial text-base font-bold leading-6 text-[#00A63E]">
                    {formatCurrency(service.amount)}
                  </p>
                </div>
              ))}
            </div>
            <div className="rounded-[10px] bg-[#F0FDF4] p-4">
              <div className="flex items-center justify-between">
                <p className="font-arial text-base font-bold leading-6 text-[#016630]">
                  Total Nilai BAST
                </p>
                <p className="font-arial text-2xl font-bold leading-8 text-[#008236]">
                  {formatCurrency(mockData.totalAmount)}
                </p>
              </div>
            </div>
          </CardContent>
        </CardHeader>
      </Card>

      {/* Deliverables Card */}
      <Card className="border-[0.8px] border-black/10 bg-white">
        <CardHeader className="gap-6 p-6">
          <div>
            <h2 className="font-arial text-base font-normal leading-4 text-[#0A0A0A]">
              Daftar Deliverables
            </h2>
            <p className="mt-[6px] font-arial text-base font-normal leading-6 text-[#717182]">
              Dokumen dan layanan yang diserahterimakan kepada klien
            </p>
          </div>
          <CardContent className="flex flex-col gap-3 p-0">
            {mockData.deliverables.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-[10px] border-[0.8px] border-black/10 p-4"
              >
                <CheckCircle className="h-6 w-6 text-[#00A63E]" />
                <p className="font-arial text-lg font-normal leading-7 text-[#0A0A0A]">{item}</p>
                <Badge className="ml-auto rounded-lg border-[0.8px] border-black/10 bg-[#F0FDF4] px-2 py-0.5 font-arial text-xs font-normal leading-4 text-[#008236]">
                  Completed
                </Badge>
              </div>
            ))}
          </CardContent>
        </CardHeader>
      </Card>

      {/* Timeline & Workflow */}
      <div className="flex gap-[10px]">
        {/* Timeline */}
        <Card className="flex-1 border-[0.8px] border-black/10 bg-white">
          <CardHeader className="gap-[30px] p-6">
            <div className="flex items-start gap-2">
              <Calendar className="h-5 w-5 text-[#0A0A0A]" />
              <h2 className="font-arial text-base font-normal leading-4 text-[#0A0A0A]">
                Timeline & Status
              </h2>
            </div>
            <CardContent className="flex flex-col gap-4 p-0">
              {mockData.timeline.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div
                    className={`h-3 w-3 rounded-full ${item.color === 'blue' ? 'bg-[#2B7FFF]' : 'bg-[#00C950]'}`}
                  />
                  <div className="flex flex-col">
                    <p className="font-arial text-base font-normal leading-6 text-[#0A0A0A]">
                      {item.status}
                    </p>
                    <p className="font-arial text-sm font-normal leading-5 text-[#717182]">
                      {item.date}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </CardHeader>
        </Card>

        {/* Workflow */}
        <Card className="flex-1 border-[0.8px] border-black/10 bg-white">
          <CardHeader className="gap-[30px] p-6">
            <h2 className="font-arial text-base font-normal leading-4 text-[#0A0A0A]">
              Workflow Approval
            </h2>
            <CardContent className="flex flex-col gap-6 p-0">
              {mockData.workflow.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DCFCE7]">
                    <CheckCircle className="h-5 w-5 text-[#00A63E]" />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-arial text-base font-normal leading-6 text-[#0A0A0A]">
                      {item.title}
                    </p>
                    <p className="font-arial text-sm font-normal leading-5 text-[#717182]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
