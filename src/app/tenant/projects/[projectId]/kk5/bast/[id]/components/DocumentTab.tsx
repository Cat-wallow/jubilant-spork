'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { FileText, File } from 'lucide-react';

interface BASTDocumentData {
  bastNumber: string;
  createdDate: string;
  approvedDate: string;
  totalAmount: number;
}

const mockData: BASTDocumentData = {
  bastNumber: 'BAST/2024/001',
  createdDate: '2024-01-15',
  approvedDate: '2024-01-16',
  totalAmount: 75000000,
};

export default function DocumentTab() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleGeneratePDF = () => {
    console.log('Generating PDF...');
    // PDF generation logic here
  };

  return (
    <div className="flex flex-col gap-[24px]">
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

      {/* Generated Documents Card */}
      <Card className="border-[0.8px] border-black/10 bg-white">
        <CardHeader className="gap-[30px] p-6">
          <h2 className="font-arial text-base font-normal leading-4 text-[#0A0A0A]">
            Generated Documents
          </h2>
          <CardContent className="flex flex-col gap-4 p-0">
            {/* Document Item */}
            <div className="flex items-center justify-between rounded-[10px] border-[0.8px] border-black/10 p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center">
                  <FileText className="h-10 w-10 text-[#E7000B]" strokeWidth={1.67} />
                </div>
                <div className="flex flex-col">
                  <p className="font-arial text-lg font-normal leading-7 text-[#0A0A0A]">
                    BAST Document (PDF)
                  </p>
                  <p className="font-arial text-base font-normal leading-6 text-[#717182]">
                    Official BAST document for client signature
                  </p>
                </div>
              </div>
              <Button
                onClick={handleGeneratePDF}
                className="h-9 rounded-lg bg-[#030213] px-4 font-arial text-sm font-normal leading-5 text-white hover:bg-[#030213]/90"
              >
                Generate PDF
              </Button>
            </div>

            {/* Info Alert */}
            <Alert className="rounded-[10px] border-[0.8px] border-black/10 bg-white p-4">
              <div className="flex items-center gap-3">
                <File className="h-4 w-4 flex-shrink-0 text-[#0A0A0A]" />
                <p className="font-arial text-sm font-normal leading-5 text-[#717182]">
                  Dokumen BAST akan di-generate dalam format PDF standar yang dapat ditandatangani
                  digital atau manual.
                </p>
              </div>
            </Alert>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
