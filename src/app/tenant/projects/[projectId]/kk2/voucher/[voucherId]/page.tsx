'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { X, Edit2, FileX, Link2, Paperclip, ExternalLink } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

const voucherDetailData = {
  id: '1',
  type: 'MJV',
  typeColor: 'text-[#6E11B0]',
  typeBg: 'bg-[#F3E8FF]',
  number: 'MJV-20240120-001',
  vcNumber: 'VC-20240120-001',
  date: '20/1/2024',
  currency: 'USD (Rate: 15750)',
  createdBy: 'staff3@company.com',
  narration: 'Penyesuaian selisih kurs USD transaksi supplier',
  totalDebit: 'US$1.575.000',
  totalCredit: 'US$0',
  difference: 'US$1.575.000',
  status: 'Draft',
  statusColor: 'text-[#64748B]',
  statusBg: 'bg-[#F1F5F9]',
  journalLines: [
    {
      accountNo: '7101',
      accountName: 'Selisih Kurs',
      debit: 'Rp.1.575.000',
      credit: '-',
      refKK1: true,
      notes: 'Selisih kurs USD naik dari 15,500 ke 15,750',
    },
    {
      accountNo: '7101',
      accountName: 'Selisih Kurs',
      debit: 'Rp.1.575.000',
      credit: '',
      refKK1: true,
      notes: 'Selisih kurs USD naik dari 15,500 ke 15,750',
    },
  ],
  attachments: [
    {
      id: '1',
      name: 'PO-USD-001',
    },
  ],
  auditTrail: [
    {
      action: 'CREATE',
      user: 'staff3@company.com',
      description: 'Exchange rate adjustment - incomplete',
      timestamp: '20/1/2024, 21.00.00',
    },
  ],
};

