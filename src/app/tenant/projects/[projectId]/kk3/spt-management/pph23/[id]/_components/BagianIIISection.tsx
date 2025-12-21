import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BagianIIIData {
  dasarPengenaan: number;
  ppnTerutang: number;
}

export function BagianIIISection({ data }: { data: BagianIIIData }) {
  return (
    <Card className="border-[0.8px] border-[rgba(0,0,0,0.10)] bg-white rounded-[20px] shadow-sm">
      <CardHeader className="p-[10px] px-5 rounded-t-[20px] bg-[rgba(233,255,191,0.50)]">
        <CardTitle className="text-lg font-bold text-[#0A0A0A]">
          BAGIAN III - PPN TERUTANG ATAS KEGIATAN MEMBANGUN SENDIRI
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 px-5 pb-6">
        <div className="flex justify-between items-center gap-8 mt-6">
          <div className="flex justify-between items-center border-b border-[rgba(0,0,0,0.10)] pb-3 flex-1">
            <span className="text-sm font-bold text-[#0A0A0A]">
              1. Dasar Pengenaan Pajak
            </span>
            <span className="text-base font-bold text-[#0A0A0A] font-[Consolas]">
              Rp {data.dasarPengenaan.toLocaleString("id-ID")}
            </span>
          </div>
          
          <div className="flex justify-between items-center border-b border-[rgba(0,0,0,0.10)] pb-3 flex-1">
            <span className="text-sm font-bold text-[#0A0A0A]">
              2. PPN yang terutang
            </span>
            <span className="text-base font-bold text-[#0A0A0A] font-[Consolas]">
              Rp {data.ppnTerutang.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
