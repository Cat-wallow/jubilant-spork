import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface PenyerahanItem {
  no: number;
  uraian: string;
  nilai: number;
}

interface BagianIData {
  penyerahanA: PenyerahanItem[];
  totalPenyerahanA: number;
  penyerahanB: PenyerahanItem[];
  totalPenyerahanB: number;
}

export function BagianISection({ data }: { data: BagianIData }) {
  return (
    <Card className="border-[0.8px] border-[rgba(0,0,0,0.10)] bg-white rounded-[20px] shadow-sm">
      <CardHeader className="p-[10px] px-5 rounded-t-[20px] bg-[rgba(202,225,255,0.50)]">
        <CardTitle className="text-lg font-bold text-[#0A0A0A]">
          BAGIAN I - PENYERAHAN BARANG KENA PAJAK DAN/ATAU JASA KENA PAJAK
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 px-5 pb-5">
        <div className="flex flex-col gap-8 mt-8">
          <div className="flex flex-col gap-6">
            <h4 className="text-base font-bold text-[#0A0A0A]">
              A. PENYERAHAN BARANG KENA PAJAK DAN/ATAU JASA KENA PAJAK:
            </h4>
            
            <div className="flex gap-8">
              <div className="flex-1 flex flex-col gap-4">
                {data.penyerahanA.slice(0, 4).map((item) => (
                  <div key={item.no} className="flex justify-between items-center border-b border-[rgba(0,0,0,0.10)] pb-3">
                    <span className="text-sm font-normal text-[#0A0A0A]">
                      {item.no}. {item.uraian}
                    </span>
                    <span className="text-base font-bold text-[#0A0A0A] font-[Consolas]">
                      Rp {item.nilai.toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="flex-1 flex flex-col gap-4">
                {data.penyerahanA.slice(4).map((item) => (
                  <div key={item.no} className="flex justify-between items-center border-b border-[rgba(0,0,0,0.10)] pb-3">
                    <span className="text-sm font-normal text-[#0A0A0A]">
                      {item.no}. {item.uraian}
                    </span>
                    <span className="text-base font-bold text-[#0A0A0A] font-[Consolas]">
                      Rp {item.nilai.toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
                
                <div className="flex justify-between items-center bg-[#FEFCE8] border border-[#FFF085] rounded-[10px] px-4 py-5">
                  <span className="text-sm font-bold text-[#0A0A0A]">
                    7. Jumlah Penyerahan (1 s.d. 6)
                  </span>
                  <span className="text-lg font-bold text-[#894B00] font-[Consolas]">
                    Rp {data.totalPenyerahanA.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="bg-[rgba(0,0,0,0.10)]" />
          
          <div className="flex flex-col gap-6">
            <h4 className="text-base font-bold text-[#0A0A0A]">
              B. PENYERAHAN BARANG KENA PAJAK DAN/ATAU JASA KENA PAJAK MENURUT JENISNYA:
            </h4>
            
            <div className="flex gap-8">
              <div className="flex-1 flex flex-col gap-4">
                {data.penyerahanB.slice(0, 3).map((item) => (
                  <div key={item.no} className="flex justify-between items-center border-b border-[rgba(0,0,0,0.10)] pb-3">
                    <span className="text-sm font-normal text-[#0A0A0A]">
                      {item.no}. {item.uraian}
                    </span>
                    <span className="text-base font-bold text-[#0A0A0A] font-[Consolas]">
                      Rp {item.nilai.toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="flex-1 flex flex-col gap-4">
                {data.penyerahanB.slice(3).map((item) => (
                  <div key={item.no} className="flex justify-between items-center border-b border-[rgba(0,0,0,0.10)] pb-3">
                    <span className="text-sm font-normal text-[#0A0A0A]">
                      {item.no}. {item.uraian}
                    </span>
                    <span className="text-base font-bold text-[#0A0A0A] font-[Consolas]">
                      Rp {item.nilai.toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
                
                <div className="flex justify-between items-center bg-[#FEFCE8] border border-[#FFF085] rounded-[10px] px-4 py-5">
                  <span className="text-sm font-bold text-[#0A0A0A]">
                    6. Jumlah Penyerahan (1 s.d. 5)
                  </span>
                  <span className="text-lg font-bold text-[#894B00] font-[Consolas]">
                    Rp {data.totalPenyerahanB.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
