'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building } from 'lucide-react';

interface PphDetail {
  name: string;
  dpp: string;
  tarif: string;
  amount: string;
}

interface PphArticleData {
  pasal: string;
  title: string;
  objekPajak: string;
  dpp: string;
  tarif: string;
  pphDipotong: string;
  jumlahBuktiPotong: string;
  details: PphDetail[];
}

interface PphArticleCardProps {
  data: PphArticleData;
}

export function PphArticleCard({ data }: PphArticleCardProps) {
  return (
    <Card className="rounded-[14px] border-[0.8px] border-black/10 bg-white p-6">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between p-0 pb-3">
        <div className="flex items-start gap-2">
          <Badge variant="secondary" className="rounded-lg bg-[#DBEAFE] font-arial text-xs text-[#193CB8]">
            {data.pasal}
          </Badge>
          <p className="font-arial text-base text-[#0A0A0A]">{data.title}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <p className="font-arial text-lg font-bold leading-7 text-[#0A0A0A]">{data.pphDipotong}</p>
          <p className="font-arial text-base text-[#717182]">{data.jumlahBuktiPotong}</p>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 p-0">
        {/* Summary Cards */}
        <div className="flex items-center gap-[30px]">
          <div className="flex h-[68px] flex-1 flex-col items-start gap-1 rounded-[10px] bg-[#ECECF0]/30 p-3">
            <p className="font-arial text-sm text-[#717182]">Objek Pajak</p>
            <p className="font-arial text-base font-bold text-[#0A0A0A]">{data.objekPajak}</p>
          </div>
          <div className="flex h-[68px] flex-1 flex-col items-start gap-1 rounded-[10px] bg-[#ECECF0]/30 p-3">
            <p className="font-arial text-sm text-[#717182]">DPP</p>
            <p className="font-arial text-base font-bold text-[#0A0A0A]">{data.dpp}</p>
          </div>
          <div className="flex h-[68px] flex-1 flex-col items-start gap-1 rounded-[10px] bg-[#ECECF0]/30 p-3">
            <p className="font-arial text-sm text-[#717182]">Tarif</p>
            <p className="font-arial text-base font-bold text-[#0A0A0A]">{data.tarif}</p>
          </div>
          <div className="flex h-[68px] flex-1 flex-col items-start gap-1 rounded-[10px] bg-[#030213]/10 p-3">
            <p className="font-arial text-sm text-[#717182]">PPh Dipotong</p>
            <p className="font-arial text-base font-bold text-[#030213]">{data.pphDipotong}</p>
          </div>
          <div className="flex h-[68px] flex-1 flex-col items-start gap-1 rounded-[10px] bg-[#030213]/10 p-3">
            <p className="font-arial text-sm text-[#717182]">Jumlah Bukti Potong</p>
            <p className="font-arial text-base font-bold text-[#030213]">{data.jumlahBuktiPotong}</p>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-black/10" />

        {/* Detail Perhitungan */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 pb-1">
            <Building className="h-4 w-4" />
            <p className="font-arial text-base text-[#0A0A0A]">Detail Perhitungan</p>
          </div>

          {data.details.map((detail, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-[10px] border-[0.8px] border-black/10 px-3 py-4"
            >
              <div className="flex flex-col gap-1">
                <p className="font-arial text-base text-[#0A0A0A]">{detail.name}</p>
                <p className="font-arial text-sm text-[#717182]">DPP: {detail.dpp} × {detail.tarif}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-arial text-base font-bold text-[#0A0A0A]">{detail.amount}</p>
                <Badge variant="outline" className="rounded-lg border-black/10 font-arial text-xs">
                  {detail.tarif}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
