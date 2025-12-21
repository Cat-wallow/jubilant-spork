import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, TrendingUp, TrendingDown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface BagianBProps {
  title: string;
  ppnKeluaran: {
    dppTerutang: number;
    tarif: number;
    total: number;
  };
  ppnMasukan: {
    dariFakturPajak: number;
    dariDokumenImpor: number;
    dariDokumenLain: number;
    total: number;
  };
  ppnKurangBayar: number;
}

export function BagianB({
  title,
  ppnKeluaran,
  ppnMasukan,
  ppnKurangBayar,
}: BagianBProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="rounded-[14px] border-[0.8px] border-black/10">
      <CardContent className="flex flex-col gap-[30px] p-6">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2 font-arial text-lg leading-7 text-[#0A0A0A]">
            <Calculator className="h-4 w-4 text-[#9810FA]" />
            {title}
          </CardTitle>
        </CardHeader>

        {/* PPN Keluaran */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 font-arial text-sm font-bold leading-5 text-[#016630]">
            <TrendingUp className="h-3 w-3" />
            PPN Keluaran
          </div>

          <div className="flex flex-col gap-2 rounded-[10px] bg-[#F0FDF4] p-3">
            <div className="flex items-center justify-between">
              <span className="font-arial text-sm leading-5 text-[#0A0A0A]">
                DPP Terutang:
              </span>
              <span className="font-[Consolas] text-sm leading-5 text-[#0A0A0A]">
                {formatCurrency(ppnKeluaran.dppTerutang)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-arial text-sm leading-5 text-[#0A0A0A]">
                Tarif PPN:
              </span>
              <span className="font-arial text-sm leading-5 text-[#0A0A0A]">
                {ppnKeluaran.tarif}%
              </span>
            </div>

            <Separator className="my-1" />

            <div className="flex items-center justify-between pt-2">
              <span className="font-arial text-sm font-bold leading-5 text-[#016630]">
                PPN Keluaran:
              </span>
              <span className="font-[Consolas] text-lg font-bold leading-7 text-[#008236]">
                {formatCurrency(ppnKeluaran.total)}
              </span>
            </div>
          </div>
        </div>

        {/* PPN Masukan */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 font-arial text-sm font-bold leading-5 text-[#193CB8]">
            <TrendingDown className="h-3 w-3" />
            PPN Masukan
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between rounded bg-[#EFF6FF] px-2 py-2">
              <span className="font-arial text-sm leading-5 text-[#0A0A0A]">
                Dari Faktur Pajak:
              </span>
              <span className="font-[Consolas] text-sm leading-5 text-[#1447E6]">
                {formatCurrency(ppnMasukan.dariFakturPajak)}
              </span>
            </div>

            <div className="flex items-center justify-between rounded bg-[#FAF5FF] px-2 py-2">
              <span className="font-arial text-sm leading-5 text-[#0A0A0A]">
                Dari Dokumen Impor:
              </span>
              <span className="font-[Consolas] text-sm leading-5 text-[#8200DB]">
                {formatCurrency(ppnMasukan.dariDokumenImpor)}
              </span>
            </div>

            <div className="flex items-center justify-between rounded bg-[#F9FAFB] px-2 py-2">
              <span className="font-arial text-sm leading-5 text-[#0A0A0A]">
                Dari Dokumen Lain:
              </span>
              <span className="font-[Consolas] text-sm leading-5 text-[#364153]">
                {formatCurrency(ppnMasukan.dariDokumenLain)}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-[10px] border-[0.8px] border-[#BEDBFF] bg-[#DBEAFE] p-3">
              <span className="font-arial text-base font-bold leading-6 text-[#1C398E]">
                Total PPN Masukan:
              </span>
              <span className="font-[Consolas] text-lg font-bold leading-7 text-[#193CB8]">
                {formatCurrency(ppnMasukan.total)}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* PPN Kurang Bayar */}
        <div className="flex flex-col gap-3 rounded-[10px] border-2 border-[#FFC9C9] bg-[#FEF2F2] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-arial text-base font-bold leading-6 text-[#E7000B]">
              <TrendingUp className="h-4 w-4" />
              PPN Kurang Bayar:
            </div>
            <span className="font-[Consolas] text-2xl font-bold leading-8 text-[#E7000B]">
              {formatCurrency(ppnKurangBayar)}
            </span>
          </div>
          <p className="font-arial text-xs leading-4 text-[#717182]">
            Harus dibayar sebelum tanggal jatuh tempo
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