export default function VoucherDetailPage() {
  const router = useRouter();
  const params = useParams();

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="flex min-h-screen w-full flex-col gap-[35px] bg-white p-5">
      {/* Header */}
      <div className="flex items-start justify-between border-b pb-3.5">
        <div className="flex flex-col gap-1.5">
          <h2 className="font-inter text-sm font-semibold leading-[21px] text-[#1E293B]">
            Detail Voucher
          </h2>
          <p className="font-inter text-xs font-normal leading-[17.5px] text-[#64748B]">
            Informasi lengkap voucher jurnal dan audit trail
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="h-auto w-auto p-0 opacity-70 hover:opacity-100"
        >
          <X className="h-3.5 w-3.5 text-[#1E293B]" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-3.5">
        {/* Voucher Info Card */}
        <Card className="rounded-[10.5px] border-[0.8px] border-[rgba(0,0,0,0.15)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-[22px] pb-0">
            <div className="flex items-center gap-2.5">
              <Badge
                className={`${voucherDetailData.typeBg} ${voucherDetailData.typeColor} gap-2 rounded-[5.25px] border-[0.8px] border-transparent px-2 py-0.5 text-[10.5px] font-medium leading-[14px]`}
              >
                <Edit2 className="h-[11px] w-[11px]" />
                {voucherDetailData.type}
              </Badge>
              <span className="font-inter text-base font-normal leading-[24.5px] text-[#1E293B]">
                {voucherDetailData.number}
              </span>
            </div>
            <Badge
              className={`${voucherDetailData.statusBg} ${voucherDetailData.statusColor} gap-1 rounded-[5.25px] border-[0.8px] border-transparent px-2 py-0.5 text-[10.5px] font-medium leading-[14px]`}
            >
              <FileX className="h-[11px] w-[11px]" />
              {voucherDetailData.status}
            </Badge>
          </CardHeader>
          <CardContent className="flex flex-col gap-3.5 p-[22px] pt-[26px]">
            {/* Info Grid */}
            <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="font-inter text-[10.5px] font-medium leading-[14px] text-[#64748B]">
                  Tanggal
                </label>
                <p className="font-inter text-sm font-medium leading-[21px] text-[#1E293B]">
                  {voucherDetailData.date}
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-inter text-[10.5px] font-medium leading-[14px] text-[#64748B]">
                  Vouching Number
                </label>
                <p className="font-inter text-sm font-medium leading-[21px] text-[#1E293B]">
                  {voucherDetailData.vcNumber}
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-inter text-[10.5px] font-medium leading-[14px] text-[#64748B]">
                  Currency
                </label>
                <p className="font-inter text-sm font-medium leading-[21px] text-[#1E293B]">
                  {voucherDetailData.currency}
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-inter text-[10.5px] font-medium leading-[14px] text-[#64748B]">
                  Created By
                </label>
                <p className="font-inter text-sm font-medium leading-[21px] text-[#1E293B]">
                  {voucherDetailData.createdBy}
                </p>
              </div>
            </div>

            <Separator className="h-px bg-[rgba(0,0,0,0.15)]" />

            {/* Narration */}
            <div className="flex flex-col gap-1.5">
              <label className="font-inter text-[10.5px] font-medium leading-[14px] text-[#64748B]">
                Narasi
              </label>
              <p className="font-inter text-xs font-normal leading-[17.5px] text-[#1E293B]">
                {voucherDetailData.narration}
              </p>
            </div>

            {/* Totals */}
            <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
              <div className="flex flex-col gap-1.5">
                <label className="font-inter text-[10.5px] font-medium leading-[14px] text-[#64748B]">
                  Total Debit
                </label>
                <p className="font-inter text-sm font-medium leading-[21px] text-[#1E293B]">
                  {voucherDetailData.totalDebit}
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-inter text-[10.5px] font-medium leading-[14px] text-[#64748B]">
                  Total Kredit
                </label>
                <p className="font-inter text-sm font-medium leading-[21px] text-[#1E293B]">
                  {voucherDetailData.totalCredit}
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-inter text-[10.5px] font-medium leading-[14px] text-[#64748B]">
                  Selisih
                </label>
                <p className="font-inter text-sm font-medium leading-[21px] text-[#E7000B]">
                  {voucherDetailData.difference}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Journal Lines Card */}
        <Card className="rounded-[10.5px] border-[0.8px] border-[rgba(0,0,0,0.15)]">
          <CardHeader className="p-[21px] pb-0">
            <CardTitle className="font-inter text-base font-medium leading-[24.5px] tracking-[-0.394px] text-[#1E293B]">
              Baris Jurnal
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 pb-[26.25px]">
            <Table>
              <TableHeader>
                <TableRow className="border-b-[0.8px] border-[rgba(0,0,0,0.15)] bg-[rgba(248,250,252,0.5)]">
                  <TableHead className="h-[35px] px-[7px] py-2 font-inter text-xs font-medium leading-[17.5px] text-[#1E293B]">
                    No. Akun
                  </TableHead>
                  <TableHead className="h-[35px] px-[7px] py-2 font-inter text-xs font-medium leading-[17.5px] text-[#1E293B]">
                    Nama Akun
                  </TableHead>
                  <TableHead className="h-[35px] px-[7px] py-2 text-right font-inter text-xs font-medium leading-[17.5px] text-[#1E293B]">
                    Debit
                  </TableHead>
                  <TableHead className="h-[35px] px-[7px] py-2 text-right font-inter text-xs font-medium leading-[17.5px] text-[#1E293B]">
                    Kredit
                  </TableHead>
                  <TableHead className="h-[35px] px-[7px] py-2 font-inter text-xs font-medium leading-[17.5px] text-[#1E293B]">
                    Ref KK1
                  </TableHead>
                  <TableHead className="h-[35px] px-[7px] py-2 font-inter text-xs font-medium leading-[17.5px] text-[#1E293B]">
                    Catatan
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {voucherDetailData.journalLines.map((line, index) => (
                  <TableRow key={index} className="border-0">
                    <TableCell className="h-[42px] px-[7px] py-3 font-inter text-xs font-medium leading-[17.5px] text-[#1E293B]">
                      {line.accountNo}
                    </TableCell>
                    <TableCell className="h-[42px] px-[7px] py-3 font-inter text-xs font-normal leading-[17.5px] text-[#1E293B]">
                      {line.accountName}
                    </TableCell>
                    <TableCell className="h-[42px] px-[7px] py-3 text-right font-inter text-xs font-normal leading-[17.5px] text-[#1E293B]">
                      {line.debit}
                    </TableCell>
                    <TableCell className="h-[42px] px-[7px] py-3 text-right font-inter text-xs font-normal leading-[17.5px] text-[#1E293B]">
                      {line.credit}
                    </TableCell>
                    <TableCell className="h-[42px] px-[7px] py-2">
                      {line.refKK1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 gap-1 rounded-[5.25px] px-2 font-inter text-[10.5px] font-medium leading-[14px] text-[#1E293B]"
                        >
                          <Link2 className="h-3.5 w-3.5" />
                          Link
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className="h-[42px] px-[7px] py-3 font-inter text-xs font-normal leading-[17.5px] text-[#64748B]">
                      {line.notes}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Attachments Card */}
        <Card className="rounded-[10.5px] border-[0.8px] border-[rgba(0,0,0,0.15)]">
          <CardHeader className="p-[21px] pb-0">
            <CardTitle className="font-inter text-base font-medium leading-[24.5px] tracking-[-0.394px] text-[#1E293B]">
              Dokumen Terlampir ({voucherDetailData.attachments.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-[21px] pt-[26.25px]">
            {voucherDetailData.attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center justify-between rounded-[3.5px] border-[0.8px] border-[rgba(0,0,0,0.15)] px-[7px] py-2"
              >
                <div className="flex items-center gap-2">
                  <Paperclip className="h-3.5 w-3.5 text-[#64748B]" />
                  <span className="font-inter text-xs font-medium leading-[17.5px] text-[#1E293B]">
                    {attachment.name}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-[5.25px]"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-[#1E293B]" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Audit Trail Card */}
        <Card className="rounded-[10.5px] border-[0.8px] border-[rgba(0,0,0,0.15)]">
          <CardHeader className="p-[21px] pb-[10px]">
            <CardTitle className="font-inter text-base font-medium leading-[24.5px] tracking-[-0.394px] text-[#1E293B]">
              Audit Trail
            </CardTitle>
          </CardHeader>
          <CardContent className="p-[21px] pt-0">
            <div className="flex flex-col gap-0">
              {voucherDetailData.auditTrail.map((trail, index) => (
                <div key={index} className="relative flex gap-4 pb-6">
                  <div className="relative">
                    <div className="h-[7px] w-[7px] rounded-full bg-[#2B7FFF]" />
                  </div>
                  <div className="flex flex-1 flex-col gap-0">
                    <div className="flex items-end gap-1.5">
                      <span className="font-inter text-xs font-medium leading-[17.5px] text-[#1E293B]">
                        {trail.action}
                      </span>
                      <span className="font-inter text-xs font-normal leading-[17.5px] text-[#1E293B]">
                        oleh {trail.user}
                      </span>
                    </div>
                    <p className="font-inter text-xs font-normal leading-[17.5px] text-[#64748B]">
                      {trail.description}
                    </p>
                    <p className="font-inter text-[10.5px] font-normal leading-[14px] text-[#64748B]">
                      {trail.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
