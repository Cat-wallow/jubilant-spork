'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, ChevronRight, Receipt } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface InvoiceConfigurationProps {
  selectedBAST?: string[];
  onPrevious?: () => void;
  onNext?: () => void;
}

interface ServiceItem {
  name: string;
  description: string;
  code: string;
  amount: number;
  selected: boolean;
}

const mockServices: ServiceItem[] = [
  {
    name: 'Sistem Informasi Manajemen',
    description: 'Layanan dokumen manajemen sistem',
    code: 'SIM',
    amount: 15000000,
    selected: true,
  },
  {
    name: 'Sistem Informasi Akuntansi',
    description: 'Layanan akuntansi manajemen sistem',
    code: 'SIA',
    amount: 25000000,
    selected: true,
  },
];

export function InvoiceConfiguration({
  selectedBAST,
  onPrevious,
  onNext,
}: InvoiceConfigurationProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const subtotal = mockServices
    .filter((s) => s.selected)
    .reduce((sum, service) => sum + service.amount, 0);
  const taxRate = 0.11;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className="flex flex-col gap-6">
      {/* Service Configuration Card */}
      <Card className="border-[0.8px] border-black/10 bg-white">
        <CardHeader className="gap-6 p-6">
          <div className="flex flex-col gap-[6px]">
            <div className="flex items-start gap-2">
              <Receipt className="h-5 w-5 text-[#0A0A0A]" />
              <h2 className="font-arial text-base font-normal leading-4 text-[#0A0A0A]">
                Konfigurasi Layanan
              </h2>
            </div>
            <p className="font-arial text-sm font-normal leading-5 text-[#717182]">
              Pilih layanan yang akan ditagihkan dalam invoice ini
            </p>
          </div>

          <CardContent className="flex flex-col gap-6 p-0">
            {/* BAST Reference Info */}
            <div className="flex flex-col gap-2 rounded-[10px] bg-[#F9FAFB] p-4">
              <h3 className="font-arial text-base font-normal leading-6 text-[#0A0A0A]">
                BAST Reference: BAST/2024/008
              </h3>
              <p className="font-arial text-sm font-normal leading-5 text-[#717182]">
                PT. Digital Prima Solutions • Approved: 2024-03-01
              </p>
            </div>

            {/* Services List */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="font-arial text-base font-normal leading-6 text-[#0A0A0A]">
                  Layanan Tersedia
                </h3>
                <div className="flex items-center gap-2">
                  <Checkbox id="split-billing" />
                  <Label
                    htmlFor="split-billing"
                    className="font-arial text-sm font-normal leading-5 text-[#0A0A0A]"
                  >
                    Split Billing (Invoice terpisah per layanan)
                  </Label>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {mockServices.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-[14px] border-[0.8px] border-[#00C950] bg-[#F0FDF4] p-4"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox checked={service.selected} className="h-4 w-4" />
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
                    </div>
                    <p className="font-arial text-base font-normal leading-6 text-[#00A63E]">
                      {formatCurrency(service.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview Calculation */}
            <div className="flex flex-col gap-2 rounded-[10px] bg-[#F0FDF4] p-4">
              <h3 className="font-arial text-base font-normal leading-6 text-[#016630]">
                Preview Perhitungan
              </h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="font-arial text-sm font-normal leading-5 text-[#0A0A0A]">
                    Subtotal (2 layanan):
                  </p>
                  <p className="font-arial text-sm font-normal leading-5 text-[#0A0A0A]">
                    {formatCurrency(subtotal)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-arial text-sm font-normal leading-5 text-[#0A0A0A]">PPN 11%:</p>
                  <p className="font-arial text-sm font-normal leading-5 text-[#0A0A0A]">
                    {formatCurrency(tax)}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-black/10 pt-2">
                  <p className="font-arial text-sm font-normal leading-5 text-[#016630]">Total:</p>
                  <p className="font-arial text-sm font-normal leading-5 text-[#016630]">
                    {formatCurrency(total)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </CardHeader>
      </Card>

      {/* Finalization Card */}
      <Card className="border-[0.8px] border-black/10 bg-white">
        <CardHeader className="gap-[30px] p-6">
          <h2 className="font-arial text-base font-normal leading-4 text-[#0A0A0A]">
            Finalisasi Invoice
          </h2>
          <CardContent className="flex flex-col gap-6 p-0">
            {/* Form Section */}
            <div className="flex items-start justify-between gap-6">
              {/* Left Column - Form Fields */}
              <div className="flex flex-1 flex-col gap-4">
                <div className="flex flex-col gap-0">
                  <Label className="mb-0 font-arial text-sm font-normal leading-[14px] text-[#0A0A0A]">
                    Tax Rate (%)
                  </Label>
                  <Select defaultValue="11">
                    <SelectTrigger className="h-9 rounded-lg border-[0.8px] border-transparent bg-[#F3F3F5] font-arial text-sm font-normal leading-5 text-[#0A0A0A]">
                      <SelectValue placeholder="Select tax rate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="11">11% (PPN)</SelectItem>
                      <SelectItem value="0">0% (No Tax)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-0">
                  <Label className="mb-0 font-arial text-sm font-normal leading-[14px] text-[#0A0A0A]">
                    Payment Terms (Days)
                  </Label>
                  <Select defaultValue="30">
                    <SelectTrigger className="h-9 rounded-lg border-[0.8px] border-transparent bg-[#F3F3F5] font-arial text-sm font-normal leading-5 text-[#0A0A0A]">
                      <SelectValue placeholder="Select payment terms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 Days</SelectItem>
                      <SelectItem value="15">15 Days</SelectItem>
                      <SelectItem value="45">45 Days</SelectItem>
                      <SelectItem value="60">60 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Right Column - Summary */}
              <div className="flex flex-1 flex-col gap-4 rounded-[10px] bg-[#F9FAFB] p-4">
                <h3 className="font-arial text-base font-normal leading-6 text-[#0A0A0A]">
                  Ringkasan Invoice
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <p className="font-arial text-sm font-normal leading-5 text-[#0A0A0A]">
                      BAST Reference:
                    </p>
                    <p className="font-arial text-sm font-normal leading-5 text-[#0A0A0A]">
                      BAST/2024/008
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-arial text-sm font-normal leading-5 text-[#0A0A0A]">Layanan:</p>
                    <p className="font-arial text-sm font-normal leading-5 text-[#0A0A0A]">2 items</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-arial text-sm font-normal leading-5 text-[#0A0A0A]">
                      Split Billing:
                    </p>
                    <p className="font-arial text-sm font-normal leading-5 text-[#0A0A0A]">No</p>
                  </div>
                  <div className="flex flex-col gap-2 border-t border-black/10 pt-3">
                    <div className="flex items-center justify-between">
                      <p className="font-arial text-sm font-normal leading-5 text-[#0A0A0A]">
                        Subtotal:
                      </p>
                      <p className="font-arial text-sm font-normal leading-5 text-[#0A0A0A]">
                        {formatCurrency(subtotal)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-arial text-sm font-normal leading-5 text-[#0A0A0A]">
                        Tax (11%):
                      </p>
                      <p className="font-arial text-sm font-normal leading-5 text-[#0A0A0A]">
                        {formatCurrency(tax)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-arial text-lg font-normal leading-7 text-[#0A0A0A]">Total:</p>
                      <p className="font-arial text-lg font-normal leading-7 text-[#00A63E]">
                        {formatCurrency(total)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Alert */}
            <div className="flex flex-col gap-2 rounded-[10px] bg-[#EFF6FF] p-4">
              <h3 className="font-arial text-base font-normal leading-6 text-[#193CB8]">
                Generated Invoice Details
              </h3>
              <div className="flex flex-col gap-1">
                <p className="font-arial text-sm font-normal leading-5 text-[#1447E6]">
                  • Invoice akan di-generate dengan nomor serial otomatis
                </p>
                <p className="font-arial text-sm font-normal leading-5 text-[#1447E6]">
                  • Format: PDF untuk official document + Excel untuk calculation details
                </p>
                <p className="font-arial text-sm font-normal leading-5 text-[#1447E6]">
                  • Due date akan dihitung berdasarkan payment terms yang dipilih
                </p>
                <p className="font-arial text-sm font-normal leading-5 text-[#1447E6]">
                  • Invoice akan masuk status "Draft" dan siap untuk approval
                </p>
              </div>
            </div>
          </CardContent>
        </CardHeader>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <Button
          onClick={onPrevious}
          variant="outline"
          className="gap-4 rounded-lg border-[0.8px] border-black/10 bg-white px-3 py-2 font-arial text-sm font-normal leading-5 text-[#0A0A0A] hover:bg-gray-50"
        >
          <ChevronLeft className="h-4 w-4" />
          Sebelumnya
        </Button>
        <div className="flex gap-5">
          <Button
            variant="outline"
            className="rounded-lg border-[0.8px] border-black/10 bg-white px-4 py-2 font-arial text-sm font-normal leading-5 text-[#0A0A0A] hover:bg-gray-50"
          >
            Batal
          </Button>
          <Button
            onClick={onNext}
            className="gap-4 rounded-lg bg-[#030213] px-3 py-2 font-arial text-sm font-normal leading-5 text-white hover:bg-[#030213]/90"
          >
            Selanjutnya
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
